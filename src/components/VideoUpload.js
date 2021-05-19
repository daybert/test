import React from "react";
import ReactPlayer from "react-player";

export default function VideoUpload(prop) {
  if (prop.value) {
    return (
      <div>
        <ReactPlayer controls={true} url={prop.value} width="100%" />
      </div>
    );
  }
  return null;
}
