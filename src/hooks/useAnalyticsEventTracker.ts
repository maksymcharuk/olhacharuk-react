import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category = "Default category") => {
  const eventTracker = (action = "Default action", label = "Default label") => {
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
