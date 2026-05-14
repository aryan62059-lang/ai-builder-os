export const soundBus = {
  play(eventName, enabled) {
    if (!enabled) return;
    window.dispatchEvent(new CustomEvent("builder-os:sound", { detail: { eventName } }));
  },
};
