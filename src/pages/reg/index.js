/* eslint-disable */

import React from 'react'
import { Table, Divider, Select, Input, Pagination, message, Icon, Popconfirm, Button, Form, Modal, DatePicker, Spin } from 'antd'
import { connect } from 'dva'
import router from 'umi/router';



const data = [];

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: []
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, dispatch } = this.props
        if (this.props.form.getFieldsValue(['password']).password === this.props.form.getFieldsValue(['password1']).password1) {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'reg/addUser',
                        payload: values
                    })
                    router.push('/login')
                }
            });    
        }
        else{
            message.error('两次密码输入不一样!')
        }
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
        const { loading } = this.props;
        return (
            <div style={{width: '30%', marginLeft: '35%', marginTop: '10%'}}>
                <Spin spinning={loading == undefined ? false : loading}>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="名字">
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: '请输入3~11个字符', min: 3, max: 11 },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="性别">
                            {getFieldDecorator('sex', {
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
                                rules: [
                                    { required: true, message: '请选择日期' }
                                ],
                            })(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label="用户名">
                            {getFieldDecorator('phone', {
                                rules: [
                                    { required: true, message: '请输入手机号', min: 11, max: 11 },
                                    { pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的手机号.' }

                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '请输入密码' }
                                ],
                            })(<Input type='password' />)}
                        </Form.Item>
                        <Form.Item label="密码1">
                            {getFieldDecorator('password1', {
                                rules: [
                                    { required: true, message: '请再次输入密码' }
                                ],
                            })(<Input type='password' />)}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { } = state.reg
    return {
        loading: state.loading.models.reg,
    }
}

export default Form.create()(connect(mapStateToProps)(Index));

