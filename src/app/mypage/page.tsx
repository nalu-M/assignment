'use client';

import { Amplify } from "aws-amplify";
import { useState, useEffect } from "react";
import { getCurrentUser, type GetCurrentUserOutput } from "aws-amplify/auth";

Amplify.configure({
    Auth: {
        Cognito:{
            userPoolClientId: '6otrennd80004vsmj6i03e2r6g',
            userPoolId: 'ap-southeast-2_ozLg75mMm',
        }
  
    }
});

const  My_Page = () => {
    const [user, setUser] = useState<GetCurrentUserOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();
                setUser(user);
            } catch (err: any) {
                setError("ログインしていません");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    },[]);

    if (loading) {
        return <p className="text-center text-gray-500">loading...</p>;
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-128 mx-auto bg-white p-6 rouded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">user information</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-2">
                        <p>
                            <span className="font-semibold">user name:</span>
                            {user?.username}
                        </p>
                        <p>
                            <span className="font-semibold">user ID:</span>
                            {user?.userId}
                        </p>
                        <p>
                            <span className="font-semibold">login ID:</span>
                            {user?.signInDetails?.loginId}
                        </p>
                        <p>
                            <span className="font-semibold">confirmation flow:</span>
                            {user?.signInDetails?.authFlowType}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default My_Page;