import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Layout } from 'antd';
import { useHistory } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import getFactory from '../request/index';

const { Sider } = Layout;
const Siders = ({ collapsed, search, setSearch }) => {

    const history = useHistory()
    const getDefaultSelectKey = () => {
        const key = localStorage.getItem('selectkey');
        if (key) return key;
        else return '0';
    }
    const [type, setType] = useState([])
    useEffect(() => {
        const getTypes = async () => {
            const API = getFactory('product');
            try {
                const res = await API.getType()
                setType(res.data)
            } catch {
                setType([])
            }
        }
        getTypes()
    }, [])
    const onClickType = (type) => {
        setSearch({ ...search, "type": type.key });
        localStorage.setItem('selectkey', type.key);
        history.push('/')
    }
    const menu_types = []
    for (var i = 0; i < type.length; i++) {
        menu_types.push(
            <Menu.Item className="menu_item" onClick={(item) => onClickType(item)}
                key={type[i].id} >
                {type[i].type}
            </Menu.Item>)
    }
    return (
        <Sider className="sider" trigger={null} collapsible collapsed={collapsed}
            width="250"

            style={{
                background: '#FF6000',
                overflow: 'auto',
                height: '100vh',
                left: 0,
            }}
        >
            <div className="logo" />
            <Menu className="menu" mode="inline" defaultSelectedKeys={[getDefaultSelectKey()]}>
                <Menu.Item className="menu_item" onClick={() => { history.push('/'); localStorage.setItem('selectkey', '0'); setSearch({}) }} key="0" icon={<HomeOutlined className="icon_sider" />}>
                    Trang chủ
                </Menu.Item>
                {menu_types}
            </Menu>
        </Sider>
    );
}
export default Siders