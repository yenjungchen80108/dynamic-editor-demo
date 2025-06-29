import BasicActionButton from "../BasicActionButton";

const renderDefaultBasicActionButton = ({
  shouldRenderActionButton,
  ...props
}) => {
  if (!shouldRenderActionButton) return null;

  return <BasicActionButton {...props} {...props.styles} />;
};

export default renderDefaultBasicActionButton;
