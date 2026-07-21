import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/me/library')({
  component: Library,
})

function Library() {
  return <div>Favoritos</div>
}
