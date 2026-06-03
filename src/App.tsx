import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Loader from '@/components/ui/loader'

const Layout          = lazy(() => import('./components/layout/Layout'))
const Dashboard       = lazy(() => import('./pages/Dashboard'))
const ProductList     = lazy(() => import('./pages/ProductList'))
const CreateProduct   = lazy(() => import('./pages/CreateProduct'))
const ProductDetail   = lazy(() => import('./pages/ProductDetail'))
const EditProduct     = lazy(() => import('./pages/EditProduct'))
const AssetLibrary    = lazy(() => import('./pages/AssetLibrary'))
const AssetDetail     = lazy(() => import('./pages/AssetDetail'))
const Login           = lazy(() => import('./pages/Login'))
const NotFound        = lazy(() => import('./pages/NotFound'))
const ProtectedRoute  = lazy(() => import('./components/authentication/ProtectedRoute'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"          element={<Dashboard />} />
            <Route path="products"           element={<ProductList />} />
            <Route path="products/create"    element={<CreateProduct />} />
            <Route path="products/edit"      element={<EditProduct />} />
            <Route path="products/:id"       element={<ProductDetail />} />
            <Route path="products/:id/edit"  element={<EditProduct />} />
            <Route path="assets"             element={<AssetLibrary />} />
            <Route path="assets/:id"         element={<AssetDetail />} />
            <Route path="*"                  element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster richColors position="top-right" theme="light" />
    </>
  )
}
