import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ProductCard from "../components/home/ProductCard";
import Filters from "../components/shop/Filters";

function Shop() {
  const allProducts = [
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
      category: "Clothing",
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
      category: "Home & Kitchen",
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
      category: "Sports & Outdoors",
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
      category: "Bags & Accessories",
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
      category: "Home & Kitchen",
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
      category: "Home & Kitchen",
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
      category: "Electronics",
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
      category: "Beauty & Personal Care",
    },
    {
      id: 9,
      name: "Recycled Denim Jacket",
      brand: "ReThread",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
      ecoScore: "A",
      carbonFootprint: "4.2kg CO₂",
      materials: ["Recycled Denim", "Organic Cotton"],
      badges: ["Upcycled"],
      category: "Clothing",
    },
    {
      id: 10,
      name: "Reusable Produce Bags",
      brand: "GreenMesh",
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "0.5kg CO₂",
      materials: ["Organic Cotton Mesh", "Recycled Labels"],
      badges: ["Zero Waste", "Plastic Free"],
      category: "Home & Kitchen",
    },
    {
      id: 11,
      name: "Coconut Bowl Set",
      brand: "IslandCraft",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
      ecoScore: "A+",
      carbonFootprint: "0.6kg CO₂",
      materials: ["Reclaimed Coconut Shells", "Coconut Oil Polish"],
      badges: ["Handcrafted", "Upcycled"],
      category: "Home & Kitchen",
    },
    {
      id: 12,
      name: "Organic Linen Dress",
      brand: "NaturalThreads",
      price: 74.99,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
      ecoScore: "A",
      carbonFootprint: "2.8kg CO₂",
      materials: ["Organic Linen", "Natural Dyes"],
      badges: ["Fair Trade", "Vegan"],
      category: "Clothing",
    },
  ];

  // const filteredProducts = useMemo(() => {
  //   let result = [...allProducts];

  //   // Category filter
  //   if (selectedCategory !== "All Categories") {
  //     result = result.filter((p) => p.category === selectedCategory);
  //   }

  //   // Eco score filter
  //   if (selectedEcoScores.length > 0) {
  //     result = result.filter((p) => selectedEcoScores.includes(p.ecoScore));
  //   }

  //   // Price filter
  //   result = result.filter(
  //     (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
  //   );

  //   // Sorting
  //   switch (sortBy) {
  //     case "price-low":
  //       result.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-high":
  //       result.sort((a, b) => b.price - a.price);
  //       break;
  //     case "eco-score":
  //       const scoreOrder = { "A+": 0, A: 1, B: 2, C: 3 };
  //       result.sort((a, b) => scoreOrder[a.ecoScore] - scoreOrder[b.ecoScore]);
  //       break;
  //     default:
  //       break;
  //   }

  //   return result;
  // }, [selectedCategory, selectedEcoScores, priceRange, sortBy]);

  return (
    <div className="bg-orange-50/50">
      <Navbar />
      <section className="py-10 ">
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl font-semibold mb-3">
            Shop Sustainable
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-500">
            Discover eco-friendly products that make a positive impact on our
            planet. Every purchase helps reduce your carbon footprint.
          </p>
          {/* <div>
            <input
            placeholder="Search..."
            className="px-4 py-2 border w-150 rounded-xl focus:outline-3 focus:placeholder:text-green-700 focus:outline-green-700 focus:border-none "
            />
          </div> */}
        </div>
        <div className="flex gap-10 justify-center ">
          <Filters />
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>{allProducts.length} products</div>
              <select className="border py-2 flex justify-center items-center px-2 cursor-pointer rounded-xl">
                <option>Featured</option>
                <option>Price: High to Low</option>
                <option>Price: Low to High</option>
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {allProducts.map((item, index) => (
                <ProductCard product={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Shop;
