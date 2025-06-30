import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Save, 
  Download,
  Server,
  Network,
  Shield,
  HardDrive,
  Database,
  Monitor,
  Cpu,
  MemoryStick,
  Zap,
  Globe,
  Lock,
  Archive,
  Activity,
  FileText,
  Settings,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Eye,
  Edit,
  Copy,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

const FixedWorkspaceManualEntry = () => {
  const navigate = useNavigate()
  const [selectedComponents, setSelectedComponents] = useState([])
  const [workspaceItems, setWorkspaceItems] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [activeCategory, setActiveCategory] = useState('compute')
  const [searchTerm, setSearchTerm] = useState('')
  const [showRecommendations, setShowRecommendations] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState('Mumbai')
  const [selectedEnvironment, setSelectedEnvironment] = useState('Production')
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [generatedQuote, setGeneratedQuote] = useState(null)

  // Component categories with detailed SKUs
  const componentCategories = {
    compute: {
      name: 'Compute',
      icon: <Server className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800',
      components: [
        {
          id: 'comp-shared-s',
          name: 'Shared Compute - Small',
          sku: 'CI-COMP-SHARED-S',
          legacySku: 'CI-COMP-VPI-S',
          specs: { vcpu: 2, ram: 8, storage: 100 },
          monthlyRate: 6000,
          description: '2 vCPU, 8GB RAM, 100GB Storage',
          requiresOS: true,
          requiresAV: true,
          requiresBackup: true,
          requiresMonitoring: true
        },
        {
          id: 'comp-shared-m',
          name: 'Shared Compute - Medium',
          sku: 'CI-COMP-SHARED-M',
          legacySku: 'CI-COMP-VPI-M',
          specs: { vcpu: 4, ram: 16, storage: 250 },
          monthlyRate: 10000,
          description: '4 vCPU, 16GB RAM, 250GB Storage',
          requiresOS: true,
          requiresAV: true,
          requiresBackup: true,
          requiresMonitoring: true
        },
        {
          id: 'comp-shared-l',
          name: 'Shared Compute - Large',
          sku: 'CI-COMP-SHARED-L',
          legacySku: 'CI-COMP-VPI-L',
          specs: { vcpu: 8, ram: 32, storage: 500 },
          monthlyRate: 18000,
          description: '8 vCPU, 32GB RAM, 500GB Storage',
          requiresOS: true,
          requiresAV: true,
          requiresBackup: true,
          requiresMonitoring: true
        },
        {
          id: 'comp-dedicated-m',
          name: 'Dedicated Compute - Medium',
          sku: 'CI-COMP-DEDICATED-M',
          legacySku: 'CI-COMP-VPE-M',
          specs: { vcpu: 8, ram: 64, storage: 1000 },
          monthlyRate: 35000,
          description: '8 vCPU, 64GB RAM, 1TB Storage',
          requiresOS: true,
          requiresAV: true,
          requiresBackup: true,
          requiresMonitoring: true
        },
        {
          id: 'comp-dedicated-l',
          name: 'Dedicated Compute - Large',
          sku: 'CI-COMP-DEDICATED-L',
          legacySku: 'CI-COMP-VPE-L',
          specs: { vcpu: 16, ram: 128, storage: 2000 },
          monthlyRate: 65000,
          description: '16 vCPU, 128GB RAM, 2TB Storage',
          requiresOS: true,
          requiresAV: true,
          requiresBackup: true,
          requiresMonitoring: true
        }
      ]
    },
    os: {
      name: 'Operating Systems',
      icon: <Settings className="h-5 w-5" />,
      color: 'bg-green-100 text-green-800',
      components: [
        {
          id: 'os-windows-std',
          name: 'Windows Server 2022 Standard',
          sku: 'CI-OS-WIN-2022-STD',
          legacySku: 'CI-OS-WIN-STD',
          monthlyRate: 800, // per vCPU
          description: 'Windows Server 2022 Standard Edition',
          pricingModel: 'per_vcpu',
          features: ['2 VMs', 'Hyper-V', 'Storage Spaces']
        },
        {
          id: 'os-windows-dc',
          name: 'Windows Server 2022 Datacenter',
          sku: 'CI-OS-WIN-2022-DC',
          legacySku: 'CI-OS-WIN-DC',
          monthlyRate: 1200, // per vCPU
          description: 'Windows Server 2022 Datacenter Edition',
          pricingModel: 'per_vcpu',
          features: ['Unlimited VMs', 'Storage Replica', 'Shielded VMs']
        },
        {
          id: 'os-rhel-9',
          name: 'Red Hat Enterprise Linux 9',
          sku: 'CI-OS-RHEL-9-ENT',
          legacySku: 'CI-OS-RHEL-ENT',
          monthlyRate: 500, // per vCPU
          description: 'RHEL 9 Enterprise with support',
          pricingModel: 'per_vcpu',
          features: ['24/7 Support', 'Security Updates', 'Compliance Tools']
        },
        {
          id: 'os-ubuntu-lts',
          name: 'Ubuntu Server 22.04 LTS',
          sku: 'CI-OS-UBUNTU-22-LTS',
          legacySku: 'CI-OS-UBUNTU-LTS',
          monthlyRate: 0,
          description: 'Ubuntu Server 22.04 LTS (Free)',
          pricingModel: 'fixed',
          features: ['5 Years Support', 'Snap Packages', 'Cloud-init']
        },
        {
          id: 'os-centos-stream',
          name: 'CentOS Stream 9',
          sku: 'CI-OS-CENTOS-9-STREAM',
          legacySku: 'CI-OS-CENTOS-STREAM',
          monthlyRate: 0,
          description: 'CentOS Stream 9 (Free)',
          pricingModel: 'fixed',
          features: ['Rolling Release', 'Container Ready', 'SELinux']
        }
      ]
    },
    security: {
      name: 'Security',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-red-100 text-red-800',
      components: [
        {
          id: 'av-enterprise',
          name: 'Enterprise Antivirus',
          sku: 'CI-SEC-AV-ENT',
          legacySku: 'CI-SEC-AV-ENT',
          monthlyRate: 500,
          description: 'Enterprise-grade antivirus protection',
          features: ['Real-time Scanning', 'Centralized Management', 'Threat Intelligence']
        },
        {
          id: 'av-basic',
          name: 'Basic Antivirus',
          sku: 'CI-SEC-AV-BASIC',
          legacySku: 'CI-SEC-AV-BASIC',
          monthlyRate: 200,
          description: 'Basic antivirus protection',
          features: ['File Scanning', 'Email Protection', 'Web Filtering']
        },
        {
          id: 'fw-enterprise',
          name: 'Enterprise Firewall',
          sku: 'CI-SEC-FW-ENTERPRISE',
          legacySku: 'CI-SEC-FW-ENT',
          monthlyRate: 15000,
          description: 'Next-generation enterprise firewall',
          features: ['IPS/IDS', 'Application Control', 'VPN Support']
        },
        {
          id: 'ssl-wildcard',
          name: 'Wildcard SSL Certificate',
          sku: 'CI-SEC-SSL-WILD',
          legacySku: 'CI-SEC-SSL-WILD',
          monthlyRate: 2000,
          description: 'Wildcard SSL certificate for domain',
          features: ['256-bit Encryption', 'Unlimited Subdomains', '24/7 Support']
        }
      ]
    },
    backup: {
      name: 'Backup & Recovery',
      icon: <Archive className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-800',
      components: [
        {
          id: 'backup-app',
          name: 'Application Backup',
          sku: 'CI-BAK-APP-750GB',
          legacySku: 'CI-BAK-APP',
          monthlyRate: 3750,
          description: 'Application data backup service',
          features: ['Daily Backup', '30-day Retention', 'Point-in-time Recovery']
        },
        {
          id: 'backup-db',
          name: 'Database Backup',
          sku: 'CI-BAK-DB-AUTO-1TB',
          legacySku: 'CI-BAK-DB',
          monthlyRate: 5000,
          description: 'Automated database backup',
          features: ['Continuous Backup', 'Transaction Log Backup', 'Cross-region Replication']
        },
        {
          id: 'backup-dr',
          name: 'Disaster Recovery',
          sku: 'CI-BAK-DR-250GB',
          legacySku: 'CI-BAK-DR',
          monthlyRate: 1500,
          description: 'Disaster recovery backup service',
          features: ['Cross-site Backup', 'Automated Failover', 'RTO < 4 hours']
        }
      ]
    },
    network: {
      name: 'Network',
      icon: <Network className="h-5 w-5" />,
      color: 'bg-orange-100 text-orange-800',
      components: [
        {
          id: 'lb-advanced',
          name: 'Advanced Load Balancer',
          sku: 'CI-NET-LB-ADVANCED',
          legacySku: 'CI-NET-LB-ADV',
          monthlyRate: 8500,
          description: 'Layer 7 load balancer with SSL termination',
          features: ['SSL Termination', 'Health Checks', 'Auto Scaling']
        },
        {
          id: 'mpls-10g',
          name: 'MPLS Link - 10 Gbps',
          sku: 'CI-NET-MPLS-10G',
          legacySku: 'CI-NET-MPLS-10G',
          monthlyRate: 45000,
          description: '10 Gbps MPLS connectivity',
          features: ['Dedicated Bandwidth', 'SLA 99.9%', '24/7 Monitoring']
        },
        {
          id: 'vpn-site2site',
          name: 'Site-to-Site VPN',
          sku: 'CI-NET-VPN-S2S',
          legacySku: 'CI-NET-VPN-S2S',
          monthlyRate: 5000,
          description: 'Secure site-to-site VPN connection',
          features: ['IPSec Encryption', 'Redundant Tunnels', 'Dynamic Routing']
        }
      ]
    },
    storage: {
      name: 'Storage',
      icon: <HardDrive className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-800',
      components: [
        {
          id: 'storage-block-5tb',
          name: 'Block Storage - 5TB',
          sku: 'CI-STOR-BLOCK-5TB',
          legacySku: 'CI-STOR-BLOCK-5TB',
          monthlyRate: 25000,
          description: 'High-performance block storage',
          features: ['SSD Storage', 'Snapshot Support', 'Encryption at Rest']
        },
        {
          id: 'storage-backup-10tb',
          name: 'Backup Storage - 10TB',
          sku: 'CI-STOR-BACKUP-10TB',
          legacySku: 'CI-STOR-BACKUP-10TB',
          monthlyRate: 20000,
          description: 'Cost-effective backup storage',
          features: ['Deduplication', 'Compression', 'Long-term Retention']
        }
      ]
    },
    database: {
      name: 'Database',
      icon: <Database className="h-5 w-5" />,
      color: 'bg-indigo-100 text-indigo-800',
      components: [
        {
          id: 'mysql-large',
          name: 'MySQL Database - Large',
          sku: 'CI-DB-MYSQL-L',
          legacySku: 'CI-DB-MYSQL-L',
          monthlyRate: 18000,
          description: 'Managed MySQL database service',
          features: ['Automated Backups', 'High Availability', 'Performance Monitoring']
        },
        {
          id: 'postgresql-medium',
          name: 'PostgreSQL Database - Medium',
          sku: 'CI-DB-PGSQL-M',
          legacySku: 'CI-DB-PGSQL-M',
          monthlyRate: 12000,
          description: 'Managed PostgreSQL database service',
          features: ['Point-in-time Recovery', 'Read Replicas', 'Connection Pooling']
        }
      ]
    },
    monitoring: {
      name: 'Monitoring',
      icon: <Monitor className="h-5 w-5" />,
      color: 'bg-teal-100 text-teal-800',
      components: [
        {
          id: 'mon-db-perf',
          name: 'Database Performance Monitoring',
          sku: 'CI-MON-DB-PERF',
          legacySku: 'CI-MON-DB-PERF',
          monthlyRate: 4000,
          description: 'Advanced database performance monitoring',
          features: ['Query Analysis', 'Performance Tuning', 'Alerting']
        },
        {
          id: 'mon-net-adv',
          name: 'Network Advanced Monitoring',
          sku: 'CI-MON-NET-ADV',
          legacySku: 'CI-MON-NET-ADV',
          monthlyRate: 2500,
          description: 'Comprehensive network monitoring',
          features: ['Traffic Analysis', 'Bandwidth Monitoring', 'Anomaly Detection']
        }
      ]
    }
  }

  // Quick start templates
  const quickStartTemplates = [
    {
      id: 'web-app',
      name: 'Web Application Stack',
      description: 'Complete web application infrastructure',
      components: ['comp-shared-m', 'os-ubuntu-lts', 'av-basic', 'backup-app', 'lb-advanced']
    },
    {
      id: 'database-tier',
      name: 'Database Tier',
      description: 'High-performance database setup',
      components: ['comp-dedicated-m', 'os-rhel-9', 'av-enterprise', 'mysql-large', 'backup-db', 'mon-db-perf']
    },
    {
      id: 'secure-workload',
      name: 'Secure Workload',
      description: 'Security-focused infrastructure',
      components: ['comp-shared-l', 'os-windows-std', 'av-enterprise', 'fw-enterprise', 'ssl-wildcard', 'backup-app']
    }
  ]

  // Helper functions
  const findComponentById = (id) => {
    for (const category of Object.values(componentCategories)) {
      const component = category.components.find(comp => comp.id === id)
      if (component) return component
    }
    return null
  }

  const addToWorkspace = (componentId) => {
    const component = findComponentById(componentId)
    if (!component) return

    const newItem = {
      id: Date.now(),
      componentId,
      quantity: 1,
      location: selectedLocation,
      environment: selectedEnvironment,
      customSpecs: component.specs ? { ...component.specs } : {}
    }

    setWorkspaceItems(prev => [...prev, newItem])
    
    // Auto-add recommended components
    if (showRecommendations) {
      addRecommendedComponents(component)
    }
  }

  const addRecommendedComponents = (component) => {
    const recommendations = []
    
    if (component.requiresOS) {
      recommendations.push('os-ubuntu-lts') // Default to free Ubuntu
    }
    if (component.requiresAV) {
      recommendations.push('av-basic') // Default to basic AV
    }
    if (component.requiresBackup) {
      recommendations.push('backup-app') // Default backup
    }
    if (component.requiresMonitoring) {
      recommendations.push('mon-net-adv') // Default monitoring
    }

    recommendations.forEach(recId => {
      const exists = workspaceItems.some(item => item.componentId === recId)
      if (!exists) {
        const recComponent = findComponentById(recId)
        if (recComponent) {
          const newItem = {
            id: Date.now() + Math.random(),
            componentId: recId,
            quantity: 1,
            location: selectedLocation,
            environment: selectedEnvironment,
            customSpecs: recComponent.specs ? { ...recComponent.specs } : {}
          }
          setWorkspaceItems(prev => [...prev, newItem])
        }
      }
    })
  }

  const removeFromWorkspace = (itemId) => {
    setWorkspaceItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateWorkspaceItem = (itemId, updates) => {
    setWorkspaceItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ))
  }

  const calculateItemCost = (item) => {
    const component = findComponentById(item.componentId)
    if (!component) return 0

    let itemCost = component.monthlyRate
    
    if (component.pricingModel === 'per_vcpu' && item.customSpecs?.vcpu) {
      itemCost = component.monthlyRate * item.customSpecs.vcpu
    }
    
    return itemCost * item.quantity
  }

  const calculateTotalCost = () => {
    return workspaceItems.reduce((total, item) => total + calculateItemCost(item), 0)
  }

  const applyTemplate = (templateId) => {
    const template = quickStartTemplates.find(t => t.id === templateId)
    if (!template) return

    // Clear existing items
    setWorkspaceItems([])
    
    // Add template components
    template.components.forEach((componentId, index) => {
      setTimeout(() => {
        addToWorkspace(componentId)
      }, index * 100) // Stagger additions for better UX
    })
  }

  const generateQuote = () => {
    if (workspaceItems.length === 0) {
      alert('Please add some components to generate a quote.')
      return
    }

    const quote = {
      id: `QUOTE-${Date.now()}`,
      projectName: projectName || 'Untitled Project',
      projectDescription: projectDescription || 'No description provided',
      location: selectedLocation,
      environment: selectedEnvironment,
      items: workspaceItems.map(item => {
        const component = findComponentById(item.componentId)
        return {
          ...item,
          component,
          unitCost: component?.monthlyRate || 0,
          totalCost: calculateItemCost(item),
          sku: component?.sku,
          legacySku: component?.legacySku,
          description: component?.description
        }
      }),
      totalMonthlyCost: calculateTotalCost(),
      totalAnnualCost: calculateTotalCost() * 12,
      createdDate: new Date().toISOString().split('T')[0],
      createdTime: new Date().toLocaleTimeString()
    }
    
    setGeneratedQuote(quote)
    setShowQuoteModal(true)
  }

  const exportQuote = () => {
    if (!generatedQuote) return
    
    const dataStr = JSON.stringify(generatedQuote, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `sify-quote-${generatedQuote.id}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const navigateToQuoteGeneration = () => {
    // Store quote data in localStorage for the quote generation page
    if (generatedQuote) {
      localStorage.setItem('manualEntryQuote', JSON.stringify(generatedQuote))
      navigate('/quote-generation')
    }
  }

  const getFilteredComponents = () => {
    const category = componentCategories[activeCategory]
    if (!category) return []
    
    return category.components.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const getRecommendations = () => {
    // Simple recommendation logic
    const hasCompute = workspaceItems.some(item => {
      const comp = findComponentById(item.componentId)
      return comp && activeCategory === 'compute'
    })
    
    if (hasCompute && !workspaceItems.some(item => findComponentById(item.componentId)?.id?.includes('os'))) {
      return ['Consider adding an Operating System for your compute instances']
    }
    
    return []
  }

  // Update total cost when workspace items change
  useEffect(() => {
    setTotalCost(calculateTotalCost())
  }, [workspaceItems])

  const filteredComponents = getFilteredComponents()
  const recommendations = getRecommendations()

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
                <h1 className="text-2xl font-bold text-white">Workspace Manual Entry</h1>
                <p className="text-blue-100">Build your infrastructure visually with intelligent recommendations</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={generateQuote}
                disabled={workspaceItems.length === 0}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Component Palette - Takes 3 columns */}
          <div className="xl:col-span-3">
            <Card className="sify-card h-full">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-xl">Component Palette</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search components..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {Object.entries(componentCategories).map(([key, category]) => (
                    <Button
                      key={key}
                      variant={activeCategory === key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(key)}
                      className="flex items-center gap-2"
                    >
                      {category.icon}
                      {category.name}
                      <Badge variant="secondary" className="ml-1">
                        {category.components.length}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Quick Start Templates */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Quick Start Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {quickStartTemplates.map(template => (
                      <Card key={template.id} className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-gray-500">{template.description}</p>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => applyTemplate(template.id)}
                              className="ml-2"
                            >
                              Apply
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Component Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredComponents.map(component => (
                    <Card key={component.id} className="border hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{component.name}</h4>
                              <Badge className={componentCategories[activeCategory].color}>
                                {componentCategories[activeCategory].name}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{component.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <span className="font-medium">SKU:</span> {component.sku}
                                <br />
                                <span className="text-gray-500">Legacy: {component.legacySku}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">
                                  ₹{component.monthlyRate.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">per month</div>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToWorkspace(component.id)}
                            className="ml-4 bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredComponents.length === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No components found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Workspace Panel - Takes 1 column */}
          <div className="xl:col-span-1">
            <div className="space-y-6">
              {/* Project Details */}
              <Card className="sify-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <Input
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea
                      placeholder="Project description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Default Location</label>
                      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mumbai">Mumbai</SelectItem>
                          <SelectItem value="Chennai">Chennai</SelectItem>
                          <SelectItem value="Delhi">Delhi</SelectItem>
                          <SelectItem value="Bangalore">Bangalore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Default Environment</label>
                      <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Production">Production</SelectItem>
                          <SelectItem value="Staging">Staging</SelectItem>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="DR">DR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Workspace Items */}
              <Card className="sify-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Workspace</CardTitle>
                    <Badge variant="outline">{workspaceItems.length} items</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    {workspaceItems.length === 0 ? (
                      <div className="text-center py-8">
                        <Server className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No components added yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {workspaceItems.map(item => {
                          const component = findComponentById(item.componentId)
                          if (!component) return null
                          
                          return (
                            <div key={item.id} className="border rounded-lg p-3 bg-white">
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-sm truncate">{component.name}</h4>
                                  <p className="text-xs text-gray-500">{component.sku}</p>
                                  <div className="text-xs text-green-600 font-medium">
                                    ₹{calculateItemCost(item).toLocaleString()}/month
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeFromWorkspace(item.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </ScrollArea>
                  
                  {workspaceItems.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total Monthly Cost:</span>
                        <span className="text-lg font-bold text-green-600">
                          ₹{totalCost.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Annual: ₹{(totalCost * 12).toLocaleString()}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <Card className="sify-card border-yellow-200 bg-yellow-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-600" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {recommendations.map((rec, index) => (
                        <div key={index} className="text-sm text-yellow-800">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <Dialog open={showQuoteModal} onOpenChange={setShowQuoteModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Generated Quote</DialogTitle>
            <DialogDescription>
              Professional quote for your infrastructure requirements
            </DialogDescription>
          </DialogHeader>
          
          {generatedQuote && (
            <div className="space-y-6">
              {/* Quote Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{generatedQuote.projectName}</h2>
                    <p className="text-blue-100 mt-1">{generatedQuote.projectDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-100">Quote ID</div>
                    <div className="font-mono">{generatedQuote.id}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-blue-400">
                  <div>
                    <div className="text-sm text-blue-100">Location</div>
                    <div className="font-semibold">{generatedQuote.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Environment</div>
                    <div className="font-semibold">{generatedQuote.environment}</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100">Created</div>
                    <div className="font-semibold">{generatedQuote.createdDate}</div>
                  </div>
                </div>
              </div>

              {/* Quote Items */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quote Items</h3>
                <div className="space-y-3">
                  {generatedQuote.items.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.component?.name}</h4>
                          <p className="text-sm text-gray-600">{item.component?.description}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span><strong>SKU:</strong> {item.sku}</span>
                            <span><strong>Legacy:</strong> {item.legacySku}</span>
                            <span><strong>Qty:</strong> {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            ₹{item.totalCost.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">per month</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Total:</span>
                    <span className="font-semibold">₹{generatedQuote.totalMonthlyCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Total:</span>
                    <span className="font-semibold">₹{generatedQuote.totalAnnualCost.toLocaleString()}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Monthly Cost:</span>
                    <span className="text-green-600">₹{generatedQuote.totalMonthlyCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button onClick={navigateToQuoteGeneration} className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  View Professional Proposal
                </Button>
                <Button variant="outline" onClick={exportQuote}>
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
                <Button variant="outline" onClick={() => setShowQuoteModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FixedWorkspaceManualEntry

