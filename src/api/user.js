import request from "@/utils/request"

// export function fetchLogin(data) {
//   return request({
//     url: "/backend/sso/login",
//     method: "POST",
//     data
//   })
// }
export function fetchLogin(data) {
  return request({
    url: "/site/login",
    method: "POST",
    data
  })
}