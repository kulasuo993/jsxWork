// roles 角色
// tmp 每一个规则
// hasPermission 判断一个角色是否有访问某个路由权限
// 如：admin     meta: roles:["amdin","editor"]
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    // 没有meta
    return true
  }
}

// routes 所有动态路由
// roles 角色
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// generateRoutes 生成路由规则们
// asyncRoutes 所有动态路由
// roles 角色
export function generateRoutes(asyncRoutes, roles) {
  return dispatch => {
    let accessRoutes = []
    // filterAsyncRoutes 生成当前用户可以访问的路由规则们
    accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
    console.log(accessRoutes)
    // 把路由规则们存储到redux
    // dispatch({ type: 'USER_PERMISSION', payload: accessRoutes })
    dispatch({ type: "USER_PERMISSION", payload: accessRoutes })
  }
}