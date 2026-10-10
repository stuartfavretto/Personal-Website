(function () {
  const root = document.documentElement;
  const themeButton = document.getElementById("theme-toggle");
  const redLightButton = document.getElementById("red-light-toggle");
  const themeColor = document.getElementById("theme-color");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const themeKey = "sf-theme";
  const redLightKey = "sf-red-light";

  if (!themeButton || !redLightButton || !themeColor) {
    return;
  }

  function load(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // The selected modes still apply for the current page when storage is unavailable.
    }
  }

  let theme = root.dataset.theme === "dark" ? "dark" : "light";
  let redLight = root.hasAttribute("data-red-light");

  function apply() {
    root.dataset.theme = theme;
    root.toggleAttribute("data-red-light", redLight);

    themeButton.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    redLightButton.setAttribute("aria-pressed", String(redLight));
    redLightButton.setAttribute(
      "aria-label",
      redLight ? "Turn red light off" : "Turn red light on"
    );

    themeColor.setAttribute(
      "content",
      redLight
        ? (theme === "dark" ? "#000000" : "#ff0000")
        : (theme === "dark" ? "#181818" : "#fafaf9")
    );
  }

  themeButton.addEventListener("click", function () {
    theme = theme === "dark" ? "light" : "dark";
    save(themeKey, theme);
    apply();
  });

  redLightButton.addEventListener("click", function () {
    redLight = !redLight;
    save(redLightKey, redLight ? "1" : "0");
    apply();
  });

  systemTheme.addEventListener("change", function (event) {
    if (load(themeKey) !== "light" && load(themeKey) !== "dark") {
      theme = event.matches ? "dark" : "light";
      apply();
    }
  });

  apply();
}());
