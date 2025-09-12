import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/app/components/Form/LoginForm';

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-6">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
