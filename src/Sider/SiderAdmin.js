import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import {
    HomeOutlined, FolderOutlined, OrderedListOutlined
} from '@ant-design/icons';
import logo1 from '../image/logo1.png'
const { Sider } = Layout;
const SiderAdmin = ({ url, collapsed }) => {
    const history = useHistory()
    // console.log('props1', url)
    var getDefaultSelectKey = "1"

    const keys = {
        "/home": "1",
        "/home/products": "2",
        "/home/products/type": "2",
        "/home/products/warehouse": "2",
        "/home/products/warehouse-history": "2",
        "/home/orders": "3"

    }
    if (url in keys) {
        getDefaultSelectKey = keys[url]
    }


    return (
        <Sider className="sider" trigger={null} collapsible collapsed={collapsed}
            width="250"

            style={{
                // background: 'rgb(57, 59, 63)',
                overflow: 'auto',
                height: '100vh',
                // position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo">
                <img src={logo1} alt="Logo" /> <span>Shop Online</span>
            </div>
            <Menu className="menu" mode="inline" defaultSelectedKeys={[getDefaultSelectKey]}>
                <Menu.Item className="menu_item" onClick={() => { history.push('/home') }} key="1" icon={<HomeOutlined className="icon_sider" />}>
                    Trang chủ
                </Menu.Item>
                <Menu.Item className="menu_item" onClick={() => { history.push('/home/products') }} key="2" icon={<FolderOutlined className="icon_sider" />}>
                    Sản phẩm
                </Menu.Item>
                <Menu.Item className="menu_item" onClick={() => { history.push('/home/orders') }} key="3" icon={<OrderedListOutlined className="icon_sider" />}>
                    Đơn hàng
                </Menu.Item>
                {/* <Menu.Item className="menu_item" onClick={() => { history.push('/home'); localStorage.setItem('selectkey', '3') }} key="4" icon={<UploadOutlined className="icon_sider" />}>
                    nav 4
                </Menu.Item> */}
            </Menu>
        </Sider>
    );
}
export default SiderAdmin