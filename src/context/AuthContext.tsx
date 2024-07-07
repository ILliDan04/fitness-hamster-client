import { HereWallet, TelegramAppStrategy } from "@here-wallet/core";
import { useNavigate } from "@tanstack/react-router";
import { Account } from "near-api-js";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

export const authContext = React.createContext<{
  wallet: HereWallet | null;
  signedIn: boolean;
  account: Account | null;
  signIn: () => void;
  signOut: () => void;
}>({
  wallet: null,
  signedIn: false,
  account: null,
  signIn: () => {},
  signOut: () => {},
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [wallet, setWallet] = useState<HereWallet | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    if (signedIn) return;
    localStorage.clear();

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
      if (!signed) {
        await navigate({ to: "/login" });
        return;
      }

      const acc = await here.account();
      setSignedIn(true);
      setAccount(acc);
    };
    cb();
  }, [navigate, signedIn]);

  const signIn = useCallback(async () => {
    if (!wallet || signedIn) return;
    try {
      await wallet.signIn();
      await navigate({ to: "/login" });
    } catch (error) {
      console.error(error);
    }
  }, [wallet, navigate, signedIn]);

  const signOut = useCallback(async () => {
    if (!wallet || signedIn) return;
    await wallet.signOut();
    setAccount(null);
    setSignedIn(false);
  }, [signedIn, wallet]);

  return (
    <authContext.Provider
      value={{ account, signedIn, wallet, signIn, signOut }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
