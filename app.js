function filterFunction() {
  var input, filter, a, i;
  input = document.querySelector(".search-input");
  filter = input.value.toUpperCase();
  div = document.querySelector("#search-dropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
function toggleSearchDropdown() {
  var dropdown = document.getElementById("search-dropdown");
  dropdown.classList.toggle("show");
}
