// ==================== setting.js ====================

// Mark Settings as the open page
const settingLink = document.getElementById("settingLink");
if (settingLink) {
    settingLink.classList.add("active");
}

// ---------- User name ----------
const userName = document.getElementById("userName");

// Read saved name. First visit has no key, so keep "Student" from HTML
const savedName = localStorage.getItem("noteza-name");
if (savedName && savedName !== "null") {
    userName.value = savedName;
}

// Save while the user types
userName.addEventListener("input", function () {
    localStorage.setItem("noteza-name", userName.value);
});

// ---------- Theme ----------
const theme = document.getElementById("theme");
const themeSelector = document.getElementById("themeSelector");
const savedTheme = localStorage.getItem("noteza-theme");

if (theme && savedTheme && savedTheme !== "null") {
    theme.setAttribute("href", savedTheme);
    if (themeSelector) {
        themeSelector.value = savedTheme;
    }
} else if (theme) {
    theme.setAttribute("href", "./css/cssVariables.css");
}

if (themeSelector && theme) {
    themeSelector.addEventListener("change", function () {
        localStorage.setItem("noteza-theme", this.value);
        theme.setAttribute("href", this.value);
    });
}
// ---------- Delete all notes ----------
const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", function () {
    const ok = confirm("Delete all notes?");
    if (!ok) {
        return;
    }

    // Notes list used by Home + Library + editor
    localStorage.setItem("noteza-recents", "[]");

    // Last open note text
    localStorage.removeItem("noteza-text");

    // Do not delete noteza-name or noteza-theme
});