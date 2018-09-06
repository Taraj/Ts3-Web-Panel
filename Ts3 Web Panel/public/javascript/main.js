function spawnAlert(type, title, message) {
    let alertContainer = document.getElementById("alert");
    let alert = document.createElement("div");
    let header = document.createElement("header");
    let p = document.createElement("p");
    let exit = document.createElement("p");

    exit.innerText = "{{Kliknij aby zamknąć}}";
    header.innerText = title;
    p.innerText = message;


    alert.classList.add(type);
    exit.classList.add("exit");

    alert.addEventListener("click", () => {
        alert.remove();
    });

    alert.appendChild(header);
    alert.appendChild(p);
    alert.appendChild(exit);

    alertContainer.appendChild(alert);
}

document.addEventListener("DOMContentLoaded", () => {
    let menu = document.getElementById("menu");

    if (window.pageYOffset) {
        menu.classList.add("menu-desktop-background-visible");
    } else {
        menu.classList.remove("menu-desktop-background-visible");
    }


    document.addEventListener("scroll", () => {
        if (window.pageYOffset) {
            menu.classList.add("menu-desktop-background-visible");
        } else {
            menu.classList.remove("menu-desktop-background-visible");
        }
    });
    /*
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'

            });
        });
    });
    */
    document.getElementById("menuMobileButton").addEventListener("click", () => {
        document.getElementById("menuMobileContainer").classList.toggle("menu-mobile-visible");
        document.body.classList.toggle("menu-mobile-visible-body");
    });

});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});