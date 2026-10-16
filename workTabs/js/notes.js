// ==================== NOTES.JS ====================
// Notes page: theme, title, clock, save.

// ---------- Theme ----------
const themeLink = document.getElementById("theme");
const savedTheme = localStorage.getItem("noteza-theme");

if (themeLink && savedTheme && savedTheme !== "null") {
    const fileName = savedTheme.split("/").pop();
    themeLink.href = "../css/" + fileName;
}

// ---------- Title + folder ----------
const note = {};
note.heading = localStorage.getItem("noteza-heading") || "No heading";
note.folder = localStorage.getItem("noteza-folder") || "No folder";

const title = document.getElementById("title");
const folder = document.getElementById("folder");
const time = document.getElementById("time");

title.innerText = note.heading;
folder.innerText = note.folder;

// ---------- Clock ----------
const currentTime = new Date();
const currentHour = currentTime.getHours();
const currentMinute = currentTime.getMinutes();
const mins = String(currentMinute).padStart(2, "0");

if (currentHour === 0) {
    time.innerText = "Today, 12:" + mins + " AM";
} else if (currentHour < 12) {
    time.innerText = "Today, " + currentHour + ":" + mins + " AM";
} else if (currentHour === 12) {
    time.innerText = "Today, 12:" + mins + " PM";
} else {
    time.innerText = "Today, " + (currentHour - 12) + ":" + mins + " PM";
}

// ---------- Load ----------
const editor = document.getElementById("editor");

let savedFiles = JSON.parse(localStorage.getItem("noteza-recents") || "[]");
if (!Array.isArray(savedFiles)) {
    savedFiles = [];
}

editor.innerHTML = "<p><br></p>";

for (let i = 0; i < savedFiles.length; i++) {
    if (
        savedFiles[i].chapterName === note.heading &&
        savedFiles[i].folderName === note.folder &&
        savedFiles[i].content
    ) {
        editor.innerHTML = savedFiles[i].content;
        break;
    }
}

// ---------- Save ----------
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", function () {
    note.text = editor.innerHTML;
    localStorage.setItem("noteza-text", note.text);

    const objectToBeSave = {
        folderName: localStorage.getItem("noteza-folder") || "No folder",
        chapterName: localStorage.getItem("noteza-heading") || "No heading",
        content: localStorage.getItem("noteza-text") || ""
    };

    let found = -1;
    for (let i = 0; i < savedFiles.length; i++) {
        if (
            savedFiles[i].chapterName === objectToBeSave.chapterName &&
            savedFiles[i].folderName === objectToBeSave.folderName
        ) {
            found = i;
            break;
        }
    }

    if (found !== -1) {
        savedFiles.splice(found, 1);
    }

    savedFiles.unshift(objectToBeSave);
    localStorage.setItem("noteza-recents", JSON.stringify(savedFiles));
});