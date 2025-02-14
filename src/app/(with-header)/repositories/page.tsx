import { RepositoryList } from '@/features/repositories'
import { Tables } from '@/types/supabase'
import React from 'react'

export default function RepositoriesPage({
  user,
}: {
  user: Tables<'members'> | null
}) {
  return <RepositoryList user={user} />
}
