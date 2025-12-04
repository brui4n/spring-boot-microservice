import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="p-6 container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-900">Productos</h2>
        <Link to="/products/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
          + Agregar Producto
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-semibold text-green-600">${product.price}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Cant: {product.quantity}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">Almacén: {product.warehouse}</p>
              <div className="flex justify-end space-x-3">
                <Link to={`/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-800 font-medium">Editar</Link>
                <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
