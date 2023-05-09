function setDisplayDuration() {
    // Get the input element and its value
    var displayDaysInput = document.getElementById("displayDays");
    var displayDays = parseInt(displayDaysInput.value);

  // Store the display duration in localStorage
	localStorage.setItem("displayDuration", displayDays);
    console.log(displayDays)

    // Send a POST request to the server with the display duration data
    fetch('/setDisplayDuration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ displayDays })
    })
    .then(response => {
      // Redirect to the user interface using a route defined on the server
      window.location.href = '/studentclaim';
    })
    .catch(error => {
      console.error(error);
    });
  }
  