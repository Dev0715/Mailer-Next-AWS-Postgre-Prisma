import * as React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 right-0 w-full h-screen flex items-center justify-center z-0">
      {children}
    </div>
  );
};

export default AuthLayout;
