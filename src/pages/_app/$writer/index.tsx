import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/$writer/')({
  component: WriterProfile,
})

function WriterProfile() {
  return <div>Perfil</div>
}
