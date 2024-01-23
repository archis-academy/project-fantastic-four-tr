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
