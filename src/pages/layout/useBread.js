import {useLocation} from 'react-router-dom'
import {asyncRoutes} from '@/routes/index'

function useBread(){
    let {pathname} = useLocation()
    let routes = [...asyncRoutes]
    let result = [routes[0]]

    for(let i = 0;i<routes.length;i++){
        if(i !== 0){
            if(routes[i].children){
                for(let j = 0;j<routes[i].children.length;j++){
                    if(routes[i].children[j].path === pathname){
                        result.push(routes[i]) 
                        result.push(routes[i].children[j])  
                    }
                }
            }else{
                if(routes[i].path ===  pathname){
                    result.push(routes[i]) 
                }     
            }
        } 
    }
    return result
    
}
export default useBread