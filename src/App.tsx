import React from 'react';
import { Table, Tag, Badge, Space, Typography, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './App.css';

const { Title, Text } = Typography;

// 榜单数据
interface RankingData {
  key: string;
  rank: number;
  name: string;
  totalScore: number;
  codeSecurityScore: number;
  codeQualityScore: number;
}

const rankingData: RankingData[] = [
  {
    key: '1',
    rank: 1,
    name: 'Dawn-Coder-Plus-20241108',
    totalScore: 68.19,
    codeSecurityScore: 94.99,
    codeQualityScore: 82.92,
  },
  {
    key: '2',
    rank: 2,
    name: 'Grok-3',
    totalScore: 66.78,
    codeSecurityScore: 95.69,
    codeQualityScore: 87.13,
  },
  {
    key: '3',
    rank: 3,
    name: 'Claude-Sonnet-4-20250514',
    totalScore: 65.48,
    codeSecurityScore: 47.6,
    codeQualityScore: 96.98,
  },
  {
    key: '4',
    rank: 4,
    name: 'GPT-4o-20241120',
    totalScore: 65.35,
    codeSecurityScore: 67.87,
    codeQualityScore: 76.77,
  },
  {
    key: '5',
    rank: 5,
    name: 'Claude-3.7-Sonnet-20250219',
    totalScore: 63.21,
    codeSecurityScore: 45.71,
    codeQualityScore: 97.63,
  },
  {
    key: '6',
    rank: 6,
    name: 'Claude-Opus-4-20250514',
    totalScore: 60.12,
    codeSecurityScore: 35.85,
    codeQualityScore: 100,
  },
  {
    key: '7',
    rank: 7,
    name: 'Claude-3.7-Sonnet-Thinking-20250219',
    totalScore: 58.76,
    codeSecurityScore: 40.53,
    codeQualityScore: 99.76,
  },
  {
    key: '8',
    rank: 8,
    name: 'o4-mini-20250416',
    totalScore: 51.61,
    codeSecurityScore: 37.65,
    codeQualityScore: 71.31,
  },
  {
    key: '9',
    rank: 9,
    name: 'DeepSeek-V3-20250324',
    totalScore: 49.26,
    codeSecurityScore: 20.91,
    codeQualityScore: 93.65,
  },
  {
    key: '10',
    rank: 10,
    name: 'Gemini-2.5-Pro-Exp-20250325',
    totalScore: 48.26,
    codeSecurityScore: 32.22,
    codeQualityScore: 73.2,
  },
  {
    key: '11',
    rank: 11,
    name: 'DeepSeek-R1-20250528',
    totalScore: 46.25,
    codeSecurityScore: 18.52,
    codeQualityScore: 88.23,
  },
];

// 导航标签数据
const tabItems = [
  { key: '1', label: '所有榜单' },
  { key: '2', label: '编程' },
  { key: '3', label: '护理健康科研' },
  { key: '4', label: 'SQL 工具' },
  { key: '5', label: '商务写作' },
  { key: '6', label: '代码生成' },
  { key: '7', label: '输入输出' },
  { key: '8', label: '政府化' },
  { key: '9', label: '开放域对话' },
  { key: '10', label: '百科知识问答能力' },
  { key: '11', label: 'InBench' },
  { key: '12', label: '不安全内容检测' },
  { key: '13', label: 'XAE' },
];

function App() {
  // 渲染排名徽章
  const renderRankBadge = (rank: number) => {
    if (rank === 1) {
      return <Badge count={rank} style={{ backgroundColor: '#faad14' }} />;
    } else if (rank === 2) {
      return <Badge count={rank} style={{ backgroundColor: '#52c41a' }} />;
    } else if (rank === 3) {
      return <Badge count={rank} style={{ backgroundColor: '#ff7875' }} />;
    } else {
      return <Badge count={rank} style={{ backgroundColor: '#d9d9d9', color: '#000' }} />;
    }
  };

  // 渲染分数链接
  const renderScoreLink = (score: number) => (
    <a href="#" style={{ color: '#1890ff' }}>
      {score}
    </a>
  );

  // 表格列定义
  const columns: ColumnsType<RankingData> = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      align: 'center',
      render: (rank: number) => renderRankBadge(rank),
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 300,
    },
    {
      title: '总得分',
      dataIndex: 'totalScore',
      key: 'totalScore',
      width: 120,
      align: 'center',
      render: (score: number) => renderScoreLink(score),
    },
    {
      title: '代码安全',
      dataIndex: 'codeSecurityScore',
      key: 'codeSecurityScore',
      width: 120,
      align: 'center',
      render: (score: number) => score,
    },
    {
      title: '代码质量',
      dataIndex: 'codeQualityScore',
      key: 'codeQualityScore',
      width: 120,
      align: 'center',
      render: (score: number) => score,
    },
  ];

  return (
    <div style={{ 
      padding: '24px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* 标题区域 */}
      <div style={{ marginBottom: '24px' }}>
        <Space align="baseline" style={{ marginBottom: '8px' }}>
          <Title level={2} style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
            大模型代码安全性榜单
          </Title>
          <Tag color="blue" style={{ fontSize: '12px' }}>最新榜单</Tag>
        </Space>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          当前第个榜单共 AI 大模型代码生成安全性评测榜单，使用通用的防御策略与主流的对抗方法
        </Text>
      </div>

      {/* 导航标签 */}
      <div style={{ marginBottom: '24px' }}>
        <Tabs 
          defaultActiveKey="1" 
          items={tabItems}
          size="small"
          style={{ 
            backgroundColor: 'white',
            padding: '0 16px',
            borderRadius: '6px'
          }}
        />
      </div>

      {/* 榜单表格 */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '6px',
        padding: '16px'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <Space align="center">
            <span style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              color: '#1890ff'
            }}>
              🏆 综合排名
            </span>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={rankingData}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
            position: ['bottomCenter'],
          }}
          size="middle"
          bordered={false}
          style={{
            backgroundColor: 'white'
          }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
        />
      </div>
    </div>
  );
}

export default App;
