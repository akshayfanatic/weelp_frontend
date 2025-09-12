'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { AtSign, KeyRound, User } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

// Zod schema for validation
const schema = z.object({
  name: z.string().nonempty('Name is required').min(3, 'Name must be greater than 3 characters'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'Must be at least 8 characters long')
    .regex(/[A-Za-z]/, 'Must contain at least one letter')
    .regex(/[@#$%^&+=]/, 'Must contain at least one special character (@, #, $, etc.)')
    .regex(/\d/, 'Must contain at least one number')
    .nonempty('Password Required'),
});

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const response = await axios.post('/api/public/user/register', {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        const {
          data: { message },
        } = response;

        toast({
          variant: 'success',
          title: message ?? ' User Name Created Successfully',
          action: (
            <Button
              onClick={() => {
                router.push('/user/login');
              }}
            >
              Click Here to Login
            </Button>
          ),
        });

        // resetform
        reset();
      }
    } catch (error) {
      // Validation Erro
      const { response } = error;
      if (response.status === 422) {
        const { error, message } = response?.data;

        // Displaying the error using toast
        toast({
          variant: 'destructive',
          title: error,
          description: message, // Show the error message
        });
      }

      //  unexpected
      const { message } = response?.data;
      toast({
        variant: 'destructive',
        title: message,
      });
    }
  };

  return (
    <div className="space-y-4 bg-white border rounded-xl shadow-md w-full max-w-fit sm:max-w-md pb-8">
      <div className="bg-white rounded-t-xl border-b py-4 px-8">
        <Image src="/assets/images/SiteLogo.png" alt="Site Logo" width={122} height={42} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={`space-y-4 bg-white px-8 py-4 ${isSubmitting && 'cursor-wait'}`} disabled={isSubmitting}>
          <div>
            <h3 className="font-semibold text-xl">
              Sign Up Back To{' '}
              <Link href={'/user/login'} className="underline">
                Login
              </Link>
            </h3>
            <sub className="text-[#5a5a5a]">Login into your account using your email.</sub>
          </div>

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="flex items-center bg-white shadow-md border p-1 px-2 rounded-md">
              <User className="text-[#5A5A5A] size-4" />
              <input placeholder="Username" type="text" id="name" {...register('name')} autoComplete="off" className="mt-1 py-2 px-3 focus:outline-none bg-white placeholder:bg-white text-base" />
            </label>
            {errors.name && <p className="text-sm text-red-600 pt-2">{errors.name.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="flex items-center bg-white shadow-md border p-1 px-2 rounded-md">
              <AtSign className="text-[#5A5A5A] size-4" />
              <input placeholder="Email ID" type="email" id="email" {...register('email')} autoComplete="off" className="mt-1 py-2 px-3 focus:outline-none bg-white placeholder:bg-white text-base" />
            </label>
            {errors.email && <p className="text-sm text-red-600 pt-2">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="flex items-center bg-white shadow-md border p-1 px-2 rounded-md">
              <KeyRound className="text-[#5A5A5A] size-4" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register('password')}
                autoComplete="off"
                className="mt-1 py-2 px-3 focus:outline-none bg-white placeholder:bg-white text-base"
              />
            </label>
            {errors.password && <p className="text-sm text-red-600 pt-2">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className={`w-full p-4 rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-secondaryDark hover:bg-secondarylight text-white'}`}>
            {isSubmitting ? 'Processing...' : 'Continue'}
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
