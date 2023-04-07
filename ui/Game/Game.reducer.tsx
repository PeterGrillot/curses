import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

export type Player = {
  items: Array<string>;
  section: string;
  scene: string;
  audioIsPlaying: boolean;
  buttonsAreShowing: boolean;
  input: string;
  output: string;
};

enum ActionType {
  AddItem,
  ReplaceItem,
  RemoveItem,
  SetSection,
  SetScene,
  ToggleAudio,
  LoadState,
  SetInput,
  SetOutput,
}

type Action<T, P> = {
  readonly type: T;
  readonly payload: P;
};

type AddItemActionType = ActionType.AddItem;
type ReplaceItemActionType = ActionType.ReplaceItem;
type RemoveItemActionType = ActionType.RemoveItem;
type SetSectionActionType = ActionType.SetSection;
type SetSceneActionType = ActionType.SetScene;
type ToggleAudioActionType = ActionType.ToggleAudio;
type LoadStateActionType = ActionType.LoadState;
type SetInputActionType = ActionType.SetInput;
type SetOutputActionType = ActionType.SetOutput;

type AddItemAction = Action<AddItemActionType, string>;
type ReplaceItemAction = Action<ReplaceItemActionType, string>;
type RemoveItemAction = Action<RemoveItemActionType, string>;
type SetSectionAction = Action<SetSectionActionType, string>;
type SetSceneAction = Action<SetSceneActionType, string>;
type ToggleAudioAction = Action<ToggleAudioActionType, boolean>;
type LoadStateAction = Action<LoadStateActionType, Player>;
type SetInputAction = Action<SetInputActionType, string>;
type SetOutputAction = Action<SetOutputActionType, string>;

function reducer(
  state: Player,
  action:
    | AddItemAction
    | ReplaceItemAction
    | RemoveItemAction
    | ToggleAudioAction
    | SetSectionAction
    | SetSceneAction
    | LoadStateAction
    | SetInputAction
    | SetOutputAction
) {
  switch (action.type) {
    case ActionType.AddItem:
      return {
        ...state,
        items:
          action.payload === "clear" ? [] : [...state.items, action.payload],
      };
    case ActionType.ReplaceItem: {
      const filteredItems = state.items.filter(
        (i) => i !== action.payload.slice(1)
      );
      return {
        ...state,
        items: [...filteredItems, action.payload],
      };
    }
    case ActionType.RemoveItem: {
      const filteredItems = state.items.filter((i) => i !== action.payload);
      return {
        ...state,
        items: filteredItems,
      };
    }
    case ActionType.SetSection:
      return { ...state, section: action.payload };
    case ActionType.SetScene:
      return { ...state, scene: action.payload };
    case ActionType.SetInput:
      return { ...state, input: action.payload };
    case ActionType.SetOutput:
      return { ...state, output: action.payload };
    case ActionType.ToggleAudio:
      return { ...state, audioIsPlaying: action.payload };
    case ActionType.LoadState:
      return { ...action.payload };
    default:
      throw Error("Unknown Action");
  }
}

export const INTRO_INPUT = "$%REIU$%IUREIU$%IUERKJFDkjgfkjreiuewiu";

//Context and Provider
const initialState = {
  items: [],
  section: "BEGIN",
  scene: "BEGIN",
  audioIsPlaying: false,
  buttonsAreShowing: false,
  input: INTRO_INPUT,
  output: "",
};

// const GameContext = createContext<Player>(initialState);
// Create the context
interface GameContextType {
  state: Player;
  dispatch: React.Dispatch<
    | AddItemAction
    | ReplaceItemAction
    | ToggleAudioAction
    | SetSectionAction
    | SetSceneAction
    | LoadStateAction
    | SetInputAction
    | SetOutputAction
  >;
  setSection: (section: string) => void;
  setScene: (scene: string) => void;
  setInput: (input: string) => void;
  setOutput: (output: string) => void;
  toggleAudio: (toggle: boolean) => void;
  loadState: (newState: Player) => void;
  addItem: (item: string) => void;
  replaceItem: (item: string) => void;
  removeItem: (item: string) => void;
  buttonsAreShowing: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameProvider = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSection = (section: string) => {
    dispatch({ type: ActionType.SetSection, payload: section });
  };

  const setScene = (scene: string) => {
    dispatch({ type: ActionType.SetScene, payload: scene });
  };
  const setInput = (input: string) => {
    dispatch({ type: ActionType.SetInput, payload: input });
  };
  const setOutput = (output: string) => {
    dispatch({ type: ActionType.SetOutput, payload: output });
  };

  const toggleAudio = (toggle: boolean) => {
    dispatch({ type: ActionType.ToggleAudio, payload: toggle });
  };

  const loadState = (newState: Player) => {
    dispatch({
      type: ActionType.LoadState,
      payload: { ...newState, output: "Last save loaded!" },
    });
  };

  const addItem = (item: string) => {
    dispatch({ type: ActionType.AddItem, payload: item });
  };

  const replaceItem = (item: string) => {
    dispatch({ type: ActionType.ReplaceItem, payload: item });
  };

  const removeItem = (item: string) => {
    dispatch({ type: ActionType.RemoveItem, payload: item });
  };

  const value: GameContextType = {
    state,
    dispatch,
    setSection,
    setScene,
    setInput,
    setOutput,
    toggleAudio,
    loadState,
    addItem,
    replaceItem,
    removeItem,
    buttonsAreShowing: false,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within GameContext");
  }

  return context;
};

export { reducer, ActionType, GameContext, GameProvider, useGame };
