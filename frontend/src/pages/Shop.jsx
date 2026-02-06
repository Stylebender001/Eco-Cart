import { useState, useEffect } from 'react';
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ProductCard from "../components/home/ProductCard";
import Filters from "../components/shop/Filters";
import api from '../api/axios.js';

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Multiple filters state
  const [filters, setFilters] = useState({
    category: 'All Categories',
    ecoScore: '',
    sortBy: 'featured'
  });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {};
      
      // Category filter
      if (filters.category !== 'All Categories') {
        params.category = filters.category;
      }
      
      // Eco score filter
      if (filters.ecoScore) {
        params.ecoScore = filters.ecoScore;
      }
      
      // Sort
      if (filters.sortBy !== 'featured') {
        params.sort = filters.sortBy;
      }
      
      console.log('Fetching products with params:', params);
      const response = await api.get('/products', { params });
      
      if (response.data.success) {
        setProducts(response.data.products || response.data.data || []);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await api.get('/products/categories/all');
      if (response.data.success) {
        setCategories(response.data.categories || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]); // Re-fetch when filters change

  // Update filter function
  const updateFilter = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle search from navbar if needed
  const handleSearch = (searchTerm) => {
    console.log('Search:', searchTerm);
  };

  // Format products for display
  const formattedProducts = products.map(product => ({
    id: product._id || product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: product.image 
      ? `http://localhost:3000${product.image}` 
      : "http://localhost:3000/uploads/products/default.jpg",
    ecoScore: product.ecoScore || 'C',
    carbonFootprint: product.carbonFootprint || 0,
    materials: product.materials || [],
    category: product.category,
    stock: product.stock,
    description: product.description
  }));

  return (
    <div className="bg-orange-50/50 min-h-screen">
      <Navbar onSearch={handleSearch} />
      
      <section className="py-10 px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="font-serif text-5xl font-semibold mb-3">
            Shop Sustainable
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-500">
            Discover eco-friendly products that make a positive impact on our
            planet. Every purchase helps reduce your carbon footprint.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-10">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchProducts}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success state */}
        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="lg:w-1/4">
              <Filters 
                selectedCategory={filters.category}
                selectedEcoScore={filters.ecoScore}
                onCategoryChange={(cat) => updateFilter('category', cat)}
                onEcoScoreChange={(score) => updateFilter('ecoScore', score)}
                categories={categories}
              />
            </div>

            {/* Products grid */}
            <div className="lg:w-3/4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="text-gray-600 mb-4 md:mb-0">
                  {formattedProducts.length} {formattedProducts.length === 1 ? 'product' : 'products'} found
                  {(filters.category !== 'All Categories' || filters.ecoScore) && (
                    <span className="ml-2 text-sm text-green-600">
                      (filtered)
                    </span>
                  )}
                </div>
                <select 
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value)}
                  className="border py-2 px-4 cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="ecoScore">Best Eco Score</option>
                </select>
              </div>

              {formattedProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600">No products found with current filters.</p>
                  <button
                    onClick={() => {
                      updateFilter('category', 'All Categories');
                      updateFilter('ecoScore', '');
                    }}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formattedProducts.map((product) => (
                    <ProductCard 
                      product={product} 
                      key={product.id} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      
      <Footer />
    </div>
  );
}

export default Shop;