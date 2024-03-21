<?php
$conn = mysqli_connect("localhost", "root", "", "guvi");
$username = $_POST['username'];
$password = $_POST['password'];
$stmt = $conn->prepare("SELECT * FROM register WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result(); 
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row['password']==$password) {
        echo "success";
    } else {
        echo "fail";
    }
} else {
    echo "fail";
}
$stmt->close();
$conn->close();
?>