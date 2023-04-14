/**
 * @file front-end.js
 * @description Funciones comunes para todos los módulos de front-end. Debe cargarse la primera de todas.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 06-feb-2023
 */

/// Espacio de nombres
let Frontend = {};


/// Dirección del MS que funciona como API_GATEWAY
Frontend.API_GATEWAY = "http://localhost:8001"

/// Algunas constantes relacionadas con CSS y HTML
Frontend.ID_SECCION_PRINCIPAL = "seccion-principal"
Frontend.ID_SECCION_PRINCIPAL_TITULO = "seccion-principal-titulo"
Frontend.ID_SECCION_PRINCIPAL_CONTENIDO = "seccion-principal-contenido"
Frontend.ID_SECCION_PRINCIPAL_RESULTADOS = "seccion-principal-resultados"

/// Objeto Article dentro Frontend para tratar con el contenido del elemento Article del DOM
Frontend.Article = {}


/**
 * Cambia toda la información del article
 * @param {String} titulo Información para el título del article 
 * @param {String} contenido INformacion para el contenido del article
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.actualizar = function (titulo, contenido) {
    // Si son nulos, los sustituyo por la cadena vacía
    titulo = titulo || ""
    contenido = contenido || ""
    // Sustituyo el título y el contenido del articulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_TITULO ).innerHTML = titulo
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML = contenido
    return this;
}


/**
 * Crea un div donde escribir los resultados de una búsqueda
 * @returns El propio objeto Frontend.Article para encadenar llamadas
 */
Frontend.Article.creaDivSeccionPrincipalResultados=function () {
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_CONTENIDO ).innerHTML += '<div id="seccion-principal-resultados"></div>'
    return this;
}


/**
 * Escribe los resultados de una búsqueda en el DIV Frontend.ID_SECCION_PRINCIPAL_RESULTADOS
 * @param {String} resultados Información para la tabla de resultados
 * @returns El propio Article para concatenar llamadas
 */
Frontend.Article.resultados = function (resultados) {
    resultados = resultados || ""
    // Comprueba si está la sección para escribir los resultados.
    // Si no está, la crea y luego ya escribe.
    if( document.getElementById( Frontend.ID_SECCION_PRINCIPAL_RESULTADOS )===null ) {
        Frontend.Article.creaDivSeccionPrincipalResultados()
    }
    document.getElementById( Frontend.ID_SECCION_PRINCIPAL_RESULTADOS ).innerHTML = resultados
    return this;
}