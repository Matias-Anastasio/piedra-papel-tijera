let opcion, meta, opcionRival, puntaje=0, puntajeRival=0, nombre;
const seleccion = ["piedra", "papel", "tijera"], tablaScore=[];

function score(name="player",bo,puntaje,puntajeRival){
    this.nombre = name,
    this.bestof = bo,
    this.puntaje = puntaje,
    this.puntajeRival = puntajeRival
}

const verPuntuaciones = () =>{
    tablaScore.forEach(i => {
        alert(`Partida al mejor de ${i.bestof}\n${i.nombre}: ${i.puntaje}\nRival: ${i.puntajeRival}`);
    });
}

const guardarPuntuacion = () =>{
    nombre = prompt("Ingrese su nombre")
    tablaScore.push(new score(nombre,meta,puntaje,puntajeRival));
}

const resultadoFinal = () =>{
    if(puntaje>puntajeRival){
        alert(`¡Felicitaciones Ganaste!\nResultado Final:\nTú: ${puntaje}\nRival: ${puntajeRival}`);
    }else{
        alert(`Perdiste :( \nResultado Final:\nTú: ${puntaje}\nRival: ${puntajeRival}`);
    }
    if(confirm("¿Desea guardar su puntaje?")){
        guardarPuntuacion();
    }
    if(confirm("¿Desea ver las puntuaciones guardadas?")){
        verPuntuaciones();
    }
    if(confirm("¿Jugar de nuevo?")){
        seleccionarMeta();
    }
}

const generarRival = () =>{
    return Math.ceil(Math.random()*10/4);
}

const jugar = () =>{
    opcionRival= generarRival();
    if(opcion == opcionRival){
        alert("Empate, ambos eligieron lo mismo.")
    }
    if(opcion==1 && opcionRival==3 || opcion==2 && opcionRival==1 || opcion==3 && opcionRival==2){
        alert("Ganaste, el rival eligió "+seleccion[opcionRival-1]);
        puntaje+=1;
    }
    if(opcion==1 && opcionRival==2 || opcion==2 && opcionRival==3 || opcion==3 && opcionRival==1){
        alert("Perdiste, el rival eligió "+seleccion[opcionRival-1]);
        puntajeRival+=1;
    }
}

const elegir = () =>{
    opcion=Number(prompt("¿Qué elige?\n1: Piedra\n2: Papel\n3: Tijera"));
    if(opcion!=1 && opcion!=2 && opcion!=3){
        alert("Opcion Incorrecta");
        elegir();
    }
}

const jugarMientras = () =>{
    while(puntaje!=(Math.ceil(meta/2)) && puntajeRival!=(Math.ceil(meta/2))){
        elegir();
        jugar();
        alert(`Puntuacion:\nTú: ${puntaje} \nRival: ${puntajeRival}`);
    }
    resultadoFinal();
}

const seleccionarMeta = () =>{
    meta=Number(prompt("Bienvenido al piedra papel o tijera, seleccione al mejor de cuanto quiere jugar\n3: Al mejor de 3\n5: Al mejor de 5\n7: Al mejor de 7"));
    puntaje=0;
    puntajeRival=0;
    if(meta!=3 && meta!=5 && meta!=7){
        alert("Opcion Incorrecta");
        seleccionarMeta();
    }
    else{
        jugarMientras();
    }
}

const btn = document.querySelector("#iniciar");
btn.onclick = seleccionarMeta;