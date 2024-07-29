import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/user/Dashboard';
import { PrivateRoute } from './components/routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import { AdminRoute } from './components/routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import SingleCategory from './pages/SingleCategory';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';


function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path='/' index element={<HomePage />} />
          <Route path='/product/:slug' element={<ProductDetails />} />
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/category/:slug' element={<SingleCategory />} />
          <Route path='/about' element={<About />} />
          <Route path='/dashboard' element={<PrivateRoute />} >
            <Route path='user' element={<Dashboard />} />
            <Route path='user/profile' element={<Profile />} />
            <Route path='user/orders' element={<Orders />} />
          </Route>
          <Route path='/dashboard' element={<AdminRoute />}>
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/create-category' element={<CreateCategory />} />
            <Route path='admin/users' element={<Users />} />
            <Route path='admin/products' element={<Products />} />
            <Route path='admin/create-product' element={<CreateProduct />} />
            {/* <Route path='admin/update-product/:slug' element={<CreateProduct />} /> */}
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path='admin/orders' element={<AdminOrders />} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Layout >
    </div>
  );
}

export default App;
