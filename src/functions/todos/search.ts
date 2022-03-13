import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { document } from "@utils/dynamodbClient";

import { APIGatewayProxyHandler } from "aws-lambda";

const search: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document
    .query({
      TableName: "todos",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": userid,
      },
    })
    .promise();

  return formatJSONResponse(response.Items);
};

export const main = middyfy(search);
