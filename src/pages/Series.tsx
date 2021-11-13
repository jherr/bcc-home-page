import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useVideos } from "../video";
import VideoGrid from "../components/VideoGrid";

const Home: React.FunctionComponent = () => {
  const { name } = useParams();
  const { series, videos } = useVideos();

  const seriesRealName = useMemo(
    () => series.find((s) => s.toLowerCase().replaceAll(" ", "-") === name),
    [series, name]
  );

  const videosInSeries = useMemo(
    () =>
      seriesRealName
        ? videos.filter((v) => v.series.includes(seriesRealName))
        : [],
    [seriesRealName, videos]
  );

  return (
    <div>
      <div className="flex mb-10">
        <div className="flex-grow text-2xl">
          <span className="font-bold">{seriesRealName}</span>
        </div>
      </div>
      <VideoGrid videos={videosInSeries} />
    </div>
  );
};

export default Home;
