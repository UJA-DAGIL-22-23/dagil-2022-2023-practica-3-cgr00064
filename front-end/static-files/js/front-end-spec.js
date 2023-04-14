/**
 * @file front-end-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine
describe("Frontend.Article.actualizar: ", function () {
    const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    const tituloPrueba = "Titulo de prueba"
    const contenidoPrueba = "Contenido de prueba"
    it("para títulos y contenidos nulos, debe dejar vacíos las correspondientes secciones del article",
        function () {
            // Probamos valores nulos
            Frontend.Article.actualizar()
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null, null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar(null)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos valores vacíos
            Frontend.Article.actualizar("")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")

            Frontend.Article.actualizar("", "")
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe("")
        })
    it("Debe actualizar el titulo y el contenido de las secciones del article",
        function () {
            // Probamos solo el título
            Frontend.Article.actualizar(tituloPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe("")

            // Probamos solo el contenido
            Frontend.Article.actualizar("", contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe("")
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)

            // Probamos ambos
            Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)
            expect(elementoTitulo.innerHTML).toBe(tituloPrueba)
            expect(elementoContenido.innerHTML).toBe(contenidoPrueba)
        })
    it("Debe devolver el propio objeto",
        function () {
            // Probamos diversas llamadas con distintos parámetros
            expect(Frontend.Article.actualizar()).toBe(Frontend.Article) 
            expect(Frontend.Article.actualizar(tituloPrueba)).toBe(Frontend.Article)
            expect(Frontend.Article.actualizar(tituloPrueba, contenidoPrueba)).toBe(Frontend.Article)
        })

})


describe("Frontend.Article.creaDivSeccionPrincipalResultados: ", function () {
    const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
    
    it("Debería crear un nuevo elemento div con el id 'seccion-principal-resultados' dentro del elemento con id 'seccion-principal-contenido'",
        function () {
            Frontend.Article.creaDivSeccionPrincipalResultados();
            const seccionResultados = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_RESULTADOS);
            expect(seccionResultados).not.toBeNull();
            expect(seccionResultados.parentNode).toBe(elementoContenido);
    })
})

describe("Frontend.Article.resultados: ", function () {
    it("Para resultados nulos, debe establecer la sección de resultados como una cadena vacía",
    function () {
        Frontend.Article.resultados()
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_RESULTADOS).innerHTML).toBe("")
    })
    it("Debe establecer el contenido de la sección de resultados correctamente",
    function () {
        const resultadosPrueba = "Resultados de prueba"
        Frontend.Article.resultados(resultadosPrueba)
        expect(document.getElementById(Frontend.ID_SECCION_PRINCIPAL_RESULTADOS).innerHTML).toBe(resultadosPrueba)
    })
    it("Debe crear la sección de resultados si no existe y establecer su contenido correctamente",
    function () {
        const resultadosPrueba = "Resultados de prueba"
        // Se elimina la sección de resultados (si existe)
        const seccionResultados = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_RESULTADOS)
        if (seccionResultados !== null) {
            seccionResultados.remove()
        }
        // Se llama a la función con el contenido de prueba
        Frontend.Article.resultados(resultadosPrueba)
        // Se comprueba que la sección de resultados ha sido creada y su contenido establecido correctamente
        const seccionResultadosCreada = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_RESULTADOS)
        expect(seccionResultadosCreada).not.toBeNull()
        expect(seccionResultadosCreada.innerHTML).toBe(resultadosPrueba)
    })
    it("Debe devolver el propio objeto",
    function () {
        expect(Frontend.Article.resultados()).toBe(Frontend.Article)
        expect(Frontend.Article.resultados("Resultados de prueba")).toBe(Frontend.Article)
    })

})
