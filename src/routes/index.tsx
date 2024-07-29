import StartPageCarousel from "@/components/common/StartPageCarousel";
import Logo from "@/components/icons/Logo";
import SoundOff from "@/components/icons/SoundOff";
import { useSound } from "@/hooks/useSound";
import { Button } from "@/shadcn-components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import colors from "tailwindcss/colors";

const Index = () => {
  const { on, toggle } = useSound();

  return (
    <div className="bg-star pb-12">
      <div className="flex justify-between pt-3 px-3">
        <div className="flex-1">
          <Button
            variant={on ? "square" : "square-active"}
            icon={<SoundOff color={on ? undefined : colors.slate[900]} />}
            onClick={toggle}
          />
        </div>
        <div className="pt-4">
          <Logo />
        </div>
        <div className="flex-1" />
      </div>
      <div className="px-4 pt-8 mb-6">
        <StartPageCarousel />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({ component: Index });
