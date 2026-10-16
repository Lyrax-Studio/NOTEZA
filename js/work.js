// Sidebar: mark this page as Work
const workLink = document.getElementById("workLink");
workLink.classList.add("active");

// taking theme
const themeToBe = localStorage.getItem("noteza-theme");
const theme = document.getElementById("theme");

if (theme && themeToBe && themeToBe !== "null") {
    theme.setAttribute("href", themeToBe);
}

// The four Work cards
const notes = document.getElementById("notes");
const presentations = document.getElementById("presentations");
const thumbnail = document.getElementById("thumbnail");
const ui_ux = document.getElementById("ui-ux");

// Popup box + its two buttons
const notePopup = document.getElementById("notePopup");
const popupCancel = document.getElementById("popupCancel");
const popupContinue = document.getElementById("popupContinue");

// Inputs inside the popup
const noteFolder = document.getElementById("noteFolder");
const noteHeading = document.getElementById("noteHeading");

// Notes card → show popup
notes.addEventListener("click", () => {
    notePopup.classList.remove("popupHide");
});

// Cancel → hide popup and clear the boxes
popupCancel.addEventListener("click", () => {
    notePopup.classList.add("popupHide");
    noteFolder.value = "";
    noteHeading.value = "";
});

// Continue → check, save, go to Notes page
popupContinue.addEventListener("click", () => {
    const folder = noteFolder.value.trim();
    const heading = noteHeading.value.trim();

    if (folder === "" || heading === "") {
        alert("Type folder name and heading");
        return;
    }

    // Saved so notes.html can read them later
    localStorage.setItem("noteza-folder", folder);
    localStorage.setItem("noteza-heading", heading);

    window.location.href = "workTabs/notes.html";
});

// Other cards — temporary
function comingSoon() {
    alert("Coming Soon");
}

presentations.addEventListener("click", comingSoon);
thumbnail.addEventListener("click", comingSoon);
ui_ux.addEventListener("click", comingSoon);