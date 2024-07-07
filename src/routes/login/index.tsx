import { useAuth } from "@/hooks/useAuth";
import { createFileRoute } from "@tanstack/react-router";

const Login = () => {
  const { signIn } = useAuth();

  return (
    <div className="bg-black">
      <p className="text-7xl text-white">HELLO WORLD</p>
      <div>
        <button
          onClick={signIn}
          className="text-2xl bg-blue-200 rounded-full px-10 py-5"
        >
          Login
        </button>
        {/* <button
          onClick={logout}
          className="text-2xl bg-blue-200 rounded-full px-10 py-5"
        >
          Logout
        </button> */}
        {/* <p className="text-xl text-white">{account?.accountId}</p> */}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/login/")({ component: Login });
