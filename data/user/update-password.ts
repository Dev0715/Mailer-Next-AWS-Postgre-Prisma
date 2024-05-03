import db from "@/lib/dynamo";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;

interface UserSetPassword {
  email: string;
  password: string;
  emailVerified: Date;
}

export const updateUserPassword = async (data: UserSetPassword) => {
  const command = new UpdateCommand({
    TableName,
    Key: { email: data.email },
    UpdateExpression:
      "SET password = :password, emailVerified = :emailVerified",
    ExpressionAttributeValues: {
      ":password": data.password,
      ":emailVerified": data.emailVerified.toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    return response.Attributes;
  } catch (error) {
    return null;
  }
};
