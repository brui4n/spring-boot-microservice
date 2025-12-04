import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryList from './pages/CategoryList';
import CategoryForm from './pages/CategoryForm';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <nav className="bg-slate-900 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="font-bold text-xl text-white tracking-tight">MicroStore</Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="border-transparent text-gray-300 hover:bg-slate-800 hover:text-white inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Inicio
                  </Link>
                  <Link to="/categories" className="border-transparent text-gray-300 hover:bg-slate-800 hover:text-white inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Categorías
                  </Link>
                  <Link to="/products" className="border-transparent text-gray-300 hover:bg-slate-800 hover:text-white inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                    Productos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/new" element={<CategoryForm />} />
            <Route path="/categories/edit/:id" element={<CategoryForm />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
