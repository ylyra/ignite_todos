import { v4 as uuidv4 } from "uuid";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { document } from "@utils/dynamodbClient";

import schema from "./schema";

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = event.body;

  await document
    .put({
      TableName: "todos",
      Item: {
        id: uuidv4(),
        user_id: userid,
        title,
        done: false,
        deadline: new Date(deadline).getTime(),
        created_at: new Date().getTime(),
      },
    })
    .promise();

  return formatJSONResponse({
    statusCode: 200,
    message: `Todo item created successfuly`,
  });
};

export const main = middyfy(create);
