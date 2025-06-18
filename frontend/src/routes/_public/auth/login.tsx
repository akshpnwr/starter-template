import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Lock, Mail } from 'lucide-react'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import placeholderImg from '@/assets/placeholder.jpg'
// import googleIcon from "@/assets/google-icon.svg";
// import facebookIcon from "@/assets/facebook-icon.svg";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export const Route = createFileRoute('/_public/auth/login')({
  component: LoginPage,
})

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

type FormValues = z.infer<typeof formSchema>

function FormErrorMessages({ errors }: { errors: FieldErrors<FormValues> }) {
  const errorMessage = errors.email?.message || errors.password?.message

  return <p className="text-xs font-light text-red-500">{errorMessage}</p>
}

export default function LoginPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { handleSubmit, formState } = form
  const router = useRouter()

  const onSubmit = async (values: FormValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const { email, password } = values
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.navigate({ to: '/dashboard' })
        },
        onError: (ctx) => {
          toast.error(ctx.error.message)
        },
      },
    )
  }

  return (
    <div className="flex flex-1 justify-center bg-gray-100 md:items-center md:p-4">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:max-h-[32rem] md:flex-row">
        <Card className="flex-1 border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="">
              <CardContent className="space-y-4 pb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="sample@email.com"
                            className={`w-full pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 ${formState.errors.email ? 'border-2 border-red-500' : ''}`}
                            {...field}
                          />
                          <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                            size={18}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        Password
                        <Link
                          to="/auth/login"
                          className="ml-auto text-sm font-light underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder="password"
                            className={`w-full pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 ${form.formState.errors.password ? 'border-2 border-red-500' : ''}`}
                            {...field}
                          />
                          <Lock
                            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                            size={18}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormErrorMessages errors={formState.errors} />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Logging in...' : 'Log in'}
                </Button>
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">OR</span>
                  </div>
                </div>
                {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full font-light border-neutral-400"
                    onClick={handleGoogleSignIn}
                  >
                    <img
                      src={googleIcon}
                      alt="Google icon"
                      className="w-5 h-5 mr-2"
                    />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full font-light border-neutral-400"
                    onClick={handleFacebookSignIn}
                  >
                    <img
                      src={facebookIcon}
                      alt="Facebook icon"
                      className="w-5 h-5 mr-2"
                    />
                    Facebook
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full font-light border-neutral-400"
                    asChild
                  >
                    <Link to="/auth/phone">
                      <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                      Phone
                    </Link>
                  </Button>
                </div> */}
                <div className="text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link
                    to="/auth/register"
                    className="underline underline-offset-4"
                  >
                    Sign up
                  </Link>
                </div>
                <div className="text-muted-foreground hover:[&_a]:text-primary text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
                  By clicking continue, you agree to our{' '}
                  <Link to="/auth/login">Terms of Service</Link> and{' '}
                  <Link to="/auth/login">Privacy Policy</Link>.
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="relative hidden h-full w-full flex-1 md:block">
          <img
            src={placeholderImg}
            alt="Login illustration"
            className="h-full"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
