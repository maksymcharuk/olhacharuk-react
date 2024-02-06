import ReactGA from "react-ga4";

const useAnalyticsEventTracker = (category = "default_category") => {
  const eventTracker = (action = "default_action", label = "default_label") => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
