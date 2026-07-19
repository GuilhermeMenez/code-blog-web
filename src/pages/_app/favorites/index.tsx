import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/favorites/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Favoritos</div>
}
