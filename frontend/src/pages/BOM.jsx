import React, { useState } from 'react';
import { Search, Plus, Filter, FileText, Settings, Layers, ChevronDown } from 'lucide-react';

const mockBOMs = [
  { id: 'BOM-EV01-V1', product: 'AutoFlow Model E (Electric Sedan)', version: 'v1.0', components: 124, cost: '$18,450', status: 'Active' },
  { id: 'BOM-SUV01-V2', product: 'AutoFlow X-Terra (SUV)', version: 'v2.1', components: 142, cost: '$15,200', status: 'Active' },
  { id: 'BOM-EV02-V1', product: 'AutoFlow Model S (Sports)', version: 'v1.0', components: 98, cost: '$22,100', status: 'Draft' },
];

const BOM = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bill of Materials (BOM)</h2>
          <p className="text-foreground/60 text-sm mt-1">Manage product structures and material requirements.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
          <Plus className="w-4 h-4" /> Create BOM
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
              placeholder="Search BOM by ID or product..."
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
                <th className="px-6 py-4 font-medium">BOM ID</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Version</th>
                <th className="px-6 py-4 font-medium">Components</th>
                <th className="px-6 py-4 font-medium">Est. Cost</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockBOMs
                .filter(bom => bom.id.toLowerCase().includes(searchTerm.toLowerCase()) || bom.product.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((bom) => (
                <React.Fragment key={bom.id}>
                  <tr className="hover:bg-border/30 transition-colors cursor-pointer group" onClick={() => setExpandedId(expandedId === bom.id ? null : bom.id)}>
                    <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedId === bom.id ? 'rotate-180' : ''}`} />
                      {bom.id}
                    </td>
                    <td className="px-6 py-4 font-medium">{bom.product}</td>
                    <td className="px-6 py-4">
                      <span className="bg-background border border-border px-2 py-0.5 rounded text-xs">{bom.version}</span>
                    </td>
                    <td className="px-6 py-4">{bom.components} parts</td>
                    <td className="px-6 py-4">{bom.cost}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        bom.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                      }`}>
                        {bom.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:underline font-medium text-sm mr-3">Edit</button>
                      <button className="text-primary hover:underline font-medium text-sm">Clone</button>
                    </td>
                  </tr>
                  
                  {expandedId === bom.id && (
                    <tr className="bg-background border-t border-border">
                      <td colSpan="7" className="px-6 py-4">
                        <div className="bg-card border border-border rounded-lg p-4">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-primary" /> Key Components
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="border border-border rounded p-3 text-sm">
                              <div className="font-medium text-foreground">High Tensile Steel Sheet</div>
                              <div className="text-foreground/60 text-xs mt-1">RM-001 • Qty: 850 kg</div>
                            </div>
                            <div className="border border-border rounded p-3 text-sm">
                              <div className="font-medium text-foreground">Engine Control Unit (ECU)</div>
                              <div className="text-foreground/60 text-xs mt-1">RM-002 • Qty: 1 pcs</div>
                            </div>
                            <div className="border border-border rounded p-3 text-sm">
                              <div className="font-medium text-foreground">Lithium-Ion Battery Cell</div>
                              <div className="text-foreground/60 text-xs mt-1">RM-003 • Qty: 400 pcs</div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button className="text-sm text-primary flex items-center gap-1 hover:underline">
                              <FileText className="w-4 h-4" /> View Full BOM
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BOM;
