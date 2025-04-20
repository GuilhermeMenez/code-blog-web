import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Post from "../pages/Post/view"
import Home from "../pages/Home/view"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Post />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes