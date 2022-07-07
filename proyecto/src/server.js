const express = require('express');
const app = express();
const rutas = require('./routes/index.js')
const port = process.env.port || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`)
});

app.get('/', (req, res) => {
    res.send('Don Cafetero')
})

app.use('/api', rutas)