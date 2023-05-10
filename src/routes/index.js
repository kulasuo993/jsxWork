import {
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';

//路由表
import Dashboard from "../pages/dashboard/index"
import GoodList from "../pages/goods/goodList"
import GoodForm from "../pages/goods/goodForm"
import User from "../pages/user/index"
import TodoList from '../pages/todoList/TodoList';
import TodoList1 from '../pages/todoList/TodoList1';
import List from '../pages/abc/Demo12'

export const asyncRoutes = [
    {
        key: 1001,
        path: "/dashboard",
        label: "首页大屏",
        icon: <MenuFoldOutlined />,
        element: <Dashboard />,
        meta:{
            roles: ['37','327']
        }
    },
    {
        key: 1002,
        icon: <VideoCameraOutlined />,
        label: "商品管理",
        meta:{
            roles: ['37']
        },
        children: [
            {
                key: 100201,
                path: "/good/list",
                icon: null,
                label: "商品列表",
                element: <GoodList />
            },
            {
                key: 100202,
                path: "/good/add",
                icon: null,
                label: "商品新增",
                element: <GoodForm />
            },
            {
                key: 100203,
                path: "/good/edit",
                icon: null,
                label: "商品编辑",
                element: <GoodForm />,
				hidden: true
            }
        ]
    },
    {
        key: 1004,
        icon: <UserOutlined />,
        label: "todoList",
        meta:{
            roles: ['37','327']
        },
        children:[
            {
                key: 100001,
                path: "/list/list1",
                icon: null,
                label: "list1",
                element: <TodoList />,
                meta:{
                    roles: ['37']
                },
            },
            {
                key: 100002,
                path: "/list/list2",
                icon: null,
                label: "list2",
                element: <TodoList1 />,
            }
        ]
    },
    {
        key: 1005,
        icon: null,
        label: '课堂',
        meta:{
            roles: ['37']
        },
        children:[
            {
                key:10001,
                path:"work/list",
                icon:null,
                label:"list1",
                element:<List/>
            }
        ]
    },
    {
        key: 1003,
        path: "/user",
        element: <User />,
        icon: <UserOutlined />,
        label: "用户管理",
        meta:{
            roles: ['37','327']
        }
    },
  
];