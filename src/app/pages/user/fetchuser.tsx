import { getUser } from '@/graphql/queries';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

export const fetchUser = async (id: string) => {
  try {
    const result = await client.graphql({
      query: getUser,
      variables: { id },
    });

    return result.data.getUser;
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};
