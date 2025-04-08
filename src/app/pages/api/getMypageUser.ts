import { Amplify } from 'aws-amplify';
import { withSSRContext } from '@aws-amplify/ssr';
import awsExports from '@/aws-exports';
import type { NextApiRequest, NextApiResponse } from 'next';

Amplify.configure({ ...(awsExports as any), ssr: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { Auth } = withSSRContext({ req });
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;

    const response = await fetch('https://your-api-endpoint.amazonaws.com/myLambdaPath', {
      method: 'POST',
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Failed to get mypage data" });
  }
}
