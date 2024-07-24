import ReferralLink from "@/components/common/ReferralLink";
import TasksDrawer from "@/components/common/TasksDrawer";
import Logo from "@/components/icons/Logo";
import Settings from "@/components/icons/Settings";
import { Button } from "@/shadcn-components/ui/button";

import { createFileRoute, redirect } from "@tanstack/react-router";

const Home = () => {
  return (
    <div className="bg-blue-gradient h-fill">
      <div className="px-4 pt-5">
        <div className="flex justify-between mb-6">
          <div className="flex-1"></div>
          <div>
            <Logo size="small" />
          </div>
          <div className="flex-1 justify-end flex">
            <Button icon={<Settings />} variant="square" />
          </div>
        </div>
        <p className="text-center text-lg">Welcome to Fitton,</p>
        <p className="text-center text-lg mb-8">Motherfucker!</p>
        <ReferralLink />
      </div>
      <TasksDrawer />
    </div>
  );
};

export const Route = createFileRoute("/home/")({
  component: Home,
  beforeLoad(ctx) {
    if (!ctx.context.connectionRestored) return;
    if (!ctx.context.wallet) {
      throw redirect({ to: "/" });
    }
  },
});
