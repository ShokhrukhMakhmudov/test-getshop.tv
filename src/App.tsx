import { useState, useRef, useEffect, MouseEvent } from "react";
import media from "./assets/video.mp4";
import qr from "./assets/qr-code.png";

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isBanner, setIsBanner] = useState<boolean>(false);
  const [promo, setPromo] = useState<boolean>(false);
  const [number, setNumber] = useState<string>("12");
  const [error, setError] = useState<boolean>(false);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function videoToggle() {
    isPlaying ? videoPause() : videoPlay();
    setIsPlaying((prev) => !prev);
  }

  function videoPlay() {
    videoRef.current?.play();
  }

  function videoPause() {
    videoRef.current?.pause();
  }

  useEffect(() => {
    if (isPlaying) {
      setIsBanner(true);
      setNumber("");
    }
  }, [isPlaying]);

  function putNum(e: MouseEvent) {
    if (number.length < 10) {
      setNumber((prev) => prev + e.target.textContent);
    }
  }
  function clearNum() {
    if (number.length > 0) {
      setNumber((prev) => prev.slice(0, prev.length - 1));
    }
  }
  function handleSubmit() {
    if (number.length !== 10) {
      // alert("Введен неверный номер");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (!checkbox) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      setSubmit(true);
    }
  }
  return (
    <div className="section">
      <div className="wrapper">
        <video
          ref={videoRef}
          className="video"
          onClick={() => videoToggle()}
          loop={true}
          autoPlay={true}>
          <source src={media} type="video/mp4" />
        </video>
        {/* banner */}
        <div className={`banner ${isBanner ? "" : "banner-close"}`}>
          <h3>Lorem ipsum dolor sit amet.</h3>
          <img src={qr} alt="qr" width={126} height={126} />
          <p>Сканируйте QR-код или нажмите ОК</p>

          <button
            className="banner-btn"
            onClick={() => {
              videoPause();
              setIsPlaying(false);
              setIsBanner(false);
              setPromo(true);
            }}>
            ОК
          </button>
        </div>
        {/* Promo zone */}
        {promo && (
          <div className="promo">
            <div className="panel">
              {submit ? (
                <>
                  <h2 className={`panel-result `}>ЗАЯВКА ПРИНЯТА</h2>
                  <p className="panel-subtitle">
                    Держите телефон под рукой. Скоро c Вами свяжется наш
                    менеджер.
                  </p>
                </>
              ) : (
                <>
                  <p className="panel-title">
                    Введите ваш номер мобильного телефона
                  </p>
                  <h2
                    className={`panel-result ${
                      error ? "error" : ""
                    }`}>{`+7(${number?.slice(0, 3).padEnd(3, "_")})${number
                    ?.slice(3, 6)
                    .padEnd(3, "_")}-${number
                    ?.slice(6, 8)
                    .padEnd(2, "_")}-${number?.slice(8).padEnd(2, "_")}`}</h2>
                  <p className="panel-subtitle">
                    и с Вами свяжется наш менеждер для дальнейшей консультации
                  </p>
                  <div className="num-panel">
                    <button className="num-panel__item" onClick={putNum}>
                      1
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      2
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      3
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      4
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      5
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      6
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      7
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      8
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      9
                    </button>
                    <button
                      className="num-panel__item num-panel__backspace"
                      onClick={clearNum}>
                      Стереть
                    </button>
                    <button className="num-panel__item" onClick={putNum}>
                      0
                    </button>
                  </div>
                  {error ? (
                    <p className="error-msg">Неверно введён номер</p>
                  ) : (
                    <div className="checkbox-panel">
                      <label htmlFor="checkbox" className="checbox-label">
                        {checkbox ? (
                          <svg
                            width="24"
                            height="20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              stroke="#000"
                              stroke-width="3"
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
                        onChange={() => setCheckbox((prev) => !prev)}
                        required
                      />
                      <p>Согласие на обработку персональных данных</p>
                    </div>
                  )}

                  <button className="submit-btn" onClick={handleSubmit}>
                    Подтвердить номер
                  </button>
                </>
              )}
            </div>
            <button
              className="promo-close"
              onClick={() => {
                setPromo(false);
                videoPlay();
                setIsPlaying(true);
                setSubmit(false);
              }}>
              <svg
                width="24"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="currentColor"
                  stroke-width="3"
                  d="M2.345 1.941l20.281 20.281M1.658 22.222L21.939 1.941"
                />
              </svg>
            </button>
            <div className="promo-qr">
              <p>Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ</p>
              <img src={qr} alt="qr" width={110} height={110} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
