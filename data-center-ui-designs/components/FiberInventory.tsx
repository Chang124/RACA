'use client';

import { useState } from 'react';
import { Plus, Upload, Search, Edit2, Trash2, X } from 'lucide-react';

interface PatchCord {
  id: string;
  scmId: string;
  cableName: string;
  fiberType: 'Duplex' | 'Simplex';
  connectorType: 'LC-LC' | 'LC-SC' | 'SC-SC';
  length: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

interface CableType {
  id: string;
  cableName: string;
  fiberCount: number;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

const mockCableTypes: CableType[] = [
  {
    id: '1',
    cableName: 'Cáp Quang SM 12F',
    fiberCount: 12,
    lastUpdatedBy: 'Nguyễn Văn A',
    lastUpdatedDate: '2024-01-15',
  },
  {
    id: '2',
    cableName: 'Cáp Quang MM 24F',
    fiberCount: 24,
    lastUpdatedBy: 'Trần Thị B',
    lastUpdatedDate: '2024-01-14',
  },
  {
    id: '3',
    cableName: 'Cáp Quang SM 48F',
    fiberCount: 48,
    lastUpdatedBy: 'Lê Văn C',
    lastUpdatedDate: '2024-01-13',
  },
  {
    id: '4',
    cableName: 'Cáp Quang MM 8F',
    fiberCount: 8,
    lastUpdatedBy: 'Phạm Thị D',
    lastUpdatedDate: '2024-01-15',
  },
];

const mockData: PatchCord[] = [
  {
    id: '1',
    scmId: 'SCM-0001',
    cableName: 'Cáp LC-LC 3m',
    fiberType: 'Duplex',
    connectorType: 'LC-LC',
    length: '3m',
    lastUpdatedBy: 'Nguyễn Văn A',
    lastUpdatedDate: '2024-01-15',
  },
  {
    id: '2',
    scmId: 'SCM-0002',
    cableName: 'Cáp LC-SC 5m',
    fiberType: 'Simplex',
    connectorType: 'LC-SC',
    length: '5m',
    lastUpdatedBy: 'Trần Thị B',
    lastUpdatedDate: '2024-01-14',
  },
  {
    id: '3',
    scmId: 'SCM-0003',
    cableName: 'Cáp LC-LC 1m',
    fiberType: 'Duplex',
    connectorType: 'LC-LC',
    length: '1m',
    lastUpdatedBy: 'Lê Văn C',
    lastUpdatedDate: '2024-01-13',
  },
  {
    id: '4',
    scmId: 'SCM-0094',
    cableName: 'Cáp LC-LC 3m',
    fiberType: 'Duplex',
    connectorType: 'LC-LC',
    length: '3m',
    lastUpdatedBy: 'Phạm Thị D',
    lastUpdatedDate: '2024-01-15',
  },
  {
    id: '5',
    scmId: 'SCM-0156',
    cableName: 'Cáp SC-SC 5m',
    fiberType: 'Simplex',
    connectorType: 'SC-SC',
    length: '5m',
    lastUpdatedBy: 'Hoàng Văn E',
    lastUpdatedDate: '2024-01-12',
  },
  {
    id: '6',
    scmId: 'SCM-0203',
    cableName: 'Cáp LC-SC 1m',
    fiberType: 'Duplex',
    connectorType: 'LC-SC',
    length: '1m',
    lastUpdatedBy: 'Đặng Thị F',
    lastUpdatedDate: '2024-01-15',
  },
];

export default function FiberInventory() {
  const [activeTab, setActiveTab] = useState<'mau-cap' | 'mau-day'>('mau-day');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCable, setSelectedCable] = useState<PatchCord | null>(null);
  const [selectedCableType, setSelectedCableType] = useState<CableType | null>(null);

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.scmId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.cableName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (cable: PatchCord) => {
    setSelectedCable(cable);
    setShowEditModal(true);
  };

  const handleDelete = (cable: PatchCord) => {
    setSelectedCable(cable);
    setShowDeleteModal(true);
  };

  const handleEditCableType = (cableType: CableType) => {
    setSelectedCableType(cableType);
    setShowEditModal(true);
  };

  const handleDeleteCableType = (cableType: CableType) => {
    setSelectedCableType(cableType);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs Header */}
      <div className="flex items-center border-b border-border px-6">
        <button
          onClick={() => setActiveTab('mau-day')}
          className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'mau-day'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Mẫu Dây
        </button>
        <button
          onClick={() => setActiveTab('mau-cap')}
          className={`px-4 py-4 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'mau-cap'
              ? 'border-accent text-accent'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Mẫu Cáp
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={activeTab === 'mau-day' ? "Tìm kiếm theo ID hoặc tên cáp..." : "Tìm kiếm theo tên..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg bg-accent text-primary hover:bg-accent/90 transition-colors flex items-center gap-2 font-medium">
            <Upload className="w-4 h-4" />
            Nhập Hàng Loạt
          </button>
          <button 
            onClick={() => {
              setShowAddModal(true);
              setSelectedCable(null);
              setSelectedCableType(null);
            }}
            className="px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" />
            Thêm Mới
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'mau-day' ? (
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card/50 backdrop-blur border-b border-border">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-foreground">ID</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Tên Cáp</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Loại Sợi</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Loại Nối</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Chiều Dài</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Người Cập Nhật</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Ngày Cập Nhật</th>
                <th className="px-6 py-3 text-center font-semibold text-foreground">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="px-6 py-4">
                    <code className="font-mono text-cyan-400">{item.scmId}</code>
                  </td>
                  <td className="px-6 py-4 text-foreground">{item.cableName}</td>
                  <td className="px-6 py-4 text-foreground">{item.fiberType}</td>
                  <td className="px-6 py-4 text-foreground">{item.connectorType}</td>
                  <td className="px-6 py-4 text-foreground">{item.length}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedBy}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-cyan-400 hover:text-cyan-300">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-red-400 hover:text-red-300">
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
                <th className="px-6 py-3 text-left font-semibold text-foreground">ID</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Tên Cáp</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Số Sợi</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Người Cập Nhật</th>
                <th className="px-6 py-3 text-left font-semibold text-foreground">Ngày Cập Nhật</th>
                <th className="px-6 py-3 text-center font-semibold text-foreground">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {mockCableTypes.map((item) => (
                <tr key={item.id} className="table-row">
                  <td className="px-6 py-4">
                    <code className="font-mono text-cyan-400">CT-{String(item.id).padStart(4, '0')}</code>
                  </td>
                  <td className="px-6 py-4 text-foreground">{item.cableName}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{item.fiberCount}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedBy}</td>
                  <td className="px-6 py-4 text-muted-foreground text-sm">{item.lastUpdatedDate}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEditCableType(item)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-cyan-400 hover:text-cyan-300">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCableType(item)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors text-red-400 hover:text-red-300">
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

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {activeTab === 'mau-day' ? 'Thêm Mẫu Dây Mới' : 'Thêm Mẫu Cáp Mới'}
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {activeTab === 'mau-day' ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Tên Cáp</label>
                    <input 
                      type="text" 
                      placeholder="Nhập tên cáp..." 
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Loại Sợi</label>
                      <select className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                        <option>Duplex</option>
                        <option>Simplex</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Loại Nối *</label>
                      <select className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                        <option value="">Chọn kiểu kết nối...</option>
                        <option value="LC-LC">LC-LC</option>
                        <option value="LC-SC">LC-SC</option>
                        <option value="SC-SC">SC-SC</option>
                      </select>
                      <p className="text-xs text-muted-foreground mt-1">Quản lý kiểu kết nối tại mục "Kiểu Kết Nối"</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Chiều Dài</label>
                    <input 
                      type="text" 
                      placeholder="3m" 
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Tên Cáp</label>
                    <input 
                      type="text" 
                      placeholder="Nhập tên cáp..." 
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Số Sợi</label>
                    <input 
                      type="number" 
                      placeholder="12" 
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2 px-6 py-4 border-t border-border">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors font-medium"
              >
                Hủy
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-accent text-primary hover:bg-accent/90 transition-colors font-medium"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (activeTab === 'mau-day' ? selectedCable : selectedCableType) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {activeTab === 'mau-day' ? 'Chỉnh Sửa Mẫu Dây' : 'Chỉnh Sửa Mẫu Cáp'}
              </h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {activeTab === 'mau-day' && selectedCable ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">ID</label>
                    <input 
                      type="text" 
                      value={selectedCable.scmId}
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-muted-foreground cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Tên Cáp</label>
                    <input 
                      type="text" 
                      placeholder="Nhập tên cáp..." 
                      defaultValue={selectedCable.cableName}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Loại Sợi</label>
                      <select defaultValue={selectedCable.fiberType} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                        <option>Duplex</option>
                        <option>Simplex</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Loại Nối *</label>
                      <select defaultValue={selectedCable.connectorType} className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent">
                        <option value="LC-LC">LC-LC</option>
                        <option value="LC-SC">LC-SC</option>
                        <option value="SC-SC">SC-SC</option>
                      </select>
                      <p className="text-xs text-muted-foreground mt-1">Quản lý kiểu kết nối tại mục "Kiểu Kết Nối"</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Chiều Dài</label>
                    <input 
                      type="text" 
                      defaultValue={selectedCable.length}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </>
              ) : selectedCableType ? (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">ID</label>
                    <input 
                      type="text" 
                      value={`CT-${String(selectedCableType.id).padStart(4, '0')}`}
                      disabled
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-muted-foreground cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Tên Cáp</label>
                    <input 
                      type="text" 
                      placeholder="Nhập tên cáp..." 
                      defaultValue={selectedCableType.cableName}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Số Sợi</label>
                    <input 
                      type="number" 
                      defaultValue={selectedCableType.fiberCount}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </>
              ) : null}
            </div>

            <div className="flex gap-2 px-6 py-4 border-t border-border">
              <button 
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors font-medium"
              >
                Hủy
              </button>
              <button 
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-accent text-primary hover:bg-accent/90 transition-colors font-medium"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (activeTab === 'mau-day' ? selectedCable : selectedCableType) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {activeTab === 'mau-day' ? 'Xác Nhận Xoá Mẫu Dây' : 'Xác Nhận Xoá Mẫu Cáp'}
              </h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-foreground mb-2">
                {activeTab === 'mau-day' ? 'Bạn chắc chắn muốn xoá mẫu dây này?' : 'Bạn chắc chắn muốn xoá mẫu cáp này?'}
              </p>
              <div className="bg-secondary/50 border border-border rounded-lg p-4">
                <div className="text-sm">
                  {activeTab === 'mau-day' && selectedCable ? (
                    <>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="text-cyan-400 font-mono">{selectedCable.scmId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tên Cáp:</span>
                        <span className="text-foreground">{selectedCable.cableName}</span>
                      </div>
                    </>
                  ) : selectedCableType ? (
                    <>
                      <div className="flex justify-between mb-2">
                        <span className="text-muted-foreground">ID:</span>
                        <span className="text-cyan-400 font-mono">{`CT-${String(selectedCableType.id).padStart(4, '0')}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tên Cáp:</span>
                        <span className="text-foreground">{selectedCableType.cableName}</span>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex gap-2 px-6 py-4 border-t border-border">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors font-medium"
              >
                Hủy
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors font-medium border border-red-500/30"
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
