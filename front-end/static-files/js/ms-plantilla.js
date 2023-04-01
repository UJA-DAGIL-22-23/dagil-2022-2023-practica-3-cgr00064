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

/// Nombre de los campos del formulario para editar un deportista
Plantilla.form = {
    NOMBRE: "form-deportista-nombre",
    APELLIDO: "form-deportista-apellido",
    FECHANACIMIENTO: "form-deportista-fechanac",
    NACIONALIDAD: "form-deportista-nacionalidad",
    EDAD: "form-deportista-edad",
    DISCIPLINAS: "form-deportista-disciplinas",
    CABALLOS: "form-deportista-caballos",
    ANIOSPARTICPACIONJJOO: "form-deportista-JJOO"
}

Plantilla.deportistaMostrado = null

Plantilla.plantillaTags = {
    ID: "### ID ###",
    NOMBRE: "### NOMBRE ###",
    APELLIDO: "### APELLIDO ###",
    FECHANACIMIENTODia: "### FECHA DE NACIMIENTO Día ###",
    FECHANACIMIENTOMes: "### FECHA DE NACIMIENTO Mes ###",
    FECHANACIMIENTOAnio: "### FECHA DE NACIMIENTO Anio ###",
    NACIONALIDAD: "### NACIONALIDAD ###",
    EDAD: "### EDAD ###",
    DISCIPLINAS: "### DISCIPLINAS ###",
    CABALLOS: "### CABALLOS ###",
    ANIOSPARTICPACIONJJOO: "### AÑOS DE PARTICIPACION EN LOS JJOO ###"
}

// Funciones para mostrar una persona como formulario.
Plantilla.plantillaFormularioDeportista = {}

//Cabecera del formulario.
Plantilla.plantillaFormularioDeportista.formulario = `
<form method='post' action=''>
    <table class="listado-plantilla">
        <thead>
            <th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th>
            <th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th>
            <th>Años de participación en los JJOO</th><th>Editar</th><th>Guardar</th><th>Cancelar</th>
        </thead>
        <tbody>
            <tr title ="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"
                        value="${Plantilla.plantillaTags.ID}" name="id_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nombre"
                        value="${Plantilla.plantillaTags.NOMBRE}" name="nombre_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-apellido"
                        value="${Plantilla.plantillaTags.APELLIDO}" name="apellido_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-fechanac"
                        value="${Plantilla.plantillaTags.FECHANACIMIENTODia}/${Plantilla.plantillaTags.FECHANACIMIENTOMes}/${Plantilla.plantillaTags.FECHANACIMIENTOAnio}" name="fechaNac_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nacionalidad"
                        value="${Plantilla.plantillaTags.NACIONALIDAD}" name="nacionalidad_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-edad"
                        value="${Plantilla.plantillaTags.EDAD}" name="edad_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-disciplinas"
                        value="${Plantilla.plantillaTags.DISCIPLINAS}" name="diciplinas_deportista"/>
                </td>
                <td><input type="vector" class="form-deportista-elemento editable" disabled id="form-deportista-caballos"
                        value="${Plantilla.plantillaTags.CABALLOS}" name="caballos_deportista"/>
                </td>
                <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-JJOO"
                        value="${Plantilla.plantillaTags.ANIOSPARTICPACIONJJOO}" name="JJOO_deportista"/>
                </td>
                <td>
                    <div><a href="javascript:Plantilla.editarNombre()">Editar Nombre</a></div>
                </td>
                <td>
                    <div><a href="javascript:Plantilla.guardar()">Guardar</a></div>
                </td>    
                <td>    
                    <div><a href="javascript:Plantilla.cancelar()">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;

Plantilla.sustituyeTags = function (plantilla, deportista) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), deportista.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), deportista.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.APELLIDO, 'g'), deportista.data.apellido)
        .replace(new RegExp(Plantilla.plantillaTags.FECHANACIMIENTODia, 'g'), deportista.data.fechaNacimiento.dia)
        .replace(new RegExp(Plantilla.plantillaTags.FECHANACIMIENTOMes, 'g'), deportista.data.fechaNacimiento.mes)
        .replace(new RegExp(Plantilla.plantillaTags.FECHANACIMIENTOAnio, 'g'), deportista.data.fechaNacimiento.anio)
        .replace(new RegExp(Plantilla.plantillaTags.NACIONALIDAD, 'g'), deportista.data.nacionalidad)
        .replace(new RegExp(Plantilla.plantillaTags.EDAD, 'g'), deportista.data.edad)
        .replace(new RegExp(Plantilla.plantillaTags.DISCIPLINAS, 'g'), deportista.data.disciplinas)
        .replace(new RegExp(Plantilla.plantillaTags.CABALLOS, 'g'), deportista.data.caballos)
        .replace(new RegExp(Plantilla.plantillaTags.ANIOSPARTICPACIONJJOO, 'g'), deportista.data.aniosParticipacionJJOO)
}
//
//*************************HACER TEST************************* */
//
Plantilla.plantillaFormularioDeportista.actualiza = function (deportista){
    return Plantilla.sustituyeTags(this.formulario, deportista)
}
//
//*************************HACER TEST************************* */
//
Plantilla.deportistaComoFormulario = function (deportista){
    return Plantilla.plantillaFormularioDeportista.actualiza (deportista)
}
// Funciones para mostrar como TABLE
/**
* Crea la cabecera para mostrar la info como tabla
* @returns Cabecera de la tabla
*/
Plantilla.cabeceraTable = function () {
    return `<table class="listado-plantilla"><thead><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></thead><tbody>`;
}
/**
* Crea la cabecera para mostrar los nombres como tabla
* @returns Cabecera de la tabla
*/
Plantilla.cabeceraTableNombres = function () {
    return `<table class="listado-plantilla"><thead><th>Nombre</th></thead><tbody>`;
}
/**
* Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
* @param {proyecto} p Datos del proyecto a mostrar
* @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
*/
Plantilla.cuerpoTr = function (p) {
    const d = p.data
    return `<tr><td>${p.ref['@ref'].id}</td><td>${d.nombre}</td><td>${d.apellido}</td><td>${d.fechaNacimiento.dia}/${d.fechaNacimiento.mes}/${d.fechaNacimiento.anio}</td><td>${d.nacionalidad}</td><td>${d.edad}</td><td>${d.disciplinas.join( ", ")}</td><td>${d.caballos.join( ", ")}</td><td>${d.aniosParticipacionJJOO.join( ", ")}</td><td><div><a href="javascript:Plantilla.mostrarDeportista('${p.ref['@ref'].id}')"">Mostrar</a></div></td></tr>`;
} 
/**
* Muestra la información de cada deportista en un elemento TR con sus correspondientes TD
* @param {proyecto} p Datos del proyecto a mostrar
* @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
*/
Plantilla.cuerpoTrNombres = function (nombre) {
    return `<tr><td>${nombre}</td></tr>`;
}

/**
* Pie de la tabla en la que se muestran las personas
* @returns Cadena con el pie de la tabla
*/
Plantilla.pieTable = function () {
    return "</tbody></table>";
}

//Funciones para mostrar el formulario para preguntar al cliente.
Plantilla.formulario = function (){
    return`
    <div id="div_formulario">
        <form method='get' id="forulario">
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
                <option value="Española">Española</option>
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
            <div><a href="javascript:Plantilla.buscar()" class="boton_buscar">Buscar</a></div>
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
 *Función que recuperar todos los datos de los deportistas de equitaciom  llamando al MS Plantilla dado un Id.
 *@param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
*/
Plantilla.recuperaUnDeportista = async function (idDeportista, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idDeportista
        const response = await fetch(url);
        if (response) {
            const deportista = await response.json()
            callBackFn(deportista)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

//
//************************* HACER TEST ************************* */
//
Plantilla.deportistaComoFormulario = function (deportista) {
    return Plantilla.plantillaFormularioDeportista.actualiza( deportista );
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
 *Función para mostrar en pantalla un deportista de equitacion con su info que se ha recuperado de la BBDD.
 *@param {Vector_de_deportistas} vector Vector con los datos de los deportistas a mostrar
*/
//
//*************************HACER TEST************************* */
//
Plantilla.imprimeUnDeportista = function (deportista){
    let msj = Plantilla.deportistaComoFormulario(deportista);

    Frontend.Article.actualizar("Mostrar una persona", msj)

    Plantilla.almacenaDatos(deportista)
}

Plantilla.almacenaDatos = function (deportista) {
    Plantilla.deportistaMostrado = deportista
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */
//
//*************************HACER TEST************************* */
//
Plantilla.recuperaDatosAlmacenados = function () {
    return this.deportistaMostrado;
}

/**
* Función para mostrar el formulario con el que se le pedira información al usuario.
*/
//
//*************************HACER TEST************************* */
//
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

/**
 *Función principal para responder al evento de elegir la opción "Mostrar una persona de ejemplo".
*/
Plantilla.mostrarDeportista = function (idDeportista) {
    this.recuperaUnDeportista(idDeportista, this.imprimeUnDeportista)
}

//
//*************************HACER TEST DE TODAS ESTAS************************* */
//
/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
 Plantilla.habilitarDeshabilitarCamposEditablesNombre = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    document.getElementById(Plantilla.form.NOMBRE).disabled = deshabilitando
    return this
}
/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
 Plantilla.deshabilitarCamposEditablesNombre = function () {
    Plantilla.habilitarDeshabilitarCamposEditablesNombre(true)
    return this
}
/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Plantilla.habilitarCamposEditablesNombre = function () {
    Plantilla.habilitarDeshabilitarCamposEditablesNombre(false)
    return this
}
/**
 * Función que permite modificar los datos de una persona
 */
Plantilla.editarNombre = function () {
    this.habilitarCamposEditablesNombre()
    
}
/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
 Plantilla.cancelar = function () {
    this.imprimeUnDeportista(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditablesNombre()
}
/**
 * Función para guardar los nuevos datos de una persona
 */
 Plantilla.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setNombre/"
        let id_deportista = document.getElementById("form-deportista-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_deportista": id_deportista,
                "nombre_deportista": document.getElementById("form-deportista-nombre").value,
            }), // body data type must match "Content-Type" header
        })
        Plantilla.mostrarDeportista(id_deportista)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}









//
//*************************HACER TEST************************* */
//
Plantilla.mostrar = function () {
    this.imprimeformulario();
}
Plantilla.mostrarResultadosFormulario = function(nombre, nacionalidad, edad, disciplina) {

}
Plantilla.buscar = async function () {
    document.getElementById( "div_resultados" ).innerHTML = "<br><h1>Los resultados de la busqueda de arriba es/son los siguientes:</h1>"
        try {
            // Código copiado y adaptado de https://es.stackoverflow.com/questions/202409/hacer-una-peticion-get-con-fetch
            let url = new URL( Frontend.API_GATEWAY + "/plantilla/getBuscar") 
            const params = {}
            if( document.getElementById("nombre").value ) params.nombre = document.getElementById("nombre").value
            // Otra opción: 
            //         params.nombre = document.getElementById("nombre").value?document.getElementById("nombre").value:"*"
            if( document.getElementById("nacionalidad").value ) params.nacionalidad = document.getElementById("nacionalidad").value
            if( document.getElementById("edad").value ) params.edad = document.getElementById("edad").value
            if( document.getElementById("disciplina").value ) params.disciplina = document.getElementById("disciplina").value
            
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const dataRequest = {
               method: 'GET'
            };
            let response = await fetch(url, dataRequest);

            // Mostrar los resultados dado el id
            //Como llego de los datos del formulario que son nombre nacionalidad edad y disciplina a ese id???
            Plantilla.mostrarResultadosFormulario(params.nombre, params.nacionalidad, params.edad, params.disciplina)
            

        } catch (error) {
            alert("Error: No se han podido acceder al API Gateway " + error)
            //console.error(error)
        }
}




