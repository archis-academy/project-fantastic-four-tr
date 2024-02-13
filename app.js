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

function fetchData(url) {
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

async function urunleriGetir() {
  const flashSalesDiv = document.querySelector("#flashSales");
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  const rastgeleUrunler = [data[5], data[8], data[3], data[12]];

  flashSalesDiv.innerHTML = rastgeleUrunler
    .map((urun) => {
      return `<div class="f-product-card">
              <div class="f-product-image-container">
                <img class="f-product-image" src=${urun.image} />
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
let hedefTarih = new Date("2024-02-28T23:59:59").getTime();

let zamanlayici = setInterval(function () {
  let simdikiTarih = new Date().getTime();

  let kalanZaman = hedefTarih - simdikiTarih;

  let gun = Math.floor(kalanZaman / (1000 * 60 * 60 * 24));
  let saat = Math.floor(
    (kalanZaman % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let dakika = Math.floor((kalanZaman % (1000 * 60 * 60)) / (1000 * 60));
  let saniye = Math.floor((kalanZaman % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = gun < 10 ? "0" + gun : gun;
  document.getElementById("hours").innerHTML = saat < 10 ? "0" + saat : saat;
  document.getElementById("minutes").innerHTML =
    dakika < 10 ? "0" + dakika : dakika;
  document.getElementById("seconds").innerHTML =
    saniye < 10 ? "0" + saniye : saniye;
}, 1000);
// Homepage Featured Product bitiş

// Homepage Explore Products Başlangıç
const exploreProductsContainer = document.querySelector(
  "#exploreProductsContainer"
);

let limitedProducts = [];

async function fetchExploreProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  limitedProducts = data.slice(10,18);

  const exploreProductsHTML = limitedProducts
    .map((product) => {
      return `
            <div class="explore-products-card">
              <svg id="favoriteIcon${product.id}" onclick="addToWishlist(${product.id})" class="explore-wishlist-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="favoriteIconPath${product.id}" d="M11 7C8.239 7 6 9.216 6 11.95C6 14.157 6.875 19.395 15.488 24.69C15.6423 24.7839 15.8194 24.8335 16 24.8335C16.1806 24.8335 16.3577 24.7839 16.512 24.69C25.125 19.395 26 14.157 26 11.95C26 9.216 23.761 7 21 7C18.239 7 16 10 16 10C16 10 13.761 7 11 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg id="shoppingCartIcon${product.id}" onclick="addToCart(${product.id})" class="explore-shopping-cart-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 27C11.5523 27 12 26.5523 12 26C12 25.4477 11.5523 25 11 25C10.4477 25 10 25.4477 10 26C10 26.5523 10.4477 27 11 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M25 27C25.5523 27 26 26.5523 26 26C26 25.4477 25.5523 25 25 25C24.4477 25 24 25.4477 24 26C24 26.5523 24.4477 27 25 27Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 5H7L10 22H26" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10 16.6667H25.59C25.7056 16.6667 25.8177 16.6267 25.9072 16.5535C25.9966 16.4802 26.0579 16.3782 26.0806 16.2648L27.8806 7.26479C27.8951 7.19222 27.8934 7.11733 27.8755 7.04552C27.8575 6.97371 27.8239 6.90678 27.7769 6.84956C27.73 6.79234 27.6709 6.74625 27.604 6.71462C27.5371 6.68299 27.464 6.66661 27.39 6.66666H8" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <img class="explore-products-card-img" src=${product.image} />
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
}

fetchExploreProducts();

function addToWishlist(productId) {
  const favoriteIcon = document.getElementById(`favoriteIcon${productId}`);
  const favoriteIconPath = document.getElementById(`favoriteIconPath${productId}`);

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

let wishlistProducts = [];

function deleteProduct(productId) {
  const favoriteIcon = document.getElementById(`favoriteIcon${productId}`);
  const favoriteIconPath = document.getElementById(`favoriteIconPath${productId}`);
  const wishlistProduct = wishlistProducts.filter(
    (product) => product.id !== productId
  );
  localStorage.setItem(
    "wishlistProducts",
    JSON.stringify(wishlistProduct)
  );
  wishlistProducts = wishlistProduct
  favoriteIcon.style.fill = "none";
  favoriteIconPath.style.stroke = "black";
}

function defaultFavoriteProduct(productId) {
 const defaultWishlist = localStorage.getItem("wishlistProducts");
  wishlistProducts = JSON.parse(defaultWishlist) || [];
  wishlistProducts.forEach((e) => {
  productId = e.id;
  document.getElementById(`favoriteIcon${productId}`).style.fill = "red";
  document.getElementById(`favoriteIconPath${productId}`).style.stroke = "red";
});
}

function addToCart(productId) {
  
}


// Homepage Explore Products Bitiş
