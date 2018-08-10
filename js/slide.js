let slide_selections = document.getElementById('category-tabs').children;
let slide_active_selection = document.getElementsByClassName('slide-active-selection')[0];
/* temporarily remove active-slide-nav class on hover & focus */
for(let selection of slide_selections) {
  selection.onmouseover = selection.onfocus = function () {
    slide_active_selection.classList.remove('slide-active-selection');
  };
  selection.onmouseleave = selection.onfocusout = function () {
    slide_active_selection.classList.add('slide-active-selection');
  };
  selection.onclick = function (event) {
    slide_active_selection.classList.remove('slide-active-selection');
    event.target.classList.add('slide-active-selection');
    slide_active_selection = event.target;
  };
}
