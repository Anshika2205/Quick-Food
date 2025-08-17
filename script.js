  document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const selectedCategory = card.getAttribute('data-category');
    const restaurants = document.querySelectorAll('.restaurant-card');

    restaurants.forEach(restaurant => {
      const type = restaurant.getAttribute('data-type');
      if (type === selectedCategory) {
        restaurant.style.display = 'block';
      } else {
        restaurant.style.display = 'none';
      }
    });
  });
});
const authModal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const signupFields = document.getElementById('signupFields');
const toggleAuth = document.getElementById('toggleAuth');
const authForm = document.getElementById('authForm');

let isLogin = true;

function openAuth(mode) {
  isLogin = (mode === 'login');
  authTitle.textContent = isLogin ? 'Login' : 'Sign Up';
  signupFields.style.display = isLogin ? 'none' : 'block';
  toggleAuth.textContent = isLogin ? "Don't have an account? Sign up" : "Already have an account? Login";
  authModal.style.display = 'block';
}

toggleAuth.addEventListener('click', () => {
  openAuth(isLogin ? 'signup' : 'login');
});

authForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const name = document.getElementById('signupName').value.trim();

  if (isLogin) {
    alert(`Logging in with Email: ${email}`);
    // Yahan real login logic add kar sakte ho
  } else {
    alert(`Signing up ${name} with Email: ${email}`);
    // Yahan real signup logic add kar sakte ho
  }
  authModal.style.display = 'none';
  authForm.reset();
});

// Close modal if clicked outside content
authModal.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.style.display = 'none';
  }
});
document.getElementById("searchBar").addEventListener("change", function() {
  let value = this.value.trim();
  if (value) {
    alert("You searched for: " + value);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("change", function () {
    let food = this.value.trim().toLowerCase();

    // Mapping: food name -> section ID
    const foodIds = {
      "burger": "burger",
      "pizza": "pizza",
      "pasta": "pasta",
      "biryani": "biryani",
      "dosa": "dosa",
      "sandwich": "sandwich",
      "ice cream": "icecream"
    };

    if (foodIds[food]) {
      document.getElementById(foodIds[food]).scrollIntoView({ behavior: "smooth" });
    } else {
      alert("No category found for " + this.value);
    }
  });
});



const products = {
  "Burger": ["Cheese Burger", "Veg Burger", "Chicken Burger"],
  "Pizza": ["Margherita Pizza", "Pepperoni Pizza"],
  "Pasta": ["White Sauce Pasta", "Red Sauce Pasta"]
};

const searchBar = document.getElementById("searchBar");
const suggestions = document.getElementById("suggestions");
const productList = document.getElementById("productList");

searchBar.addEventListener("input", () => {
  let input = searchBar.value.toLowerCase();
  suggestions.innerHTML = "";
  if (input) {
    let filtered = Object.keys(products).filter(item =>
      item.toLowerCase().includes(input)
    );
    filtered.forEach(item => {
      let li = document.createElement("li");
      li.textContent = item;
      li.onclick = () => {
        searchBar.value = item;
        suggestions.innerHTML = "";
        showProducts(item);
      };
      suggestions.appendChild(li);
    });
  }
});

 
 
 



 