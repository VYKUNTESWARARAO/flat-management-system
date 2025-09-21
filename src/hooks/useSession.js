import { useEffect } from "react";

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes

const useSession = (logoutCallback) => {
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(logoutCallback, SESSION_TIMEOUT);
    };

    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => document.addEventListener(event, resetTimer));

    resetTimer(); // start timer initially

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((event) => document.removeEventListener(event, resetTimer));
    };
  }, [logoutCallback]);
};

export default useSession;
