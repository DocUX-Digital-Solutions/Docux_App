import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Recording from '../pages/Recording'
import RouteHandler from '../components/routes/RouteHandler'
import LoadingSpinner from '../components/common/LoadingSpinner'
import Summary from '../pages/Summary'
import CaseSubmitted from '../pages/CaseSubmitted'

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<RouteHandler />}>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/recording" element={<Recording />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/case-submitted" element={<CaseSubmitted />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} />  // todo add page for 404 */}
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
