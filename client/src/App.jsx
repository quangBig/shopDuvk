import { useEffect, useState } from 'react'
import { Routes, Route, Router, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import Navbar from './components/Navbar'
import SignipPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import { useUserStore } from './stores/useUserStore'
import { Toaster } from 'react-hot-toast'
import IphonePage from './pages/IphonePage/IphonePage'

import MacPage from './pages/MacPage/MacPage'
import WatchPage from './pages/WatchPage/WatchPage'
import IPadPage from './pages/iPadPage/iPadPage'
import AdminPage from './pages/AdminPage/AdminPage'
import CustormersPage from './pages/AdminPage/CustormersPage'
import CreateProduct from './pages/AdminPage/CreateProduct'
import AllProduct from './pages/AdminPage/AllProduct'
import CartPage from './pages/CartPage/CartPage'
import NotLogin from './pages/NotLogin/NotLogin'
import ProductDetailPage from './pages/DetailProducts/ProductDetailPage'

import ProfileLayout from './layout/ProfileLayout'

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  // const { getCartItems } = useCartStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // useEffect(() => {
  // 	if (!user) return;

  // 	getCartItems();
  // }, [getCartItems, user]);
  return (
    <>

      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          {/* <Route path="about" element={<AboutPage />} /> */}
          <Route path="sign-up" element={!user ? <SignipPage /> : <Navigate to="/" />} />
          <Route path="login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/iPhone" element={<IphonePage />}></Route>
          <Route path="/iPad" element={<IPadPage />}></Route>
          <Route path="/Mac" element={<MacPage />}></Route>
          <Route path="/Watch" element={<WatchPage />}></Route>
          <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/notFound" />} />
          <Route path="/notFound" element={<NotLogin />}></Route>
          <Route path="/profile" element={<ProfileLayout />} />

          <Route path="/detailProduct/:id" element={<ProductDetailPage />}></Route>

        </Route>
        <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/customers-dashboard" element={user?.role === "admin" ? <CustormersPage /> : <Navigate to="/login" />} />
        <Route path="/products/createProducts" element={user?.role === "admin" ? <CreateProduct /> : <Navigate to="/login" />} />\
        <Route path="/products/allProducts" element={user?.role === "admin" ? <AllProduct /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />

    </>
  )
}

export default App
