import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: '6otrennd80004vsmj6i03e2r6g',
      userPoolId: 'ap-southeast-2_ozLg75mMm',
    },
  },
});
