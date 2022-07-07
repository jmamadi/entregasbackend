const { Router } = require("express");
const router = Router();
const {
  addCart,
  getAll,
  deleteById,
  searchByCart,
  addProductToCart,
  deleteFromCart,
} = require("../controllers/cartControllers");

const isAdmin = (admin)=>{
  return ((req,res,next)=>{
    if (admin === true){
      next();
    } else{
      res.send('Acceso denegado')
    }
  })
}

router.get("/",isAdmin(true), (req, res) => {
  getAll(res);
});

router.post("/", (req, res) => {
  addCart(req.body, res);
});

router.delete("/:id",isAdmin(true), (req, res) => {
  deleteById(req, res);
});

router.get("/:id/productos",isAdmin(true), (req, res) => {
  searchByCart(req, res);
});

router.post("/:id/productos", (req, res) => {
  addProductToCart(req, res);
});

router.delete("/:id/productos/:id_prod", (req, res) => {
  deleteFromCart(req, res);
});


module.exports = router;
