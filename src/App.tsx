import { useState, useEffect, SyntheticEvent } from "react";
import qr from "./assets/qr-code.png";
import Promo from "./components/Promo";
import { TState } from "./types";
import { Video, videoPause, videoPlay } from "./components/Video";

function App() {
  const [state, setState] = useState<TState>({
    isPlaying: false,
    isBanner: false,
    promo: false,
    number: "",
    errorNum: false,
    errorCheck: false,
    checkbox: false,
    submit: false,
  });
  const [pos, setPos] = useState<number[]>([0, 0]);
  const { isBanner, promo, isPlaying, number } = state;

  function videoToggle() {
    isPlaying ? videoPause() : videoPlay();
    setState((prev) => {
      return { ...prev, isPlaying: !prev.isPlaying };
    });
  }

  useEffect(() => {
    if (isPlaying) {
      setState((prev) => {
        return { ...prev, isBanner: true, number: "" };
      });
    }
  }, [isPlaying]);

  function findIndexIn2DArray(targetValue: number) {
    let arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 0],
      [11, 12],
    ];
    for (let i = 0; i < arr.length; i++) {
      const innerArray = arr[i];
      const index = innerArray.indexOf(targetValue);
      if (index !== -1) {
        return [index, i]; // Возвращаем индексы внешнего и внутреннего массивов
      }
    }
    return [0, 0]; // Возвращаем [-1, -1], если элемент не найден
  }

  function putNum(num: string) {
    setState((prev) => {
      if (prev.number.length < 10) {
        return { ...prev, number: prev.number + num };
      } else {
        return prev;
      }
    });
    setPos(findIndexIn2DArray(Number(num)));
  }

  function clearNum() {
    if (number.length > 0) {
      setState((prev) => {
        return {
          ...prev,
          number: prev.number.slice(0, prev.number.length - 1),
        };
      });
    }
  }

  const handleKeyDown = (
    e: SyntheticEvent & { key: string; which: number }
  ) => {
    switch (e.key) {
      case "ArrowUp":
        if (pos[1] === 3) {
          if (pos[0] === 0) {
            setPos([1, 2]);
          } else {
            setPos([2, 2]);
          }
        } else if (pos[1] === 4) {
          if (pos[0] === 1) {
            setPos([0, 4]);
          } else {
            setPos([0, 3]);
          }
        } else if (pos[1] !== 0) {
          setPos((prev) => [prev[0], prev[1] - 1]);
        }
        break;
      case "ArrowDown":
        if (pos[1] === 3) {
          setPos([0, 4]);
        } else if (pos[1] === 4) {
          setPos([1, 4]);
        } else if (pos[1] !== 2) {
          setPos((prev) => [prev[0], prev[1] + 1]);
        } else if (pos[1] === 2) {
          if (pos[0] === 2) {
            setPos([1, 3]);
          } else {
            setPos([0, 3]);
          }
        }
        break;
      case "ArrowLeft":
        if (pos[0] > 0) {
          setPos((prev) => [prev[0] - 1, prev[1]]);
        } else if (pos[1] > 0) {
          if (pos[1] === 4) {
            setPos([1, 3]);
          } else {
            setPos((prev) => [2, prev[1] - 1]);
          }
        }
        break;
      case "ArrowRight":
        if (pos[0] < 2) {
          setPos((prev) => [prev[0] + 1, prev[1]]);
        } else if (pos[1] < 4) {
          setPos((prev) => [0, prev[1] + 1]);
        }
        break;
      case "Backspace":
        clearNum();
        break;
      case "Escape":
        // Очистить калькулятор
        break;
      default:
        if ((e.which > 95 && e.which < 106) || (e.which > 47 && e.which < 58)) {
          putNum(e.key);
        }
        break;
    }
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setState((prev) => {
          return { ...prev, promo: false };
        });
        videoPlay();
      }, 10000); // Установите время бездействия (в данном случае, 5 секунд)
    };

    resetTimer(); // Сразу запустите таймер

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="section" onKeyDown={(e) => handleKeyDown(e)}>
      <div className="wrapper">
        <Video toggle={videoToggle} />
        {/* banner */}
        <div className={`banner ${isBanner ? "" : "banner-close"}`}>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <img src={qr} alt="qr" width={126} height={126} />
          <p>Сканируйте QR-код или нажмите OK</p>

          <button
            className="banner-btn"
            onClick={() => {
              videoPause();
              setState((prev) => {
                return {
                  ...prev,
                  promo: true,
                  isPlaying: false,
                  isBanner: false,
                };
              });
            }}>
            OK
          </button>
        </div>
        {/* Promo zone */}
        {promo && (
          <Promo
            state={state}
            setState={setState}
            pos={pos}
            clearNum={clearNum}
            putNum={putNum}
          />
        )}
      </div>
    </div>
  );
}

export default App;
