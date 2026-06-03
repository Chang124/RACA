'use client';

import { useState } from 'react';
import { X, Zap } from 'lucide-react';

interface Port {
  id: number;
  status: 'available' | 'active' | 'damaged';
  destination?: string;
  cableId?: string;
  connectedDevice?: string;
}

const initialPorts: Port[] = Array.from({ length: 24 }, (_, i) => {
  const portNum = i + 1;
  if (portNum === 5) {
    return {
      id: portNum,
      status: 'active',
      destination: 'Switch-Core-01, Port 12',
      cableId: 'PC-0094',
      connectedDevice: 'Core Switch',
    };
  }
  if (portNum === 8) {
    return { id: portNum, status: 'active', destination: 'Router-A, Port 3', cableId: 'PC-0045' };
  }
  if (portNum === 12) {
    return { id: portNum, status: 'damaged' };
  }
  if (portNum === 15) {
    return { id: portNum, status: 'active', destination: 'Firewall-01, Port 1', cableId: 'PC-0127' };
  }
  return { id: portNum, status: 'available' };
});

export default function PatchPanelMapping() {
  const [ports, setPorts] = useState<Port[]>(initialPorts);
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const handlePortClick = (port: Port, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedPort(port);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const getPortColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'port-available';
      case 'active':
        return 'port-active';
      case 'damaged':
        return 'port-damaged';
      default:
        return 'port-available';
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">ODF 24FO - Khung Phân Phối Quang Học</h3>
          <p className="text-sm text-muted-foreground">Bảng Vá 1U Ngang - 24 Cổng LC Duplex</p>
        </div>

        {/* Legend */}
        <div className="flex gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-400/40 border border-gray-500/30"></div>
            <span className="text-muted-foreground">Còn Trữ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-500/50"></div>
            <span className="text-muted-foreground">Hoạt Động</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-red-600/40 border border-red-600/50"></div>
            <span className="text-muted-foreground">Bị Hỏng</span>
          </div>
        </div>
      </div>

      {/* Panel Visualization */}
      <div className="flex-1 flex items-center justify-center p-12 overflow-auto">
        <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg shadow-2xl p-8 border-2 border-gray-500">
          {/* Panel Chassis */}
          <div className="bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg p-6 border border-gray-600">
            {/* Panel Label */}
            <div className="text-center mb-6">
              <div className="text-sm font-mono text-gray-300 tracking-wide">ODF-RackA1</div>
              <div className="text-xs text-gray-400">Bảng Vá 1U</div>
            </div>

            {/* Ports Grid */}
            <div className="grid grid-cols-12 gap-3 mb-4">
              {ports.map((port) => (
                <button
                  key={port.id}
                  onClick={(e) => handlePortClick(port, e)}
                  className={`relative group w-8 h-8 rounded-sm transition-all hover:scale-110 hover:shadow-lg ${getPortColor(port.status)}`}
                  title={`Port ${port.id}`}
                >
                  {/* Port number label */}
                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {port.id}
                  </div>

                  {/* Active indicator */}
                  {port.status === 'active' && (
                    <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-cyan-400 to-cyan-500 opacity-20"></div>
                  )}

                  {/* Damage indicator */}
                  {port.status === 'damaged' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xs text-red-400 font-bold">✕</div>
                    </div>
                  )}

                  {/* Cable icon for active ports */}
                  {port.status === 'active' && (
                    <Zap className="w-3 h-3 absolute inset-1 text-cyan-400 opacity-60" />
                  )}
                </button>
              ))}
            </div>

            {/* Bottom label */}
            <div className="text-center text-xs text-gray-500 mt-2">24 Cổng LC Duplex</div>
          </div>
        </div>
      </div>

      {/* Tooltip/Popover */}
      {selectedPort && tooltipPos && (
        <div
          className="fixed bg-card border border-border rounded-lg shadow-xl p-4 z-50 text-sm animate-in fade-in duration-200 max-w-sm"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="font-mono font-semibold text-accent mb-1">Cổng {selectedPort.id}</div>
              <div className="text-xs text-muted-foreground">Đầu Nối LC Duplex</div>
            </div>
            <button
              onClick={() => setSelectedPort(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 border-t border-border pt-3">
            <div>
              <div className="text-xs text-muted-foreground">Trạng Thái</div>
              <div className="text-sm text-foreground font-medium capitalize flex items-center gap-2">
                {selectedPort.status === 'available' && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                {selectedPort.status === 'active' && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>}
                {selectedPort.status === 'damaged' && <span className="w-2 h-2 rounded-full bg-red-400"></span>}
                {selectedPort.status === 'available'
                  ? 'Còn Trữ'
                  : selectedPort.status === 'active'
                    ? 'Kết Nối'
                    : 'Bị Hỏng'}
              </div>
            </div>

            {selectedPort.destination && (
              <div>
                <div className="text-xs text-muted-foreground">Đích Đến</div>
                <div className="text-sm text-cyan-400 font-mono break-words">{selectedPort.destination}</div>
              </div>
            )}

            {selectedPort.cableId && (
              <div>
                <div className="text-xs text-muted-foreground">ID Cáp</div>
                <div className="text-sm text-foreground font-mono">{selectedPort.cableId}</div>
              </div>
            )}

            {selectedPort.connectedDevice && (
              <div>
                <div className="text-xs text-muted-foreground">Thiết Bị Kết Nối</div>
                <div className="text-sm text-foreground">{selectedPort.connectedDevice}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
