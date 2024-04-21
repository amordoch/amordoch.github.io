---
---

/**
 * Captcha callback; remove if successful, replace with email returned by
 * "backend." 
 */
function removeCaptchaMessage() {
    // ***RESET TO grecaptcha.getResponse() IN PROD***
    const APP_URL = "https://amord-process-captcha.onrender.com/";
    let captcha = grecaptcha.getResponse();
    if (captcha) {
        // Disable error message, if active
        document.querySelector('.error-container').classList.remove('show');
        // Disable submit button, change text
        const PAGE_LANG = document.childNodes[1].lang;
        const contactPara = document.getElementById('contact-text')
        const initalText = contactPara.textContent;
        if (PAGE_LANG === 'en') {
            contactPara.textContent = '{{ site.data.i18n.en.contactlabels.waittext }}';
        } else if (PAGE_LANG === 'de') {
            contactPara.textContent = '{{ site.data.i18n.de.contactlabels.waittext }}';
        } else if (PAGE_LANG == 'es') {
            contactPara.textContent = '{{ site.data.i18n.es.contactlabels.waittext }}';
        }
        // Get response, redirect to thank you page
        if (window.fetch) {
            fetch(APP_URL, {
                method: 'POST',
                mode: 'cors',
                body: {'g-recaptcha-response': captcha}
            }).then(function (response) {
                if (response.ok) {
                    contactPara.textContent = response.json['email'] + " | " + response.json['phone']
                    document.getElementById('g-recaptcha').setAttribute('display', 'none');
                } else if (response.status === 500) {
                    contactPara.textContent = 'error occured';
                } else {
                    document.querySelector('.error-container').classList.add('show');
                    contactPara.disabled = false;
                    contactPara.textContent = initalText;
                }
            });
        }
    } else {
        // Add captcha error message
        document.querySelector('.error-container').classList.add('show');
    }
}
