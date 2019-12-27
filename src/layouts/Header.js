import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import HeaderCss from './Header.css'
import Link from 'umi/link';
import router from 'umi/router';
const { Header, Content, Footer } = Layout;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        const { location } = this.props;
        return (
            <Layout className="layout" style={{ height: '100%' }}>
                <Header>
                    <div className={HeaderCss.logo} />
                    {!location.pathname.includes('admin') ?
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="record">
                                <Link to="/record/1">Record</Link>
                            </Menu.Item>
                            {/* <Menu.Item key="status">
                                <Link to="/status/1">Status</Link>
                            </Menu.Item>
                            <Menu.Item key="rank">
                                <Link to="/rank/1">Rank</Link>
                            </Menu.Item> */}
                            
                            <Menu.Item key="reg" style={{ float: 'right' }}>
                            {sessionStorage.getItem('username') === null ? <Link to='/reg'>注册</Link> :
                                    <a onClick={() => {
                                        console.log(sessionStorage)
                                        sessionStorage.clear();
                                        router.push('/login')
                                    }}>退出</a>
                                }
                            </Menu.Item>
                            <Menu.Item key="login" style={{ float: 'right' }}>
                            {sessionStorage.getItem('username') === null ? <Link to='/login'>登录</Link> :
                                    <a>{sessionStorage.getItem('username')}</a>
                                }
                            </Menu.Item>
                            {/* <Menu.Item key="login" style={{ marginLeft: '60%', backgroundColor: 'write' }}>
                                {sessionStorage.getItem('username') === null ? <Link to='/login'>登录</Link> :
                                    <a>{localStorage.getItem('username')}</a>
                                }
                            </Menu.Item>
                            <Menu.Item key="reg" >
                                {sessionStorage.getItem('username') === null ? <Link to='/reg'>注册</Link> :
                                    <a>退出</a>
                                }
                            </Menu.Item> */}
                        </Menu>
                        :
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="user">
                                <Link to="/admin/user/1">User</Link>
                            </Menu.Item>
                            <Menu.Item key="record">
                                <Link to="/admin/record/1">Record</Link>
                            </Menu.Item>
                            <Menu.Item key="price">
                                <Link to="/admin/price/1">Price</Link>
                            </Menu.Item>
                            <Menu.Item key="reg" style={{ float: 'right' }}>
                            {sessionStorage.getItem('username') === null ? <Link to='/reg'>注册</Link> :
                                    <a onClick={() => {
                                        sessionStorage.clear();
                                        router.push('/login')
                                    }}>退出</a>
                                }
                            </Menu.Item>
                            <Menu.Item key="login" style={{ float: 'right' }}>
                            {sessionStorage.getItem('username') === null ? <Link to='/login'>登录</Link> :
                                    <a>{sessionStorage.getItem('username')}</a>
                                }
                            </Menu.Item>
                        </Menu>
                    }
                </Header>
                <Content style={{ padding: '0 50px' }} id='content'>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, height: '100%' }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>©2018 Created by suyu</Footer>

            </Layout>
        )
    }
}


export default Index;