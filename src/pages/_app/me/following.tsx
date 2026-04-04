import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/me/following')({
  component: Following,
})

function Following() {
  return <div>Seguindo</div>
}
