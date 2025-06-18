import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Phone, Mail, Lock } from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';
import { UserRole } from '@/types';

export const Route = createFileRoute('/_auth/add-user')({
  component: AddUser,
});

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .min(10, { message: 'Mobile number must be at least 10 characters long' }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
  confirmPassword: z.string().min(8, { message: 'Password is required' }),
  role: z.enum([UserRole.ADMIN, UserRole.VERIFICATION, UserRole.SALES], {
    required_error: 'Role is required',
  }),
});

type FormValues = z.infer<typeof formSchema>;

function FormErrorMessages({ errors }: { errors: FieldErrors<FormValues> }) {
  const errorMessage =
    errors.firstName?.message ||
    errors.lastName?.message ||
    errors.phone?.message ||
    errors.email?.message ||
    errors.password?.message ||
    errors.confirmPassword?.message ||
    errors.role?.message;

  return <p className="text-xs font-light text-red-500">{errorMessage}</p>;
}

export default function AddUser() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phone: '',
    //   password: '',
    //   confirmPassword: '',
    //   role: '',
    // },
  });
  const { handleSubmit, formState } = form;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-6">
          <div className="space-y-4">
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
                        placeholder="sample@email.com"
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
                        placeholder="sample@email.com"
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
                          placeholder="sample@email.com"
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

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role of the user" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={UserRole.VERIFICATION}>
                      Verification
                    </SelectItem>
                    <SelectItem value={UserRole.SALES}>Sales</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {Object.keys(formState.errors).length !== 0 && (
            <FormErrorMessages errors={formState.errors} />
          )}

          <Button
            className="w-full px-10 md:ml-auto md:flex md:w-auto"
            type="submit"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
