// Instead of submitting the form using the usual method, do it with AJAX
let contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    // ***RESET TO grecaptcha.getResponse() IN PROD***
    if (grecaptcha.getResponse()) {
        // Disable error message, if active
        document.querySelector('.error-container').classList.remove('show');
        // Get form response, redirect to thank you page
        fetch("https://amord-process-captcha.herokuapp.com/", {
            method: 'POST',
            mode: 'cors',
            body: new FormData(contactForm)
        }).then(function(response) {
            if (response.ok) {
                window.location.assign("/thank-you");
            } else {
                document.querySelector('.error-container').classList.add('show');
            }
        });
    } else {
        // Add captcha error message
        document.querySelector('.error-container').classList.add('show');
    }
});

function removeCaptchaMessage() {
    document.querySelector('.error-container').classList.remove('show');
}
