/* ── State ───────────────────────────────────── */
let selectedFrame   = null;   // nomor frame preset (1/2/3) atau null
let uploadedFile    = null;   // File object dari user upload

/* ── Pilih frame preset ──────────────────────── */
function selectFrame(card) {
    // Batalkan pilihan upload jika ada
    uploadedFile = null;
    document.getElementById('uploadCard').classList.remove('selected');
    document.getElementById('frameUploadInput').value = '';

    // Toggle card yang diklik
    const wasSelected = card.classList.contains('selected');
    document.querySelectorAll('.frame-card:not(.upload-card)')
            .forEach(c => c.classList.remove('selected'));

    if (!wasSelected) {
    card.classList.add('selected');
    selectedFrame = card.dataset.frame;
    } else {
    selectedFrame = null;
    }
}

/* ── Upload frame custom ─────────────────────── */
function triggerUpload() {
    document.getElementById('frameUploadInput').click();
}

document.getElementById('frameUploadInput').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    // Batalkan pilihan preset
    selectedFrame = null;
    document.querySelectorAll('.frame-card:not(.upload-card)')
            .forEach(c => c.classList.remove('selected'));

    uploadedFile = file;
    document.getElementById('uploadCard').classList.add('selected');

    // Preview gambar yang diupload
    const reader = new FileReader();
    reader.onload = (e) => {
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = `<img src="${e.target.result}" alt="Custom Frame"
                                style="width:100%;height:100%;object-fit:contain;border-radius:10px;" />`;
    };
    reader.readAsDataURL(file);
});

function downloadTemplates() {
    const path = 'FrameAssets/Frame Template.png';
    const a = document.createElement('a');
    a.href = path;
    a.download = path.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/* ── Next ────────────────────────────────────── */
function goNext() {
    if (!selectedFrame && !uploadedFile) {
    alert('Pilih frame terlebih dahulu!');
    return;
    }

    if (uploadedFile) {
    // Simpan ke sessionStorage sebagai dataURL lalu lanjut
    const reader = new FileReader();
    reader.onload = (e) => {
        sessionStorage.setItem('selectedFrameType', 'custom');
        sessionStorage.setItem('customFrameData', e.target.result);
        window.location.href = '../Studio/index.html'; // ganti sesuai halaman berikutnya
    };
    reader.readAsDataURL(uploadedFile);
    } else {
    sessionStorage.setItem('selectedFrameType', 'preset');
    sessionStorage.setItem('selectedFrameId', selectedFrame);
    window.location.href = '../Studio/index.html'; // ganti sesuai halaman berikutnya
    }
}
