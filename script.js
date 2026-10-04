// ==========================================
// PROGRESO DEL JUGADOR
// ==========================================

let progresoJugador = JSON.parse(
    localStorage.getItem("progresoJugador")
) || {
    puntos: 0,
    nivel1Completado: false,
    nivel2Completado: false,
    nivel3Completado: false
};


// ==========================================
// ACTUALIZAR INTERFAZ DEL PROGRESO
// ==========================================

function actualizarInterfazProgreso() {

    // --------------------------
    // PUNTOS
    // --------------------------

    const puntos = document.getElementById("puntosJugador");

    if (puntos) {
        puntos.textContent =
            progresoJugador.puntos + " puntos";
    }


    // --------------------------
    // BARRA DE PROGRESO
    // --------------------------

    const barra =
        document.getElementById("barraProgreso");

    if (barra) {

        const porcentaje = Math.min(
            (progresoJugador.puntos / 30) * 100,
            100
        );

        barra.style.width =
            porcentaje + "%";
    }


    // --------------------------
    // DESBLOQUEAR NIVEL 2
    // --------------------------

    const nivel2 =
        document.getElementById("nivel2");

    const botonNivel2 =
        document.getElementById("botonNivel2");

    if (nivel2 && progresoJugador.nivel1Completado) {

        nivel2.classList.remove("bloqueado");
        nivel2.classList.add("activo");

        const estadoNivel2 =
            nivel2.querySelector("span");

        if (estadoNivel2) {
            estadoNivel2.textContent =
                "🔓 DESBLOQUEADO";
        }

        if (botonNivel2) {
            botonNivel2.style.display = "block";
        }
    }


    // --------------------------
    // DESBLOQUEAR NIVEL 3
    // --------------------------

    const nivel3 =
        document.getElementById("nivel3");

    const botonNivel3 =
        document.getElementById("botonNivel3");

    if (nivel3 && progresoJugador.nivel2Completado) {

        nivel3.classList.remove("bloqueado");
        nivel3.classList.add("activo");

        const estadoNivel3 =
            nivel3.querySelector("span");

        if (estadoNivel3) {
            estadoNivel3.textContent =
                "🔓 DESBLOQUEADO";
        }

        if (botonNivel3) {
            botonNivel3.style.display = "block";
        }
    }
}


// ==========================================
// GUARDAR PROGRESO
// ==========================================

function guardarProgreso() {

    localStorage.setItem(
        "progresoJugador",
        JSON.stringify(progresoJugador)
    );
}


// ==========================================
// PANTALLA DE INTRODUCCIÓN
// ==========================================

function mostrarIntroduccion() {

    const portada = document.getElementById("pantallaInicio");
    const introduccion = document.getElementById("pantallaIntroduccion");

    portada.style.display = "none";
    introduccion.style.display = "block";
    introduccion.classList.add("mostrar");
}


// ==========================================
// ACEPTAR MISIÓN
// ==========================================

function aceptarMision() {

    const nombreInput =
        document.getElementById("nombreJugador");

    const nombre =
        nombreInput.value.trim();


    // Comprobar que escribió su nombre
    if (nombre === "") {

        alert(
            "🌱 Primero escribe tu nombre para comenzar la misión."
        );

        return;
    }


    // Guardar nombre
    localStorage.setItem(
        "nombreJugador",
        nombre
    );


    const introduccion =
        document.getElementById("pantallaIntroduccion");

    const mapa =
        document.getElementById("pantallaMapa");

    const saludo =
        document.getElementById("saludoJugador");


    // Actualizar progreso
    actualizarInterfazProgreso();


    // Saludo
    saludo.textContent =
        "¡Bienvenido, " +
        nombre +
        "! Tu misión comienza ahora.";


    // Ocultar introducción
    introduccion.classList.remove("mostrar");


    setTimeout(function() {

        introduccion.style.display = "none";

        mapa.style.display = "block";


        setTimeout(function() {

            mapa.classList.add("mostrar");

        }, 50);

    }, 1000);
}


// ==========================================
// RECHAZAR MISIÓN
// ==========================================

function rechazarMision() {

    alert(
        "🌎 El planeta seguirá esperando tu ayuda.\n\n" +
        "Cuando estés preparado, vuelve a intentarlo."
    );
}


// ==========================================
// COMENZAR NIVEL 1
// ==========================================

function comenzarJuego() {

    const mapa =
        document.getElementById("pantallaMapa");

    const juego =
        document.getElementById("juego");

    const contenedor =
        document.getElementById("contenedorWordwall");


    mapa.classList.remove("mostrar");


    setTimeout(function() {

        mapa.style.display = "none";


        // Crear Wordwall solamente una vez
        if (!document.getElementById("iframeWordwall")) {

            const iframe =
                document.createElement("iframe");

            iframe.id =
                "iframeWordwall";

            iframe.src =
                "https://www.wordwall.net/es/embed/0af3159755b94e7fa5d20465839dc18b?themeId=49&templateId=2&fontStackId=0";

            iframe.width = "500";
            iframe.height = "380";
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;

            contenedor.appendChild(iframe);
        }


        juego.style.display = "block";


        setTimeout(function() {

            juego.classList.add("mostrar");

        }, 50);

    }, 800);
}


// ==========================================
// COMENZAR NIVEL 2
// ==========================================

function comenzarJuego2() {

    // Seguridad: no permitir entrar si está bloqueado
    if (!progresoJugador.nivel1Completado) {

        alert(
            "🔒 Primero debes completar el Nivel 1."
        );

        return;
    }


    const mapa =
        document.getElementById("pantallaMapa");

    const juego =
        document.getElementById("juego2");

    const contenedor =
        document.getElementById("contenedorWordwall2");


    mapa.classList.remove("mostrar");


    setTimeout(function() {

        mapa.style.display = "none";


        // Crear Wordwall solamente una vez
        if (!document.getElementById("iframeWordwall2")) {

            const iframe =
                document.createElement("iframe");

            iframe.id =
                "iframeWordwall2";

            iframe.src =
                "https://wordwall.net/es/embed/b17ed1cda7604cc88c002a7c260acd1a?themeId=1&templateId=3&fontStackId=0";

            iframe.width = "500";
            iframe.height = "380";
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;

            contenedor.appendChild(iframe);
        }


        juego.style.display = "block";


        setTimeout(function() {

            juego.classList.add("mostrar");

        }, 50);

    }, 800);
}


// ==========================================
// COMENZAR NIVEL 3
// ==========================================

function comenzarJuego3() {

    // Seguridad: no permitir entrar si está bloqueado
    if (!progresoJugador.nivel2Completado) {

        alert(
            "🔒 Primero debes completar el Nivel 2."
        );

        return;
    }


    const mapa =
        document.getElementById("pantallaMapa");

    const juego =
        document.getElementById("juego3");

    const contenedor =
        document.getElementById("contenedorWordwall3");


    mapa.classList.remove("mostrar");


    setTimeout(function() {

        mapa.style.display = "none";


        // Crear Wordwall solamente una vez
        if (!document.getElementById("iframeWordwall3")) {

            const iframe =
                document.createElement("iframe");

            iframe.id =
                "iframeWordwall3";

            iframe.src =
                "https://wordwall.net/es/embed/303ad4e44ce3418b8b7f06af79a2549e?themeId=41&templateId=5&fontStackId=0";

            iframe.width = "500";
            iframe.height = "380";
            iframe.frameBorder = "0";
            iframe.allowFullscreen = true;

            contenedor.appendChild(iframe);
        }


        juego.style.display = "block";


        setTimeout(function() {

            juego.classList.add("mostrar");

        }, 50);

    }, 800);
}


// ==========================================
// COMPLETAR NIVEL 1
// ==========================================

function completarNivel1() {

    if (progresoJugador.nivel1Completado) {

        alert(
            "ℹ️ Ya completaste el Nivel 1.\n\n" +
            "Los puntos de esta misión ya fueron registrados."
        );

        regresarMapaDesdeJuego("juego");

        return;
    }

    progresoJugador.puntos += 10;
    progresoJugador.nivel1Completado = true;

    progresoJugador.puntos =
        Math.min(progresoJugador.puntos, 30);

    guardarProgreso();
    actualizarInterfazProgreso();

    alert(
        "🏆 ¡MISIÓN 1 COMPLETADA!\n\n" +
        "Has ganado 10 puntos.\n\n" +
        "🔓 ¡El Nivel 2 ha sido desbloqueado!"
    );

    regresarMapaDesdeJuego("juego");
}


// ==========================================
// COMPLETAR NIVEL 2
// ==========================================

function completarNivel2() {

    if (progresoJugador.nivel2Completado) {

        alert(
            "ℹ️ Ya completaste el Nivel 2.\n\n" +
            "Los puntos de esta misión ya fueron registrados."
        );

        regresarMapaDesdeJuego("juego2");

        return;
    }

    progresoJugador.puntos += 10;
    progresoJugador.nivel2Completado = true;

    progresoJugador.puntos =
        Math.min(progresoJugador.puntos, 30);

    guardarProgreso();
    actualizarInterfazProgreso();

    alert(
        "🏆 ¡MISIÓN 2 COMPLETADA!\n\n" +
        "Has ganado 10 puntos.\n\n" +
        "🔓 ¡El Nivel 3 ha sido desbloqueado!"
    );

    regresarMapaDesdeJuego("juego2");
}


// ==========================================
// COMPLETAR NIVEL 3
// ==========================================

function completarNivel3() {

    if (progresoJugador.nivel3Completado) {

        alert(
            "ℹ️ Ya completaste el Nivel 3.\n\n" +
            "La misión final ya fue registrada."
        );

        mostrarPantallaFinal();

        return;
    }

    progresoJugador.puntos += 10;
    progresoJugador.nivel3Completado = true;

    progresoJugador.puntos =
        Math.min(progresoJugador.puntos, 30);

    guardarProgreso();
    actualizarInterfazProgreso();

    mostrarPantallaFinal();
}

function mostrarPantallaFinal() {

    const nombre =
        localStorage.getItem("nombreJugador") ||
        "Jugador";

    const nombreFinal =
        document.getElementById("nombreFinal");

    if (nombreFinal) {

        nombreFinal.textContent =
            "🎉 ¡Felicidades, " +
            nombre +
            "!";
    }

    const puntosFinal =
        document.getElementById("puntosFinal");

    if (puntosFinal) {

        puntosFinal.textContent =
            "⭐ " +
            progresoJugador.puntos +
            " puntos";
    }

    const juego =
        document.getElementById("juego3");

    const pantallaFinal =
        document.getElementById("pantallaFinal");

    juego.classList.remove("mostrar");

    setTimeout(function() {

        juego.style.display = "none";

        pantallaFinal.style.display = "block";

        setTimeout(function() {

            pantallaFinal.classList.add("mostrar");

        }, 50);

    }, 800);
}


// ==========================================
// REGRESAR AL MAPA DESDE UN NIVEL
// ==========================================

function regresarMapaDesdeJuego(idJuego) {

    const juego =
        document.getElementById(idJuego);

    const mapa =
        document.getElementById("pantallaMapa");


    // Ocultar juego
    juego.classList.remove("mostrar");


    setTimeout(function() {

        juego.style.display = "none";

        // Actualizar mapa
        actualizarInterfazProgreso();


        // Mostrar mapa
        mapa.style.display = "block";


        setTimeout(function() {

            mapa.classList.add("mostrar");

        }, 50);

    }, 800);
}


// ==========================================
// REGRESAR AL MAPA DESDE LA PANTALLA FINAL
// ==========================================

function regresarAlMapa() {

    const pantallaFinal =
        document.getElementById("pantallaFinal");

    const mapa =
        document.getElementById("pantallaMapa");


    // Ocultar pantalla final
    pantallaFinal.classList.remove("mostrar");


    setTimeout(function() {

        pantallaFinal.style.display = "none";


        // Actualizar todos los datos del mapa
        actualizarInterfazProgreso();


        // Mostrar mapa
        mapa.style.display = "block";


        setTimeout(function() {

            mapa.classList.add("mostrar");

        }, 50);

    }, 800);
}

// ==========================================
// REINICIAR PROGRESO - SOLO PARA PRUEBAS
// ==========================================

function reiniciarProgreso() {

    localStorage.removeItem("progresoJugador");
    localStorage.removeItem("nombreJugador");

    location.reload();
}