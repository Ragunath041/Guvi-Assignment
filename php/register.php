<?php
  $conn = mysqli_connect("localhost", "root","","guvi");

  $username=$_POST['username'];
  $email=$_POST['email'];
  $password=$_POST['password'];

  $stmt = $conn->prepare("INSERT INTO register (username, email, password) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $username, $email , $password);

  if($stmt->execute()===true)
  {
    echo "success";
  }
  else{
    echo "Error: " . $stmt->error;
  }
  
  $stmt->close();
  $conn->close();
?>
