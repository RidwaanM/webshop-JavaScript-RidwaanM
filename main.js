// Global variables
let cart = [];
let products = [];

// Fetch products and render them
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProducts();
    })
    .catch(error => console.error('Error loading products:', error)); // Hantera eventuella fel

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">${product.price} SEK</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {  // Kontrollera att produkten existerar
        cart.push(product);
        updateCart();
    } else {
        console.error(`Product with id ${productId} not found.`);
    }
}

// Update cart UI
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.name} - ${item.price} SEK</p>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;  // Uppdatera antal varor

    // Visa varukorgen om det finns varor
    const cartDiv = document.getElementById('cart');
    if (cart.length > 0) {
        cartDiv.classList.remove('hidden');  // Ta bort 'hidden' klassen
    } else {
        cartDiv.classList.add('hidden');  // Lägg till 'hidden' klassen om varukorgen är tom
    }
}
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('hidden');
}

