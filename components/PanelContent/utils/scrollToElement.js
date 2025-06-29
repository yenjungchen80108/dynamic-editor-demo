const handleScrollTo = (ref, options = { behavior: "smooth" }) => {
  if (ref && ref?.current) {
    ref?.current?.scrollIntoView(options);
  }
};

export default handleScrollTo;
