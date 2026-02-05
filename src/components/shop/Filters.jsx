import { Filter } from "lucide-react";
import { useState } from "react";

function Filters() {
  const [category, setCategory] = useState("All Categories");
  const categories = [
    "All Categories",
    "Clothing",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Bags & Accesories",
    "Electornics",
  ];
  const ecoScore = ["A+", "A", "B", "C"];
  return (
    <div className="py-4 px-8 max-w-xl border bg-white rounded-xl border-green-800/20  h-fit">
      <div className="flex gap-2  mb-5  items-center">
        <Filter className="w-5 h-5" />
        <h2 className="text-lg font-serif font-semibold">Filter</h2>
      </div>
      <div className="mb-2 font-semibold font-serif">Categories</div>
      <div className="px-2 mb-5 space-y-3">
        {categories.map((item, index) => (
          <div
            key={index}
            className={` p-2 rounded-xl cursor-pointer ${
              item === category
                ? "bg-green-800/80 text-white"
                : "hover:bg-green-700/10"
            }`}
            onClick={() => setCategory(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="mb-2 font-semibold font-serif">Eco Score</div>
      <div className="px-2 space-y-3">
        {ecoScore.map((item, index) => (
          <div key={index} className="flex item-center gap-2 px-2">
            <input type="checkbox" className="rounded-full" />
            <div>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
