import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Plus, 
  Sparkles,
  Server,
  Database,
  HardDrive,
  Network,
  Shield,
  Monitor,
  Search,
  X,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Zap,
  FileText,
  Save,
  Trash2,
  Edit3,
  Copy,
  Calculator,
  TrendingUp,
  Package
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useApp } from '../context/AppContext'
import { SKU_CATALOG, PAYMENT_MODELS, SERVICE_CATEGORIES, LOCATIONS } from '../data/skuData'

const EnhancedManualEntry = () => {
  const navigate = useNavigate()
  const { currentCustomer, addNotification } = useApp()
  
  const [requirements, setRequirements] = useState([])
  const [currentRequirement, setCurrentRequirement] = useState({
    id: '',
    name: '',
    description: '',
    category: '',
    specifications: {
      vcpu: '',
      memory: '',
      storage: '',
      bandwidth: '',
      connections: ''
    },
    quantity: 1,
    location: 'MUM',
    paymentModel: 'PAYG',
    matchedSku: null,
    customRequirement: false,
    estimatedPrice: 0
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestedSkus, setSuggestedSkus] = useState([])
  const [showSkuSuggestions, setShowSkuSuggestions] = useState(false)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [totalCost, setTotalCost] = useState(0)

  // Quick templates for common requirements
  const quickTemplates = [
    {
      name: 'Web Application Hosting',
      description: 'Standard web application with load balancer and database',
      items: [
        {
          name: 'Web Server Cluster',
          category: 'COMP',
          specifications: { vcpu: 4, memory: 8, storage: 100 },
          quantity: 2,
          suggestedSku: 'CI-COMP-SHARED-M-MUM'
        },
        {
          name: 'Database Server',
          category: 'DB',
          specifications: { vcpu: 4, memory: 16, storage: 200 },
          quantity: 1,
          suggestedSku: 'CI-DB-MYSQL-M-MUM'
        },
        {
          name: 'Load Balancer',
          category: 'NET',
          specifications: { throughput: '1 Gbps' },
          quantity: 1,
          suggestedSku: 'CI-NET-LB-BASIC-MUM'
        }
      ]
    },
    {
      name: 'Database Hosting',
      description: 'High-performance database with backup and monitoring',
      items: [
        {
          name: 'Primary Database',
          category: 'DB',
          specifications: { vcpu: 8, memory: 32, storage: 500 },
          quantity: 1,
          suggestedSku: 'CI-DB-POSTGRES-L-MUM'
        },
        {
          name: 'Backup Storage',
          category: 'STOR',
          specifications: { capacity: '1 TB' },
          quantity: 1,
          suggestedSku: 'CI-STOR-BLOCK-1TB-MUM'
        },
        {
          name: 'Monitoring Service',
          category: 'MON',
          specifications: { retention: '30 days' },
          quantity: 1,
          suggestedSku: 'CI-MON-BASIC-MUM'
        }
      ]
    },
    {
      name: 'E-commerce Platform',
      description: 'Complete e-commerce solution with CDN and security',
      items: [
        {
          name: 'Application Servers',
          category: 'COMP',
          specifications: { vcpu: 8, memory: 16, storage: 200 },
          quantity: 3,
          suggestedSku: 'CI-COMP-SHARED-L-MUM'
        },
        {
          name: 'Database Cluster',
          category: 'DB',
          specifications: { vcpu: 8, memory: 32, storage: 500 },
          quantity: 2,
          suggestedSku: 'CI-DB-MYSQL-L-MUM'
        },
        {
          name: 'CDN Service',
          category: 'NET',
          specifications: { bandwidth: '10 TB/month' },
          quantity: 1,
          suggestedSku: 'CI-NET-CDN-BASIC-MUM'
        },
        {
          name: 'SSL Certificate',
          category: 'SEC',
          specifications: { type: 'Wildcard' },
          quantity: 1,
          suggestedSku: 'CI-SEC-SSL-WILDCARD-MUM'
        }
      ]
    }
  ]

  // Search and match SKUs based on requirements
  useEffect(() => {
    if (currentRequirement.name && currentRequirement.category) {
      const matchedSkus = SKU_CATALOG.filter(sku => {
        const categoryMatch = sku.category === currentRequirement.category
        const locationMatch = sku.location === currentRequirement.location
        const nameMatch = searchTerm ? 
          sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sku.sku.toLowerCase().includes(searchTerm.toLowerCase()) : true
        
        return categoryMatch && locationMatch && nameMatch
      }).slice(0, 5)
      
      setSuggestedSkus(matchedSkus)
      setShowSkuSuggestions(matchedSkus.length > 0)
    } else {
      setSuggestedSkus([])
      setShowSkuSuggestions(false)
    }
  }, [currentRequirement.category, currentRequirement.location, searchTerm])

  // Calculate total cost
  useEffect(() => {
    const total = requirements.reduce((sum, req) => {
      if (req.matchedSku) {
        const sku = SKU_CATALOG.find(s => s.sku === req.matchedSku.sku)
        if (sku) {
          const price = sku.pricing[req.paymentModel]?.monthly || 0
          return sum + (price * req.quantity)
        }
      }
      return sum + (req.estimatedPrice * req.quantity)
    }, 0)
    setTotalCost(total)
  }, [requirements])

  const getServiceIcon = (category) => {
    const icons = {
      'COMP': Server,
      'DB': Database,
      'STOR': HardDrive,
      'NET': Network,
      'SEC': Shield,
      'MON': Monitor
    }
    return icons[category] || Package
  }

  const resetCurrentRequirement = () => {
    setCurrentRequirement({
      id: '',
      name: '',
      description: '',
      category: '',
      specifications: {
        vcpu: '',
        memory: '',
        storage: '',
        bandwidth: '',
        connections: ''
      },
      quantity: 1,
      location: 'MUM',
      paymentModel: 'PAYG',
      matchedSku: null,
      customRequirement: false,
      estimatedPrice: 0
    })
    setSearchTerm('')
    setShowSkuSuggestions(false)
    setEditingIndex(-1)
  }

  const selectSku = (sku) => {
    setCurrentRequirement(prev => ({
      ...prev,
      matchedSku: sku,
      customRequirement: false,
      estimatedPrice: sku.pricing[prev.paymentModel]?.monthly || 0
    }))
    setShowSkuSuggestions(false)
  }

  const markAsCustom = () => {
    setCurrentRequirement(prev => ({
      ...prev,
      matchedSku: null,
      customRequirement: true,
      estimatedPrice: 5000 // Default estimate for custom requirements
    }))
    setShowSkuSuggestions(false)
  }

  const addRequirement = () => {
    if (!currentRequirement.name || !currentRequirement.category) {
      addNotification({
        type: 'error',
        title: 'Missing Information',
        message: 'Please provide requirement name and category'
      })
      return
    }

    const newRequirement = {
      ...currentRequirement,
      id: editingIndex >= 0 ? requirements[editingIndex].id : `req-${Date.now()}`
    }

    if (editingIndex >= 0) {
      const updatedRequirements = [...requirements]
      updatedRequirements[editingIndex] = newRequirement
      setRequirements(updatedRequirements)
      addNotification({
        type: 'success',
        title: 'Requirement Updated',
        message: `${newRequirement.name} has been updated`
      })
    } else {
      setRequirements(prev => [...prev, newRequirement])
      addNotification({
        type: 'success',
        title: 'Requirement Added',
        message: `${newRequirement.name} has been added to your requirements`
      })
    }

    resetCurrentRequirement()
  }

  const editRequirement = (index) => {
    const requirement = requirements[index]
    setCurrentRequirement(requirement)
    setEditingIndex(index)
  }

  const deleteRequirement = (index) => {
    const requirement = requirements[index]
    setRequirements(prev => prev.filter((_, i) => i !== index))
    addNotification({
      type: 'success',
      title: 'Requirement Removed',
      message: `${requirement.name} has been removed`
    })
  }

  const duplicateRequirement = (index) => {
    const requirement = requirements[index]
    const duplicated = {
      ...requirement,
      id: `req-${Date.now()}`,
      name: `${requirement.name} (Copy)`
    }
    setRequirements(prev => [...prev, duplicated])
    addNotification({
      type: 'success',
      title: 'Requirement Duplicated',
      message: `${requirement.name} has been duplicated`
    })
  }

  const applyTemplate = (template) => {
    const templateRequirements = template.items.map((item, index) => ({
      id: `template-${Date.now()}-${index}`,
      name: item.name,
      description: `Part of ${template.name}`,
      category: item.category,
      specifications: item.specifications,
      quantity: item.quantity,
      location: 'MUM',
      paymentModel: 'PAYG',
      matchedSku: SKU_CATALOG.find(sku => sku.sku === item.suggestedSku),
      customRequirement: false,
      estimatedPrice: 0
    }))

    // Calculate estimated prices
    templateRequirements.forEach(req => {
      if (req.matchedSku) {
        req.estimatedPrice = req.matchedSku.pricing[req.paymentModel]?.monthly || 0
      }
    })

    setRequirements(prev => [...prev, ...templateRequirements])
    addNotification({
      type: 'success',
      title: 'Template Applied',
      message: `${template.name} template has been applied with ${template.items.length} requirements`
    })
  }

  const generateQuote = () => {
    if (requirements.length === 0) {
      addNotification({
        type: 'error',
        title: 'No Requirements',
        message: 'Please add at least one requirement to generate a quote'
      })
      return
    }

    const analysisResults = {
      flowType: requirements.some(req => req.customRequirement) ? 'custom' : 'standard',
      totalItems: requirements.length,
      knownSkus: requirements.filter(req => req.matchedSku).length,
      unknownRequirements: requirements.filter(req => req.customRequirement).length,
      estimatedCost: totalCost,
      processingTime: requirements.some(req => req.customRequirement) ? '5-7 business days' : '2-3 minutes',
      items: requirements.map(req => ({
        id: req.id,
        requirement: req.name,
        sku: req.matchedSku?.sku || null,
        quantity: req.quantity,
        status: req.customRequirement ? 'custom' : 'matched',
        specifications: req.specifications,
        pricing: req.matchedSku?.pricing || null,
        floorPrice: req.matchedSku?.floorPrice || 0,
        askPrice: req.estimatedPrice,
        paymentModel: req.paymentModel,
        description: req.description || req.matchedSku?.description,
        isEditable: !req.customRequirement,
        customNote: req.customRequirement ? 'Custom requirement needs SA/PM review' : null,
        estimatedRate: req.customRequirement ? req.estimatedPrice : null
      }))
    }

    navigate('/quote', { state: { analysisResults } })
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
              <Sparkles className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-gray-900">Interactive Requirement Builder</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {requirements.length} Requirements
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                ₹{(totalCost / 1000).toFixed(1)}K/month
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Requirement Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Templates */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span>Quick Templates</span>
                </CardTitle>
                <CardDescription>
                  Start with pre-configured templates for common use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickTemplates.map((template, index) => (
                    <Card key={index} className="bg-white/50 border-gray-200 hover:bg-white/70 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {template.items.length} items
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => applyTemplate(template)}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            Apply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirement Form */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-green-600" />
                  <span>{editingIndex >= 0 ? 'Edit Requirement' : 'Add New Requirement'}</span>
                </CardTitle>
                <CardDescription>
                  Define your infrastructure requirements and get real-time SKU matching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Requirement Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Web Server Cluster"
                      value={currentRequirement.name}
                      onChange={(e) => setCurrentRequirement(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Service Category *</Label>
                    <Select 
                      value={currentRequirement.category} 
                      onValueChange={(value) => setCurrentRequirement(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(SERVICE_CATEGORIES).map(([code, name]) => (
                          <SelectItem key={code} value={code}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose and requirements..."
                    value={currentRequirement.description}
                    onChange={(e) => setCurrentRequirement(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                  />
                </div>

                {/* Specifications */}
                <div>
                  <Label className="text-base font-medium">Specifications</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {currentRequirement.category === 'COMP' && (
                      <>
                        <div>
                          <Label htmlFor="vcpu">vCPU</Label>
                          <Input
                            id="vcpu"
                            type="number"
                            placeholder="4"
                            value={currentRequirement.specifications.vcpu}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, vcpu: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="memory">Memory (GB)</Label>
                          <Input
                            id="memory"
                            type="number"
                            placeholder="8"
                            value={currentRequirement.specifications.memory}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, memory: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="storage">Storage (GB)</Label>
                          <Input
                            id="storage"
                            type="number"
                            placeholder="100"
                            value={currentRequirement.specifications.storage}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, storage: e.target.value }
                            }))}
                          />
                        </div>
                      </>
                    )}
                    
                    {currentRequirement.category === 'DB' && (
                      <>
                        <div>
                          <Label htmlFor="vcpu">vCPU</Label>
                          <Input
                            id="vcpu"
                            type="number"
                            placeholder="4"
                            value={currentRequirement.specifications.vcpu}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, vcpu: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="memory">Memory (GB)</Label>
                          <Input
                            id="memory"
                            type="number"
                            placeholder="16"
                            value={currentRequirement.specifications.memory}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, memory: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="connections">Max Connections</Label>
                          <Input
                            id="connections"
                            type="number"
                            placeholder="1000"
                            value={currentRequirement.specifications.connections}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, connections: e.target.value }
                            }))}
                          />
                        </div>
                      </>
                    )}
                    
                    {currentRequirement.category === 'STOR' && (
                      <>
                        <div>
                          <Label htmlFor="storage">Capacity (GB)</Label>
                          <Input
                            id="storage"
                            type="number"
                            placeholder="1000"
                            value={currentRequirement.specifications.storage}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, storage: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="iops">IOPS</Label>
                          <Input
                            id="iops"
                            type="number"
                            placeholder="3000"
                            value={currentRequirement.specifications.iops}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, iops: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Storage Type</Label>
                          <Select 
                            value={currentRequirement.specifications.type || ''} 
                            onValueChange={(value) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, type: value }
                            }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SSD">SSD</SelectItem>
                              <SelectItem value="HDD">HDD</SelectItem>
                              <SelectItem value="NVMe">NVMe</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    {currentRequirement.category === 'NET' && (
                      <>
                        <div>
                          <Label htmlFor="bandwidth">Bandwidth</Label>
                          <Input
                            id="bandwidth"
                            placeholder="1 Gbps"
                            value={currentRequirement.specifications.bandwidth}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, bandwidth: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="throughput">Throughput</Label>
                          <Input
                            id="throughput"
                            placeholder="100 Mbps"
                            value={currentRequirement.specifications.throughput}
                            onChange={(e) => setCurrentRequirement(prev => ({
                              ...prev,
                              specifications: { ...prev.specifications, throughput: e.target.value }
                            }))}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Location and Quantity */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select 
                      value={currentRequirement.location} 
                      onValueChange={(value) => setCurrentRequirement(prev => ({ ...prev, location: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(LOCATIONS).map(([code, name]) => (
                          <SelectItem key={code} value={code}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={currentRequirement.quantity}
                      onChange={(e) => setCurrentRequirement(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentModel">Payment Model</Label>
                    <Select 
                      value={currentRequirement.paymentModel} 
                      onValueChange={(value) => setCurrentRequirement(prev => ({ ...prev, paymentModel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PAYMENT_MODELS).map(([code, model]) => (
                          <SelectItem key={code} value={code}>{model.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* SKU Matching */}
                {currentRequirement.category && (
                  <div>
                    <Label className="text-base font-medium">SKU Matching</Label>
                    <div className="mt-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search for matching SKUs..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      
                      {showSkuSuggestions && (
                        <div className="mt-2 space-y-2">
                          {suggestedSkus.map((sku) => (
                            <div key={sku.sku} className="border border-gray-200 rounded-lg p-3 bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="text-xs">{sku.sku}</Badge>
                                    <h4 className="font-medium text-gray-900">{sku.name}</h4>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">{sku.description}</p>
                                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                                    {sku.specifications.vcpu && <span>vCPU: {sku.specifications.vcpu}</span>}
                                    {sku.specifications.memory && <span>Memory: {sku.specifications.memory}</span>}
                                    {sku.specifications.storage && <span>Storage: {sku.specifications.storage}</span>}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-blue-600">
                                    ₹{sku.pricing[currentRequirement.paymentModel]?.monthly.toLocaleString()}/month
                                  </p>
                                  <Button
                                    size="sm"
                                    onClick={() => selectSku(sku)}
                                    className="mt-2"
                                  >
                                    Select SKU
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          <div className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-orange-900">Custom Requirement</h4>
                                <p className="text-sm text-orange-700">No matching SKU found? Mark as custom requirement</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={markAsCustom}
                                className="border-orange-300 text-orange-700 hover:bg-orange-100"
                              >
                                Mark as Custom
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {currentRequirement.matchedSku && (
                        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-900">Matched SKU: {currentRequirement.matchedSku.sku}</span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">{currentRequirement.matchedSku.name}</p>
                          <p className="text-sm font-medium text-green-900 mt-1">
                            ₹{currentRequirement.matchedSku.pricing[currentRequirement.paymentModel]?.monthly.toLocaleString()}/month
                          </p>
                        </div>
                      )}
                      
                      {currentRequirement.customRequirement && (
                        <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-orange-600" />
                            <span className="font-medium text-orange-900">Custom Requirement</span>
                          </div>
                          <p className="text-sm text-orange-700 mt-1">This will require SA/PM review and approval</p>
                          <div className="mt-2">
                            <Label htmlFor="estimatedPrice">Estimated Price (₹/month)</Label>
                            <Input
                              id="estimatedPrice"
                              type="number"
                              value={currentRequirement.estimatedPrice}
                              onChange={(e) => setCurrentRequirement(prev => ({ ...prev, estimatedPrice: parseInt(e.target.value) || 0 }))}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={resetCurrentRequirement}
                  >
                    {editingIndex >= 0 ? 'Cancel Edit' : 'Clear Form'}
                  </Button>
                  <Button
                    onClick={addRequirement}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={!currentRequirement.name || !currentRequirement.category}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingIndex >= 0 ? 'Update Requirement' : 'Add Requirement'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Requirements Summary */}
          <div className="space-y-6">
            {/* Cost Summary */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <span>Cost Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">₹{(totalCost / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-gray-600">Estimated Monthly Cost</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Standard SKUs:</span>
                      <span>{requirements.filter(req => req.matchedSku).length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Custom Requirements:</span>
                      <span>{requirements.filter(req => req.customRequirement).length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Items:</span>
                      <span>{requirements.length}</span>
                    </div>
                  </div>

                  {requirements.length > 0 && (
                    <Button
                      onClick={generateQuote}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Quote
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Requirements List */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-purple-600" />
                  <span>Requirements ({requirements.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => {
                    const ServiceIcon = getServiceIcon(requirement.category)
                    return (
                      <div key={requirement.id} className="border border-gray-200 rounded-lg p-3 bg-white/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <ServiceIcon className="h-4 w-4 text-gray-600" />
                            <h4 className="font-medium text-gray-900 text-sm">{requirement.name}</h4>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => editRequirement(index)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => duplicateRequirement(index)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteRequirement(index)}
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={requirement.customRequirement ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}
                            >
                              {requirement.customRequirement ? 'Custom' : requirement.matchedSku?.sku}
                            </Badge>
                            <span>Qty: {requirement.quantity}</span>
                          </div>
                          <p className="font-medium text-blue-600">
                            ₹{((requirement.matchedSku?.pricing[requirement.paymentModel]?.monthly || requirement.estimatedPrice) * requirement.quantity).toLocaleString()}/month
                          </p>
                        </div>
                      </div>
                    )
                  })}
                  
                  {requirements.length === 0 && (
                    <div className="text-center py-8">
                      <Package className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No requirements added yet</p>
                      <p className="text-xs text-gray-500">Use the form to add your first requirement</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedManualEntry

