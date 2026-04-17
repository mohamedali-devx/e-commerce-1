fetch("products.json")
.then(response => response.json())
.then(data => {
    const swiperItemsSale = document.getElementById("swiper-items-sale");
    const swiperItemsElec = document.getElementById("swiper-items-electronics");
    const swiperItemsAppl = document.getElementById("swiper-items-appliances");
    const swiperItemsMobi = document.getElementById("swiper-items-mobiles");
    data.forEach(product => {
        const precentDisc = Math.round(((product.old_price - product.price) / product.old_price) * 100);
        let saleProduct =  `
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
                    `;
        let elecProduct =  `
                    <div class="swiper-slide product">
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
                        </div>
                        <div class="icons">
                            <span class="btn-add-cart">
                                <i class="fa-solid fa-cart-shopping"></i> add to cart
                            </span>
                            <span class="icon-product"><i class="fa-regular fa-heart"></i></span>
                        </div>
                    </div>
                    `;
        if (product.old_price) {
            swiperItemsSale.innerHTML += saleProduct;
        }
        if (product.category === "electronics") {
            if (product.old_price) {
                swiperItemsElec.innerHTML += saleProduct;
            }
            else {
                swiperItemsElec.innerHTML += elecProduct;
            }
        }
        if (product.category === "appliances") {
            if (product.old_price) {
                swiperItemsAppl.innerHTML += saleProduct;
            }
            else {
                swiperItemsAppl.innerHTML += elecProduct;
            }
        }
        if (product.category === "mobiles") {
            if (product.old_price) {
                swiperItemsMobi.innerHTML += saleProduct;
            }
            else {
                swiperItemsMobi.innerHTML += elecProduct;
            }
        }
    });
});