import { delay } from '@/lib/utils';
import { LoadingPage } from '@/app/components/Animation/Cards';

export default async function Loading() {
  await delay(5000);

  return <LoadingPage />;
}
