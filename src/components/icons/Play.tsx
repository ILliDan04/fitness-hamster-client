type Props = {
  color?: string;
};
const Play = ({ color = "#F43F5E" }: Props) => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.520812 0.122289C0.841885 -0.0530018 1.23305 -0.0389906 1.54076 0.158822L15.5408 9.15882C15.827 9.34282 16 9.65974 16 10C16 10.3403 15.827 10.6572 15.5408 10.8412L1.54076 19.8412C1.23305 20.039 0.841885 20.053 0.520812 19.8777C0.199739 19.7024 0 19.3658 0 19V1C0 0.634194 0.199739 0.297579 0.520812 0.122289Z"
        fill={color}
      />
    </svg>
  );
};

export default Play;
