import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Clock, 
  DollarSign,
  FileText,
  Upload,
  Edit3,
  Eye,
  Zap,
  Target,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  Search,
  Plus,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  Sparkles,
  Building2,
  Globe,
  Shield,
  Award
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const ModernDashboard = () => {
  const navigate = useNavigate()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: "Active Leads",
      value: "47",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Pipeline Value",
      value: "₹2.4M",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Avg. Quote Time",
      value: "4.2 min",
      change: "-23%",
      trend: "down",
      icon: Clock,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Conversion Rate",
      value: "68%",
      change: "+5%",
      trend: "up",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ]

  const quickActions = [
    {
      title: "New Lead",
      description: "Capture customer requirements",
      icon: Plus,
      color: "from-blue-600 to-purple-600",
      action: () => navigate('/lead-capture'),
      primary: true
    },
    {
      title: "Upload Requirements",
      description: "Process Excel/CSV files",
      icon: Upload,
      color: "from-green-600 to-emerald-600",
      action: () => navigate('/requirements?mode=upload')
    },
    {
      title: "Manual Entry",
      description: "Interactive requirement builder",
      icon: Edit3,
      color: "from-purple-600 to-pink-600",
      action: () => navigate('/requirements?mode=manual')
    },
    {
      title: "View Inventory",
      description: "Customer cloud resources",
      icon: Eye,
      color: "from-orange-600 to-red-600",
      action: () => navigate('/inventory')
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: "quote_generated",
      customer: "TechCorp Solutions",
      value: "₹45,000/month",
      time: "2 hours ago",
      status: "pending",
      priority: "high"
    },
    {
      id: 2,
      type: "requirements_uploaded",
      customer: "Digital Innovations Ltd",
      value: "₹1,20,000/month",
      time: "4 hours ago",
      status: "processing",
      priority: "medium"
    },
    {
      id: 3,
      type: "quote_approved",
      customer: "StartupXYZ",
      value: "₹75,000/month",
      time: "6 hours ago",
      status: "approved",
      priority: "low"
    },
    {
      id: 4,
      type: "new_lead",
      customer: "Enterprise Corp",
      value: "₹32,000/month",
      time: "1 day ago",
      status: "new",
      priority: "high"
    }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'quote_generated': return FileText
      case 'requirements_uploaded': return Upload
      case 'quote_approved': return Award
      case 'new_lead': return Users
      default: return FileText
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'new': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sify Cloud Portal</h1>
                <p className="text-sm text-gray-600">Lead to Order Management</p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads, customers..."
                  className="pl-10 w-64 bg-white/50 border-white/20 focus:bg-white focus:border-blue-300"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}! 👋
              </h2>
              <p className="text-gray-600">
                Ready to convert leads into orders? Here's your pipeline overview.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-lg font-semibold text-gray-900">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-gray-600">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm font-medium ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Start your lead-to-order journey</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`cursor-pointer border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 group ${
                          action.primary ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''
                        }`}
                        onClick={action.action}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                              <action.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{action.title}</h3>
                              <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const ActivityIcon = getActivityIcon(activity.type)
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200 group cursor-pointer"
                      >
                        <div className="relative">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <ActivityIcon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className={`absolute -top-1 -right-1 w-3 h-3 ${getPriorityColor(activity.priority)} rounded-full`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {activity.customer}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                              {activity.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">{activity.value}</p>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-300 ml-auto" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700">
                  View All Activity
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">99.9% Uptime SLA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Enterprise Ready</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="bg-white/50">
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ModernDashboard

