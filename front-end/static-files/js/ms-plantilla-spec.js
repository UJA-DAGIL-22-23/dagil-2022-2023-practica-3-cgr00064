/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar
describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */


// SPECS para Jasmine
//Plantilla.sustituyeTags()
describe("Plantilla.sustituyeTags", function () {
      let plantilla;
      let deportista;
  
      beforeEach(() => {
        plantilla = "Mi nombre es ### NOMBRE ### y mi nacionalidad es ### NACIONALIDAD ### y naci en el año ### FECHA DE NACIMIENTO Anio ###";
        deportista = {
          ref: { "@ref": { id: "123456" } },
          data: {
            nombre: "Juan",
            apellido: "Pérez",
            fechaNacimiento: { dia: 1, mes: 1, anio: 2000 },
            nacionalidad: "Española",
            edad: 23,
            disciplinas: ["Natación", "Atletismo"],
            caballos: ["Caballo 1", "Caballo 2"],
            aniosParticipacionJJOO: [2016, 2020],
          },
        };
      });
  
      it("Debe reemplazar el tag NOMBRE", () => {
        const result = Plantilla.sustituyeTags(plantilla, deportista);
        expect(result).toBe(`Mi nombre es Juan y mi nacionalidad es Española y naci en el año 2000`);
      });

      it("Debe reemplazar el tag NACIONALIDAD", () => {
        const result = Plantilla.sustituyeTags(plantilla, deportista);
        expect(result).toBe(`Mi nombre es Juan y mi nacionalidad es Española y naci en el año 2000`);
      });

      it("Debe reemplazar el tag FECHANACIMIENTOAnio", () => {
        const result = Plantilla.sustituyeTags(plantilla, deportista);
        expect(result).toBe(`Mi nombre es Juan y mi nacionalidad es Española y naci en el año 2000`);
      });

});
//Plantilla.plantillaFormularioDeportista.actualiza
describe("Plantilla.plantillaFormularioDeportista.actualiza", () => {
    it("Debe devolver el formulario con los valores del deportista actualizados", () => {
      const plantilla = Plantilla.plantillaFormularioDeportista.formulario;
      const deportista = {
        ref: { "@ref": { id: "123" } },
        data: {
          nombre: "Juan",
          apellido: "Pérez",
          fechaNacimiento: { dia: "01", mes: "01", anio: "1990" },
          nacionalidad: "Argentina",
          edad: "32",
          disciplinas: ["Natación", "Atletismo"],
          caballos: ["Caballo 1", "Caballo 2"],
          aniosParticipacionJJOO: "3"
        }
      };
      const plantillaTags = Plantilla.plantillaTags;
  
      const resultado = Plantilla.plantillaFormularioDeportista.actualiza(deportista);
  
      expect(resultado).toBeDefined();
      expect(resultado).not.toEqual(plantilla);
      expect(resultado).toContain(deportista.ref["@ref"].id);
      expect(resultado).toContain(deportista.data.nombre);
      expect(resultado).toContain(deportista.data.apellido);
      expect(resultado).toContain(`${deportista.data.fechaNacimiento.dia}/${deportista.data.fechaNacimiento.mes}/${deportista.data.fechaNacimiento.anio}`);
      expect(resultado).toContain(deportista.data.nacionalidad);
      expect(resultado).toContain(deportista.data.edad);
      expect(resultado).toContain(deportista.data.disciplinas[0]);
      expect(resultado).toContain(deportista.data.disciplinas[1]);
      expect(resultado).toContain(deportista.data.caballos[0]);
      expect(resultado).toContain(deportista.data.caballos[1]);
      expect(resultado).toContain(deportista.data.aniosParticipacionJJOO);
      expect(resultado).not.toContain(plantillaTags.ID);
      expect(resultado).not.toContain(plantillaTags.NOMBRE);
      expect(resultado).not.toContain(plantillaTags.APELLIDO);
      expect(resultado).not.toContain(plantillaTags.FECHANACIMIENTODia);
      expect(resultado).not.toContain(plantillaTags.FECHANACIMIENTOMes);
      expect(resultado).not.toContain(plantillaTags.FECHANACIMIENTOAnio);
      expect(resultado).not.toContain(plantillaTags.NACIONALIDAD);
      expect(resultado).not.toContain(plantillaTags.EDAD);
      expect(resultado).not.toContain(plantillaTags.DISCIPLINAS);
      expect(resultado).not.toContain(plantillaTags.CABALLOS);
      expect(resultado).not.toContain(plantillaTags.ANIOSPARTICPACIONJJOO);
    });
});

describe("Plantilla.deportistaComoFormulario", function () {
    it("Debería devolver un formulario con los datos de un deportista correctamente", function () {
      const deportista = {
        ref: { '@ref': { id: 'abc123' } },
        data: {
          nombre: 'Juan',
          apellido: 'Pérez',
          fechaNacimiento: { dia: '01', mes: '01', anio: '1990' },
          nacionalidad: 'Argentina',
          edad: 33,
          disciplinas: ['Atletismo', 'Natación'],
          caballos: ['Caballo1', 'Caballo2'],
          aniosParticipacionJJOO: 3
        }
      };
      const expected = `
      <form method='post' action=''>
        <table class="listado-plantilla">
          <thead>
            <th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th>
            <th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th>
            <th>Años de participación en los JJOO</th><th>Editar</th><th>Guardar</th><th>Cancelar</th>
          </thead>
          <tbody>
            <tr title ="abc123">
              <td><input type="text" class="form-deportista-elemento" disabled id="form-deportista-id"
                  value="abc123" name="id_deportista"/>
              </td>
              <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nombre"
                  value="Juan" name="nombre_deportista"/>
              </td>
              <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-apellido"
                  value="Pérez" name="apellido_deportista"/>
              </td>
              <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-fechanac"
                  value="01/01/1990" name="fechaNac_deportista"/>
              </td>
              <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-nacionalidad"
                  value="Argentina" name="nacionalidad_deportista"/>
              </td>
              <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-edad"
                  value="33" name="edad_deportista"/>
              </td>
              <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-disciplinas"
                  value="Atletismo, Natación" name="diciplinas_deportista"/>
              </td>
              <td><input type="vector" class="form-deportista-elemento editable" disabled id="form-deportista-caballos"
                  value="Caballo1, Caballo2" name="caballos_deportista"/>
              </td>
              <td><input type="text" class="form-deportista-elemento editable" disabled id="form-deportista-JJOO"
                  value="3"name="JJOO_deportista"/>
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
  `
});
});



//Tiene que estar todo en una misma linea no entiendo por que.
//Plantilla.cabeceraTable()
describe("Plantilla.cabeceraTable", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla",
        function () {
            const expectedOutput = `<table class="listado-plantilla"><thead><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></thead><tbody>`;
            expect(Plantilla.cabeceraTable()).toBe(expectedOutput);
        });
        it("debería generar una tabla HTML con la cantidad de columnas esperada",
        function () {
            const expectedColumns = 10;
            const cabecera = Plantilla.cabeceraTable();
            const cabeceraHTML = document.createElement("div");
            cabeceraHTML.innerHTML = cabecera;
            const columnas = cabeceraHTML.querySelectorAll("th").length;
            expect(columnas).toBe(expectedColumns);
        });
});

//Plantilla.cabeceraTableNombres()
describe("Plantilla.cabeceraTableNombres", function () {
    it("debería devolver las etiquetas HTML para la cabecera de tabla con una única columna para los nombres",
        function () {
            const expectedOutput = `<table class="listado-plantilla"><thead><th>Nombre</th></thead><tbody>`;
            expect(Plantilla.cabeceraTableNombres()).toBe(expectedOutput);
        });
});
//Plantilla.cuerpoTr
describe("Plantilla.cuerpoTr", function () {
    it("genera correctamente la plantilla HTML", function () {
        // Preparar datos de prueba
        let p = {
            ref: {
                "@ref": {
                    id: "ref deportista 1"
                }
            },
            data: {
                nombre: "Nombre deportista 1",
                apellido: "Apellido deportista 1",
                fechaNacimiento: { dia: 1, mes: 1, anio: 2000 },
                nacionalidad: "Nacionalidad deportista 1",
                edad: 23,
                disciplinas: ["Disciplina 1", "Disciplina 2"],
                caballos: ["Caballo 1", "Caballo 2"],
                aniosParticipacionJJOO: [2016, 2020]
            }
        };

        let resultado = Plantilla.cuerpoTr(p);

        let esperado = `<tr><td>ref deportista 1</td><td>Nombre deportista 1</td><td>Apellido deportista 1</td><td>1/1/2000</td><td>Nacionalidad deportista 1</td><td>23</td><td>Disciplina 1, Disciplina 2</td><td>Caballo 1,Caballo 2</td><td>2016,2020</td><td><div><a href="javascript:Plantilla.mostrarDeportista('ref deportista 1')"">Mostrar</a></div></td></tr>`;
        expect(resultado).toEqual(esperado);
    });
});

//Plantilla.cuerpoTrNombres()
describe("Plantilla.cuerpoTrNombres", function() {
    it("debe generar un HTML con el nombre dado", function() {
      const nombre = "Paco";
      const htmlEsperado = `<tr><td>${nombre}</td></tr>`;
      expect(Plantilla.cuerpoTrNombres(nombre)).toEqual(htmlEsperado);
    });
});

//Plantilla.pieTable()
describe("Plantilla.pieTable", function () {
    it("debería devolver las etiquetas HTML para el pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
});

//Plantilla.formulario
describe('Plantilla.formulario', function () {
    it('La función debe devolver una cadena de texto', function() {
        expect(typeof Plantilla.formulario()).toBe('string');
    });
});


//Plantilla.imprime_nombres
describe("Plantilla.imprime_nombres", function() {
    it("debe generar una tabla con los nombres dados", function() {
      const nombres = ["John Doe", "Jane Smith", "Mark Johnson"];
      spyOn(Plantilla, "cabeceraTableNombres").and.returnValue("<thead><tr><th>Nombres</th></tr></thead>");
      spyOn(Plantilla, "pieTable").and.returnValue("</table>");
      spyOn(Plantilla, "cuerpoTrNombres").and.callFake(function(nombre) {
        return `<tr><td>${nombre}</td></tr>`;
      });
      spyOn(Frontend.Article, "actualizar");
  
      Plantilla.imprime_nombres(nombres);
  
      expect(Plantilla.cabeceraTableNombres).toHaveBeenCalled();
      expect(Plantilla.pieTable).toHaveBeenCalled();
      expect(Plantilla.cuerpoTrNombres.calls.allArgs()).toEqual([
        ["John Doe"],
        ["Jane Smith"],
        ["Mark Johnson"]
      ]);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de los nombres de los deportistas de equitacion", "<thead><tr><th>Nombres</th></tr></thead><tr><td>John Doe</td></tr><tr><td>Jane Smith</td></tr><tr><td>Mark Johnson</td></tr></table>");
    });
});

//Plantilla.imprime_alfabeticamente()
describe("Plantilla.imprime_alfabeticamente", function() {
    it("debe generar una tabla con los nombres de los deportistas por orden alfabético", function() {
      let vector = [      
        {nombre: "Ana"},      
        {nombre: "Berta"},      
        {nombre: "Lucía"},      
        {nombre: "Pablo"}    
    ];
  
      // Configurar los espías para las funciones
      spyOn(Plantilla, "cabeceraTableNombres").and.returnValue("<thead><tr><th>Nombre</th></tr></thead>");
      spyOn(Plantilla, "cuerpoTrNombres").and.callFake(function(deportista) {
        return `<tr><td>${deportista.nombre}</td></tr>`;
      });
      spyOn(Plantilla, "pieTable").and.returnValue("</tbody></table>");
      spyOn(Frontend.Article, "actualizar");
  
      Plantilla.imprime_alfabeticamente(vector);
  
      const esperado = "<thead><tr><th>Nombre</th></tr></thead><tr><td>Ana</td></tr><tr><td>Berta</td></tr><tr><td>Lucía</td></tr><tr><td>Pablo</td></tr></tbody></table>";
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Listado de los nombres de los deportistas de equitacion por orden alfabetico", esperado);
    });
  });

//Plantilla.imprime()
describe("Plantilla.imprime", function() {
    it("debe generar una tabla con la información de los deportistas dada", function() {
    let vector = [
        {ref: {
            "@ref": {
                id: "ref deportista 1"
            }
        },
        data: {
        nombre: "Nombre deportista 1",
        apellido: "Apellido deportista 1",
        fechaNacimiento: { dia: 1, mes: 1, anio: 2000 },
        nacionalidad: "Nacionalidad deportista 1",
        edad: 23,
        disciplinas: ["Disciplina 1", "Disciplina 2"],
        caballos: ["Caballo 1", "Caballo 2"],
        aniosParticipacionJJOO: [2016, 2020]
        }
        },
        {
        ref: {
            "@ref": {
                id: "ref deportista 2"
            }
        },
        data: {
        nombre: "Nombre deportista 2",
        apellido: "Apellido deportista 2",
        fechaNacimiento: { dia: 2, mes: 2, anio: 2001 },
        nacionalidad: "Nacionalidad deportista 2",
        edad: 22,
        disciplinas: ["Disciplina 3", "Disciplina 4"],
        caballos: ["Caballo 3", "Caballo 4"],
        aniosParticipacionJJOO: [2016, 2020, 2024]
        }
        }
    ];

    // Configurar los espías para las funciones
    spyOn(Plantilla, "cabeceraTable").and.returnValue("<thead><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></tr></thead>");
    spyOn(Plantilla, "cuerpoTr").and.callFake(function(deportista) {
        return `<tr><td>${deportista.ref['@ref'].id}</td><td>${deportista.data.nombre}</td><td>${deportista.data.apellido}</td><td>${deportista.data.fechaNacimiento.dia}/${deportista.data.fechaNacimiento.mes}/${deportista.data.fechaNacimiento.anio}</td><td>${deportista.data.nacionalidad}</td><td>${deportista.data.edad}</td><td>${deportista.data.disciplinas.join(", ")}</td><td>${deportista.data.caballos.join(", ")}</td><td>${deportista.data.aniosParticipacionJJOO.join(", ")}</td><td><div><a href="javascript:Plantilla.mostrarDeportista('${deportista.ref['@ref'].id}')"">Mostrar</a></div></td></tr>`;
    });
    spyOn(Plantilla, "pieTable").and.returnValue("</tbody></table>");
    spyOn(Frontend.Article, "actualizar");

    Plantilla.imprime(vector);

    const esperado = "<thead><tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Fecha de nacimiento</th><th>Nacionalidad</th><th>Edad</th><th>Disciplina/s</th><th>Caballos</th><th>Años de participación en los JJOO</th><th>Opcion</th></tr></thead><tr><td>ref deportista 1</td><td>Nombre deportista 1</td><td>Apellido deportista 1</td><td>1/1/2000</td><td>Nacionalidad deportista 1</td><td>23</td><td>Disciplina 1, Disciplina 2</td><td>Caballo 1, Caballo 2</td><td>2016, 2020</td><td><div><a href=\"javascript:Plantilla.mostrarDeportista('ref deportista 1')\">Mostrar</a></div></td></tr><tr><td>ref deportista 2</td><td>Nombre deportista 2</td><td>Apellido deportista 2</td><td>2/2/2001</td><td>Nacionalidad deportista 2</td><td>22</td><td>Disciplina 2, Disciplina 3</td><td>Caballo 2, Caballo 3</td><td>2020, 2024</td><td><div><a href=\"javascript:Plantilla.mostrarDeportista('ref deportista 2')\">Mostrar</a></div></td></tr></tbody></table>";
    expect(Frontend.Article.actualizar).toHaveBeenCalled();
    expect(Frontend.Article.actualizar.calls.mostRecent().args[0]).toBe("Listado de deportistas de equitacion con toda su información", esperado);
    });
});

//Plantilla.imprimeUnDeportista()


//Plantilla.almacenaDatos()
describe('Plantilla.almacenaDatos', () => {
    it('debe almacenar correctamente los datos del deportista', () => {
      const deportista = {
        nombre: "Nombre deportista 2",
        apellido: "Apellido deportista 2",
        fechaNacimiento: { dia: 2, mes: 2, anio: 2001 },
        nacionalidad: "Nacionalidad deportista 2",
        edad: 22,
        disciplinas: ["Disciplina 3", "Disciplina 4"],
        caballos: ["Caballo 3", "Caballo 4"],
        aniosParticipacionJJOO: [2016, 2020, 2024]
        }
      
      Plantilla.almacenaDatos(deportista)
  
      expect(Plantilla.deportistaMostrado).toEqual(deportista)
    })
  })

//Plantilla.recuperaDatosAlmacenados
describe("Plantilla.recuperaDatosAlmacenados", function() {
    it("debe retornar null si no hay datos almacenados", function() {
        Plantilla.deportistaMostrado = null;
        expect(Plantilla.recuperaDatosAlmacenados()).toBeNull();
    });
    
    it("debe retornar los datos almacenados", function() {
        Plantilla.deportistaMostrado = {nombre: "Juan", edad: 25, deporte: "equitacion"};
        expect(Plantilla.recuperaDatosAlmacenados()).toEqual({nombre: "Juan", edad: 25, deporte: "equitacion"});
    });
});

//Plantilla.deshabilitarCamposEditablesNombre
describe("Plantilla.deshabilitarCamposEditablesNombre", function() {
    it("deshabilita el campo editable correspondiente al nombre del deportista", function() {
      spyOn(Plantilla, "habilitarDeshabilitarCamposEditablesNombre");
  
      Plantilla.deshabilitarCamposEditablesNombre();
  
      expect(Plantilla.habilitarDeshabilitarCamposEditablesNombre).toHaveBeenCalledWith(true);
    });
});

//Plantilla.habilitarCamposEditablesNombre
describe("Plantilla.habilitarCamposEditablesNombre", function() {
    it("habilita el campo editable correspondiente al nombre del deportista", function() {
      spyOn(Plantilla, "habilitarDeshabilitarCamposEditablesNombre");
  
      Plantilla.habilitarCamposEditablesNombre();
  
      expect(Plantilla.habilitarDeshabilitarCamposEditablesNombre).toHaveBeenCalledWith(false);
    });
});

//Plantilla.editarNombre
describe("Plantilla.editarNombre", function() {
    it("debe habilitar los campos editables de nombre", function() {
        spyOn(Plantilla, "habilitarDeshabilitarCamposEditablesNombre");

        Plantilla.editarNombre();

        expect(Plantilla.habilitarDeshabilitarCamposEditablesNombre).toHaveBeenCalledWith(false);
    });
});
//Plantilla.habilitarDeshabilitarCamposEditables
describe("Plantilla.habilitarDeshabilitarCamposEditables", function() {
    it("debería deshabilitar todos los campos editables cuando se le pasa 'true' como parámetro", function() {
      const inputNombre = document.createElement('input');
      inputNombre.setAttribute('id', Plantilla.form.NOMBRE);
      inputNombre.removeAttribute('disabled');
      document.body.appendChild(inputNombre);

      const inputApellido = document.createElement('input');
      inputApellido.setAttribute('id', Plantilla.form.APELLIDO);
      inputApellido.removeAttribute('disabled');
      document.body.appendChild(inputApellido);

      const inputCaballos = document.createElement('input');
      inputCaballos.setAttribute('id', Plantilla.form.CABALLOS);
      inputCaballos.removeAttribute('disabled');
      document.body.appendChild(inputCaballos);

      const inputAnios = document.createElement('input');
      inputAnios.setAttribute('id', Plantilla.form.ANIOSPARTICPACIONJJOO);
      inputAnios.removeAttribute('disabled');
      document.body.appendChild(inputAnios);

      const deshabilitando = true;
      
      Plantilla.habilitarDeshabilitarCamposEditables(deshabilitando);
  
      expect(inputNombre.disabled).toBe(true);
      expect(inputApellido.disabled).toBe(true);
      expect(inputCaballos.disabled).toBe(true);
      expect(inputAnios.disabled).toBe(true);
    });
});

//Plantilla.deshabilitarCamposEditables
describe("Plantilla.deshabilitarCamposEditables", function() {
    it("deshabilita los campos editable correspondientes del deportista", function() {
      spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");
  
      Plantilla.deshabilitarCamposEditables();
  
      expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
    });
});

//Plantilla.habilitarCamposEditables
describe("Plantilla.habilitarCamposEditables", function() {
    it("habilita el campo editable correspondiente al nombre del deportista", function() {
      spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");
  
      Plantilla.habilitarCamposEditables();
  
      expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
    });
});

//Plantilla.editarNombre
describe("Plantilla.editar", function() {
    it("debe habilitar los campos editables", function() {
        spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");

        Plantilla.editar();

        expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
    });
});


//Plantilla.cancelar

//Plantilla.guardar