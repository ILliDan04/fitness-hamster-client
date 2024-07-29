import { IconProps } from "./icons";

type Props = IconProps<{}>;

const Cross = ({ color = "#64687D", size = "default" }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size === "sm" ? 14 : 24}
      height={size === "sm" ? 14 : 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

export default Cross;
