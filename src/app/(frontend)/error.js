'use client'; // Error boundaries must be Client Components

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react'; // nice visual icon

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 p-4">
      <Card className="flex flex-col items-center gap-4 p-6 max-w-sm w-full shadow-lg border border-gray-200 rounded-2xl">
        <AlertCircle className="text-red-500 w-12 h-12" />
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 text-center">
          An unexpected error occurred. Please try again.
        </p>
        <Button
          variant="default"
          className="mt-2"
          onClick={() => reset()}
        >
          Retry
        </Button>
      </Card>
    </div>
  );
}
