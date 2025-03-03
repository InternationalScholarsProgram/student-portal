<?php
require_once "../includes.php"; // Ensure this file contains $conn, validate_inputs(), and sendResponse()

global $conn;
global $postData;

// Centralized Input Validation
validate_inputs($_GET, ['student_id', 'action']);
$action = $_GET['action'];
$email  = $_GET['student_id'];

function ds_160_application_video()
{
    global $conn;

    $query       = "SELECT * FROM resource_details WHERE det_id = '63'";
    $queryResult = mysqli_query($conn, $query);

    // Check for query errors
    if (! $queryResult) {
        sendResponse(500, 'error', 'Database query failed: ' . mysqli_error($conn));
        return null; // Exit function after sending response
    }

    // Fetch a single row as an associative array
    $data = mysqli_fetch_assoc($queryResult);

    // Free result set
    mysqli_free_result($queryResult);

    return $data;
}
function visa_training_videos()
{
    global $conn;

    $videoCounter      = mysqli_query($conn, "SELECT video_counter FROM visa_interview WHERE stu_email = '$test'");
    $videoCounter      = mysqli_fetch_assoc($videoCounter);
    $videoCounterValue = $videoCounter['video_counter'];

    $query       = "SELECT * FROM resource_details WHERE res_id = '12' ORDER BY det_id DESC LIMIT $videoCounterValue";
    $queryResult = mysqli_query($conn, $query);

    // Check for query errors
    if (! $queryResult) {
        sendResponse(500, 'error', 'Database query failed: ' . mysqli_error($conn));
        return null; // Exit function after sending response
    }

    // Fetch a single row as an associative array
    $data = mysqli_fetch_assoc($queryResult);

    // Free result set
    mysqli_free_result($queryResult);

    return $data;
}

switch ($action) {
    case 'ds-160-application-video':
        $vid = ds_160_application_video();
        $vid
            ? sendResponse(200, "success", "Video found", $vid)
            : sendResponse(404, "not found", "Invalid email");
        break;

    default:
        sendResponse(400, "error", "Invalid action");
}
