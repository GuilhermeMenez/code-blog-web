import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AuthPage from "../pages/Auth"
import Feed from "../pages/Feed"
import PostDetail from "../pages/PostDetail/view"
import CreatPost from "../pages/CreatePost"
import EditPost from "../pages/EditPost"
import Layout from "@/components/sidebar/Index"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Rotas sem Layout (Autenticação) */}
                <Route path="/" element={<AuthPage />} />

                {/* Rotas com Layout (Sidebar persistente) */}
                <Route
                    path="/*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="/feed" element={<Feed />} />
                                <Route path="/posts/:id" element={<PostDetail />} />
                                <Route path="/posts/edit/:id" element={<EditPost />} />
                                <Route path="/newpost" element={<CreatPost />} />
                                
                                {/* Redirect padrão */}
                                <Route path="/" element={<Navigate to="/feed" replace />} />
                            </Routes>
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    )
}

export default AppRoutes