---
---
// Instead of submitting the form using the usual method, do it with AJAX
document.getElementById('contact-form').addEventListener('submit', function (ev) {
    ev.preventDefault();
    // ***RESET TO grecaptcha.getResponse() IN PROD***
    if (grecaptcha.getResponse()) {
        // Disable error message, if active
        document.querySelector('.error-container').classList.remove('show');
        // Disable submit button, change text
        const PAGE_LANG = document.childNodes[1].lang;
        const submitButton = document.querySelector('#contact-form button[type="submit"]')
        const initalText = submitButton.innerHTML;
        submitButton.disabled = true;
        if (PAGE_LANG === 'en') {
            submitButton.innerHTML = '{{ site.data.i18n.en.contactlabels.waittext }}';
        } else if (PAGE_LANG === 'de') {
            submitButton.innerHTML = '{{ site.data.i18n.de.contactlabels.waittext }}';
        } else if (PAGE_LANG == 'es') {
            submitButton.innerHTML = '{{ site.data.i18n.es.contactlabels.waittext }}';
        }
        // Get form response, redirect to thank you page
        if (window.fetch) {
            fetch("https://amord-process-captcha.herokuapp.com/", {
                method: 'POST',
                mode: 'cors',
                body: new FormData(this)
            }).then(function(response) {
                if (response.ok) {
                    if (PAGE_LANG !== 'en') {
                        window.location.assign('/' + PAGE_LANG + "/thank-you");
                    } else {
                        window.location.assign('/thank-you');
                    }
                } else if (response.status === 500) {
                    submitButton.innerHTML = 'error occured';
                    submitButton.disabled = false;
                } else {
                    document.querySelector('.error-container').classList.add('show');
                    submitButton.disabled = false;
                    submitButton.innerHTML = initalText;
                }
            });
        } else {
            // For legacy browsers, use xhr
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "https://amord-process-captcha.herokuapp.com");
            xhr.onreadystatechange = function (ev) {
                if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                    if (PAGE_LANG !== 'en') {
                        window.location.assign('/' + PAGE_LANG + "/thank-you");
                    } else {
                        window.location.assign('/thank-you');
                    }
                }
            }
            xhr.send(new FormData(this));
        }
    } else {
        // Add captcha error message
        document.querySelector('.error-container').classList.add('show');
    }
});

function removeCaptchaMessage() {
    document.querySelector('.error-container').classList.remove('show');
}
