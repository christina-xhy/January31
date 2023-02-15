import { Gradient } from "../components/Gradient"
import { Icon } from "../components/Icon"
import { TopNav } from "../components/TopNav"

export const SignInPage : React.FC = () => {

  return (
   <div>
         <Gradient>
            <TopNav title ='登录' icon = { <Icon name = 'back'></Icon> }/>
         </Gradient>
         <div text-center pt-40px pb-16px>
            <Icon name = 'logo' className = 'w-64px h-68px'></Icon>
            <h1 text-28px text='#fda4af' font-bold>ali记账</h1>
        </div>
        <form j-form>
            <div>
                <span j-form-label >邮箱地址</span>
                <input j-input-text rounded-8px type='text' placeholder="请输入邮箱，然后点击发送验证码"></input>
            </div>
            <div>
                <span j-form-label>验证码</span>
                <div flex>
                    <input j-input-text rounded-8px type='text' placeholder='6位数字'></input>
                    <button j-btn ml-16px>发送验证码</button>
                </div>
            </div>
        </form>
   </div>
  )
}