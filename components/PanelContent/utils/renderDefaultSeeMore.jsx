import SeeMore from "../SeeMore";

const renderDefaultSeeMore = ({ open, onToggle, props }) => {
  if (!props) return null;

  return (
    <SeeMore {...props} open={open} onToggle={onToggle} {...props.styles} />
  );
};

export default renderDefaultSeeMore;
