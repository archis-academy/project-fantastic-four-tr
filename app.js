const elemanlar = document.querySelectorAll(".category-box");

elemanlar.forEach((link) => {
    link.addEventListener("click", () => {
        elemanlar.forEach((link) => {
            link.style.backgroundColor = "white";
        });
        link.style.backgroundColor = "#DB4444";
    })
})