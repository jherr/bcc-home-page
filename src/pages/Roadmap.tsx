import React, { useMemo, Fragment } from "react";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";

import { useVideos } from "../video";
import VideoGrid from "../components/VideoGrid";

const roadmaps: Record<
  string,
  {
    title: string;
    videos: string[];
  }[]
> = {
  "module-federation": [
    {
      title: "High Level Introduction",
      videos: ["x22F4hSdZJM"],
    },
    {
      title: "Getting Started",
      videos: ["s_Fs4AXsTnA", "tFDvEITdJZ8", "YQvQwTAqXE8", "DHjZnJRK_S8"],
    },
    {
      title: "Use Cases",
      videos: ["K-yQB9YGmgE", "pGy5vrFJlH0", "GkUFmlVs-No", "hHXzchWLoqw"],
    },
    {
      title: "State Management",
      videos: ["aHA581Mp2Mo"],
    },
    {
      title: "By Environment",
      videos: ["wxnwPLLIJCY", "YQvQwTAqXE8", "ICeH3uBGGeo", "nOq1a6-8M-E"],
    },
    {
      title: "Advanced Topics",
      videos: ["W0RbrAZtj7I", "UbEx1v26kCs", "MU8_LP8R_ZI", "n6ZQSq3f14M"],
    },
    {
      title: "Extras",
      videos: ["0WIFW3s2fDM"],
    },
  ],
};

const Roadmap: React.FunctionComponent = () => {
  const { name } = useParams();
  const { videosById } = useVideos();

  const roadmap = useMemo(() => {
    if (!name || !roadmaps[name]) {
      return [];
    }
    return roadmaps[name].map(({ title, videos }) => ({
      title,
      videos: videos.map((id) => videosById[id]).filter(Boolean),
    }));
  }, [name, videosById]);

  return (
    <div>
      {roadmap.map(({ title, videos }) => (
        <Fragment key={title}>
          <div className="flex">
            <LocationMarkerIcon className="h-8 w-8" />
            <h2 className="text-3xl font-bold ml-2">{title}</h2>
          </div>
          <div className="border-l-2 border-gray-600 ml-4 pl-4 py-10">
            <VideoGrid videos={videos} />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Roadmap;
