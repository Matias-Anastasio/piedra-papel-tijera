let opcion, meta, opcionRival, puntaje=0, puntajeRival=0;

function resultadoFinal(){
    if(puntaje>puntajeRival){
        alert("¡Felicitaciones Ganaste!\nResultado Final:\nTú: "+ puntaje+"\nRival: "+puntajeRival);
    }else{
        alert("Perdiste :( \nResultado Final:\nTú: "+ puntaje+"\nRival: "+puntajeRival);
    }
    if(confirm("¿Jugar de nuevo?")){
        puntaje=0;
        puntajeRival=0;
        seleccionarMeta();
    }
}

function generarRival(){
    return Math.ceil(Math.random()*10/4);
}

function jugar(){
    opcionRival= generarRival();
    if(opcion == opcionRival){
        alert("Empate, ambos eligieron lo mismo.")
    }
    if(opcion== 1 && opcionRival == 3){
        alert("Ganaste, el rival eligió tijera.");
        puntaje+=1;
    }
    if(opcion==1 && opcionRival == 2){
        alert("Perdiste, el rival eligió papel.");
        puntajeRival+=1;
    }
    if(opcion==2 && opcionRival == 1){
        alert("Ganaste, el rival eligió piedra.");
        puntaje+=1;
    }
    if(opcion==2 && opcionRival == 3){
        alert("Perdiste, el rival eligió tijera.");
        puntajeRival+=1;
    }
    if(opcion==3 && opcionRival == 2){
        alert("Ganaste, el rival eligió papel.");
        puntaje+=1;
    }
    if(opcion==3 && opcionRival == 1){
        alert("Perdiste, el rival eligió piedra.");
        puntajeRival+=1;
    }
}

function elegir(){
    opcion=Number(prompt("¿Qué elige?\n1: Piedra\n2: Papel\n3: Tijera"));
    if(opcion!=1 && opcion!=2 && opcion!=3){
        alert("Opcion Incorrecta");
        elegir();
    }
}

function jugarMientras(){
    while(puntaje!=(Math.ceil(meta/2)) && puntajeRival!=(Math.ceil(meta/2))){
        elegir();
        jugar();
        alert("Puntuacion:\nTú: "+ puntaje + "\nRival: "+ puntajeRival);
    }
    resultadoFinal();
}

function seleccionarMeta(){
    meta=Number(prompt("Bienvenido al piedra papel o tijera, seleccione al mejor de cuanto quiere jugar\n3: Al mejor de 3\n5: Al mejor de 5\n7: Al mejor de 7"));
    if(meta!=3 && meta!=5 && meta!=7){
        alert("Opcion Incorrecta");
        seleccionarMeta();
    }
    else{
        jugarMientras();
    }
}

seleccionarMeta();