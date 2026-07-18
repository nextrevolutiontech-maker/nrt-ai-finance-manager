import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard, FileText, Receipt, DollarSign, CreditCard,
  Users, Truck, BookOpen, TrendingUp, BarChart3, FileBarChart,
  Calculator, Bell, Settings, LogOut, Search, Plus, ChevronDown,
  ChevronRight, Menu, X, Sparkles, Send, Mic, MessageSquare,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle, AlertCircle,
  XCircle, Download, Printer, Mail, MoreHorizontal, Filter,
  Eye, Edit2, Trash2, Copy, Star, Building2, RefreshCw,
  Zap, TrendingDown, PieChart, Activity, Calendar, Tag,
  Upload, ChevronLeft, Check, Info, Phone, Globe, MapPin,
  Package, Hash, Percent, Banknote, Wallet, Target, Award,
  CircleDot, FileCheck, PlayCircle, StopCircle, PauseCircle, Bot
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell, Legend
} from "recharts";

// ─── Data ────────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 51000, expenses: 31000, profit: 20000 },
  { month: "Mar", revenue: 47000, expenses: 29500, profit: 17500 },
  { month: "Apr", revenue: 63000, expenses: 35000, profit: 28000 },
  { month: "May", revenue: 58000, expenses: 32000, profit: 26000 },
  { month: "Jun", revenue: 71000, expenses: 38000, profit: 33000 },
  { month: "Jul", revenue: 68000, expenses: 36000, profit: 32000 },
  { month: "Aug", revenue: 79000, expenses: 41000, profit: 38000 },
];

const cashFlowData = [
  { week: "W1", inflow: 18000, outflow: 12000 },
  { week: "W2", inflow: 22000, outflow: 15000 },
  { week: "W3", inflow: 16000, outflow: 18000 },
  { week: "W4", inflow: 28000, outflow: 14000 },
  { week: "W5", inflow: 24000, outflow: 16000 },
  { week: "W6", inflow: 31000, outflow: 19000 },
];

const expenseBreakdown = [
  { name: "Operations", value: 38, color: "#1B5E20" },
  { name: "Marketing", value: 22, color: "#2E7D32" },
  { name: "Payroll", value: 28, color: "#7C3AED" },
  { name: "Software", value: 8, color: "#F59E0B" },
  { name: "Other", value: 4, color: "#3B82F6" },
];

const invoices = [
  { id: "INV-2024-001", customer: "Acme Corporation", amount: 12500, date: "2024-08-01", due: "2024-08-31", status: "paid" },
  { id: "INV-2024-002", customer: "TechStart Ltd", amount: 8750, date: "2024-08-05", due: "2024-09-04", status: "pending" },
  { id: "INV-2024-003", customer: "Global Ventures", amount: 23100, date: "2024-07-20", due: "2024-08-19", status: "overdue" },
  { id: "INV-2024-004", customer: "BuildRight Co", amount: 5400, date: "2024-08-10", due: "2024-09-09", status: "pending" },
  { id: "INV-2024-005", customer: "Nova Systems", amount: 18200, date: "2024-07-28", due: "2024-08-27", status: "overdue" },
  { id: "INV-2024-006", customer: "Meridian Group", amount: 9600, date: "2024-08-12", due: "2024-09-11", status: "draft" },
  { id: "INV-2024-007", customer: "Apex Digital", amount: 14800, date: "2024-08-08", due: "2024-09-07", status: "paid" },
  { id: "INV-2024-008", customer: "Sunrise Retail", amount: 6200, date: "2024-08-14", due: "2024-09-13", status: "pending" },
];

const customers = [
  { id: 1, name: "Acme Corporation", contact: "James Wilson", email: "james@acme.com", outstanding: 0, total: 48200, invoices: 12, status: "active" },
  { id: 2, name: "TechStart Ltd", contact: "Sarah Chen", email: "sarah@techstart.com", outstanding: 8750, total: 32100, invoices: 8, status: "active" },
  { id: 3, name: "Global Ventures", contact: "Michael Torres", email: "m.torres@globalv.com", outstanding: 23100, total: 67400, invoices: 15, status: "active" },
  { id: 4, name: "BuildRight Co", contact: "Emma Davis", email: "emma@buildright.com", outstanding: 5400, total: 21800, invoices: 6, status: "active" },
  { id: 5, name: "Nova Systems", contact: "Alex Kumar", email: "alex@novasys.com", outstanding: 18200, total: 54300, invoices: 11, status: "inactive" },
];

const expenses = [
  { id: 1, description: "AWS Cloud Services", category: "Software", amount: 2840, date: "2024-08-01", status: "approved", receipt: true },
  { id: 2, description: "Office Supplies Q3", category: "Operations", amount: 640, date: "2024-08-03", status: "approved", receipt: true },
  { id: 3, description: "Google Ads Campaign", category: "Marketing", amount: 4200, date: "2024-08-05", status: "pending", receipt: false },
  { id: 4, description: "Team Lunch Meeting", category: "Operations", amount: 380, date: "2024-08-07", status: "approved", receipt: true },
  { id: 5, description: "Legal Consultation", category: "Operations", amount: 1800, date: "2024-08-09", status: "pending", receipt: false },
  { id: 6, description: "LinkedIn Premium (10 seats)", category: "Software", amount: 1200, date: "2024-08-10", status: "approved", receipt: true },
  { id: 7, description: "Freelance Designer", category: "Marketing", amount: 2500, date: "2024-08-12", status: "rejected", receipt: true },
];

const transactions = [
  { id: 1, desc: "Payment from Acme Corp", type: "credit", amount: 12500, date: "Aug 14", category: "Invoice" },
  { id: 2, desc: "AWS Services Invoice", type: "debit", amount: 2840, date: "Aug 13", category: "Software" },
  { id: 3, desc: "Google Ads", type: "debit", amount: 4200, date: "Aug 12", category: "Marketing" },
  { id: 4, desc: "Payment from Apex Digital", type: "credit", amount: 14800, date: "Aug 11", category: "Invoice" },
  { id: 5, desc: "Office Rent Q3", type: "debit", amount: 6500, date: "Aug 10", category: "Operations" },
];

const aiMessages = [
  {
    role: "assistant",
    content: "Good morning! I've reviewed your finances. You have 3 overdue invoices totaling **$41,300** that need immediate attention. Would you like me to send payment reminders?",
    time: "9:02 AM",
    actions: ["Send Reminders", "View Invoices", "Dismiss"],
  },
  {
    role: "user",
    content: "Yes, send reminders to all overdue customers.",
    time: "9:04 AM",
  },
  {
    role: "assistant",
    content: "Done. Reminders sent to Global Ventures and Nova Systems. I also noticed your August expenses are 12% higher than last month — mainly driven by marketing spend. Want me to generate a detailed breakdown?",
    time: "9:04 AM",
    actions: ["Generate Report", "View Expenses"],
  },
];

const aiSuggestions = [
  { icon: FileText, label: "Create invoice", color: "#1B5E20" },
  { icon: Receipt, label: "Add expense", color: "#1B5E20" },
  { icon: FileCheck, label: "Generate quotation", color: "#1B5E20" },
  { icon: TrendingUp, label: "Show cash flow", color: "#7C3AED" },
  { icon: BarChart3, label: "Analyze expenses", color: "#7C3AED" },
  { icon: AlertCircle, label: "Overdue invoices", color: "#EF4444" },
  { icon: FileBarChart, label: "Daily summary", color: "#7C3AED" },
  { icon: Bell, label: "Create reminder", color: "#F59E0B" },
];

const aiInsights = [
  { title: "Revenue Up 11%", desc: "vs. last month", trend: "up", value: "+$8,200", color: "#16A34A" },
  { title: "3 Overdue Invoices", desc: "$41,300 at risk", trend: "down", value: "Action needed", color: "#EF4444" },
  { title: "Cash Runway", desc: "at current burn rate", trend: "up", value: "~5.2 months", color: "#3B82F6" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "divider1", divider: true, label: "Finance" },
  { id: "invoices", label: "Invoices", icon: FileText, badge: "3" },
  { id: "quotations", label: "Quotations", icon: FileCheck },
  { id: "expenses", label: "Expenses", icon: Receipt },
  { id: "income", label: "Income", icon: DollarSign },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "divider2", divider: true, label: "Relationships" },
  { id: "customers", label: "Customers", icon: Users },
  { id: "suppliers", label: "Suppliers", icon: Truck },
  { id: "customer-ledger", label: "Customer Ledger", icon: BookOpen },
  { id: "supplier-ledger", label: "Supplier Ledger", icon: BookOpen },
  { id: "divider3", divider: true, label: "Analytics" },
  { id: "cash-flow", label: "Cash Flow", icon: TrendingUp },
  { id: "profit-loss", label: "Profit & Loss", icon: BarChart3 },
  { id: "reports", label: "Financial Reports", icon: FileBarChart },
  { id: "tax", label: "Tax Management", icon: Calculator },
  { id: "divider4", divider: true, label: "Tools" },
  { id: "reminders", label: "Payment Reminders", icon: Bell },
  { id: "ai-assistant", label: "AI Finance Assistant", icon: Sparkles, ai: true },
  { id: "divider5", divider: true, label: "Account" },
  { id: "notifications", label: "Notifications", icon: Bell, badge: "5" },
  { id: "settings", label: "Settings", icon: Settings },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    paid: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    overdue: "bg-red-50 text-red-700 border-red-200",
    draft: "bg-gray-100 text-gray-600 border-gray-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    active: "bg-green-50 text-green-700 border-green-200",
    inactive: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${map[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const colors = ["#1B5E20", "#2E7D32", "#7C3AED", "#3B82F6", "#F59E0B", "#EF4444"];
  const c = colors[name.charCodeAt(0) % colors.length];
  const sz = size === "sm" ? "w-7 h-7 text-xs" : size === "lg" ? "w-10 h-10 text-base" : "w-8 h-8 text-sm";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0`} style={{ backgroundColor: c }}>
      {name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-3 shadow-lg text-sm">
        <p className="font-medium text-[#111827] mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {fmt(p.value)}</p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ active, setActive, collapsed, setCollapsed }: {
  active: string; setActive: (id: string) => void;
  collapsed: boolean; setCollapsed: (v: boolean) => void;
}) {
  return (
    <aside className={`h-full bg-white border-r border-[#E5E7EB] flex flex-col transition-all duration-300 flex-shrink-0 ${collapsed ? "w-16" : "w-60"}`}>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-[#E5E7EB] ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 rounded-lg bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
          <Banknote className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>NRT AI</div>
            <div className="text-[10px] text-[#6B7280] font-medium -mt-0.5">Finance Manager</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-[#6B7280] hover:text-[#111827] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Workspace switcher */}
      {!collapsed && (
        <div className="mx-3 mt-3">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] transition-colors text-left">
            <div className="w-5 h-5 rounded bg-[#1B5E20] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-medium text-[#111827] flex-1 truncate">Acme Corp</span>
            <ChevronDown className="w-3 h-3 text-[#6B7280]" />
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-hide">
        {navItems.map((item) => {
          if ("divider" in item && item.divider) {
            return collapsed ? (
              <div key={item.id} className="my-2 border-t border-[#E5E7EB]" />
            ) : (
              <div key={item.id} className="px-3 pt-4 pb-1">
                <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider">{item.label}</span>
              </div>
            );
          }
          const Icon = item.icon as any;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all group relative ${
                isActive
                  ? item.ai ? "bg-purple-50 text-purple-700" : "bg-[#E8F5E9] text-[#1B5E20]"
                  : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? (item.ai ? "text-purple-600" : "text-[#1B5E20]") : ""}`} />
              {!collapsed && (
                <>
                  <span className={`text-sm font-medium flex-1 ${item.ai ? "bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text" : ""} ${item.ai && !isActive ? "text-transparent" : ""}`}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] font-bold bg-red-100 text-red-600 rounded-full px-1.5 py-0.5 min-w-[18px] text-center">{item.badge}</span>
                  )}
                </>
              )}
              {isActive && <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-l-full ${item.ai ? "bg-purple-500" : "bg-[#1B5E20]"}`} />}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-[#E5E7EB]">
        {!collapsed ? (
          <div className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#F9FAFB] cursor-pointer transition-colors">
            <Avatar name="Marcus Reid" size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#111827] truncate">Marcus Reid</div>
              <div className="text-[10px] text-[#6B7280] truncate">Finance Director</div>
            </div>
            <LogOut className="w-3.5 h-3.5 text-[#9CA3AF] hover:text-red-500 transition-colors" />
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar name="Marcus Reid" size="sm" />
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Top Bar ─────────────────────────────────────────────────────────────────

function TopBar({ title, setActive }: { title: string; setActive: (id: string) => void }) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-[#E5E7EB] flex items-center gap-4 px-6 flex-shrink-0">
      <div className="flex-1">
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-1.5 w-80">
            <Search className="w-4 h-4 text-[#9CA3AF]" />
            <input autoFocus className="bg-transparent text-sm outline-none flex-1 text-[#111827] placeholder-[#9CA3AF]" placeholder="Search invoices, customers..." onBlur={() => setSearchOpen(false)} />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{title}</h1>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button onClick={() => setSearchOpen(true)} className="p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827] transition-colors">
          <Search className="w-4 h-4" />
        </button>

        {/* AI Status */}
        <button onClick={() => setActive("ai-assistant")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-medium transition-colors border border-purple-100">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
          AI Active
        </button>

        {/* Quick Create */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-xs font-medium transition-colors ml-1">
          <Plus className="w-3.5 h-3.5" />
          Create
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827] transition-colors ml-1">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        <Avatar name="Marcus Reid" size="sm" />
      </div>
    </header>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, trend, trendVal, icon: Icon, iconColor, iconBg }: any) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
        </div>
        {trend && (
          <span className={`text-xs font-semibold flex items-center gap-0.5 ${trend === "up" ? "text-green-600" : "text-red-500"}`}>
            {trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trendVal}
          </span>
        )}
      </div>
      <div className="text-[22px] font-bold text-[#111827] leading-none mb-1" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{value}</div>
      <div className="text-xs text-[#6B7280]">{label}</div>
      {sub && <div className="text-[11px] text-[#9CA3AF] mt-0.5">{sub}</div>}
    </div>
  );
}

function Dashboard({ setActive }: { setActive: (id: string) => void }) {
  const [cashPeriod, setCashPeriod] = useState("monthly");

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* AI Insight Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4.5 h-4.5 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-purple-900">AI Insight — August 14, 2024</div>
          <div className="text-xs text-purple-700 mt-0.5">3 invoices are overdue ($41,300). August revenue is on track to hit $79K (+11% MoM). Cash runway is healthy at 5.2 months.</div>
        </div>
        <button onClick={() => setActive("ai-assistant")} className="text-xs font-medium text-purple-700 hover:text-purple-900 flex items-center gap-1 whitespace-nowrap bg-purple-100 hover:bg-purple-200 rounded-lg px-3 py-1.5 transition-colors">
          Ask AI <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Total Revenue" value="$79,000" sub="August 2024" trend="up" trendVal="11%" icon={TrendingUp} iconColor="text-green-700" iconBg="bg-green-50" />
        <StatCard label="Total Expenses" value="$41,000" sub="August 2024" trend="down" trendVal="4%" icon={Receipt} iconColor="text-red-500" iconBg="bg-red-50" />
        <StatCard label="Net Profit" value="$38,000" sub="48.1% margin" trend="up" trendVal="18%" icon={DollarSign} iconColor="text-[#1B5E20]" iconBg="bg-[#E8F5E9]" />
        <StatCard label="Cash Balance" value="$124,500" sub="Across all accounts" icon={Wallet} iconColor="text-blue-600" iconBg="bg-blue-50" />
        <StatCard label="Outstanding Invoices" value="$55,050" sub="11 invoices" trend="down" trendVal="2" icon={FileText} iconColor="text-amber-600" iconBg="bg-amber-50" />
        <StatCard label="Pending Payments" value="$18,400" sub="5 suppliers" icon={CreditCard} iconColor="text-purple-600" iconBg="bg-purple-50" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#111827]">Revenue vs Expenses</h3>
              <p className="text-xs text-[#6B7280]">Jan – Aug 2024</p>
            </div>
            <button className="text-xs text-[#6B7280] hover:text-[#111827] flex items-center gap-1 border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#1B5E20" strokeWidth={2} fill="url(#rev)" name="Revenue" dot={false} />
              <Area type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={1.5} fill="url(#exp)" name="Expenses" dot={false} strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-[#111827]">Expense Breakdown</h3>
            <p className="text-xs text-[#6B7280]">August 2024</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <RechartsPie>
              <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v: any) => `${v}%`} />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {expenseBreakdown.map(e => (
              <div key={e.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: e.color }} />
                  <span className="text-xs text-[#6B7280]">{e.name}</span>
                </div>
                <span className="text-xs font-semibold text-[#111827]">{e.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Cash Flow */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-[#111827]">Cash Flow</h3>
              <p className="text-xs text-[#6B7280]">Weekly view</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={cashFlowData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="inflow" fill="#1B5E20" radius={[3, 3, 0, 0]} name="Inflow" />
              <Bar dataKey="outflow" fill="#E5E7EB" radius={[3, 3, 0, 0]} name="Outflow" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#111827]">Recent Transactions</h3>
            <button className="text-xs text-[#1B5E20] font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {transactions.map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${t.type === "credit" ? "bg-green-50" : "bg-red-50"}`}>
                  {t.type === "credit" ? <ArrowDownRight className="w-3.5 h-3.5 text-green-600" /> : <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-[#111827] truncate">{t.desc}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{t.date} · {t.category}</div>
                </div>
                <span className={`text-xs font-semibold ${t.type === "credit" ? "text-green-600" : "text-red-500"}`}>
                  {t.type === "credit" ? "+" : "-"}{fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers + Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#111827]">Top Customers</h3>
              <button onClick={() => setActive("customers")} className="text-xs text-[#1B5E20] font-medium hover:underline">View all</button>
            </div>
            <div className="space-y-2.5">
              {customers.slice(0, 3).map(c => (
                <div key={c.id} className="flex items-center gap-2.5">
                  <Avatar name={c.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#111827] truncate">{c.name}</div>
                    <div className="text-[10px] text-[#9CA3AF]">{c.invoices} invoices</div>
                  </div>
                  <span className="text-xs font-semibold text-[#111827]">{fmt(c.total)}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "New Invoice", icon: FileText, page: "invoices" },
                { label: "Add Expense", icon: Receipt, page: "expenses" },
                { label: "Ask AI", icon: Sparkles, page: "ai-assistant", ai: true },
                { label: "Reports", icon: BarChart3, page: "reports" },
              ].map(a => (
                <button key={a.label} onClick={() => setActive(a.page)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${a.ai ? "bg-purple-50 border-purple-100 text-purple-700 hover:bg-purple-100" : "bg-[#F8FAFC] border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6]"}`}>
                  <a.icon className="w-3.5 h-3.5" />
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Invoices ─────────────────────────────────────────────────────────────────

function Invoices() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filtered = invoices.filter(inv => {
    const matchFilter = filter === "all" || inv.status === filter;
    const matchSearch = inv.customer.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const tabs = [
    { id: "all", label: "All", count: invoices.length },
    { id: "paid", label: "Paid", count: invoices.filter(i => i.status === "paid").length },
    { id: "pending", label: "Pending", count: invoices.filter(i => i.status === "pending").length },
    { id: "overdue", label: "Overdue", count: invoices.filter(i => i.status === "overdue").length },
    { id: "draft", label: "Draft", count: invoices.filter(i => i.status === "draft").length },
  ];

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-[#6B7280]">Manage and track all your invoices</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> New Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Outstanding", value: fmt(invoices.filter(i => i.status !== "paid").reduce((s, i) => s + i.amount, 0)), color: "text-[#111827]" },
          { label: "Overdue Amount", value: fmt(invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.amount, 0)), color: "text-red-600" },
          { label: "Paid This Month", value: fmt(invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0)), color: "text-green-700" },
          { label: "Draft Invoices", value: fmt(invoices.filter(i => i.status === "draft").reduce((s, i) => s + i.amount, 0)), color: "text-[#6B7280]" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
            <div className={`text-lg font-bold ${s.color}`} style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.value}</div>
            <div className="text-xs text-[#6B7280] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        {/* Filters */}
        <div className="flex items-center gap-4 px-5 py-3 border-b border-[#E5E7EB]">
          <div className="flex gap-0.5">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setFilter(t.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${filter === t.id ? "bg-[#E8F5E9] text-[#1B5E20]" : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB]"}`}>
                {t.label}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${filter === t.id ? "bg-[#1B5E20] text-white" : "bg-[#F3F4F6] text-[#6B7280]"}`}>{t.count}</span>
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-1.5">
              <Search className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="bg-transparent text-xs outline-none text-[#111827] placeholder-[#9CA3AF] w-32" />
            </div>
            <button className="p-1.5 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
              {["Invoice", "Customer", "Amount", "Date", "Due Date", "Status", ""].map(h => (
                <th key={h} className="text-left text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider px-5 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => (
              <tr key={inv.id} className={`border-b border-[#F3F4F6] hover:bg-[#F8FAFC] transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-mono font-medium text-[#1B5E20]">{inv.id}</span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={inv.customer} size="sm" />
                    <span className="text-sm text-[#111827] font-medium">{inv.customer}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-[#111827]">{fmt(inv.amount)}</td>
                <td className="px-5 py-3.5 text-xs text-[#6B7280]">{inv.date}</td>
                <td className="px-5 py-3.5 text-xs text-[#6B7280]">{inv.due}</td>
                <td className="px-5 py-3.5"><StatusBadge status={inv.status} /></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#1B5E20] transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#111827] transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#111827] transition-colors"><MoreHorizontal className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#E5E7EB]">
          <span className="text-xs text-[#6B7280]">Showing {filtered.length} of {invoices.length} invoices</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded-lg border border-[#E5E7EB] text-xs text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">Previous</button>
            <button className="px-3 py-1 rounded-lg bg-[#1B5E20] text-white text-xs font-medium">1</button>
            <button className="px-3 py-1 rounded-lg border border-[#E5E7EB] text-xs text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">2</button>
            <button className="px-3 py-1 rounded-lg border border-[#E5E7EB] text-xs text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">Next</button>
          </div>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-base font-semibold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Create Invoice</h2>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Customer", placeholder: "Select or search customer", type: "text" },
                { label: "Invoice Number", placeholder: "INV-2024-009", type: "text" },
                { label: "Issue Date", placeholder: "", type: "date" },
                { label: "Due Date", placeholder: "", type: "date" },
                { label: "Amount", placeholder: "0.00", type: "number" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm text-[#111827] bg-[#F9FAFB] focus:outline-none focus:border-[#1B5E20] focus:bg-white transition-colors placeholder-[#9CA3AF]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5">Notes</label>
                <textarea rows={3} className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm text-[#111827] bg-[#F9FAFB] focus:outline-none focus:border-[#1B5E20] focus:bg-white transition-colors placeholder-[#9CA3AF] resize-none" placeholder="Optional notes or payment terms..." />
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[#E5E7EB]">
              <button onClick={() => setShowCreate(false)} className="flex-1 border border-[#E5E7EB] rounded-xl py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">Cancel</button>
              <button className="flex-1 bg-[#1B5E20] hover:bg-[#2E7D32] text-white rounded-xl py-2.5 text-sm font-medium transition-colors">Create Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AI Assistant ─────────────────────────────────────────────────────────────

function AIAssistant() {
  const [messages, setMessages] = useState(aiMessages);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("chat");
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input, time: "Now" }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I'm analyzing that for you now. Based on your current financial data, I can see several opportunities to optimize. Would you like me to generate a detailed report or take action directly?",
        time: "Now",
        actions: ["Generate Report", "Take Action"],
      }]);
    }, 900);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-4 pb-0 border-b border-[#E5E7EB] bg-white">
          {[
            { id: "chat", label: "Chat", icon: MessageSquare },
            { id: "tasks", label: "Recent Tasks", icon: CheckCircle },
            { id: "insights", label: "Finance Insights", icon: TrendingUp },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${tab === t.id ? "border-purple-500 text-purple-700" : "border-transparent text-[#6B7280] hover:text-[#111827]"}`}>
              <t.icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "chat" && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#F8FAFC]">
              {/* AI Identity Header */}
              <div className="flex items-center gap-3 bg-white rounded-2xl border border-purple-100 p-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>NRT Finance AI</div>
                  <div className="text-xs text-[#6B7280]">Your AI Finance Manager · Always monitoring · Ready to help</div>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online
                </div>
              </div>

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {msg.role === "assistant" ? (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <Avatar name="Marcus Reid" size="sm" />
                  )}
                  <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : ""} flex flex-col gap-1.5`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "assistant" ? "bg-white border border-[#E5E7EB] text-[#111827]" : "bg-[#1B5E20] text-white"}`}>
                      <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] px-1">{msg.time}</span>
                    {msg.role === "assistant" && (msg as any).actions && (
                      <div className="flex flex-wrap gap-2 mt-0.5">
                        {(msg as any).actions.map((a: string) => (
                          <button key={a} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-200 text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors">{a}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-6 py-3 bg-white border-t border-[#E5E7EB]">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {aiSuggestions.map(s => (
                  <button key={s.label} onClick={() => setInput(s.label)} className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-xl border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 transition-colors flex-shrink-0">
                    <s.icon className="w-3 h-3" style={{ color: s.color }} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-6 py-4 bg-white border-t border-[#E5E7EB]">
              <div className="flex items-end gap-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl px-4 py-3 focus-within:border-purple-300 focus-within:bg-white transition-colors">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Ask your AI Finance Manager anything..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9CA3AF] outline-none resize-none leading-relaxed"
                  style={{ maxHeight: 120 }}
                />
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-purple-500 transition-colors"><Mic className="w-4 h-4" /></button>
                  <button onClick={send} className={`p-2 rounded-xl transition-colors ${input.trim() ? "bg-[#1B5E20] text-white hover:bg-[#2E7D32]" : "bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed"}`}>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "tasks" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-[#F8FAFC]">
            {[
              { task: "Sent payment reminders to 3 overdue customers", time: "9:04 AM", status: "done", icon: Mail },
              { task: "Generated August expense report", time: "Yesterday", status: "done", icon: FileBarChart },
              { task: "Reconciled bank statement for July", time: "Aug 12", status: "done", icon: CheckCircle },
              { task: "Flagged 2 duplicate expenses for review", time: "Aug 11", status: "review", icon: AlertCircle },
              { task: "Scheduled quarterly tax report generation", time: "Aug 10", status: "scheduled", icon: Calendar },
              { task: "Updated customer payment terms for Global Ventures", time: "Aug 8", status: "done", icon: Users },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#E5E7EB] p-4 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${t.status === "done" ? "bg-green-50" : t.status === "review" ? "bg-amber-50" : "bg-purple-50"}`}>
                  <t.icon className={`w-4 h-4 ${t.status === "done" ? "text-green-600" : t.status === "review" ? "text-amber-600" : "text-purple-600"}`} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#111827]">{t.task}</div>
                  <div className="text-xs text-[#9CA3AF] mt-0.5">{t.time}</div>
                </div>
                <StatusBadge status={t.status === "done" ? "paid" : t.status === "review" ? "pending" : "draft"} />
              </div>
            ))}
          </div>
        )}

        {tab === "insights" && (
          <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {aiInsights.map(ins => (
                <div key={ins.title} className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                  <div className="text-sm font-semibold text-[#111827] mb-1">{ins.title}</div>
                  <div className="text-xl font-bold mb-1" style={{ color: ins.color, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{ins.value}</div>
                  <div className="text-xs text-[#6B7280]">{ins.desc}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-semibold text-[#111827]">AI Recommendations</h3>
              </div>
              <div className="space-y-3">
                {[
                  { rec: "Follow up on Global Ventures ($23,100) — 25 days overdue. Send a formal notice.", priority: "high" },
                  { rec: "August marketing spend is 22% above budget. Consider pausing non-essential campaigns.", priority: "medium" },
                  { rec: "Recurring AWS invoice due Sept 1. Ensure sufficient balance to avoid disruption.", priority: "low" },
                  { rec: "3 customers have invoices older than 90 days. Consider writing off or escalating.", priority: "high" },
                ].map((r, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${r.priority === "high" ? "border-red-100 bg-red-50" : r.priority === "medium" ? "border-amber-100 bg-amber-50" : "border-blue-100 bg-blue-50"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${r.priority === "high" ? "bg-red-500" : r.priority === "medium" ? "bg-amber-500" : "bg-blue-500"}`} />
                    <span className="text-xs text-[#374151]">{r.rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Side Panel */}
      <div className="w-72 border-l border-[#E5E7EB] bg-white flex flex-col overflow-y-auto flex-shrink-0 hidden xl:flex">
        <div className="p-5 border-b border-[#E5E7EB]">
          <h3 className="text-sm font-semibold text-[#111827] mb-3">Quick Commands</h3>
          <div className="space-y-1.5">
            {aiSuggestions.map(s => (
              <button key={s.label} onClick={() => setInput(s.label)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-[#374151] hover:bg-[#F8FAFC] border border-transparent hover:border-[#E5E7EB] transition-colors text-left">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                  <s.icon className="w-3 h-3" style={{ color: s.color }} />
                </div>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-sm font-semibold text-[#111827] mb-3">Context Awareness</h3>
          <div className="space-y-2.5">
            {[
              { label: "Active invoices", value: "8", color: "text-[#1B5E20]" },
              { label: "Overdue alerts", value: "3", color: "text-red-600" },
              { label: "Pending approvals", value: "5", color: "text-amber-600" },
              { label: "Cash balance", value: "$124.5K", color: "text-blue-600" },
              { label: "Monthly runway", value: "5.2 mo", color: "text-purple-600" },
            ].map(c => (
              <div key={c.label} className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">{c.label}</span>
                <span className={`text-xs font-semibold ${c.color}`}>{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Expenses ─────────────────────────────────────────────────────────────────

function Expenses() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#6B7280]">Track and manage all business expenses</p>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Expense
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total August", value: "$13,560", trend: "+12%", up: false },
          { label: "Approved", value: "$9,060", trend: "67%", up: true },
          { label: "Pending", value: "$6,000", trend: "2 items", up: false },
          { label: "Rejected", value: "$2,500", trend: "1 item", up: false },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className="text-lg font-bold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.value}</div>
            <div className="text-xs text-[#6B7280] mt-0.5">{s.label}</div>
            <div className={`text-xs font-medium mt-1 ${s.up ? "text-green-600" : "text-[#6B7280]"}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-1.5 flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <input placeholder="Search expenses..." className="bg-transparent text-xs outline-none text-[#111827] placeholder-[#9CA3AF]" />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs text-[#6B7280] hover:bg-[#F3F4F6] transition-colors">
            <Filter className="w-3 h-3" /> Filter by Category
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              {["Description", "Category", "Amount", "Date", "Receipt", "Status", ""].map(h => (
                <th key={h} className="text-left text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider px-5 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, i) => (
              <tr key={exp.id} className={`border-b border-[#F3F4F6] hover:bg-[#F8FAFC] transition-colors ${i === expenses.length - 1 ? "border-b-0" : ""}`}>
                <td className="px-5 py-3.5 text-sm text-[#111827] font-medium">{exp.description}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-[#F3F4F6] text-[#374151] font-medium">{exp.category}</span>
                </td>
                <td className="px-5 py-3.5 text-sm font-semibold text-[#111827]">{fmt(exp.amount)}</td>
                <td className="px-5 py-3.5 text-xs text-[#6B7280]">{exp.date}</td>
                <td className="px-5 py-3.5">
                  {exp.receipt
                    ? <span className="flex items-center gap-1 text-xs text-green-700"><CheckCircle className="w-3 h-3" /> Attached</span>
                    : <span className="flex items-center gap-1 text-xs text-[#9CA3AF]"><AlertCircle className="w-3 h-3" /> Missing</span>}
                </td>
                <td className="px-5 py-3.5"><StatusBadge status={exp.status} /></td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#111827] transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-[#9CA3AF] hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAdd(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-base font-semibold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Add Expense</h2>
              <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: "Description", placeholder: "e.g. AWS Services" },
                { label: "Amount ($)", placeholder: "0.00" },
                { label: "Date", placeholder: "" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm bg-[#F9FAFB] focus:outline-none focus:border-[#1B5E20] transition-colors placeholder-[#9CA3AF]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5">Category</label>
                <select className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm bg-[#F9FAFB] focus:outline-none focus:border-[#1B5E20] transition-colors text-[#111827]">
                  {["Operations", "Marketing", "Software", "Payroll", "Travel", "Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#374151] mb-1.5">Upload Receipt</label>
                <div className="border-2 border-dashed border-[#E5E7EB] rounded-xl p-4 text-center hover:border-[#1B5E20] hover:bg-[#F0FDF4] transition-colors cursor-pointer">
                  <Upload className="w-5 h-5 text-[#9CA3AF] mx-auto mb-1.5" />
                  <div className="text-xs text-[#6B7280]">Drop file here or <span className="text-[#1B5E20] font-medium">browse</span></div>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[#E5E7EB]">
              <button onClick={() => setShowAdd(false)} className="flex-1 border border-[#E5E7EB] rounded-xl py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">Cancel</button>
              <button className="flex-1 bg-[#1B5E20] hover:bg-[#2E7D32] text-white rounded-xl py-2.5 text-sm font-medium transition-colors">Save Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Customers ────────────────────────────────────────────────────────────────

function Customers() {
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#6B7280]">Manage customer relationships and balances</p>
        <button className="flex items-center gap-2 bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Customers", value: "47", icon: Users },
          { label: "Outstanding Balance", value: "$55,450", icon: DollarSign },
          { label: "Active This Month", value: "23", icon: Activity },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#E5E7EB] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
              <s.icon className="w-4.5 h-4.5 text-[#1B5E20]" />
            </div>
            <div>
              <div className="text-xl font-bold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.value}</div>
              <div className="text-xs text-[#6B7280]">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 py-1.5">
            <Search className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <input placeholder="Search customers..." className="bg-transparent text-xs outline-none w-40 text-[#111827] placeholder-[#9CA3AF]" />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E5E7EB]">
              {["Customer", "Contact", "Outstanding", "Total Billed", "Invoices", "Status", ""].map(h => (
                <th key={h} className="text-left text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider px-5 py-2.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={c.id} className={`border-b border-[#F3F4F6] hover:bg-[#F8FAFC] transition-colors cursor-pointer ${i === customers.length - 1 ? "border-b-0" : ""}`} onClick={() => setSelected(c)}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} />
                    <div>
                      <div className="text-sm font-medium text-[#111827]">{c.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="text-xs text-[#374151]">{c.contact}</div>
                  <div className="text-[10px] text-[#9CA3AF]">{c.email}</div>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`text-sm font-semibold ${c.outstanding > 0 ? "text-amber-600" : "text-green-600"}`}>{fmt(c.outstanding)}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-[#111827] font-medium">{fmt(c.total)}</td>
                <td className="px-5 py-3.5 text-sm text-[#374151]">{c.invoices}</td>
                <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                <td className="px-5 py-3.5">
                  <button className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#111827] transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <Avatar name={selected.name} size="lg" />
                <div>
                  <h2 className="text-base font-semibold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{selected.name}</h2>
                  <p className="text-xs text-[#6B7280]">{selected.contact} · {selected.email}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-[#F3F4F6] text-[#6B7280] transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 border-b border-[#E5E7EB]">
              {[
                { label: "Total Billed", value: fmt(selected.total) },
                { label: "Outstanding", value: fmt(selected.outstanding), color: selected.outstanding > 0 ? "text-amber-600" : "text-green-600" },
                { label: "Invoices", value: String(selected.invoices) },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className={`text-xl font-bold ${s.color || "text-[#111827]"}`} style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.value}</div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="p-6">
              <h3 className="text-sm font-semibold text-[#111827] mb-3">Recent Invoices</h3>
              <div className="space-y-2">
                {invoices.filter(inv => inv.customer.includes(selected.name.split(" ")[0])).slice(0, 3).map(inv => (
                  <div key={inv.id} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                    <div>
                      <div className="text-xs font-medium text-[#1B5E20]">{inv.id}</div>
                      <div className="text-[10px] text-[#9CA3AF]">{inv.date}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-[#111827]">{fmt(inv.amount)}</span>
                      <StatusBadge status={inv.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-[#E5E7EB]">
              <button className="flex-1 border border-[#E5E7EB] rounded-xl py-2 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors flex items-center justify-center gap-2"><Mail className="w-4 h-4" /> Email</button>
              <button className="flex-1 bg-[#1B5E20] hover:bg-[#2E7D32] text-white rounded-xl py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"><FileText className="w-4 h-4" /> New Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Cash Flow ─────────────────────────────────────────────────────────────────

function CashFlow() {
  const [period, setPeriod] = useState("weekly");

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#6B7280]">Monitor inflows, outflows and financial forecast</p>
        <div className="flex items-center gap-1 bg-[#F3F4F6] rounded-xl p-1">
          {["daily", "weekly", "monthly"].map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${period === p ? "bg-white text-[#1B5E20] shadow-sm" : "text-[#6B7280]"}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Inflow", value: "$139,000", sub: "This period", color: "text-green-700", bg: "bg-green-50" },
          { label: "Total Outflow", value: "$94,000", sub: "This period", color: "text-red-600", bg: "bg-red-50" },
          { label: "Net Cash Flow", value: "+$45,000", sub: "Positive trend", color: "text-[#1B5E20]", bg: "bg-[#E8F5E9]" },
          { label: "Cash Balance", value: "$124,500", sub: "As of today", color: "text-blue-600", bg: "bg-blue-50" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#E5E7EB] p-4">
            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
              <Activity className={`w-4 h-4 ${s.color}`} />
            </div>
            <div className={`text-lg font-bold ${s.color}`} style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{s.value}</div>
            <div className="text-xs text-[#6B7280] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#111827]">Cash Flow Chart</h3>
            <div className="flex items-center gap-4 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#1B5E20] inline-block rounded" /> Inflow</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-red-400 inline-block rounded" /> Outflow</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={cashFlowData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1B5E20" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="inflow" stroke="#1B5E20" strokeWidth={2} fill="url(#inflowGrad)" name="Inflow" dot={{ fill: "#1B5E20", r: 3 }} />
              <Area type="monotone" dataKey="outflow" stroke="#EF4444" strokeWidth={2} fill="url(#outflowGrad)" name="Outflow" dot={{ fill: "#EF4444", r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">Upcoming Receivables</h3>
            <div className="space-y-2.5">
              {invoices.filter(i => i.status === "pending").slice(0, 3).map(inv => (
                <div key={inv.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-[#111827]">{inv.customer}</div>
                    <div className="text-[10px] text-[#9CA3AF]">Due {inv.due}</div>
                  </div>
                  <span className="text-sm font-semibold text-green-700">{fmt(inv.amount)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
            <h3 className="text-sm font-semibold text-[#111827] mb-3">Upcoming Payments</h3>
            <div className="space-y-2.5">
              {[
                { name: "AWS Cloud Services", due: "Sep 1", amount: 2840 },
                { name: "Office Rent Q4", due: "Sep 1", amount: 6500 },
                { name: "LinkedIn Premium", due: "Sep 10", amount: 1200 },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-[#111827]">{p.name}</div>
                    <div className="text-[10px] text-[#9CA3AF]">Due {p.due}</div>
                  </div>
                  <span className="text-sm font-semibold text-red-600">-{fmt(p.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────

function Reports() {
  const reportTypes = [
    { id: "sales", label: "Sales Report", icon: TrendingUp, desc: "Revenue by customer, product, and period", color: "bg-green-50 text-[#1B5E20]" },
    { id: "expense", label: "Expense Report", icon: Receipt, desc: "All expenses by category and date", color: "bg-red-50 text-red-600" },
    { id: "profit", label: "Profit & Loss", icon: BarChart3, desc: "P&L statement for any period", color: "bg-blue-50 text-blue-600" },
    { id: "cashflow", label: "Cash Flow Report", icon: Activity, desc: "Cash inflow and outflow analysis", color: "bg-[#E8F5E9] text-[#1B5E20]" },
    { id: "ledger", label: "Ledger Report", icon: BookOpen, desc: "Full transaction ledger", color: "bg-amber-50 text-amber-600" },
    { id: "tax", label: "Tax Report", icon: Calculator, desc: "Tax summary and obligations", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="p-6 max-w-[1200px]">
      <p className="text-sm text-[#6B7280] mb-6">Generate, export, and analyze financial reports</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
        {reportTypes.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 hover:shadow-sm transition-shadow cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl ${r.color} flex items-center justify-center mb-4`}>
              <r.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-[#111827] mb-1">{r.label}</h3>
            <p className="text-xs text-[#6B7280] mb-4">{r.desc}</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:border-[#1B5E20] hover:text-[#1B5E20] transition-colors">
                <Eye className="w-3 h-3" /> Preview
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:border-[#1B5E20] hover:text-[#1B5E20] transition-colors">
                <Download className="w-3 h-3" /> Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick P&L Summary */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-[#111827]">Profit & Loss Summary</h3>
            <p className="text-xs text-[#6B7280]">January – August 2024</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">
              <Download className="w-3 h-3" /> PDF
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">
              <Download className="w-3 h-3" /> Excel
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={revenueData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="#1B5E20" radius={[4, 4, 0, 0]} name="Revenue" />
            <Bar dataKey="expenses" fill="#E5E7EB" radius={[4, 4, 0, 0]} name="Expenses" />
            <Bar dataKey="profit" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    { id: "company", label: "Company", icon: Building2 },
    { id: "profile", label: "Profile", icon: Users },
    { id: "security", label: "Security", icon: CheckCircle },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "integrations", label: "Integrations", icon: Zap },
  ];

  return (
    <div className="p-6 max-w-[900px]">
      <p className="text-sm text-[#6B7280] mb-6">Manage your account, company, and preferences</p>
      <div className="flex gap-6">
        <div className="w-44 flex-shrink-0">
          <nav className="space-y-0.5">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-left transition-colors ${activeTab === t.id ? "bg-[#E8F5E9] text-[#1B5E20]" : "text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]"}`}>
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-1">
          {activeTab === "company" && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-5">
              <h3 className="text-base font-semibold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Company Information</h3>
              {[
                { label: "Company Name", value: "Acme Corporation" },
                { label: "Business Email", value: "finance@acme.com" },
                { label: "Phone Number", value: "+1 (555) 123-4567" },
                { label: "Website", value: "https://acme.com" },
                { label: "Tax ID / EIN", value: "12-3456789" },
                { label: "Business Address", value: "123 Main St, San Francisco, CA 94102" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">{f.label}</label>
                  <input defaultValue={f.value} className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm text-[#111827] bg-[#F9FAFB] focus:outline-none focus:border-[#1B5E20] transition-colors" />
                </div>
              ))}
              <div className="pt-2">
                <button className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">Save Changes</button>
              </div>
            </div>
          )}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-5">
              <h3 className="text-base font-semibold text-[#111827]" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>Your Profile</h3>
              <div className="flex items-center gap-4">
                <Avatar name="Marcus Reid" size="lg" />
                <button className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">Change Photo</button>
              </div>
              {[
                { label: "Full Name", value: "Marcus Reid" },
                { label: "Job Title", value: "Finance Director" },
                { label: "Email", value: "marcus@acme.com" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-[#374151] mb-1.5">{f.label}</label>
                  <input defaultValue={f.value} className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-sm text-[#111827] bg-[#F9FAFB] focus:outline-none focus:border-[#1B5E20] transition-colors" />
                </div>
              ))}
              <button className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">Save Profile</button>
            </div>
          )}
          {(activeTab === "security" || activeTab === "notifications" || activeTab === "billing" || activeTab === "integrations") && (
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <h3 className="text-base font-semibold text-[#111827] mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                {tabs.find(t => t.id === activeTab)?.label}
              </h3>
              <div className="space-y-4">
                {activeTab === "security" && [
                  "Two-Factor Authentication", "Change Password", "Active Sessions", "API Keys"
                ].map(item => (
                  <div key={item} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                    <span className="text-sm text-[#374151]">{item}</span>
                    <button className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">Configure</button>
                  </div>
                ))}
                {activeTab === "notifications" && [
                  { label: "Invoice reminders", enabled: true },
                  { label: "Payment received", enabled: true },
                  { label: "Overdue alerts", enabled: true },
                  { label: "AI insights", enabled: false },
                  { label: "Weekly summary", enabled: true },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between py-2.5 border-b border-[#F3F4F6] last:border-0">
                    <span className="text-sm text-[#374151]">{n.label}</span>
                    <div className={`w-9 h-5 rounded-full transition-colors cursor-pointer relative ${n.enabled ? "bg-[#1B5E20]" : "bg-[#D1D5DB]"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${n.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                  </div>
                ))}
                {activeTab === "integrations" && [
                  { name: "Stripe", desc: "Payment processing", connected: true },
                  { name: "QuickBooks", desc: "Accounting sync", connected: false },
                  { name: "Slack", desc: "Team notifications", connected: true },
                  { name: "Xero", desc: "Accounting platform", connected: false },
                ].map(int => (
                  <div key={int.name} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                    <div>
                      <div className="text-sm font-medium text-[#111827]">{int.name}</div>
                      <div className="text-xs text-[#6B7280]">{int.desc}</div>
                    </div>
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${int.connected ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" : "bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] hover:border-[#1B5E20] hover:text-[#1B5E20]"}`}>
                      {int.connected ? "Connected" : "Connect"}
                    </button>
                  </div>
                ))}
                {activeTab === "billing" && (
                  <div className="space-y-4">
                    <div className="bg-[#E8F5E9] border border-green-200 rounded-xl p-4">
                      <div className="text-sm font-semibold text-[#1B5E20]">Pro Plan — $49/month</div>
                      <div className="text-xs text-green-700 mt-0.5">Renews on September 1, 2024</div>
                    </div>
                    <button className="w-full border border-[#E5E7EB] rounded-xl py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">View Invoices & Payment History</button>
                    <button className="w-full border border-[#E5E7EB] rounded-xl py-2.5 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors">Upgrade Plan</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Generic Placeholder Pages ────────────────────────────────────────────────

function PlaceholderPage({ title, desc, icon: Icon }: { title: string; desc: string; icon: any }) {
  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-[#E8F5E9] rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Icon className="w-7 h-7 text-[#1B5E20]" />
        </div>
        <h2 className="text-xl font-semibold text-[#111827] mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>{title}</h2>
        <p className="text-sm text-[#6B7280] mb-6">{desc}</p>
        <button className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Get Started
        </button>
      </div>
    </div>
  );
}

// ─── Page Title Map ───────────────────────────────────────────────────────────

const titles: Record<string, string> = {
  dashboard: "Dashboard",
  invoices: "Invoices",
  quotations: "Quotations",
  expenses: "Expenses",
  income: "Income",
  payments: "Payments",
  customers: "Customers",
  suppliers: "Suppliers",
  "customer-ledger": "Customer Ledger",
  "supplier-ledger": "Supplier Ledger",
  "cash-flow": "Cash Flow",
  "profit-loss": "Profit & Loss",
  reports: "Financial Reports",
  tax: "Tax Management",
  reminders: "Payment Reminders",
  "ai-assistant": "AI Finance Assistant",
  notifications: "Notifications",
  settings: "Settings",
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  const renderPage = () => {
    switch (active) {
      case "dashboard": return <Dashboard setActive={setActive} />;
      case "invoices": return <Invoices />;
      case "expenses": return <Expenses />;
      case "customers": return <Customers />;
      case "cash-flow": return <CashFlow />;
      case "reports": return <Reports />;
      case "profit-loss": return <Reports />;
      case "ai-assistant": return <AIAssistant />;
      case "settings": return <SettingsPage />;
      case "quotations": return <PlaceholderPage title="Quotations" desc="Create and manage quotations, convert to invoices with one click." icon={FileCheck} />;
      case "income": return <PlaceholderPage title="Income" desc="Track all income sources and generate income reports." icon={DollarSign} />;
      case "payments": return <PlaceholderPage title="Payments" desc="Monitor incoming and outgoing payments across all channels." icon={CreditCard} />;
      case "suppliers": return <PlaceholderPage title="Suppliers" desc="Manage supplier relationships, bills, and payment history." icon={Truck} />;
      case "customer-ledger": return <PlaceholderPage title="Customer Ledger" desc="Full transaction timeline and statement for each customer." icon={BookOpen} />;
      case "supplier-ledger": return <PlaceholderPage title="Supplier Ledger" desc="Full transaction timeline and statement for each supplier." icon={BookOpen} />;
      case "tax": return <PlaceholderPage title="Tax Management" desc="Manage tax rules, categories, and generate tax reports." icon={Calculator} />;
      case "reminders": return <PlaceholderPage title="Payment Reminders" desc="Schedule and automate payment reminders for customers." icon={Bell} />;
      case "notifications": return <PlaceholderPage title="Notifications" desc="View and manage all your real-time notifications and alerts." icon={Bell} />;
      default: return <Dashboard setActive={setActive} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar title={titles[active] || "Dashboard"} setActive={setActive} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
