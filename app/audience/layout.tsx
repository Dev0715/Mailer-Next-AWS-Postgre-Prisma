"use client";

import { Forbidden } from "@/components/utils/forbidden";
import { useCurrentUser } from "@/hooks/use-current-user";

const AudienceLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  const user = useCurrentUser();

  if (!user) {
    return <Forbidden />;
  }

  return children;
};

export default AudienceLayout;
