import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";

const holdings = [
  { name: "HDFC Bank", type: "Stock", invested: 150000, current: 185000, change: 23.3 },
  { name: "Nifty 50 Index Fund", type: "Mutual Fund", invested: 200000, current: 238000, change: 19.0 },
  { name: "Bitcoin", type: "Crypto", invested: 50000, current: 42000, change: -16.0 },
  { name: "Reliance Industries", type: "Stock", invested: 120000, current: 142000, change: 18.3 },
  { name: "SBI Bluechip Fund", type: "Mutual Fund", invested: 100000, current: 118000, change: 18.0 },
  { name: "Ethereum", type: "Crypto", invested: 30000, current: 35000, change: 16.7 },
  { name: "Infosys", type: "Stock", invested: 80000, current: 72000, change: -10.0 },
];

const allocation = [
  { name: "Stocks", value: 399000, color: "hsl(199, 89%, 48%)" },
  { name: "Mutual Funds", value: 356000, color: "hsl(158, 64%, 52%)" },
  { name: "Crypto", value: 77000, color: "hsl(262, 83%, 58%)" },
];

const portfolioHistory = [
  { month: "Sep", value: 680000 },
  { month: "Oct", value: 710000 },
  { month: "Nov", value: 695000 },
  { month: "Dec", value: 750000 },
  { month: "Jan", value: 790000 },
  { month: "Feb", value: 832000 },
];

const totalInvested = holdings.reduce((s, h) => s + h.invested, 0);
const totalCurrent = holdings.reduce((s, h) => s + h.current, 0);
const totalReturn = ((totalCurrent - totalInvested) / totalInvested * 100).toFixed(1);

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const InvestmentsPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    <motion.div variants={item}>
      <h1 className="page-title">Investments</h1>
      <p className="text-muted-foreground text-sm mt-1">Monitor your portfolio performance and allocation.</p>
    </motion.div>

    <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="glass-card p-5">
        <p className="stat-label">Total Invested</p>
        <p className="stat-value">₹{totalInvested.toLocaleString()}</p>
      </div>
      <div className="glass-card p-5">
        <p className="stat-label">Current Value</p>
        <p className="stat-value text-accent">₹{totalCurrent.toLocaleString()}</p>
      </div>
      <div className="glass-card p-5">
        <p className="stat-label">Total Returns</p>
        <p className={`stat-value ${Number(totalReturn) >= 0 ? "text-accent" : "text-destructive"}`}>
          {Number(totalReturn) >= 0 ? "+" : ""}{totalReturn}%
        </p>
      </div>
    </motion.div>

    <div className="grid lg:grid-cols-3 gap-6">
      <motion.div variants={item} className="lg:col-span-2 glass-card p-5">
        <h3 className="section-title mb-4">Portfolio Growth</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={portfolioHistory}>
            <defs>
              <linearGradient id="portGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v / 100000}L`} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", fontSize: "0.875rem" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
            <Area type="monotone" dataKey="value" stroke="hsl(199, 89%, 48%)" fill="url(#portGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div variants={item} className="glass-card p-5">
        <h3 className="section-title mb-4">Allocation</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={allocation} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
              {allocation.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", fontSize: "0.875rem" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 mt-2">
          {allocation.map((a) => (
            <div key={a.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }} />
                <span className="text-muted-foreground">{a.name}</span>
              </div>
              <span className="font-medium">₹{a.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    <motion.div variants={item} className="glass-card">
      <div className="p-4 border-b border-border/50">
        <h3 className="section-title">Holdings</h3>
      </div>
      <div className="divide-y divide-border/50">
        {holdings.map((h) => (
          <div key={h.name} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${h.change >= 0 ? "bg-accent/10" : "bg-destructive/10"}`}>
                {h.change >= 0 ? <TrendingUp className="w-5 h-5 text-accent" /> : <TrendingDown className="w-5 h-5 text-destructive" />}
              </div>
              <div>
                <p className="text-sm font-medium">{h.name}</p>
                <p className="text-xs text-muted-foreground">{h.type} · Invested ₹{h.invested.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">₹{h.current.toLocaleString()}</p>
              <p className={`text-xs font-medium ${h.change >= 0 ? "text-accent" : "text-destructive"}`}>
                {h.change >= 0 ? "+" : ""}{h.change}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default InvestmentsPage;
