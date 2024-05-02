type Props = {
  title: string;
  content: string | number | undefined;
};

export const DetailShowItem = ({ title, content }: Props) => {
  return (
    <span className="flex gap-x-1 text-base">
      <p>{title} ·</p>
      <span className="text-black font-medium">{content}</span>
    </span>
  );
};
