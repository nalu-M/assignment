import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import type { NextApiRequest, NextApiResponse } from 'next';

Amplify.configure({ ...(awsExports as any), ssr: true });

const REGION = 'ap-southeast-2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lambda = new LambdaClient({ region: REGION });

  const command = new InvokeCommand({
    FunctionName: 'getUserData',
    InvocationType: 'RequestResponse',
  });

  try {
    const response = await lambda.send(command);
    const payload = JSON.parse(new TextDecoder().decode(response.Payload));
    res.status(200).json(JSON.parse(payload.body));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to call Lambda' });
  }
}
