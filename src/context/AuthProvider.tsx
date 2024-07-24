import useNonceGet from "@/api/auth/useNonceGet";
import useSignin from "@/api/auth/useSignin";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";

type Network = "ton" | "near";

type AuthContext = {
  signIn: (network: Network) => void;
  signOut: () => void;
};

const authContext = createContext<AuthContext>({
  signIn: () => {},
  signOut: () => {},
});

type Props = PropsWithChildren<{}>;

const AuthProvider = ({ children }: Props) => {
  const { data: nonce } = useNonceGet();

  const wallet = useTonWallet();
  const [connectUI] = useTonConnectUI();

  const { mutateAsync: signin } = useSignin();

  useEffect(() => {
    if (!wallet) return;
    const tonProof = wallet?.connectItems?.tonProof;

    const cb = async () => {
      if (!tonProof || !("proof" in tonProof)) {
        await connectUI.disconnect();
        return;
      }

      try {
        console.log("here");

        await signin({
          proof: tonProof.proof,
          address: wallet.account.address,
          publicKey: wallet.account.publicKey ?? "",
        });
      } catch (error) {
        // empty
      }
    };

    cb();
  }, [connectUI, signin, wallet]);

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
  }, [connectUI]);

  return (
    <authContext.Provider value={{ signIn, signOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
