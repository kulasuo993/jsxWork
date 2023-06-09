import React, { useState } from 'react';
import './index.scss'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button , ConfigProvider } from 'antd';
import Mysider from './Myside'
import MyHeader from './MyHeader'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;

function LayoutPage(){
  const [collapsed, setCollapsed] = useState(false)
  const {size} = useSelector(state =>state.app)

  return (
    <ConfigProvider componentSize={size}>
       <div className='my-layout'>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <Mysider></Mysider>
          </Sider>
          <Layout>
            <Header style={{ 
              padding: 0,
              color:'#fff' }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                  color:'#fff'
                }}
              />
                  <MyHeader></MyHeader>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
                <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
    </div>
    </ConfigProvider>
   
  
  );
};

export default LayoutPage;