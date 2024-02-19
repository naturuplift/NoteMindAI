document.addEventListener('DOMContentLoaded', function() {

    // function to clear note AI features content
    const clearAIFeaturesBtn = document.getElementById('clear-ai-features-btn');
    clearAIFeaturesBtn.addEventListener('click', function() {
        // Clears content of AI features editor
        quillAIFeatures.setContents([]);
    });

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

});