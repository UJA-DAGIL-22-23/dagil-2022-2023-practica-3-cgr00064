/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS MS Plantilla
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

/**
 * Test para las rutas "estáticas": / y /acerdade
 */
describe('Servidor PLANTILLA:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve MS Plantilla Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve MS Plantilla Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio MS Plantilla: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Juan Pérez al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Juan Pérez");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it ('Devuelve Luis García al consultar el test mediante getNombres', (done) =>{
      supertest(app)
        .get('/getNombres')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[9] === "Luis García");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it ('No hay campos vacíos en los datos al consultar el test mediante getNombres', (done) =>{
      supertest(app)
        .get('/getNombres')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          const data = res.body.data;
          for (let i = 0; i < data.length; i++) {
            assert(data[i] !== "");
          }
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it ('Los nombres están ordenados al obtenernlos mediante getAlfabeticamente', (done) =>{
      supertest(app)
        .get('/getAlfabeticamente')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          const data = res.body.data;
          for (let i = 1; i < data.length; i++) {
            assert(data[i-1]<= data[i]);
          }
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

  })
  
});


