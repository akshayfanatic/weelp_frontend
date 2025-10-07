'use client';
import React from 'react';
import { useIsClient } from '@/hooks/useIsClient';
import Link from 'next/link';
import { FOOTER_NAVIGATION } from '@/constants/navigations/footer';
import Image from 'next/image';

const Footer = () => {
  const isClient = useIsClient(); // prevent hydration err
  if (isClient) {
    return (
      <footer
        className="bg-white text-gray-600 px-12 py-8 "
        style={{
          backgroundImage: 'url(/assets/images/Weelp..jpg)', // Update the image path
          backgroundPosition: 'left', // Position the image at the bottom
          backgroundSize: 'auto', // Make sure the image covers the entire footer
          backgroundRepeat: 'no-repeat', // Prevent image repeat
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-5  gap-8">
          {FOOTER_NAVIGATION.map(({ title, links = [] }, index) => {
            return <FooterNavigation key={index} title={title} footerLink={links} />;
          })}

          {/* Payment Partners Column */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Payment Partners</h3>
            <div className="">
              <Image src="/assets/images/payments.jpg" alt="JCB" width={400} height={200} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-end space-x-6 mt-8">
          <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="https://youtube.com" className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">YouTube</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="https://facebook.com" className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </footer>
    );
  }
};

const FooterNavigation = ({ title = '', footerLink = [] }) => {
  if (!title && !footerLink.length > 0) return null;
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2">
        {footerLink.map(({ name, url ,badge }, index) => {
          return (
            <li key={index}>
              <Link href={url} className="hover:text-gray-800">
                {name} {badge && <span className='text-secondaryDark text-sm'>{badge}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Footer;
