
    // Product data with image
    const products = [
      {
        id: 1,
        name: "T-Shirt",
        category: "Clothing",
        price: 20,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSth0jTxxA6GmXcFYcKRn8mVDX4g2o5QlPP7ISNdmRPDJltzhXT1qSOaSz32CksNP4nJXzU7l5IPsKvebsh5VE0fYUMi7JqGnN8mP5l467Bxcvc1Ee33gIx"
      },
      {
        id: 2,
        name: "Jeans",
        category: "Clothing",
        price: 45,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRSEt3Y71NHQ57zuk4Osu-0D3gjacDSx1zkBG4jyvlrPuH-9O7XCbYlOcrzR00nnlTUEKxSvl-rf4wdDjIMN4igVIPSEuEqZzPrwCh6xb_B-91dO8E-sGgq_A"
      },
      {
        id: 3,
        name: "Shoes",
        category: "Footwear",
        price: 60,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSxA5kf21VGDRZfmo3OlbXoT16OVSPN0b4_9GatyfqLhJmrV5WLhYcu7qfzkrE3vVY_yY77mIppbPD6yJvB0K55QZ9SM-Tk0oD8mB1wFD-72ez-gEGptbgT"
      },
      {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 150,
        image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRMPl1qFBuf1ni1KkMseVpLA_9xi_3Nxcge3ywh6MjL3Zoleyjwo3LVUOgz1GzUTSbWRXFI8iUTL5OqUpifsqMo1QnXrxQbQ0pcmOc2iT2qwgODe1MXxXLkAA"
      },
      {
        id: 5,
        name: "Backpack",
        category: "Accessories",
        price: 35,
        image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR87O_mEtyU2sMBbnXxUIW2LDOZpuRFfF-w7FVummFpoi03yU6vllVKXDkGj28fBB_SW-UkZFk_1FVKBqy4QFKArKvVMLozBEKt5Y4bkRhJiDCarGGQmn_ImA"
      }
    ];

    // Shopping cart data
    let cart = [];
    let currentUser = null;

    // Users with empty action history
    const users = [
      { id: 1, name: "Deepak kumar", email: "deepak.j@example.com", actions: [] },
      { id: 2, name: "Devang", email: "devang.g@example.com", actions: [] },
      { id: 3, name: "Kunal", email: "kunal.w@example.com", actions: [] },
      { id: 4, name: "Shivam", email: "shivam.l@example.com", actions: [] },
      { id: 5, name: "Aaditya", email: "aditya.k@example.com", actions: [] },
      { id: 6, name: "Sonu", email: "sonu.d@example.com", actions: [] }
    ];

    // Possible user actions
    const actions = [
      "Visited Homepage",
      "Viewed Product Page",
      "Searched for Items",
      "Added to Cart",
      "Started Checkout",
      "Made a Purchase",
      "Wrote Product Review",
      "Shared Product on Social Media"
    ];

    // Initialize the application
    function init() {
      showProducts();
      updateUserList();
      setupCart();
      
      // Initial simulation after a short delay
      setTimeout(() => {
        simulateActivity();
        updateUserList();
      }, 500);
      
      // Regular simulation every 3 seconds
      setInterval(() => {
        simulateActivity();
        updateUserList();
      }, 3000);
    }

    // Render product list with interactive buttons
    function showProducts() {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";

      products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <strong>${product.name}</strong><br>
            <span>Category: ${product.category}</span><br>
            <span>Price: $${product.price.toFixed(2)}</span>
          </div>
          <div class="product-actions">
            <button class="action-btn view-btn" data-id="${product.id}" data-action="view">
              <i class="fas fa-eye"></i> View
            </button>
            <button class="action-btn cart-btn" data-id="${product.id}" data-action="cart">
              <i class="fas fa-cart-plus"></i> Add
            </button>
          </div>
        `;
        productList.appendChild(li);
      });

      // Add event listeners to product buttons
      document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.closest('button').dataset.id);
          const product = products.find(p => p.id === productId);
          logUserAction(`Viewed Product Page (${product.name})`);
        });
      });

      document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.closest('button').dataset.id);
          addToCart(productId);
        });
      });
    }

    // Add product to cart
    function addToCart(productId) {
      const product = products.find(p => p.id === productId);
      if (!product) return;

      // Check if product is already in cart
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }

      updateCartUI();
      logUserAction(`Added to Cart (${product.name})`);
    }

    // Remove product from cart
    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      updateCartUI();
    }

    // Update product quantity in cart
    function updateQuantity(productId, newQuantity) {
      const item = cart.find(item => item.id === productId);
      if (item) {
        if (newQuantity <= 0) {
          removeFromCart(productId);
        } else {
          item.quantity = newQuantity;
        }
        updateCartUI();
      }
    }

    // Update cart UI
    function updateCartUI() {
      const cartItems = document.getElementById("cart-items");
      const cartBadge = document.getElementById("cart-badge");
      const cartTotal = document.getElementById("cart-total");

      // Update cart items
      cartItems.innerHTML = "";
      if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty</p>";
      } else {
        cart.forEach(item => {
          const cartItem = document.createElement("div");
          cartItem.className = "cart-item";
          cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-actions">
              <div class="quantity-control">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
              </div>
              <button class="action-btn" data-id="${item.id}" data-action="remove" style="background-color: #ffebee; color: var(--danger);">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
          cartItems.appendChild(cartItem);
        });
      }

      // Update cart badge
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = totalItems;
      cartBadge.style.display = totalItems > 0 ? "flex" : "none";

      // Update total
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;

      // Add event listeners to cart buttons
      document.querySelectorAll('[data-action="increase"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.closest('button').dataset.id);
          const item = cart.find(item => item.id === productId);
          if (item) {
            updateQuantity(productId, item.quantity + 1);
          }
        });
      });

      document.querySelectorAll('[data-action="decrease"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.closest('button').dataset.id);
          const item = cart.find(item => item.id === productId);
          if (item) {
            updateQuantity(productId, item.quantity - 1);
          }
        });
      });

      document.querySelectorAll('[data-action="remove"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = parseInt(e.target.closest('button').dataset.id);
          removeFromCart(productId);
        });
      });
    }

    // Setup cart functionality
    function setupCart() {
      const cartIcon = document.getElementById("cart-icon");
      const cartPanel = document.getElementById("cart-panel");
      const closeCart = document.getElementById("close-cart");
      const checkoutBtn = document.getElementById("checkout-btn");

      // Toggle cart panel
      cartIcon.addEventListener('click', () => {
        cartPanel.style.display = "block";
      });

      closeCart.addEventListener('click', () => {
        cartPanel.style.display = "none";
      });

      // Checkout button
      checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
          logUserAction("Started Checkout");
          alert(`Checkout complete! Total: $${calculateCartTotal().toFixed(2)}`);
          cart = [];
          updateCartUI();
          cartPanel.style.display = "none";
          logUserAction("Made a Purchase");
        } else {
          alert("Your cart is empty!");
        }
      });
    }

    // Calculate cart total
    function calculateCartTotal() {
      return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Weighted random action selection
    function getRandomAction() {
      const weights = [0.3, 0.25, 0.15, 0.1, 0.08, 0.05, 0.05, 0.02];
      let rand = Math.random();
      let sum = 0;
      for (let i = 0; i < actions.length; i++) {
        sum += weights[i];
        if (rand <= sum) return actions[i];
      }
      return actions[0];
    }

    // Simulate random activity
    function simulateActivity() {
      users.forEach(user => {
        if (Math.random() > 0.6) {
          const action = getRandomAction();
          const product = action.includes("Product") ? 
            products[Math.floor(Math.random() * products.length)] : null;
          
          user.actions.push({
            action,
            time: Date.now(),
            product: product ? product.name : null
          });
        }
      });
    }

    // Log user action
    function logUserAction(action) {
      if (!currentUser) {
        // If no user is selected, pick a random one for simulation
        currentUser = users[Math.floor(Math.random() * users.length)];
      }
      
      const product = action.match(/\((.*?)\)/)?.[1];
      
      currentUser.actions.push({
        action: product ? action.replace(/\(.*?\)/, "").trim() : action,
        time: Date.now(),
        product: product || null
      });
      
      updateUserList();
      showTimeline(currentUser);
    }

    // Update user list and segments
    function updateUserList() {
      const userList = document.getElementById("user-list");
      const engagedList = document.getElementById("engaged-list");
      const buyersList = document.getElementById("buyers-list");
      const inactiveList = document.getElementById("inactive-list");

      // Reset counts
      document.getElementById("engaged-count").textContent = "0";
      document.getElementById("buyers-count").textContent = "0";
      document.getElementById("inactive-count").textContent = "0";

      userList.innerHTML = "";
      engagedList.innerHTML = "";
      buyersList.innerHTML = "";
      inactiveList.innerHTML = "";

      users.forEach(user => {
        // Add to All Users
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="user-avatar">${user.name.charAt(0)}</div>
          <div>
            <div>${user.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-light);">${user.email}</div>
          </div>
        `;
        li.onclick = () => {
          currentUser = user;
          showTimeline(user);
        };
        userList.appendChild(li);

        // Segments
        const recentTime = Date.now() - 5 * 60 * 1000;
        const hasViewed = user.actions.some(a => a.action.includes("Product"));
        const hasCart = user.actions.some(a => a.action.includes("Cart"));
        const hasPurchased = user.actions.some(a => a.action.includes("Purchase"));
        const latestAction = user.actions[user.actions.length - 1];
        const isInactive = !latestAction || latestAction.time < recentTime;

        if (hasViewed && hasCart) {
          const el = document.createElement("li");
          el.innerHTML = `
            <div class="user-avatar">${user.name.charAt(0)}</div>
            ${user.name} <span class="badge badge-engaged">Engaged</span>
          `;
          el.onclick = () => {
            currentUser = user;
            showTimeline(user);
          };
          engagedList.appendChild(el);
          document.getElementById("engaged-count").textContent = 
            parseInt(document.getElementById("engaged-count").textContent) + 1;
        }

        if (hasPurchased) {
          const el = document.createElement("li");
          el.innerHTML = `
            <div class="user-avatar">${user.name.charAt(0)}</div>
            ${user.name} <span class="badge badge-buyer">Buyer</span>
          `;
          el.onclick = () => {
            currentUser = user;
            showTimeline(user);
          };
          buyersList.appendChild(el);
          document.getElementById("buyers-count").textContent = 
            parseInt(document.getElementById("buyers-count").textContent) + 1;
        }

        if (isInactive) {
          const el = document.createElement("li");
          el.innerHTML = `
            <div class="user-avatar">${user.name.charAt(0)}</div>
            ${user.name} <span class="badge badge-inactive">Inactive</span>
          `;
          el.onclick = () => {
            currentUser = user;
            showTimeline(user);
          };
          inactiveList.appendChild(el);
          document.getElementById("inactive-count").textContent = 
            parseInt(document.getElementById("inactive-count").textContent) + 1;
        }
      });
    }

    // Show user timeline
    function showTimeline(user) {
      const timeline = document.getElementById("timeline-details");

      if (user.actions.length === 0) {
        timeline.innerHTML = `
          <div style="text-align: center; padding: 20px;">
            <div class="user-avatar" style="margin: 0 auto 10px; width: 50px; height: 50px; font-size: 1.2rem;">
              ${user.name.charAt(0)}
            </div>
            <h3>${user.name}</h3>
            <p style="color: var(--text-light);">No activity recorded yet</p>
          </div>
        `;
        return;
      }

      let timelineHTML = `
        <div style="margin-bottom: 15px;">
          <div class="user-avatar" style="display: inline-flex; vertical-align: middle; margin-right: 10px;">
            ${user.name.charAt(0)}
          </div>
          <h3 style="display: inline-block; vertical-align: middle;">${user.name}</h3>
        </div>
        <div style="margin-bottom: 15px; color: var(--text-light);">${user.email}</div>
      `;

      // Sort actions by time (newest first)
      const sortedActions = [...user.actions].sort((a, b) => b.time - a.time);

      sortedActions.forEach(a => {
        const timeStr = new Date(a.time).toLocaleTimeString();
        let icon = '<i class="fas fa-user"></i>';
        if (a.action.includes("Homepage")) icon = '<i class="fas fa-home"></i>';
        else if (a.action.includes("Product")) icon = '<i class="fas fa-search"></i>';
        else if (a.action.includes("Cart")) icon = '<i class="fas fa-shopping-cart"></i>';
        else if (a.action.includes("Purchase")) icon = '<i class="fas fa-check-circle"></i>';
        else if (a.action.includes("Review")) icon = '<i class="fas fa-star"></i>';
        else if (a.action.includes("Social")) icon = '<i class="fas fa-share-alt"></i>';

        timelineHTML += `
          <div class="timeline-item">
            <div class="timeline-icon">${icon}</div>
            <div class="timeline-content">
              <div>${a.action}${a.product ? ` (${a.product})` : ''}</div>
              <div class="timeline-time">${timeStr}</div>
            </div>
          </div>
        `;
      });

      timeline.innerHTML = timelineHTML;
    }

    // Initialize the application when DOM is loaded
    document.addEventListener('DOMContentLoaded', init);