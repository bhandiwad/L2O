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
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useApp } from '../context/AppContext'

const EnhancedInventoryView = () => {
  const navigate = useNavigate()
  const { currentCustomer, addNotification } = useApp()
  
  const [activeView, setActiveView] = useState('grid')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPaymentModel, setSelectedPaymentModel] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showLegacyMapping, setShowLegacyMapping] = useState({})
  const [selectedResource, setSelectedResource] = useState(null)
  const [showMonitoring, setShowMonitoring] = useState(false)
  const [editingResource, setEditingResource] = useState(null)
  const [showOrderHistory, setShowOrderHistory] = useState(false)

  // Enhanced inventory data with order history and monitoring
  const [inventoryData, setInventoryData] = useState([
    // Mumbai Resources
    {
      id: 1,
      name: 'Production Web Servers',
      sku: 'CI-COMP-SHARED-L-MUM',
      legacySku: 'CI-COMP-VPI-L',
      category: 'Compute',
      type: 'Shared',
      location: 'Mumbai',
      environment: 'Production',
      vcpu: 8,
      ram: 32,
      storage: 500,
      utilization: { cpu: 75, memory: 68, storage: 45 },
      monthlyRate: 12000,
      paymentModel: 'PAYG',
      riExpiry: null,
      status: 'active',
      lastModified: '2024-01-15',
      orderId: 'ORD-2023-001',
      invoiceId: 'INV-2023-045'
    },
    {
      id: 2,
      name: 'Database Server Primary',
      sku: 'CI-COMP-DEDICATED-XL-MUM',
      legacySku: 'CI-COMP-VPE-XL',
      category: 'Compute',
      type: 'Dedicated',
      location: 'Mumbai',
      environment: 'Production',
      vcpu: 16,
      ram: 128,
      storage: 2000,
      utilization: { cpu: 85, memory: 92, storage: 67 },
      monthlyRate: 45000,
      paymentModel: 'RI',
      riExpiry: '2024-12-31',
      status: 'active',
      lastModified: '2024-01-10',
      orderId: 'ORD-2023-002',
      invoiceId: 'INV-2023-046'
    },
    {
      id: 3,
      name: 'Load Balancer',
      sku: 'CI-NET-LB-ADVANCED-MUM',
      legacySku: 'CI-NET-LB-ADV',
      category: 'Network',
      type: 'Advanced',
      location: 'Mumbai',
      environment: 'Production',
      bandwidth: '10 Gbps',
      throughput: '8.5 Gbps',
      utilization: { bandwidth: 85, connections: 15000 },
      monthlyRate: 8500,
      paymentModel: 'PAYG',
      riExpiry: null,
      status: 'active',
      lastModified: '2024-01-12',
      orderId: 'ORD-2023-003',
      invoiceId: 'INV-2023-047'
    },
    {
      id: 4,
      name: 'Enterprise Firewall',
      sku: 'CI-SEC-FW-ENTERPRISE-MUM',
      legacySku: 'CI-SEC-FW-ENT',
      category: 'Security',
      type: 'Enterprise',
      location: 'Mumbai',
      environment: 'Production',
      throughput: '5 Gbps',
      utilization: { throughput: 45, rules: 2500 },
      monthlyRate: 15000,
      paymentModel: 'RI',
      riExpiry: '2024-08-15',
      status: 'active',
      lastModified: '2024-01-08',
      orderId: 'ORD-2023-004',
      invoiceId: 'INV-2023-048'
    },
    {
      id: 5,
      name: 'Block Storage Primary',
      sku: 'CI-STOR-BLOCK-5TB-MUM',
      legacySku: 'CI-STOR-BLOCK-5TB',
      category: 'Storage',
      type: 'Block',
      location: 'Mumbai',
      environment: 'Production',
      capacity: '5TB',
      iops: 10000,
      utilization: { capacity: 78, iops: 7500 },
      monthlyRate: 25000,
      paymentModel: 'PAYG',
      riExpiry: null,
      status: 'active',
      lastModified: '2024-01-14',
      orderId: 'ORD-2023-005',
      invoiceId: 'INV-2023-049'
    },
    {
      id: 6,
      name: 'MySQL Database Service',
      sku: 'CI-DB-MYSQL-L-MUM',
      legacySku: 'CI-DB-MYSQL-L',
      category: 'Database',
      type: 'Managed',
      location: 'Mumbai',
      environment: 'Production',
      vcpu: 8,
      ram: 64,
      storage: 1000,
      utilization: { cpu: 65, memory: 72, connections: 150 },
      monthlyRate: 18000,
      paymentModel: 'RI',
      riExpiry: '2024-10-20',
      status: 'active',
      lastModified: '2024-01-11',
      orderId: 'ORD-2023-006',
      invoiceId: 'INV-2023-050'
    },

    // Chennai Resources (DR Site)
    {
      id: 7,
      name: 'DR Web Servers',
      sku: 'CI-COMP-SHARED-M-CHE',
      legacySku: 'CI-COMP-VPI-M',
      category: 'Compute',
      type: 'Shared',
      location: 'Chennai',
      environment: 'DR',
      vcpu: 4,
      ram: 16,
      storage: 250,
      utilization: { cpu: 25, memory: 30, storage: 20 },
      monthlyRate: 8000,
      paymentModel: 'PAYG',
      riExpiry: null,
      status: 'standby',
      lastModified: '2024-01-13',
      orderId: 'ORD-2023-007',
      invoiceId: 'INV-2023-051'
    },
    {
      id: 8,
      name: 'DR Database Replica',
      sku: 'CI-COMP-DEDICATED-L-CHE',
      legacySku: 'CI-COMP-VPE-L',
      category: 'Compute',
      type: 'Dedicated',
      location: 'Chennai',
      environment: 'DR',
      vcpu: 12,
      ram: 96,
      storage: 1500,
      utilization: { cpu: 15, memory: 20, storage: 45 },
      monthlyRate: 35000,
      paymentModel: 'RI',
      riExpiry: '2024-12-31',
      status: 'standby',
      lastModified: '2024-01-09',
      orderId: 'ORD-2023-008',
      invoiceId: 'INV-2023-052'
    },
    {
      id: 9,
      name: 'MPLS Network Link',
      sku: 'CI-NET-MPLS-10G-CHE',
      legacySku: 'CI-NET-MPLS-10G',
      category: 'Network',
      type: 'MPLS',
      location: 'Chennai',
      environment: 'DR',
      bandwidth: '10 Gbps',
      utilization: { bandwidth: 35, latency: '2ms' },
      monthlyRate: 45000,
      paymentModel: 'RI',
      riExpiry: '2025-03-15',
      status: 'active',
      lastModified: '2024-01-07',
      orderId: 'ORD-2023-009',
      invoiceId: 'INV-2023-053'
    },
    {
      id: 10,
      name: 'Backup Storage',
      sku: 'CI-STOR-BACKUP-10TB-CHE',
      legacySku: 'CI-STOR-BAK-10TB',
      category: 'Storage',
      type: 'Backup',
      location: 'Chennai',
      environment: 'DR',
      capacity: '10TB',
      utilization: { capacity: 65, backup_jobs: 24 },
      monthlyRate: 20000,
      paymentModel: 'PAYG',
      riExpiry: null,
      status: 'active',
      lastModified: '2024-01-16',
      orderId: 'ORD-2023-010',
      invoiceId: 'INV-2023-054'
    }
  ])

  // Order history data
  const orderHistory = [
    {
      id: 'ORD-2023-001',
      date: '2023-03-15',
      type: 'New Order',
      items: ['Production Web Servers'],
      amount: 144000,
      status: 'Completed',
      invoiceId: 'INV-2023-045'
    },
    {
      id: 'ORD-2023-002',
      date: '2023-04-20',
      type: 'New Order',
      items: ['Database Server Primary'],
      amount: 540000,
      status: 'Completed',
      invoiceId: 'INV-2023-046'
    },
    {
      id: 'ORD-2023-003',
      date: '2023-05-10',
      type: 'Add',
      items: ['Load Balancer'],
      amount: 102000,
      status: 'Completed',
      invoiceId: 'INV-2023-047'
    },
    {
      id: 'ORD-2023-004',
      date: '2023-06-05',
      type: 'Add',
      items: ['Enterprise Firewall'],
      amount: 180000,
      status: 'Completed',
      invoiceId: 'INV-2023-048'
    },
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      type: 'Change',
      items: ['Database Server Primary - RAM Upgrade'],
      amount: 12000,
      status: 'In Progress',
      invoiceId: 'INV-2024-001'
    }
  ]

  const locations = ['all', 'Mumbai', 'Chennai']
  const categories = ['all', 'Compute', 'Network', 'Security', 'Storage', 'Database']
  const paymentModels = ['all', 'PAYG', 'RI']

  const filteredInventory = inventoryData.filter(item => {
    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesPayment = selectedPaymentModel === 'all' || item.paymentModel === selectedPaymentModel
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesLocation && matchesCategory && matchesPayment && matchesSearch
  })

  const totalMonthlyCost = filteredInventory.reduce((sum, item) => sum + item.monthlyRate, 0)
  const riCoverage = (filteredInventory.filter(item => item.paymentModel === 'RI').length / filteredInventory.length) * 100

  const toggleLegacyMapping = (id) => {
    setShowLegacyMapping(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleResourceAction = (action, resource) => {
    switch (action) {
      case 'view':
        setSelectedResource(resource)
        setShowMonitoring(true)
        break
      case 'edit':
        setEditingResource(resource)
        break
      case 'move':
        addNotification(`Moving ${resource.name} to different location`, 'info')
        break
      case 'delete':
        addNotification(`Decommissioning ${resource.name}`, 'warning')
        break
      default:
        break
    }
  }

  const handleResourceEdit = (updatedResource) => {
    // Intelligent MACD - adjust pricing based on changes
    let newRate = updatedResource.monthlyRate
    
    if (updatedResource.category === 'Compute') {
      // Recalculate based on vCPU/RAM changes
      const originalResource = inventoryData.find(r => r.id === updatedResource.id)
      const cpuRatio = updatedResource.vcpu / originalResource.vcpu
      const ramRatio = updatedResource.ram / originalResource.ram
      newRate = Math.round(originalResource.monthlyRate * Math.max(cpuRatio, ramRatio))
    } else if (updatedResource.category === 'Network') {
      // Recalculate based on bandwidth changes
      const bandwidthValue = parseInt(updatedResource.bandwidth)
      newRate = bandwidthValue * 850 // ₹850 per Gbps
    } else if (updatedResource.category === 'Storage') {
      // Recalculate based on capacity changes
      const capacityValue = parseInt(updatedResource.capacity)
      newRate = capacityValue * 5000 // ₹5000 per TB
    }

    const updatedInventory = inventoryData.map(item =>
      item.id === updatedResource.id 
        ? { ...updatedResource, monthlyRate: newRate, lastModified: new Date().toISOString().split('T')[0] }
        : item
    )
    
    setInventoryData(updatedInventory)
    setEditingResource(null)
    addNotification(`${updatedResource.name} updated successfully`, 'success')
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Compute': return Server
      case 'Network': return Network
      case 'Security': return Shield
      case 'Storage': return HardDrive
      case 'Database': return Database
      default: return Monitor
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'standby': return 'text-yellow-600 bg-yellow-100'
      case 'maintenance': return 'text-orange-600 bg-orange-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'text-red-600'
    if (utilization >= 75) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="min-h-screen sify-bg-gradient">
      {/* Header */}
      <div className="sify-header px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate('/')} 
                variant="ghost" 
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Enterprise Inventory</h1>
                <p className="text-blue-100">Comprehensive resource management for {currentCustomer.name}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => setShowOrderHistory(true)}
                className="sify-btn-secondary"
              >
                <FileText className="w-4 h-4 mr-2" />
                Order History
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Resources</p>
                  <p className="text-2xl font-bold sify-text-primary">{filteredInventory.length}</p>
                </div>
                <Server className="w-8 h-8 sify-text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Cost</p>
                  <p className="text-2xl font-bold sify-text-secondary">₹{(totalMonthlyCost / 1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="w-8 h-8 sify-text-secondary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">RI Coverage</p>
                  <p className="text-2xl font-bold text-green-600">{riCoverage.toFixed(0)}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Locations</p>
                  <p className="text-2xl font-bold sify-text-primary">2</p>
                </div>
                <MapPin className="w-8 h-8 sify-text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="sify-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="search">Search Resources</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name or SKU..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 sify-input"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="sify-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location === 'all' ? 'All Locations' : location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="sify-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="payment">Payment Model</Label>
                <Select value={selectedPaymentModel} onValueChange={setSelectedPaymentModel}>
                  <SelectTrigger className="sify-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentModels.map(model => (
                      <SelectItem key={model} value={model}>
                        {model === 'all' ? 'All Models' : model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="view">View Mode</Label>
                <Select value={activeView} onValueChange={setActiveView}>
                  <SelectTrigger className="sify-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">Grid View</SelectItem>
                    <SelectItem value="list">List View</SelectItem>
                    <SelectItem value="topology">Topology View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        {activeView === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventory.map((resource) => {
              const IconComponent = getCategoryIcon(resource.category)
              return (
                <Card key={resource.id} className="sify-card">
                  <CardHeader className="sify-card-header">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sify-bg-primary rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-sm sify-text-primary">{resource.name}</CardTitle>
                          <CardDescription className="text-xs">{resource.location} • {resource.environment}</CardDescription>
                        </div>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge className="sify-badge-primary text-xs">{resource.sku}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLegacyMapping(resource.id)}
                          className="text-xs h-6"
                        >
                          {showLegacyMapping[resource.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                      </div>
                      {showLegacyMapping[resource.id] && (
                        <Badge variant="outline" className="text-xs">{resource.legacySku}</Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Type</span>
                        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Payment</span>
                        <Badge className={`text-xs ${resource.paymentModel === 'RI' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {resource.paymentModel}
                        </Badge>
                      </div>
                      {resource.riExpiry && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600">RI Expiry</span>
                          <span className="text-xs font-medium">{resource.riExpiry}</span>
                        </div>
                      )}
                    </div>

                    {/* Utilization Metrics */}
                    {resource.utilization && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-gray-700">Utilization</h4>
                        {resource.utilization.cpu && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">CPU</span>
                            <span className={`text-xs font-medium ${getUtilizationColor(resource.utilization.cpu)}`}>
                              {resource.utilization.cpu}%
                            </span>
                          </div>
                        )}
                        {resource.utilization.memory && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Memory</span>
                            <span className={`text-xs font-medium ${getUtilizationColor(resource.utilization.memory)}`}>
                              {resource.utilization.memory}%
                            </span>
                          </div>
                        )}
                        {resource.utilization.bandwidth && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">Bandwidth</span>
                            <span className={`text-xs font-medium ${getUtilizationColor(resource.utilization.bandwidth)}`}>
                              {resource.utilization.bandwidth}%
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <p className="text-xs text-gray-600">Monthly Cost</p>
                        <p className="text-sm font-bold sify-text-primary">₹{resource.monthlyRate.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResourceAction('view', resource)}
                          className="h-7 w-7 p-0"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResourceAction('edit', resource)}
                          className="h-7 w-7 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResourceAction('move', resource)}
                          className="h-7 w-7 p-0"
                        >
                          <Move className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {activeView === 'list' && (
          <Card className="sify-card">
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full sify-table">
                  <thead>
                    <tr>
                      <th className="text-left p-3">Resource</th>
                      <th className="text-left p-3">SKU</th>
                      <th className="text-left p-3">Location</th>
                      <th className="text-left p-3">Specifications</th>
                      <th className="text-left p-3">Utilization</th>
                      <th className="text-right p-3">Monthly Cost</th>
                      <th className="text-center p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((resource) => (
                      <tr key={resource.id} className="border-t">
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 sify-bg-primary rounded-lg flex items-center justify-center">
                              {React.createElement(getCategoryIcon(resource.category), { className: "w-4 h-4 text-white" })}
                            </div>
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-gray-500">{resource.category} • {resource.environment}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <Badge className="sify-badge-primary">{resource.sku}</Badge>
                            <div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleLegacyMapping(resource.id)}
                                className="text-xs h-5"
                              >
                                {showLegacyMapping[resource.id] ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                                Legacy
                              </Button>
                              {showLegacyMapping[resource.id] && (
                                <Badge variant="outline" className="block mt-1 text-xs">{resource.legacySku}</Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{resource.location}</p>
                            <Badge className={`text-xs ${getStatusColor(resource.status)}`}>
                              {resource.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            {resource.vcpu && <p>vCPU: {resource.vcpu}</p>}
                            {resource.ram && <p>RAM: {resource.ram}GB</p>}
                            {resource.storage && <p>Storage: {resource.storage}GB</p>}
                            {resource.bandwidth && <p>Bandwidth: {resource.bandwidth}</p>}
                            {resource.capacity && <p>Capacity: {resource.capacity}</p>}
                          </div>
                        </td>
                        <td className="p-3">
                          {resource.utilization && (
                            <div className="text-sm space-y-1">
                              {resource.utilization.cpu && (
                                <div className="flex items-center justify-between">
                                  <span>CPU:</span>
                                  <span className={getUtilizationColor(resource.utilization.cpu)}>
                                    {resource.utilization.cpu}%
                                  </span>
                                </div>
                              )}
                              {resource.utilization.memory && (
                                <div className="flex items-center justify-between">
                                  <span>RAM:</span>
                                  <span className={getUtilizationColor(resource.utilization.memory)}>
                                    {resource.utilization.memory}%
                                  </span>
                                </div>
                              )}
                              {resource.utilization.bandwidth && (
                                <div className="flex items-center justify-between">
                                  <span>BW:</span>
                                  <span className={getUtilizationColor(resource.utilization.bandwidth)}>
                                    {resource.utilization.bandwidth}%
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div>
                            <p className="font-medium">₹{resource.monthlyRate.toLocaleString()}</p>
                            <Badge className={`text-xs ${resource.paymentModel === 'RI' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                              {resource.paymentModel}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex space-x-1 justify-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResourceAction('view', resource)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResourceAction('edit', resource)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResourceAction('move', resource)}
                              className="h-8 w-8 p-0"
                            >
                              <Move className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === 'topology' && (
          <Card className="sify-card">
            <CardHeader className="sify-card-header">
              <CardTitle className="sify-text-primary">Network Topology View</CardTitle>
              <CardDescription>Visual representation of your infrastructure across locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-8 p-8">
                {/* Mumbai Site */}
                <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                  <h3 className="text-lg font-semibold sify-text-primary mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Mumbai (Primary)
                  </h3>
                  <div className="space-y-4">
                    {filteredInventory.filter(r => r.location === 'Mumbai').map((resource) => (
                      <div key={resource.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        {React.createElement(getCategoryIcon(resource.category), { className: "w-5 h-5 sify-text-primary" })}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{resource.name}</p>
                          <p className="text-xs text-gray-500">{resource.category}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(resource.status)}`}>
                          {resource.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chennai Site */}
                <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
                  <h3 className="text-lg font-semibold sify-text-secondary mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Chennai (DR)
                  </h3>
                  <div className="space-y-4">
                    {filteredInventory.filter(r => r.location === 'Chennai').map((resource) => (
                      <div key={resource.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        {React.createElement(getCategoryIcon(resource.category), { className: "w-5 h-5 sify-text-secondary" })}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{resource.name}</p>
                          <p className="text-xs text-gray-500">{resource.category}</p>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(resource.status)}`}>
                          {resource.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connection Line */}
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-0.5 bg-gray-400"></div>
                  <Network className="w-6 h-6 text-gray-600" />
                  <div className="w-16 h-0.5 bg-gray-400"></div>
                </div>
                <div className="mx-4 text-center">
                  <p className="text-sm font-medium">MPLS Link</p>
                  <p className="text-xs text-gray-500">10 Gbps • 2ms latency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Resource Monitoring Modal */}
      {showMonitoring && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="sify-card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="sify-card-header">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="sify-text-primary">{selectedResource.name} - Monitoring</CardTitle>
                  <CardDescription>Real-time performance metrics and resource details</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowMonitoring(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs defaultValue="metrics" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
                  <TabsTrigger value="details">Resource Details</TabsTrigger>
                  <TabsTrigger value="history">Change History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="metrics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    {selectedResource.utilization?.cpu && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center">
                            <Cpu className="w-4 h-4 mr-2" />
                            CPU Utilization
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold sify-text-primary">
                            {selectedResource.utilization.cpu}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${selectedResource.utilization.cpu}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedResource.utilization?.memory && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center">
                            <MemoryStick className="w-4 h-4 mr-2" />
                            Memory Utilization
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold sify-text-secondary">
                            {selectedResource.utilization.memory}%
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-orange-600 h-2 rounded-full" 
                              style={{ width: `${selectedResource.utilization.memory}%` }}
                            ></div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Resource Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>SKU:</span>
                          <Badge className="sify-badge-primary">{selectedResource.sku}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Legacy SKU:</span>
                          <Badge variant="outline">{selectedResource.legacySku}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span>{selectedResource.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span>{selectedResource.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Location:</span>
                          <span>{selectedResource.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Environment:</span>
                          <span>{selectedResource.environment}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Billing Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Rate:</span>
                          <span className="font-medium">₹{selectedResource.monthlyRate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Model:</span>
                          <Badge className={selectedResource.paymentModel === 'RI' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                            {selectedResource.paymentModel}
                          </Badge>
                        </div>
                        {selectedResource.riExpiry && (
                          <div className="flex justify-between">
                            <span>RI Expiry:</span>
                            <span>{selectedResource.riExpiry}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Order ID:</span>
                          <span>{selectedResource.orderId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Invoice ID:</span>
                          <span>{selectedResource.invoiceId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Resource Created</p>
                        <p className="text-sm text-gray-500">Initial provisioning completed</p>
                        <p className="text-xs text-gray-400">2023-03-15</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Edit className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Configuration Updated</p>
                        <p className="text-sm text-gray-500">Last modified: {selectedResource.lastModified}</p>
                        <p className="text-xs text-gray-400">System maintenance</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Activity className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium">Performance Optimized</p>
                        <p className="text-sm text-gray-500">Auto-scaling configuration applied</p>
                        <p className="text-xs text-gray-400">2024-01-10</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resource Edit Modal */}
      {editingResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="sify-card w-full max-w-2xl">
            <CardHeader className="sify-card-header">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="sify-text-primary">Edit {editingResource.name}</CardTitle>
                  <CardDescription>Modify resource specifications and pricing</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setEditingResource(null)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingResource.category === 'Compute' && (
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="vcpu">vCPU</Label>
                    <Input
                      id="vcpu"
                      type="number"
                      value={editingResource.vcpu}
                      onChange={(e) => setEditingResource({...editingResource, vcpu: parseInt(e.target.value)})}
                      className="sify-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ram">RAM (GB)</Label>
                    <Input
                      id="ram"
                      type="number"
                      value={editingResource.ram}
                      onChange={(e) => setEditingResource({...editingResource, ram: parseInt(e.target.value)})}
                      className="sify-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="storage">Storage (GB)</Label>
                    <Input
                      id="storage"
                      type="number"
                      value={editingResource.storage}
                      onChange={(e) => setEditingResource({...editingResource, storage: parseInt(e.target.value)})}
                      className="sify-input"
                    />
                  </div>
                </div>
              )}
              
              {editingResource.category === 'Network' && (
                <div>
                  <Label htmlFor="bandwidth">Bandwidth</Label>
                  <Input
                    id="bandwidth"
                    value={editingResource.bandwidth}
                    onChange={(e) => setEditingResource({...editingResource, bandwidth: e.target.value})}
                    className="sify-input"
                    placeholder="e.g., 10 Gbps"
                  />
                </div>
              )}
              
              {editingResource.category === 'Storage' && (
                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    value={editingResource.capacity}
                    onChange={(e) => setEditingResource({...editingResource, capacity: e.target.value})}
                    className="sify-input"
                    placeholder="e.g., 5TB"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setEditingResource(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleResourceEdit(editingResource)}
                  className="sify-btn-primary"
                >
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Order History Modal */}
      {showOrderHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="sify-card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="sify-card-header">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="sify-text-primary">Order History</CardTitle>
                  <CardDescription>Complete order and invoice history for {currentCustomer.name}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setShowOrderHistory(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full sify-table">
                  <thead>
                    <tr>
                      <th className="text-left p-3">Order ID</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Type</th>
                      <th className="text-left p-3">Items</th>
                      <th className="text-right p-3">Amount</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="p-3">
                          <Badge className="sify-badge-primary">{order.id}</Badge>
                        </td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">
                          <Badge variant="outline">{order.type}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="text-sm">
                            {order.items.map((item, index) => (
                              <p key={index}>{item}</p>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-right font-medium">
                          ₹{order.amount.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <Badge className={order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant="outline">{order.invoiceId}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default EnhancedInventoryView

