import { Navigate, useLocation, useRouteError } from "react-router-dom"
import { ErrorEmptyData, ErrorUnAuthorized } from "../errors"

export const ItemsErrorPage: React.FC = () => {
    const error = useRouteError()
    //强制断言转换error unknown的类型为Error（这样才有message属性)
    const location = useLocation()
    const err = error as Error
    if (err instanceof ErrorUnAuthorized) {
        const from = encodeURIComponent(`${location.pathname}${location.search}`)
        return <Navigate to={`/sign_in?from=${from}`} />
    } else if (err instanceof ErrorEmptyData) {
        return <Navigate replace to='/home' />
    } else {
        return (
            <div>出错了</div>
        )
    }

    // if (err.message === 'unAuthorized') {
    //     const from = encodeURIComponent(`${location.pathname}${location.search}`)
    //     return <Navigate to={`/sign_in?from=${from}`} />
    // } else if (err.message === 'not_found') {
    //     return <Navigate replace to='home' />
    // } else {
    //     return (
    //         <div>出错了</div>
    //     )
    // }
}