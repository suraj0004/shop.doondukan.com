import React from "react";

function PageLoader(props) {
  const colors = [
    "text-primary",
    "text-secondary",
    "text-success",
    "text-danger",
    "text-warning",
    "text-info",
    "text-dark",
  ];

  var loaders;
  if (!props.error) {
    loaders = colors.map((color, index) => {
      return (
        <div
          key={index.toString()}
          className={"spinner-grow " + color}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      );
    });
  } else {
    loaders = <div className="text-danger">{props.error}</div>;
  }

  return <div className="text-center">{loaders}</div>;
}

export default PageLoader;
