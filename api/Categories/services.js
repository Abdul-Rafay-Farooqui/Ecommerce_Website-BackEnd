
import { Category } from "./Categories.js";

  const get_categories = async () =>{
    const categories = await Category.findAll()
    return categories;
  }

  const get_category_by_id = async (category_id) =>{
    const category = await Category.findByPk(category_id)
    return category;
  }

  const create = async (name) =>{
    const category = await Category.create({name})
    return category;
  }


  const update_category = async (category_id, name) => {
    const updatedCategory = await Category.update({name}, {
      where: { id: category_id },
      returning: true,
      plain: true,
    });
  
    return updatedCategory;
  };
  
  const delete_category = async (category_id) => {
    const deleteCategory = await Category.destroy({
      where: { id: category_id },
    });
    return deleteCategory;
  };

  export {
    get_categories,
    get_category_by_id,
    create,
    update_category,
    delete_category,
  };