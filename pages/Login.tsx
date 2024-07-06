"use client";

import React, { useEffect } from "react";

import WebApp from "@twa-dev/sdk";
import { useAuth } from "@/common/utils/login";
import { useParams, useSearchParams } from "next/navigation";

const Login: React.FC = () => {
  const params = useSearchParams();
  // console.log(Object.fromEntries(params.entries()));

  const { login, logout, accId } = useAuth();

  return (
    <div>
      <p className="text-7xl text-white">HELLO WORLD</p>
      <div>
        <button
          onClick={login}
          className="text-2xl bg-blue-200 rounded-full px-10 py-5"
        >
          Login
        </button>
        <button
          onClick={logout}
          className="text-2xl bg-blue-200 rounded-full px-10 py-5"
        >
          Logout
        </button>
        <p className="text-xl text-white">{accId}</p>
      </div>
    </div>
  );
};

export default Login;
