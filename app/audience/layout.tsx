"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const AudienceLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  const user = useCurrentUser();

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
