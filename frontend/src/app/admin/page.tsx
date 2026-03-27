'use client';

import {
  HiArrowTrendingUp,
  HiBell,
  HiCurrencyDollar,
  HiEllipsisHorizontal,
  HiInboxStack,
  HiShoppingBag,
  HiUsers
} from 'react-icons/hi2';

// --- 1. Mock Data cho Dashboard ---
const STATS = [
  { label: 'Total Revenue', value: '$128,430', trend: '+12.5%', up: true, icon: HiCurrencyDollar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Active Orders', value: '432', trend: '+5.2%', up: true, icon: HiShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Customers', value: '2,845', trend: '-2.4%', up: false, icon: HiUsers, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Avg. Order Value', value: '$297', trend: '+1.1%', up: true, icon: HiArrowTrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const RECENT_SALES = [
  { id: '#8821', user: 'Alex Johnson', product: 'iPhone 15 Pro', amount: '$1,299', status: 'Completed' },
  { id: '#8820', user: 'Maria Garcia', product: 'MacBook Air M3', amount: '$999', status: 'Processing' },
  { id: '#8819', user: 'David Smith', product: 'AirPods Pro 2', amount: '$249', status: 'Completed' },
  { id: '#8818', user: 'James Wilson', product: 'iPad Pro 12.9', amount: '$1,099', status: 'Cancelled' },
];

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col p-1 overflow-hidden">

      {/* 1. Header Section */}
      <div className="shrink-0 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Command Center</h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mt-2">
            System Overview / <span className="text-blue-600 underline decoration-2 underline-offset-4">Real-time Data</span>
          </p>
        </div>

        <button className="relative p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:bg-gray-50 transition-all group">
          <HiBell size={24} className="text-gray-400 group-hover:text-gray-900" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
      </div>

      {/* 2. Top Stats Grid */}
      <div className="shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* 3. Main Dashboard Content (Scrollable) */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">

        {/* Left: Chart Placeholder & Insights */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">

          {/* Mock Chart Area */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm min-h-[350px] flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter italic">Sales Analytics</h3>
                <p className="text-xs font-bold text-gray-400">Revenue growth over the last 30 days</p>
              </div>
              <select className="bg-gray-50 border-none text-[10px] font-black uppercase py-2 px-4 rounded-xl outline-none cursor-pointer">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>

            {/* Visual Placeholder for a Chart */}
            <div className="flex-1 w-full flex items-end gap-3 pb-4">
              {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85, 40, 75].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div
                    style={{ height: `${h}%` }}
                    className={`w-full rounded-t-xl transition-all duration-500 cursor-pointer ${i === 7 ? 'bg-blue-600' : 'bg-gray-100 group-hover:bg-gray-200'}`}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${h}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-2 pt-4 border-t border-gray-50 text-[10px] font-black text-gray-300 uppercase tracking-widest">
              <span>Week 01</span>
              <span>Week 02</span>
              <span>Week 03</span>
              <span>Week 04</span>
            </div>
          </div>

          {/* Quick Tasks/Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-8 rounded-[40px] text-white">
              <HiInboxStack size={32} className="text-blue-400 mb-4" />
              <h4 className="text-xl font-black mb-2 leading-tight">Inventory Alert</h4>
              <p className="text-sm font-medium text-gray-400 italic">5 products are running low on stock. Please review suppliers.</p>
              <button className="mt-6 w-full py-3 bg-white text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-400 transition-colors">Check Now</button>
            </div>
            <div className="bg-blue-600 p-8 rounded-[40px] text-white">
              <HiArrowTrendingUp size={32} className="text-blue-200 mb-4" />
              <h4 className="text-xl font-black mb-2 leading-tight">Target Met</h4>
              <p className="text-sm font-medium text-blue-100 italic">Your monthly sales target has been achieved early! 🚀</p>
              <button className="mt-6 w-full py-3 bg-blue-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-900 transition-colors">View Reports</button>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity Table */}
        <div className="w-full lg:w-96 shrink-0 flex flex-col bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Recent Orders</h3>
            <button className="p-2 hover:bg-gray-50 rounded-xl transition-all"><HiEllipsisHorizontal size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
            {RECENT_SALES.map((order, i) => (
              <div key={i} className="p-4 rounded-[24px] border border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-blue-600">{order.id}</span>
                  <span className="text-sm font-black text-gray-900">{order.amount}</span>
                </div>
                <p className="text-sm font-black text-gray-900">{order.user}</p>
                <p className="text-[11px] font-bold text-gray-400 truncate">{order.product}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md 
                    ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                    {order.status}
                  </span>
                  <button className="text-[10px] font-black text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase underline decoration-2">Details</button>
                </div>
              </div>
            ))}
          </div>

          <button className="p-6 text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] hover:text-blue-600 transition-colors border-t border-gray-50 bg-gray-50/30">
            View All Transactions →
          </button>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 20px; }
      `}</style>
    </div>
  );
}
