'use client';

import { Amplify } from "aws-amplify";
import { useState } from "react";
import { signIn, SignInInput } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

Amplify.configure({
    Auth: {
        Cognito:{
            userPoolClientId: '6otrennd80004vsmj6i03e2r6g',
            userPoolId: 'ap-southeast-2_ozLg75mMm',
        }
  
    }
});

export default function Login() {
    
}