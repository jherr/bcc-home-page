import { useEffect, useMemo } from "react";
import { createGlobalState } from "react-hooks-global-state";

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Video {
  id: string;
  publishedAt: string;
  publishedDate: Date;
  title: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  categoryId: string;
  tags: string[];
  description: string;
  series: string[];
  technologies: string[];
  languages: string[];
  live?: string;
}

const { useGlobalState } = createGlobalState<{
  videos: Video[];
  search: string;
  selectedTechnologies: string[];
  selectedLanguages: string[];
}>({
  videos: [],
  search: "",
  selectedTechnologies: [],
  selectedLanguages: [],
});
const useAllVideos = () => useGlobalState("videos");
const useSearch = () => useGlobalState("search");
const useSelectedTechnologies = () => useGlobalState("selectedTechnologies");
const useSelectedLanguages = () => useGlobalState("selectedLanguages");

const arraysIntersect = (selected: string[], items: string[]) =>
  selected.length === 0 || items.some((item) => selected.includes(item));

export const useVideos = () => {
  const [allVideos, setAllVideos] = useAllVideos();
  const [selectedLanguages, setSelectedLanguages] = useSelectedLanguages();
  const [selectedTechnologies, setSelectedTechnologies] =
    useSelectedTechnologies();

  useEffect(() => {
    fetch("/videos.json")
      .then((res) => res.json())
      .then((videos: Video[]) =>
        setAllVideos(
          videos.map((video) => ({
            ...video,
            publishedDate: new Date(Date.parse(video.publishedAt)),
          }))
        )
      );
  }, []);

  const videos = useMemo(
    () =>
      allVideos
        .filter(({ live }) => !live)
        .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()),
    [allVideos]
  );

  const videosById: Record<string, Video> = useMemo(
    () => videos.reduce((acc, video) => ({ ...acc, [video.id]: video }), {}),
    [videos]
  );

  const videosBySeries = useMemo(
    () =>
      videos.reduce<Record<string, Video[]>>((acc, video) => {
        video.series.forEach((series) => {
          if (!acc[series]) {
            acc[series] = [];
          }
          acc[series].push(video);
        });
        return acc;
      }, {}),
    [videos]
  );

  const videosByTechnology = useMemo(
    () =>
      videos.reduce<Record<string, Video[]>>((acc, video) => {
        video.technologies.forEach((technology) => {
          if (!acc[technology]) {
            acc[technology] = [];
          }
          acc[technology].push(video);
        });
        return acc;
      }, {}),
    [videos]
  );

  const technologies = useMemo(
    () =>
      Array.from(
        videos.reduce<Set<string>>((acc, { technologies }) => {
          technologies.forEach((v) => acc.add(v));
          return acc;
        }, new Set())
      ).sort(),
    [videos]
  );
  const languages = useMemo(
    () =>
      Array.from(
        videos.reduce<Set<string>>((acc, { languages }) => {
          languages.forEach((v) => acc.add(v));
          return acc;
        }, new Set())
      ).sort(),
    [videos]
  );
  const series = useMemo(
    () =>
      Array.from(
        videos.reduce<Set<string>>((acc, { series }) => {
          series.forEach((v) => acc.add(v));
          return acc;
        }, new Set())
      ).sort(),
    [videos]
  );

  const [search, setSearch] = useSearch();

  const searchResults = useMemo(
    () =>
      videos.filter(
        (video) =>
          video.title.toLowerCase().includes(search.toLowerCase()) &&
          arraysIntersect(selectedLanguages, video.languages) &&
          arraysIntersect(selectedTechnologies, video.technologies)
      ),
    [search, videos, selectedLanguages, selectedTechnologies]
  );

  return {
    videos,
    videosById,
    videosByTechnology,
    videosBySeries,
    search,
    setSearch,
    searchResults,
    technologies,
    languages,
    series,
    selectedLanguages,
    setSelectedLanguages,
    selectedTechnologies,
    setSelectedTechnologies,
  };
};
