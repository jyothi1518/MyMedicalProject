<?php
// Assuming you're using MySQL, adjust accordingly if you're using a different database
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
 // Include the file to establish database connection

// Retrieve username from the request URL
$username = $_GET['username'];

// Prepare SQL query to fetch doctor details based on username
$sql = "SELECT username, doctorName, age, gender, department, contactNumber FROM login1 WHERE username = '$username'";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Doctor found, fetch doctor details
    $row = $result->fetch_assoc();
    
    // Close connection
    $conn->close();
    
    // Return doctor details as JSON response
    header('Content-Type: application/json');
    echo json_encode($row);
} else {
    // Doctor not found
    $response = array("status" => "error", "message" => "Doctor not found");
    echo json_encode($response);
}
?>
