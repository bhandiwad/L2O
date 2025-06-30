import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Upload, 
  Edit3, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Server, 
  Users, 
  Calendar,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  FileSpreadsheet,
  MousePointer,
  Eye,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useApp } from '../context/AppContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { currentCustomer, inventory, showDemoControls, setDemoMode, demoMode } = useApp()
  
  // Calculate dashboard metrics
  const totalResources = inventory.length
  const totalMonthlyCost = inventory.reduce((sum, item) => sum + item.monthlyRate, 0)
  const potentialSavings = inventory.reduce((sum, item) => sum + (item.potentialSavings || 0), 0)
  const riResources = inventory.filter(item => item.paymentModel.startsWith('RI')).length
  
  const quickActions = [
    {
      title: 'Excel Upload',
      description: 'Upload requirements from Excel file',
      icon: FileSpreadsheet,
      path: '/excel-upload',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'Manual Entry',
      description: 'Interactive requirement builder',
      icon: MousePointer,
      path: '/manual-entry',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'Custom Flow Demo',
      description: 'Demonstrate custom requirements workflow',
      icon: Users,
      path: '/custom-flow',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      title: 'View Inventory',
      description: 'Manage existing resources',
      icon: Eye,
      path: '/inventory',
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:from-indigo-600 hover:to-indigo-700'
    }
  ]
  
  const metrics = [
    {
      title: 'Active Resources',
      value: totalResources,
      icon: Server,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Monthly Cost',
      value: `₹${(totalMonthlyCost / 1000).toFixed(1)}K`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Potential Savings',
      value: `₹${(potentialSavings / 1000).toFixed(1)}K`,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Reserved Instances',
      value: riResources,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]
  
  return (
    <div className="min-h-screen sify-bg-gradient">
      {/* Header */}
      <header className="sify-header sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sify-bg-secondary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Sify Cloud Services</h1>
                  <p className="text-sm text-blue-100">Order Management Portal</p>
                </div>
              </div>
            </div>
            
            {/* Customer Info */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{currentCustomer.name}</p>
                <p className="text-xs text-blue-100">{currentCustomer.industry} • {currentCustomer.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Controls (Hidden by default) */}
      {showDemoControls && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-yellow-100">Demo Mode</Badge>
              <div className="flex items-center space-x-2">
                <Button
                  variant={demoMode === 'standard' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDemoMode('standard')}
                >
                  Standard Flow
                </Button>
                <Button
                  variant={demoMode === 'custom' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDemoMode('custom')}
                >
                  Custom Flow
                </Button>
              </div>
            </div>
            <p className="text-sm text-yellow-700">Press Ctrl+Shift+M to toggle demo controls</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentCustomer.accountManager}
          </h2>
          <p className="text-gray-600">
            Manage orders and resources for {currentCustomer.name}
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="bg-white/60 backdrop-blur-sm border-white/20 hover:bg-white/80 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Latest orders and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #ORD-2024-394</p>
                    <p className="text-sm text-gray-600">GPU Training Cluster added</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #ORD-2024-393</p>
                    <p className="text-sm text-gray-600">Database upgraded to RI plan</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order #ORD-2024-392</p>
                    <p className="text-sm text-gray-600">Storage capacity increased</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cost Optimization */}
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <span>Cost Optimization</span>
              </CardTitle>
              <CardDescription>Recommendations to save costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-orange-900">Switch to Reserved Instance</p>
                    <Badge className="bg-orange-100 text-orange-800">Save ₹9K/month</Badge>
                  </div>
                  <p className="text-sm text-orange-700">GPU cluster can save 20% with RI commitment</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-blue-900">Rightsizing Opportunity</p>
                    <Badge className="bg-blue-100 text-blue-800">Save ₹1.5K/month</Badge>
                  </div>
                  <p className="text-sm text-blue-700">Web server cluster is underutilized</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/inventory')}
                >
                  View All Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

