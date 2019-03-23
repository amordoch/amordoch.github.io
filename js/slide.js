let slide_selections = Array.from(document.querySelectorAll('#category-tabs button'));
let slide_active_selection = document.getElementsByClassName('slide-active-selection')[0];
let active_slide = document.getElementsByClassName('active-slide')[0];
// temporarily remove active-slide-nav class on hover, focus, and click
for(let selection of slide_selections) {
  /* selection.onfocusin = function () {
    slide_active_selection.classList.remove('slide-active-selection');
  };
  selection.onfocusout = function () {
    slide_active_selection.classList.add('slide-active-selection');
  }; */
  // On click, we also need to change the active slide
  selection.onclick = function (event) {
    // slide-active-selection change
    slide_active_selection.classList.remove('slide-active-selection');
    event.target.classList.add('slide-active-selection');
    slide_active_selection = event.target;
    // active-slide change
    let new_slide = document.getElementById(event.target.value);
    active_slide.classList.remove('active-slide');
    // Animate transition - only needs to be added on the first change to work for all changes
    active_slide.classList.add('slide-anim-dismiss');
    active_slide = new_slide;
    active_slide.classList.add('active-slide');
  };
}
/* Change to proper slide if page is reloaded */
window.onhashchange = function (event) {
  hash = event.newURL.replace('#', '');
  let new_slide = document.getElementById(hash);
  slide_active_selection.classList.remove('slide-active-selection');
  document.getElementById(hash).classList.add('slide-active-selection');
}
