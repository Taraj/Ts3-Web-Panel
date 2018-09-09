let initialAlerts = [];

function spawnAlert(type, message) {
    let alertContainer = document.getElementById("alert");
    let alert = document.createElement("div");
    let header = document.createElement("header");
    let p = document.createElement("p");
    let exit = document.createElement("p");

    exit.innerText = "{{Kliknij aby zamknąć}}";

    if (type === "success") {
        header.innerText = "Sukces!!!";
    } else if (type === "error") {
        header.innerText = "Błąd!!!";
    } else if (type === "warning") {
        header.innerText = "Uwaga!!!";
    }

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
        spawnAlert(alert.type, alert.message);
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
