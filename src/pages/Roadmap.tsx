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
      videos: ["x22F4hSdZJM:Executive Introduction"],
    },
    {
      title: "Getting Started",
      videos: [
        "s_Fs4AXsTnA:Quick Start",
        "tFDvEITdJZ8:Simple React Use Case",
        "YQvQwTAqXE8:Simple Vue Use Case",
        "DHjZnJRK_S8:Architectural Introduction",
        "0WIFW3s2fDM:Common Mistakes",
      ],
    },
    {
      title: "Use Cases",
      videos: [
        "K-yQB9YGmgE:Resilient Header",
        "pGy5vrFJlH0",
        "GkUFmlVs-No:CMS Live Preview",
        "hHXzchWLoqw:Flexible Forms",
      ],
    },
    {
      title: "State Management",
      videos: ["aHA581Mp2Mo:Recoil"],
    },
    {
      title: "By Environment",
      videos: [
        "wxnwPLLIJCY:SingleSPA",
        "YQvQwTAqXE8:Vue",
        "ICeH3uBGGeo:More Vue",
        "nOq1a6-8M-E:Svelte",
      ],
    },
    {
      title: "Advanced Topics",
      videos: [
        "W0RbrAZtj7I:Full Site Federation",
        "UbEx1v26kCs:TypeScript Support",
        "MU8_LP8R_ZI:Production",
        "n6ZQSq3f14M:Rollup",
      ],
    },
  ],
  typescript: [
    {
      title: "Getting Started",
      videos: [
        "sf355K1iNjE",
        "LKVHFHJsiO0:Setup",
        "-TsIUuA3yyE:Functions",
        "ixCxoFAoOps:Functions with Functions",
        "QvcyL_ZGhf0:Optionals",
        "5q0VtzJjvNc:Tuples",
        "rY_XqfSHock:Compile Time vs Runtime",
      ],
    },
    {
      title: "Converting to TypeScript",
      videos: [
        "j92fxPpFaL8:Basic Types",
        "_VItRGUFyKU:Arrays",
        "S2L4fatK0Ek:Objects",
      ],
    },
    {
      title: "Project Setup",
      videos: ["MkNCkKomu_s:Project Setup", "Bw_tmWEaaIU:Monorepos"],
    },
    {
      title: "Basic React",
      videos: [
        "gChqkchbn9o:Setup and Props",
        "9y0eY6hs1QM:Advance Props",
        "VcOMq3LQtBU:Async Code",
        "qACBGbBxVYY:Custom Hooks",
        "OseG8oQ2RDM:useContext",
        "FC5gM49xQPE:Testing",
      ],
    },
    {
      title: "Intermediate Concepts",
      videos: [
        "b_p3yP57A9w:Readonly and Immutability",
        "VrfJeXj7TiQ:Enums and Literals",
        "XnyZXNnWAOA:Function Overloading",
        "Kn8TKLcd6d4:Mixins",
      ],
    },
    {
      title: "Classes",
      videos: [
        "PbswZshAKF8:Class Basics",
        "iFEOdoHp19U:Abstract Classes",
        "nkpPOVUHT1k:Readonly and Static",
      ],
    },
    {
      title: "Generics",
      videos: [
        "Q4QDyr0jLfo:Generics",
        "_ZnNZWlyw7M:Classes with Generics",
        "4XTj6sIGTdc:Generics with keyOf",
        "tD7DM99nH30:Utility Types I",
        "mOA1SA9sfcw:Utility Types II",
      ],
    },
    {
      title: "React State Management",
      videos: [
        "VAIR7cRBlFw:Global State",
        "eFh2Kr9hfyo:Redux",
        "raTvJzKoZJo:Zustand",
        "lgJmSQwQ-gk:XState",
        "gED6KGBQgak:MobX",
        "rWanEGMkXwc:Valtio",
        "P0GxuOPyLXo:Galactic State",
        "_m2XfYzBV2c:Effector",
      ],
    },
    {
      title: "Advanced React",
      videos: ["W5TXxJIyBP0:Generic Components"],
    },
    {
      title: "Design Patterns",
      videos: [
        "-1YhP5IOBCI:Factories",
        "f3Cn0CGytSQ:Pub/Sub",
        "SZ2kAkMdAZE:Visitor & Iterator",
        "H2kxc_ZrSPI:Command & Memento",
        "0vumsisnqwM:Proxy & Flyweight",
      ],
    },
    {
      title: "Advanced Concepts",
      videos: [
        "Cos-ctPX5hw:Decorators",
        "jdzLpEnRAqg:Conditional Types",
        "UbEx1v26kCs:Module Federation",
      ],
    },
  ],
  react: [
    {
      title: "Getting Started",
      videos: [
        "j8AVXNozac8:Getting Starts",
        "HwNArS3f1Ss:JSX",
        "MJaGti42c5c:Lists",
        "ekIDdZE7YjM:Creating a Component",
        "BdzFpyGVfVI:CSS",
        "LyS1bB96FDg:Class Components",
      ],
    },
    {
      title: "More Advanced",
      videos: [
        "zM_ZiSl2n2E:Hooks",
        "56_OUG-0wgI:Reactive Hooks",
        "-urz6Sh7RE8:State and Events",
        "OCg4DJyVGk0:Async Requests",
        "EFVCTzqRbqo:Component Libraries",
      ],
    },
    {
      title: "State Management",
      videos: [
        "1kFX3B2IyH0:useContext",
        "aM1bxz-82Qw:useReducer",
        "Sti_XBFn5Xw:Redux",
        "KEc0LLQjyfQ:Zustand",
        "gED6KGBQgak:MobX",
        "lgJmSQwQ-gk:XState",
        "rWanEGMkXwc:Valtio",
      ],
    },
    {
      title: "NextJS",
      videos: [
        "47wDMcPONAw:NextJS Basics",
        "xrbuvD5HBq4:Server Side Rendering",
        "YzPDzWM_k_8:Static Site Generation",
      ],
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
      videos: videos
        .map((idPlusAltTitle) => {
          const [id, altTitle] = idPlusAltTitle.split(":");
          if (videosById[id]) {
            return {
              ...videosById[id],
              title: altTitle || videosById[id].title,
            };
          }
          return undefined;
        })
        .filter(Boolean),
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
