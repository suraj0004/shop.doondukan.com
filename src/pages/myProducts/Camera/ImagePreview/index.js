import React from "react";
import PropTypes from "prop-types";

import "./styles/imagePreview.css";

export const ImagePreview = ({
  dataUri,
  isFullscreen,
  onRetake,
  onImageConfirm,
}) => {
  let classNameFullscreen = isFullscreen ? "demo-image-preview-fullscreen" : "";

  return (
    <div className={"demo-image-preview " + classNameFullscreen}>
      <img src={dataUri} />
      <div className="" id="img-priview-bottom-btn" >
        <div className="row text-center">
          <div className="col-6">
            <button type="button" className="btn" onClick={onRetake}>
              {" "}
              <i className="fas fa-camera text-light fa-2x"></i>{" "}
            </button>
          </div>
          <div className="col-6">
            <button type="button" className="btn" onClick={onImageConfirm}>
              {" "}
              <i className="fas fa-check text-light fa-2x"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool,
};

export default ImagePreview;
