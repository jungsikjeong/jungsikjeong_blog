import Service from '../Service'

class ProfileService extends Service {
  async getProfile() {
    const { data, error } = await this.supabase
      .from('members')
      .select(
        `
        username, email, avatar_url, nickname,
        profile!inner(*)
      `,
      )
      .eq('email', process.env.NEXT_PUBLIC_ADMIN_EMAIL as string)
      .single()

    if (error) throw error

    return {
      avatar_url: data.avatar_url,
      username: data.username,
      nickname: data.nickname,
      bio: data.profile.bio,
      blog: data.profile.blog,
      created_at: data.profile.created_at,
      email: data.profile.email,
      location: data.profile.location,
      social_accounts: data.profile.social_accounts,
    }
  }
}

export default ProfileService
