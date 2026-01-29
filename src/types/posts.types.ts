export interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  authorId: string
  authorName: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface CreatePostDTO {
  title: string
  content: string
  excerpt?: string
  tags?: string[]
}

export interface UpdatePostDTO {
  title?: string
  content?: string
  excerpt?: string
  tags?: string[]
}
