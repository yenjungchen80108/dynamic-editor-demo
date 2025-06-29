import Head from "next/head";

import Page from "@/events/202501/instrEditor/Page";
import withEventReducer from "@/hoc/withEventReducer";
import { wrapper } from "@/store/rootStore";
import { S3_BUCKET_NAME } from "@/constants/s3";
import cookie from "cookie";
import {
  setInstrConfig,
  setActConfig,
} from "@/events/202501/instrEditor/store/config/slice";
import reducer from "@/events/202501/instrEditor/store";
import { getJsonFromS3 } from "@/hoc/fetchConfig";
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
  reducerPath: "instrEditor202501",
  reducer,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { req, res, query } = context;

    // 從 req.headers.cookie 取得 Cookie 字串
    // const cookieHeader = req.headers.cookie || "";
    // 解析成物件
    // const cookies = cookie.parse(cookieHeader);

    const fileName = query.fileName || "config/202501/actInstrPage.json";
    const instrPageId = query.instrPageId || 4;

    let configData = {};
    let actConfig = {};

    try {
      res.setHeader(
        "Cache-Control",
        `public, s-maxage=30, stale-while-revalidate=59`
      );

      // set actConfig from s3
      actConfig = await getJsonFromS3(S3_BUCKET_NAME, fileName);

      configData = await fetchConfigInfo({
        configUrl: "/config/events/202501/instrEditor.json",
      });

      store.dispatch(setActConfig({ actConfig: actConfig }));

      store.dispatch(setInstrConfig({ instrConfig: configData }));
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
        actConfig,
        instrTabId: instrPageId,
        fileName: fileName,
      },
    };
  }
);
