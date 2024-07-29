import { Button } from "@/shadcn-components/ui/button";

type Props = {
  askCameraAccess: () => void;
};

const NoCamerasFound = ({ askCameraAccess }: Props) => {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <h1 className="font-extrabold text-xl mb-4">OOPS!</h1>
      <p>Fitton is a camera app!</p>
      <p>To continue, you'll need to allow</p>
      <p className="mb-8">Camera access</p>
      <Button variant="yellow" size="md" onClick={askCameraAccess}>
        Open camera
      </Button>
    </div>
  );
};

export default NoCamerasFound;
