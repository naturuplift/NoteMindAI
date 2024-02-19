document.addEventListener('DOMContentLoaded', function() {

    // Handle click on logout button
    const logoutButton = document.getElementById('log-out');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include the token in the request if needed for server-side validation
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Remove token from sessionStorage
                sessionStorage.removeItem('token');
                // Redirect to home page
                window.location.href = '/';
            })
            .catch(error => {
                console.error('Logout Error:', error);
            });
        });
    }

    // Handle click on sign-up button
    const signUpButton = document.getElementById('sign-up-button');
    if (signUpButton) {
        // navigate to sign-up page
        signUpButton.addEventListener('click', function() {
            window.location.href = '/signup';
        });
    }

    // Handle sign-in button click event
    const signInButton = document.getElementById('sign-in-button');
    if (signInButton) {
        signInButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission

            // use stored token 
            const token = sessionStorage.getItem('token');

            // Handle sign-in
            const formData = JSON.stringify({
                email: document.getElementById('username-box').value,
                password: document.getElementById('password-box').value,
                // headers: {
                //     'Authorization': `Bearer ${token}`
                // },
            });

            // Send POST request to server using Fetch API
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    // Save token in sessionStorage
                    sessionStorage.setItem('token', data.token);

                    // Redirect to dashboard
                    window.location.href = data.redirectUrl;
                } else {
                    // Handle unsuccessful login
                    throw new Error('Sign-in failed or no redirect URL provided');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }

    // Handle sign-up form submission
    const signUpForm = document.getElementById('sign-up-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Handle sign-up form submission
            const formData = JSON.stringify({
                username: document.getElementById('username-box').value,
                email: document.getElementById('email-box').value,
                password: document.getElementById('password-box').value,
            });

            // Send POST request to server using Fetch API
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
    }
});
