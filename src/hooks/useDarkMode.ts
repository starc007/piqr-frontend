import { useEffect, useState } from "react";
// import mixpanel from "mixpanel-browser";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("mode") === "dark"
  );

  function checkDarkMode() {
    return document.body.classList.contains("dark");
  }

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
    // mixpanel.track("Switched Mode", {
    //   mode: localStorage.getItem("mode"),
    // });
    // mixpanel.people.set({
    //   current_mode: localStorage.getItem("mode"),
    // });
    setIsDarkMode(!isDarkMode); // Toggle the state directly
  };

  useEffect(() => {
    if (isDarkMode && !checkDarkMode()) {
      document.body.classList.toggle("dark");
    }

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDarkMode(checkDarkMode());
        }
      });
    });

    mutationObserver.observe(document.body, { attributes: true });

    return () => {
      mutationObserver.disconnect();
    };
  }, []); // Run this effect only once when the component mounts

  return { isDarkMode, toggleDarkMode };
};
