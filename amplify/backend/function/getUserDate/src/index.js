const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const userSub = event.identity?.sub; // CognitoユーザーID（Amplify Auth経由）

  if (!userSub) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Not authorized" }),
    };
  }

  const params = {
    TableName: "user",
    Key: { id: userSub }, // `id` がユーザーIDだと仮定
  };

  try {
    const data = await docClient.get(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(data.Item),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch user data" }),
    };
  }
};
