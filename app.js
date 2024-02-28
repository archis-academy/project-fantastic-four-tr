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
