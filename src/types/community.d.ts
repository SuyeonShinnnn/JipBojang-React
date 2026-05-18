export interface BoardInfo {
  postId: number;
  writerId: number;
  categoryId: number;
  writerNickname: string;
  profileImage: string;
  title: string;
  content: string;
  allowComment: number;

  likes: number;
  scraps: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;

  liked: boolean;
  scrapped: boolean;
  isBlinded: boolean;
  imageUrl: string;

  isVerified: boolean;
  verifiedGu: string;
  isExpert: boolean;

  owner: boolean;
}
