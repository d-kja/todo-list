const menuButton = $("#btn-menu");
const menu = $("#menu");
const exit = $("#exit");

function slideIn() {
    menu.css("transform", "translateX(0px)");
    menu.css("opacity", "100%");
    exit.css("visibility", "visible");
}
function slideOut() {
    menu.css("transform", "translateX(-350px)");
    menu.css("opacity", "0%");
    exit.css("visibility", "hidden");
}

menuButton.on("click", (e) => {
    menuButton.addClass("click");
    slideIn();
    setTimeout(() => {
        menuButton.removeClass("click");
    }, 500);
});

exit.on("click", (e) => {
    slideOut();
});

exit.on("mouseover", function () {
    $("body").css("cursor", "pointer");
});

exit.on("mouseleave", function () {
    $("body").css("cursor", "auto");
});
