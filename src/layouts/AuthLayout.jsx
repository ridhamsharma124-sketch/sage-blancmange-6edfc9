import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/shared/Logo";
import AuthFooter from "../components/auth/AuthFooter";
import bgImage from "../assets/bgimg.png";


const FRAME_W = 1440;
const FOOTER_H = 52;
const CARD_H = 803;
const MIN_DESIGN_H = 680; 
const DESKTOP_MIN_WIDTH = 1024;

function useFitScale() {
  const [state, setState] = useState({ desktop: false, scale: 1, w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      const iw = window.innerWidth;
      const ih = window.innerHeight;
      const desktop = iw >= DESKTOP_MIN_WIDTH;
      const scale = desktop
        ? Math.min(1, iw / FRAME_W, ih / MIN_DESIGN_H)
        : 1;
      setState({ desktop, scale, w: iw / scale, h: ih / scale });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return state;
}

export default function AuthLayout() {
  const { desktop, scale, w, h } = useFitScale();

  const frameStyle = desktop
    ? {
        width: w,
        height: h,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        "--card-h": `${Math.min(CARD_H, h - FOOTER_H - 60)}px`,
      }
    : undefined;

  return (
    <div className="relative w-full font-poppins lg:h-screen lg:overflow-hidden">
      {/* frame */}
      <div
        className="flex min-h-screen w-full flex-col lg:absolute lg:left-0 lg:top-0 lg:min-h-0"
        style={frameStyle}
      >
        <main className="relative flex min-h-0 flex-1 overflow-hidden ">
          {/* Background */}
          <img
            src={bgImage}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-fill"
          />

          <div className="relative flex w-full items-center justify-end px-[24px] lg:pl-0 lg:pr-[4%]">
            <Logo
              className="absolute left-[24px] top-[24px] z-10 h-[66px] w-[150px] object-contain
             md:left-[36px] md:top-[34px] md:h-[92px] md:w-[208px]
             lg:left-[43px] lg:top-[30px] lg:h-[112px] lg:w-[230px]"
            />

            <div className="pointer-events-none absolute left-0 right-1/2 top-[41%] lg:right-[54%] z-10 flex -translate-y-1/2 items-center justify-center">
              <div className="w-full max-w-[460px] px-6 text-center">
                <h1 className="text-[34px] font-bold leading-tight text-[var(--auth-ink)]">
                  Welcome Back!
                </h1>
                <p className="mt-[10px] text-[13px] font-medium text-[var(--auth-subtitle)]">
                  We're glad to see you again.
                </p>
              </div>
            </div>

            <div className="relative z-10 flex w-full max-w-[var(--auth-card-max)] items-center justify-center self-stretch lg:absolute lg:bottom-0 lg:left-[47.15%] lg:top-0 lg:w-[706px] lg:max-w-none">
              <Outlet />
            </div>
          </div>
        </main>

        <div className="lg:h-[52px] lg:shrink-0 lg:[&>*]:!h-full">
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}