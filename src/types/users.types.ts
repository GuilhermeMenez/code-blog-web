export interface UserProfile {
  id: string
  name: string
  email: string
  bio?: string
  avatar?: string
  followersCount: number
  followingCount: number
  createdAt: string
}

export interface UpdateProfileDTO {
  name?: string
  bio?: string
  avatar?: string
}

export interface FollowResponse {
  success: boolean
  followersCount: number
}
