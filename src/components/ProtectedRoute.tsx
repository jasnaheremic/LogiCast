import { Outlet } from "react-router-dom"
import Layout from "../features/layout"

const ProtectedRoute = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    )
}

export default ProtectedRoute;