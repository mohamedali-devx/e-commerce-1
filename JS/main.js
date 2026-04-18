let category_nav_list = document.querySelector(".category-nav-list");

function open_cat_list(){
    category_nav_list.classList.toggle("active");
}

let category_btn = document.querySelector(".category-btn");
category_btn.addEventListener("click", open_cat_list);


let nav_links = document.querySelector(".nav-links");

function open_Menu() {
    nav_links.classList.toggle("active");
}


var cart = document.querySelector('.cart');

function open_close_cart() {
    cart.classList.toggle("active");
}


fetch('products.json')
.then(response => response.json())
.then(data => {
    
    const addToCartButtons = document.querySelectorAll(".btn-add-cart");

    addToCartButtons.forEach(button =>{
        button.addEventListener("click", (event) => {

            const productId = event.currentTarget.getAttribute('data-id');
            const selectedProduct = data.find(product => product.id == productId);
            
            addToCart(selectedProduct);

            const allMatchingButtons = document.querySelectorAll(`.btn-add-cart[data-id="${productId}"]`);

            allMatchingButtons.forEach(btn =>{
                btn.classList.add("active");
                btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item in cart`;
            });
        });
    });
    
});


function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push({... product , quantity: 1});
    localStorage.setItem('cart' , JSON.stringify(cart));

    updateCart();
}


function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const checoutItems = document.getElementById("checkout-items");

    let items_input = document.getElementById("the_items") || "";
    let total_price_input = document.getElementById("total_price") || "";
    let count_items = document.getElementById("count_items") || "";
    
    if (checoutItems) {
        checoutItems.innerHTML = "";


        items_input.value = "";
        total_price_input.value = "";
        count_items.value = "";
    }

    var total_Price = 0;
    var total_count = 0;

    cartItemsContainer.innerHTML = "";

    cart.forEach((item , index) => {

        let total_Price_item = item.price * item.quantity;

        total_Price += total_Price_item;
        total_count += item.quantity;

        // Checkout Input
        items_input.value += item.name + "---" + "price: " + total_Price_item + "---" + "count: " + item.quantity + "\n";
        total_price_input.value = total_Price + 20;
        count_items.value = total_count;
        
        cartItemsContainer.innerHTML += `
        
            <div class="item-cart">
                <img src="${item.img}" alt="">
                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price-cart">$${total_Price_item}</p>
                    <div class="quantity-control">
                        <button class="dec" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="inc" data-index="${index}">+</button>
                    </div>
                </div>

                <button class="delete-item" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;

        if (checoutItems) {
            checoutItems.innerHTML += `
                        <div class="item_cart">
                            <div class="image_name">
                                <img src="${item.img}" alt="">
                                <div class="content">
                                    <h4>${item.name}</h4>
                                    <p class="price_cart">$${total_Price_item}</p>
                                    <div class="quantity_control">
                                        <button class="dec" data-index="${index}">-</button>
                                        <span class="quantity">${item.quantity}</span>
                                        <button class="inc" data-index="${index}">+</button>
                                    </div>
                                </div>
                            </div>
                            <button class="delete-item" data-index="${index}">
                                <i style="font-size: 25px;" class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
            `
        }
    });


    const price_cart_total = document.querySelector('.price-cart-total');
    const count_item_cart = document.querySelector('.count-item-cart');
    const count_item_header = document.querySelector('.count-item-header');
    
    if(price_cart_total) price_cart_total.innerHTML = `$ ${total_Price}`;
    if(count_item_cart) count_item_cart.innerHTML = total_count;
    if(count_item_header) count_item_header.innerHTML = total_count;


    const increaseButtons = document.querySelectorAll(".inc");
    const decreaseButtons = document.querySelectorAll(".dec");

    if (checoutItems) {
        const subtotal_checkout = document.querySelector(".subtotal_checkout");
        const total_checkout = document.querySelector(".total_checkout");

        subtotal_checkout.innerHTML = `$${total_Price}`;
        total_checkout.innerHTML = `$${total_Price + 20}`;
    }

    increaseButtons.forEach(button => {
        button.addEventListener("click" , (event) =>{
            const itemIndex = event.currentTarget.getAttribute("data-index");
            increaseQuantity(itemIndex);
        });
    });


    decreaseButtons.forEach(button => {
        button.addEventListener("click" , (event) =>{
            const itemIndex = event.currentTarget.getAttribute("data-index");
            decreaseQuantity(itemIndex);
        });
    });


    const deleteButtons = document.querySelectorAll('.delete-item');
    
    deleteButtons.forEach(button =>{
        button.addEventListener('click' , (event) =>{
            const itemIndex = event.currentTarget.getAttribute('data-index');
            removeFromCart(itemIndex);
        });
    });

}


function increaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += 1;
    localStorage.setItem('cart' , JSON.stringify(cart));
    updateCart();
}


function decreaseQuantity(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart[index].quantity > 1){
        cart[index].quantity -= 1;
    }

    localStorage.setItem('cart' , JSON.stringify(cart));
    updateCart();
}


function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const removedProduct = cart.splice(index , 1)[0];
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCart();
    updateButtonsState(removedProduct.id);
}


function updateButtonsState(productId) {
    const allMatchingButtons = document.querySelectorAll(`.btn-add-cart[data-id="${productId}"]`);
    
    allMatchingButtons.forEach(button =>{
        button.classList.remove('active');
        button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart`;
    });
}


updateCart();