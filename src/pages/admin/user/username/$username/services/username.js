import request from '../../../../../../util/Request'

// 获取数据

export function getUserNum(username){
  return request(`../../../../api/username/${username}/num`)
}

export function getUserList(username, page, limit){
  return request(`../../../../api/username/${username}/${page}/${limit}`)
}

export function deleteUser(params){
  return request(`../../../../api/user_uid/delete`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}

export function addUser(params){
  return request(`../../../../api/user/add`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
}
