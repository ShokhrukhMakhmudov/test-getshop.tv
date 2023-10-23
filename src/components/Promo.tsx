import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { videoPlay } from "./Video";
import { TState } from "../types";
import qr from "../assets/qr-code.png";

const Promo = (props: {
  state: TState;
  setState: Dispatch<SetStateAction<TState>>;
  setPos: Dispatch<SetStateAction<number[]>>;
  pos: number[];
  clearNum: () => void;
  putNum: (num: string) => void;
}) => {
  const {
    state: { number, checkbox, errorNum, errorCheck, submit },
    setState,
    pos,
    setPos,
    clearNum,
    putNum,
  } = props;
  const submitBtn = useRef<HTMLButtonElement>(null);
  const numPanel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  function handleSubmit() {
    if (number.length !== 10) {
      setState((prev) => {
        return {
          ...prev,
          errorNum: true,
        };
      });
      setTimeout(() => {
        setState((prev) => {
          return {
            ...prev,
            errorNum: false,
          };
        });
      }, 3000);
    } else if (!checkbox) {
      setState((prev) => {
        return {
          ...prev,
          errorCheck: true,
        };
      });
      setTimeout(() => {
        setState((prev) => {
          return {
            ...prev,
            errorCheck: false,
          };
        });
      }, 3000);
    } else {
      setState((prev) => {
        return {
          ...prev,
          submit: true,
        };
      });
      setTimeout(() => {
        setState((prev) => {
          return { ...prev, promo: false };
        });
        setPos([0, 0]);
        videoPlay();
      }, 3000);
    }
  }

  useEffect(() => {
    let arr = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 0],
      [11, 12],
    ];
    let num = arr[pos[1]][pos[0]];
    if (num === 11) {
      submitBtn?.current?.focus();
    } else if (num === 12) {
      closeBtn?.current?.focus();
    } else {
      let el = numPanel.current?.children[num];
      (el as HTMLElement)?.focus();
    }
  }, [pos]);
  return (
    <div className="promo">
      <div className="panel">
        {submit ? (
          <>
            <h2 className={`panel-result `}>ЗАЯВКА ПРИНЯТА</h2>
            <p className="panel-subtitle">
              Держите телефон под рукой. Скоро c Вами свяжется наш менеджер.
            </p>
          </>
        ) : (
          <>
            <p className="panel-title">Введите ваш номер мобильного телефона</p>
            <h2
              className={`panel-result ${
                errorNum ? "error" : ""
              }`}>{`+7(${number?.slice(0, 3).padEnd(3, "_")})${number
              ?.slice(3, 6)
              .padEnd(3, "_")}-${number?.slice(6, 8).padEnd(2, "_")}-${number
              ?.slice(8)
              .padEnd(2, "_")}`}</h2>
            <p className="panel-subtitle">
              и с Вами свяжется наш менеждер для дальнейшей консультации
            </p>
            <div className="num-panel" ref={numPanel}>
              {Array.from({ length: 10 }).map((_, ind) => {
                return (
                  <button
                    key={ind}
                    className="num-panel__item"
                    onClick={() => {
                      putNum(String(ind));
                    }}>
                    {ind}
                  </button>
                );
              })}

              <button
                className="num-panel__item num-panel__backspace"
                onClick={clearNum}>
                Стереть
              </button>
            </div>
            {errorNum ? (
              <p className="error-msg">Неверно введён номер</p>
            ) : (
              <div className="checkbox-panel">
                <label
                  htmlFor="checkbox"
                  className={`checbox-label ${errorCheck ? "error" : ""}`}>
                  {checkbox ? (
                    <svg
                      width="24"
                      height="20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        stroke="#000"
                        strokeWidth="3"
                        d="M1.061 11.566l7 7M6.295 18.566L22.922 1.939"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={checkbox}
                  id="checkbox"
                  onChange={() =>
                    setState((prev) => {
                      return { ...prev, checkbox: !prev.checkbox };
                    })
                  }
                  required
                />
                <p className={`${errorCheck ? "error" : ""}`}>
                  Согласие на обработку персональных данных
                </p>
              </div>
            )}

            <button
              className="submit-btn"
              ref={submitBtn}
              onClick={handleSubmit}>
              Подтвердить номер
            </button>
          </>
        )}
      </div>
      <button
        className="promo-close"
        ref={closeBtn}
        onClick={() => {
          videoPlay();
          setState((prev) => {
            return {
              ...prev,
              promo: false,
              isPlaying: true,
              submit: false,
              checkbox: false,
            };
          });
          setPos([0, 0]);
        }}>
        <svg
          width="24"
          height="24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            stroke="currentColor"
            strokeWidth="3"
            d="M2.345 1.941l20.281 20.281M1.658 22.222L21.939 1.941"
          />
        </svg>
      </button>
      <div className="promo-qr">
        <p>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
        <img src={qr} alt="qr" width={110} height={110} />
      </div>
    </div>
  );
};

export default Promo;
