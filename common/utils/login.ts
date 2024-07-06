"use client";

import { HereWallet, TelegramAppStrategy } from "@here-wallet/core";
import WebApp from "@twa-dev/sdk";
import { connect } from "near-api-js";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useAuth = () => {
  const [wallet, setWallet] = useState<HereWallet>();
  const [accId, setAccId] = useState("");

  useEffect(() => {
    localStorage.clear();
    WebApp.ready();

    const cb = async () => {
      const here = await HereWallet.connect({
        botId: "fitness_hamster_bot/fitness_hamster_app", // Your bot MiniApp
        walletId: "herewalletbot/beta",
        defaultStrategy: new TelegramAppStrategy(
          "fitness_hamster_bot/fitness_hamster_app",
          "herewalletbot/beta"
        ),
        // walletId: "fittondev.near", // HOT Wallet
      });
      setWallet(here);
      const signed = await here.isSignedIn();
      if (signed) {
        const acc = await here.account();
        setAccId(acc.accountId);
      }
    };
    cb();
  }, []);

  const logout = useCallback(async () => {
    if (!wallet) return;
    await wallet.signOut();
    setAccId("");
  }, [wallet]);

  const login = useCallback(async () => {
    if (!wallet) return;
    try {
      const isLogged = await wallet.isSignedIn();
      if (isLogged) {
        alert(await wallet.getAccountId());
      }
      if (!isLogged) {
        const res = await wallet.signIn({
          // strategy: new TelegramAppStrategy(
          //   "fitness_hamster_bot/fitness_hamster_app",
          //   "herewalletbot/app"
          // ),
          callbackUrl: "/home",
          // contractId: "social.near",
        });
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  }, [wallet]);

  return { login, logout, accId };
};
