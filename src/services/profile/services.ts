import { ProfileFormSchema } from '@/shared/components/profile/schema'
import Service from '../Service'
import { File } from 'buffer'

class ProfileService extends Service {
  async getProfileByMemberId(userId: string) {
    const { data, error } = await this.supabase
      .from('members')
      .select(
        `
       email,username, avatar_url, nickname, status,
        profile(*)
      `,
      )
      .eq('id', userId)
      .maybeSingle()

    if (error) throw error

    return {
      avatar_url: data?.avatar_url ?? null,
      username: data?.username ?? null,
      nickname: data?.nickname ?? null,
      bio: data?.profile?.bio ?? null,
      status: data?.status ?? null,
      created_at: data?.profile?.created_at ?? null,
      display_email: data?.profile?.display_email ?? null,
      location: data?.profile?.location ?? null,
      social_accounts: data?.profile?.social_accounts ?? null,
    }
  }

  async updateProfileByMemberId(
    profileFormData: ProfileFormSchema,
    memberId: string,
  ) {
    const { bio, display_email, location, social_accounts, ...memberData } =
      profileFormData

    const { error: profileError } = await this.supabase
      .from('profile')
      .update({
        bio,
        display_email,
        location,
        social_accounts: social_accounts?.map((account) => account.url),
      })
      .eq('id', memberId)

    if (profileError) throw profileError
  }

  async updateStatus(status: string, memberId: string) {
    const { error } = await this.supabase
      .from('members')
      .update({ status })
      .eq('id', memberId)

    if (error) throw error
  }

  async updateImage(fileName: string, memberId: string) {
    const { error: memberError } = await this.supabase
      .from('members')
      .update({ avatar_url: fileName })
      .eq('id', memberId)

    if (memberError) throw memberError
  }
}

export default ProfileService
