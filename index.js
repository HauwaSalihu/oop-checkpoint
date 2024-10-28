let TOTAL_CART_ITEMS = document.getElementById("total-cart-items");
let DISPLAY_CART_ITEMS = document.getElementById("display-cart-items");
let TOTAL_PRICE = document.getElementById("total-price");

// Product Class
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

//a sub class of product

class ProductInfo extends Product {
  constructor(id, name, price, quantity) {
    super(id, name, price);
    this.quantity = quantity;
  }

  calculateProductTotal() {
    return this.price * this.quantity;
  }
}

//create a shopping cart items class to hold an array of all items in the cart
class ShoppingCartItems {
  constructor(cartItems) {
    this.cartItems = cartItems;
  }

  //get Total items in cart
  getNumberOfItemsInCart() {
    TOTAL_CART_ITEMS.innerText = this.cartItems.length;
  }

  //get Total amount of cart items
  getTotalAmount() {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });

    TOTAL_PRICE.innerText = total;
  }

  // a method for inccreasing product quantity
  increasequantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        item.quantity += 1;
      }

      this.displayCartItems();
      this.getTotalAmount();
    });
  }

  //   a method to decrease product quantity
  decreaseQuantity(productId) {
    this.cartItems.forEach((item) => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }

      this.displayCartItems();
      this.getTotalAmount();
    });
  }

  //A method for removing cart item

  removeCartItem(productId) {
    let updatedCartItem = this.cartItems.filter((item) => item.id != productId);
    this.cartItems = updatedCartItem;
    this.displayCartItems();
    this.getNumberOfItemsInCart();
    this.getTotalAmount();
  }

  //Method to display Cart item
  displayCartItems() {
    let products = this.cartItems.map((item) => {
      return ` <div class="shadow-lg flex items-center justify-between p-5 cart-item">
                <div class="flex items-center justify-between gap-5">
                  <i  id=${item.id} class="fas fa-trash-alt delete-btn"></i>
        
                  <p>${item.name}</p>
                </div>
                <div class="flex items-center gap-3">
          
                  <p class="amount">${item.price}</p>
                   <span class="flex justify-between">
                    <p>Total:</p>
                    <p id="total">${item.calculateProductTotal()}</p>
                  </span>
                </div>
                <div class="border p-2 flex">
                  <p class="quantity">${item.quantity}</p>
                  <span class="flex flex-col">
                    <i id=${item.id} class="fas fa-angle-up plus-btn"></i>
                    <i id=${item.id} class="fas fa-angle-down minus-btn"></i>
                  </span>
                </div>
              </div>
         
        </div>`;
    });
    DISPLAY_CART_ITEMS.innerHTML = products.join("");
    // TOTAL_PRICE.innerHTML =

    const decreaseBTN = document.querySelectorAll(".minus-btn");
    decreaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.decreaseQuantity(parseInt(e.target.getAttribute("id")));
      });
    });
    const increaseBTN = document.querySelectorAll(".plus-btn");
    increaseBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.increasequantity(parseInt(e.target.getAttribute("id")));
      });
    });
    const removeBTN = document.querySelectorAll(".delete-btn");
    removeBTN.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.removeCartItem(parseInt(e.target.getAttribute("id")));
      });
    });
  }
}

//our cartitems

let cartItems = [
  new ProductInfo(1, "shoe", 40000, 1),
  new ProductInfo(2, "bag", 100000, 1),
  new ProductInfo(3, "shirt", 6000, 1),
  new ProductInfo(4, "pants", 8000, 1),
  new ProductInfo(5, "shoe", 30000, 1),
];

//
const shoppingCart = new ShoppingCartItems(cartItems);

shoppingCart.displayCartItems();
shoppingCart.getTotalAmount();
shoppingCart.getNumberOfItemsInCart();
