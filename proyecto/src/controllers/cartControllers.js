const Contenedor = require("../contenedor");
const cart_C = new Contenedor("cartDB", "cartIds");

const addCart = async (cart, res) => {
  try {
    await cart_C.addCart(cart, res);
  } catch (error) {
    console.log("Error:", error);
  }
};

const getAll = async (res) => {
  try {
    res.send(await cart_C.getAll());
  } catch (error) {
    console.log("Error:", error);
  }
};

const deleteById = async (req, res) => {
  try {
    await cart_C.deleteById(req.params.id, res);
  } catch (error) {
    console.log("Error:", error);
  }
};

const searchByCart = async (req, res) => {
  try {
    await cart_C.searchByCart(req.params.id, res);
  } catch (error) {
    console.log("Error:", error);
  }
};

const addProductToCart = async (req, res) => {
  try {
    await cart_C.addProductToCart(req.params.id, req.body.id, res);
  } catch (error) {
    console.log("Error:", error);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    await cart_C.deleteFromCart(req.params.id, req.params.id_prod, res);
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = {
  addCart,
  getAll,
  deleteById,
  searchByCart,
  addProductToCart,
  deleteFromCart,
};
