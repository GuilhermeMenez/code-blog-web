import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/feed/')({
  component: Feed,
})

function Feed() {
  return <div>Feed</div>
}
