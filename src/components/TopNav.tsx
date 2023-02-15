import { ReactNode } from "react"


interface Props{
  title?:string
  icon:ReactNode
}
export const TopNav : React.FC <Props>= ({title = 'ali记账' ,icon}) => {
  return (
    <div text-white flex items-center pt-24px py-8px px-24px >
      <span w-24px h-24px mr-16px flex justify-center items-center
      children-max-w='100%' children-max-h='100%'>{icon}</span>
      <h1 text-24px>{title}</h1>
    </div>
  )
}