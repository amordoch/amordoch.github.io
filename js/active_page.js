let page_url = window.location.href;
// Modify page_url so highlighting works on initial load
if (window.location.pathname == '/') {
  page_url += "index.html"
}
let nav_as = document.querySelectorAll('.navbar > ul > li > a');
// Go through each link, comparing href to current page
for (let a of nav_as) {
  if (!a.href.includes('#') && a.href === page_url) {
    a.parentElement.classList.add('nav-bottom-shadow');
  }
}
