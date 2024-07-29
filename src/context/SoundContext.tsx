import { createContext, PropsWithChildren, useCallback, useState } from "react";

type SoundContextType = {
  on?: boolean;
  toggle: () => void;
};

export const soundContext = createContext<SoundContextType>({
  on: true,
  toggle: () => {},
});

type Props = PropsWithChildren;

const SoundContext = ({ children }: Props) => {
  const [soundOn, setSoundOn] = useState(true);

  const toggle = useCallback(() => setSoundOn((v) => !v), []);

  return (
    <soundContext.Provider value={{ on: soundOn, toggle }}>
      {children}
    </soundContext.Provider>
  );
};

export default SoundContext;
