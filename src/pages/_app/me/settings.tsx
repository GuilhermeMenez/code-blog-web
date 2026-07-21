import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/me/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Configurações</div>
}
