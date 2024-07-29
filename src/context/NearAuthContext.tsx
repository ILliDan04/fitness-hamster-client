import useNonceGet from "@/api/auth/useNonceGet";
// import useSignin from "@/api/auth/useSignin";
import useSignout from "@/api/auth/useSignout";
import { HereWallet } from "@here-wallet/core";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

export const authContext = React.createContext<{
  wallet: HereWallet | null;
  signedIn: boolean;
  accountId: string | null;
  signIn: () => void;
  signOut: () => void;
  signMsg?: (message: string) => void;
}>({
  wallet: null,
  signedIn: false,
  accountId: null,
  signIn: () => {},
  signOut: () => {},
  signMsg: () => {},
});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const pathName = useLocation({ select: (location) => location.pathname });
  const search = useSearch({ strict: false });
  const { data: nonce } = useNonceGet();
  // const { mutateAsync: signin } = useSignin();
  const { mutateAsync: signout } = useSignout();

  const [wallet, setWallet] = useState<HereWallet | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    if (wallet) return;

    const cb = async () => {
      const here = await HereWallet.connect({
        botId: import.meta.env.VITE_TELEGRAM_APP,
        walletId: "herewalletbot/app",
      });

      setWallet(here);
      const signedIn = await here.isSignedIn();
      if (signedIn) {
        const acc = await here.getAccountId();
        setAccountId(acc);
        setSignedIn(true);
        if (pathName === "/") {
          navigate({ to: "/home", search });
        }
      } else {
        navigate({ to: "/", search });
      }
    };
    cb();
  }, [navigate, search, wallet, pathName]);

  const signIn = useCallback(async () => {
    if (!wallet || !nonce) return;

    // await wallet.signMessage({
    //   message: "Authenticate",
    //   nonce: Buffer.from(nonce, "hex"),
    //   recipient: window.location.host,
    // });

    await wallet.authenticate({
      message: "Authenticate",
      nonce: Buffer.from(nonce, "hex"),
      callbackUrl: "/home",
    });
  }, [nonce, wallet]);

  const signOut = useCallback(async () => {
    await signout();
    wallet?.signOut();
    localStorage.removeItem("herewallet:keystore");
    localStorage.removeItem("herewallet-topic");
    setAccountId(null);
    setSignedIn(false);
    navigate({ to: "/login" });
  }, [wallet, navigate, signout]);

  return (
    <authContext.Provider
      value={{ accountId, signedIn, wallet, signIn, signOut }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
