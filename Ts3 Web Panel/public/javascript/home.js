document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault();
        fetch("/message", {
            method: "post",
            body: JSON.stringify({
                subject: document.getElementById("formSubject").value,
                nickname: document.getElementById("formNickname").value,
                message: document.getElementById("formMessage").value
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        }).then(res => {
            return res.json();
        }).then(res => {
            if (res.succes) {
                spawnAlert("success",  "Twoja Wiadomośc została wysłana. Dziękujemy za kontakt z nami.");
            } else {
                spawnAlert("error", res.error);
            }

        }).catch(err => {
            spawnAlert("error", err);
        });
    });

    let menu = document.getElementById("menu");
    if (window.pageYOffset) {
        menu.classList.remove("menu-desktop-background-invisible");
    } else {
        menu.classList.add("menu-desktop-background-invisible");
    }
    document.addEventListener("scroll", () => {
        if (window.pageYOffset) {
            menu.classList.remove("menu-desktop-background-invisible");
        } else {
            menu.classList.add("menu-desktop-background-invisible");
        }
    });
});

$(document).on('click', 'a[href^="/#"]', function (event) {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href').substring(1)).offset().top
    }, 500);
});