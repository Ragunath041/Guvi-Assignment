$(document).ready(function() {
    // Function to fetch and display the username
    function displayUsername() {
        // Make an AJAX request to fetch the username
        $.ajax({
            url: 'php/home.php',
            method: 'GET',
            success: function(data) {
                // Update the welcome message with the username
                $('#welcomeMessage').html(data);
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }

    // Call the function to display the username when the document is ready
    displayUsername();
});
