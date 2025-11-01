// Food data - Indian Authentic Cuisine
const foodData = [
    {
        id: 1,
        name: "Butter Chicken",
        price: 280,
        category: "curry",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
        description: "Creamy tomato-based curry with tender chicken pieces"
    },
    {
        id: 2,
        name: "Paneer Butter Masala",
        price: 240,
        category: "curry",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
        description: "Cottage cheese in rich creamy tomato gravy"
    },
    {
        id: 3,
        name: "Chicken Biryani",
        price: 260,
        category: "biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
        description: "Fragrant basmati rice with spiced chicken"
    },
    {
        id: 4,
        name: "Vegetable Biryani",
        price: 200,
        category: "biryani",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
        description: "Aromatic rice with mixed vegetables and spices"
    },
    {
        id: 5,
        name: "Dal Makhani",
        price: 180,
        category: "curry",
        image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400",
        description: "Black lentils cooked in butter and cream"
    },
    {
        id: 6,
        name: "Masala Dosa",
        price: 120,
        category: "snacks",
        image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400",
        description: "Crispy rice crepe with spiced potato filling"
    },
    {
        id: 7,
        name: "Chole Bhature",
        price: 150,
        category: "snacks",
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400",
        description: "Spicy chickpea curry with deep-fried bread"
    },
    {
        id: 8,
        name: "Palak Paneer",
        price: 220,
        category: "curry",
        image: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400",
        description: "Cottage cheese in spinach gravy with spices"
    },
    {
        id: 9,
        name: "Tandoori Chicken",
        price: 320,
        category: "tandoor",
        image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
        description: "Chicken marinated in yogurt and spices, grilled in tandoor"
    },
    {
        id: 10,
        name: "Samosa",
        price: 40,
        category: "snacks",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
        description: "Crispy fried pastry with spiced potato filling"
    },
    {
        id: 11,
        name: "Paneer Tikka",
        price: 180,
        category: "tandoor",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
        description: "Grilled cottage cheese marinated in spices"
    },
    {
        id: 12,
        name: "Rogan Josh",
        price: 300,
        category: "curry",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
        description: "Aromatic lamb curry with Kashmiri spices"
    }
];

// Cart array
let cart = [];

// DOM Elements
const cartLink = document.getElementById('cartLink');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const featuredFoods = document.getElementById('featuredFoods');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    displayFeaturedFoods();
    updateCartUI();
    
    // Event Listeners
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
    closeCart.addEventListener('click', closeCartModal);
    checkoutBtn.addEventListener('click', checkout);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === cartModal) {
            closeCartModal();
        }
    });
});

// Display featured foods
function displayFeaturedFoods() {
    featuredFoods.innerHTML = '';
    
    // Get first 3 items as featured
    const featuredItems = foodData.slice(0, 3);
    
    featuredItems.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <span class="price">₹${food.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
            </div>
        `;
        featuredFoods.appendChild(foodCard);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            addToCart(foodId);
        });
    });
}

// Add item to cart
function addToCart(foodId) {
    const food = foodData.find(item => item.id === foodId);
    
    if (food) {
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === foodId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: food.id,
                name: food.name,
                price: food.price,
                image: food.image,
                quantity: 1
            });
        }
        
        saveCartToLocalStorage();
        updateCartUI();
        
        // Show confirmation
        alert(`${food.name} added to cart!`);
    }
}

// Remove item from cart
function removeFromCart(foodId) {
    cart = cart.filter(item => item.id !== foodId);
    saveCartToLocalStorage();
    updateCartUI();
}

// Update item quantity
function updateQuantity(foodId, change) {
    const item = cart.find(item => item.id === foodId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(foodId);
        } else {
            saveCartToLocalStorage();
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-price">₹${item.price.toFixed(2)} each</p>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <p class="item-total">₹${itemTotal.toFixed(2)}</p>
            <button class="remove-item" data-id="${item.id}">×</button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to cart buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            updateQuantity(foodId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            updateQuantity(foodId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            removeFromCart(foodId);
        });
    });
}

// Open cart modal
function openCart() {
    cartModal.style.display = 'flex';
}

// Close cart modal
function closeCartModal() {
    cartModal.style.display = 'none';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Save order to localStorage
    const order = {
        items: [...cart],
        total: parseFloat(cartTotal.textContent),
        timestamp: new Date().toISOString()
    };
    
    // Get existing orders or initialize empty array
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Generate bill preview
    generateBillPreview(order);
    
    // Clear cart
    cart = [];
    saveCartToLocalStorage();
    updateCartUI();
    closeCartModal();
}

// Generate bill preview
function generateBillPreview(order) {
    // Create bill content
    let billContent = `
=====================================
          FOOD PLAZE
      ORDER RECEIPT & BILL
    Authentic Indian Cuisine
=====================================

Date: ${new Date(order.timestamp).toLocaleString()}

Items:
-------------------------------------
`;
    
    order.items.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        billContent += `${item.name}
  Price: ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${itemTotal}
-------------------------------------
`;
    });
    
    billContent += `
Total Amount: ₹${order.total.toFixed(2)}

=====================================
    Thank you for your order!
    Visit us again at Food Plaze
=====================================
`;
    
    // Show bill preview modal
    showBillPreview(billContent, order);
}

// Show bill preview modal
function showBillPreview(billContent, order) {
    // Create modal if it doesn't exist
    let billModal = document.getElementById('billModal');
    if (!billModal) {
        billModal = document.createElement('div');
        billModal.id = 'billModal';
        billModal.className = 'cart-modal';
        billModal.innerHTML = `
            <div class="cart-content" style="width: 90%; max-width: 700px;">
                <div class="cart-header">
                    <h2>Order Bill Preview</h2>
                    <span class="close-btn" id="closeBill">&times;</span>
                </div>
                <div class="cart-body" style="padding: 20px;">
                    <div id="billPreview" style="white-space: pre-wrap; font-family: monospace; background: #fef6e4; padding: 20px; border-radius: 5px; margin-bottom: 20px; max-height: 400px; overflow-y: auto; border: 2px solid #ff6b35;">
                        <!-- Bill content will be inserted here -->
                    </div>
                    <div class="cart-footer" style="display: flex; gap: 10px; justify-content: center;">
                        <button class="btn-primary" id="downloadTxt" style="background: linear-gradient(135deg, #28a745, #20c997);">Download as TXT</button>
                        <button class="btn-primary" id="downloadPdf" style="background: linear-gradient(135deg, #dc3545, #c82333);">Download as PDF</button>
                        <button class="btn-primary" id="closeBillBtn">Close</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(billModal);
        
        // Add event listeners
        document.getElementById('closeBill').addEventListener('click', () => {
            billModal.style.display = 'none';
        });
        
        document.getElementById('closeBillBtn').addEventListener('click', () => {
            billModal.style.display = 'none';
        });
        
        document.getElementById('downloadTxt').addEventListener('click', () => {
            downloadBillAsTxt(billContent, order);
        });
        
        document.getElementById('downloadPdf').addEventListener('click', () => {
            downloadBillAsPdf(billContent, order);
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === billModal) {
                billModal.style.display = 'none';
            }
        });
    }
    
    // Update bill content
    document.getElementById('billPreview').textContent = billContent;
    
    // Show modal
    billModal.style.display = 'flex';
}

// Download bill as TXT
function downloadBillAsTxt(billContent, order) {
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `food-plaze-bill-${new Date(order.timestamp).getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Download bill as PDF
function downloadBillAsPdf(billContent, order) {
    // For simplicity, we'll create a print-friendly version and trigger print
    // In a real application, you might use a library like jsPDF
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Food Plaze Bill</title>
            <style>
                body { font-family: monospace; margin: 20px; }
                pre { white-space: pre-wrap; }
            </style>
        </head>
        <body>
            <pre>${billContent}</pre>
            <script>
                window.onload = function() {
                    window.print();
                }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Menu page functions
function displayMenuFoods(category = 'all') {
    const menuFoods = document.getElementById('menuFoods');
    if (!menuFoods) return;
    
    menuFoods.innerHTML = '';
    
    const filteredFoods = category === 'all' 
        ? foodData 
        : foodData.filter(food => food.category === category);
    
    filteredFoods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';
        foodCard.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <div class="food-info">
                <h3>${food.name}</h3>
                <p>${food.description}</p>
                <span class="price">₹${food.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${food.id}">Add to Cart</button>
            </div>
        `;
        menuFoods.appendChild(foodCard);
    });
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const foodId = parseInt(this.getAttribute('data-id'));
            addToCart(foodId);
        });
    });
}

// Filter functionality for menu page
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and display foods
            const category = this.getAttribute('data-category');
            displayMenuFoods(category);
        });
    });
}

// Initialize menu page if on menu page
if (document.querySelector('.menu-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromLocalStorage();
        updateCartUI();
        displayMenuFoods();
        setupFilterButtons();
        
        // Event Listeners
        const cartLink = document.getElementById('cartLink');
        if (cartLink) {
            cartLink.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
        }
        closeCart.addEventListener('click', closeCartModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    });
}

// Initialize about page if on about page
if (document.querySelector('.about-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromLocalStorage();
        updateCartUI();
        
        // Event Listeners
        const cartLink = document.getElementById('cartLink');
        if (cartLink) {
            cartLink.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
        }
        closeCart.addEventListener('click', closeCartModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
    });
}

// Initialize contact page if on contact page
if (document.querySelector('.contact-page')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadCartFromLocalStorage();
        updateCartUI();
        
        // Event Listeners
        const cartLink = document.getElementById('cartLink');
        if (cartLink) {
            cartLink.addEventListener('click', function(e) {
                e.preventDefault();
                openCart();
            });
        }
        closeCart.addEventListener('click', closeCartModal);
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                closeCartModal();
            }
        });
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Create contact message object
                const contactMessage = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                // Save to localStorage
                const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
                messages.push(contactMessage);
                localStorage.setItem('contactMessages', JSON.stringify(messages));
                
                // Reset form
                contactForm.reset();
                
                // Show confirmation
                alert('Thank you for your message! We will get back to you soon.');
            });
        }
    });
}