export interface ReviewModel {
  vendorId: string;
  authorId: string;
  link: string;
  rating: number;
  text?: string;
  name?: string;
  location?: string;
  avatar?: string;
  date?: string;
  edited?: string;
}
