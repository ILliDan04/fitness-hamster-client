import { Button } from "@/shadcn-components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/shadcn-components/ui/dialog";
import Book from "../icons/Book";
import {
  Exercise,
  EXERCISE_DESC,
  EXERCISE_LABEL,
  EXERCISE_VIDEO,
} from "@/utils/exercises";

type Props = {
  exercise: Exercise;
};

const ExerciseInfo = ({ exercise }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={<Book />} variant="square" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{EXERCISE_LABEL[exercise]} guide</DialogTitle>
        </DialogHeader>
        <div className="my-4 mx-auto w-1/3">
          <video loop autoPlay playsInline muted>
            <source
              src={EXERCISE_VIDEO[exercise][0]}
              type="video/mp4;codecs=hvc1"
            />
            <source
              src={EXERCISE_VIDEO[exercise][1]}
              type="video/webm;codecs=vp9"
            />
          </video>
        </div>
        <p className="mb-8">{EXERCISE_DESC[exercise]}</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="yellow" size="md" className="px-12 mx-auto">
              Ok
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExerciseInfo;
