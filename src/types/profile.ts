export interface IProfileInfo {
  profile: IProfile
}

export interface IProfile {
  avatar_url: string | null
  username: string
  nickname: string | null
  bio: string | null
  blog: string | null
  created_at: string
  email: string
  location: string | null
  social_accounts: string[] | null
}
