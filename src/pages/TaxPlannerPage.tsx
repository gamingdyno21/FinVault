import { motion } from "framer-motion";
import { Calculator, IndianRupee, TrendingDown, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const regimeComparison = [
  { slab: "0-3L", old: 0, new: 0 },
  { slab: "3-6L", old: 25000, new: 15000 },
  { slab: "6-9L", old: 65000, new: 30000 },
  { slab: "9-12L", old: 115000, new: 60000 },
  { slab: "12-15L", old: 175000, new: 100000 },
];

const deductions = [
  { section: "80C", description: "PPF, ELSS, LIC, EPF", limit: 150000, used: 135000 },
  { section: "80D", description: "Health Insurance Premium", limit: 50000, used: 32000 },
  { section: "HRA", description: "House Rent Allowance", limit: 180000, used: 180000 },
  { section: "80CCD(1B)", description: "NPS Additional", limit: 50000, used: 50000 },
  { section: "24(b)", description: "Home Loan Interest", limit: 200000, used: 0 },
];

const taxSuggestions = [
  { title: "Invest in ELSS Funds", savings: "₹46,800", description: "You can save up to ₹46,800 in taxes by investing ₹1.5L in ELSS mutual funds under Section 80C." },
  { title: "NPS Contribution", savings: "₹15,600", description: "Additional ₹50,000 deduction under 80CCD(1B) by investing in National Pension System." },
  { title: "Health Insurance", savings: "₹5,616", description: "Get ₹18,000 more deduction under 80D by getting comprehensive health cover for parents." },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const TaxPlannerPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
    <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="page-title">Tax Planner</h1>
        <p className="text-muted-foreground text-sm mt-1">Plan and optimize your taxes for FY 2025-26.</p>
      </div>
      <Button variant="outline"><FileDown className="w-4 h-4 mr-2" /> Download Summary</Button>
    </motion.div>

    <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="glass-card p-5">
        <p className="stat-label">Gross Income</p>
        <p className="stat-value">₹13,56,000</p>
      </div>
      <div className="glass-card p-5">
        <p className="stat-label">Total Deductions</p>
        <p className="stat-value text-accent">₹3,97,000</p>
      </div>
      <div className="glass-card p-5">
        <p className="stat-label">Estimated Tax (Old)</p>
        <p className="stat-value text-warning">₹1,44,300</p>
      </div>
    </motion.div>

    {/* Regime Comparison */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="section-title mb-4">Old vs New Tax Regime</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={regimeComparison}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="slab" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.5rem", fontSize: "0.875rem" }} formatter={(v: number) => [`₹${v.toLocaleString()}`, ""]} />
          <Legend />
          <Bar dataKey="old" name="Old Regime" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="new" name="New Regime" fill="hsl(158, 64%, 52%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 glass-card p-4 border-primary/20">
        <p className="text-sm font-medium text-primary">💡 Recommendation: Old Regime saves you ₹23,400 more with your current deductions.</p>
      </div>
    </motion.div>

    {/* Deductions */}
    <motion.div variants={item} className="glass-card p-5">
      <h3 className="section-title mb-4">Deduction Tracker</h3>
      <div className="space-y-5">
        {deductions.map((d) => (
          <div key={d.section}>
            <div className="flex justify-between text-sm mb-1.5">
              <div>
                <span className="font-medium">{d.section}</span>
                <span className="text-muted-foreground ml-2">— {d.description}</span>
              </div>
              <span className="text-muted-foreground">₹{d.used.toLocaleString()} / ₹{d.limit.toLocaleString()}</span>
            </div>
            <Progress value={(d.used / d.limit) * 100} className="h-2" />
          </div>
        ))}
      </div>
    </motion.div>

    {/* Suggestions */}
    <motion.div variants={item}>
      <h3 className="section-title mb-4">Tax-Saving Suggestions</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {taxSuggestions.map((s) => (
          <div key={s.title} className="glass-card-hover p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold">{s.title}</span>
            </div>
            <p className="text-2xl font-bold text-accent mb-2">{s.savings}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default TaxPlannerPage;
