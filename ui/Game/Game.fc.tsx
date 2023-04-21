import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./game.css";
import Typewriter from "./Typewriter.fc";
import {
  script,
  cannedResponses,
  ItemSearch,
  Condition,
  Items,
} from "./spoilers";
import { INTRO_INPUT, useGame } from "./Game.reducer";
import { IntroScreen } from "./partials/Intro";
import { Labyrinth } from "./partials/Labyrinth";
import { Battle } from "./partials/Battle";
import { randomStringFromArray, some } from "./helper";
import Console from "../Console/Console.fc";

// Generic Functions
const hasAnyItemInArray = (
  currentItems: Array<string>,
  compare: Array<string>
) => compare.some((r) => currentItems.includes(r.replace("+", "")));

const handleSaveToLocalStorage = (state: any, setOutput: any) => {
  const password = `password+${btoa(JSON.stringify(state))}`;
  localStorage.setItem("save", password);
};

const handleLoadFromLocalStorage = (loadState: any) => {
  const password = localStorage.getItem("save") ?? "null";
  if (password.startsWith("password+")) {
    const newState = JSON.parse(atob(password.slice(9)));
    loadState(newState);
  }
};

const handleSetScene = (section: string, setScene: Function) => {
  const scene = script[section].prompt?.scene;
  if (!!scene) {
    setScene(scene);
  }
};

const Game = () => {
  // Reducers
  const {
    state,
    setSection,
    setScene,
    toggleAudio,
    loadState,
    addItem,
    addItems,
    replaceItem,
    removeItems,
    resetState,
    setInput,
    setOutput,
  } = useGame();

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInputEffect() {
    inputRef.current?.focus();
  }

  // State
  const [alertMessage, setAlertMessage] = useState<String | undefined>(
    undefined
  );

  // Memoized
  const memoizedHandleSaveToLocalStorage = useCallback(
    () => handleSaveToLocalStorage(state, setOutput),
    [state, setOutput]
  );

  const memoizedHandleLoadFromLocalStorage = useCallback(
    () => handleLoadFromLocalStorage(loadState),
    [loadState]
  );

  const memoizedHandleSetScene = useCallback(
    () => handleSetScene(state.section, setScene),
    [state.section, setScene]
  );

  // Methods
  const handleMessage = (message: string) => {
    setAlertMessage((prev) => {
      if (!prev) return message;
    });

    const timeout = setTimeout(() => {
      setAlertMessage((prev) => {
        if (prev) return undefined;
      });
    }, 3000);
    return () => clearTimeout(timeout);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.input;
    if (state.input === value) {
      // This is fucking stupid but it works
      // If the user enters the same thing twice
      // There is a bug in how I am using useEffect with
      // the state.input dependency
      setInput(value.toUpperCase());
      return;
    }
    // clear input
    if (inputRef.current) inputRef.current.value = "";
    // no command
    if (value === "" || !value) {
      return;
    }
    setInput(value);
  };

  const handleToggleAudio = () => {
    if (state.audioIsPlaying) {
      audioRef.current?.pause();
      toggleAudio(false);
    } else {
      audioRef.current?.play();
      toggleAudio(true);
    }
  };

  // Effects
  useEffect(
    function changeSectionEffect() {
      memoizedHandleSetScene();
    },
    [state.section]
  );

  useEffect(
    function inputEffect() {
      if (state.scene === "BATTLE") {
        return;
      }
      if (state.scene === "END" && state.input === "stats") {
        setOutput("You got ");
        return;
      }
      if (state.input === "iddqd") {
        addItems(Object.values(Items));
        setSection("BATTLE_INIT");
        return;
      }
      if (state.input === "haxthamainframe") {
        addItems([
          Items.Noodles,
          Items.Whiskey,
          Items.ShardPlus,
          Items.WirePlus,
        ]);
        setSection("LABYRINTH");
        return;
      }
      if (state.input === INTRO_INPUT) {
        setOutput(
          "Type ┊begin┊ below to start or ┊about┊ for information about the game."
        );
        return;
      }
      // save
      if (state.input === "save") {
        memoizedHandleSaveToLocalStorage();
        handleMessage("r/w disk: success");
        return;
      }
      // load cache
      if (state.input === "load") {
        memoizedHandleLoadFromLocalStorage();
        return;
      }
      // always on replies
      if (some(["shit", "fuck", "fucking"], state.input.split(" "))) {
        setOutput("I am also a fan of Curse Words!");
        return;
      }
      if (some(["stuck"], state.input.split(" "))) {
        setOutput(
          "Try typing in an action like ┊look around┊, ┊search┊ or ┊go right┊. If you are stuck generally, you will need some items to progress, so try revisiting places. Some items are found if you ┊search┊ certain places."
        );
        return;
      }
      // Search
      const choice = script[state.section].prompt?.choice;
      let hit = false;
      let hitCount = 0;
      choice?.forEach(({ terms, code, reply, item }) => {
        terms.forEach((i) => {
          const userInput: string = state.input.toLowerCase();
          const keyword: string = i;
          const pattern = new RegExp(`\\b${keyword}\\b`, "g");
          hit = pattern.test(userInput);

          if (hit) {
            hitCount++;
            // new section
            if (hitCount === 1) {
              if (code) {
                setSection(code);
                setOutput("");
                return;
              }
              // reply
              if (reply) {
                if (item) {
                  if (
                    state.items.some((i) => i === item) ||
                    state.items.some((i) => i.replace("+", "") === item)
                  ) {
                    setOutput(`You already possess ${item}`);
                    return;
                  }

                  if (item.startsWith("+")) replaceItem(item);
                  else addItem(item);
                }
                setOutput(reply);
                return;
              }
            }
          }
        });
      });
      // unknown input
      if (!hitCount) {
        setOutput(randomStringFromArray(cannedResponses));
      }
    },
    [state.input]
  );

  useEffect(() => {
    // Reset input
    if (inputRef.current) inputRef.current.value = "";
  }, [state.input]);

  useEffect(() => {
    // Death reset
    if (state.section === "BEGIN") {
      resetState();
    }
    // Item Conditions
    if (script[state.section].condition) {
      const { condition } = script[state.section] as Condition;
      const { items, goto, else: gotoElse, type, uses } = condition;
      if (type === ItemSearch.AnyAll) {
        if (hasAnyItemInArray(items, state.items)) {
          if (uses) {
            removeItems(uses);
          }
          setSection(goto);
        } else {
          setSection(gotoElse);
        }
      }
      if (type === ItemSearch.AnyExact) {
        if (some(items, state.items)) {
          setSection(goto);
        } else {
          setSection(gotoElse);
        }
      }
    }
  }, [state.section]);

  const dialog = script[state.section].prompt?.dialog ?? "";

  console.log(state.hasBeen);
  return (
    <div className="game" data-scene={state.scene}>
      <div className="alert" hidden={!alertMessage}>
        {alertMessage}
      </div>
      <div className="rack status">
        <button onClick={handleToggleAudio}>
          {state.audioIsPlaying ? "◉ BG Music" : "○ BG Music"}
        </button>
        <ul className="item-list">
          {state.items.length ? <li>items:</li> : null}
          {state.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div className="rack dialog" onClick={focusInputEffect}>
        {state.section === "BEGIN" ? <IntroScreen /> : null}
        {state.scene === "LABYRINTH" ? <Labyrinth /> : null}
        <p className="v">
          ⎡<span className="small">場面</span>:visual-log:{" "}
          {state.section.toLowerCase().replaceAll("_", "-")}⎤
        </p>
        {state.scene === "BATTLE" ? (
          <Battle />
        ) : (
          <>
            {state.hasBeen[state.section] !== 1 ? (
              <Typewriter text={dialog} />
            ) : (
              <p>{dialog}</p>
            )}
          </>
        )}
      </div>
      <div className="rack form">
        <label>
          <span className="small">出力</span>:cp:output:
        </label>
        <div className="textarea-read-only">
          {state.output}
          <span className="cursor">▓</span>
        </div>
      </div>
      <form className="rack form" onSubmit={handleSubmit}>
        <label htmlFor="input">
          <span className="small">入力</span>:usr:input:
        </label>
        <input
          autoFocus
          disabled={state.scene === "LABYRINTH"}
          autoComplete="off"
          type="text"
          name="input"
          id="input"
          className="input"
          ref={inputRef}
        />
      </form>
      <Console />
      <audio
        ref={audioRef}
        src={`audio/${state.scene}.mp3`}
        loop
        autoPlay={state.audioIsPlaying}
      />
    </div>
  );
};

export default Game;
