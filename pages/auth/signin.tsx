import type { GetServerSidePropsContext } from "next";
import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { ensureGuest } from "../../utils/ensureGuest";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignInIng, setIsSignInIng] = useState(false);

  async function handleSignin(event: FormEvent) {
    event.preventDefault();
    try {
      setIsSignInIng(true);
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profile",
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSignInIng(false);
    }
  }

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <form
        name="signup"
        onSubmit={handleSignin}
        className="w-64 md:w-64 lg:w-80 flex flex-col"
      >
        <div className="flex flex-col py-1">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            className="border rounded-md border-gray-400 p-2"
            name="email"
            type="email"
            value={email}
            disabled={isSignInIng}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col py-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="border rounded-md border-gray-400 p-2"
            name="password"
            type="password"
            value={password}
            disabled={isSignInIng}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSignInIng}
          className="bg-indigo-600 rounded-md mt-4 py-2 text-white"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return ensureGuest(context);
}
