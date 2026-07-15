function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
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
}

document.addEventListener('DOMContentLoaded', function () {
    const cardsContainer = document.querySelector('.cardsfeatured');
    if (!cardsContainer) return;

    cardsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn2');
        if (!btn) return;

        e.preventDefault();
        e.stopPropagation();

        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));

        addToCart(name, price, 1);

        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1000);
    });
});