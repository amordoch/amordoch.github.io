let page_url = window.location.href;
let nav_as = document.querySelectorAll('.navbar > ul > li > a');
// Go through each link, comparing href to current page
for (let a of nav_as) {
  if (!a.href.includes('#') && a.href === page_url) {
    a.parentElement.classList.add('nav-bottom-shadow');
  }
}

const hint = document.querySelector('#scroll-hint');
if (hint) {
  window.addEventListener('scroll', () => {
    hint.style.opacity = 1 - Math.min(window.scrollY / window.innerHeight, 1);
  });
}

// Position nav popover as anchor positioning, overlay CSS attributes are not
// fully supported yet
const langMenu = document.querySelector('#lang-menu')
langMenu.addEventListener('beforetoggle', () => {
  const parentRect = document.querySelector('.dropdown').getBoundingClientRect();
  langMenu.style.left = `${parentRect.left}px`;
  langMenu.style.top = `${parentRect.bottom}px`;
  langMenu.style.minWidth = `${parentRect.width}px`;
})
// Enable hover for desktop; must use JS as well since position is scripted
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelector('.dropdown').addEventListener('mouseenter', () => {
    langMenu.showPopover();
  });
  document.querySelector('.dropdown').addEventListener('mouseleave', () => {
    langMenu.hidePopover();
  });
}
// And collapse on scroll to avoid the menu sticking around
window.addEventListener('scroll', () => {
  if (langMenu.matches(":popover-open")) {
    langMenu.hidePopover();
  }
});