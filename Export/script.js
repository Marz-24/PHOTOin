/* ═══════════════════════════════════════════════════════════
   GANTI seluruh blok IIFE di result-main.html dengan ini.
   Koordinat slot diukur langsung dari pixel data frame PNG.

   Semua frame: 600 × 1600 px, RGBA
   Slot (area transparan = tempat foto):
     Slot 1 : x=50, y=125, w=498, h=364
     Slot 2 : x=50, y=574, w=498, h=364
     Slot 3 : x=50, y=1023, w=498, h=364
═══════════════════════════════════════════════════════════ */
(function () {

  /* ══════════════════════════════════════════════════════
     KONFIGURASI — fixed, berlaku untuk semua frame preset
     karena semua PNG berukuran sama & slot identik.
  ══════════════════════════════════════════════════════ */
  const CANVAS_W = 600;
  const CANVAS_H = 1600;

  const SLOTS = [
    { x: 50, y: 125,  w: 498, h: 364 },  // foto 1
    { x: 50, y: 574,  w: 498, h: 364 },  // foto 2
    { x: 50, y: 1023, w: 498, h: 364 },  // foto 3
  ];

  /* Frame custom — slot dihitung otomatis proporsional */
  function calcCustomSlots(fw, fh) {
    const padX   = Math.round(fw * 0.083);           // ~50/600
    const slotW  = fw - padX * 2;                    // ~498
    const slotH  = Math.round(fh * 0.2275);          // ~364/1600
    const startY = Math.round(fh * 0.0781);          // ~125/1600
    const gapY   = Math.round(fh * 0.0281);          // gap antar slot
    return [0, 1, 2].map(i => ({
      x: padX,
      y: startY + i * (slotH + gapY),
      w: slotW,
      h: slotH,
    }));
  }

  /* ══════════════════════════════════════════════════════
     Ambil data dari sessionStorage
  ══════════════════════════════════════════════════════ */
  const frameType   = sessionStorage.getItem('selectedFrameType');
  const frameId     = sessionStorage.getItem('selectedFrameId');
  const customFrame = sessionStorage.getItem('customFrameData');
  const photos      = [0, 1, 2].map(i => sessionStorage.getItem(`photo_${i}`));

  let frameSrc = null;
  if (frameType === 'preset' && frameId) {
    frameSrc = `../Frame/FrameAssets/Frame${frameId}.png`;
  } else if (frameType === 'custom' && customFrame) {
    frameSrc = customFrame;
  }

  /* ══════════════════════════════════════════════════════
     Helper: load image → Promise<HTMLImageElement>
  ══════════════════════════════════════════════════════ */
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error(`Gagal memuat: ${src}`));
      img.src = src;
    });
  }

  /* ══════════════════════════════════════════════════════
     Helper: gambar foto ke slot dengan object-fit:cover
  ══════════════════════════════════════════════════════ */
  function drawCover(ctx, img, slot) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(slot.x, slot.y, slot.w, slot.h);
    ctx.clip();
    const scale = Math.max(slot.w / img.naturalWidth, slot.h / img.naturalHeight);
    const dw    = img.naturalWidth  * scale;
    const dh    = img.naturalHeight * scale;
    const dx    = slot.x + (slot.w - dw) / 2;
    const dy    = slot.y + (slot.h - dh) / 2;
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  /* ══════════════════════════════════════════════════════
     Render komposit ke canvas
  ══════════════════════════════════════════════════════ */
  async function renderComposite() {
    const canvas  = document.getElementById('resultCanvas');
    const ctx     = canvas.getContext('2d');
    const loading = document.querySelector('.result-loading');

    try {
      /* 1. Load frame + semua foto secara paralel */
      const [frameImg, ...photoImgs] = await Promise.all([
        frameSrc ? loadImage(frameSrc) : Promise.resolve(null),
        ...photos.map(p => p ? loadImage(p) : Promise.resolve(null)),
      ]);

      /* 2. Tentukan ukuran canvas & posisi slot */
      let cW, cH, slots;

      if (frameType === 'custom' && frameImg) {
        cW    = frameImg.naturalWidth;
        cH    = frameImg.naturalHeight;
        slots = calcCustomSlots(cW, cH);
      } else {
        cW    = CANVAS_W;
        cH    = CANVAS_H;
        slots = SLOTS;
      }

      /* 3. Set ukuran canvas */
      canvas.width  = cW;
      canvas.height = cH;

      /* 4. Background putih */
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cW, cH);

      /* 5. Gambar foto ke slot (di bawah frame) */
      photoImgs.forEach((img, i) => {
        if (img && slots[i]) drawCover(ctx, img, slots[i]);
      });

      /* 6. Gambar frame di atas foto
            (area slot di frame PNG = transparan → foto terlihat) */
      if (frameImg) {
        ctx.drawImage(frameImg, 0, 0, cW, cH);
      }

      /* 7. Tampilkan canvas, sembunyikan loading */
      loading.style.display = 'none';
      canvas.style.display  = 'block';

    } catch (err) {
      loading.innerHTML = `<span style="color:#9E2A2B;text-align:center">
        ⚠ Gagal memuat gambar.<br><small>${err.message}</small></span>`;
      console.error(err);
    }
  }

  renderComposite();

  /* ══════════════════════════════════════════════════════
     Download hasil sebagai PNG
  ══════════════════════════════════════════════════════ */
  window.downloadResults = function () {
    const canvas = document.getElementById('resultCanvas');
    if (!canvas || canvas.width === 0) return;
    const link    = document.createElement('a');
    link.download = `PHOTOin_${Date.now()}.png`;
    link.href     = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ══════════════════════════════════════════════════════
     Done — bersihkan session & kembali ke home
  ══════════════════════════════════════════════════════ */
  window.goHome = function () {
    ['selectedFrameType', 'selectedFrameId', 'customFrameData',
     'photo_0', 'photo_1', 'photo_2']
      .forEach(k => sessionStorage.removeItem(k));
    window.location.href = '../index.html';
  };

})();