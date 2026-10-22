
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categories = document.getElementById("categories");
const resultsText = document.getElementById("resultsText");
const cartCount = document.getElementById("cartCount");
const cartButton = document.getElementById("cartButton");
const toast = document.getElementById("toast");

let products = [];
let selectedCategory = "All";
let cart = [];

async function loadProducts() {
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error("Unable to load products");
    }

    products = await response.json();
    renderProducts();
  } catch (error) {
    resultsText.textContent = "Could not load products. Please try again.";
    console.error(error);
  }
}

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  resultsText.textContent =
    `${filteredProducts.length} product(s) found`;

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No products found</h3>
        <p>Try a different search or category.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div>
          <h3>${product.name}</h3>
          <p>${product.category} · ${product.description}</p>
        </div>
        <span class="product-price">
          ₹${product.price.toLocaleString("en-IN")}
        </span>
      </div>
      <button class="product-action" data-add="${product.id}">
        + Add to bag
      </button>
    </article>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");

  setTimeout(() => {
    toast.classList.remove("visible");
  }, 2200);
}

searchInput.addEventListener("input", renderProducts);

categories.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  categories.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-add]");

  if (!button) return;

  const product = products.find(
    (item) => item.id === Number(button.dataset.add)
  );

  if (!product) return;

  cart.push(product);
  cartCount.textContent = cart.length;

  showToast(`${product.name} added to your bag`);
});

cartButton.addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your shopping bag is empty");
    return;
  }

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  showToast(
    `${cart.length} item(s) · Total ₹${total.toLocaleString("en-IN")}`
  );
});

loadProducts();

