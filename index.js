//como se escriben funciones
function nommbre (parametros) {
    /*
    cuerpo de la función
    definir variables
    ejecutar otras funciones
    operaciones logicas y control de flujo
    las funciones retornan calores
    valor de retorno por defecto siempre es undefined
     
    */
   this // su scopoe hace referencia a lo que hay en el cuerpo de esta funcion. 
   return
}

const funcionflecha = (parametros) => {
    //cuerpo de la funcion
    this //su scope es que hace referencia a su contenedor.
    return
}

// nombre('lol')
// funcionflecha('lol')

/* 
normalmente definimos las funcions con la palabra reservada function para 
mandarlas a llamar más de una vez.

las funcionas flechas pueden ser anónimas y esto nos sirve para no tenerlas que llamar más
de una vez. Es decir que son funciones muy espefíficas.
*/


const express = require('express')

const fs = require('fs')
const { request } = require('http')
const { response } = require('express')

const app = express()

app.use(express.json()) //si un cliente viene con su header de que es un application/json toma ese texto plano y  la peticion parseala como json. 
// es decir que se encarga de pasar el texto a json.Es te middleware es a nivel de aplicacion porque afeta a nivel de toda mi app.
// todos los middlewares reciben 3 parametros dentro de su funcion. request, response, next. Donde el parametro next es una función. 
// next nos sirve para pasarselo al siguiente middleware. Si no se la pasamos se queda colgada la funcion. 
// se ejecutan los middlewares de arriba para abajo. 

app.use((request, response, next) => {
    console.log('soy un middleare a nivel de applicacion')
    next()
})

app.use((request, response, next) => {
    console.log('Soy el segundo middleware a nivel aplicacion')
    next()
})

app.get('/koders', (request, response) => {
    const contenidoDelArchivoKoders = fs.readFileSync('un-archivo.txt', 'utf8')
    response.json({
        succes: true,
        data: contenidoDelArchivoKoders
    })
})

//el request contiene la informacion de la peticion del cliente
//json del body
// los parametros de la url
// metodo de la peticion
// url
// Headers (IP, puntos de acceso, y mucha otra info como el content-type)

app.post('/koders', (request, response, next) => {
    console.log('Soy un middleware a nivel de endpoint POST / koders')
    next()
}, (request, response) => {
    // if(!request.body.name) {
    //     response.json({
    //         success: false,
    //         message: 'El nombre es requerido'
    //     })
    // }

    // if(!request.body.age) {
    //     response.json({
    //         success: false,
    //         message: 'Se requiere una edad'
    //     })
    // }

    const nuevaLinea = `\n${request.body.name}, ${request.body.age}`
    fs.appendFileSync('un-archivo.txt', nuevaLinea, 'utf8')

    response.json({
        success: true,
        message: 'Linea a agregada'
    })
})


app.listen('8080', () => {
    console.log('Server 8080 localhost is listening')
})




