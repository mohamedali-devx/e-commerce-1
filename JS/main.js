let category_nav_list = document.querySelector(".category-nav-list");
function open_cat_list() {
    category_nav_list.classList.toggle("active");
}
let category_btn = document.querySelector(".category-btn");
category_btn.addEventListener("click", open_cat_list);
