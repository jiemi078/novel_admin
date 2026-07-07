import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Card, Col, Empty, Image, List, message, Row, Space, Statistic, Tag, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
  createHomepageBlock,
  queryHomepageBlockItems,
  queryHomepageBlocks,
  queryHomepageTabs,
  type HomepageBlock,
  type HomepageBlockCreateValues,
  type HomepageBlockItem,
  type HomepageTab,
} from '@/services/app-config/novel-homepage';

const { Text } = Typography;

const blockTypeLabels: Record<string, string> = {
  banner: 'Banner轮播',
  horizontal_scroll_3: '三列横向滚动',
  vertical_list: '单列竖向列表',
  dual_column: '双列网格',
  large_card_scroll: '大卡片横向滚动',
  ranking_list: '排行榜列表',
};

const NovelHomepagePage: React.FC = () => {
  const [tabs, setTabs] = useState<HomepageTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>();
  const [blocks, setBlocks] = useState<HomepageBlock[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string>();
  const [items, setItems] = useState<HomepageBlockItem[]>([]);

  const activeBlock = useMemo(() => blocks.find((block) => block.id === activeBlockId), [activeBlockId, blocks]);

  const loadTabs = async () => {
    const result = await queryHomepageTabs();
    setTabs(result.list);
    setActiveTabId((prev) => prev || result.list[0]?.id);
  };

  const loadBlocks = async (tabId: string) => {
    const result = await queryHomepageBlocks(tabId);
    setBlocks(result.list);
    setActiveBlockId((prev) => (prev && result.list.some((block) => block.id === prev) ? prev : result.list[0]?.id));
  };

  const loadItems = async (blockId: string) => {
    const result = await queryHomepageBlockItems(blockId);
    setItems(result.list);
  };

  useEffect(() => {
    loadTabs();
  }, []);

  useEffect(() => {
    if (activeTabId) loadBlocks(activeTabId);
  }, [activeTabId]);

  useEffect(() => {
    if (activeBlockId) loadItems(activeBlockId);
    else setItems([]);
  }, [activeBlockId]);

  return (
    <PageContainer title={false}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic title="Tab 数" value={tabs.length} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic title="模块数" value={blocks.length} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic title="当前模块内容" value={items.length} />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic title="启用模块" value={blocks.filter((block) => block.status === 1).length} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col flex="240px">
            <Card title="首页 Tab" bordered={false}>
              <List
                dataSource={tabs}
                renderItem={(tab) => (
                  <List.Item
                    style={{ cursor: 'pointer', background: tab.id === activeTabId ? '#e6f4ff' : undefined, padding: '8px 12px' }}
                    onClick={() => setActiveTabId(tab.id)}
                  >
                    <Space direction="vertical" size={2}>
                      <Text strong>{tab.names.zh || tab.names.en || tab.code}</Text>
                      <Text type="secondary">{tab.platform}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col flex="360px">
            <Card
              title="模块"
              bordered={false}
              extra={
                <ModalForm<HomepageBlockCreateValues>
                  title="新增模块"
                  width={520}
                  trigger={
                    <Button type="primary" icon={<PlusOutlined />}>
                      新增模块
                    </Button>
                  }
                  modalProps={{ destroyOnHidden: true }}
                  onFinish={async (values) => {
                    await createHomepageBlock(values);
                    if (activeTabId) await loadBlocks(activeTabId);
                    message.success('新增成功');
                    return true;
                  }}
                >
                  <ProFormText name="title" label="模块标题" rules={[{ required: true, message: '请输入模块标题' }]} />
                  <ProFormSelect
                    name="blockType"
                    label="模块类型"
                    initialValue="banner"
                    options={Object.entries(blockTypeLabels).map(([value, label]) => ({ value, label }))}
                  />
                  <ProFormDigit name="sortOrder" label="排序" min={0} initialValue={blocks.length} />
                  <ProFormSelect
                    name="status"
                    label="状态"
                    initialValue={1}
                    options={[
                      { label: '启用', value: 1 },
                      { label: '禁用', value: 0 },
                    ]}
                  />
                </ModalForm>
              }
            >
              <List
                dataSource={blocks}
                renderItem={(block) => (
                  <List.Item
                    style={{ cursor: 'pointer', background: block.id === activeBlockId ? '#f0f5ff' : undefined, padding: '10px 12px' }}
                    onClick={() => setActiveBlockId(block.id)}
                  >
                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                      <Space>
                        <Text strong>{block.title.zh || block.title.en}</Text>
                        <Tag color={block.status === 1 ? 'success' : 'default'}>{block.status === 1 ? '启用' : '禁用'}</Tag>
                      </Space>
                      <Text type="secondary">{blockTypeLabels[block.blockType] || block.blockType}</Text>
                      <Text type="secondary">排序：{block.sortOrder}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col flex="auto" style={{ minWidth: 0 }}>
            <Card
              title={activeBlock ? `${activeBlock.title.zh || activeBlock.title.en} 内容项` : '内容项'}
              bordered={false}
            >
              {items.length ? (
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
                  dataSource={items}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        size="small"
                        cover={<Image src={item.contentCoverPreviewUrl} height={150} style={{ objectFit: 'cover' }} />}
                      >
                        <Space direction="vertical" size={6} style={{ width: '100%' }}>
                          <Text ellipsis={{ tooltip: item.contentTitle }} strong>
                            {item.contentTitle}
                          </Text>
                          <Text type="secondary">refId：{item.refId}</Text>
                          <Text type="secondary">排序：{item.sortOrder}</Text>
                        </Space>
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无内容项" />
              )}
            </Card>
          </Col>
        </Row>
      </Space>
    </PageContainer>
  );
};

export default NovelHomepagePage;
