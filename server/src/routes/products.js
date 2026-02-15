import Router from "express";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { products } from "../db/schema.js";
import { nanoid } from "nanoid";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const allProducts = await db.select().from(products);
    res.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { product, inPrice, price, unit, inStock, description } = req.body;

    const errors = [];

    if (!product || product.trim() === "") {
      errors.push("Product/Service name is required");
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      errors.push("Valid sale price is required");
    }

    if (
      !unit ||
      !["piece", "set", "kilogram", "meter", "liter"].includes(unit)
    ) {
      errors.push("Valid unit is required");
    }

    if (inPrice && (isNaN(inPrice) || parseFloat(inPrice) < 0)) {
      errors.push("In price must be a valid number");
    }

    if (inStock && (isNaN(inStock) || parseInt(inStock) < 0)) {
      errors.push("In stock must be a valid number");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const id = nanoid(7);
    const newProduct = {
      id,
      name: product.trim(),
      inPrice: inPrice ? inPrice.toString() : "0",
      price: price.toString(),
      inStock: inStock ? parseInt(inStock) : 0,
      unit,
      description: description ? description.trim() : "",
    };

    await db.insert(products).values(newProduct);

    res.status(201).json({
      ...newProduct,
      articleNo: id,
      product: newProduct.name,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product, inPrice, price, unit, inStock, description } = req.body;

    const errors = [];

    if (!product || product.trim() === "") {
      errors.push("Product/Service name is required");
    }

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      errors.push("Valid sale price is required");
    }

    if (
      !unit ||
      !["piece", "set", "kilogram", "meter", "liter"].includes(unit)
    ) {
      errors.push("Valid unit is required");
    }

    if (inPrice && (isNaN(inPrice) || parseFloat(inPrice) < 0)) {
      errors.push("In price must be a valid positive number");
    }

    if (inStock && (isNaN(inStock) || parseInt(inStock) < 0)) {
      errors.push("In stock must be a valid positive number");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const existingProduct = await db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!existingProduct || existingProduct.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = {
      name: product.trim(),
      inPrice: inPrice ? inPrice.toString() : "0",
      price: price.toString(),
      inStock: inStock ? parseInt(inStock) : 0,
      unit,
      description: description ? description.trim() : "",
    };

    await db.update(products).set(updatedProduct).where(eq(products.id, id));

    res.status(200).json({
      message: "Product updated successfully",
      product: {
        id,
        ...updatedProduct,
        articleNo: id,
        product: updatedProduct.name,
      },
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

export default router;
