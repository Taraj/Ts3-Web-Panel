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
                spawnAlert("succes", "Sukces!!!", "Twoja Wiadomośc została wysłana. Dziękujemy za kontakt z nami.");
            } else {
                spawnAlert("error", "Błąd!!!", res.error);
            }

        }).catch(err => {
            spawnAlert("error", "Błąd!!!", err);
        });
    });
});
