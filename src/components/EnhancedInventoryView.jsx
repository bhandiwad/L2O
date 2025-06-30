import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Package, 
  Sparkles,
  Server,
  Database,
  HardDrive,
  Network,
  Shield,
  Monitor,
  DollarSign,
  Calendar,
  TrendingUp,
  Settings,
  Plus,
  ArrowRightLeft,
  Trash2,
  Edit3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  RefreshCw,
  Download,
  BarChart3,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { useApp } from '../context/AppContext'
import { SAMPLE_INVENTORY, PAYMENT_MODELS, MACD_OPERATIONS, COST_OPTIMIZATION_RECOMMENDATIONS } from '../data/skuData'

const EnhancedInventoryView = () => {
  const navigate = useNavigate()
  const { currentCustomer, addNotification } = useApp()
  
  const [inventory, setInventory] = useState(SAMPLE_INVENTORY)
  const [filteredInventory, setFilteredInventory] = useState(SAMPLE_INVENTORY)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPaymentModel, setFilterPaymentModel] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedResource, setSelectedResource] = useState(null)
  const [macdOperation, setMacdOperation] = useState(null)
  const [macdForm, setMacdForm] = useState({})
  const [showOptimization, setShowOptimization] = useState(false)
  const [optimizationRecommendations, setOptimizationRecommendations] = useState(COST_OPTIMIZATION_RECOMMENDATIONS)

  // Filter inventory based on search and filters
  useEffect(() => {
    let filtered = inventory

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Payment model filter
    if (filterPaymentModel !== 'all') {
      filtered = filtered.filter(item => item.paymentModel === filterPaymentModel)
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus)
    }

    setFilteredInventory(filtered)
  }, [inventory, searchTerm, filterPaymentModel, filterStatus])

  const getServiceIcon = (sku) => {
    if (sku.includes('COMP')) return Server
    if (sku.includes('DB')) return Database
    if (sku.includes('STOR')) return HardDrive
    if (sku.includes('NET')) return Network
    if (sku.includes('SEC')) return Shield
    if (sku.includes('MON')) return Monitor
    return Package
  }

  const getPaymentModelColor = (paymentModel) => {
    const colors = {
      'PAYG': 'bg-blue-100 text-blue-800',
      'RI1Y': 'bg-green-100 text-green-800',
      'RI3Y': 'bg-purple-100 text-purple-800'
    }
    return colors[paymentModel] || 'bg-gray-100 text-gray-800'
  }

  const getStatusColor = (status) => {
    const colors = {
      'running': 'bg-green-100 text-green-800',
      'stopped': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'maintenance': 'bg-orange-100 text-orange-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const calculateTotalCost = () => {
    return filteredInventory.reduce((sum, item) => sum + item.monthlyRate, 0)
  }

  const calculateTotalSavings = () => {
    return filteredInventory.reduce((sum, item) => sum + (item.potentialSavings || 0), 0)
  }

  const getRIExpiryStatus = (riExpiry) => {
    if (!riExpiry) return null
    
    const expiryDate = new Date(riExpiry)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) return { status: 'expired', days: Math.abs(daysUntilExpiry), color: 'text-red-600' }
    if (daysUntilExpiry <= 30) return { status: 'expiring', days: daysUntilExpiry, color: 'text-orange-600' }
    if (daysUntilExpiry <= 90) return { status: 'warning', days: daysUntilExpiry, color: 'text-yellow-600' }
    return { status: 'active', days: daysUntilExpiry, color: 'text-green-600' }
  }

  const startMACDOperation = (resource, operation) => {
    setSelectedResource(resource)
    setMacdOperation(operation)
    setMacdForm({
      reason: '',
      targetLocation: resource.location,
      newSpecifications: { ...resource.specifications },
      estimatedDowntime: MACD_OPERATIONS[operation].estimatedDuration,
      approvalRequired: MACD_OPERATIONS[operation].requiresApproval
    })
  }

  const submitMACDOperation = () => {
    const operation = MACD_OPERATIONS[macdOperation]
    
    addNotification({
      type: 'success',
      title: `${operation.name} Initiated`,
      message: `${operation.name} request submitted for ${selectedResource.resourceName}. ${
        macdForm.approvalRequired ? 'Pending approval.' : 'Processing started.'
      }`
    })

    // Update resource status if needed
    if (macdOperation === 'DELETE') {
      setInventory(prev => prev.filter(item => item.id !== selectedResource.id))
    } else {
      setInventory(prev => prev.map(item => 
        item.id === selectedResource.id 
          ? { ...item, status: 'maintenance', lastModified: new Date().toISOString() }
          : item
      ))
    }

    setSelectedResource(null)
    setMacdOperation(null)
    setMacdForm({})
  }

  const convertToRI = (resource, riType) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === resource.id) {
        const newRate = riType === 'RI1Y' 
          ? Math.round(item.monthlyRate * 0.8) 
          : Math.round(item.monthlyRate * 0.6)
        
        return {
          ...item,
          paymentModel: riType,
          monthlyRate: newRate,
          riExpiry: riType === 'RI1Y' 
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            : new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          potentialSavings: 0
        }
      }
      return item
    })
    
    setInventory(updatedInventory)
    
    addNotification({
      type: 'success',
      title: 'Payment Model Updated',
      message: `${resource.resourceName} converted to ${PAYMENT_MODELS[riType].name}`
    })
  }

  const applyOptimizationRecommendation = (recommendation) => {
    if (recommendation.type === 'payment_model_upgrade') {
      const resource = inventory.find(item => item.id === recommendation.resourceId)
      if (resource) {
        convertToRI(resource, 'RI1Y')
      }
    }
    
    // Remove applied recommendation
    setOptimizationRecommendations(prev => 
      prev.filter(rec => rec.id !== recommendation.id)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="hover:bg-white/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-900">Inventory Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOptimization(!showOptimization)}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Cost Optimization
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resources</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredInventory.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Server className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Cost</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(calculateTotalCost() / 1000).toFixed(1)}K</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Potential Savings</p>
                  <p className="text-2xl font-bold text-orange-600">₹{(calculateTotalSavings() / 1000).toFixed(1)}K</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">RI Coverage</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round((inventory.filter(item => item.paymentModel.startsWith('RI')).length / inventory.length) * 100)}%
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Optimization Panel */}
        {showOptimization && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <span>Cost Optimization Recommendations</span>
              </CardTitle>
              <CardDescription>
                AI-powered recommendations to reduce your cloud costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationRecommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{recommendation.title}</h3>
                          <p className="text-sm text-gray-600">{recommendation.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          ₹{recommendation.potentialSavings.toLocaleString()}/month
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{recommendation.annualSavings.toLocaleString()}/year
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <Badge variant="outline" className="text-xs">
                          {recommendation.effort} effort
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {recommendation.riskLevel} risk
                        </Badge>
                        <span className="text-gray-600">{recommendation.implementation}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => applyOptimizationRecommendation(recommendation)}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        Apply Recommendation
                      </Button>
                    </div>
                  </div>
                ))}
                
                {optimizationRecommendations.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All Optimized!</h3>
                    <p className="text-gray-600">No cost optimization recommendations at this time.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search Resources</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, SKU, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="paymentModel">Payment Model</Label>
                <Select value={filterPaymentModel} onValueChange={setFilterPaymentModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payment Models</SelectItem>
                    <SelectItem value="PAYG">Pay As You Go</SelectItem>
                    <SelectItem value="RI1Y">Reserved Instance 1Y</SelectItem>
                    <SelectItem value="RI3Y">Reserved Instance 3Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="stopped">Stopped</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Resource Inventory</CardTitle>
            <CardDescription>
              Manage your cloud resources, payment models, and perform MACD operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInventory.map((resource) => {
                const ServiceIcon = getServiceIcon(resource.sku)
                const riStatus = getRIExpiryStatus(resource.riExpiry)
                
                return (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4 bg-white/50 hover:bg-white/70 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <ServiceIcon className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{resource.resourceName}</h3>
                          <p className="text-sm text-gray-600">{resource.sku}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {resource.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <Badge className={getPaymentModelColor(resource.paymentModel)}>
                              {PAYMENT_MODELS[resource.paymentModel]?.name || resource.paymentModel}
                            </Badge>
                            <Badge className={getStatusColor(resource.status)}>
                              {resource.status}
                            </Badge>
                          </div>
                          <p className="text-lg font-bold text-gray-900 mt-1">
                            ₹{resource.monthlyRate.toLocaleString()}/month
                          </p>
                          {resource.potentialSavings > 0 && (
                            <p className="text-sm text-orange-600">
                              Save ₹{resource.potentialSavings.toLocaleString()}/month
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Resource Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Specifications</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          {resource.specifications.vcpu && (
                            <p>vCPU: {resource.specifications.vcpu}</p>
                          )}
                          {resource.specifications.memory && (
                            <p>Memory: {resource.specifications.memory}</p>
                          )}
                          {resource.specifications.storage && (
                            <p>Storage: {resource.specifications.storage}</p>
                          )}
                          {resource.specifications.engine && (
                            <p>Engine: {resource.specifications.engine}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Usage & Performance</h4>
                        <div className="space-y-2">
                          {resource.usage.cpu && (
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>CPU</span>
                                <span>{resource.usage.cpu}%</span>
                              </div>
                              <Progress value={resource.usage.cpu} className="h-2" />
                            </div>
                          )}
                          {resource.usage.memory && (
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Memory</span>
                                <span>{resource.usage.memory}%</span>
                              </div>
                              <Progress value={resource.usage.memory} className="h-2" />
                            </div>
                          )}
                          {resource.usage.storage && (
                            <div>
                              <div className="flex justify-between text-xs">
                                <span>Storage</span>
                                <span>{resource.usage.storage}%</span>
                              </div>
                              <Progress value={resource.usage.storage} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Payment & Contract</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Model: {PAYMENT_MODELS[resource.paymentModel]?.name}</p>
                          <p>Location: {resource.location}</p>
                          {resource.riExpiry && riStatus && (
                            <p className={riStatus.color}>
                              {riStatus.status === 'expired' ? 'Expired' : 
                               riStatus.status === 'expiring' ? 'Expires in' :
                               riStatus.status === 'warning' ? 'Expires in' : 'Active for'} {riStatus.days} days
                            </p>
                          )}
                          <p>Modified: {new Date(resource.lastModified).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        {/* Payment Model Actions */}
                        {resource.paymentModel === 'PAYG' && resource.potentialSavings > 0 && (
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => convertToRI(resource, 'RI1Y')}
                              className="text-green-600 border-green-200 hover:bg-green-50"
                            >
                              <Zap className="h-4 w-4 mr-1" />
                              Convert to RI 1Y
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => convertToRI(resource, 'RI3Y')}
                              className="text-purple-600 border-purple-200 hover:bg-purple-50"
                            >
                              <Zap className="h-4 w-4 mr-1" />
                              Convert to RI 3Y
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* MACD Operations */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startMACDOperation(resource, 'ADD')}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startMACDOperation(resource, 'CHANGE')}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Change
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startMACDOperation(resource, 'MOVE')}
                        >
                          <ArrowRightLeft className="h-4 w-4 mr-1" />
                          Move
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startMACDOperation(resource, 'DELETE')}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
              
              {filteredInventory.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* MACD Operation Modal */}
        {selectedResource && macdOperation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>{MACD_OPERATIONS[macdOperation].name}</span>
                </CardTitle>
                <CardDescription>
                  {MACD_OPERATIONS[macdOperation].description} for {selectedResource.resourceName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="reason">Reason for {MACD_OPERATIONS[macdOperation].name}</Label>
                  <Textarea
                    id="reason"
                    placeholder="Provide a reason for this operation..."
                    value={macdForm.reason}
                    onChange={(e) => setMacdForm(prev => ({ ...prev, reason: e.target.value }))}
                    rows={3}
                  />
                </div>

                {macdOperation === 'MOVE' && (
                  <div>
                    <Label htmlFor="targetLocation">Target Location</Label>
                    <Select 
                      value={macdForm.targetLocation} 
                      onValueChange={(value) => setMacdForm(prev => ({ ...prev, targetLocation: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mumbai">Mumbai</SelectItem>
                        <SelectItem value="Delhi">Delhi</SelectItem>
                        <SelectItem value="Bangalore">Bangalore</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {(macdOperation === 'CHANGE' || macdOperation === 'ADD') && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedResource.specifications.vcpu && (
                      <div>
                        <Label htmlFor="vcpu">vCPU</Label>
                        <Input
                          id="vcpu"
                          type="number"
                          value={macdForm.newSpecifications?.vcpu || selectedResource.specifications.vcpu}
                          onChange={(e) => setMacdForm(prev => ({
                            ...prev,
                            newSpecifications: {
                              ...prev.newSpecifications,
                              vcpu: parseInt(e.target.value)
                            }
                          }))}
                        />
                      </div>
                    )}
                    {selectedResource.specifications.memory && (
                      <div>
                        <Label htmlFor="memory">Memory (GB)</Label>
                        <Input
                          id="memory"
                          value={macdForm.newSpecifications?.memory || selectedResource.specifications.memory}
                          onChange={(e) => setMacdForm(prev => ({
                            ...prev,
                            newSpecifications: {
                              ...prev.newSpecifications,
                              memory: e.target.value
                            }
                          }))}
                        />
                      </div>
                    )}
                    {selectedResource.specifications.storage && (
                      <div>
                        <Label htmlFor="storage">Storage</Label>
                        <Input
                          id="storage"
                          value={macdForm.newSpecifications?.storage || selectedResource.specifications.storage}
                          onChange={(e) => setMacdForm(prev => ({
                            ...prev,
                            newSpecifications: {
                              ...prev.newSpecifications,
                              storage: e.target.value
                            }
                          }))}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      Estimated Duration: {macdForm.estimatedDowntime} minutes
                    </span>
                  </div>
                  {macdForm.approvalRequired && (
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-orange-600">Requires Approval</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedResource(null)
                      setMacdOperation(null)
                      setMacdForm({})
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={submitMACDOperation}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={!macdForm.reason}
                  >
                    Submit {MACD_OPERATIONS[macdOperation].name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default EnhancedInventoryView

