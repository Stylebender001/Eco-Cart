import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import api from '../../api/axios.js';

function ProductForm({ product, onClose, onSave }) {
  // Rename state to productData to avoid conflict
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 'Clothing',
    carbonFootprint: '',
    stock: '10',
    materials: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || '',
        brand: product.brand || '',
        description: product.description || '',
        price: product.price?.toString() || '', // Convert number to string
        category: product.category || 'Clothing',
        carbonFootprint: product.carbonFootprint?.toString() || '', // Convert number to string
        stock: product.stock?.toString() || '10',
        materials: product.materials?.join(', ') || ''
      });
      
      if (product.image) {
        setImagePreview(product.image);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    setError('');
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Submitting form with data:', productData);
      
      // VALIDATE NUMBERS BEFORE SENDING
      const price = parseFloat(productData.price);
      const carbonFootprint = parseFloat(productData.carbonFootprint);
      const stock = parseInt(productData.stock);

      if (isNaN(price)) {
        throw new Error('Price must be a valid number');
      }
      if (isNaN(carbonFootprint)) {
        throw new Error('Carbon footprint must be a valid number');
      }
      if (isNaN(stock)) {
        throw new Error('Stock must be a valid number');
      }

      // Create FormData object (different name from state)
      const formDataToSend = new FormData();
      
      // Add all fields with proper values
      formDataToSend.append('name', productData.name.trim());
      formDataToSend.append('brand', productData.brand.trim());
      formDataToSend.append('price', price.toString()); // Send as string but already validated
      formDataToSend.append('category', productData.category);
      formDataToSend.append('carbonFootprint', carbonFootprint.toString());
      formDataToSend.append('stock', stock.toString());
      formDataToSend.append('description', productData.description.trim());
      formDataToSend.append('materials', productData.materials.trim());
      
      // Add image if exists
      if (imageFile) {
        console.log('Adding image file:', imageFile.name);
        formDataToSend.append('image', imageFile);
      }

      // Debug what we're sending
      console.log('FormData contents:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value} (type: ${typeof value})`);
      }

      let response;
      if (product) {
        console.log('Updating product:', product._id);
        response = await api.put(`/admin/products/${product._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        console.log('Creating new product');
        response = await api.post('/admin/products', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log('✅ Success!', response.data);
      onSave();
      onClose();
      
    } catch (err) {
      console.error('❌ Error:', err);
      
      let errorMessage = 'Failed to save product';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Image
            </label>
            
            <div className="flex flex-col gap-4">
              <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-full cursor-pointer hover:bg-gray-50">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-gray-600">Click to upload image</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              {!imagePreview && (
                <p className="text-sm text-gray-500">
                  If no image is selected, a default image will be used.
                </p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
                step="0.01"
                required
                disabled={loading}
                placeholder="29.99"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
                required
                disabled={loading}
                placeholder="10"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
                disabled={loading}
              >
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Beauty">Beauty</option>
                <option value="Food">Food</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Carbon Footprint (kg) *
              </label>
              <input
                type="number"
                name="carbonFootprint"
                value={productData.carbonFootprint}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                min="0"
                step="0.1"
                required
                disabled={loading}
                placeholder="2.5"
              />
              <p className="mt-1 text-xs text-gray-500">
                EcoScore will be calculated automatically
              </p>
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Materials
            </label>
            <input
              type="text"
              name="materials"
              value={productData.materials}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Cotton, Recycled plastic, etc. (separate with commas)"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate materials with commas
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Product description..."
              disabled={loading}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;