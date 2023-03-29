/**
 * @file callbacks.js
 * @description Callbacks para el MS Plantilla.
 * Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
 * Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */



// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE-3e0HaAAzK_zWElz_lNuFrDcFizlmo2oIetx',
});

const COLLECTION = "Equitacion_DA"

// CALLBACKS DEL MODELO

/**
 * Función que permite servir llamadas sin importar el origen:
 * CORS significa Cross-Origin Resource Sharing
 * Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
 * @param {*} res Objeto de tipo response 
 * @returns Devuelve el mismo objeto para concatenar varias llamadas al mismo
 */
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}


/**
 * Objeto que contiene las funciones callback para interactuar con el modelo (e.d., la BBDD)
 */
const CB_MODEL_SELECTS = {
    /**
     * Prueba de conexión a la BBDD: devuelve todas las personas que haya en la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    test_db: async (req, res) => {
        try {
            let personas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            res.status(200).json(personas)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
     * Método para obtener solo los nombres de los deportistas de la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    getNombres: async (req, res) => {
    try {
        let deportistas = await client.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection(COLLECTION))),
                q.Lambda("X", q.Select(["data", "nombre"], q.Get(q.Var("X"))))
            )
        )
        CORS(res)
            .status(200)
            .json(deportistas)
    } catch (error) {
        CORS(res).status(500).json({ error: error.description })
    }
    },

    /**
     * Método para obtener solo los nombres de los deportistas de la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    getAlfabeticamente: async (req, res) => {
        try {
            let deportistas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Select(["data", "nombre"], q.Get(q.Var("X"))))
                )
            )
            deportistas.data=deportistas.data.sort()
            CORS(res)
                .status(200)
                .json(deportistas)
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
        
    },

    /**
     * Método para obtener todos los deportistas con su información de la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    getTodosInfo: async (req, res) => {
        try {
            let deportistas = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection(COLLECTION))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            // console.log( deportistas ) // Para comprobar qué se ha devuelto en plantilla
            CORS(res)
                .status(200)
                .json(deportistas)
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    getBuscar: async (req, res) => {
        try {
          // Obtener los valores del formulario
          let nombre = document.getElementById('nombre').value;
          let nacionalidad = document.getElementById('nacionalidad').value;
          let edad = document.getElementById('edad').value;
          let disciplina = document.getElementById('disciplina').value;
      
          // Construir la consulta a la base de datos
          let query = q.Map(
            q.Paginate(
              q.Intersection(
                q.Match(q.Index('nombre'), nombre),
                q.Match(q.Index('nacionalidad'), nacionalidad),
                q.Match(q.Index('edad'), edad),
                q.Match(q.Index('disciplinas'), disciplina)
              )
            ),
            q.Lambda("X", q.Get(q.Var("X")))
          );
      
          // Ejecutar la consulta a la base de datos
          let deportistas = await client.query(query);
      
          // Devolver los resultados
          CORS(res)
            .status(200)
            .json(deportistas);
        } catch (error) {
          console.log(error);
          CORS(res).status(500).json({ error: error.description })
        }
      }, 
}

// CALLBACKS ADICIONALES

/**
 * Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
 */
const CB_OTHERS = {
    /**
     * Devuelve un mensaje indicando que se ha accedido a la home del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    home: async (req, res) => {
        try {
            CORS(res).status(200).json({ mensaje: "Microservicio MS Plantilla: home" });
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

    /**
     * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    acercaDe: async (req, res) => {
        try {
            CORS(res).status(200).json({
                mensaje: "Microservicio Equitacion: acerca de",
                autor: "Carlos Garvín Rubiales",
                email: "cgr00064@red.ujaen.es",
                fecha: "marzo, 2023"
            });
        } catch (error) {
            CORS(res).status(500).json({ error: error.description })
        }
    },

}

// Une todos los callbacks en un solo objeto para poder exportarlos.
// MUY IMPORTANTE: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
//                 el último que haya SOBREESCRIBE a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
