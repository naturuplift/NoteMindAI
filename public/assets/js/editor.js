document.addEventListener('DOMContentLoaded', function() {

    // Check token at start if user is logged in
    const token = sessionStorage.getItem('token');
    if (!token) {
        // No token found, redirect to login page
        window.location.href = '/';
        // Stop executing script
        return;
    }

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

    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('noteId');

    if (noteId) {
        fetch(`/api/notes/${noteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(handleResponse)
        .then(note => {
            // Assuming the note's content is in `note.content`
            quill.setContents(quill.clipboard.convert(note.content));
        })
        .catch(error => {
            console.error('Error fetching note:', error);
            alert('Failed to load note.');
        });
    }

    // function to handle expired token response
    function handleResponse(response) {
        if (!response.ok && response.status === 401) {
            // Token expired or unauthorized
            alert('Session expired. Please login again.');
            // Clear the expired token
            sessionStorage.removeItem('token');
            // Redirect to login page
            window.location.href = '/';
            return Promise.reject('Session expired');
        }
        return response.json();
    }

});