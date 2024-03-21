$(document).ready(function() {
    $('#loginBtn').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            type: 'POST',
            url: 'php/login.php',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                if(response.trim() === "success") { // trim response to remove any leading/trailing whitespace
                    window.location.href = 'home.html';
                } else {
                    alert("Invalid Username or Password.");
                }
            },
            error: function(xhr, status, error) {
                console.error(xhr.responseText);
                alert("An error occurred while processing your request. Please try again later.");
            }
        });
    });
});
