type Props = {
  color?: string;
  size?: "default" | "huge";
};

const Tick = ({ color = "#64687D", size = "default" }: Props) => {
  return (
    <svg
      width="10"
      height="7"
      viewBox="0 0 10 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={`scale(${size === "huge" ? 15 : 1})`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.88894 0.414231C9.27946 0.804755 9.27946 1.43792 8.88894 1.82844L4.6463 6.07109C4.25577 6.46161 3.62261 6.46161 3.23208 6.07109L1.11076 3.94977C0.72024 3.55924 0.72024 2.92608 1.11076 2.53555C1.50129 2.14503 2.13445 2.14503 2.52498 2.53555L3.93919 3.94976L7.47472 0.414231C7.86525 0.0237068 8.49841 0.0237068 8.88894 0.414231Z"
        fill={color}
      />
    </svg>
  );
};

export default Tick;
