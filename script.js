let Preguntas = [
    { pregunta: "¿Quién es el creador de Dragon Ball Z?", respuestas: ["Akira Toriyama", "Masashi Kishimoto", "Eiichiro Oda", "Yoshihiro Togashi"], respuestaCorrecta: 0 },
    { pregunta: "¿Cómo se llama el hijo de Goku?", respuestas: ["Goten", "Gohan", "Trunks", "Krillin"], respuestaCorrecta: 1 },
    { pregunta: "¿Quién es el rival más fuerte de Goku?", respuestas: ["Vegeta", "Freezer", "Cell", "Majin Buu"], respuestaCorrecta: 0 },
    { pregunta: "¿En qué saga aparece el personaje Trunks?", respuestas: ["Saga de Freezer", "Saga de los androides", "Saga de Majin Buu", "Saga de Cell"], respuestaCorrecta: 1 },
    { pregunta: "¿Cómo se llama el mejor amigo de Goku?", respuestas: ["Piccolo", "Vegeta", "Krillin", "Yamcha"], respuestaCorrecta: 2 },
    { pregunta: "¿Quién destruye el planeta Vegeta?", respuestas: ["Freezer", "Cell", "Majin Buu", "Vegeta"], respuestaCorrecta: 0 },
    { pregunta: "¿Quién es el rival principal en la saga de los androides?", respuestas: ["Freezer", "Vegeta", "Cell", "Goku"], respuestaCorrecta: 2 },
    { pregunta: "¿En qué planeta nació Goku?", respuestas: ["Planeta Tierra", "Planeta Vegeta", "Planeta Namekusei", "Planeta Kaiohshin"], respuestaCorrecta: 1 },
    { pregunta: "¿Quién es el maestro de Goku?", respuestas: ["Maestro Roshi", "King Kai", "Piccolo", "Vegeta"], respuestaCorrecta: 0 },
    { pregunta: "¿Qué transformación alcanza Goku para derrotar a Freezer?", respuestas: ["Super Saiyan", "Kaioken", "Ultra Instinto", "Super Saiyan Blue"], respuestaCorrecta: 0 },
    { pregunta: "¿Cuál es el nuevo dios de la destrucción presentado en Dragon Ball Super?", respuestas: ["Bills", "Champa", "Quitela", "Sidra"], respuestaCorrecta: 0 },
    { pregunta: "¿Cómo se llama la forma de Goku que supera al Super Saiyan Blue?", respuestas: ["Ultra Instinto", "Super Saiyan Dios", "Super Saiyan Rosa", "Super Saiyan"], respuestaCorrecta: 0 },
    { pregunta: "¿Qué personaje se convierte en el primer Super Saiyan Dios en Dragon Ball Super?", respuestas: ["Goku", "Vegeta", "Gohan", "Broly"], respuestaCorrecta: 0 },
    { pregunta: "¿En qué torneo luchan Goku y sus amigos en Dragon Ball Super?", respuestas: ["Torneo de Poder", "Torneo del Universo", "Torneo de los Dioses", "Torneo Saiyan"], respuestaCorrecta: 0 },
    { pregunta: "¿Quién es el villano principal del Torneo de Poder?", respuestas: ["Jiren", "Hit", "Goku Black", "Zamasu Fusionado"], respuestaCorrecta: 0 },
    { pregunta: "¿Cómo se llama la técnica principal de Hit en Dragon Ball Super?", respuestas: ["Time-Skip", "Instant Transmission", "Final Flash", "time-Cage"], respuestaCorrecta: 0 },
    { pregunta: "¿Qué personaje de Dragon Ball Super posee la capacidad de congelar el tiempo?", respuestas: ["Hit", "Goku", "Vegeta", "Bills"], respuestaCorrecta: 0 },
    { pregunta: "¿Cuál es el nombre del rival de Goku que proviene del futuro en Dragon Ball Super?", respuestas: ["Trunks", "Goku Black", "Pan", "Cabba"], respuestaCorrecta: 1 },
    { pregunta: "¿Qué transformación utiliza Vegeta en Dragon Ball Super para enfrentarse a poderosos enemigos?", respuestas: ["Super Saiyan Blue Evolution", "Super Saiyan Blue", "Ultra Instinto", "Super Saiyan Dios"], respuestaCorrecta: 0 },
    { pregunta: "¿Quién es el dios de la destrucción del Universo 7 en Dragon Ball Super?", respuestas: ["Bills", "Champa", "Vados", "Whis"], respuestaCorrecta: 0 }
];

let preguntaEnCurso = null; 
let progresoJugador1 = 0;
let progresoJugador2 = 0;
let turnoJugador = 1;

let comodinUsadoJugador1 = false;
let comodinUsadoJugador2 = false;

const totalDePreguntas = Preguntas.length;

function obtenerPreguntaAleatoria() {
    return Preguntas[Math.floor(Math.random() * Preguntas.length)];
}

function mostrarPregunta() {
    preguntaEnCurso = obtenerPreguntaAleatoria();
    document.getElementById("preguntas").textContent = preguntaEnCurso.pregunta;

    const contenedorRespuestas = document.getElementById("Respuesta");
    contenedorRespuestas.innerHTML = "";

    preguntaEnCurso.respuestas.forEach((respuesta, indice) => {
        const boton = document.createElement("button");
        boton.textContent = respuesta;
        boton.classList.add("Respuesta-btn");
        boton.dataset.indice = indice;
        boton.onclick = () => verificarRespuesta(indice, preguntaEnCurso.respuestaCorrecta);
        contenedorRespuestas.appendChild(boton);
    });

    if ((turnoJugador === 1 && !comodinUsadoJugador1) || (turnoJugador === 2 && !comodinUsadoJugador2)) {
        const botonComodin = document.createElement("button");
        botonComodin.textContent = "Usar Comodín";
        botonComodin.classList.add("comodin-btn");
        botonComodin.onclick = usarComodin;
        contenedorRespuestas.appendChild(botonComodin);
    }

    resaltarJugadorActivo();
    actualizarIndicadorComodin();
}

function verificarRespuesta(indiceSeleccionado, respuestaCorrecta) {
    if (indiceSeleccionado === respuestaCorrecta) {
        document.getElementById("mensaje").textContent = "¡Correcto!";
        avanzarJugador();
    } else {
        const overlay = document.getElementById("overlay");
        overlay.classList.add("show");

        setTimeout(() => {
            overlay.classList.remove("show");
            cambiarTurno();
        }, 1500);
    }
}

function usarComodin() {
    document.getElementById("mensaje").textContent = "Comodín activado: se han eliminado 2 alternativas";
    if (turnoJugador === 1) {
        comodinUsadoJugador1 = true;
    } else {
        comodinUsadoJugador2 = true;
    }
    actualizarIndicadorComodin();

    const contenedorRespuestas = document.getElementById("Respuesta");
    const botonesRespuestas = Array.from(contenedorRespuestas.querySelectorAll("button.Respuesta-btn"));

    let respuestasIncorrectas = botonesRespuestas.filter(btn => Number(btn.dataset.indice) !== preguntaEnCurso.respuestaCorrecta);

    if (respuestasIncorrectas.length >= 2) {
        respuestasIncorrectas.sort(() => Math.random() - 0.5);
        respuestasIncorrectas.slice(0, 2).forEach(btn => btn.remove());
    } else {
        respuestasIncorrectas.forEach(btn => btn.remove());
    }

    const botonComodin = contenedorRespuestas.querySelector("button.comodin-btn");
    if (botonComodin) botonComodin.remove();
}

function avanzarJugador() {
    if (turnoJugador === 1) {
        progresoJugador1++;
        document.getElementById("jugador1-bar").style.width = (progresoJugador1 / 12) * 100 + "%";
        if (progresoJugador1 === 12) {
            document.getElementById("jugador1-mensaje").textContent = "¡Jugador 1 ha ganado!";
            deshabilitarJuego();
            return;
        }
    } else {
        progresoJugador2++;
        document.getElementById("jugador2-bar").style.width = (progresoJugador2 / 12) * 100 + "%";
        if (progresoJugador2 === 12) {
            document.getElementById("jugador2-mensaje").textContent = "¡Jugador 2 ha ganado!";
            deshabilitarJuego();
            return;
        }
    }

    setTimeout(() => {
        document.getElementById("mensaje").textContent = "";
        mostrarPregunta();
    }, 1000);
}

function cambiarTurno() {
    turnoJugador = turnoJugador === 1 ? 2 : 1;
    mostrarPregunta();
}

function resaltarJugadorActivo() {
    document.getElementById("jugador1").classList.toggle("activo", turnoJugador === 1);
    document.getElementById("jugador2").classList.toggle("activo", turnoJugador === 2);
}

function actualizarIndicadorComodin() {
    document.getElementById("jugador1-comodin").textContent = comodinUsadoJugador1 ? "Comodín usado" : "Comodín disponible";
    document.getElementById("jugador2-comodin").textContent = comodinUsadoJugador2 ? "Comodín usado" : "Comodín disponible";
}

function deshabilitarJuego() {
    document.querySelectorAll(".respuesta-btn").forEach(btn => btn.disabled = true);
    document.querySelectorAll(".comodin-btn").forEach(btn => btn.disabled = true);
}

mostrarPregunta();

let musica = document.getElementById("musicafondo");

function alternarMusica() {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
}
