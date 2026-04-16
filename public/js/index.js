let taxSwitch = document.getElementById("switchCheckDefault");
<<<<<<< HEAD

if (taxSwitch) {
    taxSwitch.addEventListener("change", () => {
        let taxInfo = document.getElementsByClassName("tax-info");

        for (let info of taxInfo) {
            if (info.style.display != "inline") {
                info.style.display = "inline";
            } else {
                info.style.display = "none";
            }
        }
    });
}
=======
taxSwitch.addEventListener("change", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
        if (info.style.display != "inline") {
            info.style.display = "inline";
        }
        else {
            info.style.display = "none";
        }
    }
});
>>>>>>> features
