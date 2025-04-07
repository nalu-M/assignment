'use client';

import "@/app/amlify/config";
import { useState } from "react";
import { signUp, type SignUpInput, confirmSignUp, type ConfirmSignUpInput } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const Sign_Up = () => {
  const router = useRouter();
  const [step, setStep] = useState<"signup" | "confirm">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSign_Up = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      setLoading(true);
      const signUpInput: SignUpInput = {
        username: email,
        password,
      };
      await signUp(signUpInput);

      setStep("confirm");
    } catch (err: any) {
      setError(err?.message || "サインアップに失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm_Sign_Up = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const confirmSignUpInput: ConfirmSignUpInput = {
        username: email,
        confirmationCode: code,
      };
      await confirmSignUp(confirmSignUpInput);

      router.push("/login");
    } catch (err: any) {
      setError(err?.message || "認証に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {step === "signup" ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              signup
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSign_Up}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  mailaddress
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  password confirming
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {loading ? "registering..." : "registeration"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              input confirmationcode
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleConfirm_Sign_Up}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  confirmationcode
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {loading ? "Confirming..." : "Confirmation"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Sign_Up;