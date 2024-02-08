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

inputCartQuantities.forEach((input) => {
  input.addEventListener("input", addLeadingZero);
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
