---
---

/**
 * Captcha callback; remove if successful, replace with email returned by
 * "backend." 
 */
function handleCaptcha(captchaResponse) {
    // ***RESET TO grecaptcha.getResponse() IN PROD***
    const APP_URL = "https://amord-process-captcha.onrender.com/";
    if (captchaResponse) {
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'g-recaptcha-response': captchaResponse})
            }).then((response) => {
                if (response.status === 500) {
                    contactPara.textContent = 'error occured';
                } else if (!response.ok) {
                    document.querySelector('.error-container').classList.add('show');
                    contactPara.textContent = initalText;
                }
                return response;
            }).then((response) => response.json())
            .then((data) => {
                contactPara.textContent = data['email'] + " | " + data['phone'];
                document.getElementById('captcha-container').classList.add('hide');
            });
        }
    } else {
        // Add captcha error message
        document.querySelector('.error-container').classList.add('show');
    }
}
