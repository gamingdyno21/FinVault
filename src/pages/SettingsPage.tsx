import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const SettingsPage = () => (
  <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-2xl">
    <motion.div variants={item}>
      <h1 className="page-title">Settings</h1>
      <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences.</p>
    </motion.div>

    {/* Profile */}
    <motion.div variants={item} className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <User className="w-5 h-5 text-primary" />
        <h3 className="section-title">Profile</h3>
      </div>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><Label>First Name</Label><Input defaultValue="Arjun" className="mt-1.5" /></div>
          <div><Label>Last Name</Label><Input defaultValue="Kumar" className="mt-1.5" /></div>
        </div>
        <div><Label>Email</Label><Input defaultValue="arjun.kumar@email.com" className="mt-1.5" /></div>
        <Button size="sm">Save Changes</Button>
      </div>
    </motion.div>

    {/* Security */}
    <motion.div variants={item} className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="section-title">Security</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Two-Factor Authentication</p>
            <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
          </div>
          <Switch />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Biometric Login</p>
            <p className="text-xs text-muted-foreground">Use fingerprint or face recognition</p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <Button variant="outline" size="sm">Change Password</Button>
      </div>
    </motion.div>

    {/* Notifications */}
    <motion.div variants={item} className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <Bell className="w-5 h-5 text-primary" />
        <h3 className="section-title">Notifications</h3>
      </div>
      <div className="space-y-4">
        {["Budget Alerts", "Transaction Notifications", "Weekly Reports", "Tax Reminders"].map((n) => (
          <div key={n} className="flex items-center justify-between">
            <p className="text-sm">{n}</p>
            <Switch defaultChecked />
          </div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

export default SettingsPage;
