let display = document.getElementById('display');

const clickSound = new Audio('src/effects/click1.mp3');
const errSound = new Audio('src/effects/err.mp3');
const clrSound = new Audio('src/effects/clear.mp3');

let isMuted = false;

function toggleMute() {
    isMuted = !isMuted;

    const muteIcon = document.getElementById('mute-icon');
    if (isMuted) {
        muteIcon.classList.remove('fa-volume-up');
        muteIcon.classList.add('fa-volume-mute');
    } else {
        muteIcon.classList.remove('fa-volume-mute');
        muteIcon.classList.add('fa-volume-up');
    }
}

function playSound() {
    if (!isMuted) {
        clickSound.currentTime = 0;
        clickSound.play();
    }
}

function playClrSound() {
    if (!isMuted) {
        clrSound.currentTime = 0;
        clrSound.play();
    }
}

function playErrSound() {
    if (!isMuted) {
        errSound.currentTime = 0;
        errSound.play();
    }
}

function appendToDisplay(value) {
    const validCharacters = '0123456789+-*/.%()';
    if (display.value.length < 15 && validCharacters.includes(value)) {
        display.value += value;
        playSound();
    }
}

function clearDisplay() {
    display.value = '';
    playClrSound();
}

function dltChar() {
    display.value = display.value.slice(0, -1);
    playClrSound();
}

function calculate() {
    try {
        const result = eval(display.value);
        display.value = (result !== undefined) ? result : '';
        playSound();
    } catch {
        display.value = 'Error';
        playErrSound();
        setTimeout(clearDisplay, 2000);
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ('0123456789+-*/.%'.includes(key)) {
        appendToDisplay(key);
        playSound();
    } else if (key === 'Backspace') {
        dltChar();
        playClrSound();
    } else if (key === 'Enter') {
        calculate();
        playSound();
    } else if (key === 'Escape') {
        clearDisplay();
        playClrSound();
    }
});
