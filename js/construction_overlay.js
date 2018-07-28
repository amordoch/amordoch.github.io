// Overlay construction notification
function add_lang_overlay(event) {
    span_classes = event.target.classList;
    overlay = document.getElementById('lang-overlay')
    overlay.classList.remove('hide');
    overlay.classList.add('show');
    // Language-specific under construction message
    if (span_classes.contains('flag-icon-de')) {
        // Select first <p> of the lang-overlay div
        overlay.children[0].innerHTML = 'Die deutsche Seite ist gerade im Aufbau. \
Während des Aufbaus, bitte benutzen Sie die englische Seite. Dankeschön!';
    } else if (span_classes.contains('flag-icon-il')) {
        overlay.children[0].innerHTML = '\u202eתרגום האתר לא מוחן. נא להשתמש בגירסה האנגלית. תודה\u202e';
    } else {
        overlay.children[0].innerHTML = 'Looks like something went wrong. Please click the \
flag below to return to the previous page.';
    }
}

// Remove construction notification
function rm_lang_overlay(event) {
    document.getElementById('lang-overlay').classList.remove('show');
    document.getElementById('lang-overlay').classList.add('hide')
}
