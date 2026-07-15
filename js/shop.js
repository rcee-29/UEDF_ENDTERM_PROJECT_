const PRODUCTS = [
    {
        category: 'featured',
        image: './images/Featured1.jpg',
        alt: 'Ferrari',
        name: 'Lego Speed Champions: Ferrari 499P (77261)',
        price: 1847,
        hasQty: true,
        featured: true
    },
    {
        category: 'featured',
        image: './images/Featured2.jpg',
        alt: 'World Cup',
        name: 'Lego Editions: World Cup Trophy (43020)',
        price: 12320,
        hasQty: true,
        featured: true
    },
    {
        category: 'featured',
        image: './images/Featured3.jpg',
        alt: 'Sorting Hat',
        name: 'Lego Harry Potter: Talking Sorting Hat (76249)',
        price: 6159,
        hasQty: true,
        featured: true
    },
    {
        category: 'star-wars',
        image: './images/75192_Prod.jpg',
        alt: 'LEGO Star Wars: Millennium Falcon',
        name: 'LEGO Star Wars: Millennium Falcon (75192)',
        price: 52498,
        hasQty: true,
        featured: true
    },
    {
        category: 'star-wars',
        image: './images/75419_Prod.jpg',
        alt: 'LEGO Star Wars: Death Star',
        name: 'LEGO Star Wars: Death Star (75419)',
        price: 61619,
        hasQty: true,
        featured: false
    },
    {
        category: 'star-wars',
        image: './images/75288.jpg',
        alt: 'LEGO Star Wars: AT-AT',
        name: 'LEGO Star Wars: AT-AT Walker(75288)',
        price: 8326,
        hasQty: true,
        featured: true
    },
    {
        category: 'star-wars',
        image: './images/75379_alt2.jpg',
        alt: 'LEGO Star Wars: R2D2',
        name: 'LEGO Star Wars: R2D2 (75379)',
        price: 6106,
        hasQty: true,
        featured: false
    },
    {
        category: 'ninjago',
        image: './images/70751.jpg',
        alt: 'ninjago',
        name: 'Lego Ninjago: Temple of Airjitzu (70751)',
        price: 12274,
        hasQty: true,
        featured: false
    },
    {
        category: 'ninjago',
        image: './images/71705.jpg',
        alt: 'ninjago',
        name: 'Lego Ninjago: Destinys Bounty (71705)',
        price: 6353,
        hasQty: true,
        featured: false
    },
    {
        category: 'ninjago',
        image: './images/71741_Prod.jpg',
        alt: 'ninjago',
        name: 'Lego Ninjago: City Gardens (71741)',
        price: 17270,
        hasQty: true,
        featured: true
    },
    {
        category: 'ninjago',
        image: './images/71870_Prod.jpg',
        alt: 'ninjago',
        name: 'Lego Ninjago: The Twin Titans Mech (71870)',
        price: 14124,
        hasQty: true,
        featured: false
    },
    {
        category: 'marvel',
        image: './images/76269.jpg',
        alt: 'marvel',
        name: 'Lego Marvel: Avengers Tower (76269)',
        price: 30778,
        hasQty: true,
        featured: false
    },
    {
        category: 'marvel',
        image: './images/76178_Prod.jpg',
        alt: 'marvel',
        name: 'Lego Marvel: Daily Bugle (76178)',
        price: 21526,
        hasQty: true,
        featured: false
    },
    {
        category: 'marvel',
        image: './images/76218.jpg',
        alt: 'marvel',
        name: 'Lego Marvel: Sanctum Sanctorum(76218)',
        price: 12274,
        hasQty: true,
        featured: true
    },
    {
        category: 'marvel',
        image: './images/76042.jpg',
        alt: 'marvel',
        name: 'Lego Marvel:The SHIELD Helicarrier (76042)',
        price: 21526,
        hasQty: true,
        featured: false
    },
    {
        category: 'dc-universe',
        image: './images/76240.jpg',
        alt: 'dc-universe',
        name: 'Lego DC: Batmobile Tumbler (76240)',
        price: 13261,
        hasQty: true,
        featured: false
    },
    {
        category: 'dc-universe',
        image: './images/70922.jpg',
        alt: 'dc-universe',
        name: 'Lego DC: The Joker Manor (70922)',
        price: 16592,
        hasQty: true,
        featured: false
    },
    {
        category: 'dc-universe',
        image: './images/76300_Prod.jpg',
        alt: 'dc-universe',
        name: 'Lego DC: Arkham Asylum (76300)',
        price: 24610,
        hasQty: true,
        featured: true
    },
    {
        category: 'dc-universe',
        image: './images/76252.jpg',
        alt: 'dc-universe',
        name: 'Lego DC: Batcave - Shadow Box (76252)',
        price: 19737,
        hasQty: true,
        featured: false
    },
];

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category'); // returns null if no category in URL
}

function renderProducts(category) {
    const container = document.getElementById('products-container');

    let filteredProducts;
    if (category === 'featured') {
        filteredProducts = PRODUCTS.filter(p => p.featured === true);
    } else if (category) {
        filteredProducts = PRODUCTS.filter(p => p.category === category);
    } else {
        filteredProducts = PRODUCTS; // no category param = show everything
    }

    if (filteredProducts.length === 0) {
        container.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }

    container.innerHTML = filteredProducts.map(p => `
        <div class="product" data-category="${p.category}">
            <img src="${p.image}" alt="${p.alt}" class="product-image">
            <div class="product-details">
                <p class="product-name">${p.name}</p>
                <p class="product-price">₱${p.price.toLocaleString()}</p>
                ${p.hasQty ? `
                <div class="product-qty">
                  <label>Qty: </label>
                  <div class="qty-selector">
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

        li.appenDChild(nameSpan);
        li.appenDChild(removeBtn);
        list.appenDChild(li);
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
   
    const initialCategory = getCategoryFromURL() || 'featured';
    renderProducts(initialCategory);
    renderCart();

    
    const initialBtn = document.querySelector(
        `.category-btn[data-category="${initialCategory}"]`
    );
    if (initialBtn) initialBtn.classList.add('active');

    const container = document.getElementById('products-container');

    
    document.querySelector('.category-filters').addEventListener('click', (e) => {
        const btn = e.target.closest('.category-btn');
        if (!btn) return;

        const category = btn.getAttribute('data-category');
        renderProducts(category);

        
        const newUrl = category === 'featured'
            ? window.location.pathname
            : `${window.location.pathname}?category=${category}`;
        window.history.pushState({}, '', newUrl);

        
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });

    
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
