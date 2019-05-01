function lang_redirect(lang) {
    if (lang instanceof Event) {
        lang = lang.target.value;
        document.getElementById('language-select').form.reset();
    }
    // Simply redirect to current page (except for resume) in the given language
    let path = window.location.pathname;
    if (lang === 'en') {
        window.location = window.location.href.replace('/de/', '/').replace('/es/', '/');
    } else if (lang === 'he' || (lang === 'es' && path.includes('resume'))) {
        add_lang_overlay('', lang);
    } else if (!path.includes('/' + lang + '/')) {
        if (path.includes('/de/') || path.includes('/es/')) {
            window.location = window.location.href.replace('/de/', '/' + lang + '/').replace('/es/', '/' + lang + '/');
        } else {
            window.location = window.location.origin + '/' + lang + path;
        }
    } 
}