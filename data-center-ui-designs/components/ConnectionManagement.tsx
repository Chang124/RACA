'use client';

import { useState } from 'react';
import { Search, Edit2, Trash2, Plus, X } from 'lucide-react';

interface PatchCordConnection {
  id: string;
  label: string;
  startPoint: string;
  endPoint: string;
  cableName: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

interface CableConnection {
  id: string;
  startPoint: string;
  endPoint: string;
  cableName: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

interface DataCenter {
  id: string;
  name: string;
}

interface Room {
  id: string;
  dcId: string;
  name: string;
}

interface Rack {
  id: string;
  roomId: string;
  name: string;
}

interface Device {
  id: string;
  rackId: string;
  name: string;
  portCount: number;
}

interface Port {
  portNumber: number;
  isActive: boolean;
}

const mockPatchCordConnections: PatchCordConnection[] = [
  {
    id: '1',
    label: 'PC-A-01',
    startPoint: 'ODF-1-A-01',
    endPoint: 'Switch-1-01',
    cableName: 'Cáp LC-LC 3m',
    lastUpdatedBy: 'Nguyễn Văn A',
    lastUpdatedDate: '2024-01-15',
  },
  {
    id: '2',
    label: 'PC-A-02',
    startPoint: 'ODF-1-A-02',
    endPoint: 'Switch-1-02',
    cableName: 'Cáp LC-SC 5m',
    lastUpdatedBy: 'Trần Thị B',
    lastUpdatedDate: '2024-01-14',
  },
  {
    id: '3',
    label: 'PC-B-01',
    startPoint: 'ODF-2-A-01',
    endPoint: 'Switch-2-01',
    cableName: 'Cáp LC-LC 1m',
    lastUpdatedBy: 'Lê Văn C',
    lastUpdatedDate: '2024-01-13',
  },
  {
    id: '4',
    label: 'PC-B-02',
    startPoint: 'ODF-2-A-02',
    endPoint: 'Switch-2-02',
    cableName: 'Cáp SC-SC 5m',
    lastUpdatedBy: 'Phạm Thị D',
    lastUpdatedDate: '2024-01-15',
  },
];

const mockCableConnections: CableConnection[] = [
  {
    id: '1',
    startPoint: 'ODF-1',
    endPoint: 'ODF-2',
    cableName: 'Cáp Quang SM 12F',
    lastUpdatedBy: 'Nguyễn Văn A',
    lastUpdatedDate: '2024-01-15',
  },
  {
    id: '2',
    startPoint: 'ODF-2',
    endPoint: 'ODF-3',
    cableName: 'Cáp Quang MM 24F',
    lastUpdatedBy: 'Trần Thị B',
    lastUpdatedDate: '2024-01-14',
  },
  {
    id: '3',
    startPoint: 'ODF-3',
    endPoint: 'ODF-4',
    cableName: 'Cáp Quang SM 48F',
    lastUpdatedBy: 'Lê Văn C',
    lastUpdatedDate: '2024-01-13',
  },
];

const mockDataCenters: DataCenter[] = [
  { id: '1', name: 'DC-HCM-01' },
  { id: '2', name: 'DC-HN-01' },
  { id: '3', name: 'DC-DN-01' },
];

const mockRooms: Room[] = [
  { id: '1', dcId: '1', name: 'Phòng A' },
  { id: '2', dcId: '1', name: 'Phòng B' },
  { id: '3', dcId: '2', name: 'Phòng C' },
  { id: '4', dcId: '2', name: 'Phòng D' },
];

const mockRacks: Rack[] = [
  { id: '1', roomId: '1', name: 'Rack-01' },
  { id: '2', roomId: '1', name: 'Rack-02' },
  { id: '3', roomId: '2', name: 'Rack-03' },
  { id: '4', roomId: '3', name: 'Rack-04' },
];

const mockDevices: Device[] = [
  { id: '1', rackId: '1', name: 'Switch-01', portCount: 24 },
  { id: '2', rackId: '1', name: 'Switch-02', portCount: 48 },
  { id: '3', rackId: '2', name: 'ODF-01', portCount: 12 },
  { id: '4', rackId: '3', name: 'Switch-03', portCount: 32 },
];

export default function ConnectionManagement() {
  const [activeTab, setActiveTab] = useState<'patch-cord' | 'cable'>('patch-cord');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStartDC, setSelectedStartDC] = useState('');
  const [selectedStartRoom, setSelectedStartRoom] = useState('');
  const [selectedStartRack, setSelectedStartRack] = useState('');
  const [selectedStartDevice, setSelectedStartDevice] = useState('');
  const [selectedStartPort, setSelectedStartPort] = useState('1');
  const [selectedEndDC, setSelectedEndDC] = useState('');
  const [selectedEndRoom, setSelectedEndRoom] = useState('');
  const [selectedEndRack, setSelectedEndRack] = useState('');
  const [selectedEndDevice, setSelectedEndDevice] = useState('');
  const [selectedEndPort, setSelectedEndPort] = useState('1');

  const filteredPatchCordConnections = mockPatchCordConnections.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.cableName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCableConnections = mockCableConnections.filter((item) =>
    item.cableName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get filtered data based on selections
  const startRooms = mockRooms.filter((r) => r.dcId === selectedStartDC);
  const startRacks = mockRacks.filter((r) => r.roomId === selectedStartRoom);
  const startDevices = mockDevices.filter((d) => d.rackId === selectedStartRack);
  const startSelectedDevice = startDevices.find((d) => d.id === selectedStartDevice);

  const endRooms = mockRooms.filter((r) => r.dcId === selectedEndDC);
  const endRacks = mockRacks.filter((r) => r.roomId === selectedEndRoom);
  const endDevices = mockDevices.filter((d) => d.rackId === selectedEndRack);
  const endSelectedDevice = endDevices.find((d) => d.id === selectedEndDevice);

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedStartDC('');
    setSelectedStartRoom('');
    setSelectedStartRack('');
    setSelectedStartDevice('');
    setSelectedStartPort('1');
    setSelectedEndDC('');
    setSelectedEndRoom('');
    setSelectedEndRack('');
    setSelectedEndDevice('');
    setSelectedEndPort('1');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs Header */}
      <div className="flex items-center border-b border-border px-6">
        <button
          onClick={() => setActiveTab('patch-cord')}
          className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'patch-cord'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Điều Phối Dây Nhảy
        </button>
        <button
          onClick={() => setActiveTab('cable')}
          className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'cable'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Điều Phối Dây Cáp
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={
                activeTab === 'patch-cord'
                  ? 'Tìm kiếm theo nhãn hoặc tên dây...'
                  : 'Tìm kiếm theo tên dây...'
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
        {activeTab === 'patch-cord' && (
          <button 
            onClick={handleCreateClick}
            className="px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" />
            Thêm Mới
          </button>
        )}
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'patch-cord' ? (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card/50 backdrop-blur border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Nhãn Dây</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Điểm Đầu</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Điểm Cuối</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Tên Dây</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Người Cập Nhật</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Ngày Cập Nhật</th>
                <th className="px-6 py-3 text-center font-semibold text-foreground">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatchCordConnections.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="px-6 py-4">
                    <code className="font-mono text-cyan-400">{item.label}</code>
                  </td>
                  <td className="px-6 py-4 text-foreground">{item.startPoint}</td>
                  <td className="px-6 py-4 text-foreground">{item.endPoint}</td>
                  <td className="px-6 py-4 text-foreground">{item.cableName}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedBy}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-cyan-400 hover:text-cyan-300">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card/50 backdrop-blur border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Điểm Đầu</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Điểm Cuối</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Tên Dây</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Người Cập Nhật</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Ngày Cập Nhật</th>
                <th className="px-6 py-3 text-center font-semibold text-foreground">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredCableConnections.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="px-6 py-4 text-foreground">{item.startPoint}</td>
                  <td className="px-6 py-4 text-foreground">{item.endPoint}</td>
                  <td className="px-6 py-4 text-foreground">{item.cableName}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedBy}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-cyan-400 hover:text-cyan-300">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-red-400 hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card">
              <h3 className="text-lg font-semibold text-foreground">Tạo Kết Nối Dây Nhảy</h3>
              <button 
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {/* Điểm Đầu */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground mb-4">Điểm Đầu</h4>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">DC *</label>
                    <select 
                      value={selectedStartDC}
                      onChange={(e) => {
                        setSelectedStartDC(e.target.value);
                        setSelectedStartRoom('');
                        setSelectedStartRack('');
                        setSelectedStartDevice('');
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Chọn DC...</option>
                      {mockDataCenters.map((dc) => (
                        <option key={dc.id} value={dc.id}>{dc.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Phòng *</label>
                    <select 
                      value={selectedStartRoom}
                      onChange={(e) => {
                        setSelectedStartRoom(e.target.value);
                        setSelectedStartRack('');
                        setSelectedStartDevice('');
                      }}
                      disabled={!selectedStartDC}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Chọn Phòng...</option>
                      {startRooms.map((room) => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Rack *</label>
                    <select 
                      value={selectedStartRack}
                      onChange={(e) => {
                        setSelectedStartRack(e.target.value);
                        setSelectedStartDevice('');
                      }}
                      disabled={!selectedStartRoom}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Chọn Rack...</option>
                      {startRacks.map((rack) => (
                        <option key={rack.id} value={rack.id}>{rack.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Thiết Bị *</label>
                    <select 
                      value={selectedStartDevice}
                      onChange={(e) => setSelectedStartDevice(e.target.value)}
                      disabled={!selectedStartRack}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Chọn Thiết Bị...</option>
                      {startDevices.map((device) => (
                        <option key={device.id} value={device.id}>{device.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Port Selection and Visualization */}
                {startSelectedDevice && (
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">
                      Slot-Card-Port (1-{startSelectedDevice.portCount}) *
                    </label>
                    <div className="mb-4">
                      <input 
                        type="number"
                        min="1"
                        max={startSelectedDevice.portCount}
                        value={selectedStartPort}
                        onChange={(e) => {
                          const value = Math.min(Math.max(1, parseInt(e.target.value) || 1), startSelectedDevice.portCount);
                          setSelectedStartPort(String(value));
                        }}
                        className="w-24 px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    {/* Port Visualization */}
                    <div className="bg-secondary/20 border border-border rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-2">
                        {Array.from({ length: startSelectedDevice.portCount }).map((_, idx) => {
                          const portNum = idx + 1;
                          const isSelected = parseInt(selectedStartPort) === portNum;
                          const isActive = Math.random() > 0.3; // Mock active status
                          
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedStartPort(String(portNum))}
                              className={`w-full aspect-square rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center ${
                                isSelected
                                  ? 'border-accent bg-accent/20 text-accent'
                                  : isActive
                                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500'
                                  : 'border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500'
                              }`}
                              title={isActive ? 'Đang hoạt động' : 'Chưa hoạt động'}
                            >
                              {portNum}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-4 mt-3 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded border-2 border-emerald-500/30 bg-emerald-500/10"></div>
                          <span className="text-emerald-400">Đang hoạt động</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded border-2 border-red-500/30 bg-red-500/10"></div>
                          <span className="text-red-400">Chưa hoạt động</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Điểm Cuối */}
              <div className="border-t border-border pt-8 mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-4">Điểm Cuối</h4>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">DC *</label>
                    <select 
                      value={selectedEndDC}
                      onChange={(e) => {
                        setSelectedEndDC(e.target.value);
                        setSelectedEndRoom('');
                        setSelectedEndRack('');
                        setSelectedEndDevice('');
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Chọn DC...</option>
                      {mockDataCenters.map((dc) => (
                        <option key={dc.id} value={dc.id}>{dc.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Phòng *</label>
                    <select 
                      value={selectedEndRoom}
                      onChange={(e) => {
                        setSelectedEndRoom(e.target.value);
                        setSelectedEndRack('');
                        setSelectedEndDevice('');
                      }}
                      disabled={!selectedEndDC}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Chọn Phòng...</option>
                      {endRooms.map((room) => (
                        <option key={room.id} value={room.id}>{room.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Rack *</label>
                    <select 
                      value={selectedEndRack}
                      onChange={(e) => {
                        setSelectedEndRack(e.target.value);
                        setSelectedEndDevice('');
                      }}
                      disabled={!selectedEndRoom}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Chọn Rack...</option>
                      {endRacks.map((rack) => (
                        <option key={rack.id} value={rack.id}>{rack.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Thiết Bị *</label>
                    <select 
                      value={selectedEndDevice}
                      onChange={(e) => setSelectedEndDevice(e.target.value)}
                      disabled={!selectedEndRack}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">Chọn Thiết Bị...</option>
                      {endDevices.map((device) => (
                        <option key={device.id} value={device.id}>{device.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Port Selection and Visualization */}
                {endSelectedDevice && (
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-3">
                      Slot-Card-Port (1-{endSelectedDevice.portCount}) *
                    </label>
                    <div className="mb-4">
                      <input 
                        type="number"
                        min="1"
                        max={endSelectedDevice.portCount}
                        value={selectedEndPort}
                        onChange={(e) => {
                          const value = Math.min(Math.max(1, parseInt(e.target.value) || 1), endSelectedDevice.portCount);
                          setSelectedEndPort(String(value));
                        }}
                        className="w-24 px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    {/* Port Visualization */}
                    <div className="bg-secondary/20 border border-border rounded-lg p-4">
                      <div className="grid grid-cols-12 gap-2">
                        {Array.from({ length: endSelectedDevice.portCount }).map((_, idx) => {
                          const portNum = idx + 1;
                          const isSelected = parseInt(selectedEndPort) === portNum;
                          const isActive = Math.random() > 0.3; // Mock active status
                          
                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedEndPort(String(portNum))}
                              className={`w-full aspect-square rounded-lg border-2 text-xs font-medium transition-all flex items-center justify-center ${
                                isSelected
                                  ? 'border-accent bg-accent/20 text-accent'
                                  : isActive
                                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:border-emerald-500'
                                  : 'border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500'
                              }`}
                              title={isActive ? 'Đang hoạt động' : 'Chưa hoạt động'}
                            >
                              {portNum}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-4 mt-3 text-xs">
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded border-2 border-emerald-500/30 bg-emerald-500/10"></div>
                          <span className="text-emerald-400">Đang hoạt động</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 rounded border-2 border-red-500/30 bg-red-500/10"></div>
                          <span className="text-red-400">Chưa hoạt động</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="border-t border-border pt-6 flex items-center justify-end gap-3">
                <button 
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-medium">
                  Hủy
                </button>
                <button 
                  disabled={!selectedStartDC || !selectedStartRoom || !selectedStartRack || !selectedStartDevice || !selectedEndDC || !selectedEndRoom || !selectedEndRack || !selectedEndDevice}
                  className="px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
                  Tạo Kết Nối
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
