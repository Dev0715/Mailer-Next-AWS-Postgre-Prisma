import dynamoDB from "@/lib/dynamo";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;

export const updateUserVerification = async (userEmail: string) => {
  const command = new UpdateCommand({
    TableName,
    Key: { email: userEmail },
    UpdateExpression: "SET emailVerified = :emailVerified",
    ExpressionAttributeValues: {
      ":emailVerified": new Date().toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    await dynamoDB.send(command);
    return {
      success: true
    };
  } catch (error) {
    return {
      error: true
    };
  }
};
