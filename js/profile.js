// Function to open settings
function openSettings() {
  var modal = document.getElementById("profileModal");
  modal.style.display = "block";
}

// Function to close settings modal
function closeSettings() {
  var modal = document.getElementById("profileModal");
  modal.style.display = "none";
}

// Get the form element
var profileForm = document.getElementById("profileForm");

// Event listener for form submission
profileForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  var formData = new FormData(profileForm);

  // Convert form data to JSON object
  var data = {};
  formData.forEach(function(value, key){
      data[key] = value;
  });

  // Send data to server via AJAX
  $.ajax({
      type: "POST",
      url: "php/profile.php", // Specify the URL of your PHP script to handle the update
      data: JSON.stringify(data),
      contentType: "application/json",
      success: function(response) {
          // Handle success response
          console.log(response);
          closeSettings(); // Close the settings modal
          // Optionally, you can display a success message or perform any other action
      },
      error: function(xhr, status, error) {
          // Handle error response
          console.error(xhr.responseText);
          // Optionally, you can display an error message or perform any other action
      }
  });
});
