fetch("products.json")
.then(response => response.json())
.then(data => {
    const swiperItemsSale = document.getElementById("swiper-items-sale");

    data.forEach(product => {
        if (product.old_price) {
            const precentDisc = Math.round(((product.old_price - product.price) / product.old_price) * 100);

            swiperItemsSale.innerHTML += `
                    <div class="swiper-slide product">
                        <span class="sale-present">${precentDisc}%</span>
                        <div class="img-product">
                            <a href="#">
                                <img src="${product.img}" alt="Product Image">
                            </a>
                        </div>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="name-product">${product.name}</div>
                        <div class="price">
                            <p><span>$${product.price}</span></p>
                            <p class="old-price">$${product.old_price}</p>
                        </div>
                        <div class="icons">
                            <span class="btn-add-cart">
                                <i class="fa-solid fa-cart-shopping"></i> add to cart
                            </span>
                            <span class="icon-product"><i class="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
                    `
        }
    })
});