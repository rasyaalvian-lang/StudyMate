
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
    localStorage.setItem(key, JSON.stringify(data));
}

// ==========================================
// 2. NAVIGASI HALAMAN
// ==========================================

function showPage(pageName) {
    // Sembunyikan semua halaman terlebih dahulu
    $$(".page").forEach((page) => {
        page.classList.remove("active");
        page.hidden = true;
    });
    // Cari halaman yang ingin ditampilkan
    const targetPage = $("#" + pageName);
    if (targetPage) {
        targetPage.hidden = false;
        targetPage.classList.add("active");
    } else {
        console.error("Halaman tidak ditemukan:", pageName);
    }
    // Perbarui menu navigasi yang aktif
    $$(".nav-link").forEach((link) => {
        link.classList.toggle(
            "active",
            link.dataset.page === pageName
        );
    });
}

$$(".nav-link").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
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
        message.textContent = "Belum ada catatan. Yuk, buat catatan pertamamu!";
        container.appendChild(message);
        return;
    }

    notes.forEach((note) => {
        const card = document.createElement("article");
        card.className = "note-card";

        const title = document.createElement("h3");
        title.textContent = note.title;

        const subject = document.createElement("p");
        subject.textContent = "Mata pelajaran: " + note.subject;

        const content = document.createElement("p");
        content.textContent = note.content;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";
        editButton.addEventListener("click", () => {
            const titleInput = $("#note-title");
            const subjectInput = $("#note-subject");
            const contentInput = $("#note-content");

            if (!titleInput || !subjectInput || !contentInput) return;

            titleInput.value = note.title;
            subjectInput.value = note.subject;
            contentInput.value = note.content;

            editingNoteId = note.id;
            showPage("notes");
            titleInput.focus();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", () => {
            notes = notes.filter((item) => item.id !== note.id);
            saveData("studymate_notes", notes);
            renderNotes();
            updateDashboard();
        });

        card.append(title, subject, content, editButton, deleteButton);
        container.appendChild(card);
    });
}

const noteForm = $("#note-form");

if (noteForm) {
    noteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = $("#note-title")?.value.trim();
        const subject = $("#note-subject")?.value.trim();
        const content = $("#note-content")?.value.trim();

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
}

// ==========================================
// 4. FITUR KUIS
// ==========================================

const questions = [
    {
        question: "Apa kepanjangan dari HTML?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "HomeText Markup Language"
        ],
        answer: 0,
        explanation: "HTML digunakan untuk menyusun struktur halaman web."
    },
    {
        question: "Manakah yang digunakan untuk mengatur tampilan website?",
        options: ["Python", "CSS", "SQL", "PHP"],
        answer: 1,
        explanation: "CSS mengatur warna, ukuran, jarak, dan tata letak website."
    },
    {
        question: "Apa fungsi utama JavaScript pada website?",
        options: [
            "Menyimpan listrik",
            "Mengganti sistem operasi",
            "Membuat halaman menjadi interaktif",
            "Menghapus browser"
        ],
        answer: 2,
        explanation: "JavaScript memungkinkan interaksi dan perubahan konten pada website."
    },
    {
        question: "Manakah contoh perangkat input?",
        options: ["Monitor", "Speaker", "Printer", "Keyboard"],
        answer: 3,
        explanation: "Keyboard digunakan untuk memasukkan data ke komputer."
    },
    {
        question: "Apa yang dimaksud dengan kecerdasan buatan?",
        options: [
            "Teknologi yang dapat melakukan tugas yang biasanya membutuhkan kecerdasan manusia",
            "Perangkat untuk mencetak dokumen",
            "Bahasa khusus untuk menggambar",
            "Jenis kabel komputer"
        ],
        answer: 0,
        explanation: "Kecerdasan buatan atau AI membantu komputer melakukan tugas seperti mengenali pola dan memahami bahasa."
    }
];

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let quizFinished = false;
let quizCount = loadData("studymate_quiz_count", 0);

function startQuiz() {
    const countInput = $("#quiz-question-count");
    const requestedCount = Number(countInput?.value) || questions.length;
    const count = Math.max(1, Math.min(requestedCount, questions.length));

    quizQuestions = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);

    currentQuestion = 0;
    score = 0;
    quizFinished = false;

    renderQuestion();
}

function renderQuestion() {
    const container = $("#quiz-container");
    if (!container) return;

    container.replaceChildren();

    if (currentQuestion >= quizQuestions.length) {
        finishQuiz(container);
        return;
    }

    const item = quizQuestions[currentQuestion];

    const heading = document.createElement("h3");
    heading.textContent =
        `Pertanyaan ${currentQuestion + 1} dari ${quizQuestions.length}`;

    const questionText = document.createElement("p");
    questionText.textContent = item.question;

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "quiz-options";

    item.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;

        button.addEventListener("click", () => {
            if (quizFinished) return;

            if (index === item.answer) {
                score++;
            }

            const explanation = document.createElement("p");
            explanation.textContent =
                (index === item.answer ? "Benar! " : "Belum tepat. ") +
                item.explanation;

            optionsContainer.querySelectorAll("button").forEach((choice) => {
                choice.disabled = true;

                if (choice.textContent === item.options[item.answer]) {
                    choice.classList.add("correct");
                }
            });

            if (index !== item.answer) {
                button.classList.add("incorrect");
            }

            const nextButton = document.createElement("button");
            nextButton.type = "button";
            nextButton.textContent =
                currentQuestion === quizQuestions.length - 1
                    ? "Lihat Hasil"
                    : "Pertanyaan Berikutnya";

            nextButton.addEventListener("click", () => {
                currentQuestion++;
                renderQuestion();
            });

            container.append(explanation, nextButton);
        });

        optionsContainer.appendChild(button);
    });

    container.append(heading, questionText, optionsContainer);
}

function finishQuiz(container) {
    quizFinished = true;

    const heading = document.createElement("h3");
    heading.textContent = "Kuis Selesai!";

    const result = document.createElement("p");
    result.textContent =
        `Skor kamu: ${score} dari ${quizQuestions.length}`;

    const restart = document.createElement("button");
    restart.type = "button";
    restart.textContent = "Ulangi Kuis";
    restart.addEventListener("click", startQuiz);

    container.append(heading, result, restart);

    quizCount++;
    saveData("studymate_quiz_count", quizCount);
    updateDashboard();

    const scoreDisplay = $("#quiz-score");
    if (scoreDisplay) {
        scoreDisplay.textContent =
            `${score}/${quizQuestions.length}`;
    }
}

$("#start-quiz")?.addEventListener("click", startQuiz);

// ==========================================
// 5. FITUR FLASHCARD
// ==========================================

const flashcards = [
    {
        term: "HTML",
        definition: "Bahasa markup untuk menyusun struktur halaman website."
    },
    {
        term: "CSS",
        definition: "Bahasa stylesheet untuk mengatur tampilan dan tata letak website."
    },
    {
        term: "JavaScript",
        definition: "Bahasa pemrograman untuk membuat website interaktif."
    },
    {
        term: "Artificial Intelligence",
        definition: "Teknologi yang memungkinkan komputer melakukan tugas yang biasanya membutuhkan kecerdasan manusia."
    },
    {
        term: "Algoritma",
        definition: "Urutan langkah logis untuk menyelesaikan suatu masalah."
    }
];

let currentCard = 0;
let showingDefinition = false;

function renderFlashcard() {
    const card = flashcards[currentCard];
    const label = $("#flashcard-label");
    const text = $("#flashcard-text");
    const count = $("#flashcard-count");

    if (label) {
        label.textContent = showingDefinition ? "Jawaban" : "Istilah";
    }

    if (text) {
        text.textContent = showingDefinition
            ? card.definition
            : card.term;
    }

    if (count) {
        count.textContent =
            `${currentCard + 1} / ${flashcards.length}`;
    }
}

$("#flashcard")?.addEventListener("click", () => {
    showingDefinition = !showingDefinition;
    renderFlashcard();
});

$("#next-card")?.addEventListener("click", () => {
    currentCard = (currentCard + 1) % flashcards.length;
    showingDefinition = false;
    renderFlashcard();
});

$("#previous-card")?.addEventListener("click", () => {
    currentCard =
        (currentCard - 1 + flashcards.length) % flashcards.length;
    showingDefinition = false;
    renderFlashcard();
});


 // ==========================================
 // 6. STUDYMATE AI MENGGUNAKAN API
 // ==========================================

/**
 * Menambahkan pesan ke area percakapan.
 * Sender "user" untuk pengguna, "bot" untuk AI.
 */
function addChatMessage(message, sender) {
    const container = $("#chat-messages");
    if (!container) return null;

    const bubble = document.createElement("div");

    bubble.classList.add("chat-message");

    if (sender === "user") {
        bubble.classList.add("user-message");
    } else {
        bubble.classList.add("assistant-message");
    }

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    bubble.appendChild(paragraph);
    container.appendChild(bubble);

    container.scrollTop = container.scrollHeight;

    return bubble;
}

/**
 * Mengirim pertanyaan ke backend.
 * Backend akan menghubungi API AI secara aman.
 */
async function sendMessageToAI(message) {
    const form = $("#chat-form");
    const input = $("#chat-input");
    const sendButton = form?.querySelector('button[type="submit"]');

    if (!message || !form || !input) return;

    // Cegah pengiriman berulang ketika AI masih menjawab.
    if (form.dataset.sending === "true") return;

    form.dataset.sending = "true";

    if (sendButton) {
        sendButton.disabled = true;
        sendButton.textContent = "Memproses...";
    }

    addChatMessage(message, "user");

    // Kosongkan input setelah pertanyaan dikirim.
    input.value = "";

    const loadingBubble = addChatMessage(
        "StudyMate sedang berpikir...",
        "bot"
    );

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        // Baca jawaban dari backend.
        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || `Permintaan gagal (${response.status}).`
            );
        }

        if (typeof data.reply !== "string" || !data.reply.trim()) {
            throw new Error("AI tidak memberikan jawaban yang valid.");
        }

        // Hapus indikator proses, lalu tampilkan jawaban AI.
        loadingBubble?.remove();
        addChatMessage(data.reply, "bot");

    } catch (error) {
        loadingBubble?.remove();

        addChatMessage(
            "Maaf, StudyMate belum bisa menjawab. Periksa apakah server berjalan dan pengaturan API sudah benar, lalu coba lagi.",
            "bot"
        );

        console.error("Kesalahan StudyMate API:", error.message);

    } finally {
        form.dataset.sending = "false";

        if (sendButton) {
            sendButton.disabled = false;
            sendButton.textContent = "Kirim";
        }

        input.focus();
    }
}

// Tangani pengiriman formulir chat.
const chatForm = $("#chat-form");

chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = $("#chat-input");
    const message = input?.value.trim();

    if (!message) return;

    sendMessageToAI(message);
});

// Tombol saran mengirim pertanyaan yang dipilih ke API.
$$(".suggestion-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
        const question = chip.dataset.question;

        if (!question) return;

        const form = $("#chat-form");
        const input = $("#chat-input");

        if (!form || !input) return;

        // Abaikan klik jika pertanyaan sebelumnya masih diproses.
        if (form.dataset.sending === "true") return;

        input.value = question;

        // Gunakan formulir yang sama agar pertanyaan masuk ke API.
        if (typeof form.requestSubmit === "function") {
            form.requestSubmit();
        } else {
            sendMessageToAI(question);
        }
    });
});



// ==========================================
// 7. DASHBOARD DAN STATISTIK
// ==========================================

function updateDashboard() {
    const totalNotes = $("#total-notes");
    const totalQuizzes = $("#total-quizzes");
    const totalMaterials = $("#total-materials");
    const progress = $("#learning-progress");

    if (totalNotes) {
        totalNotes.textContent = notes.length;
    }

    if (totalQuizzes) {
        totalQuizzes.textContent = quizCount;
    }

    if (totalMaterials) {
        totalMaterials.textContent = flashcards.length;
    }

    if (progress) {
        const completed = notes.length + quizCount;
        const percentage = Math.min(100, completed * 10);
        progress.textContent = percentage + "%";
    }
}

// ==========================================
// 8. INISIALISASI APLIKASI
// ==========================================

renderNotes();
renderFlashcard();
updateDashboard();

if ($(".page.active")) {
    // Biarkan halaman aktif yang sudah ditentukan oleh HTML.
} else if ($("#dashboard")) {
    showPage("dashboard");
}
