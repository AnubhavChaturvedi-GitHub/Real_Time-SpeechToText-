const outputText = document.getElementById('output');
const startBtn = document.getElementById('start');
const endBtn = document.getElementById('end');

const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

recognition.lang = 'en-US';
recognition.continuous = true; // Set continuous to true for continuous listening
recognition.interimResults = true;

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    endBtn.style.display = 'block'; // Show end button
    recognition.start();
    outputText.textContent = '';
});

endBtn.addEventListener('click', () => {
    recognition.stop();
    startBtn.disabled = false;
    endBtn.style.display = 'none'; // Hide end button again
    outputText.textContent = '';
});

recognition.onresult = function(event) {
    const resultIndex = event.resultIndex;
    const transcript = event.results[resultIndex][0].transcript;
    outputText.textContent = `${transcript}`;
};

recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
};

recognition.onend = function() {
    startBtn.disabled = false;
    endBtn.style.display = 'none'; // Hide end button when recognition ends
    outputText.textContent = 'Click "Start" to begin.';
    recognition.start(); // Restart recognition when it ends
};
