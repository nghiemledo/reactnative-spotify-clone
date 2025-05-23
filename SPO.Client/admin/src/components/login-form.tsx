import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLogo from '@/assets/images/spotify-logo.svg'
import { Link } from "react-router-dom"
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from "@/contexts/AuthContext"

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormInputs>();
  const { login, loginError } = useAuth()

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    const success = await login(data);
    if (success) {
      reset();
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)}>
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
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Email is not valid',
                      },
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm">&#10033;{errors.email.message}</p>}
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
                    {...register('password', {
                      required: 'Password is required',
                      // pattern: {
                      //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      //   message: 'Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt',
                      // },
                      minLength: {
                        value: 3,
                        message: 'Password must be at least 3 characters long',
                      },
                    })}
                  />
                  {errors.password && <p className="text-red-500 text-sm">&#10033;{errors.password.message}</p>}
                </div>
                {loginError && <p className="text-red-500 text-sm">&#10033;{loginError}</p>}
                <Button type="submit" className="w-full cursor-pointer text-white bg-green-500 hover:bg-green-600" >
                  Sign In
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={'#'} className="underline hover:text-green-500 transition-all underline-offset-4 duration-300">
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
