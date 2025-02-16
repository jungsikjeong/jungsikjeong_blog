import { Card, CardContent } from '@/shared/components/ui/card'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Repository } from '../RepositoryList/data'

export default function RepositoryItem({ repo }: { repo: Repository }) {
  return (
    <Card className='w-full transition-colors hover:bg-accent'>
      <CardContent className='p-4'>
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-primary'>{repo.title}</h3>
            <p className='mt-1 text-sm text-muted-foreground'>
              {repo.description}
            </p>
          </div>
        </div>

        <div className='mt-4 flex items-center gap-4'>
          <span className='rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground'>
            {repo.category}
          </span>
          <span className='text-sm text-muted-foreground'>
            {format(new Date(repo.createdAt), 'PPP', { locale: ko })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
