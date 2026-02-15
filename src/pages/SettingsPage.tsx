import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Camera,
  Moon,
  Sun,
  Laptop
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } };

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
    bio: ""
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const name = parsedUser.name || "User";

      // Generate username from name if not present
      const generatedUsername = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

      // Generate bio from name if not present
      const generatedBio = `Financial enthusiast. Tracking expenses and planning for the future with ${name}'s portfolio.`;

      setUserData({
        name: name,
        email: parsedUser.email || "",
        username: parsedUser.username || generatedUsername,
        bio: parsedUser.bio || generatedBio
      });
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and set e-mail preferences.
        </p>
      </motion.div>

      <Tabs defaultValue="profile" className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <TabsList className="flex flex-row lg:flex-col justify-start h-auto w-full bg-transparent p-0 gap-2">
            <TabsTrigger
              value="profile"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground rounded-md transition-colors text-left"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground rounded-md transition-colors text-left"
            >
              <Shield className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground rounded-md transition-colors text-left"
            >
              <Palette className="w-4 h-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground rounded-md transition-colors text-left"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="display"
              className="w-full justify-start px-4 py-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground rounded-md transition-colors text-left"
            >
              <Globe className="w-4 h-4 mr-2" />
              Display
            </TabsTrigger>
          </TabsList>
        </aside>

        <div className="flex-1 lg:max-w-3xl">
          {/* PROFILE TAB */}
          <TabsContent value="profile" asChild>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    This is how others will see you on the site.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="w-24 h-24 border-2 border-border">
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                          {userData.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="w-full">
                        <Camera className="w-3 h-3 mr-2" />
                        Change
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4 w-full">
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={userData.username}
                          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                        <p className="text-[0.8rem] text-muted-foreground">
                          This is your public display name. It can be your real name or a pseudonym.
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={userData.bio}
                          onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                        />
                        <p className="text-[0.8rem] text-muted-foreground">
                          Brief description tailored for your financial profile.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => toast.success("Profile updated", { description: "Your profile information has been saved." })}>Save Profile</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ACCOUNT TAB */}
          <TabsContent value="account" asChild>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Update your account settings. Set your preferred language and timezone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="flex gap-2">
                      <Input id="password" type="password" value="********" disabled className="flex-1" />
                      <Button variant="outline">Change</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Security</h3>
                    <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-base">Two-factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Secure your account with 2FA.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-destructive">Danger Zone</h3>
                    <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-destructive">Delete Account</Label>
                        <p className="text-sm text-destructive/80">
                          Permanently delete your account and all of your content.
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">Delete Account</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => toast.success("Account updated", { description: "Your account settings have been saved." })}>Update Account</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* APPEARANCE TAB */}
          <TabsContent value="appearance" asChild>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize the look and feel of the application. Automatically switch between day and night themes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>

                    <div className="grid max-w-md grid-cols-3 gap-8 pt-2">
                      {/* Light Theme Option */}
                      <div className="space-y-2 cursor-pointer group" onClick={() => setTheme("light")}>
                        <div className={`items-center rounded-md border-2 p-1 hover:border-primary ${theme === 'light' ? 'border-primary' : 'border-muted'}`}>
                          <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                            <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Sun className="h-4 w-4" />
                          <span className="block text-sm font-medium">Light</span>
                        </div>
                      </div>

                      {/* Dark Theme Option */}
                      <div className="space-y-2 cursor-pointer group" onClick={() => setTheme("dark")}>
                        <div className={`items-center rounded-md border-2 p-1 hover:border-primary ${theme === 'dark' ? 'border-primary' : 'border-muted'}`}>
                          <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Moon className="h-4 w-4" />
                          <span className="block text-sm font-medium">Dark</span>
                        </div>
                      </div>

                      {/* System Theme Option */}
                      <div className="space-y-2 cursor-pointer group" onClick={() => setTheme("system")}>
                        <div className={`items-center rounded-md border-2 p-1 hover:border-primary ${theme === 'system' ? 'border-primary' : 'border-muted'}`}>
                          <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-[#ecedef] p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                            </div>
                            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                              <div className="h-4 w-4 rounded-full bg-slate-400" />
                              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Laptop className="h-4 w-4" />
                          <span className="block text-sm font-medium">System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => toast.success("Preferences updated", { description: "Your appearance settings have been saved." })}>Update Preferences</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" asChild>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="marketing" className="flex flex-col space-y-1">
                          <span>Marketing emails</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive emails about new products, features, and more.</span>
                        </Label>
                        <Switch id="marketing" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="social" className="flex flex-col space-y-1">
                          <span>Social emails</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive emails for friend requests, follows, and more.</span>
                        </Label>
                        <Switch id="social" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="security" className="flex flex-col space-y-1">
                          <span>Security emails</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive emails about your account security and activity.</span>
                        </Label>
                        <Switch id="security" defaultChecked disabled />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Push Notifications</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="push-everything" className="flex flex-col space-y-1">
                          <span>Everything</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive push notifications for all activity.</span>
                        </Label>
                        <Switch id="push-everything" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => toast.success("Preferences saved", { description: "Your notification settings have been saved." })}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* DISPLAY TAB */}
          <TabsContent value="display" asChild>
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Display</CardTitle>
                  <CardDescription>
                    Turn items on or off to control what's displayed in the app.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="currency">Preferred Currency</Label>
                    <Select defaultValue="inr">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inr">INR (₹) - Indian Rupee</SelectItem>
                        <SelectItem value="usd">USD ($) - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR (€) - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[0.8rem] text-muted-foreground">
                      This will convert all monetary values to your preferred currency.
                    </p>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label className="text-base">Show Tax Estimates</Label>
                      <p className="text-sm text-muted-foreground">
                        Display estimated tax liability on dashboard cards.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={() => toast.success("Display settings saved", { description: "Your display preferences have been updated." })}>Save Display Settings</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
