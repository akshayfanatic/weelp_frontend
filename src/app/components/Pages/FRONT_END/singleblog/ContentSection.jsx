import React from 'react';
import { BlogAuthorInfo } from '@/app/components/singleproductguide';
import { WhatIncludedPanel } from '../singleproduct/TabSection__modules';
import { FollowUs, RelatedLinks } from './SingleBlogModules';

const ContentSection = () => {
  return (
    <section className="flex flex-col lg:flex-row">
      <div className="flex-[2]">
        {/* Post Author */}
        <BlogAuthorInfo />

        {/* Content */}
        <div className="bg-[#cccccc]">
          <div className="max-w-4xl mx-auto p-6  flex flex-col gap-4">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam aperiam neque dolorum necessitatibus placeat libero optio. Architecto, ratione adipisci modi nulla facilis eaque
              voluptatibus minima, consequatur, quas eveniet hic tempora dignissimos. Commodi, accusamus dolore fugiat error placeat qui culpa! Perspiciatis quis ad reprehenderit voluptate aliquam
              doloremque dicta laboriosam provident dolore, inventore exercitationem asperiores est ut esse sit rem eius omnis quia sequi! Doloribus dolor ut voluptate nisi blanditiis atque pariatur
              ipsum aperiam aut, laudantium beatae a repellendus necessitatibus odit deserunt ab est perferendis soluta harum amet. Earum soluta facilis asperiores est quam odio eos! Impedit unde a
              maiores corrupti cumque.
            </p>
            <WhatIncludedPanel panelTitle={'Lorem ipsum'} />
            <WhatIncludedPanel panelTitle={'Lorem ipsum'} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:gap-12 flex-1 p-6 px-8">
        <h3 className="text-lg sm:text-[28px] lg:mt-4 font-semibold text-Nileblue capitalize">Summary</h3>
        <RelatedLinks />
        <FollowUs />
      </div>
    </section>
  );
};

export default ContentSection;
