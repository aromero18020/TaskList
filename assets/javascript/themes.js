const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");

const setTheme = function (theme) {
    document.documentElement.className = theme;
};

lightBtn.addEventListener("click", function () {
    setTheme("light");
    lightBtn.style.display = "none";
    darkBtn.style.display = "";
    document.getElementsByTagName("html").classList.add("light");
    document.getElementsByTagName("body").classList.add("light");
});

darkBtn.addEventListener("click", function () {
    setTheme("dark");
    lightBtn.style.display = "";
    darkBtn.style.display = "none";
    document.getElementsByTagName("html").classList.remove("light");
    document.getElementsByTagName("body").classList.remove("light");
});