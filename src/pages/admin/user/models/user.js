import * as service from '../services/user'
import moment from 'moment'
import 'moment/locale/zh-cn';
import { message } from 'antd'

export default {

  namespace: 'user',

  state: {

  },
  effects: {
    * getUserNum(_, { call, put }) {
      const UserNum = yield call(service.getUserNum);
      yield put({
        type: 'saveUserNum',
        payload: {
          data: UserNum.data[0].num
        }
      });
    },
    * getUserList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUserList, params.page, params.limit)
      yield put({
        type: 'saveUserList',
        payload: {
          data: data
        }
      })
    },
    * deleteUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteUser, params.obj)
      if (data.msg === 200){
        message.success('删除成功!')
      }
      else{
        message.error('删除失败!')
      }
      yield put({
        type: 'getUserList', 
        payload: {
          page: parseInt(params.page),
          limit: 10
        }
      })
    },

    * addUser({ payload: params }, { call, put }) {
      params.birth = moment(params.birth._d).format("YYYY-MM-D");
      let { data } = yield call(service.addUser, params)
      if (data.msg === 200){
        message.success('添加成功!')
      }
      else{
        message.error('添加失败!')
      }
      yield put({
        type: 'getUserList', 
        payload: {
          page: 1,
          limit: 10
        }
      })
    },
  },

  reducers: {
    saveUserNum(state, { payload: { data: result } }) {      
      const UserNum = result;
      return { ...state, UserNum }
    },
    saveUserList(state, { payload: { data: result } }) {
      const UserList = result;
      return { ...state, UserList }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 4) {
          let reg = /^\d+$/;
          if (reg.test(list[3]) && list[1] === 'admin' && list[2] === 'user') {
            dispatch({ type: 'getUserNum' })
            dispatch({
              type: 'getUserList', payload: {
                page: parseInt(list[3]),
                limit: 10
              }
            })
          }
        }
      });
    },
  }
}
