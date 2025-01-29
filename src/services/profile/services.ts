import Service from '../Service'

class ProfileService extends Service {
  async getProfile() {
    const { data: profile, error } = await this.supabase
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

    return profile
  }
}

export default ProfileService
