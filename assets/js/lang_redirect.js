function lang_redirect(lang) {
    if (lang instanceof Event) {
        lang = lang.target.value;
        document.getElementById('language-select').form.reset();
    }
    // Simply redirect to current page (except for resume) in the given language
    let path = window.location.pathname;
    const PAGE_LANG = document.childNodes[1].lang;
    if (lang === 'en') {
        window.location.assign(path.replace('/' + PAGE_LANG + '/', '/'));
    } else if (lang === 'he' || (lang === 'es' && path.includes('resume'))) {
        add_lang_overlay(null, lang);
    } else if (lang !== PAGE_LANG) {
        if (PAGE_LANG !== 'en') {
            window.location.assign(path.replace('/' + PAGE_LANG + '/', '/' + lang + '/'));
        } else {
            window.location.assign('/' + lang + path);
        }
    } 
}