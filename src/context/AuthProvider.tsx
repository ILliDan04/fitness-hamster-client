import useNonceGet from "@/api/auth/useNonceGet";
import useSession, { SessionResponse } from "@/api/auth/useSession";
import useSignin from "@/api/auth/useSignin";
import useSignout from "@/api/auth/useSignout";
import { useNavigate, useLocation, useSearch } from "@tanstack/react-router";
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";

type Network = "ton" | "near";

export type AuthContext = {
  signIn: (network: Network) => void;
  signOut: () => void;
  session: SessionResponse | null;
  ready: boolean;
};

export const authContext = createContext<AuthContext>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  ready: false,
});

type Props = PropsWithChildren<{}>;

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const ref: string | undefined = useSearch({
    strict: false,
    select: (search) => search.ref,
  });
  const pathname = useLocation({ select: (location) => location.pathname });

  const wallet = useTonWallet();
  const [connectUI] = useTonConnectUI();
  const connectionRestored = useIsConnectionRestored();

  const { data: nonce } = useNonceGet();
  const { mutateAsync: signin } = useSignin();
  const { mutateAsync: signout } = useSignout();
  const { data: session, status } = useSession();

  const disconnect = useCallback(async () => {
    try {
      await signout();
    } catch (error) {}
    try {
      await connectUI.disconnect();
    } catch (error) {}
    if (pathname !== "/") {
      await navigate({ to: "/" });
    }
  }, [connectUI, navigate, pathname, signout]);

  useEffect(() => {
    const cb = async () => {
      // Waiting for requests to finish
      if (!connectionRestored || status === "pending") return;

      // When session and wallet are found
      if (session && wallet) {
        if (pathname === "/") {
          await navigate({ to: "/home" });
        }
        return;
      }

      // When session is found, but no wallet data is presented
      if (session && !wallet) {
        await disconnect();
        return;
      }

      // Session does not exist yet, verifing wallet signature
      const tonProof = wallet?.connectItems?.tonProof;
      // Wallet signature doesn't exist
      if (!tonProof || !("proof" in tonProof)) {
        await disconnect();
        return;
      }

      // Signin using valid signature
      try {
        await signin({
          ref,
          proof: tonProof.proof,
          address: wallet.account.address,
          publicKey: wallet.account.publicKey ?? "",
        });
        await navigate({ to: "/home" });
      } catch (error) {
        await disconnect();
      }
    };

    cb();
  }, [
    ref,
    signin,
    wallet,
    session,
    status,
    navigate,
    connectionRestored,
    pathname,
    disconnect,
  ]);

  useEffect(() => {
    if (!nonce) {
      connectUI.setConnectRequestParameters({ state: "loading" });
      return;
    }
    connectUI.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: nonce },
    });
  }, [connectUI, nonce]);

  const signIn = useCallback(
    (network: Network) => {
      if (network === "ton") {
        connectUI.openModal();
      }
    },
    [connectUI]
  );

  const signOut = useCallback(async () => {
    await connectUI.disconnect();
    await signout();
  }, [connectUI, signout]);

  return (
    <authContext.Provider
      value={{
        signIn,
        signOut,
        session: session ?? null,
        ready: connectionRestored && status !== "pending",
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
