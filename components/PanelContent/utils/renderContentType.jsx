import PanelImage from "../PanelImage";
import Terms from "../Terms";

const renderContentType = (content, index) => {
  if (!content.type) return null;

  const { props } = content;

  switch (content.type) {
    case "image": {
      return <PanelImage key={index} {...props} />;
    }

    case "terms": {
      return <Terms className="terms" key={index} {...props} />;
    }

    default:
      return null;
  }
};

export default renderContentType;
