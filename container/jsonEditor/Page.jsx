import { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import Modal from "@/components/Modal";
import { ToastContainer } from "react-toastify";
import { jsonConfigSelector, commonModalSelector } from "./store/selector";
import { closeCommonModal } from "./store/modal/slice";
import {
  StyledContainer,
  StyledContent,
  StyledSidebar,
  StyledMain,
} from "./styles";
import { theme } from "./theme";
import Sidebar from "./components/SideBar";
import Editor from "./components/Editor";
import ControlBar from "./components/ControlBar";
import CommonModal from "./components/Modal/CommonModal";
import { useFileEditor } from "./hooks/useFileEditor";

const Page = () => {
  const dispatch = useDispatch();
  const {
    jsonConfig: { styles },
  } = useSelector(jsonConfigSelector) || {};

  const {
    selectedFile,
    isEditing,
    text,
    reloadKey,
    handleInitLoad,
    handleTextChange,
    handleFileSelect,
    handleToggleEdit,
    handleSync,
    handlePull,
    handlePush,
    handleMergeToLocal,
    hasUnsavedChanges,
  } = useFileEditor();

  const { modalType, modalProps } = useSelector(commonModalSelector);
  const handleCommonModalClose = () => dispatch(closeCommonModal());

  if (!styles) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>
        <StyledContent>
          <StyledSidebar>
            <Sidebar onFileSelect={handleFileSelect} />
          </StyledSidebar>
          <StyledMain>
            <ControlBar
              fileName={selectedFile}
              isEditing={isEditing}
              hasUnsavedChanges={hasUnsavedChanges}
              onPull={handlePull}
              onSync={handleSync}
              onToggleEdit={handleToggleEdit}
              onPush={handlePush}
              onMergeToLocal={handleMergeToLocal}
            />
            <Editor
              key={selectedFile + "|" + reloadKey}
              fileName={selectedFile}
              isEditing={isEditing}
              text={text}
              onInitLoad={handleInitLoad}
              onTextChange={handleTextChange}
              reloadKey={reloadKey}
            />
          </StyledMain>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </StyledContent>
      </StyledContainer>
      <Modal isOpen={!!modalType} isDefaultStyleButton={false}>
        <CommonModal
          modalType={modalType}
          modalProps={modalProps}
          onClose={handleCommonModalClose}
        />
      </Modal>
    </ThemeProvider>
  );
};

export default Page;
