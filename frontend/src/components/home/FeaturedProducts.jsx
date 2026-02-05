import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Organic Cotton T-Shirt",
      brand: "EcoWear",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "2.1kg CO₂",
      materials: ["Organic Cotton", "Plant Dyes", "Recycled"],
      badges: ["Fair Trade"],
    },
    {
      id: 2,
      name: "Bamboo Water Bottle",
      brand: "GreenLife",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      ecoScore: "A",
      carbonFootprint: "0.8kg CO₂",
      materials: ["Bamboo", "Stainless Steel", "BPA Free"],
      badges: ["Plastic Free"],
    },
    {
      id: 3,
      name: "Recycled Yoga Mat",
      brand: "ZenEarth",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "1.5kg CO₂",
      materials: ["Recycled Rubber", "Cork", "Natural Latex"],
      badges: ["Zero Waste"],
    },
    {
      id: 4,
      name: "Hemp Canvas Backpack",
      brand: "NaturePack",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      ecoScore: "A",
      carbonFootprint: "3.2kg CO₂",
      materials: ["Hemp", "Organic Cotton", "Recycled Metal"],
      badges: ["Vegan"],
    },
    {
      id: 5,
      name: "Beeswax Food Wraps",
      brand: "BeeGreen",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?w=400&h=400&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "0.3kg CO₂",
      materials: ["Organic Cotton", "Beeswax", "Jojoba Oil"],
      badges: ["Plastic Free", "Compostable"],
    },
    {
      id: 6,
      name: "Bamboo Cutlery Set",
      brand: "EcoEats",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?w=400&h=400&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "0.4kg CO₂",
      materials: ["Bamboo", "Organic Cotton Pouch"],
      badges: ["Zero Waste"],
    },
    {
      id: 7,
      name: "Solar Power Bank",
      brand: "SunCharge",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      ecoScore: "B",
      carbonFootprint: "5.1kg CO₂",
      materials: ["Recycled Plastic", "Solar Cells"],
      badges: ["Renewable Energy"],
    },
    {
      id: 8,
      name: "Natural Shampoo Bar",
      brand: "PureNature",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "0.2kg CO₂",
      materials: ["Organic Oils", "Essential Oils", "No Plastic"],
      badges: ["Plastic Free", "Vegan"],
    },
  ];
  return (
    <section className="py-20 px-30">
      <div className="px-3 py-1 mb-4 bg-green-700/20 rounded-2xl w-fit">
        Featured Products
      </div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="mb-2 font-serif text-5xl font-semibold">
          Sustainable Bestsellers
        </h2>
        <Link
          to={"/shop"}
          className="flex items-center justify-center gap-3 px-6 py-2 transition-colors duration-300 border rounded-xl hover:border-green-800 hover:text-green-800"
        >
          View All Products{" "}
          <span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-6 grid-row-2">
        {products.map((item) => (
          <ProductCard product={item} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
