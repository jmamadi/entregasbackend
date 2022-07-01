const express = require('express')
const app = express()
const path = require('path')
const { Server: IOServer } = require('socket.io')
const expressServer = app.listen(8080, () => console.log(`escuchando en puerto 8080`))
const io = new IOServer(expressServer)

const fs = require("fs");
const { Router } = require('express');
const router = Router();
const arrayMsj = []

const Contenedor = require('./class.js');
let chat = new Contenedor;

const products = [{
        title: "Cafe Brasilero",
        price: 1900,
        thumbnail: "https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_2.png",
        id: 1
    },
    {
        title: "Cafe Colombiano",
        price: 1500,
        thumbnail: "https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_1.png",
        id: 2
    },
    {
        title: "Cafe Hindú",
        price: 2000,
        thumbnail: "https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_4.png",
        id: 3
    }
]

app.use(express.static(path.join(__dirname, './public')))

io.on('connection', async socket => {
    console.log('Se conecto un usuario nuevo', socket.id)
    socket.emit('server:products', products)

    socket.on('client:product', async product => {
        products.push(product)
        io.emit('server:product', product)
    })

    socket.emit('server:msgs', arrayMsj);
    socket.on('client:msg', msgInfo => {
        arrayMsj.push(msgInfo);
        chat.save(msgInfo);
        io.emit('server:msgs', arrayMsj)
    })

    socket.on('cliente:typing', typeValue => {
    socket.broadcast.emit('server:typing', typeValue)
    })
})
