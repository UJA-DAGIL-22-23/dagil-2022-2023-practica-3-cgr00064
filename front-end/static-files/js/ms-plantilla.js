/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};
 
// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}
// Funciones para mostrar como TABLE
/**
* Crea la cabecera para mostrar la info como tabla
* @returns Cabecera de la tabla
*/
Plantilla.cabeceraTable = function () {
    return `<table class="listado-plantilla">
        <thead>
        <th>Nombre</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th>
        </thead>
        <tbody>
    `;
}
/**
* Crea la cabecera para mostrar los nombres como tabla
* @returns Cabecera de la tabla
*/
Plantilla.cabeceraTableNombres = function () {
    return `<table class="listado-plantilla">
        <thead>
        <th>Nombre</th></thead>
        <tbody>
    `;
}
/**
* Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
* @param {proyecto} p Datos del proyecto a mostrar
* @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
*/
Plantilla.cuerpoTr = function (p) {
    const d = p.data

    return `<tr>
    <td>${d.nombre}</td>
    <td>${d.fechaNacimiento.dia}/${d.fechaNacimiento.mes}/${d.fechaNacimiento.anio}</td>
    <td>${d.nacionalidad}</td>
    <td>${d.edad}</td>
    <td>${d.disciplinas.join( ", ")}</td>
    <td>${d.caballos.join( ", ")}</td>
    <td>${d.aniosParticipacionJJOO.join( ", ")}</td>
    </tr>
    `;
} 
/**
* Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
* @param {proyecto} p Datos del proyecto a mostrar
* @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
*/
Plantilla.cuerpoTrNombres = function (nombre) {
    return `
    <td>${nombre}</td>
    </tr>
    `;
}

/**
* Pie de la tabla en la que se muestran las personas
* @returns Cadena con el pie de la tabla
*/
Plantilla.pieTable = function () {
    return "</tbody></table>";
}

//Funciones para mostrar el formulario.
Plantilla.formulario = function (){
    return`
    <div id="div_formulario">
        <form id="forulario">
        <table class="listado-plantilla">
        <thead>
            <th>Nombre</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina</th><th>Opción</th>
        </thead>
        <tbody>
        <tr>
            <td>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre"><br><br>
            </td> 
            <td>
            <label for="nacionalidad">Nacionalidad:</label>
            <select id="nacionalidad" name="nacionalidad">
                <option value="">Selecciona una opción</option>
                <option value="Espñola">Española</option>
                <option value="Argentina">Argentina</option>
                <option value="Colombiana">Colombiana</option>
                <option value="Francesa">Francesa</option>
                <option value="Estadounidense">Estadounidense</option>
                <option value="Mexicana">Mexicana</option>
                <option value="Alemana">Alemana</option>
            </select><br><br>
            </td>
            <td>
                <label for="edad">Edad:</label>
                <input type="number" id="edad" name="edad" min="25" max="43" value="25-43"><br><br>
            </td>
            <td>
            <label for="disciplina">Disciplina:</label>
            <select id="disciplina" name="disciplina">
                <option value="">Selecciona una opción</option>
                <option value="Salto">Salto</option>
                <option value="Doma">Doma</option>
                <option value="Vaquera">Vaquera</option>
                <option value="Concurso completo">Concurso completo</option>
            </select><br><br>
            </td>
            <td>
            <div><a id="boton_buscar" href="javascript:Plantilla.buscar()">Buscar</a></div>
            </td>
        </tr>
        </tbody>
        </table>
    </form> 
    </div>
    <div id="div_resultados"></div>
    `
    }

/**
* Función que recupera todos los nombres de los deportistas de equitación llamando al MS Plantilla
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recupera_nombres = async function (callBackFn) {
    let response = null
     
    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getNombres"
        response = await fetch(url)
     
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }
    
    // Muestro todos los nombres que se han descargado
    let vectorNombres = null
    if (response) {
        vectorNombres = await response.json()
    callBackFn(vectorNombres.data)
    }
}

/**
* Función que recupera todos los nombres de los deportistas de equitación llamando al MS Plantilla
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recupera_alfabeticamente = async function (callBackFn) {
    let response = null
     
    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getAlfabeticamente"
        response = await fetch(url)
     
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }
    
    // Muestro todos los nombres que se han descargado
    let vectorAlfabeticamente = null
    if (response) {
        vectorAlfabeticamente = await response.json()
    callBackFn(vectorAlfabeticamente.data)
    }
}

/**
* Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Plantilla
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recupera = async function (callBackFn) {
    let response = null
 
    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodosInfo"
        response = await fetch(url)
 
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }
 
    // Muestro todas las personas que se han descargado
    let vectorPlantilla = null
    if (response) {
        vectorPlantilla = await response.json()
        callBackFn(vectorPlantilla.data)
    }
}


/**
* Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
* @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
Plantilla.imprime_nombres = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTableNombres();
    vector.forEach(o => msj += Plantilla.cuerpoTrNombres(o))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de los nombres de los deportistas de equitacion", msj )
}

/**
* Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
* @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
Plantilla.imprime_alfabeticamente = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTableNombres();
    vector.forEach(o => msj += Plantilla.cuerpoTrNombres(o))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de los nombres de los deportistas de equitacion por orden alfabetico", msj )
}

/**
* Función para mostrar en pantalla todos los deportistas de equitacion con su info que se han recuperado de la BBDD.
* @param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
Plantilla.imprime = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de deportistas de equitacion con toda su información", msj )
}
/**
* Función para mostrar el formulario con el que se le pedira información al usuario.
*/
Plantilla.imprimeformulario = function(){
    let msj ="";
    msj += Plantilla.formulario();

    Frontend.Article.actualizar( "Formulario", msj )
}


/**
* Función que descarga la info MS Plantilla al llamar a una de sus rutas
* @param {string} ruta Ruta a descargar
* @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null
 
    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)
 
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }
 
    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}
 
 
/**
* Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
*/
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos
 
    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos
 
    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos
 
    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}
 
/**
* Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
*/
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos
 
    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos
 
    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos
 
    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}
 
Plantilla.mostrar_nombres = function (nombres) {
    if (nombres && nombres.length) { // Comprobamos que el objeto no es undefined y que contiene datos
        let tabla = Plantilla.cabeceraTableNombres()
        nombres.forEach((d) => {
        tabla += Plantilla.cuerpoTrNombres(d)
    })
    tabla += Plantilla.pieTable()
    document.getElementById("div-plantilla-nombres").innerHTML = tabla
    } else {
       console.error('El objeto "nombres" es undefined o no contiene datos válidos.')
    }
}
 
/**
* Función principal para responder al evento de elegir la opción "Home"
*/
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}
 
/**
* Función principal para responder al evento de elegir la opción "Acerca de"
*/
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

 
/**
* Función principal para responder al evento de elegir la opción "Listar nombres"
*/
Plantilla.listar_nombres = function () {
    this.recupera_nombres(this.imprime_nombres);
}

/**
* Función principal para responder al evento de elegir la opción "Listar nombres"
*/
Plantilla.listar_alfabeticamente = function () {
    this.recupera_alfabeticamente(this.imprime_alfabeticamente);
}

/**
* Función principal para responder al evento de elegir la opción "Listar informacion completa"
*/
Plantilla.listar = function () {
    this.recupera(this.imprime);
}

Plantilla.mostrar = function () {
    this.imprimeformulario();
}

Plantilla.buscar = async function () {
    try {
        document.getElementById( "div_resultados" ).innerHTML = "<br><h1>Los resultados de la busqueda de arriba es/son los siguientes:</h1>"
        let url = Frontend.API_GATEWAY + "/personas/getBuscar"
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "nombre": document.getElementById("nombre").value,
                "nacionalidad": document.getElementById("nacionalidad").value,
                "edad": document.getElementById("edad").value,
                "disciplina": document.getElementById("disciplina").value
            }), // body data type must match "Content-Type" header
        })
        
        //Código necesario para mostar la informacion recogida del fomulario
        let tabla = Plantilla.cabeceraTable();
        deportistas.forEach(deportista => {
          tabla += Plantilla.cuerpoTr(deportista);
        });
        tabla += Plantilla.pieTable();
        document.getElementById('boton_buscar').innerHTML = tabla;
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}





