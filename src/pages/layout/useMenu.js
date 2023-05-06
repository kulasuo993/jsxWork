import {useLocation} from 'react-router-dom'
import {asyncRoutes} from '@/routes/index'
import {useMemo} from 'react'

function useMenu(){
    let {pathname} = useLocation()
    return useMemo(()=>{
        let selectedKey = ''
        let openKey = ''
        asyncRoutes.forEach(ele=>{
            if(!ele.children){
                if(ele.path === pathname){
                    selectedKey = ele.key + ''
                }
            }else{
                ele.children.forEach(ele2=>{
                    if(ele2.path === pathname){
                        selectedKey = ele2.key + ''
                        openKey = ele.key + ''
                    }
                })
            }
        })
        return [[selectedKey], [openKey]]
    }, [pathname])
    
}
export default useMenu