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
                    fetch('https://arielmordoch.com/hidden.json').then(
                        response => response.json()
                    ).then(function (eml) {
                        encrypted = eml.email;
                        let decoded = '';
                        for (let i = 0; i < encrypted.length; i++) {
                            decoded += String.fromCodePoint(encrypted.codePointAt(i) - 1);
                        }
                        window.location.assign("mailto:" + decoded);
                    });
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
                    eml.open('GET', 'https://arielmordoch.com/hidden.json');
                    eml.responseType = 'json';
                    eml.onload = function (e) {
                        encrypted = this.response.email;
                        let decoded = '';
                        for (let i = 0; i < encrypted.length; i++) {
                            decoded += String.fromCodePoint(encrypted.codePointAt(i) - 1);
                        }
                        window.location.assign("mailto:" + decoded);
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