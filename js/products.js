// Product data
const products = {
    keychains: [
        {
            id: 'k1',
            name: 'Crystal Moon Keychain',
            price: 12.99,
            category: 'keychains',
            description: 'Elegant crystal moon-shaped keychain with silver accents',
            image: 'images/products/keychain-moon.jpg'
        },
        {
            id: 'k2',
            name: 'Mystic Tree Keychain',
            price: 14.99,
            category: 'keychains',
            description: 'Handcrafted wooden tree keychain with mystical engravings',
            image: 'images/products/keychain-tree.jpg'
        },
        {
            id: 'k3',
            name: 'Cloud Dreams Keychain',
            price: 11.99,
            category: 'keychains',
            description: 'Dreamy cloud-shaped keychain with pearl finish',
            image: 'images/products/keychain-cloud.jpg'
        },
        {
            id: 'k4',
            name: 'Aesthetic Butterfly Keychain',
            price: 13.99,
            category: 'keychains',
            description: 'Beautiful butterfly keychain with holographic wings',
            image: 'images/products/keychain-butterfly.jpg'
        },
        {
            id: 'k5',
            name: 'Soul Star Keychain',
            price: 15.99,
            category: 'keychains',
            description: 'Star-shaped keychain with soul-inspiring quotes',
            image: 'images/products/keychain-star.jpg'
        }
    ],
    stickers: [
        {
            id: 's1',
            name: 'Moonlight Collection',
            price: 8.99,
            category: 'stickers',
            description: 'Set of 5 moon phase holographic stickers',
            image: 'images/products/sticker-moon.jpg'
        },
        {
            id: 's2',
            name: 'Forest Spirit Stickers',
            price: 7.99,
            category: 'stickers',
            description: 'Pack of magical forest-themed stickers',
            image: 'images/products/sticker-forest.jpg'
        },
        {
            id: 's3',
            name: 'Cloud Dreams Pack',
            price: 6.99,
            category: 'stickers',
            description: 'Dreamy cloud and sky sticker collection',
            image: 'images/products/sticker-cloud.jpg'
        },
        {
            id: 's4',
            name: 'Aesthetic Quotes',
            price: 9.99,
            category: 'stickers',
            description: 'Inspirational quotes in aesthetic typography',
            image: 'images/products/sticker-quotes.jpg'
        },
        {
            id: 's5',
            name: 'Crystal Collection',
            price: 10.99,
            category: 'stickers',
            description: 'Beautiful crystal and gem sticker set',
            image: 'images/products/sticker-crystal.jpg'
        }
    ],
    ribbons: [
        {
            id: 'r1',
            name: 'Moonlight Satin Ribbon',
            price: 5.99,
            category: 'ribbons',
            description: 'Elegant silver satin ribbon with moon pattern',
            image: 'images/products/ribbon-moon.jpg'
        },
        {
            id: 'r2',
            name: 'Forest Green Velvet',
            price: 6.99,
            category: 'ribbons',
            description: 'Luxurious forest green velvet ribbon',
            image: 'images/products/ribbon-forest.jpg'
        },
        {
            id: 'r3',
            name: 'Sky Blue Silk',
            price: 7.99,
            category: 'ribbons',
            description: 'Soft sky blue silk ribbon with cloud pattern',
            image: 'images/products/ribbon-sky.jpg'
        },
        {
            id: 'r4',
            name: 'Rose Gold Dream',
            price: 8.99,
            category: 'ribbons',
            description: 'Aesthetic rose gold metallic ribbon',
            image: 'images/products/ribbon-rose.jpg'
        },
        {
            id: 'r5',
            name: 'Crystal Sparkle',
            price: 9.99,
            category: 'ribbons',
            description: 'Shimmering crystal-embedded ribbon',
            image: 'images/products/ribbon-crystal.jpg'
        }
    ]
};

// Function to display products
function displayProducts(category = 'all') {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    let productsToShow = [];
    if (category === 'all') {
        Object.values(products).forEach(categoryProducts => {
            productsToShow = [...productsToShow, ...categoryProducts];
        });
    } else {
        productsToShow = products[category] || [];
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.productId;
            const product = findProductById(productId);
            if (product) {
                addToCart(product);
            }
        });
    });
}

// Function to find product by ID
function findProductById(id) {
    for (const category in products) {
        const product = products[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
}

// Set up category filters
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Display products for selected category
            displayProducts(button.dataset.category);
        });
    });

    // Initially display all products
    displayProducts();
}); 