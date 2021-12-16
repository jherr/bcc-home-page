import { readFileSync, writeFileSync } from "fs";

const ignore = JSON.parse(readFileSync("ignore.json").toString());

const videos = JSON.parse(readFileSync("details.json").toString());

const curatedById = JSON.parse(readFileSync("curated.json").toString()).reduce(
  (a, v) => ({
    ...a,
    [v.id]: v,
  }),
  {}
);

const output = videos
  .filter((video) => curatedById[video.id] && !ignore.includes(video.id))
  .map((video) => ({
    id: video.id,
    publishedAt: video.snippet.publishedAt,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.medium.url,
    categoryId: video.snippet.categoryId,
    ...curatedById[video.id],
  }));

writeFileSync("../../public/videos.json", JSON.stringify(output));

console.log(
  JSON.stringify(
    videos
      .filter((video) => !curatedById[video.id] && !ignore.includes(video.id))
      .map((video) => ({
        id: video.id ?? "",
        title: video.snippet.title ?? "",
        description: video.snippet.description ?? "",
        series: [""],
        technologies: [],
        languages: [],
      })),
    null,
    2
  )
);
