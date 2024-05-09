"use client";

import { currentUser } from "@/lib/auth";

const AudienceLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  const user = currentUser();

  if (!user) {
    return (
      <div>
        <h1>Not logged in</h1>
      </div>
    );
  }

  return children;
};

export default AudienceLayout;
