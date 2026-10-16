const boldBtn = document.getElementById("boldBtn");
const italicBtn = document.getElementById("italicBtn");
const underlineBtn = document.getElementById("underlineBtn");
const strikeBtn = document.getElementById("strikeBtn");

function btnselected(tagName) {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        return;
    }
    const range = sel.getRangeAt(0);
    const element = document.createElement(tagName);

    const extractedContent = range.extractContents();
    element.appendChild(extractedContent);

    range.insertNode(element);
}

boldBtn.addEventListener("click", () => {
    btnselected("strong");
});

italicBtn.addEventListener("click", () => {
    btnselected("em");
});

underlineBtn.addEventListener("click", () => {
    btnselected("u");
});

strikeBtn.addEventListener("click", () => {
    btnselected("del");
});