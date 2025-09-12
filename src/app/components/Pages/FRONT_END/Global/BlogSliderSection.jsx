import React from 'react';
import BlogSlider from '@/app/components/sliders/BlogSlider';

const BlogSliderSection = ({ sectionTitle, data }) => {
  if (sectionTitle && data) {
    return (
      <section className="container mx-auto flex flex-col gap-3 p-4 sm:py-8 productSlider">
        <h2 className="text-[28px] font-medium text-Nileblue top-4">{sectionTitle || 'Your Blogs'}</h2>
        <BlogSlider data={data} />
      </section>
    );
  }
  return;
};

export default BlogSliderSection;
