import { ProfileFormSchema } from '@/shared/components/profile/schema'
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
      display_email: data.profile.email,
      location: data.profile.location,
      social_accounts: data.profile.social_accounts,
    }
  }

  async updateProfile(profileFormData: ProfileFormSchema) {
    const { bio, display_email, location, social_accounts, ...memberData } =
      profileFormData

    const { error: memberError } = await this.supabase
      .from('members')
      .update(memberData)
      .eq('email', process.env.NEXT_PUBLIC_ADMIN_EMAIL as string)

    if (memberError) throw memberError

    const { error: profileError } = await this.supabase
      .from('profile')
      .update({
        bio,
        display_email,
        location,
        social_accounts: social_accounts?.map((account) => account.url),
      })
      .eq('email', process.env.NEXT_PUBLIC_ADMIN_EMAIL as string)

    console.log(social_accounts?.map((account) => account.url))

    if (profileError) throw profileError
  }
}

export default ProfileService
