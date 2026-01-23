import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  component: Landing,
})

function Landing() {
  return <div>Olá Mundo</div>
}
