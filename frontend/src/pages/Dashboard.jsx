import React from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, production: 2400 },
  { name: 'Feb', revenue: 3000, production: 1398 },
  { name: 'Mar', revenue: 2000, production: 9800 },
  { name: 'Apr', revenue: 2780, production: 3908 },
  { name: 'May', revenue: 1890, production: 4800 },
  { name: 'Jun', revenue: 2390, production: 3800 },
  { name: 'Jul', revenue: 3490, production: 4300 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue }) => (
  <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-foreground/60">{title}</p>
        <h3 className="text-2xl font-bold text-foreground mt-2">{value}</h3>
      </div>
      <div className="p-3 bg-primary/10 rounded-lg text-primary">
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`flex items-center font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        {trendValue}
      </span>
      <span className="text-foreground/50 ml-2">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$2.4M" 
          icon={DollarSign} 
          trend="up" 
          trendValue="12.5%" 
        />
        <StatCard 
          title="Active Orders" 
          value="142" 
          icon={ShoppingCart} 
          trend="up" 
          trendValue="8.2%" 
        />
        <StatCard 
          title="Production Volume" 
          value="1,240 Units" 
          icon={TrendingUp} 
          trend="down" 
          trendValue="3.1%" 
        />
        <StatCard 
          title="Total Employees" 
          value="3,492" 
          icon={Users} 
          trend="up" 
          trendValue="1.2%" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-foreground/60 text-xs" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" className="text-foreground/60 text-xs" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Production Chart */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4">Production vs Target</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-foreground/60 text-xs" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" className="text-foreground/60 text-xs" tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'var(--border)', opacity: 0.4}}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)', borderRadius: '8px' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="production" name="Actual Production" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="revenue" name="Target Production" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">Recent Production Orders</h3>
          <button className="text-sm text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-foreground/80">
            <thead className="text-xs text-foreground/60 uppercase bg-background border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Target Date</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { id: 'PO-10024', product: 'AutoFlow Model E', status: 'In Progress', date: 'Oct 24, 2026', color: 'bg-blue-500/10 text-blue-500' },
                { id: 'PO-10023', product: 'AutoFlow X-Terra', status: 'Completed', date: 'Oct 22, 2026', color: 'bg-green-500/10 text-green-500' },
                { id: 'PO-10022', product: 'AutoFlow Model E', status: 'Planned', date: 'Oct 28, 2026', color: 'bg-yellow-500/10 text-yellow-500' },
                { id: 'PO-10021', product: 'AutoFlow X-Terra', status: 'Rejected', date: 'Oct 20, 2026', color: 'bg-red-500/10 text-red-500' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-border/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{row.id}</td>
                  <td className="px-6 py-4">{row.product}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium">Details</button>
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

export default Dashboard;
