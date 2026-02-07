import { Button } from "@/components/ui/Button"

interface SignInProps {
  setFormType: (type: 'signIn' | 'signUp') => void
}

export function SignIn({ setFormType }: SignInProps) {
  return (
    <div className="flex flex-col gap-16 py-14">
      <div className="flex flex-col items-center gap-6">
        <img src="src/assets/svgs/logo.svg" alt="Logo Code Blog" className="w-auto h-10" />
        <h2 className="font-source font-light text-2xl">Bem-vindo de volta</h2>
      </div>

      <div className="flex flex-col items-center">
        <Button variant="ghost" size="sm" onClick={() => setFormType('signUp')}>Criar conta</Button>
      </div>
    </div>
  )
}
