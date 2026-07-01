import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  Archive, 
  Truck, 
  Settings,
  Bell,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  Wrench,
  FileText,
  BarChart3
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Suppliers', path: '/suppliers', icon: Truck },
    { name: 'Raw Materials', path: '/materials', icon: Archive },
    { name: 'Procurement', path: '/procurement', icon: ShoppingCart },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Production', path: '/production', icon: Wrench },
    { name: 'BOM', path: '/bom', icon: FileText },
    { name: 'Sales', path: '/sales', icon: Users },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <span className="text-xl font-bold text-primary flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" /> AutoFlow ERP
          </span>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-foreground hover:bg-border/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-card border-b border-border z-40">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-foreground mr-4"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-foreground hidden sm:block">
              {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-border/50 text-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-border/50 text-foreground"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full hover:bg-border/50 border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium hidden sm:block text-foreground">{user?.name}</span>
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 hidden group-hover:block border border-border">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-foreground/60">{user?.role}</p>
                </div>
                <button 
                  onClick={logout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-border/50"
                >
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
