import ReactGA from "react-ga4";

const useAnalyticsEventTracker = (category: string) => {
  const eventTracker = (
    action: string,
    label?: string | undefined,
    value?: number | undefined,
    nonInteraction?: boolean | undefined
  ) => {
    ReactGA.event({
      category,
      action,
      label,
      value,
      nonInteraction,
    });
  };
  return eventTracker;
};

export default useAnalyticsEventTracker;
