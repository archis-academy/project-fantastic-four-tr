const discountCoupons = [
  {
    id: 1,
    coupon: "CGMDff8UOU",
    discount: 0.5,
    message: "50% discount applied.",
  },
  {
    id: 2,
    coupon: "XgHgDl9zck",
    discount: 0.99,
    message: "99% discount applied... Jezzz",
  },
  {
    id: 3,
    coupon: "2EDXR86vyE",
    discount: 0.01,
    message: "1% discount applied. It's better than nothing, right?",
  },
  {
    id: 4,
    coupon: "Pmfl75mngv",
    discount: 0.4,
    message: "40% discount applied.",
  },
  {
    id: 5,
    coupon: "o675yDul7G",
    discount: 0.7,
    message: "70% discount applied.",
  },
  {
    id: 6,
    coupon: "iYSaIRZtQs",
    discount: 0.25,
    message: "25% discount applied.",
  },
];
/*Discount Test*/
const examplePrice = 650;
const discountRate = discountCoupons[1].discount;
const discountedPrice = examplePrice - examplePrice * discountRate;
console.log("Discounted Price: $" + discountedPrice.toFixed(2));
console.log(discountCoupons[1].message);
/*Discount Test Over*/

const inputCartQuantities = document.querySelectorAll(".cart-product-input");
const cartProducts = document.querySelectorAll(".cart-product");
const buttonReturnShop = document.querySelector("#button-return-shop");
const buttonUpdateCart = document.querySelector("#button-update-cart");
const buttonApplyCoupon = document.querySelector("#apply-coupon-button");
const buttonCheckout = document.querySelector("#button-checkout");

const subtotal = document.querySelector("#subtotal");
const shippingPrice = document.querySelector("#shipping-price");
const total = document.querySelector("#total");

checkPayment();

buttonReturnShop.addEventListener("click", function () {
  window.location.href = "index.html";
});

buttonUpdateCart.addEventListener("click", updateCart);

inputCartQuantities.forEach((input) => {
  input.addEventListener("input", addLeadingZero);
  input.addEventListener("input", updateCartProductSubtotal);
});

function addLeadingZero() {
  let quantityValue = this.value;
  if (quantityValue.length === 1) {
    quantityValue = "0" + quantityValue;
  }
  if (quantityValue < 0) {
    quantityValue = "0" + 0;
  }
  this.value = quantityValue;
}

function updateCartProductSubtotal() {
  const cartProduct = this.closest(".cart-product");

  const priceText = cartProduct.querySelector(
    ".cart-product-price"
  ).textContent;
  const price = parseFloat(priceText.replace("$", ""));
  const quantity = parseInt(this.value);

  const subtotal = price * quantity;
  cartProduct.querySelector(".cart-product-subtotal").textContent =
    "$" + subtotal;
}

function updateCart() {
  let totalSubtotal = 0;
  cartProducts.forEach((cartProductEach) => {
    const subtotalElements = cartProductEach.querySelectorAll(
      ".cart-product-subtotal"
    );
    if (subtotalElements.length > 1) {
      shippingPrice.textContent = "$0.00";
    } else {
      subtotalElements.forEach((subtotalElement) => {
        const subtotalValue = parseFloat(
          subtotalElement.textContent.replace("$", "")
        );
        totalSubtotal += subtotalValue;
      });
    }
  });

  subtotal.textContent = "$" + totalSubtotal.toFixed(2);
  if (totalSubtotal > 1300 || totalSubtotal === 0) {
    shippingPrice.textContent = "$0.00";
  } else {
    shippingPrice.textContent = "$50.00";
  }
  calculate();
}

function checkPayment() {
  const subtotalText = subtotal.textContent.trim();
  const shippingPriceText = shippingPrice.textContent.trim();
  const totalText = total.textContent.trim();

  const subtotalIsFree = subtotalText === "$0" || subtotalText === "$0.00";
  const shippingPriceIsFree =
    shippingPriceText === "$0" || shippingPriceText === "$0.00";
  const totalIsFree = totalText === "$0" || totalText === "$0.00";

  if (subtotalIsFree) {
    subtotal.textContent = "$0";
  }

  if (shippingPriceIsFree) {
    shippingPrice.textContent = "Free";
  }

  if (totalIsFree) {
    total.textContent = "$0";
  }
}

function calculate() {
  total.textContent = "$0";
  const subtotalValue = parseFloat(
    subtotal.textContent.replace("$", "").replace(",", "")
  );
  const shippingPriceValue = parseFloat(
    shippingPrice.textContent.replace("$", "").replace(",", "")
  );
  console.log("Subtotal value:", subtotal.textContent);
  console.log("Shipping price value:", shippingPrice.textContent);
  console.log("total value:", total.textContent);

  const totalValue = subtotalValue + shippingPriceValue;

  total.textContent = "$" + totalValue.toFixed(2);

  checkPayment();
}
