const NoCamerasSupported = () => {
  return (
    <div className="h-full text-center">
      <h1 className="font-extrabold text-xl">OOPS!</h1>
      <p>Camera API could not be found!</p>
      <p>Please check your device settings and contact support</p>
    </div>
  );
};

export default NoCamerasSupported;
