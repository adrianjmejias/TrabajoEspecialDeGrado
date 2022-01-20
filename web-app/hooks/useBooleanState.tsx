import React from "react";

interface BooleanMutators {
  setFalse(): void;
  setTrue(): void;
  toggle(): void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useBooleanState = (
  initialState: boolean | undefined = false
): [boolean, BooleanMutators] => {
  const [value, setValue] = React.useState(initialState);

  const setFalse = React.useCallback(() => {
    setValue(false);
  }, []);

  const setTrue = React.useCallback(() => {
    setValue(true);
  }, []);

  const toggle = React.useCallback(() => {
    setValue((val) => !val);
  }, []);

  return [value, { setValue, setFalse, setTrue, toggle }];
};

export default useBooleanState;
