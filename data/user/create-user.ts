import dynamoDB from "@/lib/dynamo";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_USER_TABLE_NAME;

interface NewUser {
  name?: string | null | undefined;
  email: string;
  password?: string;
  id?: string;
  image?: string | null | undefined;
  emailVerified?: Date | string | null;
}

export const createUser = async (data: NewUser) => {
  if (data.emailVerified && data.emailVerified instanceof Date) {
    data.emailVerified = data.emailVerified.toISOString();
  }

  const verificationToken = generateVerificationToken(data.email);

  const command = new PutCommand({
    TableName,
    Item: {
      verificationToken,
      expires: new Date(new Date().getTime() + 3600 * 1000).toISOString(),
      ...data
    }
  });

  try {
    await dynamoDB.send(command);
    return verificationToken;
  } catch (error) {
    return null;
  }
};
