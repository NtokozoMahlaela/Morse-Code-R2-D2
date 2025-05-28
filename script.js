// Morse Code Translator for R2-D2
// Rebel Alliance Communication Tool (JavaScript Edition)

class MorseTranslator {
  constructor() {
    // Morse code dictionary (letters, numbers, and common punctuation)
    this.morseDict = {
      // Letters
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 
      'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
      'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
      'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
      'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
      'Z': '--..',
      
      // Numbers
      '0': '-----', '1': '.----', '2': '..---', '3': '...--',
      '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.',
      
      // Punctuation and special characters
      '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.',
      '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
      '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
      '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.',
      '$': '...-..-', '@': '.--.-.', ' ': '/'
    };
    
    // Reverse dictionary for decoding
    this.reverseMorse = {};
    for (const key in this.morseDict) {
      this.reverseMorse[this.morseDict[key]] = key;
    }
  }
  
  lettersToMorseCode(text) {
    /**
     * Convert plain text to Morse code.
     * @param {string} text - Input string to be converted to Morse code
     * @returns {string} Morse code representation of input text
     */
    return text.toUpperCase().split('').map(char => {
      return this.morseDict[char] || '';
    }).join(' ');
  }
  
  morseCodeToLetters(code) {
    /**
     * Convert Morse code back to plain text.
     * @param {string} code - String containing Morse code to be decoded
     * @returns {string} Decoded plain text
     */
    return code.split(' / ').map(word => {
      return word.split(' ').map(symbol => {
        return this.reverseMorse[symbol] || '�';
      }).join('');
    }).join(' ');
  }
}

// Example usage for Node.js or browser
const translator = new MorseTranslator();

// Test cases from the mission brief
console.log("Encoding examples:");
console.log(translator.lettersToMorseCode("Help me Obi-Wan!"));  // Should match example
console.log(translator.lettersToMorseCode("Darth Vader is Luke's father"));
console.log(translator.lettersToMorseCode("Why so many dots?"));
console.log(translator.lettersToMorseCode("I like you"));

console.log("\nDecoding examples:");
console.log(translator.morseCodeToLetters(".... .- ...- . / -.-- --- ..- / ... . . -. / .-. --- -... --- -.. ..-.-"));
console.log(translator.morseCodeToLetters(".. / .- -- / .-. ..- -. -. .. -. --. / --- ..- - / --- ..-. / -.-. --- ..-. ..-. . .-.-.-"));

// Browser-specific code
if (typeof window !== 'undefined') {
  // Simple browser UI
  document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    
    encodeBtn.addEventListener('click', () => {
      outputText.value = translator.lettersToMorseCode(inputText.value);
    });
    
    decodeBtn.addEventListener('click', () => {
      outputText.value = translator.morseCodeToLetters(inputText.value);
    });
  });
}