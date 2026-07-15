const PRODUCTS = [
    {
        category: 'star-wars',
        image: './images/75192_Prod.jpg',
        alt: 'LEGO Star Wars: Millennium Falcon',
        name: 'LEGO Star Wars: Millennium Falcon (75192)',
        price: 52498,
        hasQty: true
    },
    {
        category: 'star-wars',
        image: './images/75419_Prod.jpg',
        alt: 'LEGO Star Wars: Death Star',
        name: 'LEGO Star Wars: Death Star (75419)',
        price: 61619,
        hasQty: true
    },
    {
        category: 'star-wars',
        image: './images/75288.jpg',
        alt: 'LEGO Star Wars: AT-AT',
        name: 'LEGO Star Wars: AT-AT Walker(75288)',
        price: 8326,
        hasQty: true
    },
    {
        category: 'star-wars',
        image: './images/75379_alt2.jpg',
        alt: 'LEGO Star Wars: R2D2',
        name: 'LEGO Star Wars: R2D2 (75379)',
        price: 6106,
        hasQty: true
    }
];
 

function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = PRODUCTS.map(p => `
        <div class="product" data-category="${p.category}">
            <img src="${p.image}" alt="${p.alt}" class="product-image">
            <div class="product-details">
                <p class="product-name">${p.name}</p>
                <p class="product-price">₱${p.price.toLocaleString()}</p>
                ${p.hasQty ? `
                <div class="product-qty">
                  <label>Qty: </label>
                  <div class= "qty-selector">
                    <button type="button" class="qty-btn qty-minus">−</button>
                    <input type="number" class="qty-input" value="1" min="1">
                    <button type="button" class="qty-btn qty-plus">+</button>
                   </div>
                  </div>` : ''}
                <button class="add-to-cart-btn" data-name="${p.name}" data-price="${p.price}">Add to Cart &#x1F6D2</button>
            </div>
        </div>
    `).join('');
}
 
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}
 
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
 
function renderCart() {
    const cart = getCart();
    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total-price');
    list.innerHTML = '';

    let checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) {
        checkoutBtn = document.createElement('button');
        checkoutBtn.id = 'checkout-btn';
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.className = 'checkout-btn';
        totalEl.insertAdjacentElement('afterend', checkoutBtn);
        checkoutBtn.addEventListener('click', checkout);
    }

    let clearBtn = document.getElementById('clear-cart-btn');
    if (!clearBtn) {
        clearBtn = document.createElement('button');
        clearBtn.id = 'clear-cart-btn';
        clearBtn.textContent = 'Remove All';
        clearBtn.className = 'clear-cart-btn';
        checkoutBtn.insertAdjacentElement('afterend', clearBtn);
        clearBtn.addEventListener('click', clearCart);
    }
 
    if (cart.length === 0) {
        list.innerHTML = '<li class="cart-empty">Your cart is empty.</li>';
        totalEl.textContent = '₱0.00';
        checkoutBtn.disabled = true;
        clearBtn.disabled = true;
        return;
    }
 
    let total = 0;
    cart.forEach((item, index) => {
        const lineTotal = item.price * item.qty;
        total += lineTotal;

        const li = document.createElement('li');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = `${item.name} (${item.qty}x) - ₱${lineTotal.toFixed(2)}`;
 
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'cart-item-remove';
        removeBtn.addEventListener('click', () => removeFromCart(index));
 
        li.appendChild(nameSpan);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
 
    totalEl.textContent = `₱${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
    clearBtn.disabled = false;
}
 
function addToCart(name, price, qty = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.name === name && item.price === price);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    saveCart(cart);
    renderCart();
}
 
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

    alert(`Thank you for your order!\nItems: ${itemCount}\nTotal: ₱${total.toFixed(2)}`);

    localStorage.removeItem('cart');
    renderCart();
}

function clearCart() {
    const cart = getCart();
    if (cart.length === 0) return;

    localStorage.removeItem('cart');
    renderCart();
}
 
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    renderCart();

    const container = document.getElementById('products-container');

    container.addEventListener('click', (e) => {
        const minusBtn = e.target.closest('.qty-minus');
        const plusBtn = e.target.closest('.qty-plus');
        if (!minusBtn && !plusBtn) return;

        const input = e.target.closest('.qty-selector').querySelector('.qty-input');
        const min = parseInt(input.min, 10) || 1;
        let value = parseInt(input.value, 10) || min;

        if (minusBtn) value = Math.max(min, value - 1);
        if (plusBtn) value = value + 1;

        input.value = value;
    });

    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;

        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));

        const qtyInput = btn.closest('.product-details').querySelector('.qty-input');
        const qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;

        addToCart(name, price, qty);
    });
});
