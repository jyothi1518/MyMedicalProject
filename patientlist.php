<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "react";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL query to fetch all patients
$sql = "SELECT * FROM patient";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $patients = array();
    // Loop through each patient
    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
    
    // Close connection
    $conn->close();
    
    // Return patients array as JSON response
    header('Content-Type: application/json');
    echo json_encode($patients);
} else {
    // No patients found
    $response = array("status" => "error", "message" => "No patients found");
    echo json_encode($response);
}
?>
