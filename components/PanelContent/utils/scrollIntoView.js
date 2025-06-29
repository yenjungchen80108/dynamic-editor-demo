const isServer = () => typeof window === "undefined";

const getElementBySelector = (selector) => {
  if (typeof selector === "string") {
    return document.querySelector(selector);
  }
  if ("current" in selector) {
    return selector.current;
  }
  return null;
};

const scrollToElementWithTimeout = ({
  selector,
  delay,
  scrollOptions = { behavior: "smooth" },
}) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const element = getElementBySelector(selector);
      if (!element) return reject(new Error("element not found"));
      element.scrollIntoView(scrollOptions);
      return resolve("resolved");
    }, delay);
  });

export const createScrollService = ({
  selector = "",
  delay = 200,
  scrollOptions,
  beforeScroll,
  afterScroll,
}) => {
  const serverFunc = async () => {
    try {
      if (!selector || isServer()) return;

      await beforeScroll?.();
      await scrollToElementWithTimeout({ selector, delay, scrollOptions });
      await afterScroll?.();
    } catch (error) {
      console.error(error);
    }
  };

  return serverFunc();
};
