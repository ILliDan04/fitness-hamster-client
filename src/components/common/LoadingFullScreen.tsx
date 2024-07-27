import { useEffect, useState } from "react";
import { cn } from "@/shadcn-lib/utils";
import logoLoading from "@/assets/logo_loading.svg";

type Props = {
  loading?: boolean;
};

const LoadingFullScreen = ({ loading }: Props) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (loading) {
      setHidden(false);
      return;
    }
    const timeout = setTimeout(() => setHidden(true), 200);
    return () => clearTimeout(timeout);
  }, [loading]);

  return hidden ? null : (
    <div
      className={cn(
        "fixed inset-0 bg-blue-gradient backdrop-blur-lg z-50 flex justify-center items-center duration-200 transition-all",
        loading ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      <img src={logoLoading} />
    </div>
  );
};

export default LoadingFullScreen;
