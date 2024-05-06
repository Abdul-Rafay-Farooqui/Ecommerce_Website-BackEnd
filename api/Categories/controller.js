import asyncHandler from "express-async-handler";

import {
    get_categories,
    get_category_by_id,
    create,
    update_category,
    delete_category,
  } from "./services.js";
  import { Categories } from "./Categories.js";
    
const getCategories = asyncHandler(async (req, res) => {
      await get_categories()
        .then((category) => {
            return category;
        })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
  const getCategoryById = asyncHandler(async (req, res) => {
    const category_id = req.params.id;
  
    await get_category_by_id(category_id)
      .then((category) => {
        if (category) {
          res.status(200).json(category);
        } else {
          res.status(404).json({ error: "Invalid Category Id." });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
  
  const createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body;
    try {
        const category = await create(name);
        return category;
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

const updateCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    try {
        const category = await get_category_by_id(id);
        if(!category)
            {
                return res.status(401).json({message: "Invalid Category"});
            }
        const updatedCategory = await update_category(category.id, name)
        return updatedCategory[1];
    } catch (error) {
        res.status(500).json({error: error.message});
    }

  });
  
  const deleteCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const category = await get_category_by_id(id);
        if(!category)
            {
                return res.status(401).json({message: "Invalid Category"});
            }
        const deletedCategory = await delete_category(category.id)
            if(deletedCategory > 0)
                {
                    res.status(200).json({message: "Category deleted Successfully"})
                }
            else{
                res.status(200).json({message: "No Category is Deleted"})
            }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
  });

  export {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
  };