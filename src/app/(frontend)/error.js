'use client'; // Error boundaries must be Client Components

import ErrorComponent from '../components/Error';

export default function Error({ error, reset }) {
  return <ErrorComponent error={error} reset={reset} />;
}
