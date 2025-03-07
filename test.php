<?php
require_once "../includes.php"; // Ensure this file contains $conn, validate_inputs(), and sendResponse()

global $conn;
global $postData;
validate_inputs($_GET, ['student_id']);

// Handle API action
$action = $_GET['action'];
$email = $_GET['student_id'];

function post_feedback()
{
    $outcome = $_POST['visa_outcome'];
    $app_id = $_POST['app_id'];
    $feedback = $_POST['feedback'];
    $content = mysqli_escape_string($conn, $feedback);
    $country = $_POST['select_country'];
    $visa_date = $interview_date;
    $email = $email;
    $sevis_number = $_POST['sevis_number'];
    $sevis_voucher = isset($_FILES['sevis_voucher']['name']) ? $_FILES['sevis_voucher']['name'] : null; // Handle optional file input
    $sevis_voucher_tmp = isset($_FILES['sevis_voucher']['tmp_name']) ? $_FILES['sevis_voucher']['tmp_name'] : null; // Temporary file location
    $document = $sevis_voucher ? "sevis_voucher/" . basename($sevis_voucher) : null; // Path where the file will be stored
    $reason = "SEVIS fees payment";

    // Move the uploaded file to the specified directory, if there is a file
    if ($sevis_voucher && !move_uploaded_file($sevis_voucher_tmp, $document)) {
        sendResponse(400, "error", "Error uploading the file", mysqli_error($conn));
    }

    $visa_status = ($outcome == 1) ? 'approved' : 'administrative';

    $check_status = mysqli_query($conn, "SELECT * FROM req_payment_student WHERE email = '$email' ORDER BY id DESC LIMIT 1");
    $status_data = mysqli_fetch_assoc($check_status);
    $status_exists = mysqli_num_rows($check_status) > 0;

    if (!$status_exists || $status_data['status'] == 3) {
        // Insert new row
        $insert_query = "INSERT INTO req_payment_student (email, sevis_number, document, visa_status, visa_date, status, reason) 
                         VALUES ('$email', '$sevis_number', '$sevis_voucher', '$visa_status', '$visa_date', 1, '$reason')";
        $query = mysqli_query($conn, $insert_query);
    } elseif ($status_data['status'] == 2) {
        // Update existing row
        $id = $status_data['id'];
        $update_query = "UPDATE req_payment_student SET sevis_number = '$sevis_number', document = '$sevis_voucher', visa_date = '$visa_date', visa_status = '$visa_status' 
                         WHERE id = '$id'";
        $query = mysqli_query($conn, $update_query);
    }

    // Handle the visa interview feedback part
    $county = ($country == 'Yes') ? $_POST['county'] : $_POST['country'];
    $school = $_POST['school'];
    $program = $_POST['course'];
    $check_existence = mysqli_query($conn, "SELECT * FROM visa_interview_feedback WHERE email ='$email' ORDER BY id DESC LIMIT 1");
    $get_id = mysqli_fetch_assoc($check_existence);
    $id = $get_id['id'];

    if (mysqli_num_rows($check_existence) > 0) {
        $query = mysqli_query($conn, "UPDATE visa_interview_feedback SET visa_outcome = '$outcome', interview_feedback = '$content', county = '$county', school = '$school', program = '$program', app_id = '$app_id', status = 1 WHERE id = '$id'");
    } else {
        $query1 = mysqli_query($conn, "DELETE FROM `special_function` WHERE `action` = 'visa' AND `email`='$email'");
        $query = mysqli_query($conn, "INSERT INTO `visa_interview_feedback` (`name`, `email`, `visa_outcome`, `interview_feedback`, `county`, `school`, `program`, `app_id`) VALUES ('$name', '$email', '$outcome', '$content', '$county', '$school', '$program', '$app_id')");
    }

    if ($query) {
        sendResponse(200, "success", "Visa Interview feedback sent Successfully");
    } else {
        sendResponse(400, "error", "Visa Interview feedback not sent", mysqli_error($conn));
    }
}
