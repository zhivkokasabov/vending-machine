"use client";
import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";

type State = {
  code: string;
}

type Action = { type: "append", payload: string | number }
| { type: "reset" };

type CodeProviderProps = PropsWithChildren;

const CodeContext = createContext<{
  code: string,
  append: (char: string | number) => void,
  resetCode: () => void
} | undefined>(undefined);

const codeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "append": {
      return {
        ...state,
        code: state.code + action.payload
      };
    }
    case "reset": {
      return {
        ...state,
        code: ""
      };
    }
  }
}

const CodeProvider: FC<CodeProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    codeReducer,
    { code: "" }
  );

  const append = (char: string | number) => {
    dispatch({
      payload: char,
      type: "append"
    });
  }

  const resetCode = () => {
    dispatch({
      type: "reset"
    });
  }

  return <CodeContext.Provider value={{
    ...state,
    append,
    resetCode
  }}>
    {children}
  </CodeContext.Provider>
}

const useCode = () => {
  const context = useContext(CodeContext);

  if (context === undefined) {
    throw new Error('useCode must be used within a CodeProvider');
  }

  return context;
}

export { CodeProvider, useCode };
