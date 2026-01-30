import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      category,
      grade,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 12,
      sort = "grade",
    } = req.query;

    let query = {};

    // Filters
    if (category) query.category = category;
    if (grade) query.ecoScoreGrade = grade;

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search
    const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (search) {
      const safeSearch = escapeRegex(search);

      query.$or = [
        { name: { $regex: safeSearch, $options: "i" } },
        { brand: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Sort logic
    let sortOrder = {};
    switch (sort) {
      case "price_asc":
        sortOrder = { price: 1 };
        break;
      case "price_desc":
        sortOrder = { price: -1 };
        break;
      case "carbon_asc":
        sortOrder = { carbonFootprint: 1 };
        break;
      case "newest":
        sortOrder = { createdAt: -1 };
        break;
      default: // grade (A+ first)
        sortOrder = { ecoScoreGrade: 1 };
    }

    // Get products with raw data
    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit))
      .sort(sortOrder)
      .select("-__v");

    const total = await Product.countDocuments(query);

    // Return pure raw data
    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;
