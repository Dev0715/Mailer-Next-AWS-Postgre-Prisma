"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-full h-12 flex items-center justify-center bg-gray-200 z-10 relative">
      <div className="w-5/6 flex justify-between">
        <p>Copyright © 2024 MainManJS</p>
        <div className="flex items-center gap-x-4 text-sm font-medium">
          <Link href="/">
            <p>Terms</p>
          </Link>
          <Link href="/">
            <p>Privacy</p>
          </Link>
          <Link href="/">
            <p>Support</p>
          </Link>
          <Link href="/">
            <p>Sitemap</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
