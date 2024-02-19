document.addEventListener('DOMContentLoaded', function() {

    // Check token at start if user is logged in
    const token = sessionStorage.getItem('token');
    if (!token) {
        // No token found, redirect to login page
        window.location.href = '/';
        // Stop executing script
        return;
    }

    // Call to display all notes on initial load
    fetchAndDisplayNotes();

    // define search/filter elements in dashboard
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const filterDropdown = document.getElementById('filter-dropdown');

    // add event listeners for search and fileter
    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();
        const filterOption = filterDropdown.value;
        fetchAndDisplayNotes(searchQuery, filterOption);
    });

    // Setup search and filter interactions
    setupSearchAndFilterInteractions();

    // Search/filter functionality
    function setupSearchAndFilterInteractions() {
        const searchButton = document.querySelector('button[onclick="fetchAndDisplayNoteswithSearch()"]');
        const searchInput = document.getElementById('searchInput');
        const filterDropdown = document.getElementById('filter-dropdown');

        // when search button is active
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const searchQuery = searchInput.value.trim();
                const filterOption = filterDropdown.value;
                // with search/filter fetch notes
                fetchAndDisplayNotes(searchQuery, filterOption);
            });
        }

        // Trigger search on filter change
        filterDropdown.addEventListener('change', function() {
            const searchQuery = searchInput.value.trim();
            const filterOption = this.value;
            fetchAndDisplayNotes(searchQuery, filterOption);
        });
    }

    // Handle request to load notes to dashboard
    function fetchAndDisplayNotes(searchQuery = '', filterOption = 'Filter') {
        const queryParams = new URLSearchParams();
        
        if (searchQuery) queryParams.append('search', searchQuery);
        if (filterOption && filterOption !== 'Filter') queryParams.append('filter', filterOption);

        // fetch URL to include queryParams.toString()
        fetch(`/api/notes?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(handleResponse)
        .then(displayNotes)
        .catch(error => console.error('Error fetching notes:', error));
    }

    // event listener to 'New Note' button
    const newNoteButton = document.getElementById('new-note');
    if (newNoteButton) {
        newNoteButton.addEventListener('click', createNewNote);
    }

    // function to create a new note
    function createNewNote() {
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
    }

    // function to display notes to user
    function displayNotes(notes) {
        // get content from document
        const titlesContainer = document.getElementById('note-titles');
        const contentContainer = document.getElementById('note-content');

        // Clear existing notes display
        titlesContainer.innerHTML = '';
        contentContainer.innerHTML = '';

        // Iterate over notes and create elements for each note
        notes.slice(0, 9).forEach(note => {
            const noteContainer = document.createElement('div');
            noteContainer.className = 'note-container';
        
            const titleElement = document.createElement('div');
            titleElement.className = 'note-title';
            titleElement.textContent = note.title;

            // const deleteButton = document.createElement('button');
            // deleteButton.textContent = 'Delete';
            // deleteButton.className = 'delete-note-button';
            // deleteButton.addEventListener('click', () => deleteNote(note.id));

            noteContainer.appendChild(titleElement);
            // noteContainer.appendChild(deleteButton);
            
            // Hover effect to display note content
            titleElement.addEventListener('mouseenter', () => {
                contentContainer.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
            });

            // change to editor page when click on a note
            titleElement.addEventListener('click', () => {
                // Navigate to editor page with note ID in query string
                window.location.href = `/editor?noteId=${note.id}`;
            });

            titlesContainer.appendChild(noteContainer);
        });
    }

    // function to handle async response
    function handleResponse(response) {
        if (!response.ok) {
            if (response.status === 401) {
                alert('Session expired. Please login again.');
                sessionStorage.removeItem('token');
                window.location.href = '/';
            }
            throw new Error('Network response was not ok.');
        }
        return response.json();
    }

});