let playerName = ""; // Variable global para almacenar el nombre del jugador
let failedAttempts = 0; // Contador de intentos fallidos
const maxFailedAttempts = 5; // Número máximo de intentos fallidos permitido

// Array de símbolos para las cartas
const cardSymbols = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼',
    '🐯', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧'
];

// Crear un nuevo tablero de cartas
const createDeck = () => {
    const deck = [...cardSymbols, ...cardSymbols];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
};

// Variables globales del juego
let deck = [];
let flippedCards = [];
let matchedCards = [];
let isBoardLocked = false;

// Función para manejar el clic en las cartas
const handleCardClick = (index) => {
    const card = document.getElementById(`card-${index}`);

    // Evita acciones en cartas ya volteadas o si el tablero está bloqueado
    if (!card || card.classList.contains('flipped') || isBoardLocked) {
        return;
    }

    card.classList.add('flipped'); // Voltea la carta
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;

        // Bloquea el tablero temporalmente mientras se verifica
        isBoardLocked = true;

        if (deck[card1] === deck[card2]) {
            matchedCards.push(card1, card2);
            Swal.fire({
                icon: 'success',
                title: '¡Correcto!',
                text: `¡Bien hecho, ${playerName}!`,
                timer: 1500,
                showConfirmButton: false
            });

            failedAttempts = 0; //Reinicia los intentos en caso de acertar

            // Desbloquea el tablero después de una coincidencia
            isBoardLocked = false;

            if (matchedCards.length === deck.length) {
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Felicidades!',
                        text: `¡Ganaste el juego, ${playerName}!`,
                        confirmButtonText: 'Reiniciar'
                    }).then(() => resetGame());
                    resetGame();
                }, 500);
            }
        } else {
            // Incrementa el contador de intentos fallidos
            failedAttempts++;

            setTimeout(() => {
                const card1Element = document.getElementById(`card-${card1}`);
                const card2Element = document.getElementById(`card-${card2}`);
                card1Element.classList.remove('flipped');
                card2Element.classList.remove('flipped');

                Swal.fire({
                    icon: 'error',
                    title: `¡Incorrecto, ${playerName}!`,
                    text: `Te quedan ${maxFailedAttempts - failedAttempts} intentos.`,
                    showConfirmButton: true
                });

                // Verifica si se alcanzó el límite de intentos fallidos
                if (failedAttempts >= maxFailedAttempts) {
                    Swal.fire({
                        icon: 'error',
                        title: '¡Perdiste!',
                        text: `Has alcanzado el límite de intentos, ${playerName}.`,
                        confirmButtonText: 'OK'
                    }).then(() => resetGame());
                }
            }, 1000);

            // Desbloquea el tablero después de verificar
            isBoardLocked = false;
        }

        flippedCards = []; // Reinicia las cartas volteadas
    }
};

// Función para crear el tablero de juego
const createGameBoard = () => {
    const gameBoard = document.querySelector('.gameBoard');
    gameBoard.innerHTML = ""; // Limpia el tablero previo si lo hay
    deck = createDeck();
    matchedCards = [];
    flippedCards = [];
    failedAttempts = 0; // Reinicia los intentos fallidos

    deck.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${index}`;

        const front = document.createElement('div');
        front.className = 'front'; // Parte visible inicialmente

        const back = document.createElement('div');
        back.className = 'back'; // Parte oculta con el símbolo
        back.innerHTML = symbol;

        card.appendChild(front);
        card.appendChild(back);

        // Asignar evento de clic a cada carta
        card.addEventListener('click', () => handleCardClick(index));

        gameBoard.appendChild(card);
    });
};

// Función para reiniciar todo el juego
const resetGame = () => {
    Swal.fire({
        icon: 'error',
        title: '¡Muchas Gracias por Jugar!',
        text: `Hasta luego, ${playerName}.`,
        confirmButtonText: 'OK'
    }).then(() => createGameBoard());
    // Oculta el tablero y muestra el formulario de ingreso de nombre
    document.querySelector(".gameBoard").style.display = "none";
    document.querySelector(".input").style.display = "block";
    // Limpia las variables globales
    playerName = "";
    deck = [];
    flippedCards = [];
    matchedCards = [];
    failedAttempts = 0;
};

// Inicializar el formulario para ingresar el nombre
document.getElementById("btnOk").addEventListener("click", function () {
    const nameInput = document.getElementById("nameInput").value;

    if (nameInput.trim() !== "") {
        playerName = nameInput.trim(); // Guarda el nombre en la variable global
        document.querySelector(".input").style.display = "none"; // Oculta el formulario
        document.querySelector(".gameBoard").style.display = "grid"; // Muestra el tablero
        createGameBoard(); // Inicia el tablero
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡ERROR!',
            text: "Por favor ingresa un nombre",
            confirmButtonText: 'OK'
        })
    }
});

// Oculta el tablero al inicio
document.querySelector(".gameBoard").style.display = "none";

