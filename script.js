// ========== 1. FUNGSI TOGGLE DETAIL PROYEK ==========
function toggleDetail(id) {
    let detail = document.getElementById(id);
    
    if (detail.style.display === "none" || detail.style.display === "") {
        detail.style.display = "block";
    } else {
        detail.style.display = "none";
    }
}

// ========== 2. FUNGSI VALIDASI FORM KONTAK ==========
function validasiForm(event) {
    // Mencegah form reload halaman
    event.preventDefault();

    // Ambil nilai dari form
    let nama = document.getElementById("nama").value.trim();
    let email = document.getElementById("email").value.trim();
    let pesan = document.getElementById("pesan").value.trim();

    // Ambil elemen pesan error & sukses
    let errorDiv = document.getElementById("error-message");
    let successDiv = document.getElementById("success-message");

    // Reset pesan sebelumnya (sembunyikan dulu)
    errorDiv.style.display = "none";
    successDiv.style.display = "none";
    errorDiv.innerHTML = "";
    successDiv.innerHTML = "";

    // Array untuk menampung error
    let errors = [];

    // ===== VALIDASI NAMA =====
    if (nama === "") {
        errors.push("❌ Nama harus diisi!");
    } else if (nama.length < 3) {
        errors.push("❌ Nama minimal 3 karakter!");
    }

    // ===== VALIDASI EMAIL =====
    if (email === "") {
        errors.push("❌ Email harus diisi!");
    } else if (!email.includes("@") || !email.includes(".")) {
        errors.push("❌ Email tidak valid! Contoh: nama@domain.com");
    } else {
        // Cek format email lebih detail (ada @ dan setidaknya satu titik setelah @)
        let atPos = email.indexOf("@");
        let dotPos = email.lastIndexOf(".");
        if (dotPos < atPos + 2 || dotPos === email.length - 1) {
            errors.push("❌ Email tidak valid! Pastikan format: nama@domain.com");
        }
    }

    // ===== VALIDASI PESAN =====
    if (pesan === "") {
        errors.push("❌ Pesan harus diisi!");
    } else if (pesan.length < 20) {
        errors.push(`❌ Pesan minimal 20 karakter! (Saat ini: ${pesan.length} karakter)`);
    }

    // ===== TAMPILKAN ERROR JIKA ADA =====
    if (errors.length > 0) {
        errorDiv.innerHTML = errors.join("<br>");
        errorDiv.style.display = "block";
        successDiv.style.display = "none";
        
        // Scroll ke pesan error
        errorDiv.scrollIntoView({ behavior: "smooth", block: "start" });
        return false;
    }

    // ===== JIKA SEMUA VALID, TAMPILKAN PESAN SUKSES =====
    successDiv.innerHTML = `✅ Pesan berhasil dikirim! Terima kasih, ${nama}. Saya akan segera merespon pesan Anda.`;
    successDiv.style.display = "block";
    errorDiv.style.display = "none";

    // Reset form setelah sukses
    document.getElementById("contact-form").reset();

    // (Opsional) Hapus pesan sukses setelah 5 detik
    setTimeout(() => {
        successDiv.style.display = "none";
    }, 5000);

    return true;
}

// ========== 3. (OPSIONAL) SIMPAN DATA KE LOCALSTORAGE ==========
// Menyimpan data form sementara saat pengguna mengetik
function saveToLocalStorage() {
    let nama = document.getElementById("nama")?.value || "";
    let email = document.getElementById("email")?.value || "";
    let pesan = document.getElementById("pesan")?.value || "";
    
    localStorage.setItem("kontak_nama", nama);
    localStorage.setItem("kontak_email", email);
    localStorage.setItem("kontak_pesan", pesan);
}

// Memuat data dari localStorage saat halaman dimuat
function loadFromLocalStorage() {
    let nama = localStorage.getItem("kontak_nama");
    let email = localStorage.getItem("kontak_email");
    let pesan = localStorage.getItem("kontak_pesan");
    
    if (nama) document.getElementById("nama").value = nama;
    if (email) document.getElementById("email").value = email;
    if (pesan) document.getElementById("pesan").value = pesan;
}

// Pasang event listener untuk menyimpan otomatis (opsional)
document.addEventListener("DOMContentLoaded", function() {
    // Load data dari localStorage
    loadFromLocalStorage();
    
    // Simpan data saat pengguna mengetik
    let namaInput = document.getElementById("nama");
    let emailInput = document.getElementById("email");
    let pesanInput = document.getElementById("pesan");
    
    if (namaInput) namaInput.addEventListener("input", saveToLocalStorage);
    if (emailInput) emailInput.addEventListener("input", saveToLocalStorage);
    if (pesanInput) pesanInput.addEventListener("input", saveToLocalStorage);
});