
let cart = [];
/*
line 8 Checks if cart data already exists in local storage, if it exist then the cart data is put in the cart variable.
This way, when you reload the page, the cart remembers what's already in it.Data is not lost
*/
if (localStorage.getItem('cartData')) {
  cart = JSON.parse(localStorage.getItem('cartData'));
}
function addToCart(productName, price) {
  const product = cart.find((item) => {
    return item.name === productName
  });
  if (product) {
    product.quantity += 1;
  } else {
    cart.push({ name: productName, quantity: 1, price: price });
  }

  // Update local storage every time a product is added
  localStorage.setItem('cartData', JSON.stringify(cart));
  upDateCartDisplay();
  itemIncrement();
}
//store cart in local storage so that data doesn't get lost when broswer get closed
//convert data type(array) to string first

//function to update cart
function upDateCartDisplay() {
  const cartList = document.getElementById("cart-items");
  // const totalPrice = document.getElementById("total-price")
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `x${item.quantity} ${item.name} - $${item.price}`;
    cartList.appendChild(li);
    removeFromCart();
  });
}

function removeFromCart() {
  const img = document.createElement("img");
  img.src = "/image/cancel_30dp_EA3323_FILL0_wght400_GRAD0_opsz24.png";
  img.style.width = "14px";
  img.style.height = "";
  let data = document.getElementById("cart-items");
  data.appendChild(img);


  //when you click on the image item get removed from the cart
  img.addEventListener("click", () => {
    if (cart.length === 0) return; // Check if cart is empty
    cart.splice(0, 1); // Remove the first item from the cart, improve this line of code
    // Update the cart display after removing the item
    reduction()
    upDateCartDisplay();

  });
}

// this is for item increment ++
let itemListCount = "";
itemListCount = 0;
let itemIncrement = () => {
  let count = document.getElementById('itemcount')
  count.innerText = ++itemListCount;
  totalPrice();
};

//This removes item from the cart
function reduction() {
  let decrement = document.getElementById('itemcount')
  decrement.innerText = --itemListCount;
  totalPrice();
}

//Total price of the items in the cart
function totalPrice() {
  let totalPrice = 0;
  const totalPriceElement = document.getElementById("total-price");
  cart.forEach((item) => {
    totalPrice += (item.price) + item.quantity;
    totalPriceElement.innerText = `$${totalPrice}`;
  })
}

let resetButton = document.getElementById("newOrder-btn")
resetButton.addEventListener("click", resetCart);
// This function clears the cart
// and resets the item count
function resetCart() {
  cart = [];
  itemListCount = 0;
  const cartList = document.getElementById("cart-items");
  cartList.innerHTML = "";
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "$0";
  const count = document.getElementById('itemcount');
  count.innerText = "0";
  alert("Order confirmed, enjoy your meal. Please start a new order")
}


