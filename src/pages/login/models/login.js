import * as service from '../services/login'
import { message } from 'antd'
import router from 'umi/router';

export default {

  namespace: 'login',

  state: {

  },
  effects: {
    * login({ payload: params }, { call, put }) {
      const User = yield call(service.login, params);  
      // const Time = yield call(service.time);
      // console.log(Time);          
      if (parseInt(User.data.msg) === 200) {
        sessionStorage.setItem('status', User.data.data.status);
        sessionStorage.setItem('username', User.data.data.phone);
        sessionStorage.setItem('nickname', User.data.data.name);
        sessionStorage.setItem('uid', User.data.data.id);
        sessionStorage.setItem('username', User.data.data.phone)
        // localStorage.setItem('time', Time.data.time)
        
        yield put({
          type: 'saveLogin',
          payload: {
            data: true
          }
        }); 
        console.log(typeof sessionStorage.getItem('status'));
               
        if (User.data.data.status === 1){
          router.push('/admin')
        }
        else{
          router.push(`/`);
        }
        
      }
      else{
        yield put({
          type: 'saveLogin',
          payload: {
            data: false
          }
        });
        message.error('账号或密码错误')
      }   
      // console.log(sessionStorage)   
    },
  },

  reducers: {
    saveLogin(state, { payload: { data: result } }) {
      const Login = result;
      return { ...state, Login }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        // let list = pathname.split('/');
        // if (list.length === 3){
        //   let reg = /^\d+$/;
        //   if (reg.test(list[2])&&list[1] === 'rank'){
        //     dispatch({ type: 'getStatusNum' })
        //     dispatch({ type: 'getRankList', payload: {
        //       page: parseInt(list[2]),
        //       limit : 10
        //     }})
        //   }
        // }
      });
    },
  }
}
