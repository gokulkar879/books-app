import { Navigate } from "react-router-dom"

const ProtectedRoute = ({
    user,
    redirectedPath = "/signin",
    children
}) => {
    if(!user) {
        return <Navigate to={redirectedPath} replace/>
    }

    return children
}

export default ProtectedRoute