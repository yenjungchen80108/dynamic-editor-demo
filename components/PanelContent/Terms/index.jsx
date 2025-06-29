import styled from "styled-components";
import { color, space, background } from "styled-system";

const Terms = ({ className, ...props }) => {
  return (
    <div className={className}>
      Fusce rhoncus diam ac rutrum dignissim. In sagittis ante sed velit
      venenatis, sed maximus libero lacinia. Maecenas consectetur semper lectus,
      in tempor erat laoreet et. Mauris suscipit dolor ligula, et cursus lacus
      porta a. Duis euismod ullamcorper consequat. Integer ex mi, tempor ac
      ultricies eu, ornare nec purus. Morbi vulputate vitae orci ut suscipit.
      Pellentesque a posuere nisi. Ut non dolor pretium, fermentum velit eu,
      consectetur augue. Suspendisse nulla tellus, tristique quis augue id,
      dictum vulputate ligula. Mauris consectetur, lectus id rhoncus tempus,
      lorem elit tincidunt lacus, et mollis orci augue et mi. Aliquam lorem
      neque, iaculis non efficitur quis, fermentum vitae arcu. Proin ultrices
      convallis viverra. Nunc quam massa, mollis id augue quis, fringilla
      condimentum erat. Sed sit amet nisi tempus, convallis orci a, ornare
      justo.
    </div>
  );
};

export default styled(Terms)`
  line-height: 1.5;
  padding: 10px;
  ${color};
  ${space};
  ${background};
`;
