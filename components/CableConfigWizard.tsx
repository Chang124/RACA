'use client';

import { useState } from 'react';
import { ChevronDown, Zap, X } from 'lucide-react';

interface TrunkMapping {
  portA: number;
  portB: number;
}

export default function CableConfigWizard() {
  const [sourceEndpoint, setSourceEndpoint] = useState({
    dataCenter: '',
    room: '',
    rack: '',
    device: '',
    port: '',
  });

  const [destEndpoint, setDestEndpoint] = useState({
    dataCenter: '',
    room: '',
    rack: '',
    device: '',
    port: '',
  });

  const [showTrunkModal, setShowTrunkModal] = useState(false);
  const [trunkMappings, setTrunkMappings] = useState<TrunkMapping[]>([]);

  // Mock data for dropdowns
  const dataCenters = ['DC-01', 'DC-02', 'DC-03'];
  const rooms = ['Phòng Máy Chủ A', 'Phòng Máy Chủ B', 'Phòng Mạng'];
  const racks = ['Giá-A1', 'Giá-A2', 'Giá-B1', 'Giá-B2'];
  const devices = ['ODF-01', 'Switch-Core-01', 'Router-A', 'Firewall-01'];
  const ports = Array.from({ length: 24 }, (_, i) => `Cổng ${i + 1}`);

  const handleAutoMap = () => {
    const newMappings: TrunkMapping[] = [];
    for (let i = 0; i < 24; i++) {
      newMappings.push({ portA: i + 1, portB: i + 1 });
    }
    setTrunkMappings(newMappings);
  };

  const SelectDropdown = ({ value, onChange, options, placeholder }: any) => (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
    </div>
  );

  const EndpointColumn = ({ title, endpoint, setEndpoint }: any) => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>

      <div>
        <label className="text-xs text-muted-foreground block mb-1.5">Trung Tâm Dữ Liệu</label>
        <SelectDropdown
          value={endpoint.dataCenter}
          onChange={(e: any) => setEndpoint({ ...endpoint, dataCenter: e.target.value })}
          options={dataCenters}
          placeholder="Chọn Trung Tâm Dữ Liệu"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground block mb-1.5">Phòng</label>
        <SelectDropdown
          value={endpoint.room}
          onChange={(e: any) => setEndpoint({ ...endpoint, room: e.target.value })}
          options={rooms}
          placeholder="Chọn Phòng"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground block mb-1.5">Giá</label>
        <SelectDropdown
          value={endpoint.rack}
          onChange={(e: any) => setEndpoint({ ...endpoint, rack: e.target.value })}
          options={racks}
          placeholder="Chọn Giá"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground block mb-1.5">Thiết Bị</label>
        <SelectDropdown
          value={endpoint.device}
          onChange={(e: any) => setEndpoint({ ...endpoint, device: e.target.value })}
          options={devices}
          placeholder="Chọn Thiết Bị"
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground block mb-1.5">Cổng</label>
        <SelectDropdown
          value={endpoint.port}
          onChange={(e: any) => setEndpoint({ ...endpoint, port: e.target.value })}
          options={ports}
          placeholder="Chọn Cổng"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">Cấu Hình Vá Cáp</h3>
        <p className="text-sm text-muted-foreground">Cấu hình các điểm cuối nguồn và đích cho kết nối cáp vá</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Split Screen Layout */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            {/* Source Column */}
            <div className="bg-card border border-border rounded-lg p-6">
              <EndpointColumn
                title="Điểm Cuối Nguồn"
                endpoint={sourceEndpoint}
                setEndpoint={setSourceEndpoint}
              />
            </div>

            {/* Center Column with Connect Button */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-1 h-24 bg-gradient-to-b from-accent to-transparent rounded"></div>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-cyan-500/50">
                <Zap className="w-5 h-5" />
              </button>
              <div className="w-1 h-24 bg-gradient-to-b to-accent from-transparent rounded"></div>
            </div>

            {/* Destination Column */}
            <div className="bg-card border border-border rounded-lg p-6">
              <EndpointColumn
                title="Điểm Cuối Đích"
                endpoint={destEndpoint}
                setEndpoint={setDestEndpoint}
              />
            </div>
          </div>

          {/* Connect Button */}
          <div className="flex justify-center mb-8">
            <button className="px-8 py-3 rounded-lg bg-accent text-primary font-semibold hover:bg-accent/90 transition-colors text-lg shadow-lg">
              Kết Nối Cáp Vá
            </button>
          </div>

          {/* Quick Trunk Configuration */}
          <div className="border-t border-border pt-8">
            <button
              onClick={() => setShowTrunkModal(true)}
              className="px-6 py-3 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-semibold hover:bg-sidebar-primary/90 transition-colors"
            >
              Cấu Hình Cáp Thân Cây Nhanh
            </button>
          </div>
        </div>
      </div>

      {/* Trunk Configuration Modal */}
      {showTrunkModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-border bg-card/95 backdrop-blur">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Cấu Hình Cáp Thân Cây Nhanh</h3>
                <p className="text-xs text-muted-foreground mt-1">Ánh Xạ Tự Động 1-to-1 Tất Cả Cổng (ODF A → ODF B)</p>
              </div>
              <button
                onClick={() => setShowTrunkModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Port Visualization */}
              <div className="mb-8 relative">
                <div className="grid grid-cols-2 gap-12 mb-8">
                  {/* ODF A */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-4">ODF-A (Bảng Trái)</h4>
                    <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600">
                      <div className="grid grid-cols-6 gap-3">
                        {Array.from({ length: 24 }, (_, i) => i + 1).map((port) => (
                          <div
                            key={`a-${port}`}
                            className={`w-8 h-8 rounded-sm border flex items-center justify-center text-xs font-mono ${
                              trunkMappings.some((m) => m.portA === port)
                                ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                                : 'bg-gray-600/30 border-gray-500/50 text-gray-400'
                            }`}
                          >
                            {port}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ODF B */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-4">ODF-B (Bảng Phải)</h4>
                    <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600">
                      <div className="grid grid-cols-6 gap-3">
                        {Array.from({ length: 24 }, (_, i) => i + 1).map((port) => (
                          <div
                            key={`b-${port}`}
                            className={`w-8 h-8 rounded-sm border flex items-center justify-center text-xs font-mono ${
                              trunkMappings.some((m) => m.portB === port)
                                ? 'bg-cyan-500/30 border-cyan-500/50 text-cyan-300'
                                : 'bg-gray-600/30 border-gray-500/50 text-gray-400'
                            }`}
                          >
                            {port}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connection Lines - Simplified visualization */}
                {trunkMappings.length > 0 && (
                  <div className="text-center py-4 border-t border-border mt-8">
                    <div className="text-sm text-emerald-400 font-medium">✓ {trunkMappings.length} cổng được kết nối</div>
                  </div>
                )}
              </div>

              {/* Auto Map Button */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleAutoMap}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/50"
                >
                  <Zap className="w-5 h-5 inline mr-2" />
                  Ánh Xạ Tự Động 1-to-1 Tất Cả Cổng
                </button>
                <button
                  onClick={() => {
                    setTrunkMappings([]);
                  }}
                  className="px-6 py-3 rounded-lg bg-card border border-border text-foreground hover:bg-secondary transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
