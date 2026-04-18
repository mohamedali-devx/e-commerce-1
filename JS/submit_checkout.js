const scriptURL = "https://script.google.com/macros/s/AKfycbz3GD5NgAd1R8xmPirglB_OtFKLgGhapI7J-0mRwLr4WPNVdcuCTyH399jPeKbm6LU/exec";

let form = document.getElementById("form_contact");

form.addEventListener("submit", e => {
    e.preventDefault();

    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
    })
    .then(response => {
        setTimeout(() => {
            localStorage.removeItem("cart");
            window.location.reload();
        }, 1000);
    })
    .catch(error => console.error("error!", error.message))
});