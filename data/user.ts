import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";
import {
  GetCommand,
  PutCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb";
import { generateVerificationToken } from "@/lib/tokens";

const TableName = process.env.AWS_DYNAMODB_TABLE_NAME;

interface NewUser {
  name?: string | null | undefined;
  email: string;
  password?: string;
  id?: string;
  image?: string | null | undefined;
  emailVerified?: Date | string | null;
}

interface UserSetToken {
  email: string;
  verificationToken: string;
  expires: Date;
}

interface UserSetPassword {
  email: string;
  password: string;
  emailVerified: Date;
}

export const getUserByEmail = async (email: string) => {
  const command = new GetCommand({
    TableName,
    Key: { email }
  });

  try {
    const response = await db.send(command);
    console.log("__getUserByEmail__GetCommand__RESPONSE", response);
    return response.Item;
  } catch (error) {
    console.log("__getUserByEmail__GetCommand__ERROR", error);
    return null;
  }
};

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
    const response = await db.send(command);
    console.log("__createUser__PutCommand__RESPONSE", response);
    return verificationToken;
  } catch (error) {
    console.log("__createUser__PutCommand__ERROR", error);
    return null;
  }
};

export const updateUserToken = async (data: UserSetToken) => {
  const command = new UpdateCommand({
    TableName,
    Key: { email: data.email },
    UpdateExpression:
      "SET verificationToken = :verificationToken, expires = :expires",
    ExpressionAttributeValues: {
      ":verificationToken": data.verificationToken,
      ":expires": data.expires.toISOString()
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserToken__UpdateCommand__RESPONSE", response);
    return response.Attributes;
  } catch (error) {
    console.log("__updateUserToken__UpdateCommand__ERROR", error);
    return null;
  }
};
