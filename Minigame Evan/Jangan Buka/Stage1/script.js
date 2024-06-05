let playerHealth = 3;
let enemyHealth = 2;
let playerChoice = '';

// Fungsi untuk memilih serangan pemain
function selectChoice(choice) {
    playerChoice = choice;
    document.querySelector('.player-choice').textContent = getIcon(choice);
}

// Fungsi untuk memulai pertarungan
function startBattle() {
    if (!playerChoice) {
        updateAnnouncement('Pilihlah diantara kertas, batu, atau gunting!');
        return;
    }

    const choices = ['kertas', 'batu', 'gunting'];
    const enemyChoice = choices[Math.floor(Math.random() * choices.length)];
    let enemyIcon = getIcon(enemyChoice);
    document.querySelector('.enemy-choice').textContent = enemyIcon;

    setTimeout(() => {
        const hurtSound = document.getElementById('hurt-sound');
        let announcement = '';

        if (playerChoice === enemyChoice) {
            announcement = "Kembar!";
        } else if (
            (playerChoice === 'batu' && enemyChoice === 'gunting') ||
            (playerChoice === 'kertas' && enemyChoice === 'batu') ||
            (playerChoice === 'gunting' && enemyChoice === 'kertas')
        ) {
            enemyHealth--;
            animateHealthReduction('.enemy .health');
            animateBlink('.enemy-icon');
            hurtSound.play();
            announcement = 'Kamu menang!';
        } else {
            playerHealth--;
            animateHealthReduction('.player .health');
            animateBlink('.player-icon');
            hurtSound.play();
            announcement = 'Kamu kalah!';
        }

        updateAnnouncement(announcement);
        updateHealth();
        checkGameOver();
        playerChoice = '';
        document.querySelector('.player-choice').textContent = '';
        document.querySelector('.enemy-choice').textContent = '';
    }, 500); // Delay untuk simulasi pertarungan
}

// Fungsi untuk mendapatkan ikon dari pilihan serangan
function getIcon(choice) {
    switch (choice) {
        case 'kertas':
            return '📄';
        case 'batu':
            return '🗿';
        case 'gunting':
            return '✂️';
        default:
            return '';
    }
}

// Fungsi untuk memperbarui kesehatan pemain dan lawan
function updateHealth() {
    document.querySelector('.player .health').textContent = `❤️ x${playerHealth}`;
    document.querySelector('.enemy .health').textContent = `❤️ x${enemyHealth}`;
}

// Fungsi untuk animasi pengurangan kesehatan
function animateHealthReduction(selector) {
    const healthElement = document.querySelector(selector);
    healthElement.classList.add('hit');
    setTimeout(() => {
        healthElement.classList.remove('hit');
    }, 500);
}

// Fungsi untuk animasi berkedip
function animateBlink(selector) {
    const element = document.querySelector(selector);
    element.classList.add('blink');
    setTimeout(() => {
        element.classList.remove('blink');
    }, 600); // Durasi animasi blink adalah 0.6 detik
}

// Fungsi untuk memperbarui pengumuman
function updateAnnouncement(message) {
    document.querySelector('.header h1').textContent = message;
}

// Fungsi untuk memeriksa game over
function checkGameOver() {
    if (playerHealth <= 0) {
        window.location.href = '../Ending/ending.html?result=lose';
    } else if (enemyHealth <= 0) {
        window.location.href = '../transition/transition2.html';
    }
}

// Fungsi untuk mereset permainan
function resetGame() {
    playerHealth = 4;
    enemyHealth = 2;
    updateHealth();
    document.querySelector('.player-choice').textContent = '';
    document.querySelector('.enemy-choice').textContent = '';
    updateAnnouncement('Ayo bermain!');
}

// Memperbarui kesehatan pada awalnya
updateHealth();

// Memulai musik latar belakang
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = new Audio('../BG Music/BG_Stage1.mp3');
    bgMusic.loop = true;
    bgMusic.play();

   
// Menyiapkan teks tutorial dan kata lawan untuk ditampilkan secara animasi
const teks = [
    "Aauuu Ayo kita bermain 🐺",
    "Pilihlah diantara kertas, batu, atau gunting",
    "Kertas kuat melawan batu tapi lemah melawan gunting",
    "Batu kuat melawan gunting tapi lemah melawan kertas",
    "Gunting kuat melawan kertas tapi lemah melawan batu",
    "Pilihlah dengan bijak",
];

    const textContainer = document.getElementById('text-container');
    let teksIndex = 0;
    let charIndex = 0;

    // Fungsi untuk mengetik teks tutorial dan kata lawan secara animasi
    function ketikHuruf() {
        if (teksIndex < teks.length) {
            if (charIndex < teks[teksIndex].length) {
                textContainer.innerHTML = teks[teksIndex].substring(0, charIndex + 1) + '<span class="caret"></span>';
                charIndex++;
                setTimeout(ketikHuruf, 50); // Delay untuk animasi mengetik
            } else {
                charIndex = 0;
                teksIndex++;
                setTimeout(ketikHuruf, 2000); // Delay sebelum menampilkan teks berikutnya
            }
        }
    }

    // Memulai animasi mengetik
    ketikHuruf();
});