export interface IProfileInfo {
  profile: IProfile
}

export interface IProfile {
  avatar_url: string | null
  username: string
  nickname: string | null
  bio: string | null
  status: string | null
  created_at: string
  display_email: string | null
  location: string | null
  social_accounts: string[] | null
}
