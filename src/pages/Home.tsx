import { useState } from "react";
import { FilterIcon } from "@heroicons/react/solid";

import { useVideos } from "../video";
import VideoGrid from "../components/VideoGrid";
import VideoFilterPanel from "../components/VideoFilterPanel";

const Home: React.FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const { selectedLanguages, selectedTechnologies } = useVideos();

  return (
    <div>
      <VideoFilterPanel open={open} onClose={() => setOpen(false)} />
      <div className="flex mb-10">
        <div className="flex-grow text-2xl">
          <span className="font-bold">Tutorial videos</span>
          {selectedTechnologies.length > 0 && (
            <span className="ml-2 italic">
              using {selectedTechnologies.join(", ")}
            </span>
          )}
          {selectedLanguages.length > 0 && (
            <span className="ml-2 italic">
              written in {selectedLanguages.join(", ")}
            </span>
          )}
        </div>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setOpen(true)}
        >
          <FilterIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Filters...
        </button>
      </div>
      <VideoGrid videos={useVideos().searchResults.slice(0, 20)} />
    </div>
  );
};

export default Home;
