(function () {

/* ── State ─────────────────────────────────────── */
const TOTAL_SHOTS = 3;
let currentSlot   = 0;                    // 0-based
const photos      = new Array(TOTAL_SHOTS).fill(null);  // dataURL per slot
let stream        = null;

/* ── Mulai kamera ──────────────────────────────── */
const video       = document.getElementById('cameraFeed');
const placeholder = document.getElementById('viewPlaceholder');

async function startCamera() {
    try {
    stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
    });
    video.srcObject = stream;
    video.style.display = 'block';
    placeholder.style.display = 'none';
    } catch (err) {
    console.warn('Kamera tidak tersedia:', err);
    // Tetap tampilkan placeholder; user bisa upload manual
    video.style.display = 'none';
    placeholder.style.display = 'flex';
    }
}

startCamera();

/* ── Capture foto ──────────────────────────────── */
function capturePhoto() {
    if (currentSlot >= TOTAL_SHOTS) return;
    if (!stream) { alert('Kamera tidak aktif. Gunakan tombol Upload.'); return; }

    const canvas  = document.getElementById('captureCanvas');
    const ctx     = canvas.getContext('2d');
    canvas.width  = video.videoWidth  || 1280;
    canvas.height = video.videoHeight || 720;

    // Mirror (selfie mode)
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();

    const dataURL = canvas.toDataURL('image/jpeg', 0.92);
    saveToSlot(currentSlot, dataURL);
    triggerFlash();
}

/* ── Simpan foto ke slot ───────────────────────── */
function saveToSlot(idx, dataURL) {
    photos[idx] = dataURL;

    // Tampilkan di thumbnail
    const img = document.getElementById(`preview-img-${idx}`);
    const num = document.getElementById(`preview-num-${idx}`);
    img.src           = dataURL;
    img.hidden        = false;
    num.style.display = 'none';
    document.getElementById(`slot-${idx}`).classList.add('filled');
    document.getElementById(`slot-${idx}`).classList.remove('active');

    // Lanjut ke slot berikutnya
    currentSlot = idx + 1;
    updateUI();
}

/* ── Retake foto ───────────────────────────────── */
window.retakePhoto = function () {
    if (currentSlot === 0) return;

    // Kosongkan slot terakhir yang terisi
    const idx = currentSlot - 1;
    photos[idx] = null;

    const img = document.getElementById(`preview-img-${idx}`);
    const num = document.getElementById(`preview-num-${idx}`);
    img.hidden        = true;
    img.src           = '';
    num.style.display = '';
    document.getElementById(`slot-${idx}`).classList.remove('filled', 'active');

    currentSlot = idx;
    updateUI();
};

/* ── Upload dari file ──────────────────────────── */
window.triggerUpload = function () {
    document.getElementById('uploadInput').click();
};

document.getElementById('uploadInput').addEventListener('change', function () {
    const file = this.files[0];
    if (!file || currentSlot >= TOTAL_SHOTS) return;
    const reader = new FileReader();
    reader.onload = (e) => {
    saveToSlot(currentSlot, e.target.result);
    this.value = ''; // reset input biar bisa upload file sama lagi
    };
    reader.readAsDataURL(file);
});

/* ── Update UI (counter, active slot, tombol) ──── */
function updateUI() {
    // Badge counter
    const counter = document.getElementById('shotCounter');
    const shown   = Math.min(currentSlot + 1, TOTAL_SHOTS);
    counter.textContent = `${shown}/${TOTAL_SHOTS}`;

    // Slot aktif
    document.querySelectorAll('.preview-slot').forEach((s, i) => {
    s.classList.toggle('active', i === currentSlot && photos[i] === null);
    });

    // Semua terisi?
    const allDone = photos.every(p => p !== null);
    document.getElementById('btnUpload').hidden = allDone;
    document.getElementById('btnNext').hidden   = !allDone;
    document.getElementById('btnNext').disabled = !allDone;
    document.getElementById('btnNext').style.opacity = allDone ? '1' : '0.4';
    document.getElementById('btnCapture').disabled = allDone;
    document.getElementById('btnCapture').style.opacity = allDone ? '0.4' : '1';

    // Retake: disable jika belum ada foto
    document.getElementById('btnRetake').disabled = currentSlot === 0;
    document.getElementById('btnRetake').style.opacity = currentSlot === 0 ? '0.4' : '1';
}

updateUI(); // inisialisasi awal

/* ── Flash effect ──────────────────────────────── */
function triggerFlash() {
    const flash = document.getElementById('captureFlash');
    flash.classList.add('flash-active');
    setTimeout(() => flash.classList.remove('flash-active'), 300);
}

/* ── Next ──────────────────────────────────────── */
window.goNext = function () {
    const allDone = photos.every(p => p !== null);
    if (!allDone) {
        alert('Isi semua foto terlebih dahulu sebelum lanjut.');
        return;
    }
    // Simpan data ke sessionStorage untuk dibawa ke halaman berikutnya
    photos.forEach((p, i) => sessionStorage.setItem(`photo_${i}`, p));
    window.location.href = '/export';
};

/* ── Expose ke global ──────────────────────────── */
window.capturePhoto = capturePhoto;

})();
