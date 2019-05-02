---
---
// Instead of submitting the form using the usual method, do it with AJAX
let contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    // ***RESET TO grecaptcha.getResponse() IN PROD***
    if (grecaptcha.getResponse()) {
        // Disable error message, if active
        document.querySelector('.error-container').classList.remove('show');
        // Disable submit button, change text
        const PAGE_LANG = document.children[0].lang;
        const submitButton = document.querySelector('#contact-form button[type="submit"]')
        const initalText = submitButton.innerHTML;
        submitButton.disable = 'true';
        if (PAGE_LANG === 'en') {
            submitButton.innerHTML = '{{ site.data.i18n.en.contactlabels.waittext }}';
        } else if (PAGE_LANG === 'de') {
            submitButton.innerHTML = '{{ site.data.i18n.de.contactlabels.waittext }}';
        } else if (PAGE_LANG == 'es') {
            submitButton.innerHTML = '{{ site.data.i18n.es.contactlabels.waittext }}';
        }
        // Get form response, redirect to thank you page
        fetch("https://amord-process-captcha.herokuapp.com/", {
            method: 'POST',
            mode: 'cors',
            body: new FormData(contactForm)
        }).then(function(response) {
            if (response.ok) {
                if (PAGE_LANG !== 'en') {
                    window.location.assign('/' + PAGE_LANG + "/thank-you");
                } else {
                    window.location.assign('/thank-you');
                }
            } else {
                document.querySelector('.error-container').classList.add('show');
                submitButton.disable = 'false';
                submitButton.innerHTML = initalText;
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
