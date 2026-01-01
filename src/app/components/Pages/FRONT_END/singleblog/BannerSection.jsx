import React from 'react';
import TabButton from '@/app/components/TabButton';
import styles from './bannerSection.module.css';
import Link from 'next/link';

const BannerSectionBlog = ({ title = '', excerpt = '', tags = [], media_gallery = [] }) => {
  return (
    <section className={`flex p-6 md:px-0 max-h-[400px] h-full items-center ${styles.banner_single_blog}`}>
      <div className="w-full md:ps-28 md:pe-8 min-h-full flex flex-col justify-center">
        <div className="2xl:w-3/4 mx-auto">
          <div className="flex flex-col gap-4">
            <h1 className="text-base sm:text-[52px] font-semibold font-degular   leading-none text-[#143042] first-letter:capitalize text-wrap">
              {title || '32 Best Places and Tours to See Autumn Leaves'}
            </h1>
            <p className="text-grayDark font-medium text-sm sm:text-lg  text-wrap">
              {excerpt || 'You&apos;ll discover everything from whisky to Harry Potter, or even some bodysnatchers, in Scotland.'}
            </p>
          </div>

          {tags.length > 0 && (
            <div className="mt-20 flex gap-4">
              {tags.map(({ label }) => {
                return <TabButton key={label} text={label} className={'bg-[#e9f3ee] text-sm text-[#408a6d] rounded-full'} />;
              })}
            </div>
          )}
        </div>
      </div>

      {/* Media Gallery */}
      {media_gallery.length > 0 && (
        <div className="2xl:flex items-center justify-center w-full hidden overflow-scroll tfc_scroll max-h-[400px]">
          {media_gallery.map(({ url = '', alt_text }, index) => {
            return <img key={alt_text ?? 'img_logos'} alt={alt_text ?? 'img_logo'} src={url ?? '/assets/images/Automn.png'} className="object-cover h-full" />;
          })}
        </div>
      )}
    </section>
  );
};

export default BannerSectionBlog;
