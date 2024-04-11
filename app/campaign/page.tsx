"use client";

const Blue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-blue-700">{children}</span>;
};

const Strong = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>;
};

const CampaignPage = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold pb-6">
        Campaign Dashboard
      </p>
      <p className="text-2xl font-semibold pb-2">Hi, Malachi Uy!</p>
      <div className="flex justify-between">
        <p className="text-xl pb-6">
          Your audience has{" "}
          <Blue>
            <Strong>17</Strong>{" "}
          </Blue>{" "}
          contacts.{" "}
          <Blue>
            <Strong>15</Strong>
          </Blue>{" "}
          of these are subscribed.
        </p>
        <Button variant="default">Create New</Button>
      </div>
    </main>
  );
};

export default CampaignPage;
