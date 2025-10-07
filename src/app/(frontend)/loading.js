import { LoadingPage } from '@/app/components/Animation/Cards';
import { delay } from '@/lib/utils';

export default async function Loading() {
  await delay(5000);

  return <LoadingPage />;
}
