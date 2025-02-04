import { ProfileFormSchema } from '@/shared/components/profile/schema'
import Service from '../Service'
import { File } from 'buffer'

class MasterProfileService extends Service {
  async getMasterProfile() {
    const { data, error } = await this.supabase
      .from('members')
      .select(
        `
        username, avatar_url, nickname,
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
      status: data.profile.status,
      created_at: data.profile.created_at,
      display_email: data.profile.display_email,
      location: data.profile.location,
      social_accounts: data.profile.social_accounts,
    }
  }

  async updateMasterProfile(profileFormData: ProfileFormSchema) {
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

    if (profileError) throw profileError
  }

  async updateMasterStatus(status: string) {
    const { error } = await this.supabase
      .from('profile')
      .update({ status })
      .eq('email', process.env.NEXT_PUBLIC_ADMIN_EMAIL as string)

    if (error) throw error
  }

  async updateMasterImage(fileName: string) {
    const { error: memberError } = await this.supabase
      .from('members')
      .update({ avatar_url: fileName })
      .eq('email', process.env.NEXT_PUBLIC_ADMIN_EMAIL as string)

    if (memberError) throw memberError
  }
}

export default MasterProfileService
