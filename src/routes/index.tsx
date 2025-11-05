import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//import PostDetail from "../pages/PostDetail/view"
import AuthPage from "../pages/Auth"
import Feed from "../pages/Feed"
import PostDetail from "../pages/PostDetail/view"
import CreatPost from "../pages/CreatPost/view"
import EditPost from "../pages/EditPost"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                {/* <Route path="/posts" element={<Posts />} /> */}
                <Route path="/feed" element={<Feed />} />
                <Route path="/posts/:id" element={<PostDetail />} />
                 <Route path="/posts/edit/:id" element={<EditPost />} />
                <Route path="/newpost" element={<CreatPost />} /> 
            </Routes>
        </Router>
    )
}

export default AppRoutes