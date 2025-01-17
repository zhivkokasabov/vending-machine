"use client";
import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";

type State = {
  message: string;
}

type Action = { type: "set", payload: string }
| { type: "reset" };

type MessageProviderProps = PropsWithChildren;

const MessageContext = createContext<{
  message: string,
  set: (message: string) => void,
  reset: () => void
} | undefined>(undefined);

const messageReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "set": {
      return {
        ...state,
        message: action.payload
      };
    }
    case "reset": {
      return {
        ...state,
        message: ""
      };
    }
  }
}

const MessageProvider: FC<MessageProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useReducer(
    messageReducer,
    { message: "" }
  );

  const set = (message: string) => {
    dispatch({
      payload: message,
      type: "set"
    });
  }

  const reset = () => {
    dispatch({
      type: "reset"
    });
  }

  return <MessageContext.Provider value={{
    ...state,
    set,
    reset
  }}>
    {children}
  </MessageContext.Provider>
}

const useMessage = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }

  return context;
}

export { MessageProvider, useMessage };
