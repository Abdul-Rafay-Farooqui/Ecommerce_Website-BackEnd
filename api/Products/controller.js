import asyncHandler from "express-async-handler";

import {
  get_product,
  get_product_by_id,
  create_product,
  update_product,
  delete_product,
  get_products_by_category_id,
} from "./services.js";
import { get_category_by_id } from "../Categories/services.js";

const getProduct = asyncHandler(async (req, res) => {
  await get_product()
    .then((product) => {
      res.status(201).json(product);
      return product;
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const getProductById = asyncHandler(async (req, res) => {
  const product_id = req.params.id;

  await get_product_by_id(product_id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Invalid Product Id." });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category_id } = req.body;
  const image = req.file;

  try {
    const category = await get_category_by_id(category_id);
    if (!category) {
      return res.status(401).json({ message: "Invalid Category Id." });
    }
    const product = await create_product(
      image,
      name,
      price,
      description,
      category_id
    );
    return res
      .status(201)
      .json({ message: "Product Added successfully", product: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { image, name, price, description } = req.body;
  try {
    const product = await get_product_by_id(id);
    if (!product) {
      return res.status(401).json({ message: "Invalid Product" });
    }
    const updatedproduct = await update_product(
      product.id,
      image,
      name,
      price,
      description
    );
    res.status(201).json({ message: "Product Updated Successfully" });
    return ProductCategory;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const deleteProductById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const product = await get_product_by_id(id);
    if (!product) {
      return res.status(401).json({ message: "Invalid Category" });
    }
    const deletedProduct = await delete_product(product.id);
    if (deletedProduct > 0) {
      res.status(200).json({ message: "Product deleted Successfully" });
    } else {
      res.status(200).json({ message: "No Product is Deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getProductByCategoryId = asyncHandler(async (req, res) => {
  const category_id = req.params.id;

  try {
    const category = await get_category_by_id(category_id);
    if (!category) {
      return res.status(401).json({ message: "Invalid Category id" });
    }
    const products = await get_products_by_category_id(category_id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export {
  getProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductByCategoryId,
};
