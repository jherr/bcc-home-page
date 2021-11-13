import React from "react";

import { Video } from "../video";

const VideoGrid: React.FunctionComponent<{
  videos: Video[];
}> = ({ videos }) => (
  <ul
    role="list"
    className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8"
  >
    {videos.map((video) => (
      <li key={video.id} className="relative">
        <a href={`https://youtube.com/watch?v=${video.id}`}>
          <div className="group block w-full aspect-w-16 aspect-h-9 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              src={video.thumbnails.medium.url}
              alt={video.title}
              className="object-cover pointer-events-none group-hover:opacity-75"
            />
          </div>
          <p className="text-xl mt-2 block font-semibold text-gray-900 truncate pointer-events-none">
            {video.title}
          </p>
        </a>
        {/* <p className="text-xl mt-2 block font-semibold text-gray-900 truncate pointer-events-none">
          {video.id}
        </p> */}
      </li>
    ))}
  </ul>
);

export default VideoGrid;
