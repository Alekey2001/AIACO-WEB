import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  /*
    FRONTEND TEMPORAL

    Más adelante estos datos vendrán de Supabase Auth.
  */

  const [user, setUser] = useState(null)

  const loginDemo = (role = 'cliente') => {
    const demoUsers = {
      super_admin: {
        id: 'demo-super-admin',
        name: 'Administrador AIACO',
        email: 'admin@aiaco.demo',
        role: 'super_admin',
        avatar: null,
      },

      admin_contable: {
        id: 'demo-admin-contable',
        name: 'Administrador Contable',
        email: 'contabilidad@aiaco.demo',
        role: 'admin_contable',
        avatar: null,
      },

      trabajador: {
        id: 'demo-worker',
        name: 'Trabajador AIACO',
        email: 'trabajador@aiaco.demo',
        role: 'trabajador',
        avatar: null,
      },

      cliente: {
        id: 'demo-client',
        name: 'Usuario AIACO',
        email: 'usuario@aiaco.demo',
        role: 'cliente',
        avatar: null,
      },
    }

    setUser(
      demoUsers[role] ??
      demoUsers.cliente
    )
  }

  const logout = () => {
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,

      isAuthenticated: Boolean(user),

      loginDemo,
      logout,
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth debe utilizarse dentro de AuthProvider'
    )
  }

  return context
}