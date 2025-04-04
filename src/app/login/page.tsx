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

export default function Log_In() {
    const router = useRouter(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLog_In = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const signInInput: SignInInput = {
                username: email,
                password: password,
            };
            await signIn(signInInput);
            router.push("/mypage");
        } catch (err: any) {
            setError(err.message || "ログインに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-96 bg-white p-8 shadow-md rouded-lg">
                <h2 className="text-2xl font-bold text-center mb-6">login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleLog_In}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            mailaddress
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rouded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rouded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rouded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {loading ? "confirmin..." : "cofirmation"}
                    </button>
                </form>
            </div>
        </div>
    );
}