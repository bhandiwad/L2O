import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  EyeOff,
  Edit, 
  Trash2, 
  Move, 
  Plus,
  BarChart3,
  Clock,
  MapPin,
  Server,
  Network,
  Shield,
  HardDrive,
  Database,
  Monitor,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  FileText,
  Activity,
  Cpu,
  MemoryStick,
  Zap,
  X,
  Download,
  RefreshCw,
  Settings,
  History,
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  MoreVertical
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { complexInventoryData, enhancedOrderHistory, auditTrailData } from '@/data/complexInventoryData'

const CompleteInventoryView = () => {
  const navigate = useNavigate()
  const [resources, setResources] = useState(complexInventoryData)
  const [filteredResources, setFilteredResources] = useState(complexInventoryData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPaymentModel, setSelectedPaymentModel] = useState('all')
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showLegacySku, setShowLegacySku] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [showAuditTrail, setShowAuditTrail] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingResource, setEditingResource] = useState(null)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // Calculate summary statistics
  const totalResources = filteredResources.length
  const totalMonthlyCost = filteredResources.reduce((sum, resource) => sum + resource.monthlyRate, 0)
  const riResources = filteredResources.filter(r => r.paymentModel === 'RI').length
  const riCoverage = totalResources > 0 ? Math.round((riResources / totalResources) * 100) : 0
  const uniqueLocations = [...new Set(resources.map(r => r.location))].length

  // Filter and search logic
  useEffect(() => {
    let filtered = resources

    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(resource => resource.location === selectedLocation)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    if (selectedPaymentModel !== 'all') {
      filtered = filtered.filter(resource => resource.paymentModel === selectedPaymentModel)
    }

    if (selectedEnvironment !== 'all') {
      filtered = filtered.filter(resource => resource.environment === selectedEnvironment)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(resource => resource.status === selectedStatus)
    }

    // Sort resources
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'monthlyRate') {
        aValue = parseFloat(aValue)
        bValue = parseFloat(bValue)
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredResources(filtered)
  }, [resources, searchTerm, selectedLocation, selectedCategory, selectedPaymentModel, selectedEnvironment, selectedStatus, sortBy, sortOrder])

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Compute': return <Server className="h-5 w-5" />
      case 'Network': return <Network className="h-5 w-5" />
      case 'Security': return <Shield className="h-5 w-5" />
      case 'Storage': return <HardDrive className="h-5 w-5" />
      case 'Database': return <Database className="h-5 w-5" />
      case 'Operating System': return <Monitor className="h-5 w-5" />
      case 'Backup': return <HardDrive className="h-5 w-5" />
      case 'Monitoring': return <Activity className="h-5 w-5" />
      case 'License': return <FileText className="h-5 w-5" />
      case 'Compliance': return <CheckCircle className="h-5 w-5" />
      default: return <Server className="h-5 w-5" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'standby': return 'bg-yellow-100 text-yellow-800'
      case 'maintenance': return 'bg-orange-100 text-orange-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentModelColor = (model) => {
    switch (model) {
      case 'PAYG': return 'bg-blue-100 text-blue-800'
      case 'RI': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEdit = (resource) => {
    setEditingResource(resource)
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (editingResource) {
      setResources(prev => prev.map(r => 
        r.id === editingResource.id ? editingResource : r
      ))
      setShowEditModal(false)
      setEditingResource(null)
    }
  }

  const ResourceCard = ({ resource }) => (
    <Card className="sify-card hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getCategoryIcon(resource.category)}
            <div>
              <CardTitle className="text-lg font-semibold text-sify-blue">
                {resource.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {resource.location} • {resource.environment}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLegacySku(!showLegacySku)}
              className="p-1"
            >
              {showLegacySku ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(resource)}
              className="p-1"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs">
              {resource.sku}
            </Badge>
            <Badge className={getStatusColor(resource.status)}>
              {resource.status}
            </Badge>
          </div>
          {showLegacySku && (
            <div className="text-xs text-gray-500">
              Legacy: {resource.legacySku}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Type</span>
            <p className="font-medium">{resource.type}</p>
          </div>
          <div>
            <span className="text-gray-500">Payment</span>
            <Badge className={getPaymentModelColor(resource.paymentModel)}>
              {resource.paymentModel}
            </Badge>
          </div>
        </div>

        {resource.riExpiry && (
          <div className="text-sm">
            <span className="text-gray-500">RI Expiry</span>
            <p className="font-medium text-orange-600">{resource.riExpiry}</p>
          </div>
        )}

        <div className="text-sm">
          <span className="text-gray-500">Commissioned</span>
          <p className="font-medium">{resource.commissionedDate}</p>
        </div>

        {resource.utilization && (
          <div className="space-y-2">
            <span className="text-sm text-gray-500">Utilization</span>
            {resource.utilization.cpu && (
              <div>
                <div className="flex justify-between text-xs">
                  <span>CPU</span>
                  <span>{resource.utilization.cpu}%</span>
                </div>
                <Progress value={resource.utilization.cpu} className="h-2" />
              </div>
            )}
            {resource.utilization.memory && (
              <div>
                <div className="flex justify-between text-xs">
                  <span>Memory</span>
                  <span>{resource.utilization.memory}%</span>
                </div>
                <Progress value={resource.utilization.memory} className="h-2" />
              </div>
            )}
            {resource.utilization.bandwidth && (
              <div>
                <div className="flex justify-between text-xs">
                  <span>Bandwidth</span>
                  <span>{resource.utilization.bandwidth}%</span>
                </div>
                <Progress value={resource.utilization.bandwidth} className="h-2" />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-sm">
            <span className="text-gray-500">Monthly Cost</span>
            <p className="font-bold text-sify-orange">₹{resource.monthlyRate.toLocaleString()}</p>
          </div>
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" onClick={() => setSelectedResource(resource)}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const ResourceListItem = ({ resource }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center space-x-2">
          {getCategoryIcon(resource.category)}
          <div>
            <p className="font-medium text-sify-blue">{resource.name}</p>
            <p className="text-sm text-gray-500">{resource.sku}</p>
            {showLegacySku && (
              <p className="text-xs text-gray-400">Legacy: {resource.legacySku}</p>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline">{resource.category}</Badge>
      </td>
      <td className="px-4 py-3">{resource.location}</td>
      <td className="px-4 py-3">{resource.environment}</td>
      <td className="px-4 py-3">
        <Badge className={getPaymentModelColor(resource.paymentModel)}>
          {resource.paymentModel}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <Badge className={getStatusColor(resource.status)}>
          {resource.status}
        </Badge>
      </td>
      <td className="px-4 py-3">{resource.commissionedDate}</td>
      <td className="px-4 py-3 font-medium">₹{resource.monthlyRate.toLocaleString()}</td>
      <td className="px-4 py-3">
        <div className="flex space-x-1">
          <Button variant="ghost" size="sm" onClick={() => setSelectedResource(resource)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleEdit(resource)}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="sify-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Enterprise Inventory</h1>
                <p className="text-blue-100">Comprehensive resource management for Max Healthcare</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowOrderHistory(true)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <History className="h-4 w-4 mr-2" />
                Order History
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAuditTrail(true)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <FileText className="h-4 w-4 mr-2" />
                Audit Trail
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resources</p>
                  <p className="text-3xl font-bold text-sify-blue">{totalResources}</p>
                </div>
                <Server className="h-8 w-8 text-sify-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                  <p className="text-3xl font-bold text-sify-orange">₹{Math.round(totalMonthlyCost/1000)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-sify-orange" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">RI Coverage</p>
                  <p className="text-3xl font-bold text-green-600">{riCoverage}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Locations</p>
                  <p className="text-3xl font-bold text-sify-blue">{uniqueLocations}</p>
                </div>
                <MapPin className="h-8 w-8 text-sify-blue" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="sify-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Resources</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Compute">Compute</SelectItem>
                    <SelectItem value="Network">Network</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Storage">Storage</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Operating System">Operating System</SelectItem>
                    <SelectItem value="Backup">Backup</SelectItem>
                    <SelectItem value="Monitoring">Monitoring</SelectItem>
                    <SelectItem value="License">License</SelectItem>
                    <SelectItem value="Compliance">Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Model</label>
                <Select value={selectedPaymentModel} onValueChange={setSelectedPaymentModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Models" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Models</SelectItem>
                    <SelectItem value="PAYG">PAYG</SelectItem>
                    <SelectItem value="RI">Reserved Instance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Environments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Environments</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="DR">DR</SelectItem>
                    <SelectItem value="Staging">Staging</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">View Mode</label>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="flex-1"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="flex-1"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLegacySku(!showLegacySku)}
                >
                  {showLegacySku ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showLegacySku ? 'Hide' : 'Show'} Legacy SKUs
                </Button>
                <div className="text-sm text-gray-600">
                  Showing {filteredResources.length} of {totalResources} resources
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="category">Category</SelectItem>
                    <SelectItem value="monthlyRate">Cost</SelectItem>
                    <SelectItem value="commissionedDate">Date</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <Card className="sify-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Resource</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Environment</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Payment</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Commissioned</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Monthly Cost</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource) => (
                      <ResourceListItem key={resource.id} resource={resource} />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order History Modal */}
        <Dialog open={showOrderHistory} onOpenChange={setShowOrderHistory}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order History</DialogTitle>
              <DialogDescription>
                Complete order history for Max Healthcare account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {enhancedOrderHistory.map((order) => (
                <Card key={order.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{order.id}</h4>
                        <p className="text-sm text-gray-600">{order.date} • {order.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₹{order.amount.toLocaleString()}</p>
                        <Badge className={order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600 mb-1">Items:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        {order.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    {order.invoiceId && (
                      <p className="text-xs text-gray-500 mt-2">Invoice: {order.invoiceId}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Audit Trail Modal */}
        <Dialog open={showAuditTrail} onOpenChange={setShowAuditTrail}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Audit Trail</DialogTitle>
              <DialogDescription>
                Complete audit trail for all account activities
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {auditTrailData.map((audit) => (
                <Card key={audit.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline">{audit.category}</Badge>
                          <span className="text-sm text-gray-500">{audit.timestamp}</span>
                        </div>
                        <h4 className="font-semibold">{audit.action}</h4>
                        <p className="text-sm text-gray-600">{audit.resource}</p>
                        <p className="text-sm text-gray-700 mt-1">{audit.details}</p>
                        <p className="text-xs text-gray-500 mt-1">User: {audit.user}</p>
                      </div>
                      <Badge className={audit.status === 'Completed' || audit.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {audit.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Resource Details Modal */}
        <Dialog open={!!selectedResource} onOpenChange={() => setSelectedResource(null)}>
          <DialogContent className="max-w-2xl">
            {selectedResource && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedResource.name}</DialogTitle>
                  <DialogDescription>
                    Detailed resource information and monitoring
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                    <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">SKU</label>
                        <p className="font-mono">{selectedResource.sku}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Legacy SKU</label>
                        <p className="font-mono">{selectedResource.legacySku}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Category</label>
                        <p>{selectedResource.category}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Type</label>
                        <p>{selectedResource.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Location</label>
                        <p>{selectedResource.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Environment</label>
                        <p>{selectedResource.environment}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Commissioned Date</label>
                        <p>{selectedResource.commissionedDate}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Monthly Rate</label>
                        <p className="font-bold text-sify-orange">₹{selectedResource.monthlyRate.toLocaleString()}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="monitoring" className="space-y-4">
                    {selectedResource.utilization && (
                      <div className="space-y-4">
                        {Object.entries(selectedResource.utilization).map(([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="capitalize">{key.replace('_', ' ')}</span>
                              <span>{typeof value === 'number' ? `${value}%` : value}</span>
                            </div>
                            {typeof value === 'number' && (
                              <Progress value={value} className="h-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="dependencies" className="space-y-4">
                    {selectedResource.dependencies ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">This resource depends on:</p>
                        {selectedResource.dependencies.map(depId => {
                          const dep = resources.find(r => r.id === depId)
                          return dep ? (
                            <div key={depId} className="flex items-center space-x-2 p-2 border rounded">
                              {getCategoryIcon(dep.category)}
                              <span>{dep.name}</span>
                              <Badge variant="outline">{dep.sku}</Badge>
                            </div>
                          ) : null
                        })}
                      </div>
                    ) : selectedResource.parentResource ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">This resource is a component of:</p>
                        {(() => {
                          const parent = resources.find(r => r.id === selectedResource.parentResource)
                          return parent ? (
                            <div className="flex items-center space-x-2 p-2 border rounded">
                              {getCategoryIcon(parent.category)}
                              <span>{parent.name}</span>
                              <Badge variant="outline">{parent.sku}</Badge>
                            </div>
                          ) : null
                        })()}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No dependencies found</p>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Resource Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-md">
            {editingResource && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Resource</DialogTitle>
                  <DialogDescription>
                    Modify resource configuration
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {editingResource.category === 'Compute' && (
                    <>
                      <div>
                        <label className="text-sm font-medium text-gray-600">vCPU</label>
                        <Input
                          type="number"
                          value={editingResource.vcpu || ''}
                          onChange={(e) => setEditingResource({
                            ...editingResource,
                            vcpu: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">RAM (GB)</label>
                        <Input
                          type="number"
                          value={editingResource.ram || ''}
                          onChange={(e) => setEditingResource({
                            ...editingResource,
                            ram: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Storage (GB)</label>
                        <Input
                          type="number"
                          value={editingResource.storage || ''}
                          onChange={(e) => setEditingResource({
                            ...editingResource,
                            storage: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                    </>
                  )}
                  {editingResource.category === 'Network' && editingResource.bandwidth && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Bandwidth</label>
                      <Input
                        value={editingResource.bandwidth || ''}
                        onChange={(e) => setEditingResource({
                          ...editingResource,
                          bandwidth: e.target.value
                        })}
                      />
                    </div>
                  )}
                  {editingResource.category === 'Storage' && editingResource.capacity && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Capacity</label>
                      <Input
                        value={editingResource.capacity || ''}
                        onChange={(e) => setEditingResource({
                          ...editingResource,
                          capacity: e.target.value
                        })}
                      />
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Monthly Rate (₹)</label>
                    <Input
                      type="number"
                      value={editingResource.monthlyRate || ''}
                      onChange={(e) => setEditingResource({
                        ...editingResource,
                        monthlyRate: parseInt(e.target.value) || 0
                      })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowEditModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default CompleteInventoryView

