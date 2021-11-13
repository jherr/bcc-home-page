import fetch from "node-fetch";
import { writeFileSync, readFileSync } from "fs";

const videosBaseURL = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_KEY}&id=UC6vRUjYqDuoUsYsku86Lrsw&part=contentDetails,id,liveStreamingDetails,localizations,player,snippet,statistics,status,topicDetails`;

const baseURL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_KEY}&channelId=UC6vRUjYqDuoUsYsku86Lrsw&part=snippet,id&order=date&maxResults=50`;

(async function () {
  let items: any[] = [];
  let pageToken: string | undefined = undefined;
  do {
    console.log(`Fetching page: ${pageToken ?? "first"}`);
    const res = await fetch(
      !pageToken ? `${baseURL}` : `${baseURL}&pageToken=${pageToken}`
    );
    const data = await res.json();
    items = [...items, ...data.items];
    if (!data.nextPageToken) {
      break;
    } else {
      pageToken = data.nextPageToken;
    }
  } while (true);

  writeFileSync(`videos.json`, JSON.stringify(items));

  const details = JSON.parse(readFileSync("details.json").toString());

  const hasID = details.map(({ id }: { id: string }) => id);

  const videos = items
    .map((data) => {
      return data?.id?.videoId;
    })
    .filter((t) => t)
    .filter((t) => !hasID.includes(t));

  for (const video of videos) {
    console.log(`Fetch video: ${video}`);
    const res = await fetch(`${videosBaseURL}&id=${video}`);
    const data: {
      items: unknown[];
    } = await res.json();
    details.push(data.items[0]);
  }

  writeFileSync("details.json", JSON.stringify(details, null, 2));
})();
