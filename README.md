[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10404743&assignment_repo_type=AssignmentRepo)

# Datos personales.

### Carlos Garvín Rubiales
- **Correo**: cgr00064@red.ujaen.es
- **Trello**: https://trello.com/b/OLkFbBiE/pr%C3%A1ctica-3-d%C3%A1gil
- **Para ver la implementación abrir en el navegador la URL**: http://localhost:8000
- **Código aplicación de ejemplo**: https://github.com/UJA-Desarrollo-Agil/descripcion-proyecto-microservicios-personas-proyectos
- **Video de la explicación**: https://youtu.be/Euh2YLOad6Q 
- **Vídeo sobre cómo usar el depurador de código con JavaScript**: https://www.youtube.com/watch?v=qWM86MDluM4

# *Plantilla Práctica Microservicios*: descripción de la aplicación.

Este código que se presenta aquí corresponde a la plantilla para realizar un desarrollo basado en microservicios para las prácticas de Desarrollo Ágil, para el curso 2022-2023.


## Arquitectura de la aplicación.

La aplicación funciona gracias a la colaboración de **tres aplicaciones distintas** (en realidad, tres servidores web implementados con [Express ↗️](https://expressjs.com/) para [Node.js ↗️](https://nodejs.org/en/)).

![Esquema de comunicación entre las distintas aplicaciones ](./assets/img/esquema-comunicacion-apps.png) 

*Esquema de comunicación entre las distintas aplicaciones.* &#8593;

Como se puede observar, esta aplicación plantilla está formada por las siguientes aplicaciones web:
* Aplicación *front-end*: servidor para la página web
* Aplicación *api-gateway*: enrutador de peticiones a microservicios
* Aplicación *ms-plantilla*: microservicio

Se respetan siempre las siguientes reglas básicas:
1. El usuario solo interactúa con la aplicación *front-end*
2. La aplicación *front-end* solo interactúa con la aplicación *api-gateway*
3. La aplicación *api-gateway* recibe peticiones de *front-end* y las deriva al microservicio correspondiente. Dicho microservicio resuelve la petición y envía el resultado a la aplicación *front-end* a través de *api-gateway*
4. Los microservicios interactúan con una BBDD y con *api-gateway* y también entre ellos. 
5. En el caso de haber varios microservicios, cada uno de ellos puede interactuar con una BBDD distinta. Además, los microservicios pueden interactuar directamente entre ellos.

## Trello.

### Tablero al inicio.
Primeras tres HU a implementar
<img src='./assets/img/Inicio-Trello.png'>

### Ejemplo descripción de como se han realizado las HU.
<img src='./assets/img/Ejemplo-descripcion-HU.png'>

## Fauna.

### Home de fauna
<img src='./assets/img/Home-fauna.png'>

### Página donde aparece la base de datos
<img src='./assets/img/BBDD.png'>

### Página donde aparece la colección
<img src='./assets/img/Coleccion.png'>

### Los campos a tener en cuenta para realizar la base de datos son:
- **Nombre** (cadena de texto)
_ **Apellido** (cadena de texto)
- **Fecha de nacimiento** (campo compuesto formado por día, mes y año)
- **Nacionalidad** (cadena de texto)
- **Edad** (número entero)
- **Disciplinas** (vector de disciplinas en las que participa el jinete)
- **Caballos** (vector de caballos que monta el jinete)
- **Años de participación en juegos olímpicos** (vector de años en los que el jinete ha participado en los juegos olímpicos)

### Documentos de la colección en formato JSON
```
{
"Nombre": "Juan",
"Apellido": "Pérez",
"Fecha de nacimiento": {"Día": 1, "Mes": 1, "Año": 1990},
"Nacionalidad": "Española",
"Edad": 33,
"Disciplinas": ["Salto", "Doma", "Concurso completo"],
"Caballos": ["Alazán", "Capricho", "Milagrosa"],
"Años de participación en juegos olímpicos": [2012, 2016]
}
```
```
{
"Nombre": "Julia",
"Apellido": "García",
"Fecha de nacimiento": {"Día": 15, "Mes": 7, "Año": 1985},
"Nacionalidad": "Española",
"Edad": 38,
"Disciplinas": ["Doma", "Vaquera"],
"Caballos": ["Negro", "Estrella"],
"Años de participación en juegos olímpicos": [2008, 2012, 2016]
}
```
```
{
"Nombre": "Ana",
"Apellido": "González",
"Fecha de nacimiento": {"Día": 30, "Mes": 4, "Año": 1995},
"Nacionalidad": "Argentina",
"Edad": 29,
"Disciplinas": ["Salto", "Doma"],
"Caballos": ["Rubio", "Canela", "Palomo"],
"Años de participación en juegos olímpicos": [2020]
}
```
```
{
"Nombre": "Daniel",
"Apellido": "Torres",
"Fecha de nacimiento": {"Día": 25, "Mes": 9, "Año": 1980},
"Nacionalidad": "Colombiana",
"Edad": 43,
"Disciplinas": ["Concurso completo", "Vaquera"],
"Caballos": ["Blanco", "Marrón"],
"Años de participación en juegos olímpicos": [2004, 2008, 2012, 2016]
}
```
```
{
"Nombre": "Sophie",
"Apellido": "Martin",
"Fecha de nacimiento": {"Día": 3, "Mes": 12, "Año": 1998},
"Nacionalidad": "Francesa",
"Edad": 25,
"Disciplinas": ["Doma", "Salto"],
"Caballos": ["Mistral", "Mocca"],
"Años de participación en juegos olímpicos": []
}
```
```
{
"Nombre": "Alexis",
"Apellido": "Johnson",
"Fecha de nacimiento": {"Día": 11, "Mes": 6, "Año": 1989},
"Nacionalidad": "Estadounidense",
"Edad": 34,
"Disciplinas": ["Salto", "Concurso completo"],
"Caballos": ["Rocinante", "Don Quijote", "Sancho Panza"],
"Años de participación en juegos olímpicos": [2012, 2016, 2020]
}
```
```
{
"Nombre": "María",
"Apellido": "Fernández",
"Fecha de nacimiento": {"Día": 20, "Mes": 2, "Año": 1992},
"Nacionalidad": "Española",
"Edad": 31,
"Disciplinas": ["Vaquera", "Doma"],
"Caballos": ["Fuego", "Relámpago", "Trueno"],
"Años de participación en juegos olímpicos": []
}
```
```
{
"Nombre": "Joaquín",
"Apellido": "Rodríguez",
"Fecha de nacimiento": {"Día": 18, "Mes": 10, "Año": 1993},
"Nacionalidad": "Mexicana",
"Edad": 28,
"Disciplinas": ["Doma", "Salto"],
"Caballos": ["Golondrina", "Azul", "Verde"],
"Años de participación en juegos olímpicos": [2016, 2020]
}
```
```
{
"Nombre": "Anna",
"Apellido": "Schmidt",
"Fecha de nacimiento": {"Día": 7, "Mes": 8, "Año": 1996},
"Nacionalidad": "Alemana",
"Edad": 27,
"Disciplinas": ["Salto", "Concurso completo"],
"Caballos": ["Lucky", "Star"],
"Años de participación en juegos olímpicos": [2016, 2020]
}
```
```
{
"Nombre": "Luis",
"Apellido": "García",
"Fecha de nacimiento": {"Día": 1, "Mes": 5, "Año": 1985},
"Nacionalidad": "Española",
"Edad": 38,
"Disciplinas": ["Vaquera", "Doma"],
"Caballos": ["Cruzcampo", "Alcázar"],
"Años de participación en juegos olímpicos": []
}
```

### Contraseña secreta

fnAE-3e0HaAAzK_zWElz_lNuFrDcFizlmo2oIetx

Que se ha añadido en el fichero **callbacks.ks** del directorio *ms-plantilla* de la siguiente manera:
```
const client = new faunadb.Client({
    secret: 'fnAE-3e0HaAAzK_zWElz_lNuFrDcFizlmo2oIetx',
});
```

# Historias de Ususario.
Ir implementando cada una de las HU seleccionadas hasta que todas estén en la lista DONE. 

Muy importante: cuando se pase una tarjeta a la lista DONE debes añadirle al menos una captura de pantalla como evidencia de que efectivamente se ha quedado realizada la HU. Esta captura de pantalla puede ser de la interfaz de la aplicación (si es que es una funcionalidad que afecta a la interfaz), o de la interfaz de Fauna, o del IDE con el que se está programando (si es un trozo de código), etc. Es decir: una evidencia que muestre que dicha HU está realmente realizada.

HU implementadas, captura de pantalla de Trello al comienzo y al final del incremento, y capturas de pantalla del funcionamiento de la aplicación con las funcionalidades que se han implementado.

## 01. 01. Ver la información del autor/autora de la aplicación al pulsar en el botón “Acerca de” (Puntuación 0.1)
### Inicio tablero de Trello:
<img src='./assets/img/Inicio-H1.png'>

### Para la realización de esta HU se han seguido los siguientes pasos:
1. En el archivo **callbacks.js** del directorio *ms-plantilla* he añadido mis datos personales en los campos autor, email y fecha.
```
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
```
### Test
<img src='./assets/img/Test-H1.png'>

```
it('Devuelve MS Plantilla Acerca De', (done) => {
    supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
            //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
            assert(res.body.hasOwnProperty('mensaje'));
            assert(res.body.mensaje === "Microservicio Equitacion: acerca de");
        })
        .end((error) => { error ? done.fail(error) : done() })
});
```

<img src='./assets/img/Readme-H1.png'>

El resultado sería el siguiente:
<img src='./assets/img/HU_01.png'>

<img src='./assets/img/Final-H1.png'>
