import events from "@/store/events";

export const withEventReducer = (EventComponent, injectReducer) => {
  events.inject(injectReducer);

  const WrapperPageComponent = (props) => <EventComponent {...props} />;

  return WrapperPageComponent;
};

export default withEventReducer;
