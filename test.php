<?php
require "includes.php"; // contains sendResponse, fetch_row,conn,executeSelectQuery

$fee = isset($_GET['fee']) ? $_GET['fee'] : "";

if ($fee) {
    // Use prepared statements to avoid SQL injection
    $query = "SELECT `description`, `amount` FROM `deductions` WHERE `description` LIKE ?";
    return fetch_row($query, ["s", "%$fee%"]) ? sendResponse(200, 'success', "", $data) : sendResponse(200, 'success', "", $data);
}


$stmt = $conn->prepare();
$stmt->execute();

$data = executeSelectQuery("SELECT `description`, `amount` FROM `deductions`");

if (!empty($data)) {
    sendResponse(404, 'error', 'No deductions found matching the search term.');
} else {
    sendResponse(200, 'success', $data);
}
