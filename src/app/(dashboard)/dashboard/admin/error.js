'use client'; //
import ErrorComponent from '@/app/components/Error';

export default function Error({ error, reset }) {
  return <ErrorComponent error={error} reset={reset} />;
}
