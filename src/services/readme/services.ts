import { ProfileFormSchema } from '@/shared/components/profile/schema'
import Service from '../Service'
import { File } from 'buffer'

class MasterReadmeService extends Service {
  async getMasterReadme() {
    const { data, error } = await this.supabase
      .from('readme')
      .select('*')
      .maybeSingle()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async updateMasterReadme(contents: string, email: string) {
    const { data, error } = await this.supabase
      .from('readme')
      .upsert([{ contents, email }])

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
}

export default MasterReadmeService
