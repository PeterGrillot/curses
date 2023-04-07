import React, { useEffect, useState } from "react";
import { Player, useGame } from "Game/Game.reducer";
import Typewriter from "Game/Typewriter.fc";
import { some } from "Game/helper";
import { Items } from "Game/spoilers";

function attack() {}

function Battle({
  command,
  handleBattleReply,
}: {
  command: string;
  handleBattleReply: Function;
}) {
  const { state, setOutput } = useGame();
  const [playerHp, setPlayerHp] = useState(2600);
  const [spirit, setSpirit] = useState(false);
  const [enemyHp, setEnemyHp] = useState(7777);
  const force = some(state.items, [Items.Dagger, Items.Energy, Items.Shard])
    ? 3
    : 1;
  const defense = some(state.items, [Items.ShardPlus]) ? 2 : 1;
  const handleCommand = (command: string) => {
    if (some(command.split(" "), ["attack", "hit"])) {
      let spiritFactor = 1;
      if (spirit) {
        spiritFactor = 2;
      }
      const enemyDmg =
        Math.floor(Math.random() * 300 + 300) * (force * spiritFactor);
      const playerDmg = Math.floor(Math.random() * 300 + 300) * defense;
      setOutput(
        `You ${
          force === 3 ? "deal massive damage" : "attack"
        }! Time was hit by ${enemyDmg}! Time rebuffs your attack, ${
          playerDmg === 0
            ? `and hits hard. You take ${playerDmg}`
            : "but misses! You take no damage."
        }`
      );
      setEnemyHp((prev) => {
        return prev - enemyDmg;
      });
      setPlayerHp((prev) => {
        return prev - playerDmg;
      });
    }
    if (some(command.split(" "), ["defend", "guard", "block"])) {
      const playerDmg =
        Math.floor(Math.random() * 4) !== 0
          ? Math.floor(Math.random() * 300 + 300) * defense
          : 0;
      setOutput(
        `You defend and save up your attack! Time takes advantage and hits hard. You take ${playerDmg}`
      );
      setPlayerHp((prev) => {
        return prev - playerDmg;
      });
      setSpirit(true);
    }
    if (some(command.split(" "), ["stuck"])) {
      setOutput("you swing!");
    }
  };

  useEffect(() => {
    setOutput(`HP: ${playerHp}`);
  }, [playerHp]);

  useEffect(() => {
    handleCommand(command);
  }, [command]);

  return <>BATTLE</>;
}

export { Battle };
