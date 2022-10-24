const btnIniciar = document.querySelector("#btnIniciar");
const imgPiedra = document.querySelector("#piedra");
const imgPapel = document.querySelector("#papel");
const imgTijera = document.querySelector("#tijera");
const imgPlayer = document.querySelector("#imgPlayer")
const btnPiedra = document.querySelector("#btnPiedra");
const btnPapel = document.querySelector("#btnPapel");
const btnTijera = document.querySelector("#btnTijera");
const front = document.querySelector("#front");
const back = document.querySelector("#back");
const imgBack = document.querySelector("#imgRival");
const mensaje = document.querySelector(".mensaje");
const scoreItems = document.querySelectorAll(".score-item");
const images = ["assets/img/w-piedra.png", "assets/img/w-papel.png", "assets/img/w-tijera.png"];
const cartelFinal = document.querySelector("#cartelFinal");
const enlPuntajes = document.querySelector("#enlPuntajes");
const cartelPuntajes = document.querySelector("#cartelPuntajes");
const cartelBienvenida = document.querySelector("#bienvenida");
const bloqueo = document.querySelector(".bloquear");
const tablaScore = {
    nombre: "",
    bestof: 0,
    puntaje: 0,
    puntajeRival: 0,
    ganador: false
};
let puntaje = 0;
let puntajeRival = 0;
let alMejorDe;
let nombre;

// -------------- FUNCIONES --------------

const hide = (item) => item.className += " hidden";

const show = (item) => item = item.classList.remove("hidden");

const generarRival = () => Math.ceil(Math.random() * 10 / 4);

const bloquearBtn = () => {
    btnPiedra.setAttribute("disabled", "disabled");
    btnPapel.setAttribute("disabled", "disabled");
    btnTijera.setAttribute("disabled", "disabled");
    btnPiedra.className += " bloqueado";
    btnPapel.className += " bloqueado";
    btnTijera.className += " bloqueado";
}

const desbloquearBtn = () => {
    btnPiedra.removeAttribute("disabled");
    btnPapel.removeAttribute("disabled");
    btnTijera.removeAttribute("disabled");
    btnPiedra.classList.remove("bloqueado");
    btnPapel.classList.remove("bloqueado");
    btnTijera.classList.remove("bloqueado");
}

const guardarPuntuacion = () => {
    if(!nombre==""){
        tablaScore.nombre = nombre;
    }
    else{
        tablaScore.nombre = "Jugador";
    }
    tablaScore.bestof = alMejorDe;
    tablaScore.puntaje = puntaje;
    tablaScore.puntajeRival = puntajeRival;
    if (puntaje > puntajeRival) {
        tablaScore.ganador = true;
    }
    else {
        tablaScore.ganador = false;
    }
    localStorage.setItem(localStorage.length, JSON.stringify(tablaScore));
}

const mostrarPuntajes = (cartel) => {
    for (let i = localStorage.length - 1; i >= 0; i -= 1) {
        const obj = JSON.parse(localStorage.getItem(i));
        cartelPuntajes.innerHTML += `
        <div class="${obj.ganador ? "blue" : "red"}">
        <p>${obj.nombre}: ${obj.puntaje}</p>
        <p>Rival: ${obj.puntajeRival}</p>
        <p>Al mejor de: ${obj.bestof}</p>
        </div>`;
    }
    cartelPuntajes.innerHTML +=`<button id="btnBorrarPartidas">Borrar Partidas Guardadas</button>`
    const btnBorrarPartidas = document.querySelector("#btnBorrarPartidas");
    let btnPuntajes = document.querySelector("#btnPuntajes");
    btnPuntajes.onclick = () =>{
        hide(cartelPuntajes)
        if(cartel==1){
            show(cartelBienvenida);
        }
        else if(cartel==2){
            show(cartelFinal);
        }
        else{
            hide(bloqueo);
        }
        enlPuntajes.classList.remove("disabled");
        cartelPuntajes.innerHTML=`
        <h2>Partidas Recientes</h2>
        <button id="btnPuntajes"><span></span><span></span></button>`;
    }
    btnBorrarPartidas.onclick = () =>{
        localStorage.clear();
        cartelPuntajes.innerHTML=`
        <h2>Partidas Recientes</h2>
        <button id="btnPuntajes"><span></span><span></span></button>`;
        mostrarPuntajes(cartel);
    }
}

const volverAJugar = () => {
    puntaje = 0;
    puntajeRival = 0;
    for (item of scoreItems) {
        item.classList.remove("red");
        item.classList.remove("blue");
        hide(item);
    }
    hide(cartelFinal);
    show(cartelBienvenida);
    mensaje.textContent = "";
    desbloquearBtn();
    document.querySelector("#puntaje").textContent = puntaje;
    document.querySelector("#puntajeRival").textContent = puntajeRival;
    front.className = "front";
    back.className = "back";
    imgPlayer.src = "";
}

const finPartida = () => {
    cartelFinal.innerHTML = `
    <h2>Resultado Final</h2>
    <p>${puntaje > puntajeRival ? "¡Ganaste!" : "Perdiste :("}</p>
    <div>
    <p>${nombre=="" ? "Jugador" : nombre}: ${puntaje}</p>
    <p>Rival: ${puntajeRival}</p>
    <p>Al mejor de: ${alMejorDe}</p>
    </div>
    <button id="volverAJugar">Volver a Jugar</button>`;
    show(cartelFinal);
    show(bloqueo);
    const btnVolverAJugar = document.querySelector("#volverAJugar");
    guardarPuntuacion();
    btnVolverAJugar.onclick = () => volverAJugar();
}

const limpiar = () => {
    mensaje.textContent = "";
    document.querySelector(".timer").textContent = "";
    imgPlayer.src = "";
    front.className = "front";
    back.className = "back";
    desbloquearBtn();
}

const jugar = (opcion) => {
    let opcionRival = generarRival();
    imgBack.src = images[opcionRival - 1];
    if (opcion == opcionRival) {
        mensaje.textContent = "Empate.";
    }
    if (opcion == 1 && opcionRival == 3 || opcion == 2 && opcionRival == 1 || opcion == 3 && opcionRival == 2) {
        mensaje.textContent = "Ronda Ganada. "
        scoreItems[puntaje + puntajeRival].className += " blue";
        puntaje += 1;
        document.querySelector("#puntaje").textContent = puntaje;
    }
    if (opcion == 1 && opcionRival == 2 || opcion == 2 && opcionRival == 3 || opcion == 3 && opcionRival == 1) {
        mensaje.textContent = "Ronda Perdida.";
        scoreItems[puntaje + puntajeRival].className += " red";
        puntajeRival += 1;
        document.querySelector("#puntajeRival").textContent = puntajeRival;
    }
    if (puntaje != (Math.ceil(alMejorDe / 2)) && puntajeRival != (Math.ceil(alMejorDe / 2))) {
        mensaje.textContent += " Proxima ronda en"
        let i = 3;
        const timer = setInterval(() => {
            if (i == 0) {
                clearInterval(timer);
            }
            document.querySelector(".timer").textContent = i;
            i -= 1;
        }, 700)
        setTimeout(limpiar, 3000)
    }
    else {
        finPartida();
    }
}

// -------------- EVENTOS --------------

btnIniciar.onclick = (evt) => {
    evt.preventDefault();
    hide(cartelBienvenida);
    hide(bloqueo);
    alMejorDe = Number(document.querySelector("input[Name='bestof']:checked").value);
    nombre = document.querySelector("input[name='nombre'").value;
    for (let i = 0; i < alMejorDe; i += 1) {
        show(scoreItems[i]);
    }
}

btnPiedra.onclick = () => {
    imgPlayer.src = imgPiedra.src;
    bloquearBtn();
    jugar(1)
    front.className = "darVueltaFront";
    back.className = "darVueltaBack";
}

btnPapel.onclick = () => {
    imgPlayer.src = imgPapel.src;
    bloquearBtn();
    jugar(2)
    front.className = "darVueltaFront";
    back.className = "darVueltaBack";
}

btnTijera.onclick = () => {
    imgPlayer.src = imgTijera.src;
    bloquearBtn();
    jugar(3);
    front.className = "darVueltaFront";
    back.className = "darVueltaBack";
}

enlPuntajes.onclick = (evt) => {
    evt.preventDefault();
    enlPuntajes.className = "disabled";
    let cartel=0;
    if(!cartelBienvenida.className.includes("hidden")){
        hide(cartelBienvenida);
        show(cartelPuntajes);
        cartel=1;
    }
    else if(!cartelFinal.className.includes("hidden")){
        hide(cartelFinal);
        show(cartelPuntajes);
        cartel=2;
    }
    else{
        show(bloqueo);
        show(cartelPuntajes);
    }
    mostrarPuntajes(cartel);
}
