function ProductCard({ product }) {
  const { image, brand, carbonFootprint, materials, name, price } = product;
  return (
    <div className="overflow-hidden border border-gray-500/50 rounded-xl group hover:shadow-xl">
      <div className="overflow-hidden h-80 w-80">
        <img
          src={image}
          className="block object-cover w-full h-full transition-transform duration-300 ease-out rounded-t-xl group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="mb-2 text-sm font-semibold text-gray-400">{brand}</div>
        <div className="mb-2 font-serif text-lg font-semibold">{name}</div>
        <div className="mb-2 text-sm text-green-700">{carbonFootprint}</div>
        <div className="flex gap-2 mb-2">
          {materials.map((item) => (
            <div className="px-2 py-1 text-[12px] bg-green-700/20 rounded-xl">
              {item}
            </div>
          ))}
        </div>
        <div className="font-serif text-lg font-semibold">${price}</div>
      </div>
    </div>
  );
}

export default ProductCard;
