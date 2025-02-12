import axios from 'axios';

interface VideoInfo {
  url: string;
  title: string;
  authorUrl: string;
  authorName: string;
}

const videoInfoCache = new Map<string, VideoInfo>();

export type ThumbnailQuality = 'default' | 'mqdefault' | 'hqdefault';

export class Channel {
  constructor(
    readonly url: string,
    readonly name: string,
  ) {}

  public clone(): Channel {
    return new Channel(this.url, this.name);
  }
}

export class Video {
  constructor(
    readonly id: string,
    readonly publishedAt: string,
    protected url: string |null = null,
    protected title: string | null = null,
    protected channel: Channel | null = null,
    protected isVideoInfoFetched = false,
    useCache = true,
  ) {
    if (url && title && channel) return;
    if (useCache) {
      const cache = videoInfoCache.get(this.id);
      if (cache) {
        this.url = cache.url;
        this.title = cache.title;
        this.channel = new Channel(cache.authorUrl, cache.authorName);
        this.isVideoInfoFetched = true;
      }
    }
  }

  public clone(useCache = true): Video {
    return new Video(
      this.id,
      this.publishedAt,
      this.url,
      this.title,
      this.channel !== null ? this.channel.clone() : null,
      this.isVideoInfoFetched,
      useCache,
    );
  }

  public async fetchVideoInfo(force = false) {
    if (!force && this.isVideoInfoFetched) {
      return;
    }
    const cache = videoInfoCache.get(this.id);
    if (!force && cache) {
      this.url = cache.url;
      this.title = cache.title;
      this.channel = new Channel(cache.authorUrl, cache.authorName);
      this.isVideoInfoFetched = true;
      return;
    }
    const url = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" + this.id;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("failed to fetch video info: " + response);
    }

    if (response.data.error !== undefined) {
      throw new Error("failed to fetch video info: " + response.data.url + "\n" + JSON.stringify(response.data));
    }

    this.url = response.data.url as string;
    this.title = response.data.title as string;
    this.channel = new Channel(response.data.author_url, response.data.author_name);
    this.isVideoInfoFetched = true;

    videoInfoCache.set(this.id, {
      url: this.url,
      title: this.title,
      authorUrl: this.channel.url,
      authorName: this.channel.name,
    })
  }

  public getTitle(): string | null {
    return this.title;
  }

  public getURL(): string | null {
    return this.url;
  }

  public getChannel(): Channel | null {
    return this.channel;
  }

  public getThumbnailURL(quality: ThumbnailQuality): string {
    return 'https://i.ytimg.com/vi/' + this.id + '/' + quality + '.jpg';
  }

  public hasVideoInfo(): boolean {
    return this.isVideoInfoFetched;
  }
}
