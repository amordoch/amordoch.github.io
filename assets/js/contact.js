function decode(encrypted) {
    // Subtract 1 from every code point in string e.
    let decoded = '';
    for (let i = 0; i < encrypted.length; i++) {
        decoded += String.fromCodePoint(encrypted.codePointAt(i) - 1);
    }
    // Replace <p> element with email address and remove prompt
    let captcha = document.getElementsByClassName('g-recaptcha')[0];
    captcha.previousElementSibling.outerHTML = `<address>My email address is \
    <a href="mailto:${decoded}">${decoded}</a></address>`;
    captcha.remove();
}

function handle_captcha(tok) {
    // Send reCAPTCHA user response token to backend
    let url = "https://amord-process-captcha.herokuapp.com";
    if (fetch) {
        data = {
            method: 'POST',
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({token: tok})
        };
        fetch(url, data).then(response => response.json()).then(
            function (response) {
                if (response.success) {
                    fetch('https://www.arielmordoch.com/hidden.json').then(
                        response => response.json()
                    ).then(eml => decode(eml.email));
                }
            }
        );
    } else {
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://amord-process-captcha.herokuapp.com', true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                if (this.response.success) {
                    eml = new XMLHttpRequest();
                    eml.open('GET', 'https://www.arielmordoch.com/hidden.json');
                    eml.responseType = 'json';
                    eml.onload = function (e) {
                        decode(this.response.email)
                    }
                    eml.send();
                }
            }
        }

        xhr.send(JSON.stringify({
            token: tok
        }));
    }
}
