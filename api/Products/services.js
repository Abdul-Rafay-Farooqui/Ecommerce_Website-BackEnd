
import { Category } from "../Categories/Categories.js";
import { Product } from "./Products.js";

  const get_product = async () =>{
    const product = await Product.findAll()
    return product;
  }

  const get_product_by_id = async (product_id) =>{
    const product = await Product.findByPk(product_id)
    return product;
  }

  const create_product = async (image,name,price,description,category_id) =>{
    const product = await Product.create({
        image,
        name,
        price,
        description,
        category_id
    })
    return product;
  }


  const update_product = async (product_id, image,name,price,description ) => {
    const updatedProduct = await Product.update({image,name,price,description}, {
      where: { id: product_id },
      returning: true,
      plain: true,
    });
  
    return updatedProduct;
  };
  
  const delete_product = async (product_id) => {
    const deleteproduct = await Product.destroy({
      where: { id: product_id },
    });
    return deleteproduct;
  };

  const get_products_by_category_id = async (category_id) =>{
    const products = await Product.findAll({where: {category_id}})
    return products;
}

  export {
    get_product,
    get_product_by_id,
    create_product,
    update_product,
    delete_product,
    get_products_by_category_id
  };