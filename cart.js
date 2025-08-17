// ===================== Add Item to Cart =====================
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const name = button.getAttribute('data-name');
    const price = Number(button.getAttribute('data-price'));

    // Check if item already in cart
    const existingItem = cart.find(item => item.name === name);
    if(existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({name: name, price: price, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✅ ${name} added to cart!`);
    loadCart(); // Refresh cart view
  });
});

// ===================== Load Cart Items =====================
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let container = document.getElementById("cartItems");
  let total = 0;
  container.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    container.innerHTML += `
      <div class="item">
        <span class="name">${item.name} - ₹${item.price}</span>
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  document.getElementById("totalPrice").textContent = total;
}

// ===================== Change Quantity =====================
function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += change;
  if(cart[index].quantity < 1) cart[index].quantity = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ===================== Remove Item =====================
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ===================== Show Payment Fields =====================
function showPaymentFields() {
  const method = document.getElementById("paymentMethod").value;
  const detailsDiv = document.getElementById("paymentDetails");
  detailsDiv.innerHTML = "";

  if(method === "upi") {
    detailsDiv.innerHTML = `<input type="text" id="upiId" placeholder="Enter UPI ID" />`;
  } 
  else if(method === "card") {
    detailsDiv.innerHTML = `
      <input type="text" id="cardName" placeholder="Name on Card" />
      <input type="text" id="cardNumber" placeholder="Card Number" />
      <input type="text" id="cardExpiry" placeholder="MM/YY" />
      <input type="text" id="cardCvv" placeholder="CVV" />
    `;
  } 
  else if(method === "wallet") {
    detailsDiv.innerHTML = `<input type="text" id="walletId" placeholder="Wallet ID" />`;
  }
}

// ===================== Place Order =====================
function placeOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let method = document.getElementById("paymentMethod").value;

  if(cart.length === 0) {
    alert("❌ Cart is empty!");
    return;
  }

  if(!method) {
    alert("❌ Please select a payment method!");
    return;
  }

  // Validate payment details
  if(method === "upi" && !document.getElementById("upiId").value.trim()) {
    alert("❌ Please enter your UPI ID!");
    return;
  }
  if(method === "card") {
    const cardName = document.getElementById("cardName").value.trim();
    const cardNumber = document.getElementById("cardNumber").value.trim();
    const cardExpiry = document.getElementById("cardExpiry").value.trim();
    const cardCvv = document.getElementById("cardCvv").value.trim();

    if(!cardName || !cardNumber || !cardExpiry || !cardCvv) {
      alert("❌ Please fill all card details!");
      return;
    }
  }
  if(method === "wallet" && !document.getElementById("walletId").value.trim()) {
    alert("❌ Please enter wallet ID!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + item.price*item.quantity, 0);

  alert(`🎉 Order placed successfully!\nTotal Paid: ₹${total}\nPayment Method: ${method.toUpperCase()}`);

  localStorage.removeItem("cart");
  loadCart();
}

// ===================== Initial Load =====================
loadCart();
