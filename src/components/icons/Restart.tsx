type Props = {
  color?: string;
};

const Restart = ({ color = "#F43F5E" }: Props) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.14137 2.99635C9.26178 1.27579 13.144 1.82644 15.6628 4.34689C15.67 4.35405 15.6772 4.36109 15.6846 4.36802L18.4796 7.00001H15.0002C14.4479 7.00001 14.0002 7.44772 14.0002 8.00001C14.0002 8.55229 14.4479 9.00001 15.0002 9.00001H20.9978H21.0002C21.1411 9.00001 21.2752 8.97086 21.3968 8.91827C21.5158 8.86695 21.6266 8.79154 21.7218 8.69227C21.7332 8.68036 21.7444 8.66815 21.7552 8.65568C21.919 8.46733 22.0002 8.23344 22.0002 8.00002C22.0002 7.99927 22.0002 7.99852 22.0002 7.99778V2.00001C22.0002 1.44772 21.5525 1.00001 21.0002 1.00001C20.4479 1.00001 20.0002 1.44772 20.0002 2.00001V5.68473L17.0665 2.92215C13.9176 -0.21903 9.07164 -0.903256 5.17566 1.24495C1.27515 3.39565 -0.732691 7.86684 0.251234 12.211C1.23516 16.5551 4.97363 19.7248 9.42018 19.9849C13.8667 20.245 17.9493 17.5329 19.4331 13.3331C19.617 12.8124 19.344 12.2411 18.8233 12.0571C18.3025 11.8731 17.7313 12.1462 17.5473 12.6669C16.3603 16.0267 13.0942 18.1964 9.53699 17.9883C5.97974 17.7802 2.98897 15.2445 2.20183 11.7692C1.41469 8.29387 3.02096 4.71691 6.14137 2.99635Z"
        fill={color}
      />
    </svg>
  );
};

export default Restart;
