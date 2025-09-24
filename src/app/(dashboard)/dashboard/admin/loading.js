import React from 'react';
import { LoadingPage } from '@/app/components/Animation/Cards';
import { delay } from '@/lib/utils';

const Loading = async () => {
  await delay(5000);
  return   <span className="loader"></span>
};

export default Loading