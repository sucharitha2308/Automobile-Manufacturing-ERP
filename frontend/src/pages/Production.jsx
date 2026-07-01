import React, { useState } from 'react';
import { Search, Plus, Filter, Play, CheckCircle, Clock, Settings, ArrowRight } from 'lucide-react';

const mockProductionOrders = [
  { id: 'PROD-2026-101', product: 'AutoFlow Model E (Electric Sedan)', quantity: 50, status: 'In Progress', startDate: '2026-10-24', endDate: '2026-11-05', workCenter: 'Assembly Line A', completion: 45 },
  { id: 'PROD-2026-102', product: 'AutoFlow X-Terra (SUV)', quantity: 120, status: 'Planned', startDate: '2026-10-28', endDate: '2026-11-15', workCenter: 'Assembly Line B', completion: 0 },
  { id: 'PROD-2026-103', product: 'AutoFlow Model E (Electric Sedan)', quantity: 200, status: 'Completed', startDate: '2026-10-01', endDate: '2026-10-20', workCenter: 'Assembly Line A', completion: 100 },
];

const StatusBadge = ({ status }) => {
  let color = '';
  let Icon = null;
  switch (status) {
    case 'In Progress':
      color = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      Icon = Play;
      break;
    case 'Planned':
      color = 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      Icon = Clock;
      break;
    case 'Completed':
      color = 'bg-green-500/10 text-green-500 border-green-500/20';
      Icon = CheckCircle;
      break;
    default:
      color = 'bg-gray-500/10 text-gray-500 border-gray-500/20';
      Icon = Clock;
  }
  
  return (
    <span className={`flex items-center w-max gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${color}`}>
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};

const Production = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Production Planning</h2>
          <p className="text-foreground/60 text-sm mt-1">Manage production schedules and work centers.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg hover:bg-border/50 transition-colors font-medium text-sm">
            <Settings className="w-4 h-4" /> Work Centers
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" /> Create Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="text-foreground/60 text-sm font-medium">Active Production Orders</div>
          <div className="text-2xl font-bold text-foreground mt-1">8</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="text-foreground/60 text-sm font-medium">Units In Production</div>
          <div className="text-2xl font-bold text-blue-500 mt-1">420</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="text-foreground/60 text-sm font-medium">Efficiency Rate (OEE)</div>
          <div className="text-2xl font-bold text-green-500 mt-1">94.2%</div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-foreground/40" />
            </div>
            <input
              type="text"
              placeholder="Search production orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg hover:bg-border/50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-foreground/80">
            <thead className="text-xs text-foreground/60 uppercase bg-background border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Product & Qty</th>
                <th className="px-6 py-4 font-medium">Work Center</th>
                <th className="px-6 py-4 font-medium">Schedule</th>
                <th className="px-6 py-4 font-medium w-1/5">Progress</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockProductionOrders
                .filter(po => po.id.toLowerCase().includes(searchTerm.toLowerCase()) || po.product.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((po) => (
                <tr key={po.id} className="hover:bg-border/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-medium text-foreground">{po.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{po.product}</span>
                      <span className="text-xs text-foreground/60">{po.quantity} Units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{po.workCenter}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-xs">
                      <span>Start: {po.startDate}</span>
                      <span className="text-foreground/50">End: {po.endDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-border rounded-full h-2 mb-1">
                      <div 
                        className={`h-2 rounded-full ${po.completion === 100 ? 'bg-green-500' : 'bg-primary'}`} 
                        style={{ width: `${po.completion}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-foreground/60 text-right">{po.completion}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Production;
