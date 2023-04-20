import React, { useEffect, useState } from "react";
import { useGame } from "Game/Game.reducer";
import Typewriter from "Game/Typewriter.fc";
import { some, randomStringFromArray, searchWord } from "Game/helper";
import { Items } from "Game/spoilers";

const instructionText =
  "Time looms massive. Ready battle sequence! Objective: reduce pulsewave-telemetry enough to rip a hole in space time. Setup: your items have automatically equipped and increased your stats! You can ┊attack┊ or ┊defend┊ or use unequipped items.";

const attackResponses = [
  "You prepare an assault",
  "You prepare an attack",
  "You attack quickly",
  "You formulate an assault",
  "You attack with fervor",
];
const defendResponses = [
  "You guard yourself!",
  "You defend yourself!",
  "You brace yourself, ready for an attack!",
  "You brace yourself, ready for an assault!",
  "You ready your defenses for an assault!",
  "You ready your defenses for an attack!",
];

const timeDefendsAttackResponses = [
  "Time rebuffs your attack",
  "Time rebuffs your assault",
  "Time braces for your hit",
  "Time braces for your attack",
  "Time generates it's reply",
  "Time orchestrates it's response",
  "Time orchestrates it's defense",
];

const PLAYER_MAX_HP = 2600;
const ENEMY_MAX_HP = 7800;

function HealthBar({ hp, max }: { hp: number; max: number }) {
  const current = Math.round(hp / 200);
  const left = Math.round(max / 200) - Math.round(hp / 200);

  return (
    <>
      {Array(current).fill("▓").join("")}
      {Array(left).fill("░").join("")}
    </>
  );
}

type AttackResult = {
  playerDmg: number;
  enemyDmg: number;
};

const calculateAttacks = (
  spirit: boolean,
  augments: { atk: number; def: number },
  power: boolean,
  shield: boolean
): AttackResult => {
  let powerFactor = 1;
  // Damage to enemy
  let enemyDmg = Math.floor(
    Math.random() * 300 +
      300 * (augments.atk * 0.8 * (spirit ? 2 : 1)) * powerFactor
  );
  if (power) {
    const dub = Math.floor(Math.random() * 2);
    dub === 1 ? (enemyDmg = enemyDmg * 3) : (enemyDmg = 0);
  }
  // Damage to player
  let playerDmg =
    Math.floor(Math.random() * 6) !== 0
      ? Math.floor(Math.random() * 300 + 300 / (augments.def / 2))
      : 0;
  if (shield) {
    playerDmg = 0;
  }

  return {
    enemyDmg,
    playerDmg,
  };
};

function Battle() {
  // reducer
  const { state, setOutput, setInput, removeItems, setSection } = useGame();

  // State
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [spirit, setSpirit] = useState(false);
  const [power, setPower] = useState(false);
  const [shield, setShield] = useState(false);
  const [enemyHp, setEnemyHp] = useState(ENEMY_MAX_HP);
  const [augments, setAugment] = useState<{ atk: number; def: number }>({
    atk: 1,
    def: 1,
  });

  const deathSequence = () => {
    setSection("BATTLE_DEATH");
    setOutput("");
  };

  const endSequence = () => {
    setSection("BATTLE_END");
    setOutput("");
  };

  const handleCommand = (command: string) => {
    if (command === "" || !command) {
      return;
    }
    if (
      !some(
        [command],
        ["attack", "defend", Items.Pin, Items.Noodles, Items.Whiskey]
      )
    ) {
      setOutput("...awaiting command");
      return;
    }
    setInput("");
    let went = false;
    // Moves
    // attack
    if (searchWord(command, "attack")) {
      const { enemyDmg, playerDmg } = calculateAttacks(
        spirit,
        augments,
        power,
        shield
      );
      // Death
      if (playerHp - playerDmg <= 0) {
        deathSequence();
        return;
      }
      if (enemyHp - enemyDmg <= 0) {
        endSequence();
        return;
      }
      if (spirit) {
        setSpirit(false);
      }
      if (power) {
        setPower(false);
      }
      setOutput(
        `${randomStringFromArray(attackResponses)} ${
          enemyDmg === 0 ? `but miss!` : `and deal ${enemyDmg} damage!`
        }
        ${randomStringFromArray(timeDefendsAttackResponses)} ${
          playerDmg === 0
            ? `but ${
                shield ? "you used Shield!" : "misses"
              }! You take no damage.`
            : `and hits hard. You take ${playerDmg}!`
        }${enemyHp < 2000 ? " Time is weakening!" : "."}`
      );
      setEnemyHp((prev) => {
        return prev - enemyDmg;
      });
      setPlayerHp((prev) => {
        return prev - playerDmg;
      });
      went = true;
      setShield(false);
      return;
    }
    // defend
    if (searchWord(command, "defend")) {
      const { enemyDmg, playerDmg } = calculateAttacks(
        spirit,
        augments,
        power,
        shield
      );
      // Death
      if (enemyHp - enemyDmg <= 0) {
        endSequence();
        return;
      }
      if (playerHp - playerDmg <= 0) {
        deathSequence();
        return;
      }
      setOutput(
        `${randomStringFromArray(
          defendResponses
        )} Time takes advantage and hits hard ${
          playerDmg === 0
            ? ` but ${
                shield
                  ? " you have Energy shield! You take no damage."
                  : "misses! You take no damage."
              }`
            : ` and you take ${playerDmg}!`
        }`
      );
      setPlayerHp((prev) => {
        return prev - playerDmg;
      });
      setSpirit(true);
      setShield(false);
      went = true;
      return;
    }
    // items
    if (searchWord(command, "whiskey")) {
      if (!some(state.items, [Items.Whiskey])) {
        setOutput("You don't have that item!");
        return;
      }
      setPower(true);
      removeItems([Items.Whiskey]);
      setOutput(
        "You take a shot of whiskey, your next attack will either be triple or null!"
      );
      went = true;
      return;
    }
    if (searchWord(command, "pin")) {
      if (!some(state.items, [Items.Pin])) {
        setOutput("You don't have that item!");
        return;
      }
      setShield(true);
      removeItems([Items.Pin]);
      setOutput(
        "You inspect the pin, and hit a button on the side. A temporary shield surrounds you!"
      );
      went = true;
      return;
    }
    if (searchWord(command, "noodles")) {
      if (!some(state.items, [Items.Noodles])) {
        setOutput("You don't have that item!");
        return;
      }
      setPlayerHp((prev) => {
        if (prev + 1000 >= PLAYER_MAX_HP) {
          return PLAYER_MAX_HP;
        }
        return prev + 1000;
      });
      removeItems([Items.Noodles]);
      setOutput("You slurp your noodz and heal yourself by 1000!");
      went = true;
      return;
    }
    if (!went) {
      setOutput("...awaiting command");
      return;
    }
  };

  // Effects
  useEffect(function () {
    setInput("");
    if (some(state.items, [Items.Dagger])) {
      removeItems([Items.Dagger]);
      setAugment((prev) => ({ ...prev, atk: prev.atk + 1 }));
    }
    if (some(state.items, [Items.Wire])) {
      removeItems([Items.Wire]);
      setAugment((prev) => ({ ...prev, atk: prev.atk + 1 }));
    }
    if (some(state.items, [Items.WirePlus])) {
      removeItems([Items.WirePlus]);
      setAugment((prev) => ({ ...prev, atk: prev.atk + 2 }));
    }
    if (some(state.items, [Items.Shard])) {
      removeItems([Items.Shard]);
      setAugment((prev) => ({ ...prev, def: prev.def + 1 }));
    }
    if (some(state.items, [Items.ShardPlus])) {
      removeItems([Items.ShardPlus]);
      setAugment((prev) => ({ ...prev, def: prev.def + 2 }));
    }
  }, []);

  useEffect(() => {
    if (!!state.input && playerHp) handleCommand(state.input);
  }, [state.input, playerHp]);

  return (
    <div className="battle">
      <div className="img-wrapper">
        <img alt="Time is massive and looms." src="./images/time.png" />
        <Typewriter text={instructionText} />
      </div>
      <div className="status">
        <div>⎡戦い:status-log⎤</div>
        <div style={{ padding: "5px" }}>
          <span className="small">健</span>:HP:
          <HealthBar hp={playerHp} max={PLAYER_MAX_HP} />:{playerHp}
        </div>
        <div style={{ marginTop: "20px" }}>⎡戦い:pulse-wave⎤</div>
        <div style={{ padding: "5px", borderTop: "1px dotted" }}>
          <span className="small">頃</span>:PW:
          <HealthBar hp={enemyHp} max={ENEMY_MAX_HP} />
          :???
        </div>
      </div>
    </div>
  );
}

export { Battle };
