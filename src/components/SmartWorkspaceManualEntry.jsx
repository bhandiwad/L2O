import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  FileText, 
  Search, 
  Plus, 
  Trash2, 
  X,
  Eye,
  EyeOff,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Server,
  Shield,
  Database,
  Network,
  HardDrive,
  Monitor,
  Archive,
  Settings
} from 'lucide-react'

const SmartWorkspaceManualEntry = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [workspaceItems, setWorkspaceItems] = useState([])
  const [showLegacyMapping, setShowLegacyMapping] = useState({})
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    location: 'Mumbai',
    environment: 'Production'
  })
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [recommendations, setRecommendations] = useState([])
  const [showRecommendations, setShowRecommendations] = useState(false)

  // Smart recommendation rules
  const recommendationRules = {
    // OS-based recommendations
    'CI-OS-WINDOWS-2022': [
      { sku: 'CI-SEC-AV-BASIC', reason: 'Windows servers require antivirus protection' },
      { sku: 'CI-BAK-APP-750GB', reason: 'Backup recommended for Windows applications' },
      { sku: 'CI-SEC-FW-BASIC', reason: 'Firewall protection for Windows servers' }
    ],
    'CI-OS-UBUNTU-22-LTS': [
      { sku: 'CI-SEC-AV-BASIC', reason: 'Antivirus recommended for production servers' },
      { sku: 'CI-BAK-APP-750GB', reason: 'Backup essential for production workloads' }
    ],
    'CI-OS-RHEL-9': [
      { sku: 'CI-SEC-AV-ENTERPRISE', reason: 'Enterprise antivirus for RHEL servers' },
      { sku: 'CI-BAK-APP-750GB', reason: 'Enterprise backup for critical systems' },
      { sku: 'CI-MON-SYS-ADV', reason: 'Advanced monitoring for enterprise systems' }
    ],

    // Compute-based recommendations
    'CI-COMP-SHARED-S': [
      { sku: 'CI-OS-UBUNTU-22-LTS', reason: 'Operating system required for compute instance' },
      { sku: 'CI-SEC-AV-BASIC', reason: 'Basic security for shared compute' }
    ],
    'CI-COMP-SHARED-M': [
      { sku: 'CI-OS-UBUNTU-22-LTS', reason: 'Operating system required for compute instance' },
      { sku: 'CI-SEC-AV-BASIC', reason: 'Security protection recommended' },
      { sku: 'CI-BAK-APP-750GB', reason: 'Backup for medium workloads' }
    ],
    'CI-COMP-DEDICATED-M': [
      { sku: 'CI-OS-WINDOWS-2022', reason: 'Enterprise OS for dedicated servers' },
      { sku: 'CI-SEC-AV-ENTERPRISE', reason: 'Enterprise security for dedicated resources' },
      { sku: 'CI-BAK-APP-750GB', reason: 'Backup essential for dedicated servers' },
      { sku: 'CI-MON-SYS-ADV', reason: 'Advanced monitoring for dedicated infrastructure' }
    ],

    // Database-based recommendations
    'CI-DB-MYSQL-M': [
      { sku: 'CI-BAK-DB-1TB', reason: 'Database backup is critical' },
      { sku: 'CI-MON-DB-ADV', reason: 'Database performance monitoring' },
      { sku: 'CI-SEC-FW-BASIC', reason: 'Database firewall protection' }
    ],
    'CI-DB-POSTGRESQL-M': [
      { sku: 'CI-BAK-DB-1TB', reason: 'Database backup essential' },
      { sku: 'CI-MON-DB-ADV', reason: 'PostgreSQL monitoring' }
    ],

    // Network-based recommendations
    'CI-NET-LB-BASIC': [
      { sku: 'CI-MON-NET-ADV', reason: 'Load balancer monitoring recommended' },
      { sku: 'CI-SEC-SSL-CERT', reason: 'SSL certificate for secure load balancing' }
    ],
    'CI-NET-VPN-SITE': [
      { sku: 'CI-SEC-FW-ENTERPRISE', reason: 'Enterprise firewall for VPN security' },
      { sku: 'CI-MON-NET-ADV', reason: 'VPN connection monitoring' }
    ],

    // Security-based recommendations
    'CI-SEC-FW-BASIC': [
      { sku: 'CI-MON-SEC-BASIC', reason: 'Security monitoring for firewall' },
      { sku: 'CI-SEC-AV-BASIC', reason: 'Comprehensive security stack' }
    ],
    'CI-SEC-AV-ENTERPRISE': [
      { sku: 'CI-SEC-FW-ENTERPRISE', reason: 'Enterprise security suite' },
      { sku: 'CI-MON-SEC-ADV', reason: 'Advanced security monitoring' }
    ],

    // Storage-based recommendations
    'CI-STO-BLOCK-1TB': [
      { sku: 'CI-BAK-STO-1TB', reason: 'Backup for block storage' },
      { sku: 'CI-MON-STO-BASIC', reason: 'Storage performance monitoring' }
    ],

    // Backup-based recommendations
    'CI-BAK-APP-750GB': [
      { sku: 'CI-MON-BAK-BASIC', reason: 'Backup monitoring and alerts' }
    ]
  }

  // SKU categories with comprehensive data
  const skuCategories = {
    compute: {
      name: 'Compute',
      icon: Server,
      color: 'purple',
      items: [
        {
          id: 'CI-COMP-SHARED-S',
          name: 'Shared Compute - Small',
          description: '2 vCPU, 8GB RAM, 100GB Storage',
          price: 6000,
          legacy: 'CI-COMP-VPI-S'
        },
        {
          id: 'CI-COMP-SHARED-M',
          name: 'Shared Compute - Medium',
          description: '4 vCPU, 16GB RAM, 250GB Storage',
          price: 10000,
          legacy: 'CI-COMP-VPI-M'
        },
        {
          id: 'CI-COMP-SHARED-L',
          name: 'Shared Compute - Large',
          description: '8 vCPU, 32GB RAM, 500GB Storage',
          price: 18000,
          legacy: 'CI-COMP-VPI-L'
        },
        {
          id: 'CI-COMP-DEDICATED-M',
          name: 'Dedicated Compute - Medium',
          description: '8 vCPU, 64GB RAM, 1TB Storage',
          price: 35000,
          legacy: 'CI-COMP-VPE-M'
        },
        {
          id: 'CI-COMP-DEDICATED-L',
          name: 'Dedicated Compute - Large',
          description: '16 vCPU, 128GB RAM, 2TB Storage',
          price: 65000,
          legacy: 'CI-COMP-VPE-L'
        }
      ]
    },
    os: {
      name: 'Operating Systems',
      icon: Settings,
      color: 'green',
      items: [
        {
          id: 'CI-OS-UBUNTU-22-LTS',
          name: 'Ubuntu Server 22.04 LTS',
          description: 'Ubuntu Server 22.04 LTS (Free)',
          price: 0,
          legacy: 'CI-OS-UBUNTU-LTS'
        },
        {
          id: 'CI-OS-WINDOWS-2022',
          name: 'Windows Server 2022',
          description: 'Windows Server 2022 Standard',
          price: 8000,
          legacy: 'CI-OS-WIN-2022'
        },
        {
          id: 'CI-OS-RHEL-9',
          name: 'Red Hat Enterprise Linux 9',
          description: 'RHEL 9 with support',
          price: 12000,
          legacy: 'CI-OS-RHEL-9'
        },
        {
          id: 'CI-OS-CENTOS-9',
          name: 'CentOS Stream 9',
          description: 'CentOS Stream 9 (Free)',
          price: 0,
          legacy: 'CI-OS-CENTOS-9'
        },
        {
          id: 'CI-OS-DEBIAN-12',
          name: 'Debian 12',
          description: 'Debian 12 Bookworm (Free)',
          price: 0,
          legacy: 'CI-OS-DEBIAN-12'
        }
      ]
    },
    security: {
      name: 'Security',
      icon: Shield,
      color: 'red',
      items: [
        {
          id: 'CI-SEC-AV-BASIC',
          name: 'Basic Antivirus',
          description: 'Basic antivirus protection',
          price: 200,
          legacy: 'CI-SEC-AV-BASIC'
        },
        {
          id: 'CI-SEC-AV-ENTERPRISE',
          name: 'Enterprise Antivirus',
          description: 'Enterprise antivirus with advanced features',
          price: 500,
          legacy: 'CI-SEC-AV-ENT'
        },
        {
          id: 'CI-SEC-FW-BASIC',
          name: 'Basic Firewall',
          description: 'Basic firewall protection',
          price: 1000,
          legacy: 'CI-SEC-FW-BASIC'
        },
        {
          id: 'CI-SEC-FW-ENTERPRISE',
          name: 'Enterprise Firewall',
          description: 'Enterprise firewall with advanced rules',
          price: 2500,
          legacy: 'CI-SEC-FW-ENT'
        }
      ]
    },
    backup: {
      name: 'Backup & Recovery',
      icon: Archive,
      color: 'blue',
      items: [
        {
          id: 'CI-BAK-APP-750GB',
          name: 'Application Backup',
          description: 'Application data backup service',
          price: 3750,
          legacy: 'CI-BAK-APP'
        },
        {
          id: 'CI-BAK-DB-1TB',
          name: 'Database Backup',
          description: 'Database backup and recovery',
          price: 5000,
          legacy: 'CI-BAK-DB'
        },
        {
          id: 'CI-BAK-STO-1TB',
          name: 'Storage Backup',
          description: 'Storage volume backup',
          price: 2500,
          legacy: 'CI-BAK-STO'
        }
      ]
    },
    network: {
      name: 'Network',
      icon: Network,
      color: 'orange',
      items: [
        {
          id: 'CI-NET-LB-BASIC',
          name: 'Load Balancer - Basic',
          description: 'Basic load balancer',
          price: 5000,
          legacy: 'CI-NET-LB-BASIC'
        },
        {
          id: 'CI-NET-VPN-SITE',
          name: 'Site-to-Site VPN',
          description: 'Site-to-site VPN connection',
          price: 8000,
          legacy: 'CI-NET-VPN-SITE'
        },
        {
          id: 'CI-NET-MPLS-10G',
          name: 'MPLS 10Gbps',
          description: '10Gbps MPLS connection',
          price: 25000,
          legacy: 'CI-NET-MPLS-10G'
        }
      ]
    },
    storage: {
      name: 'Storage',
      icon: HardDrive,
      color: 'indigo',
      items: [
        {
          id: 'CI-STO-BLOCK-1TB',
          name: 'Block Storage 1TB',
          description: 'High-performance block storage',
          price: 4000,
          legacy: 'CI-STO-BLOCK-1TB'
        },
        {
          id: 'CI-STO-OBJECT-5TB',
          name: 'Object Storage 5TB',
          description: 'Scalable object storage',
          price: 2000,
          legacy: 'CI-STO-OBJ-5TB'
        }
      ]
    },
    database: {
      name: 'Database',
      icon: Database,
      color: 'teal',
      items: [
        {
          id: 'CI-DB-MYSQL-M',
          name: 'MySQL Medium',
          description: 'Managed MySQL database',
          price: 15000,
          legacy: 'CI-DB-MYSQL-M'
        },
        {
          id: 'CI-DB-POSTGRESQL-M',
          name: 'PostgreSQL Medium',
          description: 'Managed PostgreSQL database',
          price: 16000,
          legacy: 'CI-DB-PGSQL-M'
        }
      ]
    },
    monitoring: {
      name: 'Monitoring',
      icon: Monitor,
      color: 'yellow',
      items: [
        {
          id: 'CI-MON-SYS-ADV',
          name: 'System Monitoring Advanced',
          description: 'Advanced system monitoring',
          price: 1500,
          legacy: 'CI-MON-SYS-ADV'
        },
        {
          id: 'CI-MON-NET-ADV',
          name: 'Network Advanced Monitoring',
          description: 'Comprehensive network monitoring',
          price: 2500,
          legacy: 'CI-MON-NET-ADV'
        },
        {
          id: 'CI-MON-DB-ADV',
          name: 'Database Monitoring',
          description: 'Database performance monitoring',
          price: 2000,
          legacy: 'CI-MON-DB-ADV'
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
      items: ['CI-COMP-SHARED-M', 'CI-OS-UBUNTU-22-LTS', 'CI-SEC-AV-BASIC', 'CI-BAK-APP-750GB', 'CI-NET-LB-BASIC']
    },
    {
      id: 'database',
      name: 'Database Tier',
      description: 'High-performance database setup',
      items: ['CI-COMP-DEDICATED-M', 'CI-OS-RHEL-9', 'CI-DB-MYSQL-M', 'CI-BAK-DB-1TB', 'CI-MON-DB-ADV']
    },
    {
      id: 'secure',
      name: 'Secure Workload',
      description: 'Security-focused infrastructure',
      items: ['CI-COMP-DEDICATED-L', 'CI-OS-WINDOWS-2022', 'CI-SEC-AV-ENTERPRISE', 'CI-SEC-FW-ENTERPRISE', 'CI-BAK-APP-750GB']
    }
  ]

  // Get all SKUs for search
  const getAllSKUs = () => {
    return Object.values(skuCategories).flatMap(category => category.items)
  }

  // Filter SKUs based on search and category
  const getFilteredSKUs = () => {
    let skus = getAllSKUs()
    
    if (selectedCategory !== 'all') {
      skus = skuCategories[selectedCategory]?.items || []
    }
    
    if (searchTerm) {
      skus = skus.filter(sku => 
        sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sku.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sku.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    return skus
  }

  // Generate smart recommendations when items are added
  const generateRecommendations = (newItems) => {
    const allRecommendations = []
    const existingSkus = new Set(newItems.map(item => item.id))

    newItems.forEach(item => {
      const rules = recommendationRules[item.id]
      if (rules) {
        rules.forEach(rule => {
          if (!existingSkus.has(rule.sku)) {
            const skuData = getAllSKUs().find(s => s.id === rule.sku)
            if (skuData) {
              allRecommendations.push({
                ...skuData,
                reason: rule.reason,
                triggeredBy: item.name
              })
            }
          }
        })
      }
    })

    // Remove duplicates
    const uniqueRecommendations = allRecommendations.filter((rec, index, self) =>
      index === self.findIndex(r => r.id === rec.id)
    )

    setRecommendations(uniqueRecommendations)
    if (uniqueRecommendations.length > 0) {
      setShowRecommendations(true)
    }
  }

  // Add item to workspace
  const addToWorkspace = (sku) => {
    if (!workspaceItems.find(item => item.id === sku.id)) {
      const newItems = [...workspaceItems, sku]
      setWorkspaceItems(newItems)
      generateRecommendations(newItems)
    }
  }

  // Remove item from workspace
  const removeFromWorkspace = (skuId) => {
    const newItems = workspaceItems.filter(item => item.id !== skuId)
    setWorkspaceItems(newItems)
    generateRecommendations(newItems)
  }

  // Apply template
  const applyTemplate = (template) => {
    const templateItems = template.items.map(skuId => 
      getAllSKUs().find(sku => sku.id === skuId)
    ).filter(Boolean)
    
    setWorkspaceItems(templateItems)
    generateRecommendations(templateItems)
  }

  // Add recommendation to workspace
  const addRecommendation = (recommendation) => {
    addToWorkspace(recommendation)
    setRecommendations(prev => prev.filter(r => r.id !== recommendation.id))
  }

  // Dismiss recommendation
  const dismissRecommendation = (recommendationId) => {
    setRecommendations(prev => prev.filter(r => r.id !== recommendationId))
  }

  // Calculate total cost
  const getTotalCost = () => {
    return workspaceItems.reduce((total, item) => total + item.price, 0)
  }

  // Generate quote
  const generateQuote = () => {
    if (workspaceItems.length === 0) {
      alert('Please add items to workspace before generating quote')
      return
    }
    setShowQuoteModal(true)
  }

  // Toggle legacy mapping visibility
  const toggleLegacyMapping = (skuId) => {
    setShowLegacyMapping(prev => ({
      ...prev,
      [skuId]: !prev[skuId]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold">Workspace Manual Entry</h1>
              <p className="text-blue-200">Build your infrastructure visually with intelligent recommendations</p>
            </div>
          </div>
          <button
            onClick={generateQuote}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg transition-colors font-semibold"
          >
            <FileText className="w-5 h-5" />
            <span>Generate Quote</span>
          </button>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Panel - Component Palette */}
        <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Component Palette</h2>
            
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Categories
              </button>
              {Object.entries(skuCategories).map(([key, category]) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                      selectedCategory === key 
                        ? `bg-${category.color}-100 text-${category.color}-800 border-2 border-${category.color}-300` 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                    <span className="bg-gray-200 text-gray-600 px-1 rounded text-xs">
                      {category.items.length}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Quick Start Templates */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Start Templates</h3>
              <div className="space-y-3">
                {quickStartTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                      <button
                        onClick={() => applyTemplate(template)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Component List */}
            <div className="space-y-3">
              {getFilteredSKUs().map((sku) => (
                <div key={sku.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{sku.name}</h4>
                    <button
                      onClick={() => addToWorkspace(sku)}
                      className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{sku.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-medium">SKU: {sku.id}</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Legacy: {sku.legacy}</span>
                        <button
                          onClick={() => toggleLegacyMapping(sku.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {showLegacyMapping[sku.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">₹{sku.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">per month</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Workspace */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Smart Recommendations */}
            {showRecommendations && recommendations.length > 0 && (
              <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-yellow-800">Smart Recommendations</h3>
                  </div>
                  <button
                    onClick={() => setShowRecommendations(false)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-yellow-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-gray-800">{rec.name}</span>
                          <span className="text-sm text-gray-600">₹{rec.price.toLocaleString()}/month</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span className="text-yellow-700">Recommended because:</span> {rec.reason}
                        </div>
                        <div className="text-xs text-gray-500">
                          Triggered by: {rec.triggeredBy}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => addRecommendation(rec)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => dismissRecommendation(rec.id)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    placeholder="Enter project name"
                    value={projectDetails.name}
                    onChange={(e) => setProjectDetails(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Project description"
                    value={projectDetails.description}
                    onChange={(e) => setProjectDetails(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Location</label>
                  <select
                    value={projectDetails.location}
                    onChange={(e) => setProjectDetails(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Mumbai">Mumbai</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Environment</label>
                  <select
                    value={projectDetails.environment}
                    onChange={(e) => setProjectDetails(prev => ({ ...prev, environment: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                    <option value="DR">Disaster Recovery</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Workspace */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Workspace</h3>
                <span className="text-sm text-gray-600">{workspaceItems.length} items</span>
              </div>

              {workspaceItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Server className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No components added yet</p>
                  <p className="text-sm">Add components from the palette or use quick start templates</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {workspaceItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <div className="text-sm text-gray-600">{item.id}</div>
                        <div className="text-sm text-green-600 font-medium">₹{item.price.toLocaleString()}/month</div>
                      </div>
                      <button
                        onClick={() => removeFromWorkspace(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {workspaceItems.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-800">Total Monthly Cost:</span>
                    <span className="text-2xl font-bold text-green-600">₹{getTotalCost().toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Annual: ₹{(getTotalCost() * 12).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Generated Quote</h2>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{projectDetails.name || 'Infrastructure Project'}</h3>
                    <p className="text-blue-200">{projectDetails.description || 'No description provided'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-200">Quote ID</div>
                    <div className="font-mono text-lg">QUOTE-{Date.now()}</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-sm text-blue-200">Location</div>
                    <div className="font-semibold">{projectDetails.location}</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-200">Environment</div>
                    <div className="font-semibold">{projectDetails.environment}</div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-200">Created</div>
                    <div className="font-semibold">{new Date().toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Quote Items</h4>
                <div className="space-y-3">
                  {workspaceItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{item.name}</h5>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                          <div>
                            <span className="font-medium">SKU:</span> {item.id}
                          </div>
                          <div>
                            <span className="font-medium">Legacy:</span> {item.legacy}
                          </div>
                          <div>
                            <span className="font-medium">Qty:</span> 1
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">₹{item.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">per month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Cost Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monthly Total:</span>
                    <span className="font-semibold">₹{getTotalCost().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Total:</span>
                    <span className="font-semibold">₹{(getTotalCost() * 12).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Monthly Cost:</span>
                      <span className="text-green-600">₹{getTotalCost().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => navigate('/quote-generation')}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  View Professional Proposal
                </button>
                <button
                  onClick={() => {
                    const quoteData = {
                      project: projectDetails,
                      items: workspaceItems,
                      total: getTotalCost(),
                      quoteId: `QUOTE-${Date.now()}`,
                      created: new Date().toISOString()
                    }
                    const blob = new Blob([JSON.stringify(quoteData, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `quote-${Date.now()}.json`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SmartWorkspaceManualEntry

