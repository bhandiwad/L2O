import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  Download,
  Calendar,
  DollarSign,
  Package,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

const OrderHistoryPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showInvoice, setShowInvoice] = useState(false)
  const [expandedOrders, setExpandedOrders] = useState(new Set())

  // Comprehensive order history data
  const orderHistory = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      type: 'New Order',
      status: 'Completed',
      amount: 125000,
      commissionedDate: '2024-01-20',
      invoiceId: 'INV-2024-001',
      items: [
        { name: 'Web Server Cluster Node 1', sku: 'CI-COMP-SHARED-XL-MUM', quantity: 1, unitPrice: 18000, totalPrice: 18000 },
        { name: 'Ubuntu Server 22.04 LTS', sku: 'CI-OS-UBUNTU-22-LTS-MUM', quantity: 1, unitPrice: 0, totalPrice: 0 },
        { name: 'ClamAV Antivirus', sku: 'CI-SEC-AV-CLAM-MUM', quantity: 1, unitPrice: 500, totalPrice: 500 },
        { name: 'Application Backup Service', sku: 'CI-BAK-APP-750GB-MUM', quantity: 1, unitPrice: 3750, totalPrice: 3750 }
      ],
      description: 'Initial web server setup for Max Healthcare portal',
      location: 'Mumbai',
      environment: 'Production'
    },
    {
      id: 'ORD-2024-002',
      date: '2024-02-10',
      type: 'Upgrade',
      status: 'Completed',
      amount: 85000,
      commissionedDate: '2024-02-15',
      invoiceId: 'INV-2024-002',
      items: [
        { name: 'Database Server Primary', sku: 'CI-COMP-DEDICATED-XL-MUM', quantity: 1, unitPrice: 45000, totalPrice: 45000 },
        { name: 'Red Hat Enterprise Linux 9', sku: 'CI-OS-RHEL-9-ENT-MUM', quantity: 1, unitPrice: 8000, totalPrice: 8000 },
        { name: 'Database Security Suite', sku: 'CI-SEC-DB-SUITE-MUM', quantity: 1, unitPrice: 5000, totalPrice: 5000 },
        { name: 'Enterprise Backup - 2TB', sku: 'CI-BAK-ENT-2TB-MUM', quantity: 1, unitPrice: 8000, totalPrice: 8000 },
        { name: 'Database Performance Monitoring', sku: 'CI-MON-DB-PERF-MUM', quantity: 1, unitPrice: 4000, totalPrice: 4000 }
      ],
      description: 'Database infrastructure upgrade with enhanced security',
      location: 'Mumbai',
      environment: 'Production'
    },
    {
      id: 'ORD-2024-003',
      date: '2024-03-05',
      type: 'New Order',
      status: 'Completed',
      amount: 95000,
      commissionedDate: '2024-03-12',
      invoiceId: 'INV-2024-003',
      items: [
        { name: 'Advanced Load Balancer', sku: 'CI-NET-LB-ADVANCED-MUM', quantity: 1, unitPrice: 8500, totalPrice: 8500 },
        { name: 'Wildcard SSL Certificate', sku: 'CI-SEC-SSL-WILD-MUM', quantity: 1, unitPrice: 2000, totalPrice: 2000 },
        { name: 'Network Advanced Monitoring', sku: 'CI-MON-NET-ADV-MUM', quantity: 1, unitPrice: 2500, totalPrice: 2500 }
      ],
      description: 'Network infrastructure enhancement for high availability',
      location: 'Mumbai',
      environment: 'Production'
    },
    {
      id: 'ORD-2024-004',
      date: '2024-04-20',
      type: 'New Order',
      status: 'Completed',
      amount: 75000,
      commissionedDate: '2024-04-25',
      invoiceId: 'INV-2024-004',
      items: [
        { name: 'Enterprise Firewall', sku: 'CI-SEC-FW-ENTERPRISE-MUM', quantity: 1, unitPrice: 15000, totalPrice: 15000 },
        { name: 'Firewall Management License', sku: 'CI-LIC-FW-MGMT-MUM', quantity: 1, unitPrice: 3000, totalPrice: 3000 },
        { name: 'Threat Intelligence Feed', sku: 'CI-SEC-TI-FEED-MUM', quantity: 1, unitPrice: 2500, totalPrice: 2500 }
      ],
      description: 'Security infrastructure enhancement',
      location: 'Mumbai',
      environment: 'Production'
    },
    {
      id: 'ORD-2024-005',
      date: '2024-05-15',
      type: 'Storage Expansion',
      status: 'Completed',
      amount: 65000,
      commissionedDate: '2024-05-20',
      invoiceId: 'INV-2024-005',
      items: [
        { name: 'Block Storage - 5TB', sku: 'CI-STOR-BLOCK-5TB-MUM', quantity: 1, unitPrice: 25000, totalPrice: 25000 },
        { name: 'Storage Encryption Service', sku: 'CI-SEC-STOR-ENC-MUM', quantity: 1, unitPrice: 3500, totalPrice: 3500 },
        { name: 'Storage Replication - 5TB', sku: 'CI-STOR-REPL-5TB-MUM', quantity: 1, unitPrice: 12500, totalPrice: 12500 }
      ],
      description: 'Storage capacity expansion with encryption',
      location: 'Mumbai',
      environment: 'Production'
    },
    {
      id: 'ORD-2024-006',
      date: '2024-06-10',
      type: 'Database Setup',
      status: 'Completed',
      amount: 55000,
      commissionedDate: '2024-06-15',
      invoiceId: 'INV-2024-006',
      items: [
        { name: 'MySQL Database - Large', sku: 'CI-DB-MYSQL-L-MUM', quantity: 1, unitPrice: 18000, totalPrice: 18000 },
        { name: 'Database Automated Backup - 1TB', sku: 'CI-BAK-DB-AUTO-1TB-MUM', quantity: 1, unitPrice: 5000, totalPrice: 5000 },
        { name: 'Database Performance Monitoring', sku: 'CI-MON-DB-PERF-MUM', quantity: 1, unitPrice: 4000, totalPrice: 4000 },
        { name: 'Database Compliance Suite', sku: 'CI-COMP-DB-SUITE-MUM', quantity: 1, unitPrice: 6000, totalPrice: 6000 }
      ],
      description: 'MySQL database setup for analytics workload',
      location: 'Mumbai',
      environment: 'Production'
    },
    {
      id: 'ORD-2024-007',
      date: '2024-07-05',
      type: 'DR Setup',
      status: 'Completed',
      amount: 85000,
      commissionedDate: '2024-07-12',
      invoiceId: 'INV-2024-007',
      items: [
        { name: 'Shared Compute - Medium (DR)', sku: 'CI-COMP-SHARED-M-CHE', quantity: 1, unitPrice: 8000, totalPrice: 8000 },
        { name: 'Windows Server 2022 Standard (DR)', sku: 'CI-OS-WIN-2022-STD-CHE', quantity: 1, unitPrice: 2400, totalPrice: 2400 },
        { name: 'Basic Antivirus (DR)', sku: 'CI-SEC-AV-BASIC-CHE', quantity: 1, unitPrice: 800, totalPrice: 800 },
        { name: 'DR Backup Service - 250GB', sku: 'CI-BAK-DR-250GB-CHE', quantity: 1, unitPrice: 1500, totalPrice: 1500 }
      ],
      description: 'Disaster recovery setup in Chennai',
      location: 'Chennai',
      environment: 'DR'
    },
    {
      id: 'ORD-2024-008',
      date: '2024-08-20',
      type: 'Network Upgrade',
      status: 'Completed',
      amount: 125000,
      commissionedDate: '2024-08-25',
      invoiceId: 'INV-2024-008',
      items: [
        { name: 'Dedicated Compute - Large (DR)', sku: 'CI-COMP-DEDICATED-L-CHE', quantity: 1, unitPrice: 35000, totalPrice: 35000 },
        { name: 'Red Hat Enterprise Linux 9 (DR)', sku: 'CI-OS-RHEL-9-ENT-CHE', quantity: 1, unitPrice: 6000, totalPrice: 6000 },
        { name: 'Database Security Suite (DR)', sku: 'CI-SEC-DB-SUITE-CHE', quantity: 1, unitPrice: 3500, totalPrice: 3500 },
        { name: 'Database DR Backup - 1.5TB', sku: 'CI-BAK-DB-DR-1.5TB-CHE', quantity: 1, unitPrice: 7500, totalPrice: 7500 }
      ],
      description: 'DR infrastructure enhancement',
      location: 'Chennai',
      environment: 'DR'
    },
    {
      id: 'ORD-2024-009',
      date: '2024-09-15',
      type: 'Network Infrastructure',
      status: 'Completed',
      amount: 155000,
      commissionedDate: '2024-09-20',
      invoiceId: 'INV-2024-009',
      items: [
        { name: 'MPLS Link - 10 Gbps', sku: 'CI-NET-MPLS-10G-CHE', quantity: 1, unitPrice: 45000, totalPrice: 45000 },
        { name: 'Network Redundancy - 10G', sku: 'CI-NET-REDUN-10G-CHE', quantity: 1, unitPrice: 22500, totalPrice: 22500 },
        { name: 'WAN Monitoring Service', sku: 'CI-MON-NET-WAN-CHE', quantity: 1, unitPrice: 3500, totalPrice: 3500 }
      ],
      description: 'High-speed network connectivity between locations',
      location: 'Chennai',
      environment: 'Production'
    },
    {
      id: 'ORD-2024-010',
      date: '2024-10-10',
      type: 'Storage & Backup',
      status: 'Active',
      amount: 65000,
      commissionedDate: '2024-10-15',
      invoiceId: 'INV-2024-010',
      items: [
        { name: 'Backup Storage - 10TB', sku: 'CI-STOR-BACKUP-10TB-CHE', quantity: 1, unitPrice: 20000, totalPrice: 20000 },
        { name: 'Backup Encryption Service', sku: 'CI-SEC-BAK-ENC-CHE', quantity: 1, unitPrice: 2500, totalPrice: 2500 },
        { name: 'Storage Deduplication - 10TB', sku: 'CI-STOR-DEDUP-10TB-CHE', quantity: 1, unitPrice: 5000, totalPrice: 5000 }
      ],
      description: 'Backup infrastructure expansion',
      location: 'Chennai',
      environment: 'Production'
    }
  ]

  const filteredOrders = orderHistory.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus
    const matchesYear = selectedYear === 'all' || order.date.startsWith(selectedYear)
    
    return matchesSearch && matchesStatus && matchesYear
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'Active': return 'bg-blue-100 text-blue-800'
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'New Order': return 'bg-blue-100 text-blue-800'
      case 'Upgrade': return 'bg-purple-100 text-purple-800'
      case 'Storage Expansion': return 'bg-indigo-100 text-indigo-800'
      case 'Database Setup': return 'bg-teal-100 text-teal-800'
      case 'DR Setup': return 'bg-orange-100 text-orange-800'
      case 'Network Upgrade': return 'bg-cyan-100 text-cyan-800'
      case 'Network Infrastructure': return 'bg-emerald-100 text-emerald-800'
      case 'Storage & Backup': return 'bg-amber-100 text-amber-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const viewInvoice = (order) => {
    setSelectedOrder(order)
    setShowInvoice(true)
  }

  const totalOrderValue = filteredOrders.reduce((sum, order) => sum + order.amount, 0)
  const completedOrders = filteredOrders.filter(order => order.status === 'Completed').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="sify-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/inventory')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Inventory
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Order History</h1>
                <p className="text-blue-100">Complete order history for Max Healthcare account</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
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
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-sify-blue">{filteredOrders.length}</p>
                </div>
                <Package className="h-8 w-8 text-sify-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-3xl font-bold text-sify-orange">₹{Math.round(totalOrderValue/1000)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-sify-orange" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{completedOrders}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Year</p>
                  <p className="text-3xl font-bold text-sify-blue">{filteredOrders.filter(o => o.date.startsWith('2024')).length}</p>
                </div>
                <Calendar className="h-8 w-8 text-sify-blue" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="sify-card mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by order ID, description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="sify-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-sify-blue">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      <Badge className={getTypeColor(order.type)}>{order.type}</Badge>
                    </div>
                    <p className="text-gray-600 mb-2">{order.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Order Date:</span>
                        <p className="font-medium">{order.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Commissioned:</span>
                        <p className="font-medium">{order.commissionedDate}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <p className="font-medium">{order.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Environment:</span>
                        <p className="font-medium">{order.environment}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-sify-orange">₹{order.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{order.items.length} items</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      {expandedOrders.has(order.id) ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          Hide Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Show Details
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewInvoice(order)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Invoice
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">
                    Invoice: {order.invoiceId}
                  </div>
                </div>

                {/* Expanded Order Details */}
                {expandedOrders.has(order.id) && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-3">Order Items</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Item</th>
                            <th className="text-left py-2">SKU</th>
                            <th className="text-right py-2">Qty</th>
                            <th className="text-right py-2">Unit Price</th>
                            <th className="text-right py-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-2">{item.name}</td>
                              <td className="py-2 font-mono text-xs">{item.sku}</td>
                              <td className="py-2 text-right">{item.quantity}</td>
                              <td className="py-2 text-right">₹{item.unitPrice.toLocaleString()}</td>
                              <td className="py-2 text-right font-medium">₹{item.totalPrice.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2">
                            <td colSpan="4" className="py-2 text-right font-semibold">Total:</td>
                            <td className="py-2 text-right font-bold text-sify-orange">₹{order.amount.toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Invoice Modal */}
        <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedOrder && (
              <>
                <DialogHeader>
                  <DialogTitle>Invoice {selectedOrder.invoiceId}</DialogTitle>
                  <DialogDescription>
                    Order {selectedOrder.id} - {selectedOrder.date}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Invoice Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-sify-blue">Sify Technologies Limited</h2>
                      <p className="text-gray-600">Cloud Infrastructure Services</p>
                      <p className="text-sm text-gray-500">
                        Sify House, Tidel Park, No.4, Rajiv Gandhi Salai<br/>
                        Taramani, Chennai - 600113
                      </p>
                    </div>
                    <div className="text-right">
                      <h3 className="text-xl font-bold">INVOICE</h3>
                      <p className="text-lg font-semibold">{selectedOrder.invoiceId}</p>
                      <p className="text-sm text-gray-600">Date: {selectedOrder.date}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Bill To */}
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-2">Bill To:</h4>
                      <p className="font-medium">Max Healthcare Institute Ltd</p>
                      <p className="text-sm text-gray-600">
                        Max House, 1, Dr. Jose P Rizal Marg<br/>
                        New Delhi - 110001<br/>
                        GSTIN: 07AABCM1234F1Z5
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Order Details:</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="text-gray-600">Order ID:</span> {selectedOrder.id}</p>
                        <p><span className="text-gray-600">Order Date:</span> {selectedOrder.date}</p>
                        <p><span className="text-gray-600">Commissioned:</span> {selectedOrder.commissionedDate}</p>
                        <p><span className="text-gray-600">Location:</span> {selectedOrder.location}</p>
                        <p><span className="text-gray-600">Environment:</span> {selectedOrder.environment}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Invoice Items */}
                  <div>
                    <h4 className="font-semibold mb-4">Items & Services</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2">
                            <th className="text-left py-3">Description</th>
                            <th className="text-left py-3">SKU</th>
                            <th className="text-right py-3">Qty</th>
                            <th className="text-right py-3">Unit Price</th>
                            <th className="text-right py-3">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="py-3">{item.name}</td>
                              <td className="py-3 font-mono text-xs">{item.sku}</td>
                              <td className="py-3 text-right">{item.quantity}</td>
                              <td className="py-3 text-right">₹{item.unitPrice.toLocaleString()}</td>
                              <td className="py-3 text-right">₹{item.totalPrice.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Separator />

                  {/* Invoice Totals */}
                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₹{selectedOrder.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CGST (9%):</span>
                        <span>₹{Math.round(selectedOrder.amount * 0.09).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SGST (9%):</span>
                        <span>₹{Math.round(selectedOrder.amount * 0.09).toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-sify-orange">₹{Math.round(selectedOrder.amount * 1.18).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="text-center text-sm text-gray-600 pt-4 border-t">
                    <p>Thank you for choosing Sify Technologies Limited</p>
                    <p>For support, contact: support@sify.com | +91-44-4545-4545</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Print Invoice
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

export default OrderHistoryPage

