let productInCart = JSON.parse(localStorage.getItem("all-product-cart"));

const emptyCart = document.querySelector("#empty-cart");
const thanksMsg = document.querySelector("#thanks-msg");
const productContainer = document.querySelector("#cart-products");
const cartActions = document.querySelector("#cart-actions");
let deleteBtn = document.querySelectorAll(".cart-delete");
const emptyCartBtn = document.querySelector("#empty-shopping-cart");
const buyNow = document.querySelector("#cart-buy-now");
const totalBill = document.querySelector("#total");

function loadCart() {
  if (productInCart && productInCart.length > 0) {
    emptyCart.classList.add("disable");
    productContainer.classList.remove("disable");
    cartActions.classList.remove("disable");
    thanksMsg.classList.add("disable");

    productContainer.innerHTML = "";

    productInCart.forEach((product) => {
      const div = document.createElement("div");

      div.classList.add("product-cart");
      div.innerHTML = ` <img
 class="cart-product-img"
 src="${product.image}"
 alt="${product.title}"
/>
<div class="cart-title">
 <small>Title</small>
 <h3>${product.title} 01</h3>
</div>
<div class="cart-quantity">
 <small>Quantity</small>
 <p>${product.quantity}</p>
</div>
<div class="cart-price">
 <small>price</small>
 <p> £${product.price}</p>
</div>
<div class="cart-subtotal">
 <small>subtotal</small>
 <p> £${product.price * product.quantity}</p>
</div>
<button id="${product.id}" class="cart-delete">
 <i class="bi bi-trash-fill"></i>
</button>`;

      productContainer.append(div);
    });
    updateAddBtn();
    total();
  } else {
    emptyCart.classList.remove("disable");
    productContainer.classList.add("disable");
    cartActions.classList.add("disable");
    thanksMsg.classList.add("disable");
  }
}



function updateAddBtn() {
  deleteBtn = document.querySelectorAll(".cart-delete");

  deleteBtn.forEach((botton) => {
    botton.addEventListener("click", deleteFromCart);
  });
}

function deleteFromCart(e) {
  const idBtn = e.currentTarget.id;

  const index = productInCart.findIndex((product) => product.id === idBtn);

  productInCart.splice(index, 1);
  loadCart();
  localStorage.setItem("all-product-cart", JSON.stringify(productInCart));
}
emptyCartBtn.addEventListener("click", emptyAll);
function emptyAll() {
  productInCart.length = 0;
  localStorage.setItem("all-product-cart", JSON.stringify(productInCart));
  thanksMsg.classList.add("disable");
  loadCart();
}

function total() {
  const total = productInCart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  totalBill.innerText = `${total}`;
}
buyNow.addEventListener('click', message);
function message(){
    thanksMsg.classList.remove("disable");
    productContainer.innerHTML = "";
    cartActions.classList.add("disable");
    productInCart.length = 0;
    localStorage.setItem("all-product-cart", JSON.stringify(productInCart));
  

}

loadCart();