import {Channel, Video} from './youtube';
import * as util from '@/util';
import axios from "axios";

export interface TrackJson {
  id: number;
  title: string;
  singers: string[];
  artist: string;
  videoid: string;
  publishedAt: string;
  tags: string[];
  start: number;
  end: number;
}

export class Track {
  readonly uuid: string;
  readonly id: number;
  readonly title: string;
  readonly singers: string[];
  readonly singerChannels: Channel[] = [];
  readonly artist: string;
  readonly video: Video;
  readonly publishedAt: string;
  readonly tags: string[];
  readonly start: number;
  readonly end: number;
  public isFavorite: boolean;

  constructor(
    trackJson: TrackJson,
    isFavorite = false,
    video: Video | null = null,
    uuid: string | null = null,
  ) {
    this.uuid = uuid || util.generateUuid();
    this.id = trackJson.id;
    this.title = trackJson.title;
    this.singers = trackJson.singers;
    this.artist = trackJson.artist;
    this.publishedAt = trackJson.publishedAt;
    this.tags = trackJson.tags;
    this.start = trackJson.start;
    this.end = trackJson.end;
    this.isFavorite = isFavorite;
    this.video = video || new Video(trackJson.videoid, trackJson.publishedAt);
  }

  public clone(uuid: boolean | string = false): Track {
    return new Track({
      id: this.id,
      title: this.title,
      singers: this.singers,
      artist: this.artist,
      videoid: this.video.id,
      publishedAt: this.publishedAt,
      tags: this.tags.map(tag => tag),
      start: this.start,
      end: this.end,
    }, this.isFavorite, this.video, uuid === true ? this.uuid : uuid || null);
  }

  public async fetchVideoInfo(force = false) {
    await this.video.fetchVideoInfo(force);
  }

  public hasVideoInfo(): boolean {
    return this.video.hasVideoInfo();
  }

  public getDuration(): number {
    return this.end - this.start;
  }

  public match(query: string): boolean {
    const keywords = query.split(/[\s]/);

    const videoTitle = this.video.getTitle() || '';

    const channel = this.video.getChannel();
    const channelName = channel? channel.name : '';

    let isMatch = true;
    for (const keyword of keywords) {
      const target = [
        this.title,
        this.singers,
        this.artist,
        videoTitle,
        channelName,
        this.tags.join('  '),
      ].join('  ').toLowerCase();
      isMatch = isMatch && target.indexOf(keyword.toLowerCase()) >= 0;
    }
    return isMatch;
  }
}
