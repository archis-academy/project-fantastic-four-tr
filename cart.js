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
const inputCartQuantities = document.querySelectorAll(".cart-product-input");
const cartProducts = document.querySelectorAll(".cart-product");
const buttonReturnShop = document.querySelector("#button-return-shop");
const buttonUpdateCart = document.querySelector("#button-update-cart");
const buttonApplyCoupon = document.querySelector("#apply-coupon-button");
const inputCouponCode = document.querySelector("#input-coupon-code");
const buttonCheckout = document.querySelector("#button-checkout");
const cartProductContainer = document.querySelector(".cart-product-container");

const subtotal = document.querySelector("#subtotal");
const shippingPrice = document.querySelector("#shipping-price");
const total = document.querySelector("#total");

const apiUrl = "https://fakestoreapi.com/products";
const randomProducts = [16, 18, 14, 0];

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const selectedProducts = randomProducts.map((index) => data[index]);

    const productContainers = selectedProducts
      .map(
        (product) => `
      <div class="cart-product">
        <div class="cart-product-info">
          <img class="cart-product-image" src="${product.image}" alt="${product.title}" />
          <span class="cart-product-name">${product.title}</span>
        </div>
        <span class="cart-product-price">$${product.price}</span>
        <input class="cart-product-input" value="01" type="number" />
        <span class="cart-product-subtotal">$${product.price}</span>
      </div>
    `
      )
      .join("");

    cartProductContainer.innerHTML += productContainers;

    // Dinamik olarak eklenen öğeler için olay dinleyicilerini yeniden ekle
    addEventListenersToDynamicElements();
  } catch (error) {
    console.error("Error fetching datas:", error);
  }
}
buttonApplyCoupon.disabled = true;
fetchProducts();
checkPayment();

// Bu olmazsa "inner.html" komutları düzgün çalışmıyor, sadece HTML'in içindeki manuel olarak eklenenler çalışıyor.
cartProductContainer.addEventListener("input", function (event) {
  const targetElement = event.target;
  if (targetElement && targetElement.classList.contains("cart-product-input")) {
    addLeadingZero.call(targetElement);
    updateCartProductSubtotal(targetElement);
  }
});

buttonReturnShop.addEventListener("click", function () {
  window.location.href = "index.html";
});

buttonApplyCoupon.addEventListener("click", applyCoupon);

buttonUpdateCart.addEventListener("click", function () {
  updateCart();
  buttonApplyCoupon.disabled = false; // Update Cart düğmesine tıklandığında Apply Coupon düğmesini etkinleştir
});

function addEventListenersToDynamicElements() {
  const inputCartQuantities = document.querySelectorAll(".cart-product-input");

  // inputCartQuantities üzerinde döngü yaparak her birine olay dinleyicisi ekle
  inputCartQuantities.forEach((input) => {
    input.addEventListener("input", addLeadingZero);
    input.addEventListener("input", updateCartProductSubtotal);
  });
}

function addLeadingZero() {
  let quantityValue = this.value;
  // İşareti kaldırarak negatif girişlerin düzeltilmesi
  if (quantityValue.startsWith("-")) {
    quantityValue = "0";
  }
  // Düzeltilmiş değer bir hane ise başına '0' eklenmesi
  if (quantityValue.length === 1) {
    quantityValue = "0" + quantityValue;
  }
  //console.log(quantityValue);
  this.value = quantityValue;
}

//Bu fonksiyonu kullanmazsak programı bozmayan ama konsol ekranında görülen hatalara sebep oluyor.
function findClosestCartProduct(element) {
  while (element) {
    if (element.classList && element.classList.contains("cart-product")) {
      return element;
    }
    element = element.parentNode;
  }
  return null;
}

function updateCartProductSubtotal(inputElement) {
  let cartProduct = findClosestCartProduct(inputElement);
  if (!cartProduct) return;

  const priceText = cartProduct.querySelector(
    ".cart-product-price"
  ).textContent;
  const price = parseFloat(priceText.replace("$", ""));
  const quantity = parseInt(inputElement.value);

  const subtotal = price * quantity;
  cartProduct.querySelector(".cart-product-subtotal").textContent =
    "$" + subtotal.toFixed(2);
}

let discountElement;
function updateCart() {
  // İndirim miktarını temizle
  if (discountElement) {
    discountElement.remove();
    discountElement = null;
  }

  let totalSubtotal = 0;
  let totalQuantity = 0;

  const cartProducts = document.querySelectorAll(".cart-product");

  cartProducts.forEach((cartProductEach) => {
    const subtotalElements = cartProductEach.querySelectorAll(
      ".cart-product-subtotal"
    );
    subtotalElements.forEach((subtotalElement) => {
      const subtotalValue = parseFloat(
        subtotalElement.textContent.replace("$", "")
      );
      totalSubtotal += subtotalValue;
    });

    const quantityInput = cartProductEach.querySelector(".cart-product-input");
    if (quantityInput) {
      const quantity = parseInt(quantityInput.value);
      totalQuantity += quantity;
    }
  });

  subtotal.textContent = "$" + totalSubtotal.toFixed(2);

  // Toplam fiyat 1300 doları geçerse veya 0 ise kargo ücreti bedava olacak
  if (totalSubtotal > 1300 || totalSubtotal === 0) {
    shippingPrice.textContent = "$0.00";
  } else {
    // Tek bir ürün varsa, kargo ücreti 50 dolar olacak
    if (totalQuantity === 1) {
      shippingPrice.textContent = "$50.00";
    } else {
      // Birden fazla ürün olduğunda, her bir ek ürün için 10 dolar eklenecek
      let additionalShippingCost = Math.max(0, totalQuantity - 1) * 10;
      let shippingCost = Math.min(50 + additionalShippingCost, 115); // 115 doları geçmeyecek şekilde sınırlandırma
      shippingPrice.textContent = "$" + shippingCost.toFixed(2);
    }
  }

  // Toplamı güncelle
  const totalValue =
    totalSubtotal + parseFloat(shippingPrice.textContent.replace("$", ""));
  total.textContent = "$" + totalValue.toFixed(2);

  checkPayment(); // Ödeme kontrolünü yap
}

function checkPayment() {
  const subtotalText = subtotal.textContent.trim();
  const shippingPriceText = shippingPrice.textContent.trim();
  const totalText = total.textContent.trim();

  const subtotalIsFree = subtotalText === "$0" || subtotalText === "$0.00";
  const shippingPriceIsFree =
    shippingPriceText === "Free" ||
    shippingPriceText === "$0" ||
    shippingPriceText === "$0.00";
  const totalIsFree =
    totalText === "Free" || totalText === "$0" || totalText === "$0.00";

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

function applyCoupon() {
  const couponCode = inputCouponCode.value.trim();

  // Kupon kodunun geçerli olup olmadığını kontrol ediyor
  const coupon = discountCoupons.find((coupon) => coupon.coupon === couponCode);

  if (!coupon) {
    alert("Invalid coupon code. Please enter a valid coupon code.");
    return;
  }

  // Toplam fiyatı alıyor
  const totalSubtotal = parseFloat(subtotal.textContent.replace("$", ""));

  // Eğer toplam tutar 0 ise ve kupon uygulanmaya çalışıldıysa uyarı göster
  if (totalSubtotal === 0) {
    alert("You cannot apply a coupon code because your cart is empty.");
    return;
  }

  // İndirim tutarını hesaplıyor
  const discountAmount = totalSubtotal * coupon.discount;

  // Toplam fiyatı güncelle, indirim tutarını çıkar
  const discountedTotal = totalSubtotal - discountAmount;
  total.textContent = "$" + discountedTotal.toFixed(2);

  // İndirim kısmını göster
  if (discountElement) {
    const discountPriceElement = discountElement.querySelector(
      ".cart-payment-total-text:last-child"
    );
    discountPriceElement.textContent = "$" + -discountAmount.toFixed(2);
  } else {
    discountElement = document.createElement("div");
    discountElement.classList.add("cart-payment-total");
    discountElement.innerHTML = `
      <span class="cart-payment-total-text">Discount:</span>
      <span class="cart-payment-total-text">$${-discountAmount.toFixed(
        2
      )}</span>
    `;

    const cartPaymentContainer = document.querySelector(
      ".cart-payment-total-container"
    );
    const lastPaymentTotal =
      cartPaymentContainer.lastElementChild.previousElementSibling
        .previousElementSibling;
    cartPaymentContainer.insertBefore(
      discountElement,
      lastPaymentTotal.nextSibling
    );
  }

  alert(coupon.message);

  buttonApplyCoupon.disabled = true;
}
