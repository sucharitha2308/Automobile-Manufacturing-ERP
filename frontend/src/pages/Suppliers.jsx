import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit, Trash, Star, ExternalLink } from 'lucide-react';

const mockSuppliers = [
  { id: 'SUP-001', name: 'Global Steel Corp', email: 'sales@globalsteel.com', phone: '123-456-7890', rating: 4.8, status: 'Active' },
  { id: 'SUP-002', name: 'TechAuto Electronics', email: 'contact@techauto.com', phone: '098-765-4321', rating: 4.5, status: 'Active' },
  { id: 'SUP-003', name: 'Prime Plastics Ltd', email: 'info@primeplastics.com', phone: '555-123-4567', rating: 3.9, status: 'Inactive' },
  { id: 'SUP-004', name: 'EuroParts GmbH', email: 'sales@europarts.de', phone: '444-987-6543', rating: 4.9, status: 'Active' },
  { id: 'SUP-005', name: 'Alloy Masters Inc', email: 'orders@alloymasters.com', phone: '222-333-4444', rating: 4.2, status: 'Active' },
];

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Supplier Management</h2>
          <p className="text-foreground/60 text-sm mt-1">Manage and evaluate your raw material suppliers.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" /> Add Supplier
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
              placeholder="Search suppliers..."
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
                <th className="px-6 py-4 font-medium">Supplier ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Performance Rating</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockSuppliers
                .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((supplier) => (
                <tr key={supplier.id} className="hover:bg-border/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">{supplier.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{supplier.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span>{supplier.email}</span>
                      <span className="text-foreground/50 text-xs">{supplier.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{supplier.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      supplier.status === 'Active' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-foreground/60 hover:text-blue-500 hover:bg-blue-500/10 rounded">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-foreground/60 hover:text-red-500 hover:bg-red-500/10 rounded">
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-foreground/60">
          <div>Showing 1 to 5 of 5 entries</div>
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

export default Suppliers;
