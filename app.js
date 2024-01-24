import products from "./products.js";
const hamburger = document.querySelector(".hamburger");
const headerNavbarList = document.querySelector(".header-navbar-list");
const searchInput = document.querySelector(".search-input");
const searchDropdown = document.querySelector("#search-dropdown");
const searchDropdownItems = document.querySelectorAll(".search-dropdown-item");
const womanDropdownContainer = document.querySelector(
  ".woman-dropdown-container"
);

const menDropdownContainer = document.querySelector(".men-dropdown-container");
console.log(womanDropdownContainer, menDropdownContainer);
const menClothingProducts = products.filter(
  (product) => product.category.toLowerCase() === "men's clothing"
);
const womenClothingProducts = products.filter(
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
else{
  console.error("Missing items but it's okay, just ignore me. ");
}

womenClothingProducts.forEach((product) => {
  //console.log(product.title);
});

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
