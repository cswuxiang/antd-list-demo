import React, { useState } from 'react';
import {
  Table,
  Tag,
  Space,
  Typography,
  Button,
  Switch,
  Input,
  Select,
  Card,
  Popconfirm,
  message
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import './App.css';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

// 数据项接口
interface DataItem {
  key: string;
  id: string;
  projectName: string;
  dataSourceType: string;
  dataSourceName: string;
  status: boolean;
  creator: string;
  createTime: string;
  updateTime: string;
  description: string;
}

// 模拟数据
const mockData: DataItem[] = [
  {
    key: '1',
    id: 'DRC-000001',
    projectName: 'my-datasource',
    dataSourceType: 'MySQL-TestPoint',
    dataSourceName: 'test-mysql',
    status: true,
    creator: '张三',
    createTime: '2024-04-15 17:30:45',
    updateTime: '2024-04-15 17:30:45',
    description: '测试数据源连接'
  },
  {
    key: '2',
    id: 'DRC-000002',
    projectName: 'user-analytics',
    dataSourceType: 'PostgreSQL-TestPoint',
    dataSourceName: 'analytics-db',
    status: true,
    creator: '李四',
    createTime: '2024-04-14 16:25:30',
    updateTime: '2024-04-14 16:25:30',
    description: '用户行为分析数据'
  },
  {
    key: '3',
    id: 'DRC-000003',
    projectName: 'order-system',
    dataSourceType: 'Redis-TestPoint',
    dataSourceName: 'order-cache',
    status: false,
    creator: '王五',
    createTime: '2024-04-13 14:20:15',
    updateTime: '2024-04-13 14:20:15',
    description: '订单系统缓存'
  },
  {
    key: '4',
    id: 'DRC-000004',
    projectName: 'log-collection',
    dataSourceType: 'Elasticsearch-TestPoint',
    dataSourceName: 'app-logs',
    status: true,
    creator: '赵六',
    createTime: '2024-04-12 11:15:22',
    updateTime: '2024-04-12 11:15:22',
    description: '应用日志收集'
  },
  {
    key: '5',
    id: 'DRC-000005',
    projectName: 'file-storage',
    dataSourceType: 'MongoDB-TestPoint',
    dataSourceName: 'file-meta',
    status: true,
    creator: '孙七',
    createTime: '2024-04-11 09:45:18',
    updateTime: '2024-04-11 09:45:18',
    description: '文件元数据存储'
  },
  {
    key: '6',
    id: 'DRC-000006',
    projectName: 'message-queue',
    dataSourceType: 'RabbitMQ-TestPoint',
    dataSourceName: 'msg-broker',
    status: false,
    creator: '周八',
    createTime: '2024-04-10 15:30:45',
    updateTime: '2024-04-10 15:30:45',
    description: '消息队列服务'
  },
  {
    key: '7',
    id: 'DRC-000007',
    projectName: 'data-warehouse',
    dataSourceType: 'ClickHouse-TestPoint',
    dataSourceName: 'analytics-dw',
    status: true,
    creator: '吴九',
    createTime: '2024-04-09 13:22:33',
    updateTime: '2024-04-09 13:22:33',
    description: '数据仓库分析'
  },
  {
    key: '8',
    id: 'DRC-000008',
    projectName: 'search-engine',
    dataSourceType: 'Solr-TestPoint',
    dataSourceName: 'search-index',
    status: true,
    creator: '郑十',
    createTime: '2024-04-08 10:18:27',
    updateTime: '2024-04-08 10:18:27',
    description: '搜索引擎索引'
  }
];

function App() {
  const [data, setData] = useState<DataItem[]>(mockData);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 处理状态切换
  const handleStatusChange = (key: string, checked: boolean) => {
    setData(prevData =>
      prevData.map(item =>
        item.key === key ? { ...item, status: checked } : item
      )
    );
    message.success(`状态已${checked ? '启用' : '禁用'}`);
  };

  // 处理删除
  const handleDelete = (key: string) => {
    setData(prevData => prevData.filter(item => item.key !== key));
    message.success('删除成功');
  };

  // 处理编辑
  const handleEdit = (record: DataItem) => {
    message.info(`编辑项目: ${record.projectName}`);
  };

  // 过滤数据
  const filteredData = data.filter(item => {
    const matchesSearch =
      item.projectName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.dataSourceType.toLowerCase().includes(searchText.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && item.status) ||
      (statusFilter === 'inactive' && !item.status);

    return matchesSearch && matchesStatus;
  });

  // 表格列定义
  const columns: ColumnsType<DataItem> = [
    {
      title: '项目ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => (
        <Text copyable style={{ color: '#1890ff' }}>
          {text}
        </Text>
      ),
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      width: 150,
      render: (text: string) => (
        <Space>
          <BarChartOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '数据源类型',
      dataIndex: 'dataSourceType',
      key: 'dataSourceType',
      width: 180,
      render: (text: string) => {
        const getTypeColor = (type: string) => {
          if (type.includes('MySQL')) return 'blue';
          if (type.includes('PostgreSQL')) return 'green';
          if (type.includes('Redis')) return 'red';
          if (type.includes('MongoDB')) return 'orange';
          if (type.includes('Elasticsearch')) return 'purple';
          return 'default';
        };
        return <Tag color={getTypeColor(text)}>{text}</Tag>;
      },
    },
    {
      title: '数据源名称',
      dataIndex: 'dataSourceName',
      key: 'dataSourceName',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      align: 'center',
      render: (status: boolean, record: DataItem) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(record.key, checked)}
          size="small"
        />
      ),
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 160,
      render: (text: string) => (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {text}
        </Text>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 160,
      render: (text: string) => (
        <Text type="secondary" style={{ fontSize: '12px' }}>
          {text}
        </Text>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      align: 'center',
      render: (_, record: DataItem) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个项目吗？"
            onConfirm={() => handleDelete(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* 页面标题 */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#1f1f1f' }}>
          数据源管理
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          管理和监控所有数据源连接状态
        </Text>
      </div>

      {/* 操作区域 */}
      <Card style={{ marginBottom: '16px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="搜索项目名称、数据源类型或创建人"
              allowClear
              style={{ width: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
            >
              <Option value="all">全部状态</Option>
              <Option value="active">已启用</Option>
              <Option value="inactive">已禁用</Option>
            </Select>
          </Space>
          <Button type="primary" icon={<PlusOutlined />}>
            新建数据源
          </Button>
        </Space>
      </Card>

      {/* 数据表格 */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `显示 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            position: ['bottomCenter'],
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          size="middle"
          bordered={false}
          scroll={{ x: 1200 }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
          }
        />
      </Card>
    </div>
  );
}

export default App;
