import React, { useState } from 'react';
import { 
  Table, Card, Button, Input, Tag, Space, Tooltip, Badge, 
  Dropdown, Menu, Tabs, Alert, Pagination, Switch, Divider 
} from 'antd';
import { 
  SearchOutlined, SettingOutlined, ReloadOutlined, DownloadOutlined,
  CaretRightOutlined, PoweroffOutlined, SyncOutlined, DollarOutlined,
  LockOutlined, SwapOutlined, EllipsisOutlined, 
  LineChartOutlined, InfoCircleOutlined, CheckCircleFilled,
  MessageOutlined, DesktopOutlined, FileTextOutlined, QuestionCircleOutlined
} from '@ant-design/icons';
import './CloudServerList.css';

const { TabPane } = Tabs;

interface ServerInstance {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'creating';
  zone: string;
  instanceType: string;
  instanceTypeFamily: string;
  cpu: number;
  memory: number;
  bandwidth: number;
  diskType: string;
  ipv4: string;
  ipv6: string;
  billingMode: string;
  networkBillingMode: string;
  createTime: string;
}

const mockData: ServerInstance[] = [
  {
    id: 'ins-irczvoay',
    name: 'klaus_test_harp',
    status: 'running',
    zone: '南京一区',
    instanceType: 'S5',
    instanceTypeFamily: '标准型',
    cpu: 16,
    memory: 32,
    bandwidth: 5,
    diskType: '增强型SSD',
    ipv4: '109.244.159.30',
    ipv6: '10.0.0.98',
    billingMode: '按量计费',
    networkBillingMode: '按流量计费',
    createTime: '2025-07-24 17:15:54',
  },
  {
    id: 'ins-a4asfvii',
    name: 'klaus_test_harp',
    status: 'running',
    zone: '南京一区',
    instanceType: 'SA4',
    instanceTypeFamily: '标准型',
    cpu: 16,
    memory: 32,
    bandwidth: 5,
    diskType: '增强型SSD',
    ipv4: '113.199.18',
    ipv6: '10.0.0.95',
    billingMode: '按量计费',
    networkBillingMode: '-',
    createTime: '2025-07-24 17:13:13',
  },
  {
    id: 'ins-0962fzz4',
    name: 'as-tke-np-npy10mcy',
    status: 'running',
    zone: '南京三区',
    instanceType: 'SA5',
    instanceTypeFamily: '标准型',
    cpu: 2,
    memory: 2,
    bandwidth: 5,
    diskType: '通用型SSD',
    ipv4: '-',
    ipv6: '10.206.32.7',
    billingMode: '按量计费',
    networkBillingMode: '按流量计费',
    createTime: '2025-07-23 07:01:13',
  },
  {
    id: 'ins-5hw0l0l0',
    name: 'xhs_wait_watcher_56_nj2',
    status: 'running',
    zone: '南京二区',
    instanceType: 'S6',
    instanceTypeFamily: '标准型',
    cpu: 4,
    memory: 8,
    bandwidth: 5,
    diskType: '通用型SSD',
    ipv4: '119.45.233.120',
    ipv6: '10.206.16.244',
    billingMode: '按量计费',
    networkBillingMode: '按流量计费',
    createTime: '2025-07-17 11:19:54',
  },
];

const CloudServerList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: 'ID/名称',
      dataIndex: 'id',
      key: 'id',
      render: (id: string, record: ServerInstance) => (
        <div>
          <div>{id}</div>
          <div className="instance-name">{record.name}</div>
        </div>
      ),
    },
    {
      title: '监控',
      key: 'monitor',
      width: 60,
      render: () => <LineChartOutlined style={{ fontSize: '16px' }} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div>
          <Badge status="success" text="运行中" />
        </div>
      ),
    },
    {
      title: '可用区',
      dataIndex: 'zone',
      key: 'zone',
      render: (zone: string) => <span>{zone}</span>,
    },
    {
      title: '实例规格',
      key: 'instanceSpec',
      render: (text: string, record: ServerInstance) => (
        <div>
          <span>{record.instanceTypeFamily}{record.instanceType}</span>
          <Tag color="blue" className="instance-type-tag">T</Tag>
        </div>
      ),
    },
    {
      title: '实例配置',
      key: 'instanceConfig',
      render: (text: string, record: ServerInstance) => (
        <div>
          <div>{record.cpu}核 {record.memory}GB {record.bandwidth}Mbps</div>
          <div>系统盘：{record.diskType}</div>
          <div>云硬盘</div>
          <div>网络：{record.id.includes('0962') || record.id.includes('5hw') ? 'Default-VPC' : 'jacklyskuotest'}</div>
        </div>
      ),
    },
    {
      title: (
        <span>
          主IPv4地址 <InfoCircleOutlined />
        </span>
      ),
      dataIndex: 'ipv4',
      key: 'ipv4',
      render: (ipv4: string) => (
        <div>
          {ipv4 !== '-' ? (
            <>
              <span>{ipv4}</span>
              <span className="ip-tag">(公)</span>
              <Button type="link" size="small" icon={<CopyOutlined />} />
            </>
          ) : (
            '-'
          )}
        </div>
      ),
    },
    {
      title: '主IPv6地址',
      dataIndex: 'ipv6',
      key: 'ipv6',
      render: (ipv6: string) => (
        <div>
          {ipv6 !== '-' ? (
            <>
              <span>{ipv6}</span>
              <span className="ip-tag">(内)</span>
            </>
          ) : (
            '-'
          )}
        </div>
      ),
    },
    {
      title: '实例计费模式',
      dataIndex: 'billingMode',
      key: 'billingMode',
      render: (billingMode: string, record: ServerInstance) => (
        <div>
          <div>{billingMode}</div>
          <div>{record.createTime.split(' ')[0]}</div>
          <div>{record.createTime.split(' ')[1]}创建</div>
        </div>
      ),
    },
    {
      title: '网络计费模式',
      dataIndex: 'networkBillingMode',
      key: 'networkBillingMode',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<MoreOutlined />} />
          <Button type="link" icon={<ReloadOutlined />} />
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <div className="cloud-server-container">
      {/* 顶部横幅 */}
      <div className="top-banner">
        <Tag color="blue">热门商品</Tag>
        <span className="banner-text">链书教多多，维护成本高，教你用边缘安全加速平台EO自动下发即事</span>
        <a href="#" className="banner-link">查看详情 &gt;</a>
        <Button type="text" className="close-btn" icon={<CloseOutlined />} />
      </div>

      {/* 导航区域 */}
      <div className="nav-section">
        <div className="nav-left">
          <span className="nav-title">实例</span>
          <Tag color="blue" className="region-tag">
            南京 11
            <DownOutlined />
          </Tag>
        </div>
        <div className="nav-right">
          <Button type="primary" className="experience-btn">
            产品体验，完成了解
          </Button>
          <Button icon={<BookOutlined />}>场景教学</Button>
          <Button icon={<GiftOutlined />}>限时领福利</Button>
          <Dropdown overlay={<Menu items={[{ key: '1', label: '使用帮助' }]} />}>
            <Button>
              实例使用指南 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* 通知区域 */}
      <Alert
        message={
          <span>
            您在南京有1台实例已经入回收站，
            <a href="#">查看</a>
          </span>
        }
        type="warning"
        showIcon
        closable
        className="notification-alert"
      />

      <Alert
        message={
          <span>
            欢迎参加直播峰会 OrcaTerm 使用讲座，花2分钟填完问卷，将有机会获产研团队直接对话并获得产品代金券~，
            <a href="#">立即前往</a> <Tag>已有行动</Tag>
          </span>
        }
        type="info"
        showIcon
        closable
        className="notification-alert"
        action={
          <div className="alert-pagination">
            <Button type="text" icon={<LeftOutlined />} />
            <span>3 / 3</span>
            <Button type="text" icon={<RightOutlined />} />
          </div>
        }
      />

      {/* 操作区域 */}
      <div className="action-bar">
        <div className="action-buttons">
          <Button type="primary">新建</Button>
          <Button icon={<CaretRightOutlined />}>开机</Button>
          <Button icon={<PoweroffOutlined />}>关机</Button>
          <Button icon={<SyncOutlined />}>重启</Button>
          <Button icon={<DollarOutlined />}>续费</Button>
          <Button icon={<LockOutlined />}>重置密码</Button>
          <Button icon={<SwapOutlined />}>调整/迁移</Button>
          <Dropdown overlay={<Menu items={[{ key: '1', label: '更多操作' }]} />}>
            <Button>
              更多操作 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="view-controls">
          <Button icon={<AppstoreOutlined />}>切换至页面视图</Button>
          <Button type="text" icon={<ReloadOutlined />} />
          <Button type="text" icon={<SettingOutlined />} />
          <Button type="text" icon={<DownloadOutlined />} />
        </div>
      </div>

      {/* 搜索区域 */}
      <div className="search-section">
        <Input
          placeholder="多个关键字只支持精准查询，用逗号(,)分隔，多个过滤条件用回车键分隔"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onPressEnter={() => handleSearch(searchText)}
          className="search-input"
        />
        <a href="#" className="recycle-link">查看待回收实例</a>
      </div>

      {/* 表格区域 */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        pagination={false}
        className="instance-table"
      />

      {/* 右侧边栏 */}
      <div className="sidebar">
        <div className="sidebar-item">
          <MessageOutlined />
          <div>咨询</div>
        </div>
        <div className="sidebar-item">
          <DesktopOutlined />
          <div>控制台</div>
        </div>
        <div className="sidebar-item">
          <FileTextOutlined />
          <div>文档</div>
        </div>
        <div className="sidebar-item">
          <QuestionCircleOutlined />
          <div>反馈</div>
        </div>
      </div>
    </div>
  );
};

// 自定义图标组件
const CopyOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32z" />
    <path d="M704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z" />
  </svg>
);

const CloseOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

const DownOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
  </svg>
);

const LeftOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
  </svg>
);

const RightOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
  </svg>
);

const BookOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-260 72h96v209.9L621.5 312 572 347.4V136zm220 752H232V136h280v296.9c0 3.3 1 6.6 3 9.3a15.9 15.9 0 0022.3 3.7l83.8-59.9 81.4 59.4c2.7 2 6 3.1 9.4 3.1 8.8 0 16-7.2 16-16V136h64v752z" />
  </svg>
);

const GiftOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M880 310H732.4c13.6-21.4 21.6-46.8 21.6-74 0-76.1-61.9-138-138-138-41.4 0-78.7 18.4-104 47.4-25.3-29-62.6-47.4-104-47.4-76.1 0-138 61.9-138 138 0 27.2 7.9 52.6 21.6 74H144c-17.7 0-32 14.3-32 32v200c0 4.4 3.6 8 8 8h40v344c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V550h40c4.4 0 8-3.6 8-8V342c0-17.7-14.3-32-32-32zm-334-74c0-38.6 31.4-70 70-70s70 31.4 70 70-31.4 70-70 70h-70v-70zm-138-70c38.6 0 70 31.4 70 70v70h-70c-38.6 0-70-31.4-70-70s31.4-70 70-70zM180 482V378h298v104H180zm48 68h250v308H228V550zm568 308H546V550h250v308zm48-376H546V378h298v104z" />
  </svg>
);

const AppstoreOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M464 144H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H212V212h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V160c0-8.8-7.2-16-16-16zm-52 268H612V212h200v200zM464 544H160c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H212V612h200v200zm452-268H560c-8.8 0-16 7.2-16 16v304c0 8.8 7.2 16 16 16h304c8.8 0 16-7.2 16-16V560c0-8.8-7.2-16-16-16zm-52 268H612V612h200v200z" />
  </svg>
);

const MoreOutlined = () => (
  <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
    <path d="M456 231a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0zm0 280a56 56 0 10112 0 56 56 0 10-112 0z" />
  </svg>
);

export default CloudServerList;