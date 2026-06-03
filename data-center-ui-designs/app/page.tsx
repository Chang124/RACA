'use client';

import { useState } from 'react';
import { Menu, Cable, Network, Workflow, Map, Home, Plug, GitBranch } from 'lucide-react';
import FiberInventory from '@/components/FiberInventory';
import PatchPanelMapping from '@/components/PatchPanelMapping';
import CableConfigWizard from '@/components/CableConfigWizard';
import NetworkTopology from '@/components/NetworkTopology';
import ConnectorTypeManagement from '@/components/ConnectorTypeManagement';
import ConnectionManagement from '@/components/ConnectionManagement';

type Screen = 'home' | 'inventory' | 'connector-type' | 'connection' | 'patch-panel' | 'cable-config' | 'topology';

export default function DCIMDashboard() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigationItems = [
    { id: 'home', label: 'Bảng Điều Khiển', icon: Home },
    { id: 'inventory', label: 'Các Loại Dây', icon: Cable },
    { id: 'connector-type', label: 'Kiểu Kết Nối', icon: Plug },
    { id: 'connection', label: 'Điều Phối Kết Nối', icon: GitBranch },
    { id: 'patch-panel', label: 'Ánh Xạ Cổng', icon: Network },
    { id: 'cable-config', label: 'Cấu Hình Cáp', icon: Workflow },
    { id: 'topology', label: 'Theo Dõi Tôpô', icon: Map },
  ] as const;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo Area */}
        <div className="h-16 border-b border-sidebar-border flex items-center px-4 gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Network className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <h1 className="text-sm font-bold text-sidebar-foreground truncate">DCIM</h1>
              <p className="text-xs text-muted-foreground">Trung Tâm Dữ Liệu</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreen(item.id as Screen)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Toggle */}
        <div className="border-t border-sidebar-border p-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-6 gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">
              {navigationItems.find((item) => item.id === activeScreen)?.label || 'DCIM Dashboard'}
            </h2>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {activeScreen === 'home' && <DashboardHome onNavigate={setActiveScreen} />}
          {activeScreen === 'inventory' && <FiberInventory />}
          {activeScreen === 'connector-type' && <ConnectorTypeManagement />}
          {activeScreen === 'connection' && <ConnectionManagement />}
          {activeScreen === 'patch-panel' && <PatchPanelMapping />}
          {activeScreen === 'cable-config' && <CableConfigWizard />}
          {activeScreen === 'topology' && <NetworkTopology />}
        </div>
      </div>
    </div>
  );
}

function DashboardHome({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const features = [
    {
      id: 'inventory',
      title: 'Các Loại Dây',
      description: 'Quản lý mẫu dây và mẫu cáp với thông tin chi tiết từng loại',
      icon: Cable,
      color: 'from-cyan-500/20 to-cyan-600/10',
    },
    {
      id: 'connector-type',
      title: 'Kiểu Kết Nối',
      description: 'Quản lý các loại đầu nối (connector type) được sử dụng trong mạng lưới',
      icon: Plug,
      color: 'from-purple-500/20 to-purple-600/10',
    },
    {
      id: 'connection',
      title: 'Điều Phối Kết Nối',
      description: 'Quản lý các kết nối dây nhảy và dây cáp giữa các thiết bị',
      icon: GitBranch,
      color: 'from-emerald-500/20 to-emerald-600/10',
    },
    {
      id: 'patch-panel',
      title: 'Ánh Xạ Cổng ODF',
      description: 'Biểu diễn trực quan và quản lý các cổng khung phân phối quang học',
      icon: Network,
      color: 'from-blue-500/20 to-blue-600/10',
    },
    {
      id: 'cable-config',
      title: 'Cấu Hình Cáp',
      description: 'Trình hướng dẫn cấu hình vá nâng cao với ánh xạ cáp thân cây hàng loạt',
      icon: Workflow,
      color: 'from-purple-500/20 to-purple-600/10',
    },
    {
      id: 'topology',
      title: 'Theo Dõi Tôpô Mạng',
      description: 'Theo dõi mạch đầu cuối và hình ảnh hóa liên kết sợi quang',
      icon: Map,
      color: 'from-emerald-500/20 to-emerald-600/10',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">Chào Mừng Đến DCIM Dashboard</h3>
        <p className="text-muted-foreground">
          Hệ thống quản lý cơ sở hạ tầng trung tâm dữ liệu chuyên nghiệp cho hoạt động mạng sợi quang
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.id as Screen)}
              className="group kpi-card text-left hover:border-accent transition-all"
            >
              <div className={`mb-4 w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-accent" />
              </div>
              <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-12 p-6 rounded-lg border border-border bg-card/50 backdrop-blur">
        <h4 className="font-semibold text-foreground mb-3">Tổng Quan Hệ Thống</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">2.847</div>
            <div className="text-xs text-muted-foreground">Tổng Cáp Vá</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">2.156</div>
            <div className="text-xs text-muted-foreground">Đang Sử Dụng</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">612</div>
            <div className="text-xs text-muted-foreground">Còn Tr��</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400 mb-1">79</div>
            <div className="text-xs text-muted-foreground">Bị Lỗi</div>
          </div>
        </div>
      </div>
    </div>
  );
}
