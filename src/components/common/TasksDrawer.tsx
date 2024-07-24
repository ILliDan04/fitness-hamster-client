import { Drawer, DrawerContent } from "@/shadcn-components/ui/drawer";
import Task from "./Task";
import dayjs from "dayjs";

const TasksDrawer = () => {
  return (
    <Drawer open snapPoints={[`${window.innerHeight - 464}px`, 1]}>
      <DrawerContent>
        <h2 className="text-center font-extrabold text-2xl mb-4">Your tasks</h2>
        <div className="flex flex-col gap-3">
          <Task />
          <Task
            exercise={{
              account_id: "asd",
              date_start: dayjs().toDate(),
              date_done: null,
              date_end: dayjs().add(1, "week").toDate(),
              done: false,
              id: "asdasdaspldkpa",
              type: "SQUAT",
            }}
          />
          <Task
            exercise={{
              account_id: "asd",
              date_start: dayjs().subtract(4, "weeks").toDate(),
              date_done: null,
              date_end: dayjs().subtract(3, "weeks").toDate(),
              done: false,
              id: "asdasdaspldkpa",
              type: "SQUAT",
            }}
          />
          <Task
            exercise={{
              account_id: "asd",
              date_start: dayjs().subtract(3, "weeks").toDate(),
              date_done: dayjs().subtract(3, "weeks").add(2, "days").toDate(),
              date_end: dayjs().subtract(2, "weeks").toDate(),
              done: true,
              id: "asdasdaspldkpa",
              type: "SQUAT",
            }}
          />
          {/* <Task />
          <Task />
          <Task done />
          <Task done />
          <Task done /> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TasksDrawer;
