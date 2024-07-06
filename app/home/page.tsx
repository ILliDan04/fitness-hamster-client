"use client";

import { useAuth } from "@/common/utils/login";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const params = useSearchParams();
  const { login, logout, accId } = useAuth();
  console.log(params);

  // useEffect(() => {}, []);
  return <div>HOME PAGE</div>;
};

export default Home;
