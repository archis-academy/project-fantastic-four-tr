const hamburger = document.querySelector(".hamburger");
const headerNavbarList = document.querySelector(".header-navbar-list");
const searchInput = document.querySelector(".search-input");
const searchDropdown = document.querySelector("#search-dropdown");
const searchDropdownItems = document.querySelectorAll(".search-dropdown-item");
const womanDropdownContainer = document.querySelector(
  ".woman-dropdown-container"
);
const menDropdownContainer = document.querySelector(".men-dropdown-container");

hamburger.addEventListener("click", function () {
  headerNavbarList.classList.toggle("active");
});

searchInput.addEventListener("input", (e) => {
  filterFunction(e);
});

async function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

const apiUrl = "https://fakestoreapi.com/products";

fetchData(apiUrl).then((data) => {
  const menClothingProducts = data.filter(
    (product) => product.category.toLowerCase() === "men's clothing"
  );
  const womenClothingProducts = data.filter(
    (product) => product.category.toLowerCase() === "women's clothing"
  );

  const menDropdownItems = menClothingProducts.map(
    (product) =>
      `<a class="dropdown-container-item" href="#">${product.title}</a>`
  );
  const womenDropdownItems = womenClothingProducts.map(
    (product) =>
      `<a class="dropdown-container-item" href="#">${product.title}</a>`
  );

  if (searchInput && womanDropdownContainer && menDropdownContainer) {
    menDropdownContainer.innerHTML = menDropdownItems.join("");
    womanDropdownContainer.innerHTML = womenDropdownItems.join("");
  }
});

function filterFunction(e) {
  const filter = e.target.value.trim().toUpperCase();
  searchDropdown.innerHTML = "";
  if (!filter) {
    return;
  }

  fetchData(apiUrl).then((data) => {
    const filteredProducts = data.filter((product) =>
      product.title.toUpperCase().includes(filter)
    );

    filteredProducts.forEach((filteredProduct) => {
      const itemLink = document.createElement("a");
      itemLink.classList.add("search-dropdown-item");
      itemLink.href = "#";
      itemLink.textContent = filteredProduct.title;
      searchDropdown.appendChild(itemLink);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const dots = document.querySelectorAll(".carousel-dot");
  const slides = document.querySelectorAll(".homepage-hero-carousel-slide");

  let currentIndex = 0;
  let timer;

  setSlideActive(currentIndex);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(timer);
      setSlideActive(index);
      startTimer();
    });
  });

  function setSlideActive(index) {
    currentIndex = index;
    const slideClass = "slide" + (index + 1);

    slides.forEach((slide) => {
      slide.className = "homepage-hero-carousel-slide " + slideClass;
    });

    // Dot'a .active sınıfını ekle veya kaldır
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % dots.length;
    setSlideActive(currentIndex);
  }

  function startTimer() {
    timer = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  startTimer();
});

function indirimYap(fiyat, indirim) {
  const sonuc = fiyat - (fiyat * indirim) / 100;
  return sonuc.toFixed(2);
}

let allProducts = [];

async function urunleriGetir() {
  const flashSalesDiv = document.querySelector("#flashSales");
  const bestSellingProductsContainer = document.querySelector(
    "#bestSellingProductsContainer"
  );
  console.log(bestSellingProductsContainer);

  if (!flashSalesDiv) {
    console.error("Flash sales element not found!");
    return;
  }
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  allProducts = data;

  const rastgeleUrunler = [data[0], data[1], data[2], data[3]];

  const bestSellingProducts = [data[4], data[5], data[6], data[7]];

  bestSellingProductsContainer.innerHTML = bestSellingProducts
    .map((urun, index) => {
      return `<div class="f-product-card" data-index="${index}">
                  <div class="f-product-image-container">
                    <img class="f-product-image" src=${urun.image} />
                    <p onclick="addToCart(${
                      urun.id
                    })" class="add-to-cart">Add To Cart</p>
                    <span class="f-product-discount">-30%</span>
                  </div>
                  <h3 class="f-product-title">${urun.title}</h3>
                  <div class="f-product-price-container">
                    <p class="f-product-new-price">$${indirimYap(
                      urun.price,
                      30
                    )}</p>
                    <s class="f-product-old-price">$${urun.price}</s>
                  </div>
                  <div class="f-products-ratings">
                    <div>
                    <img class="stars" src="./images/five-star.png" alt="star-icon">
                    </div>
                    <p class="f-products-comments">(${urun.rating.count})</p>
                  </div>
                </div>`;
    })
    .join("");

  flashSalesDiv.innerHTML = rastgeleUrunler
    .map((urun, index) => {
      return `<div class="f-product-card" data-index="${index}">
                  <div class="f-product-image-container">
                    <img class="f-product-image" src=${urun.image} />
                    <p onclick="addToCart(${
                      urun.id
                    })" class="add-to-cart">Add To Cart</p>
                    <span class="f-product-discount">-50%</span>
                  </div>
                  <h3 class="f-product-title">${urun.title}</h3>
                  <div class="f-product-price-container">
                    <p class="f-product-new-price">$${indirimYap(
                      urun.price,
                      50
                    )}</p>
                    <s class="f-product-old-price">$${urun.price}</s>
                  </div>
                  <div class="f-products-ratings">
                    <div>
                    <img class="stars" src="./images/five-star.png" alt="star-icon">
                    </div>
                    <p class="f-products-comments">(${urun.rating.count})</p>
                  </div>
                </div>`;
    })
    .join("");
}

urunleriGetir();

const elemanlar = document.querySelectorAll(".category-box");

elemanlar.forEach((link) => {
  link.addEventListener("click", () => {
    elemanlar.forEach((link) => {
      link.style.backgroundColor = "white";
    });
    link.style.backgroundColor = "#DB4444";
  });
});
// buse geri sayım
function countdown(targetDate) {
  const countdownElement = document.querySelector(".section-countdown");

  if (!countdownElement) {
    console.error("Countdown element not found!");
    return;
  }

  function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      countdownElement.innerHTML = "Countdown expired!";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `
              <div class="section-countdown-timer">
                <span class="section-countdown-text">Days</span>
                <h2 class="section-countdown-number">${days}</h2>
              </div>
              <span class="section-countdown-colon">:</span>
              <div class="section-countdown-timer">
                <span class="section-countdown-text">Hours</span>
                <h2 class="section-countdown-number">${hours}</h2>
              </div>
              <span class="section-countdown-colon">:</span>
              <div class="section-countdown-timer">
                <span class="section-countdown-text">Minutes</span>
                <h2 class="section-countdown-number">${minutes}</h2>
              </div>
              <span class="section-countdown-colon">:</span>
              <div class="section-countdown-timer">
                <span class="section-countdown-text">Seconds</span>
                <h2 class="section-countdown-number">${seconds}</h2>
              </div>`;
    }
  }

  setInterval(updateCountdown, 1000);
}

const currentDate = new Date();
const targetDate = new Date(currentDate);
targetDate.setDate(currentDate.getDate() + 4);
countdown(targetDate);

// buse geri sayım bitiş

// Homepage Featured Product
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

if (daysElement && hoursElement && minutesElement && secondsElement) {
  let hedefTarih = new Date("2024-03-28T23:59:59").getTime();

  let zamanlayici = setInterval(function () {
    let simdikiTarih = new Date().getTime();

    let kalanZaman = hedefTarih - simdikiTarih;

    let gun = Math.floor(kalanZaman / (1000 * 60 * 60 * 24));
    let saat = Math.floor(
      (kalanZaman % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let dakika = Math.floor((kalanZaman % (1000 * 60 * 60)) / (1000 * 60));
    let saniye = Math.floor((kalanZaman % (1000 * 60)) / 1000);

    daysElement.innerHTML = gun < 10 ? "0" + gun : gun;
    hoursElement.innerHTML = saat < 10 ? "0" + saat : saat;
    minutesElement.innerHTML = dakika < 10 ? "0" + dakika : dakika;
    secondsElement.innerHTML = saniye < 10 ? "0" + saniye : saniye;
  }, 1000);
} else {
  console.error("Elements not found");
}

// Homepage Featured Product bitiş

// Locale storage Work in progress

// document.addEventListener("click", function (event) {
//   if (event.target.classList.contains("f-product-cart")) {
//     const product = {
//       id: event.target.dataset.productId,
//       title: event.target.dataset.productTitle,
//       price: event.target.dataset.productPrice,
//       image: event.target.dataset.productImage,
//       quantity: 1,
//     };

//     // Ürünü Locale Storage'a ekleyin
//     addToCart(product);
//   }
// });

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const cartProduct = cart.find((item) => item.id === productId);

  if (!cartProduct) {
    const productToAdd = allProducts.find(
      (product) => product.id === productId
    );
    const newCartProducts = [...cart, productToAdd];
    localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
  } else {
    // burada silme logic'i olacak
    alert("The product has been removed from the cart");
    removeFromCart(productId);
  }
}

function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cartProducts")) || [];

  const newCart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cartProducts", JSON.stringify(newCart));
}

// Locale storage finish
// Homepage Explore Products Başlangıç
const exploreProductsContainer = document.querySelector(
  "#exploreProductsContainer"
);

let limitedProducts = [];

async function fetchExploreProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  limitedProducts = data.slice(10, 18);

  const exploreProductsHTML = limitedProducts
    .map((product) => {
      return `
            <div class="explore-products-card">
            <div class="explore-pro-img-box">
            <div class="explore-pro-svg-box">
              <svg id="favoriteIcon${product.id}" onclick="addToWishlist(${product.id})" class="explore-svg-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="favoriteIconPath${product.id}" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg id="shoppingCartIcon${product.id}" onclick="addToCartIcon(${product.id})" class="explore-svg-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg id="shoppingCheckIcon${product.id}" onclick="addToCartIcon(${product.id})" class="explore-svg-icon check-icon" width="32px" height="32px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier"> <path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 5L8 15l-5-4"/> </g>
              </svg>
              </div>
              <img class="explore-products-card-img" src=${product.image} />
              </div>
              <h3 class="explore-products-card-title">${product.title}</h3>
              <div class="explore-price-stars">
                <p class="explore-products-card-price">$${product.price}</p>
                <img class="explore-stars" src="./images/five-star.png" alt="star-icon">
                <p class="explore-products-comments">(${product.rating.count})</p>
              </div>
            </div>
           `;
    })
    .join("");

  exploreProductsContainer.innerHTML = exploreProductsHTML;
  defaultFavoriteProduct();
  defaultCartProduct();
}
let wishlistProducts = [];
fetchExploreProducts();

function addToWishlist(productId) {
  const favoriteIcon = document.getElementById(`favoriteIcon${productId}`);
  const favoriteIconPath = document.getElementById(
    `favoriteIconPath${productId}`
  );

  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];

  const wishlistProduct = wishlistProducts.find(
    (product) => product.id === productId
  );

  if (!wishlistProduct) {
    const productToAdd = limitedProducts.find(
      (product) => product.id === productId
    );
    const newWishlistProducts = [...wishlistProducts, productToAdd];
    localStorage.setItem(
      "wishlistProducts",
      JSON.stringify(newWishlistProducts)
    );

    favoriteIcon.style.fill = "red";
    favoriteIconPath.style.stroke = "red";
  } else {
    deleteProduct(productId);
  }
}

function deleteProduct(productId) {
  const favoriteIcon = document.getElementById(`favoriteIcon${productId}`);
  const favoriteIconPath = document.getElementById(
    `favoriteIconPath${productId}`
  );
  const newWishlistProducts = wishlistProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem("wishlistProducts", JSON.stringify(newWishlistProducts));
  wishlistProducts = newWishlistProducts;
  favoriteIcon.style.fill = "none";
  favoriteIconPath.style.stroke = "black";
}
function defaultFavoriteProduct(productId) {
  const defaultWishlist = localStorage.getItem("wishlistProducts");
  wishlistProducts = JSON.parse(defaultWishlist) || [];
  wishlistProducts.forEach((e) => {
    productId = e.id;
    document.getElementById(`favoriteIcon${productId}`).style.fill = "red";
    document.getElementById(`favoriteIconPath${productId}`).style.stroke =
      "red";
  });
}
//let cartProducts = [];
function addToCartIcon(productId) {
  document.getElementById(`shoppingCheckIcon${productId}`).style.display =
    "flex";
  document.getElementById(`shoppingCartIcon${productId}`).style.display =
    "none";
  const unparsedProducts = localStorage.getItem("cartProducts");
  const newShopingProduct = limitedProducts.find(
    (product) => product.id === productId
  );

  if (unparsedProducts) {
    cartProducts = JSON.parse(unparsedProducts);
  }

  const isMatch = cartProducts.find(
    (product) => product.id === newShopingProduct.id
  );

  if (!isMatch) {
    const productsToAdd = [...cartProducts, newShopingProduct];

    localStorage.setItem("cartProducts", JSON.stringify(productsToAdd));

    cartProducts = productsToAdd;
  } else {
    deleteCartProduct(productId);
  }
}

function deleteCartProduct(productId) {
  alert("The product has been removed from the cart");
  document.getElementById(`shoppingCheckIcon${productId}`).style.display =
    "none";
  document.getElementById(`shoppingCartIcon${productId}`).style.display =
    "flex";
  const newShopingProduct = cartProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem("cartProducts", JSON.stringify(newShopingProduct));
  cartProducts = newShopingProduct;
}
function defaultCartProduct(productId) {
  const defaultShoping = localStorage.getItem("cartProducts");
  cartProducts = JSON.parse(defaultShoping) || [];
  cartProducts.forEach((e) => {
    productId = e.id;
    document.getElementById(`shoppingCheckIcon${productId}`).style.display =
      "flex";
    document.getElementById(`shoppingCartIcon${productId}`).style.display =
      "none";
  });
}
// Homepage Explore Products Bitiş
