import React from "react";
import VideoSeriesItemTablePage from "./item/Table";

const VideoSeriesDetailsPage: React.FC<{}> = () => {
  return (
    <div className="app-video-series-detail">
      <VideoSeriesItemTablePage />
    </div>
  )
}

export default VideoSeriesDetailsPage;