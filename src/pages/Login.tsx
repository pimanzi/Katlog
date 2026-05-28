import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

const schema = z.object({
  email:    z.string().email('Enter a valid email'),
  password: z.string().min(5, 'Password must be at least 5 characters'),
})
type FormValues = z.infer<typeof schema>

const BG_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=640&h=480&fit=crop',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=640&h=480&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=640&h=480&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=640&h=480&fit=crop',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=640&h=480&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=640&h=480&fit=crop',
]

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues:{
      email:        'admin@katlog.com',
      password: 'admin'
    }
  })
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  

  async function onSubmit(data: FormValues) {
  
   await  login(data.email, data.password)

  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
        {BG_IMAGES.map((src, i) => (
          <img key={i} src={src} alt="" className="w-full h-full object-cover" />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(26,31,46,0.93) 0%, rgba(60,131,247,0.72) 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">

          <div className="flex items-center justify-center mb-8">
            <Logo variant="light" size={38} />
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-white leading-tight">Welcome back</h1>
              <p className="text-white/55 text-sm mt-1.5">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Label className="text-white/75 text-sm font-medium">Email address</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/35 focus-visible:ring-primary focus-visible:border-primary/70 h-10"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-300 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-white/75 text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/35 focus-visible:ring-primary focus-visible:border-primary/70 h-10 pr-10"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-300 mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  className="text-xs text-white/50 hover:text-white/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold h-10 mt-1"
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </div>

          <p className="text-center text-white/35 text-xs mt-6">
            © {new Date().getFullYear()} KatLog. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
