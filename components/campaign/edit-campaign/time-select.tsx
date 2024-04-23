import { FaCheck } from "react-icons/fa";

type Props = {
  focus: boolean;
  title: string;
  message: string;
  onClick: () => void;
};

export const TimeSelect = ({ focus, title, message, onClick }: Props) => {
  return (
    <div
      className={`w-1/2 flex items-center justify-between p-4 cursor-pointer
    border border-gray-200 rounded-xl hover:border-green-700 
    hover:drop-shadow hover:-translate-x-[1px] hover:-translate-y-[1px] 
    ${focus ? "border-gray-600" : ""}`}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      <div
        className={`w-6 h-6 flex items-center justify-center 
      rounded-full bg-gray-200 ${focus ? "bg-green-600" : ""}`}
      >
        <FaCheck className="text-white" />
      </div>
    </div>
  );
};
