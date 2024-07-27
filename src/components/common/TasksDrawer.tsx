import { Drawer, DrawerContent } from "@/shadcn-components/ui/drawer";
import Task from "./Task";
import useExercises from "@/api/exercise/useExercises";

const TasksDrawer = () => {
  const { data: exercises } = useExercises();
  return (
    <Drawer open snapPoints={[`${window.innerHeight - 464}px`, 1]}>
      <DrawerContent>
        <h2 className="text-center font-extrabold text-2xl mb-4">Your tasks</h2>
        <div className="flex flex-col gap-3">
          {exercises?.map((exercise) => (
            <Task exercise={exercise} key={exercise.id} />
          )) ?? (
            <>
              <Task />
              <Task />
              <Task />
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TasksDrawer;
