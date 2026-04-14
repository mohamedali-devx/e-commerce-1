let category_nav_list = document.querySelector(".category-nav-list");
function open_cat_list() {
    category_nav_list.classList.toggle("active");
}
let category_btn = document.querySelector(".category-btn");
category_btn.addEventListener("click", open_cat_list);





// Initialize Swiper
var swiper = new Swiper(".slide-swp", {
    pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
    clickable: true,
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
});