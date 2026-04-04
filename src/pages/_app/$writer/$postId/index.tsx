import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/$writer/$postId/')({
  component: Post,
})

function Post() {
  return <div>Post</div>
}
