export default interface Card {
  id: string | number;
  title: string;
  subtitle: string;
  thumbnailUrl: string | null;
  metadata: string;
}
