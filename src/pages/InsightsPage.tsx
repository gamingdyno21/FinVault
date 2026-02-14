import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, Brain, ArrowRight } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const spendingPrediction = [
  { month: "Oct", actual: 52000, predicted: null },
  { month: "Nov", actual: 55000, predicted: null },
  { month: "Dec", actual: 68000, predicted: null },
  { month: "Jan", actual: 54000, predicted: null },
  { month: "Feb", actual: 48000, predicted: 51000 },
  { month: "Mar", actual: null, predicted: 53000 },
  { month: "Apr", actual: null, predicted: 56000 },
];

const insights = [
  {
    type: "alert",
    icon: AlertTriangle,
    title: "Overspending on Food",
    description: "Your food expenses are 32% higher than last month. Consider meal planning to reduce costs.",
    color: "warning",
  },
  {
    type: "tip",
    icon: TrendingUp,
    title: "Investment Opportunity",
    description: "Your savings rate is 52%. Consider allocating an extra ₹10,000/month to SIP for higher returns.",
    color: "accent",
  },
  {
    type: "tip",
    icon: TrendingDown,
    title: "Subscription Audit",
    description: "You have 5 active subscriptions totaling ₹3,200/month. 2 haven't been used in 30 days.",
    color: "primary",
  },
  {
    type: "alert",
    icon: Brain,
    title: "Budget Optimization",
    description: "Redirecting ₹5,000 from shopping to your Emergency Fund goal would help you reach it 3 months sooner.",
    color: "accent",
  },
];

const patterns = [
  { category: "Most spent", value: "Housing (₹25,000)", trend: "stable" },
  { category: "Fastest growing", value: "Food (+32%)", trend: "up" },
  { category: "Biggest saving", value: "Transport (-18%)", trend: "down" },
  { category: "Average daily", value: "₹1,800/day", trend: "stable" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const InsightsPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    <motion.div variants={item}>
      <h1 className="page-title">AI Insights</h1>
      <p className="text-muted-foreground text-sm mt-1">Smart analysis and predictions powered by AI.</p>
    </motion.div>

    {/* Prediction Chart */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="section-title mb-1">Expense Prediction</h3>
      <p className="text-xs text-muted-foreground mb-4">Dashed line shows AI-predicted spending for upcoming months.</p>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={spendingPrediction}>
          <defs>
            <linearGradient id="actualG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", fontSize: "0.875rem" }} formatter={(v: number | null) => v ? [`₹${v.toLocaleString()}`, ""] : ["-", ""]} />
          <Area type="monotone" dataKey="actual" stroke="hsl(199, 89%, 48%)" fill="url(#actualG)" strokeWidth={2} name="Actual" />
          <Area type="monotone" dataKey="predicted" stroke="hsl(158, 64%, 52%)" fill="none" strokeWidth={2} strokeDasharray="8 4" name="Predicted" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>

    {/* Patterns */}
    <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {patterns.map((p) => (
        <div key={p.category} className="glass-card p-4">
          <p className="text-xs text-muted-foreground mb-1">{p.category}</p>
          <p className="text-sm font-semibold">{p.value}</p>
        </div>
      ))}
    </motion.div>

    {/* Insights */}
    <motion.div variants={item}>
      <h3 className="section-title mb-4">Smart Recommendations</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {insights.map((insight, i) => (
          <motion.div key={i} variants={item} className="glass-card-hover p-5">
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-${insight.color}/10`}>
                <insight.icon className={`w-5 h-5 text-${insight.color}`} />
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1">{insight.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default InsightsPage;
