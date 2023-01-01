const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");

const setTheme = function (theme) {
    document.documentElement.className = theme;
};

lightBtn.addEventListener("click", function () {
    setTheme("light");
    lightBtn.style.display = "none";
    darkBtn.style.display = "";
});

darkBtn.addEventListener("click", function () {
    setTheme("dark");
    lightBtn.style.display = "";
    darkBtn.style.display = "none";
});