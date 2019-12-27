import request from '../../../util/Request'

export function getRecordNum() {
    return request(`../../api/record/num`)
}
export function getUserNum() {
    return request(`../../api/user/num`)
}
export function getPriceNum() {
    return request(`../../api/price/num`)
}