import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Phone, Mail, Lock } from 'lucide-react'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export const Route = createFileRoute('/_public/auth/register')({
  component: RegisterPage,
})

const formSchema = z
  .object({
    firstName: z.string().min(2, { message: 'First name is required' }),
    lastName: z.string().min(2, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(10, {
      message: 'Mobile number must be at least 10 characters long',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string().min(8, { message: 'Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof formSchema>

function FormErrorMessages({ errors }: { errors: FieldErrors<FormValues> }) {
  const errorMessage =
    errors.firstName?.message ||
    errors.lastName?.message ||
    errors.phone?.message ||
    errors.email?.message ||
    errors.password?.message ||
    errors.confirmPassword?.message

  return <p className="text-xs font-light text-red-500">{errorMessage}</p>
}

export default function RegisterPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })
  const { handleSubmit, formState } = form
  const router = useRouter()

  const onSubmit = async (values: FormValues) => {
    console.log(values)
    const { firstName, lastName, password, email, phone } = values

    await authClient.signUp.email(
      {
        email,
        name: firstName + ' ' + lastName,
        password,
        phone,
        callbackURL: '/auth/login',
      },
      {
        onSuccess: () => {
          console.log('sucess')
          router.navigate({ to: '/auth/login' })
        },
        onError: (ctx) => {
          console.log('ctx', ctx)
          if (
            ctx.error.details &&
            ctx.error.details.meta.target === 'user_phone_key'
          ) {
            toast.error('User already exists', {
              dismissible: true,
            })
          } else {
            toast.error(ctx.error.message || 'Failed to create user', {
              dismissible: true,
            })
          }
        },
      },
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 md:p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 py-6 shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Register Now</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details to get started
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <div className="space-y-4">
              {Object.keys(formState.errors).length !== 0 && (
                <FormErrorMessages errors={formState.errors} />
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className={`w-full focus-visible:ring-0 focus-visible:ring-offset-0 ${formState.errors.email ? 'border-2 border-red-500' : ''}`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className={`w-full focus-visible:ring-0 focus-visible:ring-offset-0 ${formState.errors.email ? 'border-2 border-red-500' : ''}`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            maxLength={10}
                            className={`w-full pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 ${formState.errors.email ? 'border-2 border-red-500' : ''}`}
                            {...field}
                          />
                          <Phone
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
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
              </div>
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="password"
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="password"
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

            <Button
              className="w-full"
              type="submit"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
        <div className="mt-2 text-center text-xs">
          Already have an account?{' '}
          <Link to="/auth/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
        <div className="text-muted-foreground hover:[&_a]:text-primary mt-2 text-balance text-center text-xs [&_a]:underline [&_a]:underline-offset-4">
          By clicking continue, you agree to our{' '}
          <Link to="/auth/login">Terms of Service</Link> and{' '}
          <Link to="/auth/login">Privacy Policy</Link>.
        </div>
      </div>
    </div>
  )
}
