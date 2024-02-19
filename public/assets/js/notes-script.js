document.addEventListener('DOMContentLoaded', function() {
    
    // Check token at start if user is logged in
    const token = sessionStorage.getItem('token');
    if (!token) {
        // No token found, redirect to login page
        window.location.href = '/';
        // Stop executing script
        return;
    }

    // Fetch and display notes when page loads
    fetchAndDisplayNotes();

    // Add event listener for "New Note" button
    const newNoteButton = document.getElementById('new-note');
    if (newNoteButton) {
        // Event listener for the "New Note" button
        newNoteButton.addEventListener('click', function() {

            // Default data for a new note
            const newNoteData = {
                title: 'New Note Title',
                content: 'New note content...',
                categoryId: 1
            };
            
            // Check again for token before creating a new note
            if (!sessionStorage.getItem('token')) {
                alert('Your session has expired. Please log in again.');
                window.location.href = '/';
                return;
            }

            // POST request to create a new note
            fetch('/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(newNoteData)
            })
            .then(handleResponse)
            .then(data => {
                console.log('Note created successfully', data);
                // returns the newly created note's ID
                const noteId = data.id;
                const newNoteAIFeatures = {
                    summary: 'New content ...',
                    noteId: noteId
                };

            // POST request to create new AI feature content using the newly created note's ID
            return fetch('/api/summaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                body: JSON.stringify(newNoteAIFeatures)
            })
            // Process the response from creating the AI features
            .then(handleResponse);
            })
            .then(summaryData => {
                console.log('AI Features created successfully', summaryData);
                // redirect user to new note's editing page
                window.location.href = `/editor?noteId=${summaryData.noteId}`;
            })
            .catch(error => {
                console.error('Error creating new note or AI features:', error);
            });
        });
    }

    function handleResponse(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    }

    // Handle request to load notes to dashboard
    function fetchAndDisplayNotes() {

        // Send GET request to server using Fetch API
        fetch('/api/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(handleResponse)
        .then(notes => {
            const titlesContainer = document.getElementById('note-titles');
            const contentContainer = document.getElementById('note-content');
            // Clear existing notes
            titlesContainer.innerHTML = '';
            contentContainer.innerHTML = '';

            // Display up to six note titles
            notes.slice(0, 6).forEach(note => {
                const noteContainer = document.createElement('div');
                noteContainer.className = 'note-container';
            
                const titleElement = document.createElement('div');
                titleElement.className = 'note-title';
                titleElement.textContent = note.title;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.className = 'delete-note-button';
                deleteButton.onclick = () => deleteNote(note.id);

                noteContainer.appendChild(titleElement);
                noteContainer.appendChild(deleteButton);
                
                // Hover effect to display note content
                titleElement.addEventListener('mouseenter', () => {
                    contentContainer.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
                });

                // add tittle element to check if selected
                titlesContainer.appendChild(titleElement);

                // change to editor page when click on a note
                titleElement.addEventListener('click', () => {
                    // Navigate to editor page with note ID in query string
                    window.location.href = `/editor?noteId=${note.id}`;
                });

            });
        })
        .catch(error => console.error('Error fetching notes:', error));
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

    // function to handle note deletion
    function deleteNote(noteId) {
        if (!confirm("Are you sure you want to delete this note?")) {
            return; // Stop if user cancels action
        }
    
        // Send DELETE request to server using Fetch API
        fetch(`/api/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(handleResponse)
        .then(() => {
            alert('Note deleted successfully.');
            // Refresh the notes displayed
            fetchAndDisplayNotes();
        })
        .catch(error => console.error('Error deleting note:', error));
    }

});
