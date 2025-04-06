import { LoginForm } from '@/widgets/auth'

export default async function LoginPage() {
  return (
    <section className='flex h-screen items-center justify-center'>
      <LoginForm />
    </section>
  )
}
