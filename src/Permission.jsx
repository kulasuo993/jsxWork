import Layout from '@/pages/layout/index'
import Login from '@/pages/login/index'
import {useRoutes, useNavigate, useLocation} from 'react-router-dom'
import {generateRoutes}  from '@/store/permission'
import {asyncRoutes} from '@/routes/index'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// 静态路由
const constantRoutes = [
    {path: '/', element: <Layout/>, children:[]},
    {path: '/login', element: <Login/>, children:[]},
]

// 白名单
const whiteList = ['/login']

function Page() {
    const {token, roles, accessRoutes} = useSelector(state => state.user)
    console.log(token)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {pathname} = useLocation()
 
    useEffect(()=>{
        if(roles && roles.length > 0){
            dispatch(generateRoutes(asyncRoutes, roles))
        }
    }, [roles])

    useEffect(()=>{
        if(accessRoutes && accessRoutes.length > 0){
            navigate('/dashboard', {replace: true})
        }
    },[accessRoutes])

    // 监听token的变化
    useEffect(()=>{
        if(!token){
            navigate('/login', {replace: true})     
        }
    }, [token])


    useEffect(()=>{
        // 如果有白名单
        if(!whiteList.includes(pathname) && !token){
            navigate('/login', {replace: true})     
        }

        if(token && pathname === '/login'){
            navigate('/dashboard', {replace: true})  
        }

    }, [pathname])

    const routes = useMemo(()=>{
        const result = [...constantRoutes]
        result[0].children = accessRoutes
        return result   
    },[accessRoutes])
    

    const element = useRoutes(constantRoutes)
    return element
}

export default Page;