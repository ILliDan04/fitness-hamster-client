import RotateScreen from "@/components/common/RotateScreen";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import WebcamContext from "@/context/WebcamContext";
import SoundContext from "@/context/SoundContext";
import { useTonWallet } from "@tonconnect/ui-react";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(relativeTime);

const Root = () => {
  return (
    <WebcamContext>
      <SoundContext>
        <RotateScreen />
        <div className="container">
          <Outlet />
        </div>
      </SoundContext>
    </WebcamContext>
  );
};

export const Route = createRootRouteWithContext<{
  wallet: ReturnType<typeof useTonWallet>;
  connectionRestored: boolean;
}>()({
  component: Root,
});
