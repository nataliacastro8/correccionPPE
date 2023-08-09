import { Router } from "express";
import ProductManager from "../ProductManager.js"

const productsRouter = Router();
const productManager = new ProductManager();


productsRouter.get("/", (req, res) => {
    const products = productManager.getProducts();
    let {limit} = req.query;

    res.send ({products:limit ? products.slice (0, limit) : products});
});

productsRouter.get("/:pid", (req, res) => {
    const products = productManager.getProducts();
    let pid = Number(req.params.pid);
  
    res.send({product:products.find(item => item.id === pid) || "Lo sentimos... No se ha encontrado el producto con el id en la base de datos"});
});

productsRouter.post ("/", (req, res) => {
    let {title, description, code, price, status, stock, category, thumbnail } = req.body;

    if(!title){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Title"})
        return false;
    }

    if(!description){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Description"})
        return false;
    }

    if(!code){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Code"})
        return false;
    }

    if(!price){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Price"})
        return false;
    }

    
    status = !status && true;  
    

    if(!stock){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Stock"})
        return false;
    }
    
    if(!category){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Category"})
        return false;
    }

    if(!thumbnail){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Thumbnails"});
        return false;
    }else if ((!Array.isArray(thumbnail)) || (thumbnail.length == 0)){
        res.status(400).send({status:"error", message: "Error debe ingresar al menos una imagen"})
        return false;
    }
    if (productManager.addProduct({title, description, code, price, status, stock, category, thumbnail})) {
        res.send({status:"ok", message: "Producto agregado correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No se cargo el producto"});
    }
        
});

productsRouter.put ("/:pid", (req, res) => {
    let pid = Number(req.params.pid);
    let {title, description, code, price, status, stock, category, thumbnail } = req.body;

    if(!title){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Title"})
        return false;
    }

    if(!description){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Description"})
        return false;
    }

    if(!code){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Code"})
        return false;
    }

    if(!price){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Price"})
        return false;
    }

    status = !status && true; 
    
    if(!stock){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Stock"})
        return false;
    }
    
    if(!category){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Category"})
        return false;
    }

    if(!thumbnail){
        res.status(400).send({status:"error", message: "Error! No se cargo el campo Thumbnails"})
        return false;
    }else if ((!Array.isArray(thumbnail)) || (thumbnail.length == 0)){
        res.status(400).send({status:"error", message: "Error debe ingresar al menos una imagen"})
        return false;
    }
    if (productManager.updateProduct(pid, {title, description, code, price, status, stock, category, thumbnail})) {
        res.send({status:"ok", message: "Producto actualizado correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No se actualizo el producto"});
    }
        
});

productsRouter.delete ("/:pid", (req, res) => {
    let pid = Number(req.params.pid);

    if (productManager.deleteProduct(pid)) {
        res.send({status:"ok", message: "Producto eliminado correctamente"});
    } else {
        res.status(500).send({status:"error", message: "Error! No existe el producto que se quiere eliminar"});
    }

});


export default productsRouter;