// Use an Array here because HTMLCollections aren't iteratable in Edge
let slide_selections = Array.from(document.getElementById('category-tabs').children);
let slide_active_selection = document.getElementsByClassName('slide-active-selection')[0];
let active_slide = document.getElementsByClassName('active-slide')[0];
// temporarily remove active-slide-nav class on hover, focus, and click
for(let selection of slide_selections) {
  selection.onmouseover = selection.onfocus = function () {
    slide_active_selection.classList.remove('slide-active-selection');
  };
  selection.onmouseleave = selection.onfocusout = function () {
    slide_active_selection.classList.add('slide-active-selection');
  };
  // On click, we also need to change the active slide
  selection.onclick = function (event) {
    // slide-active-selection change
    slide_active_selection.classList.remove('slide-active-selection');
    event.target.classList.add('slide-active-selection');
    slide_active_selection = event.target;
    // active-slide change
    let new_slide = document.getElementById(event.target.innerHTML);
    active_slide.classList.remove('active-slide');
    active_slide = new_slide;
    active_slide.classList.add('active-slide');
  };
}
