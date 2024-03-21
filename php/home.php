<?php
session_start(); // Start the session
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
    // Echo the username directly
    echo "Welcome, $username";
}
?>
