'use client';

import { useState } from 'react';
import { Search, Edit2, Trash2, Plus, X, Calendar } from 'lucide-react';

// Mock data for "mẫu dây" from FiberInventory
const mockPatchCordTypes = [
  { id: '1', cableName: 'Cáp LC-LC 3m' },
  { id: '2', cableName: 'Cáp LC-SC 5m' },
  { id: '3', cableName: 'Cáp LC-LC 1m' },
  { id: '4', cableName: 'Cáp SC-SC 5m' },
  { id: '5', cableName: 'Cáp LC-SC 1m' },
];

interface PatchCordConnection {
  id: string;
  label: string;
  startPoint: string;
  startSlot: string;
  startCard: string;
  startPort: string;
  endPoint: string;
  endSlot: string;
  endCard: string;
  endPort: string;
  cableName: string;
  performer: string;
  performDate: string;
  completionDate: string;
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
}

const mockPatchCordConnections: PatchCordConnection[] = [
  {
    id: '1',
    label: 'PC-A-01',
    startPoint: 'ODF-1-A',
    startSlot: '1',
    startCard: '2',
    startPort: '01',
    endPoint: 'Switch-1',
    endSlot: '0',
    endCard: '1',
    endPort: '01',
    cableName: 'Cáp LC-LC 3m',
    performer: 'Nguyễn Văn A',
    performDate: '2024-01-15',
    completionDate: '2024-01-16',
    lastUpdatedBy: 'Nguyễn Văn A',
    lastUpdatedDate: '2024-01-15',
  },
  {
    id: '2',
    label: 'PC-A-02',
    startPoint: 'ODF-1-A',
    startSlot: '1',
    startCard: '2',
    startPort: '02',
    endPoint: 'Switch-1',
    endSlot: '0',
    endCard: '1',
    endPort: '02',
    cableName: 'Cáp LC-SC 5m',
    performer: 'Trần Thị B',
    performDate: '2024-01-14',
    completionDate: '2024-01-15',
    lastUpdatedBy: 'Trần Thị B',
    lastUpdatedDate: '2024-01-14',
  },
  {
    id: '3',
    label: 'PC-B-01',
    startPoint: 'ODF-2-A',
    startSlot: '2',
    startCard: '1',
    startPort: '01',
    endPoint: 'Switch-2',
    endSlot: '0',
    endCard: '2',
    endPort: '01',
    cableName: 'Cáp LC-LC 1m',
    performer: 'Lê Văn C',
    performDate: '2024-01-13',
    completionDate: '2024-01-14',
    lastUpdatedBy: 'Lê Văn C',
    lastUpdatedDate: '2024-01-13',
  },
  {
    id: '4',
    label: 'PC-B-02',
    startPoint: 'ODF-2-A',
    startSlot: '2',
    startCard: '1',
    startPort: '02',
    endPoint: 'Switch-2',
    endSlot: '0',
    endCard: '2',
    endPort: '02',
    cableName: 'Cáp SC-SC 5m',
    performer: 'Phạm Thị D',
    performDate: '2024-01-15',
    completionDate: '2024-01-17',
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
  { id: '1', rackId: '1', name: 'Switch-01' },
  { id: '2', rackId: '1', name: 'Switch-02' },
  { id: '3', rackId: '2', name: 'ODF-01' },
  { id: '4', rackId: '3', name: 'Switch-03' },
];

// Default current user
const currentUser = 'Nguyễn Văn A';

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function ConnectionManagement() {
  const [activeTab, setActiveTab] = useState<'patch-cord' | 'cable'>('patch-cord');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Start point selections
  const [selectedStartDC, setSelectedStartDC] = useState('');
  const [selectedStartRoom, setSelectedStartRoom] = useState('');
  const [selectedStartRack, setSelectedStartRack] = useState('');
  const [selectedStartDevice, setSelectedStartDevice] = useState('');
  const [selectedStartSlot, setSelectedStartSlot] = useState('');
  const [selectedStartCard, setSelectedStartCard] = useState('');
  const [selectedStartPort, setSelectedStartPort] = useState('');
  
  // End point selections
  const [selectedEndDC, setSelectedEndDC] = useState('');
  const [selectedEndRoom, setSelectedEndRoom] = useState('');
  const [selectedEndRack, setSelectedEndRack] = useState('');
  const [selectedEndDevice, setSelectedEndDevice] = useState('');
  const [selectedEndSlot, setSelectedEndSlot] = useState('');
  const [selectedEndCard, setSelectedEndCard] = useState('');
  const [selectedEndPort, setSelectedEndPort] = useState('');
  
  // New fields
  const [selectedCableName, setSelectedCableName] = useState('');
  const [performer, setPerformer] = useState(currentUser);
  const [performDate, setPerformDate] = useState(getTodayDate());
  const [completionDate, setCompletionDate] = useState('');
  const [completionDateError, setCompletionDateError] = useState('');

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

  const endRooms = mockRooms.filter((r) => r.dcId === selectedEndDC);
  const endRacks = mockRacks.filter((r) => r.roomId === selectedEndRoom);
  const endDevices = mockDevices.filter((d) => d.rackId === selectedEndRack);

  const handleCreateClick = () => {
    setShowCreateModal(true);
    setPerformer(currentUser);
    setPerformDate(getTodayDate());
    setCompletionDate('');
    setCompletionDateError('');
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setSelectedStartDC('');
    setSelectedStartRoom('');
    setSelectedStartRack('');
    setSelectedStartDevice('');
    setSelectedStartSlot('');
    setSelectedStartCard('');
    setSelectedStartPort('');
    setSelectedEndDC('');
    setSelectedEndRoom('');
    setSelectedEndRack('');
    setSelectedEndDevice('');
    setSelectedEndSlot('');
    setSelectedEndCard('');
    setSelectedEndPort('');
    setSelectedCableName('');
    setPerformer(currentUser);
    setPerformDate(getTodayDate());
    setCompletionDate('');
    setCompletionDateError('');
  };

  const handleCompletionDateChange = (value: string) => {
    setCompletionDate(value);
    if (value && performDate && new Date(value) < new Date(performDate)) {
      setCompletionDateError('Ngày hoàn thành phải sau ngày thực hiện');
    } else {
      setCompletionDateError('');
    }
  };

  const formatSlotCardPort = (slot: string, card: string, port: string) => {
    const parts = [];
    if (slot) parts.push(slot);
    if (card) parts.push(card);
    if (port) parts.push(port);
    return parts.join('-') || '-';
  };

  const isFormValid = () => {
    return (
      selectedStartDC &&
      selectedStartRoom &&
      selectedStartRack &&
      selectedStartDevice &&
      selectedEndDC &&
      selectedEndRoom &&
      selectedEndRack &&
      selectedEndDevice &&
      selectedCableName &&
      performer &&
      performDate &&
      (!completionDate || !completionDateError)
    );
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
                <th className="px-4 py-3 text-left font-semibold text-foreground">Nhãn Dây</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Điểm Đầu</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Slot-Card-Port</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Điểm Cuối</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Slot-Card-Port</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Tên Cáp</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Người Thực Hiện</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Ngày TH</th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">Ngày HT</th>
                <th className="px-4 py-3 text-center font-semibold text-foreground">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatchCordConnections.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="px-4 py-4">
                    <code className="font-mono text-cyan-400">{item.label}</code>
                  </td>
                  <td className="px-4 py-4 text-foreground">{item.startPoint}</td>
                  <td className="px-4 py-4 text-foreground font-mono text-sm">
                    {formatSlotCardPort(item.startSlot, item.startCard, item.startPort)}
                  </td>
                  <td className="px-4 py-4 text-foreground">{item.endPoint}</td>
                  <td className="px-4 py-4 text-foreground font-mono text-sm">
                    {formatSlotCardPort(item.endSlot, item.endCard, item.endPort)}
                  </td>
                  <td className="px-4 py-4 text-foreground">{item.cableName}</td>
                  <td className="px-4 py-4 text-muted-foreground text-sm">{item.performer}</td>
                  <td className="px-4 py-4 text-muted-foreground text-sm">{item.performDate}</td>
                  <td className="px-4 py-4 text-muted-foreground text-sm">{item.completionDate}</td>
                  <td className="px-4 py-4 text-center">
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
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
              <h3 className="text-lg font-semibold text-foreground">Tạo Kết Nối Dây Nhảy</h3>
              <button 
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              {/* Thông Tin Chung */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-foreground mb-4">Thông Tin Chung</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Tên Cáp *</label>
                    <select 
                      value={selectedCableName}
                      onChange={(e) => setSelectedCableName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Chọn loại cáp...</option>
                      {mockPatchCordTypes.map((cable) => (
                        <option key={cable.id} value={cable.cableName}>{cable.cableName}</option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">Quản lý tại mục &quot;Các Loại Dây&quot; - tab Mẫu Dây</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Người Thực Hiện *</label>
                    <input 
                      type="text"
                      value={performer}
                      onChange={(e) => setPerformer(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Nhập tên người thực hiện..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Ngày Thực Hiện *</label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={performDate}
                        onChange={(e) => {
                          setPerformDate(e.target.value);
                          // Re-validate completion date
                          if (completionDate && new Date(completionDate) < new Date(e.target.value)) {
                            setCompletionDateError('Ngày hoàn thành phải sau ngày thực hiện');
                          } else {
                            setCompletionDateError('');
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Ngày Hoàn Thành</label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={completionDate}
                        min={performDate}
                        onChange={(e) => handleCompletionDateChange(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg bg-background border text-foreground focus:outline-none focus:ring-2 ${
                          completionDateError ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-accent'
                        }`}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                    {completionDateError && (
                      <p className="text-xs text-red-500 mt-1">{completionDateError}</p>
                    )}
                  </div>
                </div>
              </div>

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

                {/* Slot - Card - Port for Start Point */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Slot</label>
                    <input 
                      type="text"
                      value={selectedStartSlot}
                      onChange={(e) => setSelectedStartSlot(e.target.value)}
                      placeholder="Nhập Slot..."
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Card</label>
                    <input 
                      type="text"
                      value={selectedStartCard}
                      onChange={(e) => setSelectedStartCard(e.target.value)}
                      placeholder="Nhập Card..."
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Port</label>
                    <input 
                      type="text"
                      value={selectedStartPort}
                      onChange={(e) => setSelectedStartPort(e.target.value)}
                      placeholder="Nhập Port..."
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
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

                {/* Slot - Card - Port for End Point */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Slot</label>
                    <input 
                      type="text"
                      value={selectedEndSlot}
                      onChange={(e) => setSelectedEndSlot(e.target.value)}
                      placeholder="Nhập Slot..."
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Card</label>
                    <input 
                      type="text"
                      value={selectedEndCard}
                      onChange={(e) => setSelectedEndCard(e.target.value)}
                      placeholder="Nhập Card..."
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Port</label>
                    <input 
                      type="text"
                      value={selectedEndPort}
                      onChange={(e) => setSelectedEndPort(e.target.value)}
                      placeholder="Nhập Port..."
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="border-t border-border pt-6 flex items-center justify-end gap-3">
                <button 
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-medium">
                  Hủy
                </button>
                <button 
                  disabled={!isFormValid()}
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
