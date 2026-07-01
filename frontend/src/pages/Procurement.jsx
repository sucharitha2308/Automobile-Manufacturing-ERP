import React, { useState } from 'react';
import { Search, Plus, Filter, FileText, CheckCircle, Clock, XCircle, ArrowRight } from 'lucide-react';

const mockPurchaseOrders = [
  { id: 'PO-2026-001', supplier: 'Global Steel Corp', amount: '$45,000', status: 'Approved', date: '2026-10-24', items: 3 },
  { id: 'PO-2026-002', supplier: 'TechAuto Electronics', amount: '$12,500', status: 'Pending', date: '2026-10-25', items: 12 },
  { id: 'PO-2026-003', supplier: 'Prime Plastics Ltd', amount: '$8,200', status: 'Delivered', date: '2026-10-20', items: 5 },
  { id: 'PO-2026-004', supplier: 'EuroParts GmbH', amount: '$112,000', status: 'Cancelled', date: '2026-10-18', items: 2 },
];

const StatusBadge = ({ status }) => {
  let color = '';
  let Icon = null;
  switch (status) {
    case 'Approved':
      color = 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      Icon = CheckCircle;
      break;
    case 'Pending':
      color = 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      Icon = Clock;
      break;
    case 'Delivered':
      color = 'bg-green-500/10 text-green-500 border-green-500/20';
      Icon = CheckCircle;
      break;
    case 'Cancelled':
      color = 'bg-red-500/10 text-red-500 border-red-500/20';
      Icon = XCircle;
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

const Procurement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Procurement</h2>
          <p className="text-foreground/60 text-sm mt-1">Manage purchase requisitions and orders.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg hover:bg-border/50 transition-colors font-medium text-sm">
            <FileText className="w-4 h-4" /> New Requisition
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" /> Create PO
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="text-foreground/60 text-sm font-medium">Total Spend (MTD)</div>
          <div className="text-2xl font-bold text-foreground mt-1">$177,700</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="text-foreground/60 text-sm font-medium">Pending Orders</div>
          <div className="text-2xl font-bold text-yellow-500 mt-1">12</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="text-foreground/60 text-sm font-medium">Approved Orders</div>
          <div className="text-2xl font-bold text-blue-500 mt-1">45</div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border">
          <div className="text-foreground/60 text-sm font-medium">Delivered</div>
          <div className="text-2xl font-bold text-green-500 mt-1">128</div>
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
              placeholder="Search PO number or supplier..."
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
                <th className="px-6 py-4 font-medium">PO Number</th>
                <th className="px-6 py-4 font-medium">Supplier</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockPurchaseOrders
                .filter(po => po.id.toLowerCase().includes(searchTerm.toLowerCase()) || po.supplier.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((po) => (
                <tr key={po.id} className="hover:bg-border/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-medium text-foreground">{po.id}</td>
                  <td className="px-6 py-4 font-medium">{po.supplier}</td>
                  <td className="px-6 py-4">{po.date}</td>
                  <td className="px-6 py-4">{po.items} Items</td>
                  <td className="px-6 py-4 font-medium">{po.amount}</td>
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
        
        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-foreground/60">
          <div>Showing 1 to 4 of 4 entries</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-border bg-background hover:bg-border/50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded border border-primary bg-primary/10 text-primary font-medium">1</button>
            <button className="px-3 py-1 rounded border border-border bg-background hover:bg-border/50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procurement;
