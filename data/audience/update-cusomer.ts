import db from "@/lib/db";
import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Customer } from "@/shared/customer-type";

const TableName = process.env.AWS_DYNAMODB_MAILING_LIST_TABLE_NAME;

export const updateCustomer = async (data: Customer) => {
  const command = new UpdateCommand({
    TableName,
    Key: { ownerEmail: data.ownerEmail, customerEmail: data.customerEmail },
    UpdateExpression:
      "SET firstName = :firstName, lastName = :lastName, address = :address, phoneNumber = :phoneNumber, birthday = :birthday, tags = :tags, subscribed = :subscribed, lastChanged = :lastChanged",
    ExpressionAttributeValues: {
      ":firstName": data.firstName,
      ":lastName": data.lastName,
      ":address": data.address,
      ":phoneNumber": data.phoneNumber,
      ":birthday": data.birthday,
      ":tags": data.tags,
      ":subscribed": data.subscribed,
      ":lastChanged": data.lastChanged
    },
    ReturnValues: "ALL_NEW"
  });

  try {
    const response = await db.send(command);
    console.log("__updateUserToken__UpdateCommand__RESPONSE", response);
    return { success: true };
  } catch (error) {
    console.log("__updateUserToken__UpdateCommand__ERROR", error);
    return { error };
  }
};
