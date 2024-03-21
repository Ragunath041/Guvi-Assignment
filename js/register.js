function redirectToRegister() {
    // Perform registration logic here

    // After successful registration, redirect to the home page
    window.location.href = "register.html";
}

$(document).ready(function() {
    $('#registerForm').submit(function(event) {
        event.preventDefault();
        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
       
        $.ajax({
            type: 'POST',
            url: 'php/register.php',
            data: {
                username: username,
                email: email,
                password: password
            },
            success: function(response) {
                if(response==="success")
                {
                    alert("SUCCESS");
                    window.location.href = 'login.html';
                    
                }
                else{
                    alert("FAIL");
                }
            }
        });
    });
});
