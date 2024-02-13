//Landing Page

const { default: Quill } = require("quill");

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
for (var i = 0; i < inputElements.length; i++) {
    inputElements[i].value = "";
    };
});


//Sign-up Page

var form = document.getElementById('sign-up-form');
var button4 = document.getElementById('sign-up-page-btn');
var button5 = document.getElementById('submit-button');


button4.addEventListener('click', function() {
    for (var i = 0; i < inputElements.length; i++) {
        inputElements[i].value = "";
        };
    });

    document.addEventListener('DOMContentLoaded', function () {
        var quill = new Quill('#editor', {
            theme: 'snow'
        });

        document.getElementById('save-button').addEventListener(click, function() {
            var editorContent = quill.root.innerHTML;
            console.log('saving text',editorContent);
        });
        document.getElementById('delete-button').addEventListener(click, function() {
           
            console.log('deleting text',editorContent);
        });
    });