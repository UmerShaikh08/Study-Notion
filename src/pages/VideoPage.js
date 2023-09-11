import React from "react";
import VideoSidebar from "../components/video page/VideoSidebar";
import VideoPlay from "../components/video page/VideoPlay";

const VideoPage = () => {
  return (
    <div className="relative flex md:min-h-[calc(100vh-3.5rem)] ">
      {/* sidebar permanant */}
      <VideoSidebar />
      <div className=" h-[calc(100vh-3.5rem)] flex-1 overflow-auto md:ml-[5rem]">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10  ">
          {/* changing dynamically */}
          <VideoPlay />
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
