let initialAlerts = [];

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

    initialAlerts.forEach(alert => {
        spawnAlert(alert.type, alert.title, alert.message);
    });


    document.getElementById("menuMobileButton").addEventListener("click", () => {
        document.getElementById("menuMobileContainer").classList.toggle("menu-mobile-visible");
        document.body.classList.toggle("menu-mobile-visible-body");
    });
    document.getElementById("menuMobileContainer").addEventListener("click", () => {
        document.getElementById("menuMobileContainer").classList.toggle("menu-mobile-visible");
        document.body.classList.toggle("menu-mobile-visible-body");
    });

});
