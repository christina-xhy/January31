import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"

export const SignInPage : React.FC = () => {

  return (
    <Gradient>
        <TopNav title ='登陆' icon = {
            <Icon name = 'back'></Icon>
        }/>
    </Gradient>
  )
}