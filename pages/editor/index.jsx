import Head from "next/head";
import Page from "@/container/editor/Page";
import withEventReducer from "@/hoc/withEventReducer";
import { wrapper } from "@/store/rootStore";
import { setEditorConfig } from "@/container/editor/store/config/slice";
import reducer from "@/container/editor/store";
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
  reducerPath: "editor",
  reducer,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { res } = context;

    let editorConfigData = {};

    try {
      res.setHeader(
        "Cache-Control",
        `public, s-maxage=30, stale-while-revalidate=59`
      );

      editorConfigData = await fetchConfigInfo({
        configUrl: "/config/editor.json",
      });

      store.dispatch(setEditorConfig({ editorConfig: editorConfigData }));
    } catch (err) {
      console.log("error", err);
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        configData: editorConfigData,
      },
    };
  }
);
