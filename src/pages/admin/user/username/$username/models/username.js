import * as service from '../services/username'
import moment from 'moment'
import 'moment/locale/zh-cn';

export default {

  namespace: 'username',

  state: {

  },
  effects: {
    * getUserNum({ payload: params }, { call, put }) {
      const UserNum = yield call(service.getUserNum, params.username);
      yield put({
        type: 'saveUserNum',
        payload: {
          data: UserNum.data[0].num
        }
      });
    },
    * getUserList({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUserList, params.username, params.page, params.limit)
      yield put({
        type: 'saveUserList',
        payload: {
          data: data
        }
      })
    },
    * deleteUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.deleteUser, params.obj)
      yield put({
        type: 'getUserList', 
        payload: {
          username: params.username,
          page: parseInt(params.page),
          limit: 10
        }
      })
    },

    * addUser({ payload: params }, { call, put }) {
      params.birth = moment(params.birth._d).format("YYYY-MM-D");
      let { data } = yield call(service.addUser, params)
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
        if (list.length === 6) {
          let reg = /^\d+$/;
          if (reg.test(list[5]) && list[1] === 'admin' && list[2] === 'user' && list[3] === 'username') {
            dispatch({ type: 'getUserNum',
            payload:{
              username: list[4]
            }
          })
            dispatch({
              type: 'getUserList', payload: {
                username: list[4],
                page: parseInt(list[5]),
                limit: 10
              }
            })
          }
        }
      });
    },
  }
}
