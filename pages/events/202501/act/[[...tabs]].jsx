import Head from "next/head";
import { useRouter } from "next/router";
import Page from "@/events/202501/actPage/Page";
import withEventReducer from "@/hoc/withEventReducer";
import { wrapper } from "@/store/rootStore";
import { S3_FILE_NAME } from "@/events/202501/actPage/constant";
import { setActConfig } from "@/events/202501/actPage/store/config/slice";
import reducer from "@/events/202501/actPage/store";
import { fetchConfigInfo } from "@/apis/fetchConfig";
import { deepMerge } from "@/utils/mergeJson";
import { S3_BUCKET_NAME } from "@/constants/s3";
// import { checkFileExistInS3 } from "@/hoc/checkFileExistInS3";
// import { getFileInS3 } from "@/hoc/getFileInS3";

const IndexPage = ({ configData, ...props }) => {
  const { title, description, keywords } = configData.metaData;

  const router = useRouter();
  const { tabs } = router.query;
  const isEditMode = tabs?.includes("edit");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page isEditMode={isEditMode} {...props} />
    </>
  );
};

export default withEventReducer(IndexPage, {
  reducerPath: "actPage202501",
  reducer,
});

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { res } = context;

    let actConfigData = {};
    let actInstrConfigData = {};
    let combinedConfig = {};
    let fileExist = false;

    /*
    try {
      const checkFileResponse = await fetch(
        `${API_BASE_URL}/api/gen-presigned-get-url?file=${S3_FILE_NAME}`
      );

      if (checkFileResponse.ok) {
        const { url } = await checkFileResponse.json();
        fileExist = true;
        presignedUrl = url;
      }
    } catch (error) {
      console.error("Error fetching presigned URL:", error);
    }
    */

    const S3Url = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${S3_FILE_NAME}`;
    try {
      const response = await fetch(S3Url);

      if (response.ok) {
        fileExist = true;
      } else {
        fileExist = false;
      }

      if (fileExist) {
        const jsonData = await response.json();
        actInstrConfigData = jsonData;
        // const jsonRes = await fetch(presignedUrl);
        // actInstrConfigData = await jsonRes.json();
      } else {
        actInstrConfigData = await fetchConfigInfo({
          configUrl: "/config/events/202501/actInstrPage.json",
        });
      }
    } catch (error) {
      console.error("Error fetching S3 URL:", error);
      fileExist = false;
    }

    // try {
    //   const fileExist = await checkFileExistInS3(S3_BUCKET_NAME, S3_FILE_NAME);
    //   console.log("fileExist", fileExist);

    //   if (fileExist) {
    //     const fileData = await getFileInS3(S3_BUCKET_NAME, S3_FILE_NAME);
    //     actInstrConfigData = fileData;
    //   } else {
    //     actInstrConfigData = await fetchConfigInfo({
    //       configUrl: "/config/events/202501/actInstrPage.json",
    //     });
    //   }
    // } catch (error) {
    //   console.error("Error checking file existence:", error);
    // }

    try {
      res.setHeader(
        "Cache-Control",
        `public, s-maxage=30, stale-while-revalidate=59`
      );

      actConfigData = await fetchConfigInfo({
        configUrl: "/config/events/202501/actPage.json",
      });

      combinedConfig = deepMerge(actConfigData, actInstrConfigData);

      store.dispatch(setActConfig({ actConfig: combinedConfig }));
    } catch (err) {
      console.log("error", err);
      return {
        props: {},
        notFound: true,
      };
    }

    return {
      props: {
        configData: combinedConfig,
        fileName: S3_FILE_NAME,
        actInstrConfigData,
      },
    };
  }
);
