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


    // function to add content of note to Quill editor
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
        .then(async note => {
            // Assuming the note's content is in `note.content`
            quill.setContents(quill.clipboard.convert(note.content));

            // Update the note title
            const noteTitleElement = document.querySelector('.note-title-editor');
            if (note.title && noteTitleElement) {
                // Set the note's title to display in editor
                noteTitleElement.textContent = note.title;
            }

            // Display the note's category at the end of the content, in a new line
            // if (note.categoryId) {
            //     const categoryName = await fetchCategoryName(note.categoryId);
            //     console.log(categoryName)
            //     const categoryLine = `\nCategory: ${categoryName}`;
            //     // Append category line to content
            //     let delta = quill.clipboard.convert(categoryLine);
            //     // update note in editor
            //     quill.updateContents(delta, 'silent');
            // }
        })
        .catch(error => {
            console.error('Error fetching note:', error);
            alert('Failed to load note.');
        });
    }


    // Function to fetch category name by ID
    function fetchCategoryName(categoryId) {
        return fetch(`/api/categories/${categoryId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch category');
            }
            return response.json();
        })
        .then(categoryData => categoryData.name)
        .catch(error => console.error('Error fetching category:', error));
    }


    // Function to save note
    function saveNote() {
        return new Promise((resolve, reject) => {
            // Get HTML content from Quill editor
            const noteContent = quill.root.innerHTML;
            if (noteContent && noteId) {
                fetch(`/api/notes/${noteId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                    // save note contents
                    body: JSON.stringify({ content: noteContent })
                })
                .then(handleResponse)
                .then(updatedNote => {
                    console.log('Note updated successfully', updatedNote);
                    resolve();
                })
                .catch(error => {
                    console.error('Error saving note:', error);
                    reject();
                });
            } else {
                resolve();
            }
        });
    }


    // Save Note button event listener
    const saveNoteButton = document.getElementById('save-note');
    saveNoteButton.addEventListener('click', function() {
        saveNote().then(() => {
            displayStatusMessage('Note saved successfully.', true);
            setTimeout(() => {
                // Redirect after displaying message
                window.location.href = '/dashboard';
            }, 1000); // Adjust time
        }).catch(() => {
            displayStatusMessage('Failed to save note.', false);
        });
    });


    // Function to display status messages
    function displayStatusMessage(message, isSuccess) {
        const statusMessageElement = document.getElementById('status-message');
        statusMessageElement.textContent = message;
        // Make the message visible
        statusMessageElement.style.display = 'block';
        // Change color based on success/error
        statusMessageElement.style.color = isSuccess ? 'green' : 'red';
        setTimeout(() => {
            // hide after some time
            statusMessageElement.style.display = 'none';
        }, 5000); // Adjust time message is displayed
    }


    // Dashboard button
    const dashboardButton = document.getElementById('dashboard-btn');
    dashboardButton.addEventListener('click', function() {
        saveNote().then(() => {
            displayStatusMessage('Saving Note and navigating to dashboard...', true);
            setTimeout(() => {
                // Redirect after displaying message
                window.location.href = '/dashboard';
            }, 500); // Adjust time
        }).catch(() => {
            // Even if saving fails, redirect to dashboard
            window.location.href = '/dashboard';
        });
    });


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