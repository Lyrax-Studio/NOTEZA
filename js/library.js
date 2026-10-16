// Library tab looks selected
const libraryLink = document.getElementById("libraryLink");
libraryLink.classList.add("active");

// taking theme
const themeToBe = localStorage.getItem("noteza-theme");
const theme = document.getElementById("theme");

if (theme && themeToBe && themeToBe !== "null") {
    theme.setAttribute("href", themeToBe);
}

const folderContainer = document.getElementById("folderContainer");
const notePanel = document.getElementById("notePanel");
const heading = document.getElementById("heading");
const noteOutput = document.getElementById("noteOutput");
const closeNote = document.getElementById("closeNote");

// All notes from Work / Home
let savedNotes = JSON.parse(localStorage.getItem("noteza-recents") || "[]");
if (!Array.isArray(savedNotes)) {
    savedNotes = [];
}

// Keep one row per chapter + folder (newest first)
function uniqueNotes(list) {
    const seen = {};
    const clean = [];

    for (let i = 0; i < list.length; i++) {
        const note = list[i];
        const key = (note.folderName || "") + "::" + (note.chapterName || "");
        if (seen[key]) {
            continue;
        }
        seen[key] = true;
        clean.push(note);
    }

    return clean;
}

savedNotes = uniqueNotes(savedNotes);
localStorage.setItem("noteza-recents", JSON.stringify(savedNotes));

function saveNotes() {
    localStorage.setItem("noteza-recents", JSON.stringify(savedNotes));
}

// Unique folder names taken from saved notes
function getFolders() {
    const folders = [];
    for (let i = 0; i < savedNotes.length; i++) {
        const name = savedNotes[i].folderName;
        if (name && folders.indexOf(name) === -1) {
            folders.push(name);
        }
    }
    return folders;
}

function notesInFolder(folderName) {
    const list = [];
    for (let i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].folderName === folderName) {
            list.push(savedNotes[i]);
        }
    }
    return list;
}

function deleteNote(folderName, chapterName) {
    savedNotes = savedNotes.filter(function (note) {
        return !(note.folderName === folderName && note.chapterName === chapterName);
    });
    saveNotes();
    renderFolders();
}

function deleteFolder(folderName) {
    savedNotes = savedNotes.filter(function (note) {
        return note.folderName !== folderName;
    });
    saveNotes();
    notePanel.classList.remove("is-open");
    renderFolders();
}

function drawFolder(folderName) {
    const card = document.createElement("section");
    card.className = "folderCard";

    const top = document.createElement("div");
    top.className = "folderTop";

    const title = document.createElement("h2");
    title.textContent = folderName;

    const openBtn = document.createElement("button");
    openBtn.type = "button";
    openBtn.className = "folderOpenBtn";
    openBtn.textContent = "Open";

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "dangerBtn";
    delBtn.textContent = "Delete";

    const notesList = document.createElement("div");
    notesList.className = "notesList";

    // Notes under this folder (Delete is on the row, not on the sheet)
    function fillNotes() {
        notesList.innerHTML = "";
        const list = notesInFolder(folderName);

        if (list.length === 0) {
            const empty = document.createElement("p");
            empty.className = "emptyState";
            empty.textContent = "No notes in this folder";
            notesList.appendChild(empty);
            return;
        }

        for (let i = 0; i < list.length; i++) {
            const note = list[i];
            const row = document.createElement("div");
            row.className = "noteCard";

            const name = document.createElement("span");
            name.textContent = note.chapterName || "Untitled";

            // Open sheet — no delete button there
            name.addEventListener("click", function () {
                heading.textContent = note.chapterName || "Untitled";
                noteOutput.innerHTML = note.content || "";
                notePanel.classList.add("is-open");
            });

            const noteDel = document.createElement("button");
            noteDel.type = "button";
            noteDel.className = "dangerBtn";
            noteDel.textContent = "Delete";
            noteDel.addEventListener("click", function (e) {
                e.stopPropagation();
                if (confirm("Delete this note?")) {
                    deleteNote(note.folderName, note.chapterName);
                }
            });

            row.appendChild(name);
            row.appendChild(noteDel);
            notesList.appendChild(row);
        }
    }

    openBtn.addEventListener("click", function () {
        const willOpen = !card.classList.contains("is-open");
        const all = folderContainer.querySelectorAll(".folderCard");

        for (let i = 0; i < all.length; i++) {
            all[i].classList.remove("is-open");
            const btn = all[i].querySelector(".folderOpenBtn");
            if (btn) {
                btn.textContent = "Open";
            }
        }

        if (willOpen) {
            fillNotes();
            card.classList.add("is-open");
            openBtn.textContent = "Close";
        }
    });

    delBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (confirm("Delete this folder and its notes?")) {
            deleteFolder(folderName);
        }
    });

    top.appendChild(title);
    top.appendChild(openBtn);
    top.appendChild(delBtn);
    card.appendChild(top);
    card.appendChild(notesList);
    folderContainer.appendChild(card);
}

function renderFolders() {
    folderContainer.innerHTML = "";
    const folders = getFolders();

    if (folders.length === 0) {
        const empty = document.createElement("p");
        empty.className = "emptyState";
        empty.textContent = "No folders yet. Save a note in Work with a folder name.";
        folderContainer.appendChild(empty);
        return;
    }

    for (let i = 0; i < folders.length; i++) {
        drawFolder(folders[i]);
    }
}

// Close the note sheet only
closeNote.addEventListener("click", function () {
    notePanel.classList.remove("is-open");
});

renderFolders();