import { cn } from "@/shadcn-lib/utils";
import { IconProps } from "./icons";

const Loader = ({
  size,
  color = "#fff",
  animated = true,
  className,
}: IconProps<{ animated?: boolean }>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size === "2xl" ? 60 : 24}
      height={size === "2xl" ? 60 : 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(animated ? "animate-spin" : "", className)}
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
};

export default Loader;
