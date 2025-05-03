import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLogo from '@/assets/images/spotify-logo.svg'
import { Link } from "react-router-dom"
import { useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"
import { login } from "@/store/auth/auth.slice"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const loginError = useAppSelector((state: RootState) => state.auth.loginError)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await dispatch(login({ email, password }))
    setLoading(false)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="p-6">
                <img src={AppLogo} alt="Spotify Logo" className="w-full h-full object-contain" />
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={'#'}
                      className="ml-auto text-sm underline-offset-4 hover:underline hover:text-green-500 transition-all duration-300"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {loginError && (
                  <div className="text-red-500 text-sm text-center">
                    {loginError}
                  </div>
                )}
                <Button type="submit" className="w-full cursor-pointer text-white bg-green-500 hover:bg-green-600" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={'/register'} className="underline hover:text-green-500 transition-all underline-offset-4 duration-300">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
