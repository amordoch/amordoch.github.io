// Overlay construction notification
function add_lang_overlay(event, which) {
  // For the <select> at the bottom of the page, which passes ''
  if (!which) {
    which = event.target.value;
    // Reset selection so it displays english
    event.target.form.reset();
  }
  overlay = document.getElementById('lang-overlay')
  overlay.classList.remove('hide');
  overlay.classList.add('show');
  // Language-specific under construction message
  if (which === 'de') {
    // Select first <p> of the lang-overlay div
    overlay.children[0].innerHTML = 'Die deutsche Seite ist gerade im Aufbau. \
Während des Aufbaus, bitte benutzen Sie die englische Seite. Dankeschön!';
  } else if (which === 'he') {
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
