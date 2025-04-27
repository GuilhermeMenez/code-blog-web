import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PostDetail from "../pages/PostDetail/view"
import Posts from "../pages/Posts/view"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/Posts" element={<Posts />} />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes