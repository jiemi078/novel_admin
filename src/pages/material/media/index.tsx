import { DeleteOutlined, PictureOutlined, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, Empty, Image, Input, Pagination, Row, Select, Space, Tag, Tree, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
  queryMaterialFolders,
  queryMaterialMediaPage,
  queryMaterialTags,
} from '@/services/material/media';
import type { MaterialFolderItem, MaterialMediaItem, MaterialTagItem } from './types';

const { Text } = Typography;
const { DirectoryTree } = Tree;

const formatSize = (value: number) => {
  if (value >= 1024 * 1024) return `${(value / 1024 / 1024).toFixed(2)} MB`;
  if (value >= 1024) return `${(value / 1024).toFixed(2)} KB`;
  return `${value} B`;
};

const folderTreeData = (folders: MaterialFolderItem[]) => [
  { title: '全部素材', key: '-1' },
  {
    title: '根目录',
    key: '0',
    children: folders.map((folder) => ({
      title: folder.name,
      key: folder.id,
    })),
  },
];

const mediaTypeText: Record<number, string> = {
  1: '图片',
  2: '视频',
};

const MediaCard: React.FC<{ item: MaterialMediaItem }> = ({ item }) => {
  const isImage = item.type === 1;

  return (
    <Card
      hoverable
      styles={{ body: { padding: 12 } }}
      cover={
        <div
          style={{
            height: 160,
            background: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {isImage ? (
            <Image src={item.url} alt={item.name} height={160} style={{ objectFit: 'cover' }} />
          ) : (
            <div style={{ color: '#1677ff', textAlign: 'center' }}>
              <VideoCameraOutlined style={{ fontSize: 38 }} />
              <div style={{ marginTop: 8 }}>视频素材</div>
            </div>
          )}
        </div>
      }
    >
      <Space direction="vertical" size={8} style={{ width: '100%' }}>
        <Text ellipsis={{ tooltip: item.name }} strong>
          {item.name}
        </Text>
        <Space size={6} wrap>
          <Tag color={isImage ? 'blue' : 'purple'}>{mediaTypeText[item.type]}</Tag>
          <Tag color={item.status === 1 ? 'success' : 'default'}>{item.status === 1 ? '正常' : '停用'}</Tag>
        </Space>
        <Text type="secondary">素材ID：{item.id}</Text>
        <Text type="secondary">大小：{formatSize(item.size)}</Text>
        <Text type="secondary">创建时间：{item.createdAt}</Text>
        <Space size={12}>
          <a>预览</a>
          <a>移动</a>
          <a style={{ color: '#ff4d4f' }}>
            <DeleteOutlined /> 删除
          </a>
        </Space>
      </Space>
    </Card>
  );
};

const MaterialMediaPage: React.FC = () => {
  const [folders, setFolders] = useState<MaterialFolderItem[]>([]);
  const [tags, setTags] = useState<MaterialTagItem[]>([]);
  const [rows, setRows] = useState<MaterialMediaItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [folderId, setFolderId] = useState('-1');
  const [type, setType] = useState<number | undefined>();
  const [keyword, setKeyword] = useState('');
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const treeData = useMemo(() => folderTreeData(folders), [folders]);

  const loadRows = async (page = current, size = pageSize) => {
    setLoading(true);
    try {
      const result = await queryMaterialMediaPage({
        current: page,
        pageSize: size,
        folderId,
        type,
        keyword,
        tagIds,
      });
      setRows(result.data);
      setTotal(result.total);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queryMaterialFolders().then((result) => setFolders(result.list));
    queryMaterialTags().then((result) => setTags(result.list));
  }, []);

  useEffect(() => {
    loadRows(1, pageSize);
    setCurrent(1);
  }, [folderId, type, tagIds]);

  const handleSearch = () => {
    setCurrent(1);
    loadRows(1, pageSize);
  };

  const handleReset = () => {
    setType(undefined);
    setKeyword('');
    setTagIds([]);
    setFolderId('-1');
    setCurrent(1);
  };

  return (
    <PageContainer title={false}>
      <style>
        {`
          .material-media-page .material-folder-card .ant-card-body {
            max-height: calc(100vh - 190px);
            overflow: auto;
          }
          .material-media-page .material-folder-card .ant-tree-node-content-wrapper {
            min-width: 0;
          }
          .material-media-page .material-folder-card .ant-tree-title {
            display: inline-block;
            max-width: 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: bottom;
          }
        `}
      </style>
      <Row className="material-media-page" gutter={16} wrap={false}>
        <Col flex="340px">
          <Card className="material-folder-card" title="文件夹" bordered={false}>
            <DirectoryTree
              blockNode
              selectedKeys={[folderId]}
              defaultExpandedKeys={['0']}
              treeData={treeData}
              onSelect={(keys) => setFolderId(String(keys[0] ?? '-1'))}
            />
          </Card>
        </Col>
        <Col flex="auto" style={{ minWidth: 0 }}>
          <Card bordered={false}>
            <Space style={{ marginBottom: 16 }} wrap>
              <Select
                allowClear
                placeholder="素材类型"
                style={{ width: 140 }}
                value={type}
                options={[
                  { label: '图片', value: 1 },
                  { label: '视频', value: 2 },
                ]}
                onChange={setType}
              />
              <Input
                placeholder="搜索素材名称"
                style={{ width: 280 }}
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                onPressEnter={handleSearch}
              />
              <Select
                mode="multiple"
                placeholder={tags.length ? '选择标签' : '暂无标签'}
                style={{ width: 220 }}
                value={tagIds}
                disabled={!tags.length}
                options={tags.map((tag) => ({ label: tag.name, value: tag.id }))}
                onChange={setTagIds}
              />
              <Button type="primary" onClick={handleSearch}>
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
              <Button type="primary" icon={<UploadOutlined />}>
                上传素材
              </Button>
            </Space>

            <div style={{ marginBottom: 16 }}>
              <Space>
                <PictureOutlined />
                <Text type="secondary">共 {total} 个素材</Text>
                <Text type="secondary">标签接口当前为空，已按原后台状态展示。</Text>
              </Space>
            </div>

            {rows.length ? (
              <Row gutter={[16, 16]}>
                {rows.map((item) => (
                  <Col key={item.id} xs={24} sm={12} md={8} xl={6}>
                    <MediaCard item={item} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={loading ? '加载中...' : '暂无素材'} />
            )}

            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <Pagination
                current={current}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                onChange={(page, size) => {
                  setCurrent(page);
                  setPageSize(size);
                  loadRows(page, size);
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default MaterialMediaPage;
