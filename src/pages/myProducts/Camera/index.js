import React, { useState } from "react";
import { Camera, FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import ImagePreview from "./ImagePreview";
import "react-html5-camera-photo/build/css/index.css";
import "./index.css";

function App(props) {
  const [dataUri, setDataUri] = useState("");
  const [cameraMode, setCameraMode] = useState(FACING_MODES.ENVIRONMENT);

  function handleTakePhotoAnimationDone(dataUri) {
    console.log("takePhoto");
    setDataUri(dataUri);
  }
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  function handleCameraError(error) {
    console.log("handleCameraError", error);
  }

  function handleCameraStart(stream) {
    console.log("handleCameraStart");
  }

  function handleCameraStop() {
    console.log("handleCameraStop");
  }

  function switchCamera() {
    if (cameraMode === FACING_MODES.ENVIRONMENT) {
      setCameraMode(FACING_MODES.USER);
    } else {
      setCameraMode(FACING_MODES.ENVIRONMENT);
    }
    reloadCamera();
  }

  function reloadCamera() {
    setDataUri("");
  }

  function onImageConfirm() {
    if (dataUri) {
      props.onImageCapture(dataUri);
      return;
    }
    reloadCamera();
  }

  const isFullscreen = true;

  return (
    <div id="camera-container">
      <button
        type="button"
        className="btn"
        onClick={props.closeCamera}
        id="camera-close-btn"
      >
        {" "}
        <i className="fas fa-times text-light fa-2x"></i>{" "}
      </button>
      <button
        type="button"
        className="btn"
        onClick={switchCamera}
        id="camera-switch-btn"
      >
        {" "}
        <i className="fas fa-exchange-alt text-light fa-2x"></i>
      </button>
      {dataUri ? (
        <ImagePreview
          dataUri={dataUri}
          isFullscreen={isFullscreen}
          onRetake={reloadCamera}
          onImageConfirm={onImageConfirm}
        />
      ) : (
        <Camera
          onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
          onCameraError={(error) => {
            handleCameraError(error);
          }}
          idealFacingMode={cameraMode}
          idealResolution={{ width: 640, height: 480 }}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.97}
          isMaxResolution={true}
          isImageMirror={false}
          isSilentMode={false}
          isDisplayStartCameraError={true}
          isFullscreen={isFullscreen}
          sizeFactor={1}
          onCameraStart={(stream) => {
            handleCameraStart(stream);
          }}
          onCameraStop={() => {
            handleCameraStop();
          }}
        />
      )}
    </div>
  );
}

export default App;
