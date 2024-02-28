const elemanlar = document.querySelectorAll(".services-categories");

elemanlar.forEach((link) => {
  link.addEventListener("click", () => {
    elemanlar.forEach((link) => {
      link.style.backgroundColor = "white";
    });
    link.style.backgroundColor = "#DB4444";
  });
});
