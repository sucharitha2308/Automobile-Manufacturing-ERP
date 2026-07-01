import React, { useState } from 'react';
import { Search, Filter, ArrowRightLeft, ArrowDown, ArrowUp } from 'lucide-react';

const mockInventory = [
  { id: 'INV-1001', material: 'High Tensile Steel Sheet', warehouse: 'Main Assembly', batch: 'B-2610-A', stock: 2500, status: 'In Stock', lastMoved: '2026-10-24' },
  { id: 'INV-1002', material: 'Engine Control Unit (ECU)', warehouse: 'Electronics Storage', batch: 'B-2610-B', stock: 150, status: 'In Stock', lastMoved: '2026-10-22' },
  { id: 'INV-1003', material: 'Lithium-Ion Battery Cell', warehouse: 'Electronics Storage', batch: 'B-2609-C', stock: 20, status: 'Low Stock', lastMoved: '2026-09-30' },
  { id: 'INV-1004', material: 'Carbon Fiber Weave', warehouse: 'Main Assembly', batch: 'B-2610-D', stock: 0, status: 'Out of Stock', lastMoved: '2026-10-25' },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inventory Management</h2>
          <p className="text-foreground/60 text-sm mt-1">Track stock levels across all warehouses.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg hover:bg-border/50 transition-colors font-medium text-sm">
            <ArrowRightLeft className="w-4 h-4" /> Transfer Stock
          </button>
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg hover:bg-border/50 transition-colors font-medium text-sm">
            <ArrowDown className="w-4 h-4" /> Stock Out
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
            <ArrowUp className="w-4 h-4" /> Stock In
          </button>
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
              placeholder="Search inventory..."
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
                <th className="px-6 py-4 font-medium">Inv ID</th>
                <th className="px-6 py-4 font-medium">Material</th>
                <th className="px-6 py-4 font-medium">Warehouse</th>
                <th className="px-6 py-4 font-medium">Batch No.</th>
                <th className="px-6 py-4 font-medium">Stock Level</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockInventory
                .filter(inv => inv.material.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((inv) => (
                <tr key={inv.id} className="hover:bg-border/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-medium text-foreground">{inv.id}</td>
                  <td className="px-6 py-4 font-medium">{inv.material}</td>
                  <td className="px-6 py-4">{inv.warehouse}</td>
                  <td className="px-6 py-4 font-mono text-xs text-foreground/70">{inv.batch}</td>
                  <td className="px-6 py-4 font-medium">{inv.stock.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      inv.status === 'In Stock' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                      inv.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                      'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium text-sm">History</button>
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

export default Inventory;
