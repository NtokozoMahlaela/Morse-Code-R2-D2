document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const r2icon = document.querySelector('.r2d2-icon');
    
    // Morse code dictionary
    const morseCode = {
        'A': '·−',    'B': '−···',   'C': '−·−·',   'D': '−··',
        'E': '·',      'F': '··−·',   'G': '−−·',    'H': '····',
        'I': '··',     'J': '·−−−',   'K': '−·−',    'L': '·−··',
        'M': '−−',     'N': '−·',     'O': '−−−',    'P': '·−−·',
        'Q': '−−·−',   'R': '·−·',    'S': '···',    'T': '−',
        'U': '··−',    'V': '···−',   'W': '·−−',    'X': '−··−',
        'Y': '−·−−',   'Z': '−−··',
        '0': '−−−−−',  '1': '·−−−−',  '2': '··−−−',  '3': '···−−',
        '4': '····−',  '5': '·····',  '6': '−····',  '7': '−−···',
        '8': '−−−··',  '9': '−−−−·',
        '.': '·−·−·−', ',': '−−··−−', '?': '··−−··', "'": '·−−−−·',
        '!': '−·−·−−', '/': '−··−·',  '(': '−·−−·',  ')': '−·−−·−',
        '&': '·−···',  ':': '−−−···', ';': '−·−·−·', '=': '−···−',
        '+': '·−·−·',  '-': '−····−', '_': '··−−·−', '"': '·−··−·',
        '$': '···−··−','@': '·−−·−·', ' ': '/'
    };
    
    // Reverse the morseCode object for decoding
    const reverseMorse = {};
    for (const key in morseCode) {
        reverseMorse[morseCode[key]] = key;
    }
    
    // Audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Encode text to Morse code
    function encodeToMorse(text) {
        return text.toUpperCase().split('').map(char => {
            return morseCode[char] || char;
        }).join(' ');
    }
    
    // Decode Morse code to text
    function decodeFromMorse(morse) {
        return morse.split(' ').map(code => {
            return reverseMorse[code] || code;
        }).join('');
    }
    
    // Play beep sound
    function playBeep(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.3;
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.exponentialRampToValueAtTime(
            0.001, 
            audioContext.currentTime + duration + 0.1
        );
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Play Morse code sequence
    function playMorseSequence(morse) {
        audioContext.resume(); // Required for Chrome autoplay policy
        const sequence = morse.split('');
        let time = audioContext.currentTime;
        
        sequence.forEach(symbol => {
            if (symbol === '·') {
                scheduleBeep(time, 800, 0.1);
                time += 0.2;
            } else if (symbol === '−') {
                scheduleBeep(time, 400, 0.3);
                time += 0.4;
            } else if (symbol === ' ') {
                time += 0.2;
            } else if (symbol === '/') {
                time += 0.6;
            }
        });
    }
    

    
    
    // Event listeners
    encodeBtn.addEventListener('click', function() {
        const text = inputText.value.trim();
        if (!text) return;
        
        const morse = encodeToMorse(text);
        outputText.value = morse;
        playMorseSequence(morse);
        setTimeout(() => playBeep(1000, 0.1), 500);
    });
    
    decodeBtn.addEventListener('click', function() {
        const morse = inputText.value.trim();
        if (!morse) return;
        
        const text = decodeFromMorse(morse);
        outputText.value = text;
        setTimeout(() => {
            playBeep(800, 0.1);
            setTimeout(() => playBeep(600, 0.1), 200);
        }, 200);
    });
    
    // R2-D2 icon click
    r2icon.addEventListener('click', function() {
        playBeep(800, 0.1);
        setTimeout(() => playBeep(1000, 0.1), 150);
        setTimeout(() => playBeep(600, 0.3), 300);
        setTimeout(() => playBeep(1200, 0.1), 600);
    });
    
    // Typing sounds
    inputText.addEventListener('keydown', function(e) {
        if (e.key.length === 1 || e.key === 'Backspace' || e.key === ' ') {
            const freq = 500 + Math.random() * 600;
            playBeep(freq, 0.05);
        }
    });
    
    // Random beeps
    setInterval(randomR2Beep, 3000);
});