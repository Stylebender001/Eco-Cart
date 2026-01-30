import express from "express";
import cors from "cors";
import productRoutes from "../src/routes/productRoutes.js";

export default function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/products", productRoutes);
}
