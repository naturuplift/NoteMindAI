// The sign-up button on the landing page
var button1 = document.getElementById('sign-up-button');
var button2 = document.getElementById('sign-in-button');
var inputElements = document.getElementById('form-landing-page');


button1.addEventListener('click', function() {
    inputElements.value = '';
    window.location.href = '/signup';
    
});

button2.addEventListener('click', function() {
    inputElements.value = '';
    window.location.href = '/dashboard';
    
});