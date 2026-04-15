let taxSwitch = document.getElementById("switchCheckDefault");

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