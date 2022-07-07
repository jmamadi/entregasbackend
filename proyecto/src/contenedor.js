const fs = require("fs");

class Contenedor {
  constructor(database, idDb) {
    this.database = database;
    this.idDb = idDb;
  }

  async save(objeto, res) {
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );

    try {
      if (!data) {
        let id = JSON.parse(
          await fs.promises.readFile(`./proyecto/src${this.idDb}.txt`, "utf-8")
        );
        let maxID = Math.max(...id);
        objeto.id = maxID + 1;
        id = [...id, objeto.id];
        await fs.promises.writeFile(
          `./proyecto/src${this.idDb}.txt`,
          JSON.stringify(id)
        );

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(objeto)
        );
      } else {
        let id = JSON.parse(
          await fs.promises.readFile(`./proyecto/src/${this.idDb}.txt`, "utf-8")
        );
        let maxID = Math.max(...id);
        objeto.id = maxID + 1;
        id = [...id, objeto.id];
        await fs.promises.writeFile(
          `./proyecto/src/${this.idDb}.txt`,
          JSON.stringify(id)
        );

        let productos = JSON.parse(
          await fs.promises.readFile(
            `./proyecto/src/${this.database}.txt`,
            "utf-8"
          )
        );

        productos.push(objeto);

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(productos)
        );

        res.send("Agregado correctamente");
      }
    } catch (error) {
      console.log("¡error en metodo save!", error);
    }
  }

  async getById(id) {
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );

    try {
      let objeto = data.find((prod) => prod.id == id);
      let resultado = objeto ? objeto : { error: "No existe" };
    
      return resultado;
    } catch (error) {
      console.log("¡error en metodo getById!", error);
    }
  }

  async getAll() {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      return data;
    } catch (error) {
      console.log("¡error desde metodo getAll!", error);
    }
  }

  async deleteById(id, res) {
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );

    try {
      if (data.some((prod) => prod.id == id)) {
        let newData = data.filter((prod) => prod.id != id);

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(newData)
        );
        res.send("Eliminado correctamente");
      } else {
        res.send("id inexistente");
      }
    } catch (error) {
      console.log("¡error desde metodo deleteById!", error);
    }
  }

  async deleteAll() {
    let archivo = await fs.promises.readFile(
      `./proyecto/src/${this.database}.txt`,
      "utf-8"
    );

    try {
      if (!archivo) {
        console.log("archivo inexistente");
      } else {
        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          "[]"
        );
        console.log("Archivos eliminados correctamente");
      }
    } catch (error) {
      console.log("¡error desde metodo deleteAll!", error);
    }
  }

  async updateProduct(product, id, res) {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );
      let index = data.findIndex((x) => x.id == id);

      if (index !== -1) {
        data[index] = product;
        data[index].id = id;

        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
          JSON.stringify(data)
        );

        res.send("Producto actualizado");
      } else {
        res.send("id inexistente");
      }
    } catch (error) {
      console.log("¡error desde metodo PUT!", error);
    }
  }

  async searchByCart(id, res) {
    try {
      let data = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      let objeto = data.find((prod) => prod.id == id);

      objeto !== undefined ? res.send(objeto.products) : res.send("no existe");
    } catch (error) {
      console.log("error base de datos", error);
    }
  }

  async addProductToCart(cartID, productID, res) {
    try {
      let data_product = JSON.parse(
        await fs.promises.readFile(`./proyecto/src/productDB.txt`, "utf-8")
      );
      let data_cart = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      let producto = data_product[data_product.findIndex(x => x.id == productID)]
      
      let cart = data_cart[data_cart.findIndex(x => x.id == cartID)]
      
      cart.products.push(producto);
      
      data_cart = data_cart.filter( x => x.id !== cart.id)
          console.log('data_cart', data_cart)
      data_cart.push(cart);
      console.log('data_cart + objeto', data_cart)

      await fs.promises.writeFile(
        `./proyecto/src/${this.database}.txt`,
        JSON.stringify(data_cart)
      );
      res.send("agregado correctamente");
    } catch (error) {
      console.log("¡error desde metodo addProductToCart!", error);
    }
  }

  async deleteFromCart(cartID, productID, res) {
    try {
      let data_cart = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );

      let cart = data_cart[data_cart.findIndex(x => x.id == cartID)]

      cart.products.splice(cart.products.findIndex(x => x.id == productID), 1)

      data_cart = data_cart.filter((c) => c.id !== cart.id);

      data_cart.push(cart);

      await fs.promises.writeFile(
        `./proyecto/src/${this.database}.txt`,
        JSON.stringify(data_cart)
      );

      res.send(
        `El producto con id ${productID} ha sido eliminado del carrito nro ${cartID}`
      );
    } catch (error) {
      console.log("¡error desde metodo eliminar!", error);
    }
  }

  async addCart(objeto, res) {
    let data = JSON.parse(
      await fs.promises.readFile(`./proyecto/src/${this.database}.txt`, "utf-8")
    );
    
    try {
      let id = JSON.parse(
        await fs.promises.readFile(`./proyecto/src/${this.idDb}.txt`, "utf-8")
      );
      let maxID = Math.max(...id);
      objeto.id = maxID + 1;
      id = [...id, objeto.id];
      await fs.promises.writeFile(
        `./proyecto/src/${this.idDb}.txt`,
        JSON.stringify(id)
      );
      let productos = JSON.parse(
        await fs.promises.readFile(
          `./proyecto/src/${this.database}.txt`,
          "utf-8"
        )
      );
              
      objeto.products = []
            
      productos.push(objeto);
        await fs.promises.writeFile(
          `./proyecto/src/${this.database}.txt`,
            JSON.stringify(productos)
          );
          
      res.send("Agregado correctamente");
            
    } catch (error) {
      console.log("¡error en metodo save!", error);
    }
  }
}


module.exports = Contenedor;
