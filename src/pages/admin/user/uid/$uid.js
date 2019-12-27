import React from 'react'
import { Form, Input, Button, Select, DatePicker  } from 'antd';
import { connect } from 'dva'
import router from 'umi/router';
import moment from 'moment'
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
class Index extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        const { dispatch } = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: 'admin_uid/updateUser',
                    payload: values
                })
            }
        });
        this.props.form.resetFields(['password'])

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 18 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const { User } = this.props;
        return (
            <div>
                {User !== undefined ? <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="ID">
                        {getFieldDecorator('uid', {
                            initialValue: User.id
                        })(<Input disabled={true} />)}
                    </Form.Item>
                    <Form.Item label="用户名">
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: '请输入11个字符', min: 11, max: 11 },
                            ],
                            initialValue: User.phone
                        })(<Input disabled={true} />)}
                    </Form.Item>
                    <Form.Item label="昵称">
                        {getFieldDecorator('name', {
                            rules: [
                                { required: true, message: '请输入1~11个字符', min: 1, max: 11 },
                            ],
                            initialValue: User.name
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            initialValue: User.sex,
                            rules: [
                                { required: true, message: '请选择性别' }
                            ],
                        })(<Select style={{ width: '100%' }}>
                            <Option value='1'>男</Option>
                            <Option value='2'>女</Option>
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="出生日期">
                        {getFieldDecorator('birth', {
                            initialValue: moment(User.birth, 'YYYY-MM-DD'),
                            rules: [
                                { required: true, message: '请选择日期' }
                            ],
                        })(<DatePicker/>)}
                    </Form.Item>
                    <Form.Item label="密码">
                        {getFieldDecorator('password', {
                            initialValue: ''
                        })(<Input type='password' />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            更新
                    </Button>
                    </Form.Item>
                </Form> : null}
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { User } = state.admin_uid
    return {
        loading: state.loading.models.admin_uid,
        User
    }
}

export default Form.create()(connect(mapStateToProps)(Index))