"use client";

import React, { useEffect } from "react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/cms/Link";
import { Media } from "@/components/cms/Media";
import RichText from "@/components/cms/RichText";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


export const HighImpactHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  return (
    <section className="flex relative flex-col">
      <div className="flex flex-col items-center pt-20 md:pt-50 justify-center">
        {richText && (
          <RichText className="
          mb-6
         prose-hero-1
          "
            enableProse={false}
            data={richText} enableGutter={false} />
        )}
        {Array.isArray(links) && links.length > 0 && (
          <ul id="hero-cta-container" className="flex md:justify-center gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="flex text-muted-foreground flex-col items-center  pt-20">
        <p className="text-sm tracking-wide">Built with modern framerworks</p>

      </div>
    </section>

    // <div
    //   className="relative -mt-[10.4rem] flex items-center justify-center text-white"
    //   data-theme="dark"
    // >
    //   <div className="container mb-8 z-10 relative flex items-center justify-center">
    //     <div className="max-w-[36.5rem] md:text-center">
    //       {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
    //       {Array.isArray(links) && links.length > 0 && (
    //         <ul className="flex md:justify-center gap-4">
    //           {links.map(({ link }, i) => {
    //             return (
    //               <li key={i}>
    //                 <CMSLink {...link} />
    //               </li>
    //             )
    //           })}
    //         </ul>
    //       )}
    //     </div>
    //   </div>
    //   <div className="min-h-[80vh] select-none">
    //     {media && typeof media === 'object' && (
    //       <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
    //     )}
    //   </div>
    // </div>
  );
};
