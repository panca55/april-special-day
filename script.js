
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

const letters = Array.from(document.querySelectorAll(".letter")); // Ubah NodeList menjadi array

// Urutkan elemen berdasarkan id
letters.sort((a, b) => {
  const idA = parseInt(a.id, 10); // Ambil id sebagai angka
  const idB = parseInt(b.id, 10);
  return idB - idA ; // Urutkan secara ascending
});
letters.forEach((letter) => {
  lettersContainer.appendChild(letter);
});
const adjustEnvelopeHeight = () => {
  const letters = document.querySelectorAll(".letter");
  const envelope = document.querySelector(".envelope");

  let maxLetterHeight = 0;

  // Cari tinggi surat tertinggi
  letters.forEach((letter) => {
    const letterHeight = letter.offsetHeight;
    if (letterHeight > maxLetterHeight) {
      maxLetterHeight = letterHeight;
    }
  });

  // Atur tinggi amplop berdasarkan tinggi surat tertinggi
  envelope.style.height = `${maxLetterHeight + 50}px`; // Tambahkan padding 50px
};

const envelopeButton = document.querySelector(".link-envelope");

// Fungsi untuk memeriksa apakah semua surat telah dikeluarkan
const checkAllLettersRemoved = () => {
  const remainingLetters = Array.from(letters).filter(
    (letter) => letter.style.display !== "none"
  );

  if (remainingLetters.length === 0) {
    // Jika semua surat telah dikeluarkan, tampilkan tombol
    envelopeButton.classList.add("visible");
  }
};
const adjustEnvelopeSize = () => {
  const letters = document.querySelectorAll(".letter");
  const envelope = document.querySelector(".envelope");
  const flap = document.querySelector(".envelope-flap");

  let maxLetterHeight = 0;

  // Cari tinggi surat tertinggi
  letters.forEach((letter) => {
    const letterHeight = letter.offsetHeight;
    if (letterHeight > maxLetterHeight) {
      maxLetterHeight = letterHeight;
    }
  });

  // Atur tinggi amplop berdasarkan tinggi surat tertinggi
  envelope.style.height = `${maxLetterHeight + 50}px`; // Tambahkan padding 50px
  flap.style.height = `${(maxLetterHeight + 50) * 0.71}px`; // Flap tetap proporsional
};
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
  adjustEnvelopeHeight();
});
const shuffleArray = (array) => {
  for (let i = array.length; i > array.length; i--) {
    array[i]
  }
};

const shuffledThings = Array.from(letters);
shuffleArray(shuffledThings);

shuffledThings.forEach((letter) => {
  lettersContainer.appendChild(letter);
  const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
  letter.style.left = `${center}px`;

  function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  if (!isOverflown(letter)) {
    letter.classList.add("center");
  }

  let offsetX, offsetY;

  // Fungsi untuk memulai drag
  const startDrag = (e) => {
    const isTouch = e.type === "touchstart";
    const rect = letter.getBoundingClientRect();

    letter.style.position = "fixed";
    letter.style.left = `${rect.left}px`;
    letter.style.top = `${rect.top}px`;

    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;

    letter.style.zIndex = zIndexCounter++;
    const moveAt = (posX, posY) => {
      letter.style.left = `${posX - offsetX}px`;
      letter.style.top = `${posY - offsetY}px`;
    };

    const onMove = (moveEvent) => {
      const clientX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;
      moveAt(clientX, clientY);
    };

    const onEnd = () => {
      document.removeEventListener(isTouch ? "touchmove" : "mousemove", onMove);
      document.removeEventListener(isTouch ? "touchend" : "mouseup", onEnd);
    };

    document.addEventListener(isTouch ? "touchmove" : "mousemove", onMove);
    document.addEventListener(isTouch ? "touchend" : "mouseup", onEnd);
  };

  // Event listener untuk mouse dan touch
  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") startDrag(e);
  });

  letter.addEventListener("touchstart", (e) => {
    if (e.target.tagName !== "BUTTON") startDrag(e);
  });
});

// Event untuk membuka amplop
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});
// Panggil fungsi saat ukuran layar berubah
window.addEventListener("resize", adjustEnvelopeSize);

// Panggil fungsi saat halaman dimuat
window.addEventListener("DOMContentLoaded", adjustEnvelopeSize);
// Event untuk menutup surat
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) {
      letter.style.display = "none";
      checkAllLettersRemoved(); // Periksa apakah semua surat telah dikeluarkan
    }
  });
});
window.addEventListener("DOMContentLoaded", () => {
  envelopeButton.classList.remove("visible");
});

// Reposisi surat saat ukuran layar berubah
window.addEventListener("resize", adjustEnvelopeHeight);
window.addEventListener("DOMContentLoaded", adjustEnvelopeHeight);