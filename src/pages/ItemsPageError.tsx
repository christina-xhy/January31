import { Navigate, useRouteError } from "react-router-dom"

export const ItemsErrorPage: React.FC = () => {
    const error = useRouteError()
    //强制断言转换error unknown的类型为Error（这样才有message属性)
    const err = error as Error
    if (err.message === 'unAuthorized') {
        return <Navigate to='sign_in' />
    } else if (err.message === 'not_found') {
        return <Navigate to='home' />
    } else {
        return (
            <div>出错了</div>
        )
    }
}