<?php
function handleSevisFees()
{
    $sevis_number = $_POST['sevis_number'];
    $sevis_voucher = isset($_FILES['sevis_voucher']['name']) ? $_FILES['sevis_voucher']['name'] : null; // Handle optional file input
    $sevis_voucher_tmp = isset($_FILES['sevis_voucher']['tmp_name']) ? $_FILES['sevis_voucher']['tmp_name'] : null; // Temporary file location
    $document = $sevis_voucher ? "sevis_voucher/" . basename($sevis_voucher) : null; // Path where the file will be stored
    $reason = "SEVIS fees payment";

    // Move the uploaded file to the specified directory, if there is a file
    if ($sevis_voucher && !move_uploaded_file($sevis_voucher_tmp, $document)) {
        echo "Error uploading the file.";
        exit;
    }

    $visa_status = ($outcome == 1) ? 'approved' : 'administrative';

    $check_status = mysqli_query($conn, "SELECT * FROM req_payment_student WHERE email = '$email' AND reason='$reason' ORDER BY id DESC LIMIT 1");
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
}
