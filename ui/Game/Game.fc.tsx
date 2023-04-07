import React, { FormEvent, useCallback, useEffect, useRef } from "react";
import "./game.css";
import Typewriter from "./Typewriter.fc";
import { script, cannedResponses, ItemSearch, Condition } from "./spoilers";
// import Console from "../Console/Console.fc";
import { INTRO_INPUT, useGame } from "./Game.reducer";
import { IntroScreen } from "./partials/Intro";
import { Labyrinth } from "./partials/Labyrinth";
import { Battle } from "./partials/Battle";
import { some } from "./helper";
import Console from "../Console/Console.fc";

const hasAnyItemInArray = (
  currentItems: Array<string>,
  compare: Array<string>
) => currentItems.some((r) => compare.includes(r.replace("+", "")));

const handleSaveToLocalStorage = (state: any, setOutput: any) => {
  const password = `password+${btoa(JSON.stringify(state))}`;
  localStorage.setItem("save", password);
  setOutput(`Saved in your browser! You can load by typing ┊load┊`);
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
  const {
    state,
    setSection,
    setScene,
    toggleAudio,
    loadState,
    addItem,
    replaceItem,
    removeItem,
    setInput,
    setOutput,
  } = useGame();

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInputEffect() {
    inputRef.current?.focus();
  }

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

  // Effects
  useEffect(
    function changeSectionEffect() {
      memoizedHandleSetScene();
    },
    [state.section]
  );

  useEffect(
    function inputEffect() {
      if (state.input === INTRO_INPUT) {
        setOutput(
          "Type ┊begin┊ below to start or ┊about┊ for information about the game."
        );
        return;
      }
      // save
      if (state.input === "save") {
        memoizedHandleSaveToLocalStorage();
        return;
      }
      // load cache
      if (state.input === "load") {
        memoizedHandleLoadFromLocalStorage();
        return;
      }
      // // load password string
      // if (state.input.startsWith("password+")) {
      //   loadPassword(state.input);
      //   return;
      // }
      // always on replies
      if (some(["shit", "fuck"], state.input.split(" "))) {
        setOutput("I am also a fan of Curse Words!");
        return;
      }
      if (some(state.input.split(" "), ["stuck"])) {
        setOutput(
          "Try typing in an action like ┊look around┊, ┊search┊ or ┊go right┊. If you are stuck generally, you will need some items to progress, so try revisiting places. Some items are found if you ┊search┊ curtain places."
        );
        return;
      }
      // Search
      const choice = script[state.section].prompt?.choice;
      let hit = false;
      let hitCount = 0;
      choice?.forEach(({ terms, code, reply, item, use }) => {
        terms.forEach((i) => {
          const userInput: string = state.input;
          const keyword: string = i;
          hit = userInput.toLowerCase().includes(keyword.toLowerCase());
          if (hit) {
            hitCount++;
            console.log(hitCount);
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
                if (use) {
                  console.log(use);
                  removeItem(use);
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
        setOutput(
          cannedResponses[Math.floor(Math.random() * cannedResponses.length)]
        );
      }
    },
    [state.input]
  );

  const handleBattleReply = (text: string) => {
    setOutput(text);
  };

  // Methods
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = event.currentTarget.input;
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

  // Item Conditions
  if (script[state.section].condition) {
    const { condition } = script[state.section] as Condition;
    const { items, goto, else: gotoElse, type } = condition;
    if (type === ItemSearch.AnyAll) {
      if (hasAnyItemInArray(items, state.items)) {
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
    return null;
  } else if (script[state.section].prompt) {
    const dialog = script[state.section].prompt?.dialog ?? "";
    return (
      <div className="game" data-scene={state.scene}>
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
          {state.section === "END" ? <IntroScreen /> : null}
          <p className="v">
            ⎡<span className="small">場面</span>:visual-log:{" "}
            {state.scene.toLowerCase().replaceAll("_", "-")}⎤
          </p>
          {state.scene === "BATTLE" ? (
            <Battle
              command={"inputState"}
              handleBattleReply={handleBattleReply}
            />
          ) : (
            <Typewriter text={dialog} />
          )}
          {state.scene === "LABYRINTH" ? <Labyrinth /> : null}
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
            autoComplete="off"
            type="text"
            name="input"
            id="input"
            className="input"
            ref={inputRef}
          />
        </form>
        <Console />
        <audio ref={audioRef} src={`audio/${state.scene}.mp3`} loop autoPlay />
      </div>
    );
  } else {
    return null;
  }
};

export default Game;
