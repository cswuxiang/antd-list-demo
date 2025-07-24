import React, { useState } from 'react';
import {
  List,
  Avatar,
  Space,
  Typography,
  Button,
  Tag,
  Card,
  Input,
  Select,
  Dropdown,
  Menu,
  Badge
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  PlusOutlined,
  MoreOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
  CloseCircleFilled
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

// Data interface
interface ListItem {
  id: string;
  title: string;
  status: 'active' | 'inactive';
  owner: string;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  description: string;
}

// Mock data
const mockData: ListItem[] = [
  {
    id: 'PROJ-001',
    title: 'Website Redesign',
    status: 'active',
    owner: 'John Smith',
    createdAt: '2024-05-15',
    priority: 'high',
    tags: ['Design', 'Frontend'],
    description: 'Complete overhaul of the company website with new branding'
  },
  {
    id: 'PROJ-002',
    title: 'Mobile App Development',
    status: 'active',
    owner: 'Sarah Johnson',
    createdAt: '2024-05-10',
    priority: 'medium',
    tags: ['Mobile', 'React Native'],
    description: 'Develop a cross-platform mobile application'
  },
  {
    id: 'PROJ-003',
    title: 'Database Migration',
    status: 'inactive',
    owner: 'Mike Chen',
    createdAt: '2024-05-05',
    priority: 'high',
    tags: ['Backend', 'Database'],
    description: 'Migrate from MySQL to PostgreSQL'
  },
  {
    id: 'PROJ-004',
    title: 'API Integration',
    status: 'active',
    owner: 'Lisa Wong',
    createdAt: '2024-04-28',
    priority: 'low',
    tags: ['Backend', 'API'],
    description: 'Integrate third-party payment processing API'
  },
  {
    id: 'PROJ-005',
    title: 'User Authentication System',
    status: 'inactive',
    owner: 'David Miller',
    createdAt: '2024-04-20',
    priority: 'medium',
    tags: ['Security', 'Backend'],
    description: 'Implement OAuth 2.0 and two-factor authentication'
  }
];

const GPTList: React.FC = () => {
  const [data] = useState<ListItem[]>(mockData);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter data based on search text and filters
  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && item.status === 'active') ||
      (statusFilter === 'inactive' && item.status === 'inactive');
    
    const matchesPriority = 
      priorityFilter === 'all' || 
      item.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Get color for priority tag
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'blue';
    }
  };

  // Item actions menu
  const actionMenu = (record: ListItem): MenuProps => ({
    items: [
      {
        key: '1',
        label: 'View Details',
      },
      {
        key: '2',
        label: 'Edit',
      },
      {
        key: '3',
        label: 'Delete',
        danger: true,
      },
    ],
    onClick: (e) => {
      console.log(`Clicked on menu item ${e.key} for ${record.id}`);
    },
  });

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#1f1f1f' }}>
          Projects
        </Title>
        <Text type="secondary" style={{ fontSize: '14px' }}>
          Manage and track all your projects in one place
        </Text>
      </div>

      {/* Filters and Actions */}
      <Card style={{ marginBottom: '16px' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="Search projects"
              allowClear
              style={{ width: 250 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
              placeholder="Status"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
            <Select
              value={priorityFilter}
              onChange={setPriorityFilter}
              style={{ width: 120 }}
              placeholder="Priority"
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Priority</Option>
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </Space>
          <Button type="primary" icon={<PlusOutlined />}>
            New Project
          </Button>
        </Space>
      </Card>

      {/* List */}
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <Dropdown menu={actionMenu(item)} trigger={['click']}>
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Badge 
                    dot 
                    color={item.status === 'active' ? '#52c41a' : '#f5222d'}
                    offset={[0, 0]}
                  >
                    <Avatar 
                      style={{ 
                        backgroundColor: item.status === 'active' ? '#1890ff' : '#d9d9d9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {item.title.charAt(0).toUpperCase()}
                    </Avatar>
                  </Badge>
                }
                title={
                  <Space>
                    <Text strong>{item.title}</Text>
                    <Tag color={getPriorityColor(item.priority)}>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                    </Tag>
                    {item.tags.map(tag => (
                      <Tag key={tag} color="blue">{tag}</Tag>
                    ))}
                  </Space>
                }
                description={
                  <Space direction="vertical" size={1}>
                    <Text type="secondary">{item.description}</Text>
                    <Space size="large">
                      <Space size="small">
                        <UserOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{item.owner}</Text>
                      </Space>
                      <Space size="small">
                        <ClockCircleOutlined style={{ color: '#8c8c8c', fontSize: '12px' }} />
                        <Text type="secondary" style={{ fontSize: '12px' }}>Created: {item.createdAt}</Text>
                      </Space>
                      <Space size="small">
                        {item.status === 'active' ? (
                          <CheckCircleFilled style={{ color: '#52c41a', fontSize: '12px' }} />
                        ) : (
                          <CloseCircleFilled style={{ color: '#f5222d', fontSize: '12px' }} />
                        )}
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {item.status === 'active' ? 'Active' : 'Inactive'}
                        </Text>
                      </Space>
                    </Space>
                  </Space>
                }
              />
            </List.Item>
          )}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} items`,
            position: 'bottom',
            align: 'center',
          }}
        />
      </Card>
    </div>
  );
};

export default GPTList;