import { PiWarningBold } from "react-icons/pi";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <PiWarningBold className="text-4xl text-red-400" />
      </div>
    </CardWrapper>
  );
};
