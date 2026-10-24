
"use strict";

// ==========================================
// 1. FUNGSI DASAR
// ==========================================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

function loadData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : fallback;
    } catch (error) {
        return fallback;
    }
}

function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Gagal menyimpan data:", error);
    }
}

// ==========================================
// 2. NAVIGASI HALAMAN
// ==========================================

function showPage(pageName) {
    $$(".page").forEach((page) => {
        page.classList.remove("active");
        page.hidden = true;
    });

    const targetPage = $("#" + pageName);

    if (targetPage) {
        targetPage.hidden = false;
        targetPage.classList.add("active");
    } else {
        console.error("Halaman tidak ditemukan:", pageName);
    }

    $$(".nav-link").forEach((link) => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageName
        );
    });
}

$$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        showPage(link.dataset.page);
    });
});

$$("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
        showPage(button.dataset.go);
    });
});

// ==========================================
// 3. FITUR CATATAN BELAJAR
// ==========================================

let notes = loadData("studymate_notes", []);
let editingNoteId = null;

function renderNotes() {
    const container = $("#notes-list");
    if (!container) return;

    container.replaceChildren();

    if (notes.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-state";
        message.textContent =
            "Belum ada catatan. Yuk, buat catatan pertamamu!";
        container.appendChild(message);
        return;
    }

    notes.forEach((note) => {
        const card = document.createElement("article");
        card.className = "note-card";

        const title = document.createElement("h3");
        title.textContent = note.title;

        const subject = document.createElement("p");
        subject.textContent =
            "Mata pelajaran: " + note.subject;

        const content = document.createElement("p");
        content.textContent = note.content;

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
            $("#note-title").value = note.title;
            $("#note-subject").value = note.subject;
            $("#note-content").value = note.content;

            editingNoteId = note.id;
            showPage("notes");
            $("#note-title").focus();
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Hapus";

        deleteButton.addEventListener("click", () => {
            notes = notes.filter(
                (item) => item.id !== note.id
            );

            saveData("studymate_notes", notes);
            renderNotes();
            updateDashboard();
        });

        card.append(
            title,
            subject,
            content,
            editButton,
            deleteButton
        );

        container.appendChild(card);
    });
}

const noteForm = $("#note-form");

noteForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = $("#note-title").value.trim();
    const subject = $("#note-subject").value.trim();
    const content = $("#note-content").value.trim();

    if (!title || !subject || !content) {
        alert("Lengkapi semua kolom catatan terlebih dahulu.");
        return;
    }

    if (editingNoteId !== null) {
        notes = notes.map((note) =>
            note.id === editingNoteId
                ? { ...note, title, subject, content }
                : note
        );
    } else {
        notes.unshift({
            id: Date.now(),
            title,
            subject,
            content
        });
    }

    saveData("studymate_notes", notes);

    noteForm.reset();
    editingNoteId = null;

    renderNotes();
    updateDashboard();
});
