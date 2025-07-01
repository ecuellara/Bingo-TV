class BingoApp {
    constructor() {
        this.isRunning = false;
        this.drawnNumbers = new Set();
        this.intervalId = null;
        this.letters = ['B', 'I', 'N', 'G', 'O'];
        this.speech = null;
        this.audioContext = null;
        
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        this.btnStartStop = document.getElementById('btnStartStop');
        this.btnStartStop.addEventListener('click', () => this.toggleStartStop());
        
        this.setupAudio();
        this.setupSpeech();
        this.setupRemoteControl();
        
        // Focus inicial para navegación con control remoto
        document.querySelector('.letter-column').focus();
    }

    setupAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.error("AudioContext no soportado:", e);
        }
    }

    setupSpeech() {
        if (!window.webOS || !webOS.service) {
            console.warn("webOS service no disponible - Usando fallback");
            this.speech = {
                call: (params) => {
                    console.log("TTS Simulado:", params.text);
                    this.playBeep();
                }
            };
            return;
        }

        this.speech = webOS.service.request("luna://com.webos.service.tts", {
            method: "speak",
            onSuccess: () => {
                console.log("TTS inicializado");
                this.checkTTSSupport();
            },
            onFailure: (error) => {
                console.error("Error TTS:", error);
                this.speech = {
                    call: (params) => {
                        console.log("TTS Fallback:", params.text);
                        this.playBeep();
                    }
                };
            }
        });
    }

    checkTTSSupport() {
        webOS.service.request("luna://com.webos.service.tts", {
            method: "getStatus",
            onSuccess: (response) => {
                if (!response.available) {
                    console.warn("TTS no disponible");
                }
            }
        });
    }

    playBeep() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = "sine";
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.5;
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }

    setupRemoteControl() {
        document.addEventListener('keydown', (e) => {
            switch(e.keyCode) {
                case 13: // Enter
                    this.toggleStartStop();
                    break;
                case 27: // Exit
                    if (window.webOS) {
                        webOS.platformBack();
                    } else {
                        window.close();
                    }
                    break;
                case 37: // Left
                    this.navigateColumns(-1);
                    break;
                case 39: // Right
                    this.navigateColumns(1);
                    break;
            }
        });
    }

    navigateColumns(direction) {
        const columns = document.querySelectorAll('.letter-column');
        let current = document.activeElement;
        
        if (!current || !current.classList.contains('letter-column')) {
            columns[0].focus();
            return;
        }
        
        const index = Array.from(columns).indexOf(current);
        const newIndex = (index + direction + columns.length) % columns.length;
        columns[newIndex].focus();
    }

    toggleStartStop() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }

    start() {
        // Resetear el juego si ya está completo
        if (this.drawnNumbers.size >= 75) {
            this.resetGame();
        }
        
        this.isRunning = true;
        this.btnStartStop.textContent = "DETENER";
        this.btnStartStop.classList.add('running');
        this.intervalId = setInterval(() => this.generateNumber(), 7000);
        this.generateNumber(); // Primer número inmediato
    }

    pause() {
        this.isRunning = false;
        this.btnStartStop.textContent = "INICIAR";
        this.btnStartStop.classList.remove('running');
        clearInterval(this.intervalId);
    }

    resetGame() {
        // Limpiar números dibujados
        this.drawnNumbers.clear();
        
        // Limpiar estrellas de columnas completas
        this.letters.forEach(letter => {
            const header = document.querySelector(`#${letter} .letter-header`);
            header.textContent = header.textContent.replace(' ★', '');
        });
        
        // Limpiar números mostrados
        this.letters.forEach(letter => {
            const numbersContainer = document.getElementById(`numbers-${letter}`);
            numbersContainer.innerHTML = '';
        });
    }

    generateNumber() {
        if (this.drawnNumbers.size >= 75) {
            this.pause();
            this.showBingoComplete();
            return;
        }
        
        let num;
        do {
            num = Math.floor(Math.random() * 75) + 1;
        } while (this.drawnNumbers.has(num));
        
        this.drawnNumbers.add(num);
        this.speakNumber(num);
        this.updateNumberDisplay(num);
        this.checkCompletedColumns(); // Verificar columnas completas
    }

    checkCompletedColumns() {
        this.letters.forEach(letter => {
            const columnNumbers = Array.from(this.drawnNumbers).filter(num => 
                this.getLetterForNumber(num) === letter
            ).length;

            const header = document.querySelector(`#${letter} .letter-header`);
            
            // Eliminar estrella si existe
            header.textContent = header.textContent.replace(' ★', '');
            
            // Marcar columna si tiene 15 números
            if (columnNumbers >= 15) {
                header.textContent = `${header.textContent} ★`;
                
                // Anunciar columna completa solo cuando llega exactamente a 15
                if (columnNumbers === 15) {
                    this.speech.call({
                        text: `¡Columna ${letter} completa!`,
                        clear: true
                    });
                }
            }
        });
    }

    speakNumber(number) {
        const letter = this.getLetterForNumber(number);
        const text = `${letter}-${number}`;
        
        if (this.speech && typeof this.speech.call === 'function') {
            try {
                this.speech.call({
                    text: text,
                    clear: true
                });
            } catch (e) {
                console.warn("Error al hablar:", e);
                this.playBeep();
            }
        } else {
            this.playBeep();
        }
    }

    getLetterForNumber(number) {
        if (number <= 15) return 'B';
        if (number <= 30) return 'I';
        if (number <= 45) return 'N';
        if (number <= 60) return 'G';
        return 'O';
    }

    updateNumberDisplay(number) {
        // Quitar la clase 'latest' anterior
        document.querySelectorAll('.number.latest').forEach(el => {
            el.classList.remove('latest');
        });
    
        const letter = this.getLetterForNumber(number);
        const numbersContainer = document.getElementById(`numbers-${letter}`);
    
        const numbers = Array.from(this.drawnNumbers)
            .filter(n => this.getLetterForNumber(n) === letter)
            .sort((a, b) => a - b);
    
        numbersContainer.innerHTML = numbers.map(n =>
            `<div class="number${n === number ? ' latest' : ''}" tabindex="0">${n}</div>`
        ).join('');
    
        // Efecto visual
        numbersContainer.classList.add('animate');
        setTimeout(() => numbersContainer.classList.remove('animate'), 500);
    }

    showBingoComplete() {
        this.speech.call({
            text: "¡Bingo completo! Todas las bolillas cantadas",
            clear: true
        });
    }
}

// Iniciar la aplicación
const app = new BingoApp();