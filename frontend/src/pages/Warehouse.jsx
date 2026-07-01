import React from 'react';
import { Warehouse as WarehouseIcon, MapPin, Box, ArrowRight } from 'lucide-react';

const mockWarehouses = [
  { id: 'WH-01', name: 'Main Assembly Warehouse', location: 'Detroit, MI', capacity: '50,000 m³', utilized: '85%', status: 'Operational' },
  { id: 'WH-02', name: 'Electronics Storage', location: 'San Jose, CA', capacity: '10,000 m³', utilized: '60%', status: 'Operational' },
  { id: 'WH-03', name: 'Plastics & Trim', location: 'Austin, TX', capacity: '20,000 m³', utilized: '92%', status: 'Near Capacity' },
];

const WarehouseCard = ({ warehouse }) => (
  <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-lg text-primary">
          <WarehouseIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-lg">{warehouse.name}</h3>
          <p className="text-foreground/60 text-sm flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5" /> {warehouse.location}
          </p>
        </div>
      </div>
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
        warehouse.status === 'Operational' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      }`}>
        {warehouse.status}
      </span>
    </div>
    
    <div className="space-y-4 mt-6">
      <div>
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-foreground/60 font-medium">Capacity Utilization</span>
          <span className="font-bold text-foreground">{warehouse.utilized}</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${parseInt(warehouse.utilized) > 90 ? 'bg-red-500' : 'bg-primary'}`} 
            style={{ width: warehouse.utilized }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-foreground/60 text-xs uppercase font-medium mb-1">Total Capacity</p>
          <p className="font-semibold text-foreground flex items-center gap-1.5">
            <Box className="w-4 h-4 text-primary" /> {warehouse.capacity}
          </p>
        </div>
        <div className="flex justify-end items-end">
          <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            View Details <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Warehouse = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Warehouses</h2>
          <p className="text-foreground/60 text-sm mt-1">Manage storage locations and capacity.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm">
          <WarehouseIcon className="w-4 h-4" /> Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWarehouses.map(wh => (
          <WarehouseCard key={wh.id} warehouse={wh} />
        ))}
      </div>
    </div>
  );
};

export default Warehouse;
