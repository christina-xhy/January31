import { useRouteError, useLocation, Navigate } from "react-router-dom"
import { ErrorUnAuthorized } from "../errors"

export const ErrorPage: React.FC = () => {
    const error = useRouteError()
    //强制断言转换error unknown的类型为Error（这样才有message属性)
    const location = useLocation()
    const err = error as Error
    if (err instanceof ErrorUnAuthorized) {
        const from = encodeURIComponent(`${location.pathname}${location.search}`)
        return <Navigate to={`/sign_in?from=${from}`} />
    } else {
        return (
            <div>未知错误</div>
        )
    }
}