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
  input: string;
  output: string;
  hasBeen: Record<string, number>;
};

enum ActionType {
  AddItem,
  AddItems,
  ReplaceItem,
  RemoveItems,
  SetSection,
  SetScene,
  ToggleAudio,
  LoadState,
  SetInput,
  SetOutput,
  ResetState,
}

type Action<T, P> = {
  readonly type: T;
  readonly payload: P;
};

type AddItemActionType = ActionType.AddItem;
type AddItemsActionType = ActionType.AddItems;
type ReplaceItemActionType = ActionType.ReplaceItem;
type RemoveItemsActionType = ActionType.RemoveItems;
type SetSectionActionType = ActionType.SetSection;
type SetSceneActionType = ActionType.SetScene;
type ToggleAudioActionType = ActionType.ToggleAudio;
type LoadStateActionType = ActionType.LoadState;
type SetInputActionType = ActionType.SetInput;
type SetOutputActionType = ActionType.SetOutput;
type ResetStateActionType = ActionType.ResetState;

type AddItemAction = Action<AddItemActionType, string>;
type AddItemsAction = Action<AddItemsActionType, Array<string>>;
type ReplaceItemAction = Action<ReplaceItemActionType, string>;
type RemoveItemsAction = Action<RemoveItemsActionType, Array<string>>;
type SetSectionAction = Action<SetSectionActionType, string>;
type SetSceneAction = Action<SetSceneActionType, string>;
type ToggleAudioAction = Action<ToggleAudioActionType, boolean>;
type LoadStateAction = Action<LoadStateActionType, Player>;
type SetInputAction = Action<SetInputActionType, string>;
type SetOutputAction = Action<SetOutputActionType, string>;
type ResetStateAction = { type: ResetStateActionType };

function reducer(
  state: Player,
  action:
    | AddItemAction
    | AddItemsAction
    | ReplaceItemAction
    | RemoveItemsAction
    | ToggleAudioAction
    | SetSectionAction
    | SetSceneAction
    | LoadStateAction
    | SetInputAction
    | SetOutputAction
    | ResetStateAction
) {
  switch (action.type) {
    case ActionType.AddItem:
      return {
        ...state,
        items:
          action.payload === "clear" ? [] : [...state.items, action.payload],
      };
    case ActionType.AddItems:
      return { ...state, items: action.payload };
    case ActionType.ReplaceItem: {
      const filteredItems = state.items.filter(
        (i) => i !== action.payload.slice(1)
      );
      return {
        ...state,
        items: [...filteredItems, action.payload],
      };
    }
    case ActionType.RemoveItems: {
      const itemsToRemove = action.payload;
      const filteredItems = state.items.filter(
        (item) => !itemsToRemove.includes(item)
      );
      return {
        ...state,
        items: filteredItems,
      };
    }
    case ActionType.SetSection: {
      let check = state.hasBeen[action.payload];
      let newState = {};
      if (!check) {
        newState = { [action.payload]: -1 };
      }
      if (check === -1) {
        newState = { [action.payload]: 1 };
      }
      return {
        ...state,
        section: action.payload,
        hasBeen: {
          ...state.hasBeen,
          ...newState,
        },
      };
    }
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
    case ActionType.ResetState:
      return { ...initialState, audioIsPlaying: state.audioIsPlaying };
    default:
      throw Error("Unknown Action");
  }
}

export const INTRO_INPUT = "@$@$@%@$%%$%@*#%";

//Context and Provider
const initialState = {
  items: [],
  // items: [
  //   Items.Shard,
  //   Items.Dagger,
  //   Items.Energy,
  //   Items.Whiskey,
  //   Items.Noodles,
  //   Items.Wire,
  // ], DEV Only
  section: "BEGIN",
  scene: "BEGIN",
  audioIsPlaying: false,
  input: INTRO_INPUT,
  output: "",
  hasBeen: {},
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
  addItems: (items: Array<string>) => void;
  replaceItem: (item: string) => void;
  removeItems: (items: Array<string>) => void;
  resetState: () => void;
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
      payload: { ...newState },
    });
  };

  const addItem = (item: string) => {
    dispatch({ type: ActionType.AddItem, payload: item });
  };

  const addItems = (items: Array<string>) => {
    dispatch({ type: ActionType.AddItems, payload: items });
  };

  const replaceItem = (item: string) => {
    dispatch({ type: ActionType.ReplaceItem, payload: item });
  };

  const removeItems = (items: Array<string>) => {
    dispatch({ type: ActionType.RemoveItems, payload: items });
  };

  const resetState = () => {
    dispatch({ type: ActionType.ResetState });
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
    addItems,
    replaceItem,
    removeItems,
    resetState,
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
