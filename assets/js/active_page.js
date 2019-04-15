let page_url = window.location.href;
let nav_as = document.querySelectorAll('.navbar > ul > li > a');
// Go through each link, comparing href to current page
for (let a of nav_as) {
  if (!a.href.includes('#') && a.href === page_url) {
    a.parentElement.classList.add('nav-bottom-shadow');
  }
}
