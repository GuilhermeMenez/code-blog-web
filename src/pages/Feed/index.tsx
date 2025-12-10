import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { usePosts } from '@/hooks/usePosts'
import { useNavigate, NavLink } from 'react-router-dom'
import './styles.css'

import { Post } from '@/types/postType'
import { formatDate } from '@/utils/formatters/formatDate'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import AvatarUser from '@/components/AvatarUser'
import IconDots from '@/assets/icons/IconDots'
import IconComment from '@/assets/icons/IconComment'
import { Flex, Card, Box, Heading, Text, DropdownMenu } from '@radix-ui/themes'

const Feed = () => {
  const navigate = useNavigate()

  const { user } = useAuth()
  const { posts, handleFetchAllPosts, handleDeletePost } = usePosts()

  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    handleFetchAllPosts()
  }, [])

  const isMyPost = (post: Post) => {
    return post.userId === user?.id || post.author.id === user?.id
  }

  const openDeleteModal = (postId: string) => {
    setPostToDelete(postId)
    setShowDeleteModal(true)
  }

  // const closeDeleteModal = () => {
  //   setShowDeleteModal(false)
  //   setPostToDelete(null)
  //   setIsDeleting(false)
  // }

  const deletePost = async () => {
    if (!postToDelete) return

    setIsDeleting(true)
    handleDeletePost(postToDelete)
  }

  const editPost = (postId: string) => {
    navigate(`/posts/edit/${postId}`)
  }

  return (
    <>
      <Flex asChild className="feed-container" direction="column">
        <main className="feed-container">
          {posts.length === 0 && (
            <div className="empty-state">
              <p>Nenhum post encontrado. Crie um novo post para começar!</p>
            </div>
          )}

          {posts.length > 0 &&
            posts.map((post) => (
              <Card asChild key={post.postId} size="3">
                <NavLink to={`/posts/${post.postId}`}>
                  <Flex direction="column" gap="9">
                    <Flex justify="between" gap="4">
                      <Flex direction="column" gap="4">
                        <Heading as="h1" size="5" weight="medium" wrap="balance">
                          {post.title}
                        </Heading>

                        <Text
                          className="feed-label-item"
                          as="p"
                          size="3"
                          weight="regular"
                          wrap="balance"
                          color="gray"
                        >
                          {post.content}
                        </Text>
                      </Flex>

                      {isMyPost(post) && (
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger>
                            <Box className="dropdown-post-trigger">
                              <IconDots width={18} height={18} />
                            </Box>
                          </DropdownMenu.Trigger>

                          <DropdownMenu.Content
                            className="dropdown-content"
                            variant="soft"
                            color="gray"
                            align="end"
                          >
                            <DropdownMenu.Item
                              className="dropdown-item"
                              shortcut="Ctrl+E"
                              onClick={() => editPost(post.postId)}
                            >
                              Compartilhar
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="dropdown-item"
                              shortcut="Ctrl+D"
                              onClick={() => editPost(post.postId)}
                            >
                              Editar
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator />

                            <DropdownMenu.Item
                              className="dropdown-item delete"
                              color="red"
                              onClick={() => openDeleteModal(post.postId)}
                            >
                              Excluir
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      )}
                    </Flex>

                    <Flex align="center" gap="3">
                      <AvatarUser
                        src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                        letter={post.author.name}
                        size="small"
                      />

                      <Flex align="center" gap="1" pt="1px">
                        <Text className="feed-label-item" as="span" size="2" weight="medium">
                          {post.author.name} •
                        </Text>

                        <Text className="feed-label-date" as="span" size="2" weight="regular">
                          {formatDate(post.createdAt)}
                        </Text>
                      </Flex>

                      <Box className="feed-comment-count">
                        <IconComment width={14} height={14} />
                        15
                      </Box>
                    </Flex>
                  </Flex>
                </NavLink>
              </Card>
            ))}
        </main>
      </Flex>

      {/* RADIX ALERT DIALOG - CONFIRMAÇÃO DE EXCLUSÃO */}
      <AlertDialog.Root open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="alert-overlay" />
          <AlertDialog.Content className="alert-content">
            <AlertDialog.Title className="alert-title">Confirmar Exclusão</AlertDialog.Title>
            <AlertDialog.Description className="alert-description">
              Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
            </AlertDialog.Description>

            <div className="alert-buttons">
              <AlertDialog.Cancel asChild>
                <button className="button button-secondary" disabled={isDeleting}>
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button className="button button-danger" onClick={deletePost} disabled={isDeleting}>
                  {isDeleting ? 'Excluindo...' : 'Excluir'}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  )
}

export default Feed
