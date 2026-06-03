'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

interface ConnectorType {
  id: string;
  name: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
}

const mockData: ConnectorType[] = [
  {
    id: '1',
    name: 'LC-LC',
    lastUpdatedBy: 'Nguyễn Văn A',
    lastUpdatedDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'LC-SC',
    lastUpdatedBy: 'Trần Thị B',
    lastUpdatedDate: '2024-01-14',
  },
  {
    id: '3',
    name: 'SC-SC',
    lastUpdatedBy: 'Lê Văn C',
    lastUpdatedDate: '2024-01-13',
  },
];

export default function ConnectorTypeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedType, setSelectedType] = useState<ConnectorType | null>(null);

  const filteredData = mockData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (type: ConnectorType) => {
    setSelectedType(type);
    setShowEditModal(true);
  };

  const handleDelete = (type: ConnectorType) => {
    setSelectedType(type);
    setShowDeleteModal(true);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search and Actions Bar */}
      <div className="px-6 py-4 border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên kiểu kết nối..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" />
            Thêm Mới
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-card/50 backdrop-blur border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Tên Kiểu Kết Nối</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Người Cập Nhật</th>
              <th className="px-6 py-3 text-left font-semibold text-foreground">Ngày Cập Nhật</th>
              <th className="px-6 py-3 text-center font-semibold text-foreground">Hành Động</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="table-row">
                <td className="px-6 py-4">
                  <code className="font-mono text-cyan-400">{item.name}</code>
                </td>
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
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Thêm Kiểu Kết Nối Mới</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Tên Kiểu Kết Nối</label>
                <input 
                  type="text" 
                  placeholder="VD: LC-LC, LC-SC, SC-SC..." 
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
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
      {showEditModal && selectedType && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Chỉnh Sửa Kiểu Kết Nối</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Tên Kiểu Kết Nối</label>
                <input 
                  type="text" 
                  defaultValue={selectedType.name}
                  className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
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
      {showDeleteModal && selectedType && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Xác Nhận Xoá Kiểu Kết Nối</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-foreground mb-2">Bạn chắc chắn muốn xoá kiểu kết nối này?</p>
              <div className="bg-secondary/50 border border-border rounded-lg p-4">
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tên:</span>
                    <span className="text-cyan-400 font-mono">{selectedType.name}</span>
                  </div>
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
