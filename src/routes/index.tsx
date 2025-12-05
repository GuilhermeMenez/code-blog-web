import { BrowserRouter, Routes, Route } from 'react-router'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'

import AuthPage from '../pages/Auth'
import Feed from '../pages/Feed'
import PostDetail from '../pages/PostDetail/view'
import CreatPost from '../pages/CreatePost'
import EditPost from '../pages/EditPost'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<AuthPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/favorites" element={<div>Favorites Page</div>} />

          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/newpost" element={<CreatPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
