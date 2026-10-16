// Home link in the sidebar gets the active look
const homeLink = document.getElementById("homeLink");
// Add the active class so Home looks selected
homeLink.classList.add("active");

// taking theme
const themeToBe = localStorage.getItem("noteza-theme");
const theme = document.getElementById("theme");

if (theme && themeToBe && themeToBe !== "null") {
    theme.setAttribute("href", themeToBe);
}

// Get the heading element that shows the user name
const username = document.getElementById("usernameOutput");

// Read the saved name from localStorage
let nameOfUser = localStorage.getItem("noteza-name");

// If there is no saved name, ask once
if (!nameOfUser) {
    // Browser prompt for the name
    nameOfUser = prompt("What can we call you?");

    // Empty or cancel → use Student
    if (!nameOfUser || nameOfUser.trim() === "") {
        nameOfUser = "Student";
    } else {
        // Cut extra spaces from the typed name
        nameOfUser = nameOfUser.trim();
    }

    // Save the name so we do not ask again
    localStorage.setItem("noteza-name", nameOfUser);
}

// Write the greeting on the page
username.innerText = `Hi, ${nameOfUser}`;

// Box that holds recent note cards
const recentList = document.getElementById("recentList");
// The big note sheet panel
const notePanel = document.getElementById("notePanel");
// Place where note text is printed
const noteOutput = document.getElementById("noteOutput");
//Notes Heading
const heading = document.getElementById("heading");

// Load every saved recent note (or an empty list)
let savedFiles = JSON.parse(localStorage.getItem("noteza-recents") || "[]");
// Home only shows the first 4
let recentListItems = savedFiles.slice(0, 4);

// See the list in the browser console while you test
console.log(recentListItems);

// This check stays as you wrote it
if (recentListItems.length === 0) {
    // Card for the empty message
    const article = document.createElement("article");
    // Text inside that card
    article.innerText = "No notes yet";
    // Put the card in the recent list
    recentList.appendChild(article);
} else {
    // One card per recent note
    for (let i = 0; i < recentListItems.length; i++) {
        // New card
        const article = document.createElement("article");
        // Title on the card
        article.innerHTML = recentListItems[i].chapterName;
        // Set initial 3D rendering properties to prevent text distortion/mirroring
        article.style.transformStyle = "preserve-3d";
        article.style.backfaceVisibility = "hidden";
        article.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

        // Hover effect
        article.addEventListener("mouseover", () => {
            article.style.cursor = "pointer";
            article.style.transform = "translateY(-5px) scale(1)";
            article.style.boxShadow = "0 3px 5px rgba(0, 0, 0, 0.3)";
        });

        // Hover out effect
        article.addEventListener("mouseout", () => {
            article.style.transform = "translateY(0) scale(1)";
            article.style.boxShadow = "none";
        });


        // Put the card on the page
        recentList.appendChild(article);

        // Click card → show that note
        article.addEventListener("click", () => {
            // adding heading
            heading.innerHTML = recentListItems[i].chapterName
            // Put the note text in the sheet
            noteOutput.innerHTML = recentListItems[i].content;
            // Show the sheet over Home
            notePanel.classList.add("is-open");
        });
    }
}

// 5 MB cap used for the storage bar
const STORAGE_CAP = 5 * 1024 * 1024;

// Count bytes of every noteza- key
function notezaBytes() {
    // Running total
    let total = 0;
    // Walk every localStorage key
    for (let i = 0; i < localStorage.length; i++) {
        // Name of this key
        const key = localStorage.key(i);
        // Skip keys that are not NOTEZA
        if (!key || key.indexOf("noteza-") !== 0) continue;
        // Value stored under that key
        const value = localStorage.getItem(key) || "";
        // Add key length + value length
        total += key.length + value.length;
    }
    // UTF-16 uses 2 bytes per character
    return total * 2;
}

// Update the bar and the % text
function updateStorageCard() {
    // How many bytes NOTEZA uses
    const used = notezaBytes();
    // Used space as a percent
    let usedPercent = Math.round((used / STORAGE_CAP) * 100);
    // Do not go below 0
    if (usedPercent < 0) usedPercent = 0;
    // Do not go above 100
    if (usedPercent > 100) usedPercent = 100;
    // What to show as "left"
    const leftPercent = 100 - usedPercent;
    // Blue fill inside the bar
    const fill = document.querySelector(".storageFill");
    // Text under the bar
    const text = document.querySelector(".storageText");
    // Set fill width
    if (fill) fill.style.width = usedPercent + "%";
    // Set the label
    if (text) text.textContent = leftPercent + "% left";
}

// Run the bar once when Home loads
updateStorageCard();
