import React from 'react';
import { FileText, Download, TrendingUp, DollarSign, Package, Box } from 'lucide-react';

const ReportCard = ({ title, description, icon: Icon, colorClass }) => (
  <div className="bg-card rounded-xl border border-border shadow-sm p-6 hover:shadow-md transition-shadow group cursor-pointer">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
      <button className="text-foreground/40 hover:text-primary transition-colors">
        <Download className="w-5 h-5" />
      </button>
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-foreground/60">{description}</p>
    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-sm">
      <span className="text-foreground/50">Updated today</span>
      <span className="text-primary font-medium hover:underline">View Report</span>
    </div>
  </div>
);

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-foreground/60 text-sm mt-1">Download and view comprehensive business reports.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard 
          title="Financial Summary" 
          description="Detailed breakdown of revenue, expenses, and profit margins across all product lines."
          icon={DollarSign}
          colorClass="bg-green-500/10 text-green-500"
        />
        <ReportCard 
          title="Production Efficiency" 
          description="OEE metrics, downtime analysis, and work center performance over the last 30 days."
          icon={TrendingUp}
          colorClass="bg-blue-500/10 text-blue-500"
        />
        <ReportCard 
          title="Inventory Valuation" 
          description="Current stock levels and valuation by warehouse and material category."
          icon={Package}
          colorClass="bg-purple-500/10 text-purple-500"
        />
        <ReportCard 
          title="Supplier Performance" 
          description="Delivery times, defect rates, and overall ratings for all active suppliers."
          icon={FileText}
          colorClass="bg-yellow-500/10 text-yellow-500"
        />
        <ReportCard 
          title="Sales Pipeline" 
          description="Open sales orders, projected dispatch dates, and customer acquisition metrics."
          icon={Box}
          colorClass="bg-red-500/10 text-red-500"
        />
      </div>
    </div>
  );
};

export default Reports;
