import { cn } from "@/shadcn-lib/utils";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

type Props = { message: string; timeout?: number; onTimeout: () => void };

type MessageComp = React.FC<Props> & {
  info: (message: string, timeout?: number) => void;
};

const Message: MessageComp = ({
  message,
  timeout = 2000,
  onTimeout,
}: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const t = setTimeout(() => {
      setShow(false);
      onTimeout();
    }, timeout);
    return () => clearTimeout(t);
  }, [timeout, onTimeout]);

  return (
    <div
      className={cn(
        "fixed bg-slate-900 rounded-lg duration-200 p-2.5 translate-x-1/2 right-1/2",
        show ? "top-2" : "-top-12"
      )}
    >
      {message}
    </div>
  );
};

const messageRootElem = document.createElement("div");
document.body.appendChild(messageRootElem);
const messageRoot = createRoot(messageRootElem!);

Message.info = (() => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (message: string, timeout: number = 2000) => {
    const onTimeout = () => {
      setTimeout(() => {
        messageRoot.render(null);
        timeoutId = undefined;
      }, 200);
    };

    if (timeoutId) {
      messageRoot.render(null);
      clearTimeout(timeoutId);
    }

    messageRoot.render(
      <Message message={message} timeout={timeout} onTimeout={onTimeout} />
    );

    timeoutId = setTimeout(() => messageRoot.render(null), timeout + 200);
  };
})();

export default Message;
