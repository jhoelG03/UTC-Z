let questions = [
    // Preguntas de Dragon Ball Z
    { question: "¿Quién es el creador de Dragon Ball Z?", answers: ["Akira Toriyama", "Masashi Kishimoto", "Eiichiro Oda", "Yoshihiro Togashi"], correctAnswer: 0 },
    { question: "¿Cómo se llama el hijo de Goku?", answers: ["Goten", "Gohan", "Trunks", "Krillin"], correctAnswer: 1 },
    { question: "¿Quién es el rival más fuerte de Goku?", answers: ["Vegeta", "Freezer", "Cell", "Majin Buu"], correctAnswer: 1 },
    { question: "¿En qué saga aparece el personaje Trunks?", answers: ["Saga de Freezer","Saga de los androides", "Saga de Majin Buu", "Saga de Cell"], correctAnswer: 1 },
    { question: "¿Cómo se llama el mejor amigo de Goku?", answers: ["Piccolo", "Vegeta","Krillin", "Yamcha"], correctAnswer: 2 },
    { question: "¿Quién destruye el planeta Vegeta?", answers: ["Freezer", "Cell", "Majin Buu", "Vegeta"], correctAnswer: 0 },
    { question: "¿Quién es el rival principal en la saga de los androides?", answers: ["Freezer", "Vegeta","Cell",  "Goku"], correctAnswer: 2 },
    { question: "¿En qué planeta nació Goku?", answers: ["Planeta Tierra", "Planeta Vegeta", "Planeta Namekusei", "Planeta Kaiohshin"], correctAnswer: 1 },
    { question: "¿Quién es el maestro de Goku?", answers: ["Maestro Roshi", "King Kai", "Piccolo", "Vegeta"], correctAnswer: 0 },
    { question: "¿Qué transformación alcanza Goku para derrotar a Freezer?", answers: ["Super Saiyan", "Kaioken", "Ultra Instinto", "Super Saiyan Blue"], correctAnswer: 0 },
    // Preguntas de Dragon Ball Super
    { question: "¿Cuál es el nuevo dios de la destrucción presentado en Dragon Ball Super?", answers: ["Bills", "Champa", "Quitela", "Sidra"], correctAnswer: 1 },
    { question: "¿Cómo se llama la forma de Goku que supera al Super Saiyan Blue?", answers: ["Ultra Instinto", "Super Saiyan Dios", "Super Saiyan Rosa", "Super Saiyan"], correctAnswer: 0 },
    { question: "¿Qué personaje se convierte en el primer Super Saiyan Dios en Dragon Ball Super?", answers: ["Goku", "Vegeta", "Gohan", "Broly"], correctAnswer: 0 },
    { question: "¿En qué torneo luchan Goku y sus amigos en Dragon Ball Super?", answers: ["Torneo de Poder", "Torneo del Universo", "Torneo de los Dioses", "Torneo Saiyan"], correctAnswer: 0 },
    { question: "¿Quién es el villano principal del Torneo de Poder?", answers: ["Jiren", "Hit", "Goku Black", "Zamasu Fusionado"], correctAnswer: 0 },
    { question: "¿Cómo se llama la técnica principal de Hit en Dragon Ball Super?", answers: ["Time-Skip", "Instant Transmission", "Final Flash", "time-Cage"], correctAnswer: 0 },
    { question: "¿Qué personaje de Dragon Ball Super posee la capacidad de congelar el tiempo?", answers: ["Hit", "Goku", "Vegeta", "Bills"], correctAnswer: 0 },
    { question: "¿Cuál es el nombre del rival de Goku que proviene del futuro en Dragon Ball Super?", answers: ["Trunks", "Gohan", "Pan", "Cabba"], correctAnswer: 3 },
    { question: "¿Qué transformación utiliza Vegeta en Dragon Ball Super para enfrentarse a poderosos enemigos?", answers: ["Super Saiyan Blue Evolution", "Super Saiyan Blue", "Ultra Instintot", "Super Saiyan Dios"], correctAnswer: 0 },
    { question: "¿Quién es el dios de la destrucción del Universo 7 en Dragon Ball Super?", answers: ["Bills", "Champa", "Vados", "Whis"], correctAnswer: 0 }
];

let currentQuestion = null; // Variable para almacenar la pregunta actual
let player1Position = 0;
let player2Position = 0;
let currentPlayer = 1;
// Cada jugador tiene 1 comodín disponible inicialmente
let player1WildcardUsed = false;
let player2WildcardUsed = false;

const totalQuestions = questions.length;

function getRandomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

function showQuestion() {
    // Se selecciona una pregunta y se guarda en currentQuestion
    currentQuestion = getRandomQuestion();
    document.getElementById("question-container").textContent = currentQuestion.question;

    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";

    // Crear botones de respuesta con atributo data-index para identificarlos
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("answer-btn");
        button.dataset.index = index;
        button.onclick = () => checkAnswer(index, currentQuestion.correctAnswer);
        answersContainer.appendChild(button);
    });

    // Si el jugador actual no ha usado el comodín, se muestra el botón para usarlo
    if ((currentPlayer === 1 && !player1WildcardUsed) || (currentPlayer === 2 && !player2WildcardUsed)) {
        const wildcardButton = document.createElement("button");
        wildcardButton.textContent = "Usar Comodín";
        wildcardButton.classList.add("wildcard-btn");
        wildcardButton.onclick = useWildcard;
        answersContainer.appendChild(wildcardButton);
    }

    highlightActivePlayer();
    actualizarIndicadorWildcard();
}

function checkAnswer(selectedIndex, correctAnswer) {
    if (selectedIndex === correctAnswer) {
        document.getElementById("message").textContent = "¡Correcto!";
        advancePlayer();
    } else {
        // Muestra el overlay de error a pantalla completa
        const overlay = document.getElementById("overlay");
        overlay.classList.add("show");
        // Espera 1.5 segundos, oculta el overlay y cambia de turno
        setTimeout(() => {
            overlay.classList.remove("show");
            switchPlayer();
        }, 1500);
    }
}

// Función para usar el comodín: elimina dos respuestas incorrectas
function useWildcard() {
    document.getElementById("message").textContent = "Comodín activado: se han eliminado 2 alternativas";
    if (currentPlayer === 1) {
        player1WildcardUsed = true;
    } else {
        player2WildcardUsed = true;
    }
    actualizarIndicadorWildcard();

    const answersContainer = document.getElementById("answers-container");
    // Selecciona todos los botones de respuesta (excluyendo el botón de comodín)
    const answerButtons = Array.from(answersContainer.querySelectorAll("button.answer-btn"));
    // Filtra los botones que no sean la respuesta correcta
    let wrongButtons = answerButtons.filter(btn => Number(btn.dataset.index) !== currentQuestion.correctAnswer);

    // Si hay al menos dos botones incorrectos, elimina dos de ellos aleatoriamente
    if (wrongButtons.length >= 2) {
        wrongButtons.sort(() => Math.random() - 0.5);
        wrongButtons.slice(0, 2).forEach(btn => btn.remove());
    } else {
        // Si por alguna razón hay menos de 2, elimina todos los incorrectos
        wrongButtons.forEach(btn => btn.remove());
    }

    // Elimina el botón de comodín para que no se use nuevamente en la misma pregunta
    const wildcardButton = answersContainer.querySelector("button.wildcard-btn");
    if (wildcardButton) wildcardButton.remove();
}

function advancePlayer() {
    if (currentPlayer === 1) {
        player1Position++;
        document.getElementById("player1-bar").style.width = (player1Position / 12) * 100 + "%";
        if (player1Position === 12) {
            document.getElementById("player1-message").textContent = "¡Jugador 1 ha ganado!";
            disableGame();
            return;
        }
    } else {
        player2Position++;
        document.getElementById("player2-bar").style.width = (player2Position / 12) * 100 + "%";
        if (player2Position === 12) {
            document.getElementById("player2-message").textContent = "¡Jugador 2 ha ganado!";
            disableGame();
            return;
        }
    }
    // Reinicia el mensaje y muestra la siguiente pregunta tras 1 segundo
    setTimeout(() => {
        document.getElementById("message").textContent = "";
        showQuestion();
    }, 1000);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    showQuestion();
}

function highlightActivePlayer() {
    document.getElementById("player1").classList.toggle("active", currentPlayer === 1);
    document.getElementById("player2").classList.toggle("active", currentPlayer === 2);
}

// Actualiza el indicador de comodín en el panel de cada jugador
function actualizarIndicadorWildcard() {
    document.getElementById("player1-wildcard").textContent = player1WildcardUsed ? "Comodín usado" : "Comodín disponible";
    document.getElementById("player2-wildcard").textContent = player2WildcardUsed ? "Comodín usado" : "Comodín disponible";
}

function disableGame() {
    document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);
    document.querySelectorAll(".wildcard-btn").forEach(btn => btn.disabled = true);
}

showQuestion();

// Controlador de musiquita

let audio = document.getElementById("background-music");

    function toggleMusic() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }