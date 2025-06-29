import "@/styles/globals.css";

import { wrapper } from "@/store/rootStore";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
