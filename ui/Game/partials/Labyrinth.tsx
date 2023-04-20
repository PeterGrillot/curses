import { useGame } from "Game/Game.reducer";
import React, { useEffect, useRef, useState } from "react";
import { LabyrinthCodes } from "../spoilers";
// Colors
const darkFloor = "#2D4F31";
const lightFloor = "#89F095";
const darkWall = "#172919";
const mediumWall = darkFloor;
const lightWall = "#66B36F";
const mediumFloor = lightWall;
const exitWall = "#b3f7b5";

const Canvas = ({ view }: { view: LocationType }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx == null) throw new Error("Could not get context");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const topLeft = view[0][0];
        const topMiddle = view[0][1];
        const topRight = view[0][2];
        const bottomLeft = view[1][0];
        const bottomRight = view[1][2];

        if (topLeft !== 1) {
          // wall
          ctx.fillStyle = darkWall;
          ctx.fillRect(0, 0, 150, 150);
          // floor
          ctx.fillStyle = darkFloor;
          ctx.beginPath();
          ctx.moveTo(0, 150);
          ctx.lineTo(150, 150);
          ctx.lineTo(100, 200);
          ctx.lineTo(0, 200);
          ctx.closePath();
          ctx.fill();
        }
        if (topLeft === 1) {
          // wall
          ctx.fillStyle = mediumWall;
          ctx.fillRect(0, 0, 100, 200);
          // wall
          ctx.fillStyle = mediumWall;
          ctx.beginPath();
          ctx.moveTo(100, 0);
          ctx.lineTo(150, 0);
          ctx.lineTo(150, 150);
          ctx.lineTo(100, 200);
          ctx.closePath();
          ctx.fill();
        }

        if (topRight !== 1) {
          // wall
          ctx.fillStyle = darkWall;
          ctx.fillRect(300, 0, 150, 150);
          // floor
          ctx.fillStyle = darkFloor;
          ctx.beginPath();
          ctx.moveTo(300, 150);
          ctx.lineTo(450, 150);
          ctx.lineTo(450, 200);
          ctx.lineTo(350, 200);
          ctx.closePath();
          ctx.fill();
        }
        if (topRight === 1) {
          // close wall
          ctx.fillStyle = mediumWall;
          ctx.fillRect(350, 0, 100, 200);
          // close wall side
          ctx.beginPath();
          ctx.moveTo(300, 0);
          ctx.lineTo(350, 0);
          ctx.lineTo(350, 200);
          ctx.lineTo(300, 150);
          ctx.closePath();
          ctx.fillStyle = mediumWall;
          ctx.fill();
        }
        if (topMiddle !== 1) {
          // wall
          ctx.shadowBlur = 20;
          ctx.fillStyle = darkWall;
          ctx.shadowColor = darkWall;
          if (topMiddle === 2 || topMiddle === 3) {
            // wall
            ctx.fillStyle = exitWall;
            ctx.shadowColor = exitWall;
          }
          ctx.fillRect(150, 0, 150, 150);
          ctx.shadowBlur = 0;
          ctx.stroke();
          // floor
          ctx.beginPath();
          ctx.moveTo(150, 150);
          ctx.lineTo(300, 150);
          ctx.lineTo(350, 200);
          ctx.lineTo(100, 200);
          ctx.closePath();
          ctx.fillStyle = mediumFloor;
          ctx.fill();
        }

        if (topMiddle === 1) {
          // wall
          ctx.fillStyle = lightWall;
          ctx.beginPath();
          ctx.moveTo(100, 0);
          ctx.lineTo(350, 0);
          ctx.lineTo(350, 200);
          ctx.lineTo(100, 200);
          ctx.closePath();
          ctx.fill();
        }
        if (bottomLeft !== 1) {
          // floor
          ctx.fillStyle = mediumFloor;
          ctx.beginPath();
          ctx.moveTo(0, 200);
          ctx.lineTo(100, 200);
          ctx.lineTo(0, 300);
          ctx.closePath();
          ctx.fill();
        }
        if (bottomLeft === 1) {
          // wall
          ctx.fillStyle = lightWall;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(100, 0);
          ctx.lineTo(100, 200);
          ctx.lineTo(0, 300);
          ctx.closePath();
          ctx.fill();
        }
        if (bottomRight !== 1) {
          // floor
          ctx.fillStyle = mediumFloor;
          ctx.beginPath();
          ctx.moveTo(350, 200);
          ctx.lineTo(450, 200);
          ctx.lineTo(450, 300);
          ctx.closePath();
          ctx.fill();
        }
        if (bottomRight === 1) {
          // wall
          ctx.fillStyle = lightWall;
          ctx.beginPath();
          ctx.moveTo(350, 0);
          ctx.lineTo(450, 0);
          ctx.lineTo(450, 300);
          ctx.lineTo(350, 200);
          ctx.closePath();
          ctx.fill();
        }

        // main floor
        // floor
        ctx.fillStyle = lightFloor;
        ctx.beginPath();
        ctx.moveTo(100, 200);
        ctx.lineTo(350, 200);
        ctx.lineTo(450, 300);
        ctx.lineTo(0, 300);
        ctx.closePath();
        ctx.fill();
      }
    }
  }, [view]);

  return <canvas className="canvas" ref={canvasRef} height={300} width={450} />;
};

export default Canvas;

const Direction = {
  North: "North",
  East: "East",
  South: "South",
  West: "West",
} as const;

type DirectionType = typeof Direction[keyof typeof Direction];

// prettier-ignore
const labyrinthMap = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3,
  1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1,
  1, 5, 0, 1, 0, 0, 1, 5, 0, 0, 0, 1,
  1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1,
  1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 4, 1,
  1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1,
  1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 5, 1,
  1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1,
  2,-1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1,
  1, 1, 1, 0, 0, 0, 0, 6, 0, 0, 0, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

// Consts
const MAP_SIZE = 12;

type LocationType = Array<Array<number>>;

function getLocationByDirection(
  direction: DirectionType,
  labyrinthMap: Array<number>
): LocationType {
  const currentLocation = labyrinthMap.indexOf(-1);
  switch (direction) {
    case Direction.North: {
      const topRow = [
        labyrinthMap[currentLocation - (MAP_SIZE + 1)],
        labyrinthMap[currentLocation - MAP_SIZE],
        labyrinthMap[currentLocation - (MAP_SIZE - 1)],
      ];
      const bottomRow = [
        labyrinthMap[currentLocation - 1],
        labyrinthMap[currentLocation],
        labyrinthMap[currentLocation + 1],
      ];
      return [topRow, bottomRow];
    }
    case Direction.East: {
      const topRow = [
        labyrinthMap[currentLocation - (MAP_SIZE - 1)],
        labyrinthMap[currentLocation + 1],
        labyrinthMap[currentLocation + (MAP_SIZE + 1)],
      ];
      const bottomRow = [
        labyrinthMap[currentLocation - MAP_SIZE],
        labyrinthMap[currentLocation],
        labyrinthMap[currentLocation + MAP_SIZE],
      ];
      return [topRow, bottomRow];
    }
    case Direction.South: {
      const topRow = [
        labyrinthMap[currentLocation + (MAP_SIZE + 1)],
        labyrinthMap[currentLocation + MAP_SIZE],
        labyrinthMap[currentLocation + (MAP_SIZE - 1)],
      ];
      const bottomRow = [
        labyrinthMap[currentLocation + 1],
        labyrinthMap[currentLocation],
        labyrinthMap[currentLocation - 1],
      ];
      return [topRow, bottomRow];
    }
    case Direction.West: {
      const topRow = [
        labyrinthMap[currentLocation + (MAP_SIZE - 1)],
        labyrinthMap[currentLocation - 1],
        labyrinthMap[currentLocation - (MAP_SIZE + 1)],
      ];
      const bottomRow = [
        labyrinthMap[currentLocation + MAP_SIZE],
        labyrinthMap[currentLocation],
        labyrinthMap[currentLocation - MAP_SIZE],
      ];
      return [topRow, bottomRow];
    }

    default:
      return [
        [1, 1, 1],
        [1, -1, 1],
      ];
  }
}

const Labyrinth = () => {
  const [direction, setDirection] = useState<DirectionType>(Direction.East);
  const [currentMap, setCurrentMap] = useState<Array<number>>(labyrinthMap);
  const [currentView, setCurrentView] = useState<LocationType>(
    getLocationByDirection(direction, currentMap)
  );
  const { setInput, setOutput } = useGame();

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      const directionArray = Object.keys(Direction);
      const currentDirection = directionArray.indexOf(direction);

      switch (e.key) {
        case "k":
        case "ArrowRight": {
          const newDirectionIndex =
            currentDirection !== 3 ? currentDirection + 1 : 0;
          setDirection(
            Direction[directionArray[newDirectionIndex] as DirectionType]
          );
          setOutput("You moved Right.");
          break;
        }
        case "j":
        case "ArrowLeft": {
          const newDirectionIndex =
            currentDirection !== 0 ? currentDirection - 1 : 3;
          setDirection(
            Direction[directionArray[newDirectionIndex] as DirectionType]
          );
          setOutput("You moved Left.");
          break;
        }
        case "i":
        case "ArrowUp": {
          // entrance
          if (currentView[0][1] === 2) {
            setInput(LabyrinthCodes.ENTRANCE);
          }
          // exit
          if (currentView[0][1] === 3) {
            setInput(LabyrinthCodes.EXIT);
          }
          if (currentView[0][1] === 4) {
            setInput(LabyrinthCodes.DAGGER);
          }
          if (currentView[0][1] === 5) {
            setInput(LabyrinthCodes.DEATH);
          }
          if (
            currentView[0][1] === 0 ||
            currentView[0][1] === 4 ||
            currentView[0][1] === 6
          ) {
            if (currentView[0][1] === 0) {
              setOutput("You moved Forward.");
            }
            if (currentView[0][1] === 6) {
              setOutput("You hear hooves clammer in the distance...");
            }
            setCurrentMap((prevState) => {
              const loc = prevState.indexOf(-1);
              const newMap = prevState;
              newMap[loc] = currentView[0][1];
              switch (direction) {
                case Direction.North:
                  newMap[loc - MAP_SIZE] = -1;
                  setCurrentView(getLocationByDirection(direction, newMap));
                  return newMap;
                case Direction.South:
                  newMap[loc + MAP_SIZE] = -1;
                  setCurrentView(getLocationByDirection(direction, newMap));
                  return newMap;
                case Direction.East:
                  newMap[loc + 1] = -1;
                  setCurrentView(getLocationByDirection(direction, newMap));
                  return newMap;
                case Direction.West:
                  newMap[loc - 1] = -1;
                  setCurrentView(getLocationByDirection(direction, newMap));
                  return newMap;
              }
            });
          }
          break;
        }
        default:
          break;
      }
    }
    document.addEventListener("keyup", handleKeyUp);

    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [direction, currentMap, currentView]);

  useEffect(() => {
    const newView = getLocationByDirection(direction, currentMap);

    setCurrentView(newView);
  }, [currentMap, direction]);

  return (
    <div className="labyrinth">
      <div className="direction">
        <span className="small">方角</span>
        :compass:{direction}
      </div>
      <Canvas view={currentView} />
    </div>
  );
};
export { Labyrinth };
