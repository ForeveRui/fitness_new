import * as service from '../services/admin'
import moment from 'moment'
import 'moment/locale/zh-cn';
import { message } from 'antd'

export default {

    namespace: 'admin',

    state: {

    },
    effects: {
        * getNum(_, { call, put }) {
            const UserNum = yield call(service.getUserNum);
            const CostNum = yield call(service.getRecordNum);
            const PriceNum = yield call(service.getPriceNum);
            yield put({
                type: 'saveUserNum',
                payload: {
                    data: UserNum.data[0].num
                }
            });
            yield put({
                type: 'saveCostNum',
                payload: {
                    data: CostNum.data[0].num
                }
            });
            yield put({
                type: 'savePriceNum',
                payload: {
                    data: PriceNum.data[0].num
                }
            });
        },
    },

    reducers: {
        savePriceNum(state, { payload: { data: result } }) {
            const PriceNum = result;
            return { ...state, PriceNum }
        },
        saveCostNum(state, { payload: { data: result } }) {
            const CostNum = result;
            return { ...state, CostNum }
        },
        saveUserNum(state, { payload: { data: result } }) {
            const UserNum = result;
            return { ...state, UserNum }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                let list = pathname.split('/');
                if (list.length === 2) {
                    if (list[1] === 'admin') {
                        dispatch({ type: 'getNum' })
                    }
                }
            });
        },
    }
}
