import * as service from '../services/admin_uid'
import { message } from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn';
import router from 'umi/router';
moment.locale('zh-cn');

export default {

  namespace: 'admin_uid',

  state: {

  },
  effects: {
    * getUser({ payload: params }, { call, put }) {
      let { data } = yield call(service.getUser, params.uid)
      yield put({
        type: 'saveUser',
        payload: {
          data: data
        }
      })
    },
    * updateUser({ payload: params }, { call, put }) {
      params.birth = moment(params.birth._d).format("YYYY-MM-D");
      let { data } = yield call(service.updateUser, params)
      if (data.msg === 200) {
        message.success('更新成功!')
      }
      else {
        message.error('更新失败!')
      }
    },
  },

  reducers: {
    saveUserNum(state, { payload: { data: result } }) {
      const UserNum = result;
      return { ...state, UserNum }
    },
    saveUser(state, { payload: { data: result } }) {
      let User = result[0];
      return { ...state, User }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        let list = pathname.split('/');
        if (list.length === 5) {
          let reg = /^\d+$/;
          if (reg.test(list[4]) && list[1] === 'admin' && list[2] === 'user' && list[3] === 'uid') {
            dispatch({
              type: 'getUser', payload: {
                uid: parseInt(list[4]),
              }
            })
          }
        }
      });
    },
  }
}
