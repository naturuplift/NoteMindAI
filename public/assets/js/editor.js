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

            // Proceed with logout after a short delay
            setTimeout(() => {
                fetch('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data.message);
                    displayStatusMessage('Logging out...', true);
                    // Remove token from sessionStorage
                    sessionStorage.removeItem('token');
                    // Redirect to home page
                    window.location.href = '/';
                })
                .catch(error => {
                    console.error('Logout Error:', error);
                });
            }, 300); // allow to read status message
        });
    }

    // function to add content of note and ai feature to Quill editor
    const urlParams = new URLSearchParams(window.location.search);
    const noteId = urlParams.get('noteId');
    // console.log(noteId)
    let currentNoteCategoryId = '';
    // const quill = new Quill('#editor', {theme: 'snow'});
    // const quillAIFeatures = new Quill('#ai-features-editor', {theme: 'snow'});
    if (noteId) {
        // Fetch and display note
        fetchNoteContent(noteId);
        // Fetch and display ai features
        fetchAIFeaturesForNote(noteId);
    }

    // Fetch the note's content
    function fetchNoteContent(noteId) {
        fetch(`/api/notes/${noteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(handleResponse)
        .then(async note => {
             // Set the note's content in the main Quill editor
            quill.setContents(quill.clipboard.convert(note.content));
            // Update the note title
            const noteTitleElement = document.querySelector('.note-title-editor');
            if (note.title && noteTitleElement) {
                // Set the note's title to display in editor
                noteTitleElement.textContent = note.title;
            }
        })
        .catch(error => {
            console.error('Error fetching note:', error);
            alert('Failed to load note.');
        });
    }

    // Function to fetch and display summary
    function fetchAIFeaturesForNote(noteId) {
        // Fetch the summary's content
        fetch(`/api/summaries/${noteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch summary');
            }
            return response.json();
        })
        .then(summaryData => {
            if (summaryData && summaryData.summary) {
                quillAIFeatures.setContents(quillAIFeatures.clipboard.convert(summaryData.summary));
            }
        })
        .catch(error => console.error('Error fetching summary:', error));
    }

    // get category button elements
    const showCategoriesBtn = document.getElementById('show-categories');
    const categoryButtonsContainer = document.getElementById('category-buttons');
    // when 'show categories' button is pressed
    showCategoriesBtn.addEventListener('click', function() {
        // Fetch categories
        fetchCategoriesAndDisplayButtons();
        // Set timeout to hide categories after 5 seconds
        setTimeout(() => {
            categoryButtonsContainer.style.display = 'none';
        }, 5000);
    });

    // Function to fetch categories for note
    function fetchCategoriesAndDisplayButtons() {
        fetch('/api/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(async categories => {
            categoryButtonsContainer.innerHTML = ''; // Clear previous buttons
            categories.forEach(category => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-outline-primary btn-sm category-btn';
                btn.textContent = category.name;

                if(category.name === currentNoteCategoryId) {
                    // Add class for styling
                    btn.classList.add('current-category');
                    // directly apply style
                    btn.style.backgroundColor = '#4CAF50';
                }
                // Set onclick event
                btn.onclick = function() {
                    // Handle category selection here
                    console.log(`Category ${category.name} selected`);
                    // Save the category ID
                    updateNoteCategory(noteId, category.id);
                    currentNoteCategoryId = category.name;
                };
                categoryButtonsContainer.appendChild(btn);
            });
            categoryButtonsContainer.style.display = 'flex'; // Show the buttons
        })
        .catch(error => console.error('Error fetching categories:', error));
    }

    // Function to update note's category
    function updateNoteCategory(noteId, categoryId) {
        console.log(noteId, categoryId)
        fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryId: categoryId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update note category');
            }
            return response.json();
        })
        .then(updatedNote => {
            console.log('Note category updated successfully', updatedNote);
        })
        .catch(error => {
            console.error('Error updating note category:', error);
        });
    }

    // function to clear note content
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', function() {
        // Clears content of main Quill editor
        quill.setContents([]);
    });

    // Function to save note and ai features
    function saveNoteAndAIFeatures(noteId, noteTitle, noteContent, aiFeaturesContent) {
        console.log(`NoteId: ${noteId}, noteTitle: ${noteTitle}, noteContent: ${noteContent}, aiFeaturesContent: ${aiFeaturesContent}`)
        // save note title fetch request
        const saveNoteTitlePromise = fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ title: noteTitle })
        }).then(handleResponse);
        // save note content fetch request
        const saveNoteContentPromise = fetch(`/api/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ content: noteContent })
        }).then(handleResponse);
        // save ai features fetch request
        const saveAIFeaturesPromise = fetch(`/api/summaries/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ summary: aiFeaturesContent })
        }).then(handleResponse);
        // promise to save editors
        return Promise.all([saveNoteTitlePromise, saveNoteContentPromise, saveAIFeaturesPromise])
            .then(results => {
                console.log('Note and AI features updated successfully');
            })
            .catch(error => {
                console.error('Error saving note or AI features:', error);
                throw error; // Re-throw error to be caught by the caller
            });
    }

    // Save Note button event listener
    const saveNoteButton = document.getElementById('save-note');
    saveNoteButton.addEventListener('click', function() {
        const urlParamsSave = new URLSearchParams(window.location.search);
        const noteIdSave = urlParamsSave.get('noteId');
        // Get edited title from content editable element
        const editedTitle = document.getElementById('editable-note-title').innerText;
        // Get HTML content from Quill editor
        const noteContentSave = quill.root.innerHTML;
        // Get HTML content from Quill ai-features-editor
        const aiFeaturesContentSave = quillAIFeatures.root.innerHTML;
        console.log(noteIdSave, editedTitle, noteContentSave, aiFeaturesContentSave)
        // function to save note title and content, save ai feature content
        saveNoteAndAIFeatures(noteIdSave, editedTitle, noteContentSave, aiFeaturesContentSave).then(() => {
            displayStatusMessage('Note saved successfully.', true);
            setTimeout(() => {
                // Redirect after displaying message
                window.location.href = '/dashboard';
            }, 1000); // Adjust time
        }).catch(() => {
            displayStatusMessage('Failed to save note.', false);
        });
    });

    // Dashboard button
    const dashboardButton = document.getElementById('dashboard-btn');
    dashboardButton.addEventListener('click', function() {
        window.location.href = '/dashboard';
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

    // function to delete note
    const deleteBtn = document.getElementById('delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            // get the noteId from the URL parameters
            const noteId = urlParams.get('noteId');

            if (confirm('Are you sure you want to delete this note?')) {
                fetch(`/api/notes/${noteId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete the note.');
                    }
                    return response.json();
                })
                .then(() => {
                    displayStatusMessage('Note deleted successfully and navigating to dashboard...', true);
                    setTimeout(() => {
                        // Redirect after displaying message
                        window.location.href = '/dashboard';
                    }, 500); // Adjust time
                    // alert('Note deleted successfully.');
                    window.location.href = '/dashboard'; // Redirect to dashboard after successful deletion
                })
                .catch(error => {
                    console.error('Error deleting the note:', error);
                    alert('Failed to delete the note.');
                });
            }
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