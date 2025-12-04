import { useState, useEffect } from 'react';
import { createCategory, getCategory, updateCategory } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function CategoryForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = async () => {
    try {
      const response = await getCategory(id);
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (error) {
      console.error("Error loading category", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name, description };
    if (id) {
      await updateCategory(id, categoryData);
    } else {
      await createCategory(categoryData);
    }
    navigate('/categories');
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10">
      <h2 className="text-2xl font-bold text-gray-900">{id ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
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
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500" 
          />
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

export default CategoryForm;
