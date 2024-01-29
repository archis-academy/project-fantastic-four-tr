import products from "./products.js";
const hamburger = document.querySelector(".hamburger");
const headerNavbarList = document.querySelector(".header-navbar-list");
const searchInput = document.querySelector(".search-input");
const searchDropdown = document.querySelector("#search-dropdown");
const searchDropdownItems = document.querySelectorAll(".search-dropdown-item");

hamburger.addEventListener("click", function () {
  headerNavbarList.classList.toggle("active");
});
searchInput.addEventListener("input", (e) => {
  filterFunction(e);
});

function filterFunction(e) {
  const filter = e.target.value.trim().toUpperCase();
  searchDropdown.innerHTML = "";
  if (!filter) {
    return;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toUpperCase().includes(filter)
  );

  filteredProducts.forEach((filteredProduct) => {
    const itemLink = document.createElement("a");
    itemLink.classList.add("search-dropdown-item");
    itemLink.href = "#";
    itemLink.textContent = filteredProduct.title;
    searchDropdown.appendChild(itemLink);
  });
}

function indirimYap(fiyat, indirim) {
  const sonuc = fiyat - fiyat * indirim / 100;
  return sonuc.toFixed(2);
}


async function urunleriGetir() {
  const flashSalesDiv = document.querySelector("#flashSales");
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  const rastgeleUrunler = [data[0], data[1], data[2], data[3]];

  flashSalesDiv.innerHTML = rastgeleUrunler.map((urun) => {
    return `<div class="f-product-card">
              <div class="f-product-image-container">
                <img class="f-product-image" src=${urun.image} />
                <span class="f-product-discount">-50%</span>
              </div>
              <h3 class="f-product-title">${urun.title}</h3>
              <div class="f-product-price-container">
                <p class="f-product-new-price">${indirimYap(urun.price, 50)}</p>
                <s class="f-product-old-price">${urun.price}</s>
              </div>
              <div class="f-products-ratings">
                <div>
                <img class="stars" src="./images/five-star.png" alt="star-icon">
                </div>
                <p class="f-products-comments">(${urun.rating.count})</p>
              </div>
            </div>`;
  }).join("");
}

urunleriGetir();
