document.addEventListener('DOMContentLoaded', function() {
    // Handle click on the sign-up button
    document.getElementById('sign-up-button').addEventListener('click', function() {
        // Assuming the intent is to navigate to the sign-up page
        window.location.href = '/signup';
    });

    // Handle sign-in button click event
    document.getElementById('sign-in-button').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture form data from login page
        var formData = JSON.stringify({
            email: document.getElementById('username-box').value,
            password: document.getElementById('password-box').value,
        });

        // Send a POST request to the server
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        })
        .then(response => response.json()) // Parse JSON response
        .then(data => {
            // console.log(data.success)
            // console.log(data.redirectUrl)

            if (data.success ) {
                // If login is successful and a redirect URL is provided, redirect to that URL
                window.location.href = data.redirectUrl;
            } else {
                // Handle unsuccessful login attempt or missing redirect URL
                throw new Error('Sign-in failed or no redirect URL provided');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Optionally, show an error message to the user
        });
    });

    // Handle sign-up form submission
    document.getElementById('sign-up-form')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Capture form data from sign-up page
        var formData = JSON.stringify({
            username: document.getElementById('#username-box').value,
            email: document.getElementById('email-box').value,
            password: document.getElementById('password-box').value,
        });

        // Send a POST request to the server using Fetch API
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Signup failed');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Redirect user to home page
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
