import Head from "next/head";
import Page from "@/container/jsonEditor/Page";
import withEventReducer from "@/hoc/withEventReducer";
import { wrapper } from "@/store/rootStore";
import { setJsonConfig } from "@/container/jsonEditor/store/config/slice";
import reducer from "@/container/jsonEditor/store";
import { fetchConfigInfo } from "@/apis/fetchConfig";

const IndexPage = ({ configData, ...props }) => {
  const { title, description, keywords } = configData.metaData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page {...props} />
    </>
  );
};

export default withEventReducer(IndexPage, {
  reducerPath: "jsonEditor",
  reducer,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { res } = context;

    let configData = {};

    try {
      res.setHeader(
        "Cache-Control",
        `public, s-maxage=30, stale-while-revalidate=59`
      );

      configData = await fetchConfigInfo({
        configUrl: "/config/jsonEditor.json",
      });

      store.dispatch(setJsonConfig({ jsonConfig: configData }));
    } catch (err) {
      console.log("error", err);
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        configData,
      },
    };
  }
);
