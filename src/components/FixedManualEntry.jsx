import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  EyeOff,
  Save,
  FileText,
  Sparkles,
  Cpu,
  HardDrive,
  Network,
  Shield,
  Database,
  Monitor,
  Zap,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useApp } from '../context/AppContext'

const ManualEntry = () => {
  const navigate = useNavigate()
  const { currentCustomer, addNotification } = useApp()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [requirements, setRequirements] = useState([])
  const [currentRequirement, setCurrentRequirement] = useState({
    name: '',
    category: '',
    description: '',
    specifications: {},
    location: 'Mumbai'
  })
  const [suggestions, setSuggestions] = useState([])
  const [showLegacyMapping, setShowLegacyMapping] = useState({})
  const [selectedTemplate, setSelectedTemplate] = useState('')

  // Intelligence rules for automatic SKU suggestions
  const intelligenceRules = {
    'Windows OS': [
      { sku: 'CI-SEC-AV-ENTERPRISE-MUM', name: 'Enterprise Antivirus', reason: 'Windows systems require antivirus protection' },
      { sku: 'CI-SEC-PATCH-MGMT-MUM', name: 'Patch Management', reason: 'Windows systems need regular security updates' }
    ],
    'Linux OS': [
      { sku: 'CI-SEC-COMPLIANCE-MUM', name: 'Security Compliance', reason: 'Linux systems benefit from compliance monitoring' }
    ],
    'High Availability': [
      { sku: 'CI-NET-LB-ADVANCED-MUM', name: 'Advanced Load Balancer', reason: 'HA setup requires load balancing' },
      { sku: 'CI-MON-CLUSTER-MUM', name: 'Cluster Monitoring', reason: 'HA clusters need specialized monitoring' }
    ],
    'Disaster Recovery': [
      { sku: 'CI-NET-MPLS-10G-CHE', name: 'MPLS Network Link', reason: 'DR requires dedicated network connectivity' },
      { sku: 'CI-STOR-BACKUP-OFFSITE-MUM', name: 'Offsite Backup Storage', reason: 'DR needs offsite backup storage' },
      { sku: 'CI-COMP-DR-REPLICA-CHE', name: 'DR Replica Server', reason: 'DR requires replica infrastructure' }
    ],
    'Database': [
      { sku: 'CI-STOR-BACKUP-DB-MUM', name: 'Database Backup Service', reason: 'Databases require regular backups' },
      { sku: 'CI-MON-DATABASE-ADV-MUM', name: 'Advanced Database Monitoring', reason: 'Database performance monitoring is critical' }
    ],
    'Web Application': [
      { sku: 'CI-SEC-WAF-ENTERPRISE-MUM', name: 'Web Application Firewall', reason: 'Web apps need WAF protection' },
      { sku: 'CI-SEC-SSL-CERT-MUM', name: 'SSL Certificate', reason: 'Web applications require SSL certificates' },
      { sku: 'CI-SEC-DDOS-PROTECTION-MUM', name: 'DDoS Protection', reason: 'Public web apps need DDoS protection' }
    ],
    'Public Facing': [
      { sku: 'CI-SEC-FW-ENTERPRISE-MUM', name: 'Enterprise Firewall', reason: 'Public services need firewall protection' },
      { sku: 'CI-SEC-IDS-IPS-MUM', name: 'Intrusion Detection System', reason: 'Public services need intrusion detection' }
    ],
    'E-commerce': [
      { sku: 'CI-SEC-PCI-COMPLIANCE-MUM', name: 'PCI Compliance Service', reason: 'E-commerce requires PCI compliance' },
      { sku: 'CI-SEC-FRAUD-DETECTION-MUM', name: 'Fraud Detection Service', reason: 'E-commerce needs fraud protection' }
    ]
  }

  // Quick templates for common scenarios
  const templates = {
    'web-app': {
      name: 'Web Application Stack',
      requirements: [
        {
          name: 'Web Servers',
          category: 'Compute',
          sku: 'CI-COMP-SHARED-L-MUM',
          legacySku: 'CI-COMP-VPI-L',
          specifications: { vcpu: 8, ram: 32, storage: 500 },
          monthlyRate: 12000,
          quantity: 2,
          triggers: ['Web Application', 'High Availability']
        },
        {
          name: 'Database Server',
          category: 'Compute',
          sku: 'CI-COMP-DEDICATED-XL-MUM',
          legacySku: 'CI-COMP-VPE-XL',
          specifications: { vcpu: 16, ram: 128, storage: 1000 },
          monthlyRate: 45000,
          quantity: 1,
          triggers: ['Database']
        }
      ]
    },
    'ecommerce': {
      name: 'E-commerce Platform',
      requirements: [
        {
          name: 'Application Servers',
          category: 'Compute',
          sku: 'CI-COMP-SHARED-XL-MUM',
          legacySku: 'CI-COMP-VPI-XL',
          specifications: { vcpu: 16, ram: 64, storage: 1000 },
          monthlyRate: 25000,
          quantity: 3,
          triggers: ['Web Application', 'E-commerce', 'High Availability']
        },
        {
          name: 'Database Cluster',
          category: 'Database',
          sku: 'CI-DB-MYSQL-CLUSTER-MUM',
          legacySku: 'CI-DB-MYSQL-CL',
          specifications: { vcpu: 32, ram: 256, storage: 2000 },
          monthlyRate: 85000,
          quantity: 1,
          triggers: ['Database', 'High Availability']
        }
      ]
    },
    'analytics': {
      name: 'Analytics & BI Platform',
      requirements: [
        {
          name: 'Analytics Compute',
          category: 'Compute',
          sku: 'CI-COMP-GPU-ANALYTICS-MUM',
          legacySku: 'CI-COMP-GPU-AN',
          specifications: { vcpu: 32, ram: 256, gpu: '4x V100' },
          monthlyRate: 65000,
          quantity: 1,
          triggers: ['High Availability']
        },
        {
          name: 'Data Storage',
          category: 'Storage',
          sku: 'CI-STOR-DATALAKE-10TB-MUM',
          legacySku: 'CI-STOR-DL-10TB',
          specifications: { capacity: '10TB', iops: 50000 },
          monthlyRate: 35000,
          quantity: 1,
          triggers: ['Database']
        }
      ]
    }
  }

  const categories = [
    { id: 'compute', name: 'Compute', icon: Cpu },
    { id: 'network', name: 'Network', icon: Network },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'storage', name: 'Storage', icon: HardDrive },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'monitoring', name: 'Monitoring', icon: Monitor }
  ]

  const locations = [
    { id: 'Mumbai', name: 'Mumbai' },
    { id: 'Chennai', name: 'Chennai' },
    { id: 'Delhi', name: 'Delhi' },
    { id: 'Bangalore', name: 'Bangalore' }
  ]

  // Generate intelligent suggestions based on current requirements
  const generateSuggestions = (newRequirements) => {
    const allSuggestions = []
    const existingSkus = new Set(newRequirements.map(req => req.sku))

    newRequirements.forEach(req => {
      if (req.triggers) {
        req.triggers.forEach(trigger => {
          if (intelligenceRules[trigger]) {
            intelligenceRules[trigger].forEach(suggestion => {
              if (!existingSkus.has(suggestion.sku)) {
                allSuggestions.push({
                  ...suggestion,
                  category: suggestion.sku.includes('SEC') ? 'Security' :
                           suggestion.sku.includes('NET') ? 'Network' :
                           suggestion.sku.includes('STOR') ? 'Storage' :
                           suggestion.sku.includes('MON') ? 'Monitoring' : 'Service',
                  monthlyRate: Math.floor(Math.random() * 20000) + 5000,
                  quantity: 1,
                  location: req.location || 'Mumbai'
                })
              }
            })
          }
        })
      }
    })

    // Remove duplicates
    const uniqueSuggestions = allSuggestions.filter((suggestion, index, self) =>
      index === self.findIndex(s => s.sku === suggestion.sku)
    )

    setSuggestions(uniqueSuggestions)
  }

  const applyTemplate = (templateKey) => {
    if (!templateKey) return
    
    const template = templates[templateKey]
    if (template) {
      const templateRequirements = template.requirements.map(req => ({
        ...req,
        id: Date.now() + Math.random(),
        legacySku: req.legacySku || req.sku.replace('CI-', 'CI-OLD-')
      }))
      
      setRequirements(templateRequirements)
      generateSuggestions(templateRequirements)
      setCurrentStep(2)
      addNotification(`Applied ${template.name} template`, 'success')
    }
  }

  const addRequirement = () => {
    if (!currentRequirement.name || !currentRequirement.category) {
      addNotification('Please fill in requirement name and category', 'warning')
      return
    }

    const newRequirement = {
      ...currentRequirement,
      id: Date.now(),
      sku: generateSku(currentRequirement),
      legacySku: generateLegacySku(currentRequirement),
      monthlyRate: Math.floor(Math.random() * 50000) + 10000,
      quantity: 1,
      triggers: detectTriggers(currentRequirement)
    }

    const updatedRequirements = [...requirements, newRequirement]
    setRequirements(updatedRequirements)
    generateSuggestions(updatedRequirements)
    
    // Reset form
    setCurrentRequirement({
      name: '',
      category: '',
      description: '',
      specifications: {},
      location: 'Mumbai'
    })
    
    addNotification('Requirement added successfully', 'success')
  }

  const generateSku = (requirement) => {
    const categoryMap = {
      'Compute': 'COMP',
      'Network': 'NET',
      'Security': 'SEC',
      'Storage': 'STOR',
      'Database': 'DB',
      'Monitoring': 'MON'
    }
    
    const category = categoryMap[requirement.category] || 'MISC'
    const location = requirement.location.substring(0, 3).toUpperCase()
    const size = requirement.specifications.vcpu > 16 ? 'XL' : 
                 requirement.specifications.vcpu > 8 ? 'L' : 
                 requirement.specifications.vcpu > 4 ? 'M' : 'S'
    
    return `CI-${category}-${requirement.name.replace(/\s+/g, '-').toUpperCase()}-${size}-${location}`
  }

  const generateLegacySku = (requirement) => {
    const categoryMap = {
      'Compute': requirement.specifications.dedicated ? 'VPE' : 'VPI',
      'Network': 'NET',
      'Security': 'SEC',
      'Storage': 'STOR',
      'Database': 'DB',
      'Monitoring': 'MON'
    }
    
    const category = categoryMap[requirement.category] || 'MISC'
    const size = requirement.specifications.vcpu > 16 ? 'XL' : 
                 requirement.specifications.vcpu > 8 ? 'L' : 
                 requirement.specifications.vcpu > 4 ? 'M' : 'S'
    
    return `CI-${category}-${size}`
  }

  const detectTriggers = (requirement) => {
    const triggers = []
    const name = requirement.name.toLowerCase()
    const description = requirement.description.toLowerCase()
    const combined = `${name} ${description}`

    if (combined.includes('windows')) triggers.push('Windows OS')
    if (combined.includes('linux')) triggers.push('Linux OS')
    if (combined.includes('high availability') || combined.includes('ha')) triggers.push('High Availability')
    if (combined.includes('disaster recovery') || combined.includes('dr')) triggers.push('Disaster Recovery')
    if (combined.includes('database') || combined.includes('db')) triggers.push('Database')
    if (combined.includes('web') || combined.includes('application')) triggers.push('Web Application')
    if (combined.includes('public') || combined.includes('internet')) triggers.push('Public Facing')
    if (combined.includes('ecommerce') || combined.includes('e-commerce')) triggers.push('E-commerce')

    return triggers
  }

  const acceptSuggestion = (suggestion) => {
    const newRequirement = {
      ...suggestion,
      id: Date.now() + Math.random(),
      legacySku: suggestion.sku.replace('CI-', 'CI-OLD-')
    }
    
    const updatedRequirements = [...requirements, newRequirement]
    setRequirements(updatedRequirements)
    
    // Remove accepted suggestion
    setSuggestions(suggestions.filter(s => s.sku !== suggestion.sku))
    addNotification(`Added ${suggestion.name}`, 'success')
  }

  const removeRequirement = (id) => {
    const updatedRequirements = requirements.filter(req => req.id !== id)
    setRequirements(updatedRequirements)
    generateSuggestions(updatedRequirements)
    addNotification('Requirement removed', 'info')
  }

  const toggleLegacyMapping = (id) => {
    setShowLegacyMapping(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const generateQuote = () => {
    if (requirements.length === 0) {
      addNotification('Please add at least one requirement', 'warning')
      return
    }
    
    addNotification('Quote generated successfully', 'success')
    setCurrentStep(3)
  }

  const totalCost = requirements.reduce((sum, req) => sum + (req.monthlyRate * req.quantity), 0)

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
                <h1 className="text-2xl font-bold text-white">Manual Entry</h1>
                <p className="text-blue-100">Interactive requirement builder with intelligent suggestions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Step 1: Template Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card className="sify-card">
              <CardHeader className="sify-card-header">
                <CardTitle className="sify-text-primary">Quick Start Templates</CardTitle>
                <CardDescription>Choose a pre-configured template or start from scratch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(templates).map(([key, template]) => (
                    <Card key={key} className="sify-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedTemplate(key)}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold sify-text-primary">{template.name}</h3>
                          <Badge className="sify-badge-secondary">{template.requirements.length} items</Badge>
                        </div>
                        <div className="space-y-2">
                          {template.requirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 sify-bg-primary rounded-full"></div>
                              <span className="text-sm text-gray-600">{req.name}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    onClick={() => applyTemplate(selectedTemplate)}
                    disabled={!selectedTemplate}
                    className="sify-btn-primary"
                  >
                    Apply Template
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                  >
                    Start from Scratch
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Requirement Builder */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Add Requirement Form */}
            <Card className="sify-card">
              <CardHeader className="sify-card-header">
                <CardTitle className="sify-text-primary flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Requirement
                </CardTitle>
                <CardDescription>Describe your infrastructure requirement and get intelligent suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Requirement Name</Label>
                      <Input
                        id="name"
                        value={currentRequirement.name}
                        onChange={(e) => setCurrentRequirement({...currentRequirement, name: e.target.value})}
                        placeholder="e.g., Web Application Servers"
                        className="sify-input"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={currentRequirement.category} onValueChange={(value) => setCurrentRequirement({...currentRequirement, category: value})}>
                        <SelectTrigger className="sify-input">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              <div className="flex items-center space-x-2">
                                <category.icon className="w-4 h-4" />
                                <span>{category.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Select value={currentRequirement.location} onValueChange={(value) => setCurrentRequirement({...currentRequirement, location: value})}>
                        <SelectTrigger className="sify-input">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location.id} value={location.id}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={currentRequirement.description}
                        onChange={(e) => setCurrentRequirement({...currentRequirement, description: e.target.value})}
                        placeholder="Describe the requirement in detail (mention Windows/Linux, HA, DR, web application, etc.)"
                        className="sify-input"
                        rows={4}
                      />
                    </div>
                    
                    {currentRequirement.category === 'Compute' && (
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label htmlFor="vcpu">vCPU</Label>
                          <Input
                            id="vcpu"
                            type="number"
                            value={currentRequirement.specifications.vcpu || ''}
                            onChange={(e) => setCurrentRequirement({
                              ...currentRequirement, 
                              specifications: {...currentRequirement.specifications, vcpu: parseInt(e.target.value)}
                            })}
                            placeholder="8"
                            className="sify-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="ram">RAM (GB)</Label>
                          <Input
                            id="ram"
                            type="number"
                            value={currentRequirement.specifications.ram || ''}
                            onChange={(e) => setCurrentRequirement({
                              ...currentRequirement, 
                              specifications: {...currentRequirement.specifications, ram: parseInt(e.target.value)}
                            })}
                            placeholder="32"
                            className="sify-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="storage">Storage (GB)</Label>
                          <Input
                            id="storage"
                            type="number"
                            value={currentRequirement.specifications.storage || ''}
                            onChange={(e) => setCurrentRequirement({
                              ...currentRequirement, 
                              specifications: {...currentRequirement.specifications, storage: parseInt(e.target.value)}
                            })}
                            placeholder="500"
                            className="sify-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={addRequirement} className="sify-btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Intelligent Suggestions */}
            {suggestions.length > 0 && (
              <Card className="sify-card">
                <CardHeader className="sify-card-header">
                  <CardTitle className="sify-text-secondary flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Intelligent Suggestions
                  </CardTitle>
                  <CardDescription>Based on your requirements, we recommend adding these related services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <Sparkles className="w-5 h-5 sify-text-secondary" />
                            <div>
                              <h4 className="font-medium">{suggestion.name}</h4>
                              <p className="text-sm text-gray-600">{suggestion.reason}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge className="sify-badge-primary">{suggestion.sku}</Badge>
                                <Badge variant="outline">₹{suggestion.monthlyRate.toLocaleString()}/month</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => acceptSuggestion(suggestion)}
                          className="sify-btn-secondary"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Requirements */}
            {requirements.length > 0 && (
              <Card className="sify-card">
                <CardHeader className="sify-card-header">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="sify-text-primary">Current Requirements</CardTitle>
                      <CardDescription>Review and modify your infrastructure requirements</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Monthly Cost</p>
                      <p className="text-2xl font-bold sify-text-primary">₹{(totalCost / 1000).toFixed(0)}K</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full sify-table">
                      <thead>
                        <tr>
                          <th className="text-left p-3">Requirement</th>
                          <th className="text-left p-3">SKU</th>
                          <th className="text-left p-3">Specifications</th>
                          <th className="text-right p-3">Monthly Cost</th>
                          <th className="text-center p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirements.map((requirement) => (
                          <tr key={requirement.id} className="border-t">
                            <td className="p-3">
                              <div>
                                <p className="font-medium">{requirement.name}</p>
                                <p className="text-sm text-gray-500">{requirement.category} • {requirement.location}</p>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="space-y-2">
                                <Badge className="sify-badge-primary">{requirement.sku}</Badge>
                                <div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleLegacyMapping(requirement.id)}
                                    className="text-xs"
                                  >
                                    {showLegacyMapping[requirement.id] ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                                    Legacy SKU
                                  </Button>
                                  {showLegacyMapping[requirement.id] && (
                                    <Badge variant="outline" className="block mt-1">{requirement.legacySku}</Badge>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">
                                {requirement.specifications.vcpu && <p>vCPU: {requirement.specifications.vcpu}</p>}
                                {requirement.specifications.ram && <p>RAM: {requirement.specifications.ram}GB</p>}
                                {requirement.specifications.storage && <p>Storage: {requirement.specifications.storage}GB</p>}
                                {requirement.specifications.bandwidth && <p>Bandwidth: {requirement.specifications.bandwidth}</p>}
                                {requirement.specifications.capacity && <p>Capacity: {requirement.specifications.capacity}</p>}
                              </div>
                            </td>
                            <td className="p-3 text-right font-medium">
                              ₹{(requirement.monthlyRate * requirement.quantity).toLocaleString()}
                            </td>
                            <td className="p-3 text-center">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeRequirement(requirement.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button onClick={generateQuote} className="sify-btn-primary">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Quote Generated */}
        {currentStep === 3 && (
          <Card className="sify-card">
            <CardHeader className="sify-card-header">
              <CardTitle className="sify-text-primary flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Quote Generated Successfully
              </CardTitle>
              <CardDescription>Your infrastructure requirements have been processed and quoted</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total Requirements</p>
                  <p className="text-3xl font-bold sify-text-primary">{requirements.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Cost</p>
                  <p className="text-3xl font-bold sify-text-secondary">₹{(totalCost / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Annual Cost</p>
                  <p className="text-3xl font-bold text-green-600">₹{((totalCost * 12) / 100000).toFixed(1)}L</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setCurrentStep(2)} variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Requirements
                </Button>
                <Button className="sify-btn-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  View Detailed Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default ManualEntry

