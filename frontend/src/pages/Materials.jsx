import React, { useState } from 'react';
import { Search, Plus, Filter, Package, AlertCircle } from 'lucide-react';

const mockMaterials = [
  { id: 'RM-001', name: 'High Tensile Steel Sheet', category: 'Metals', stock: 2500, minStock: 1000, unit: 'kg', price: '$2.50' },
  { id: 'RM-002', name: 'Engine Control Unit (ECU)', category: 'Electronics', stock: 150, minStock: 50, unit: 'pcs', price: '$150.00' },
  { id: 'RM-003', name: 'Lithium-Ion Battery Cell', category: 'Electronics', stock: 600, minStock: 500, unit: 'pcs', price: '$45.00' },
  { id: 'RM-004', name: 'Carbon Fiber Weave', category: 'Materials', stock: 40, minStock: 100, unit: 'm', price: '$85.00' },
  { id: 'RM-005', name: 'Windshield Glass', category: 'Glass', stock: 210, minStock: 200, unit: 'pcs', price: '$120.00' },
];

const Materials = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Raw Materials Master</h2>
          <p className="text-foreground/60 text-sm mt-1">Manage and track all raw materials used in production.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" /> Add Material
        </button>
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
              placeholder="Search materials by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            />
          </div>
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg hover:bg-border/50 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" /> Category Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-foreground/80">
            <thead className="text-xs text-foreground/60 uppercase bg-background border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Material Code</th>
                <th className="px-6 py-4 font-medium">Name & Category</th>
                <th className="px-6 py-4 font-medium">Unit Price</th>
                <th className="px-6 py-4 font-medium">Current Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockMaterials
                .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.id.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((material) => (
                <tr key={material.id} className="hover:bg-border/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{material.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{material.name}</span>
                      <span className="text-xs text-foreground/50">{material.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{material.price}/{material.unit}</td>
                  <td className="px-6 py-4 font-medium">
                    {material.stock.toLocaleString()} {material.unit}
                  </td>
                  <td className="px-6 py-4">
                    {material.stock < material.minStock ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-red-500/10 text-red-500 border-red-500/20 w-max">
                        <AlertCircle className="w-3.5 h-3.5" /> Low Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border bg-green-500/10 text-green-500 border-green-500/20 w-max">
                        <Package className="w-3.5 h-3.5" /> Healthy
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium text-sm">Edit</button>
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

export default Materials;
