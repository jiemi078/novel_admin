import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message } from 'antd';
import React from 'react';
import { setAccessToken } from '@/services/ant-design-pro/api';

const LoginPage: React.FC = () => {
  return (
    <LoginForm
      title="reelforce"
      subTitle="小说后台管理系统"
      onFinish={async () => {
        setAccessToken('demo-token');
        message.success('登录成功');
        history.push('/');
        return true;
      }}
    >
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined />,
        }}
        placeholder="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined />,
        }}
        placeholder="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      />
    </LoginForm>
  );
};

export default LoginPage;
