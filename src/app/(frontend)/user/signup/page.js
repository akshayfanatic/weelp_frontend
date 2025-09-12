import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { RegisterForm } from '@/app/components/Form/RegisterForm';

const SignUpPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-6">
      <RegisterForm />
    </div>
  );
};

export default SignUpPage;
