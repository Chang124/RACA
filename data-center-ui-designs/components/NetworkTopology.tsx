'use client';

import { Server, Database, Zap, Info } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  color: string;
}

interface Link {
  from: string;
  to: string;
  label: string;
  type: 'dotted' | 'solid';
  color: string;
  description?: string;
}

export default function NetworkTopology() {
  const nodes: Node[] = [
    {
      id: 'node1',
      label: 'Server_A1_U10',
      subLabel: 'Cổng 1',
      icon: <Server className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      id: 'node2',
      label: 'ODF-RackA1',
      subLabel: 'Cổng 5',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'node3',
      label: 'ODF-RackE1',
      subLabel: 'Cổng 5',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'node4',
      label: 'Core_Switch_E1',
      subLabel: 'Vị Trí 1/Cổng 2',
      icon: <Database className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
    },
  ];

  const links: Link[] = [
    {
      from: 'node1',
      to: 'node2',
      label: 'Cáp Vá 2m',
      type: 'dotted',
      color: 'from-cyan-500/60 to-cyan-400/40',
      description: 'Đơn Chế Độ LC-LC | Trạng Thái: Hoạt Động',
    },
    {
      from: 'node2',
      to: 'node3',
      label: 'Cáp Thân Cây 150m',
      type: 'solid',
      color: 'from-orange-500/80 to-orange-400/60',
      description: 'Đa Chế Độ LC-LC | Trạng Thái: Hoạt Động | Liên Kết Quan Trọng',
    },
    {
      from: 'node3',
      to: 'node4',
      label: 'Cáp Vá 20m (Dưới Sàn)',
      type: 'dotted',
      color: 'from-cyan-500/60 to-cyan-400/40',
      description: 'Đơn Chế Độ LC-LC | Trạng Thái: Hoạt Động',
    },
  ];

  const getNodePosition = (index: number) => {
    const spacing = 280;
    return {
      x: 120 + index * spacing,
      y: 240,
    };
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">Theo Dõi Tôpô Mạng</h3>
        <p className="text-sm text-muted-foreground">Đường Dẫn Kết Nối Liên Kết Sợi Quang Đầu Cuối</p>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto relative">
        <svg
          className="w-full h-full min-h-screen"
          style={{
            background: `linear-gradient(0deg, #1a2332 1px, transparent 1px) no-repeat, 
                         linear-gradient(90deg, #1a2332 1px, transparent 1px) no-repeat`,
            backgroundSize: '40px 40px',
          }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#06b6d4" />
            </marker>
          </defs>

          {/* Links/Connections */}
          {links.map((link, idx) => {
            const fromNode = nodes.findIndex((n) => n.id === link.from);
            const toNode = nodes.findIndex((n) => n.id === link.to);
            const fromPos = getNodePosition(fromNode);
            const toPos = getNodePosition(toNode);

            const isBackbone = link.type === 'solid';

            return (
              <g key={`link-${idx}`}>
                {/* Connection Line */}
                <line
                  x1={fromPos.x + 60}
                  y1={fromPos.y}
                  x2={toPos.x - 60}
                  y2={toPos.y}
                  stroke={isBackbone ? '#f97316' : '#06b6d4'}
                  strokeWidth={isBackbone ? 3 : 2}
                  strokeDasharray={link.type === 'dotted' ? '5,5' : 'none'}
                  opacity="0.7"
                />

                {/* Link Label Background */}
                <rect
                  x={(fromPos.x + toPos.x) / 2 - 80}
                  y={fromPos.y - 30}
                  width="160"
                  height="24"
                  fill="#1a2332"
                  stroke={isBackbone ? '#f97316' : '#06b6d4'}
                  strokeWidth="1"
                  rx="4"
                  opacity="0.9"
                />

                {/* Link Label */}
                <text
                  x={(fromPos.x + toPos.x) / 2}
                  y={fromPos.y - 12}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-semibold"
                  fill={isBackbone ? '#fed7aa' : '#cffafe'}
                >
                  {link.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node, idx) => {
            const pos = getNodePosition(idx);
            return (
              <g key={node.id}>
                {/* Node Circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="45"
                  fill={`url(#gradient-${idx})`}
                  stroke="#06b6d4"
                  strokeWidth="2"
                  opacity="0.9"
                />

                <defs>
                  <linearGradient
                    id={`gradient-${idx}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={node.color === 'from-cyan-500 to-cyan-600' ? '#06b6d4' : node.color === 'from-blue-500 to-blue-600' ? '#0ea5e9' : '#10b981'} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={node.color === 'from-cyan-500 to-cyan-600' ? '#0891b2' : node.color === 'from-blue-500 to-blue-600' ? '#0284c7' : '#059669'} stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Icon */}
                <g
                  transform={`translate(${pos.x - 12}, ${pos.y - 12})`}
                  className="text-accent"
                >
                  <foreignObject x="0" y="0" width="24" height="24">
                    <div className="flex items-center justify-center w-6 h-6 text-accent">
                      {node.icon}
                    </div>
                  </foreignObject>
                </g>

                {/* Node Label Background */}
                <rect
                  x={pos.x - 70}
                  y={pos.y + 50}
                  width="140"
                  height="50"
                  fill="#1a2332"
                  stroke="#334155"
                  strokeWidth="1"
                  rx="4"
                  opacity="0.95"
                />

                {/* Main Label */}
                <text
                  x={pos.x}
                  y={pos.y + 65}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-mono font-semibold"
                  fill="#06b6d4"
                >
                  {node.label}
                </text>

                {/* Sub Label */}
                <text
                  x={pos.x}
                  y={pos.y + 80}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs"
                  fill="#94a3b8"
                >
                  {node.subLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Link Details Panel */}
      <div className="border-t border-border bg-card/50 backdrop-blur p-6">
        <h4 className="text-sm font-semibold text-foreground mb-4">Chi Tiết Kết Nối</h4>
        <div className="grid grid-cols-3 gap-4">
          {links.map((link, idx) => (
            <div key={`detail-${idx}`} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs font-semibold text-accent mb-1">{link.label}</div>
                  {link.description && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      {link.description.split('|').map((part, i) => (
                        <div key={i} className="truncate">{part.trim()}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
