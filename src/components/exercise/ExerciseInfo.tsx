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
import squatsVideo from "@/assets/exercises/squats.webm";

import { Exercise, EXERCISE_LABEL } from "@/utils/exercises";

type Props = {
  exercise: Exercise;
};

const ExerciseInfo = ({ exercise }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button icon={<Book />} variant="square" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{EXERCISE_LABEL[exercise]} guide</DialogTitle>
        </DialogHeader>
        <div className="my-4">
          <video src={squatsVideo} loop autoPlay />
        </div>
        <p className="mb-8">
          Stand with feet shoulder-width apart, lower by bending knees, keep
          back straight, chest up, thighs parallel to ground, push through heels
          to stand.
        </p>
        <DialogFooter>
          <DialogClose>
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
