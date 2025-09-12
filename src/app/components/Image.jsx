'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FALLBACK_IMAGE } from '../../constants/image';

export default function SafeImage({ src = '', alt = '', ...props }) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE);

  return <Image {...props} fill src={imgSrc} alt={alt} onError={() => setImgSrc(FALLBACK_IMAGE)} />;
}
