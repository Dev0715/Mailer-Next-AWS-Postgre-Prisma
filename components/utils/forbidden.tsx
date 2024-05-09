export const Forbidden = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-y-4">
        <p className="text-4xl">403</p>
        <p className="text-xl">Not logged in</p>
      </div>
    </div>
  );
};
