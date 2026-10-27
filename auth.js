
/* =========================================
   STUDYMATE - AUTENTIKASI SUPABASE
   File baru: auth.js
========================================= */

"use strict";

// GANTI dengan nilai dari Supabase project kamu.
const SUPABASE_URL = "https://fuftlfvhzqwjdziexsno.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_OxF77uQMvrNOBOIXEslDvw_gK3HUX5A";

const authClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Elemen popup
const authModal = document.getElementById("auth-modal");
const authTrigger = document.getElementById("account-trigger");
const authClose = document.getElementById("auth-close");
const authForm = document.getElementById("auth-form");
const authNameField = document.getElementById("auth-name-field");
const authName = document.getElementById("auth-name");
const authEmail = document.getElementById("auth-email");
const authPassword = document.getElementById("auth-password");
const authMessage = document.getElementById("auth-message");
const authSubmit = document.getElementById("auth-submit");
const authToggle = document.getElementById("auth-toggle");
const authSwitch = document.querySelector(".auth-switch");
const accountPanel = document.getElementById("account-panel");
const accountEmail = document.getElementById("account-email");
const authLogout = document.getElementById("auth-logout");

const accountName = document.getElementById("account-name");
const accountStatus = document.getElementById("account-status");
const accountAvatar = document.getElementById("account-avatar");

let isRegisterMode = false;
let currentUser = null;

function showAuthMessage(message, isSuccess = false) {
    authMessage.textContent = message;
    authMessage.classList.toggle("success", isSuccess);
}

function openAuthModal() {
    authModal.classList.add("is-open");
    authModal.setAttribute("aria-hidden", "false");
    showAuthMessage("");

    if (currentUser) {
        authForm.hidden = true;
        authSwitch.hidden = true;
        accountPanel.hidden = false;
        accountEmail.textContent = currentUser.email || "";
    } else {
        authForm.hidden = false;
        authSwitch.hidden = false;
        accountPanel.hidden = true;
        authEmail.focus();
    }
}

function closeAuthModal() {
    authModal.classList.remove("is-open");
    authModal.setAttribute("aria-hidden", "true");
}

function setRegisterMode(registerMode) {
    isRegisterMode = registerMode;

    authNameField.hidden = !isRegisterMode;
    authName.required = isRegisterMode;
    authPassword.autocomplete = isRegisterMode
        ? "new-password"
        : "current-password";

    document.getElementById("auth-title").textContent =
        isRegisterMode ? "Buat Akun StudyMate" : "Selamat datang!";

    document.getElementById("auth-description").textContent =
        isRegisterMode
            ? "Daftar untuk menyimpan aktivitas belajarmu."
            : "Masuk untuk melanjutkan kegiatan belajarmu.";

    authSubmit.textContent = isRegisterMode ? "Daftar" : "Masuk";
    authToggle.textContent = isRegisterMode
        ? "Masuk"
        : "Daftar";

    showAuthMessage("");
}

function updateAccountUI(user, displayName = "") {
    currentUser = user;

    if (!user) {
        accountName.textContent = "Pelajar";
        accountStatus.textContent = "Student Account · Klik untuk masuk";
        accountAvatar.textContent = "S";
        return;
    }

    const nameFromEmail = user.email
        ? user.email.split("@")[0]
        : "Pelajar";

    const name = displayName || nameFromEmail;

    accountName.textContent = name;
    accountStatus.textContent = user.email || "Akun aktif";
    accountAvatar.textContent = name.charAt(0).toUpperCase();
}

async function ensureProfile(user, preferredName = "") {
    if (!user) return;

    const fallbackName = user.email
        ? user.email.split("@")[0]
        : "Pelajar";

    const { error } = await authClient
        .from("profiles")
        .upsert(
            {
                id: user.id,
                display_name: preferredName.trim() || fallbackName
            },
            {
                onConflict: "id",
                ignoreDuplicates: true
            }
        );

    if (error) {
        console.error("Profil belum dapat disimpan:", error.message);
    }
}

async function loadProfileName(user) {
    const { data, error } = await authClient
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
        console.error("Profil belum dapat dibaca:", error.message);
        updateAccountUI(user);
        return;
    }

    updateAccountUI(user, data?.display_name || "");
}

// Klik Student Account
authTrigger.addEventListener("click", openAuthModal);

authTrigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openAuthModal();
    }
});

// Tutup popup
authClose.addEventListener("click", closeAuthModal);

authModal.addEventListener("click", (event) => {
    if (event.target === authModal) {
        closeAuthModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" &&
        authModal.classList.contains("is-open")) {
        closeAuthModal();
    }
});

// Beralih antara mode daftar dan masuk
authToggle.addEventListener("click", () => {
    setRegisterMode(!isRegisterMode);
});

// Proses daftar atau login
authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = authEmail.value.trim();
    const password = authPassword.value;

    if (
        SUPABASE_URL.includes("https://fuftlfvhzqwjdziexsno.supabase.co") ||
        SUPABASE_PUBLISHABLE_KEY.includes("sb_publishable_OxF77uQMvrNOBOIXEslDvw_gK3HUX5A")
    ) {
        showAuthMessage("Isi konfigurasi Supabase terlebih dahulu.");
        return;
    }

    authSubmit.disabled = true;
    authSubmit.textContent = "Memproses...";
    showAuthMessage("");

    try {
        if (isRegisterMode) {
            const displayName = authName.value.trim();

            const { data, error } = await authClient.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: displayName
                    }
                }
            });

            if (error) throw error;

            if (data.session && data.user) {
                await ensureProfile(data.user, displayName);
                await loadProfileName(data.user);
                openAuthModal();
                showAuthMessage("Akun berhasil dibuat!", true);
            } else {
                showAuthMessage(
                    "Pendaftaran diterima. Periksa email untuk konfirmasi, lalu masuk."
                    , true
                );
            }
        } else {
            const { data, error } = await authClient.auth
                .signInWithPassword({
                    email,
                    password
                });

            if (error) throw error;

            await ensureProfile(data.user);
            await loadProfileName(data.user);
            openAuthModal();
            showAuthMessage("Berhasil masuk ke StudyMate!", true);
        }
    } catch (error) {
        showAuthMessage(
            error.message || "Terjadi kesalahan. Coba lagi."
        );
    } finally {
        authSubmit.disabled = false;
        authSubmit.textContent = isRegisterMode ? "Daftar" : "Masuk";
    }
});

// Logout
authLogout.addEventListener("click", async () => {
    authLogout.disabled = true;

    const { error } = await authClient.auth.signOut();

    authLogout.disabled = false;

    if (error) {
        showAuthMessage("Gagal keluar: " + error.message);
        return;
    }

    updateAccountUI(null);
    authForm.reset();
    setRegisterMode(false);
    openAuthModal();
    showAuthMessage("Kamu sudah keluar dari akun.", true);
});


authClient.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null;

    if (!user) {
        updateAccountUI(null);
        return;
    }

    
    setTimeout(async () => {
        await ensureProfile(user);
        await loadProfileName(user);
    }, 0);
});

// Tampilkan keadaan akun awal
authClient.auth.getSession().then(({ data, error }) => {
    if (error) {
        console.error("Tidak dapat memeriksa sesi:", error.message);
        return;
    }

    if (data.session?.user) {
        loadProfileName(data.session.user);
    } else {
        updateAccountUI(null);
    }
});
