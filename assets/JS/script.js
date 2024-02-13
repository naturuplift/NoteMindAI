//Landing Page

// The sign-up button on the landing page
var button1 = document.getElementById('sign-up-button');

//The clear button on the landing page
var button2 = document.getElementById('rest-button')
var inputElements = document.getElementById('form-landing-page');

//The submit button on the landing page
var button3 = document.getElementById('sign-in-button');


button1.addEventListener('click', function() {
    inputElements.value = '';
    window.location.href = '../assets/pages/sign-up.html';
    
});

// Loop through the input elements and clear each one
button2.addEventListener('click', function() {
for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].value = "";
    };
});


//Sign-up Page

var form = document.getElementById('sign-up-form');
var button4 = document.getElementById('sign-up-page-btn');
var button5 = document.getElementById('submit-button');



button4.addEventListener('click', function() {
    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].value = "";
        };
    });


var saveBtn = document.getElementsById('save-note');
var newNote = document.getElementsById('new-note');
var clearBtn = document.getElementById('clear-btn');
var emptyForm = document.getElementById('writing-form');

clearBtn.addEventListener('click', function () {
    for (let i = 0; i < emptyForm.length; i++) {
        emptyForm[i].value = "";
        };
    });

// saveBtn.addEventListener('click', () => {
//     const saveNote = (note) =>
//     fetch('/api/notes', {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(note)
//     });
// })

