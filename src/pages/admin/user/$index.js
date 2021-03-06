/* eslint-disable */

import React from 'react'
import { Table, Divider, Select, Input, Pagination, message, Icon, Popconfirm, Button, Form, Modal, DatePicker } from 'antd'
import { connect } from 'dva'
import router from 'umi/router';
import Link from 'umi/link';
const { Search } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const { TextArea } = Input;
const { Option } = Select;


const data = [];

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    componentWillMount() {
        if (sessionStorage.getItem('username') === null) {
            message.loading('请登录', 0.5);
            router.push('/');
        }
        if (sessionStorage.getItem('status') !== '1') {
            message.loading('请用管理员账号登录', 0.5);
            router.push('/');
        }
    }

    onChange = (e) => {
        router.push(`/admin/user/${e}`);
    }

    confirm = (uid) => {
        let obj = "{" +
            '"uid":' + '"' + uid + '"'
            + "}"
        obj = JSON.parse(obj);
        const { dispatch, location } = this.props;
        dispatch({
            type: 'user/deleteUser',
            payload: {
                obj: obj,
                page: location.pathname.split('/')[3]
            }
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    handleSubmit = e => {
        const { dispatch } = this.props;
        e.preventDefault();
        let _this = this;
        if (this.props.form.getFieldsValue(['password']).password === this.props.form.getFieldsValue(['password1']).password1) {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    dispatch({
                        type: 'user/addUser',
                        payload: values
                    })
                    _this.handleCancel()
                    router.push('/admin/user/1')
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
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
            },
            {
                title: '出生日期',
                dataIndex: 'birth',
                key: 'birth',
            },
            {
                title: '联系电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            // {
            //     title: '登陆时间',
            //     dataIndex: 'login_time',
            //     key: 'login_time',
            // },
            // {
            //     title: '注册时间',
            //     dataIndex: 'reg_time',
            //     key: 'reg_time',
            // },
            {
                title: '操作',
                dataIndex: '',
                key: '',
                render: (text) => {
                    return <div>
                        <Link to={'/admin/user/uid/' + text.id} >
                            <Icon type="edit" />
                        </Link>
                        <Popconfirm

                            title="是否确定删除？"
                            onConfirm={() => this.confirm(text.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <a href="#" style={{ marginLeft: 20, color: 'red' }}><Icon type="delete" /></a>
                        </Popconfirm>
                    </div>
                }
            },
        ];
        const { UserNum, UserList, loading, location } = this.props;
        let num = UserNum;
        let reg = /^\d+$/;
        let path = location.pathname.split('/');
        let page = 0;
        if (reg.test([path[3]])) {
            page = parseInt(path[3]);
        }
        if (UserList === undefined || UserList.length === 0) {
            num = 0;
        }
        return (
            <div>
                <div>
                    <Button type='primary' onClick={this.showModal}>增加用户</Button>
                    <Search style={{float: 'right', width: 200 }} placeholder="请输入用户名" onSearch={value => router.push(`/admin/user/username/${value}/1`)} enterButton />
                    <Table
                        style={{marginTop: 10}}
                        pagination={false}
                        loading={loading}
                        columns={columns}
                        dataSource={UserList}
                        rowKey='mid'
                    />
                    <div style={{ float: 'right', marginTop: 10 }}>
                        <Pagination
                            showQuickJumper
                            defaultCurrent={page}
                            total={num}
                            onChange={(page) => this.onChange(page)}
                        />
                    </div>
                </div>
                <Modal
                    title="增加用户"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
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
                                    { required: true, message: '请输入11个字符', min: 11, max: 11 },
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
                                增加
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { UserNum, UserList } = state.user
    return {
        loading: state.loading.models.user,
        UserNum,
        UserList
    }
}

export default Form.create()(connect(mapStateToProps)(Index));

