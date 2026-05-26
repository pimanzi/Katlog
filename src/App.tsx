import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/ProductList'
import CreateProduct from './pages/CreateProduct'
import ProductDetail from './pages/ProductDetail'
import EditProduct from './pages/EditProduct'
import AssetLibrary from './pages/AssetLibrary'
import AssetDetail from './pages/AssetDetail'
import ReviewQueue from './pages/ReviewQueue'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit" element={<EditProduct />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="products/:id/edit" element={<EditProduct />} />
        <Route path="assets" element={<AssetLibrary />} />
        <Route path="assets/:id" element={<AssetDetail />} />
        <Route path="review-queue" element={<ReviewQueue />} />
      </Route>
    </Routes>
  )
}
