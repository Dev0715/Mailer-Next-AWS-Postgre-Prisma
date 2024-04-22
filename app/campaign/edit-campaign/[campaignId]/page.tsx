type Props = {
  campaignId: string;
};

const EditCampaignPage = ({ campaignId }: Props) => {
  return (
    <div>
      <h1>Edit Campaign: {campaignId}</h1>
    </div>
  );
};

export default EditCampaignPage;
