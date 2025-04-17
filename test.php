<?php
require_once "../../includes.php"; // Ensure $conn, validate_inputs(), sendResponse() are defined here
global $conn;

validate_inputs($_GET, ['student_id']);
$email = mysqli_real_escape_string($conn, $_GET['student_id']);
$amount = floatval($_POST['amount']);
$date = mysqli_real_escape_string($conn, $_POST['date']);
$customer_id = mysqli_real_escape_string($conn, $_POST['customer-id']);

$qur = fetch_row("SELECT * FROM extra_loan WHERE email = ? AND due_date >= CURDATE()", ["s", $email]);
if ($qur) {
    sendResponse(400, "error", "You have a pending extra loan repayment!!");
}


$query = "INSERT INTO `extra_loan`(`email`, `amount`, `due_date`, `customer_id`) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("sdss", $email, $amount, $date, $customer_id);
if ($stmt->execute()) {
    sendResponse(200, "success", "Extra amount requested successfully!");
} else {
    sendResponse(500, "error", "Failed to insert data.");
}
$stmt->close();
