import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Package, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Edit,
  Plus,
  Save,
  X,
  Eye,
  EyeOff,
  FileText,
  Mail
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useApp } from '../context/AppContext'

const CustomFlowDemo = () => {
  const navigate = useNavigate()
  const { currentCustomer, addNotification } = useApp()
  
  const [currentPersona, setCurrentPersona] = useState('am')
  const [workflowStep, setWorkflowStep] = useState(1)
  const [requirements, setRequirements] = useState([])
  const [editingRequirement, setEditingRequirement] = useState(null)
  const [addingResource, setAddingResource] = useState(false)
  const [newResource, setNewResource] = useState({})
  const [showLegacyMapping, setShowLegacyMapping] = useState({})
  const [showProposal, setShowProposal] = useState(false)

  const personas = [
    {
      id: 'am',
      name: 'Account Manager',
      role: 'Account Manager',
      capabilities: ['requirement capture', 'customer interaction'],
      color: 'blue'
    },
    {
      id: 'sa',
      name: 'Solution Architect', 
      role: 'Solution Architect',
      capabilities: ['technical review', 'architecture design', 'resource addition'],
      color: 'orange'
    },
    {
      id: 'pm',
      name: 'Product Manager',
      role: 'Product Manager', 
      capabilities: ['sku approval', 'pricing control', 'commercial terms'],
      color: 'green'
    },
    {
      id: 'fa',
      name: 'Finance Administrator',
      role: 'Finance Administrator',
      capabilities: ['final approval', 'contract generation'],
      color: 'teal'
    }
  ]

  const workflowSteps = [
    { id: 1, name: 'AM Submit', description: 'Account Manager captures requirements', persona: 'am' },
    { id: 2, name: 'SA Review', description: 'Solution Architect technical review', persona: 'sa' },
    { id: 3, name: 'PM Standardize', description: 'Product Manager SKU approval', persona: 'pm' },
    { id: 4, name: 'SA Approve', description: 'Solution Architect final approval', persona: 'sa' },
    { id: 5, name: 'Finance Approve', description: 'Finance Administrator approval', persona: 'fa' }
  ]

  // Initialize with sample requirements
  useEffect(() => {
    setRequirements([
      {
        id: 1,
        title: 'Web Application Infrastructure',
        description: 'High-performance web servers for customer portal with load balancing and auto-scaling',
        monthlyBudget: 85000,
        timeline: '2-3 weeks',
        complexity: 'Medium',
        status: 'pending sa-review',
        resources: [
          {
            id: 1,
            name: 'Web Application Servers',
            sku: 'CI-COMP-SHARED-L-MUM',
            legacySku: 'CI-COMP-VPI-L',
            category: 'Compute',
            vcpu: 8,
            ram: 32,
            storage: 500,
            monthlyRate: 12000,
            floorPrice: 10000,
            quantity: 4
          },
          {
            id: 2,
            name: 'Application Load Balancer',
            sku: 'CI-NET-LB-ADVANCED-MUM',
            legacySku: 'CI-NET-LB-ADV',
            category: 'Network',
            bandwidth: '10 Gbps',
            monthlyRate: 8500,
            floorPrice: 7000,
            quantity: 1
          },
          {
            id: 3,
            name: 'Web Application Firewall',
            sku: 'CI-SEC-WAF-ENTERPRISE-MUM',
            legacySku: 'CI-SEC-WAF-ENT',
            category: 'Security',
            throughput: '5 Gbps',
            monthlyRate: 12000,
            floorPrice: 10000,
            quantity: 1
          }
        ]
      },
      {
        id: 2,
        title: 'Database Infrastructure',
        description: 'High-availability database cluster with backup and disaster recovery',
        monthlyBudget: 120000,
        timeline: '3-4 weeks',
        complexity: 'High',
        status: 'pending sa-review',
        resources: [
          {
            id: 4,
            name: 'Primary Database Server',
            sku: 'CI-COMP-DEDICATED-XL-MUM',
            legacySku: 'CI-COMP-VPE-XL',
            category: 'Compute',
            vcpu: 16,
            ram: 128,
            storage: 2000,
            monthlyRate: 45000,
            floorPrice: 40000,
            quantity: 1
          },
          {
            id: 5,
            name: 'Database Backup Storage',
            sku: 'CI-STOR-OBJECT-5TB-MUM',
            legacySku: 'CI-STOR-OBJ-5TB',
            category: 'Storage',
            capacity: '5TB',
            monthlyRate: 15000,
            floorPrice: 12000,
            quantity: 1
          },
          {
            id: 6,
            name: 'Database Monitoring',
            sku: 'CI-MON-DATABASE-ADV-MUM',
            legacySku: 'CI-MON-DB-ADV',
            category: 'Monitoring',
            features: 'Advanced monitoring',
            monthlyRate: 8000,
            floorPrice: 6000,
            quantity: 1
          }
        ]
      },
      {
        id: 3,
        title: 'Analytics Platform',
        description: 'Business intelligence and analytics platform with data processing capabilities',
        monthlyBudget: 95000,
        timeline: '4-5 weeks',
        complexity: 'High',
        status: 'pending sa-review',
        resources: [
          {
            id: 7,
            name: 'Analytics Compute Cluster',
            sku: 'CI-COMP-GPU-ANALYTICS-MUM',
            legacySku: 'CI-COMP-GPU-AN',
            category: 'Compute',
            vcpu: 32,
            ram: 256,
            gpu: '4x V100',
            monthlyRate: 65000,
            floorPrice: 55000,
            quantity: 1
          },
          {
            id: 8,
            name: 'Data Lake Storage',
            sku: 'CI-STOR-DATALAKE-10TB-MUM',
            legacySku: 'CI-STOR-DL-10TB',
            category: 'Storage',
            capacity: '10TB',
            monthlyRate: 25000,
            floorPrice: 20000,
            quantity: 1
          }
        ]
      }
    ])
  }, [])

  const handlePersonaSwitch = (personaId) => {
    setCurrentPersona(personaId)
    const persona = personas.find(p => p.id === personaId)
    addNotification(`Switched to ${persona.name}`, 'info')
  }

  const handleEditRequirement = (requirement) => {
    if (currentPersona !== 'am') {
      addNotification('Only Account Manager can edit requirements', 'warning')
      return
    }
    setEditingRequirement({ ...requirement })
  }

  const handleSaveRequirement = () => {
    const updatedRequirements = requirements.map(req => 
      req.id === editingRequirement.id ? editingRequirement : req
    )
    setRequirements(updatedRequirements)
    setEditingRequirement(null)
    addNotification('Requirement updated successfully', 'success')
  }

  const handleAddResource = (requirementId) => {
    if (currentPersona !== 'sa') {
      addNotification('Only Solution Architect can add resources', 'warning')
      return
    }
    setAddingResource(requirementId)
    setNewResource({
      name: '',
      sku: '',
      legacySku: '',
      category: 'Compute',
      monthlyRate: 0,
      floorPrice: 0,
      quantity: 1
    })
  }

  const handleSaveNewResource = (requirementId) => {
    const resourceId = Date.now()
    const resource = { ...newResource, id: resourceId }
    
    const updatedRequirements = requirements.map(req => {
      if (req.id === requirementId) {
        return {
          ...req,
          resources: [...req.resources, resource]
        }
      }
      return req
    })
    
    setRequirements(updatedRequirements)
    setAddingResource(false)
    setNewResource({})
    addNotification('Resource added successfully', 'success')
  }

  const handleApproveResource = (requirementId, resourceId) => {
    if (currentPersona !== 'pm') {
      addNotification('Only Product Manager can approve resources', 'warning')
      return
    }
    addNotification('Resource approved', 'success')
  }

  const handleRejectResource = (requirementId, resourceId) => {
    if (currentPersona !== 'pm') {
      addNotification('Only Product Manager can reject resources', 'warning')
      return
    }
    addNotification('Resource rejected', 'warning')
  }

  const toggleLegacyMapping = (resourceId) => {
    setShowLegacyMapping(prev => ({
      ...prev,
      [resourceId]: !prev[resourceId]
    }))
  }

  const advanceWorkflow = () => {
    if (workflowStep < 5) {
      setWorkflowStep(workflowStep + 1)
      const nextStep = workflowSteps[workflowStep]
      setCurrentPersona(nextStep.persona)
      addNotification(`Advanced to ${nextStep.name}`, 'success')
    }
  }

  const generateProposal = () => {
    setShowProposal(true)
  }

  const currentPersonaData = personas.find(p => p.id === currentPersona)
  const progress = (workflowStep / 5) * 100

  if (showProposal) {
    const totalCost = requirements.reduce((sum, req) => 
      sum + req.resources.reduce((rSum, res) => rSum + (res.monthlyRate * res.quantity), 0), 0
    )

    return (
      <div className="min-h-screen sify-bg-gradient">
        <div className="sify-header px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setShowProposal(false)} 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Workflow
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Custom Requirements Proposal</h1>
                  <p className="text-blue-100">Professional Bill of Quantities</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="sify-btn-secondary">
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button className="sify-btn-primary">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <Card className="sify-card">
            <CardHeader className="sify-card-header">
              <CardTitle className="sify-text-primary">Custom Requirements - Bill of Quantities</CardTitle>
              <CardDescription>Comprehensive solution for {currentCustomer.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Monthly Cost</p>
                  <p className="text-3xl font-bold sify-text-primary">₹{(totalCost / 1000).toFixed(0)}K</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Annual Cost</p>
                  <p className="text-3xl font-bold sify-text-secondary">₹{((totalCost * 12) / 100000).toFixed(1)}L</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Implementation Timeline</p>
                  <p className="text-3xl font-bold text-green-600">8-12 weeks</p>
                </div>
              </div>

              {requirements.map((requirement) => (
                <div key={requirement.id} className="border-t pt-6">
                  <h3 className="text-lg font-semibold sify-text-primary mb-4">{requirement.title}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full sify-table">
                      <thead>
                        <tr>
                          <th className="text-left p-3">Resource</th>
                          <th className="text-left p-3">SKU</th>
                          <th className="text-left p-3">Specifications</th>
                          <th className="text-right p-3">Monthly Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requirement.resources.map((resource) => (
                          <tr key={resource.id} className="border-t">
                            <td className="p-3">
                              <div>
                                <p className="font-medium">{resource.name}</p>
                                <p className="text-sm text-gray-500">{resource.category}</p>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge className="sify-badge-primary">{resource.sku}</Badge>
                            </td>
                            <td className="p-3">
                              <div className="text-sm">
                                {resource.vcpu && <p>vCPU: {resource.vcpu}</p>}
                                {resource.ram && <p>RAM: {resource.ram}GB</p>}
                                {resource.storage && <p>Storage: {resource.storage}GB</p>}
                                {resource.bandwidth && <p>Bandwidth: {resource.bandwidth}</p>}
                                {resource.capacity && <p>Capacity: {resource.capacity}</p>}
                                {resource.gpu && <p>GPU: {resource.gpu}</p>}
                              </div>
                            </td>
                            <td className="p-3 text-right font-medium">
                              ₹{(resource.monthlyRate * resource.quantity).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    )
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
                <h1 className="text-2xl font-bold text-white">Custom Flow Demo</h1>
                <p className="text-blue-100">Enterprise requirements workflow demonstration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Persona Switcher */}
        <Card className="sify-card">
          <CardHeader className="sify-card-header">
            <CardTitle className="sify-text-primary flex items-center">
              <User className="w-5 h-5 mr-2" />
              Persona Switcher
            </CardTitle>
            <CardDescription>Switch between different roles to experience the custom requirements workflow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {personas.map((persona) => (
                <Button
                  key={persona.id}
                  onClick={() => handlePersonaSwitch(persona.id)}
                  variant={currentPersona === persona.id ? "default" : "outline"}
                  className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                    currentPersona === persona.id ? 'sify-btn-primary' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    persona.color === 'blue' ? 'bg-blue-100' :
                    persona.color === 'orange' ? 'bg-orange-100' :
                    persona.color === 'green' ? 'bg-green-100' :
                    'bg-teal-100'
                  }`}>
                    <User className={`w-4 h-4 ${
                      persona.color === 'blue' ? 'text-blue-600' :
                      persona.color === 'orange' ? 'text-orange-600' :
                      persona.color === 'green' ? 'text-green-600' :
                      'text-teal-600'
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm">{persona.name}</p>
                    <p className="text-xs text-gray-500">{persona.role}</p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Persona Info */}
        <Card className="sify-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentPersonaData.color === 'blue' ? 'bg-blue-100' :
                  currentPersonaData.color === 'orange' ? 'bg-orange-100' :
                  currentPersonaData.color === 'green' ? 'bg-green-100' :
                  'bg-teal-100'
                }`}>
                  <User className={`w-6 h-6 ${
                    currentPersonaData.color === 'blue' ? 'text-blue-600' :
                    currentPersonaData.color === 'orange' ? 'text-orange-600' :
                    currentPersonaData.color === 'green' ? 'text-green-600' :
                    'text-teal-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Current Persona: {currentPersonaData.name}</h3>
                  <p className="text-gray-600">{currentPersonaData.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Capabilities:</p>
                <div className="flex space-x-2 mt-1">
                  {currentPersonaData.capabilities.map((cap, index) => (
                    <Badge key={index} variant="outline">{cap}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Progress */}
        <Card className="sify-card">
          <CardHeader className="sify-card-header">
            <CardTitle className="sify-text-primary flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Custom Requirements Workflow Progress
            </CardTitle>
            <CardDescription>Track the progress of custom requirements through the approval workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="sify-progress" />
            </div>
            
            <div className="flex justify-between items-center">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center space-y-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    workflowStep > step.id ? 'bg-green-500 text-white' :
                    workflowStep === step.id ? 'sify-bg-primary text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {workflowStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card className="sify-card">
          <CardHeader className="sify-card-header">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="sify-text-primary flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Custom Requirements
                  <Badge className={`ml-2 ${
                    currentPersona === 'am' ? 'sify-badge-primary' :
                    currentPersona === 'sa' ? 'sify-badge-secondary' :
                    currentPersona === 'pm' ? 'sify-badge-success' :
                    'bg-teal-500 text-white'
                  }`}>
                    {currentPersonaData.role} Mode
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {currentPersona === 'am' && 'Review and edit requirements'}
                  {currentPersona === 'sa' && 'Add technical resources and review architecture'}
                  {currentPersona === 'pm' && 'Approve SKUs and manage pricing'}
                  {currentPersona === 'fa' && 'Final approval and contract generation'}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                {workflowStep < 5 && (
                  <Button onClick={advanceWorkflow} className="sify-btn-primary">
                    Advance Workflow
                  </Button>
                )}
                {workflowStep === 5 && (
                  <Button onClick={generateProposal} className="sify-btn-secondary">
                    Generate Proposal
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {requirements.map((requirement) => (
              <div key={requirement.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold sify-text-primary">{requirement.title}</h3>
                    <p className="text-gray-600">{requirement.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge className="sify-badge-secondary">₹{(requirement.monthlyBudget / 1000).toFixed(0)}K/month</Badge>
                      <Badge variant="outline">Timeline: {requirement.timeline}</Badge>
                      <Badge variant="outline">{requirement.complexity} Complexity</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {currentPersona === 'am' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditRequirement(requirement)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit Requirements
                      </Button>
                    )}
                    {currentPersona === 'sa' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddResource(requirement.id)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Resource
                      </Button>
                    )}
                  </div>
                </div>

                {/* Resources Table */}
                <div className="overflow-x-auto">
                  <table className="w-full sify-table">
                    <thead>
                      <tr>
                        <th className="text-left p-3">Resource</th>
                        <th className="text-left p-3">SKU</th>
                        <th className="text-left p-3">Specifications</th>
                        <th className="text-right p-3">Monthly Cost</th>
                        {currentPersona === 'pm' && <th className="text-center p-3">Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {requirement.resources.map((resource) => (
                        <tr key={resource.id} className="border-t">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{resource.name}</p>
                              <p className="text-sm text-gray-500">{resource.category}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-2">
                              <Badge className="sify-badge-primary">{resource.sku}</Badge>
                              <div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleLegacyMapping(resource.id)}
                                  className="text-xs"
                                >
                                  {showLegacyMapping[resource.id] ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                                  Legacy SKU
                                </Button>
                                {showLegacyMapping[resource.id] && (
                                  <Badge variant="outline" className="block mt-1">{resource.legacySku}</Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              {resource.vcpu && <p>vCPU: {resource.vcpu}</p>}
                              {resource.ram && <p>RAM: {resource.ram}GB</p>}
                              {resource.storage && <p>Storage: {resource.storage}GB</p>}
                              {resource.bandwidth && <p>Bandwidth: {resource.bandwidth}</p>}
                              {resource.capacity && <p>Capacity: {resource.capacity}</p>}
                              {resource.gpu && <p>GPU: {resource.gpu}</p>}
                              {resource.throughput && <p>Throughput: {resource.throughput}</p>}
                              {resource.features && <p>Features: {resource.features}</p>}
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <div>
                              <p className="font-medium">₹{(resource.monthlyRate * resource.quantity).toLocaleString()}</p>
                              <p className="text-xs text-gray-500">Floor: ₹{resource.floorPrice.toLocaleString()}</p>
                            </div>
                          </td>
                          {currentPersona === 'pm' && (
                            <td className="p-3 text-center">
                              <div className="flex space-x-1 justify-center">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveResource(requirement.id, resource.id)}
                                  className="sify-btn-primary h-8 px-3"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRejectResource(requirement.id, resource.id)}
                                  className="h-8 px-3"
                                >
                                  Reject
                                </Button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                      
                      {/* Add Resource Row */}
                      {addingResource === requirement.id && (
                        <tr className="border-t bg-blue-50">
                          <td className="p-3">
                            <Input
                              placeholder="Resource name"
                              value={newResource.name}
                              onChange={(e) => setNewResource({...newResource, name: e.target.value})}
                              className="w-full"
                            />
                          </td>
                          <td className="p-3">
                            <Input
                              placeholder="SKU"
                              value={newResource.sku}
                              onChange={(e) => setNewResource({...newResource, sku: e.target.value})}
                              className="w-full"
                            />
                          </td>
                          <td className="p-3">
                            <select
                              value={newResource.category}
                              onChange={(e) => setNewResource({...newResource, category: e.target.value})}
                              className="w-full p-2 border rounded"
                            >
                              <option value="Compute">Compute</option>
                              <option value="Network">Network</option>
                              <option value="Security">Security</option>
                              <option value="Storage">Storage</option>
                              <option value="Database">Database</option>
                              <option value="Monitoring">Monitoring</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <Input
                              type="number"
                              placeholder="Monthly rate"
                              value={newResource.monthlyRate}
                              onChange={(e) => setNewResource({...newResource, monthlyRate: parseInt(e.target.value)})}
                              className="w-full"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex space-x-1 justify-center">
                              <Button
                                size="sm"
                                onClick={() => handleSaveNewResource(requirement.id)}
                                className="sify-btn-primary h-8 w-8 p-0"
                              >
                                <Save className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setAddingResource(false)}
                                className="h-8 w-8 p-0"
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <Badge className={`${requirement.status.includes('pending') ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                    {requirement.status}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Monthly Cost</p>
                    <p className="text-lg font-bold sify-text-primary">
                      ₹{requirement.resources.reduce((sum, res) => sum + (res.monthlyRate * res.quantity), 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CustomFlowDemo

