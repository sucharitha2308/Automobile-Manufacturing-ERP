import React, { useState } from 'react';
import { Search, Plus, Filter, Users, FileCheck, Truck, ExternalLink } from 'lucide-react';

const mockSalesOrders = [
  { id: 'SO-1001', customer: 'Velocity Auto Group', amount: '$550,000', status: 'Processing', date: '2026-10-25', items: 10 },
  { id: 'SO-1002', customer: 'Global Motors Dealer', amount: '$1,260,000', status: 'Shipped', date: '2026-10-22', items: 30 },
  { id: 'SO-1003', customer: 'EcoDrive Dealership', amount: '$220,000', status: 'Delivered', date: '2026-10-18', items: 4 },
];

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sales & Customers</h2>
          <p className="text-foreground/60 text-sm mt-1">Manage customers, sales orders, and dispatches.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-background border border-border text-foreground px-4 py-2 rounded-lg hover:bg-border/50 transition-colors font-medium text-sm">
            <Users className="w-4 h-4" /> Customers
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
            <Plus className="w-4 h-4" /> New Sale
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
              placeholder="Search sales orders..."
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
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Quantity</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockSalesOrders
                .filter(so => so.id.toLowerCase().includes(searchTerm.toLowerCase()) || so.customer.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((so) => (
                <tr key={so.id} className="hover:bg-border/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-medium text-foreground">{so.id}</td>
                  <td className="px-6 py-4 font-medium">{so.customer}</td>
                  <td className="px-6 py-4">{so.date}</td>
                  <td className="px-6 py-4">{so.items} Cars</td>
                  <td className="px-6 py-4 font-medium">{so.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      so.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                      so.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                      'bg-green-500/10 text-green-500 border-green-500/20'
                    }`}>
                      {so.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-foreground/60 hover:text-primary hover:bg-primary/10 rounded inline-flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="w-4 h-4" />
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

export default Sales;
