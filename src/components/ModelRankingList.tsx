import React, { useState } from 'react';
import { Table, Card, Tabs, Typography, Space, Tag } from 'antd';
import type { ModelRankingItem, TabKey } from '../types/rankingTypes';
import { TrophyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// 模拟数据
const mockRankingData: ModelRankingItem[] = [
  {
    id: '1',
    rank: 1,
    name: 'Owen-Coder-Plus-20241108',
    totalScore: 68.19,
    codeSecurity: 94.99,
    codeQuality: 100.00,
  },
  {
    id: '2',
    rank: 2,
    name: 'Grok-3',
    totalScore: 65.32,
    codeSecurity: 89.45,
    codeQuality: 97.50,
  },
  {
    id: '3',
    rank: 3,
    name: 'Claude-Sonnet-4-20250304',
    totalScore: 63.78,
    codeSecurity: 85.67,
    codeQuality: 95.20,
  },
  {
    id: '4',
    rank: 4,
    name: 'GPT-4o-20241120',
    totalScore: 61.45,
    codeSecurity: 82.34,
    codeQuality: 93.75,
  },
  {
    id: '5',
    rank: 5,
    name: 'Claude-3.7-Sonnet-20250219',
    totalScore: 59.87,
    codeSecurity: 78.92,
    codeQuality: 91.30,
  },
  {
    id: '6',
    rank: 6,
    name: 'Claude-Opus-4-20250514',
    totalScore: 57.23,
    codeSecurity: 75.45,
    codeQuality: 88.60,
  },
  {
    id: '7',
    rank: 7,
    name: 'Claude-3.7-Sonnet-Thinking-20250219',
    totalScore: 54.68,
    codeSecurity: 71.23,
    codeQuality: 85.40,
  },
  {
    id: '8',
    rank: 8,
    name: 'o4-mini-20250416',
    totalScore: 52.14,
    codeSecurity: 67.89,
    codeQuality: 82.70,
  },
  {
    id: '9',
    rank: 9,
    name: 'DeepSeek-v3-20250324',
    totalScore: 49.75,
    codeSecurity: 63.42,
    codeQuality: 79.50,
  },
  {
    id: '10',
    rank: 10,
    name: 'Gemini-2.5-Pro-Exp-20250325',
    totalScore: 47.92,
    codeSecurity: 58.76,
    codeQuality: 75.80,
  },
  {
    id: '11',
    rank: 11,
    name: 'DeepSeek-R1-20250528',
    totalScore: 46.25,
    codeSecurity: 18.52,
    codeQuality: 71.31,
  },
];

interface ModelRankingListProps {
  loading?: boolean;
}

const ModelRankingList: React.FC<ModelRankingListProps> = ({ loading = false }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  // 渲染排名标记
  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return <div className="rank-badge gold">{rank}</div>;
    } else if (rank === 2) {
      return <div className="rank-badge silver">{rank}</div>;
    } else if (rank === 3) {
      return <div className="rank-badge bronze">{rank}</div>;
    }
    return <div className="rank-badge">{rank}</div>;
  };

  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank: number) => renderRankBadge(rank),
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <Text strong>{name}</Text>,
    },
    {
      title: '总得分',
      dataIndex: 'totalScore',
      key: 'totalScore',
      sorter: (a: ModelRankingItem, b: ModelRankingItem) => a.totalScore - b.totalScore,
      render: (score: number) => <Text style={{ color: '#1677ff' }}>{score.toFixed(2)}</Text>,
    },
    {
      title: '代码安全性',
      dataIndex: 'codeSecurity',
      key: 'codeSecurity',
      sorter: (a: ModelRankingItem, b: ModelRankingItem) => a.codeSecurity - b.codeSecurity,
      render: (score: number) => score.toFixed(2),
    },
    {
      title: '代码质量',
      dataIndex: 'codeQuality',
      key: 'codeQuality',
      sorter: (a: ModelRankingItem, b: ModelRankingItem) => a.codeQuality - b.codeQuality,
      render: (score: number) => score.toFixed(2),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey);
  };

  return (
    <div className="model-ranking-container">
      <div className="header-section">
        <Space direction="vertical" size={4} style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0 }}>大模型代码安全性榜单</Title>
          <Text type="secondary">
            当前第11个项目，AI大模型代码安全性评测榜单，使用通用的防御数据集与主流的对抗方法
          </Text>
          <Space size={8}>
            <Tag color="blue">链接榜</Tag>
          </Space>
        </Space>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange} className="ranking-tabs">
        <TabPane tab="所有榜单" key="all" />
        <TabPane tab="榜单" key="ranking" />
        <TabPane tab="评测指标介绍 (XSS)" key="xss" />
        <TabPane tab="SQL注入" key="sqlInjection" />
        <TabPane tab="路径遍历" key="pathTraversal" />
        <TabPane tab="代码注入" key="codeInjection" />
        <TabPane tab="输入验证" key="inputValidation" />
        <TabPane tab="反序列化" key="deserialization" />
        <TabPane tab="开源软件安全性榜单 (HatGPT)" key="openSourceSecurity" />
        <TabPane tab="不安全的编程实践 (XSS)" key="unsafePractices" />
      </Tabs>

      <Card 
        title={
          <Space>
            <TrophyOutlined style={{ color: '#1677ff' }} />
            <span>综合排名</span>
          </Space>
        }
        className="ranking-card"
      >
        <Table 
          dataSource={mockRankingData} 
          columns={columns} 
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default ModelRankingList;