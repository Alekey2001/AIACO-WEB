import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar }      from './components/layout/Navbar.jsx'
import { Footer }      from './components/layout/Footer.jsx'
import { Hero }        from './components/sections/Hero.jsx'
import { Technology }  from './components/sections/Technology.jsx'
import { Services }    from './components/sections/Services.jsx'
import { Portfolio }   from './components/sections/Portfolio.jsx'
import { Contact }     from './components/sections/Contact.jsx'
import SitiosWeb       from './pages/SitiosWeb.jsx'
import Contabilidad    from './pages/Contabilidad.jsx'
import Youtube from './pages/Youtube.jsx'

// ── AUTH/SUPABASE: imports sin uso mientras las rutas están deshabilitadas — reactivar junto con App.jsx ──
// import Login from './pages/Login.jsx'
// import Register from './pages/Register.jsx'
// import Profile from './pages/Profile.jsx'
// import ProtectedRoute from './auth/ProtectedRoute.jsx'
// import Panel from './pages/Panel.jsx'
// import RoleGuard from './auth/RoleGuard.jsx'
// import ContentManager from './pages/admin/ContentManager.jsx'
// import {
//   PERMISSIONS,
// } from './auth/permissions.js'

// import UsersManager from './pages/admin/UsersManager.jsx'
// import AccountingContentManager from './pages/admin/AccountingContentManager.jsx'
function Home() {
  return (
    <>
      <Hero />
      <Technology />
      <Services />
      <Portfolio />
      <Contact />
    </>
  )
}

function Layout() {
  const location = useLocation()
  const isHome   = location.pathname === '/'
  return (
    <>
      {isHome && <Navbar />}
      <main>

<Routes>
  <Route path="/"             element={<Home />}         />
  <Route path="/sitios-web"   element={<SitiosWeb />}    />
  <Route path="/contabilidad" element={<Contabilidad />} />
  <Route path="/youtube" element={<Youtube />} />

  {/* ── AUTH/SUPABASE: pendiente de conectar backend — rutas deshabilitadas temporalmente ──
      Reactivar cuando Supabase esté listo. No borrar. */}
  {/*
  <Route path="/login" element={<Login />} />
  <Route path="/register"element={<Register />}/>
  <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute>}/>
  <Route path="/panel"element={<ProtectedRoute><Panel /></ProtectedRoute> }/>
  <Route path="/admin/users"element={<ProtectedRoute><RoleGuard permission={PERMISSIONS.MANAGE_USERS}><UsersManager /></RoleGuard></ProtectedRoute>}/>
  <Route path="/admin/content"element={<ProtectedRoute><RoleGuard permission={PERMISSIONS.MANAGE_GLOBAL_CONTENT}><ContentManager /></RoleGuard></ProtectedRoute>}/>
  <Route path="/admin/accounting-content"element={<ProtectedRoute><RoleGuard permission={PERMISSIONS.MANAGE_ACCOUNTING_CONTENT}><AccountingContentManager /></RoleGuard></ProtectedRoute>}/>
  */}
</Routes>
      </main>
      {isHome && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
