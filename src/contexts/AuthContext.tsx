import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: User | null        
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({ children }: { children: React.ReactNode }) {
  
  const [user, setUser] = useState<User | null>(null)
  const navigate= useNavigate()

  async function login(email: string, password: string) {
    
    await new Promise(r=> setTimeout(r, 600))
    if (email === 'admin@katlog.com' && password === 'admin') {
      setUser({
        id: '1',
        name: 'Admin User',
        email: 'admin@katlog.com',
        role: 'admin',
})

navigate('/dashboard', {
      replace:true})

    } else {
    toast.error("Invalid Credentials")
    }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: user !=null ? true : false,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider!')
  }
  return context
}