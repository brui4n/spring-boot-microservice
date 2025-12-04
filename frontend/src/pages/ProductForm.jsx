import { useState, useEffect } from 'react';
import { createProduct, getCategories, getProduct, updateProduct } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadCategories();
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories", error);
    }
  };

  const loadProduct = async () => {
    try {
      const response = await getProduct(id);
      const product = response.data;
      setName(product.name);
      setPrice(product.price);
      setQuantity(product.quantity);
      setWarehouse(product.warehouse);
      setCategoryId(product.categoryId);
    } catch (error) {
      console.error("Error loading product", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { 
      name, 
      price: parseFloat(price), 
      quantity: parseInt(quantity), 
      warehouse, 
      categoryId: parseInt(categoryId) 
    };

    if (id) {
      await updateProduct(id, productData);
    } else {
      await createProduct(productData);
    }
    navigate('/products');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-gray-900">{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Almacén</label>
          <input 
            type="text" 
            value={warehouse} 
            onChange={(e) => setWarehouse(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select 
            value={categoryId} 
            onChange={(e) => setCategoryId(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" 
            required
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {id ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
