const fs = require("fs");

class Contenedor {
  constructor() {
  }
    async save(message) {
      try{
          const msj = `FechaYHora: ${message.time}, UserName: ${message.username}, Mensaje: ${message.message}\n`;
          await fs.promises.appendFile(`./07entrega/chat.txt`, msj);
          console.log("Mensaje guardado")
      } catch(error) {
          console.log(`Ocurrio el siguiente error al guardar el mensaje: ${error}`)
      }
  }

  async getAll () {
    let listadoMsg = JSON.parse(await fs.promises.readFile(`./${this.archivo}.txt`, 'utf-8'));
    console.log("Listado de mensajes: ", listadoMsg);
    return listadoMsg;
  }
}

module.exports = Contenedor
