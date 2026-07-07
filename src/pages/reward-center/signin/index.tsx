import { PageContainer, ProTable, type ProColumns } from '@ant-design/pro-components';
import { Button, Card, Form, Input, InputNumber, message, Space, Switch, Tag } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
  getSigninSettings,
  saveSigninSettings,
  type SigninRewardItem,
  type SigninSettings,
} from '@/services/reward-center/signin';

const SigninPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SigninSettings>({
    enabled: 0,
    cycleDays: 7,
    remark: '',
    updatedAt: 0,
    items: [],
  });

  const loadSettings = async () => {
    setLoading(true);
    try {
      setSettings(await getSigninSettings());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const updateItem = (dayNo: number, patch: Partial<SigninRewardItem>) => {
    setSettings((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.dayNo === dayNo ? { ...item, ...patch } : item)),
    }));
  };

  const columns = useMemo<ProColumns<SigninRewardItem>[]>(
    () => [
      {
        title: '签到天数',
        dataIndex: 'dayNo',
        width: 120,
        fixed: 'left',
        search: false,
        render: (_, record) => <Tag color="blue">第 {record.dayNo} 天</Tag>,
      },
      {
        title: '奖励 Bonus',
        dataIndex: 'bonusAmount',
        width: 160,
        search: false,
        render: (_, record) => (
          <InputNumber
            min={0}
            value={record.bonusAmount}
            style={{ width: 140 }}
            onChange={(value) => updateItem(record.dayNo, { bonusAmount: Number(value || 0) })}
          />
        ),
      },
      {
        title: '过期天数',
        dataIndex: 'expireDays',
        width: 160,
        search: false,
        render: (_, record) => (
          <InputNumber
            min={0}
            value={record.expireDays}
            style={{ width: 140 }}
            onChange={(value) => updateItem(record.dayNo, { expireDays: Number(value || 0) })}
          />
        ),
      },
      {
        title: '奖励描述',
        dataIndex: 'rewardDesc',
        search: false,
        render: (_, record) => (
          <Input
            value={record.rewardDesc}
            placeholder="请输入奖励描述"
            onChange={(event) => updateItem(record.dayNo, { rewardDesc: event.target.value })}
          />
        ),
      },
    ],
    [],
  );

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSigninSettings(settings);
      message.success('保存成功');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageContainer title={false}>
      <Card
        title="签到配置"
        bordered={false}
        extra={
          <Space>
            <span>启用签到</span>
            <Switch
              checked={settings.enabled === 1}
              onChange={(checked) => setSettings((prev) => ({ ...prev, enabled: checked ? 1 : 0 }))}
            />
            <Button type="primary" loading={saving} onClick={handleSave}>
              保存配置
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <Form.Item label="备注说明">
            <Input
              value={settings.remark}
              placeholder="用于后台备注，不直接展示给前台"
              onChange={(event) => setSettings((prev) => ({ ...prev, remark: event.target.value }))}
            />
          </Form.Item>
        </Form>
        <ProTable<SigninRewardItem>
          rowKey="dayNo"
          columns={columns}
          dataSource={settings.items}
          loading={loading}
          search={false}
          pagination={false}
          tableLayout="fixed"
          scroll={{ x: 760 }}
          toolBarRender={false}
        />
      </Card>
    </PageContainer>
  );
};

export default SigninPage;
