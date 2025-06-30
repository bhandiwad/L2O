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

const WorkspaceManualEntry = () => {
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
      icon: <Monitor className="h-5 w-5" />,
      color: 'bg-green-100 text-green-800',
      components: [
        {
          id: 'os-windows-std',
          name: 'Windows Server 2022 Standard',
          sku: 'CI-OS-WIN-2022-STD',
          legacySku: 'CI-OS-WIN-STD',
          monthlyRate: 600, // per vCPU
          description: 'Windows Server 2022 Standard Edition',
          pricingModel: 'per_vcpu',
          features: ['Active Directory', 'IIS', 'Remote Desktop Services']
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
          monthlyRate: 1500,
          description: 'Enterprise-grade antivirus protection',
          features: ['Real-time Protection', 'Centralized Management', 'Threat Intelligence']
        },
        {
          id: 'av-basic',
          name: 'Basic Antivirus',
          sku: 'CI-SEC-AV-BASIC',
          legacySku: 'CI-SEC-AV-BASIC',
          monthlyRate: 800,
          description: 'Basic antivirus protection',
          features: ['Real-time Scanning', 'Automatic Updates', 'Email Protection']
        },
        {
          id: 'fw-enterprise',
          name: 'Enterprise Firewall',
          sku: 'CI-SEC-FW-ENTERPRISE',
          legacySku: 'CI-SEC-FW-ENT',
          monthlyRate: 15000,
          description: 'Next-generation enterprise firewall',
          features: ['Deep Packet Inspection', 'IPS/IDS', 'VPN Support']
        },
        {
          id: 'fw-basic',
          name: 'Basic Firewall',
          sku: 'CI-SEC-FW-BASIC',
          legacySku: 'CI-SEC-FW-BASIC',
          monthlyRate: 5000,
          description: 'Basic firewall protection',
          features: ['Stateful Inspection', 'Port Filtering', 'Basic Logging']
        },
        {
          id: 'ssl-wildcard',
          name: 'SSL Certificate - Wildcard',
          sku: 'CI-SEC-SSL-WILD',
          legacySku: 'CI-SEC-SSL-WILD',
          monthlyRate: 2000,
          description: 'Wildcard SSL certificate',
          features: ['Unlimited Subdomains', '256-bit Encryption', '99.9% Browser Trust']
        },
        {
          id: 'ssl-single',
          name: 'SSL Certificate - Single Domain',
          sku: 'CI-SEC-SSL-SINGLE',
          legacySku: 'CI-SEC-SSL-SINGLE',
          monthlyRate: 800,
          description: 'Single domain SSL certificate',
          features: ['Single Domain', '256-bit Encryption', 'Mobile Compatible']
        }
      ]
    },
    backup: {
      name: 'Backup & Recovery',
      icon: <Archive className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-800',
      components: [
        {
          id: 'backup-daily',
          name: 'Daily Backup Service',
          sku: 'CI-BAK-DAILY',
          legacySku: 'CI-BAK-DAILY',
          monthlyRate: 5, // per GB
          description: 'Daily automated backup service',
          pricingModel: 'per_gb',
          features: ['Daily Backups', '30 Days Retention', 'Point-in-time Recovery']
        },
        {
          id: 'backup-enterprise',
          name: 'Enterprise Backup',
          sku: 'CI-BAK-ENTERPRISE',
          legacySku: 'CI-BAK-ENT',
          monthlyRate: 8, // per GB
          description: 'Enterprise backup with advanced features',
          pricingModel: 'per_gb',
          features: ['Continuous Backup', '90 Days Retention', 'Instant Recovery', 'Deduplication']
        },
        {
          id: 'backup-dr',
          name: 'DR Backup Service',
          sku: 'CI-BAK-DR',
          legacySku: 'CI-BAK-DR',
          monthlyRate: 12, // per GB
          description: 'Disaster recovery backup service',
          pricingModel: 'per_gb',
          features: ['Cross-region Replication', '180 Days Retention', 'RTO < 4 hours']
        }
      ]
    },
    network: {
      name: 'Network',
      icon: <Network className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-800',
      components: [
        {
          id: 'lb-basic',
          name: 'Basic Load Balancer',
          sku: 'CI-NET-LB-BASIC',
          legacySku: 'CI-NET-LB-BASIC',
          monthlyRate: 3000,
          description: 'Basic load balancer - 1 Gbps',
          specs: { bandwidth: '1 Gbps', connections: 5000 },
          features: ['Layer 4 Balancing', 'Health Checks', 'SSL Passthrough']
        },
        {
          id: 'lb-advanced',
          name: 'Advanced Load Balancer',
          sku: 'CI-NET-LB-ADVANCED',
          legacySku: 'CI-NET-LB-ADV',
          monthlyRate: 8500,
          description: 'Advanced load balancer - 10 Gbps',
          specs: { bandwidth: '10 Gbps', connections: 50000 },
          features: ['Layer 7 Balancing', 'SSL Termination', 'Content Switching', 'WAF']
        },
        {
          id: 'vpn-site2site',
          name: 'Site-to-Site VPN',
          sku: 'CI-NET-VPN-S2S',
          legacySku: 'CI-NET-VPN-S2S',
          monthlyRate: 5000,
          description: 'Site-to-site VPN connection',
          specs: { bandwidth: '100 Mbps' },
          features: ['IPSec Encryption', 'Redundant Tunnels', '99.9% Uptime']
        },
        {
          id: 'mpls-10g',
          name: 'MPLS Link - 10 Gbps',
          sku: 'CI-NET-MPLS-10G',
          legacySku: 'CI-NET-MPLS-10G',
          monthlyRate: 45000,
          description: 'Dedicated MPLS link - 10 Gbps',
          specs: { bandwidth: '10 Gbps', latency: '< 2ms' },
          features: ['Dedicated Bandwidth', 'SLA Guaranteed', 'QoS Support']
        }
      ]
    },
    storage: {
      name: 'Storage',
      icon: <HardDrive className="h-5 w-5" />,
      color: 'bg-indigo-100 text-indigo-800',
      components: [
        {
          id: 'storage-block-ssd',
          name: 'Block Storage - SSD',
          sku: 'CI-STOR-BLOCK-SSD',
          legacySku: 'CI-STOR-BLOCK-SSD',
          monthlyRate: 8, // per GB
          description: 'High-performance SSD block storage',
          pricingModel: 'per_gb',
          specs: { iops: 10000, throughput: '500 MB/s' },
          features: ['High IOPS', 'Low Latency', 'Snapshot Support']
        },
        {
          id: 'storage-block-hdd',
          name: 'Block Storage - HDD',
          sku: 'CI-STOR-BLOCK-HDD',
          legacySku: 'CI-STOR-BLOCK-HDD',
          monthlyRate: 3, // per GB
          description: 'Cost-effective HDD block storage',
          pricingModel: 'per_gb',
          specs: { iops: 1000, throughput: '100 MB/s' },
          features: ['Cost Effective', 'Large Capacity', 'Backup Optimized']
        },
        {
          id: 'storage-object',
          name: 'Object Storage',
          sku: 'CI-STOR-OBJECT',
          legacySku: 'CI-STOR-OBJECT',
          monthlyRate: 2, // per GB
          description: 'Scalable object storage',
          pricingModel: 'per_gb',
          features: ['REST API', 'Unlimited Scale', 'Versioning', 'Lifecycle Management']
        },
        {
          id: 'storage-file',
          name: 'File Storage - NFS',
          sku: 'CI-STOR-FILE-NFS',
          legacySku: 'CI-STOR-FILE-NFS',
          monthlyRate: 6, // per GB
          description: 'Managed NFS file storage',
          pricingModel: 'per_gb',
          features: ['POSIX Compliant', 'Multi-mount', 'Automatic Scaling']
        }
      ]
    },
    database: {
      name: 'Database',
      icon: <Database className="h-5 w-5" />,
      color: 'bg-teal-100 text-teal-800',
      components: [
        {
          id: 'db-mysql-s',
          name: 'MySQL Database - Small',
          sku: 'CI-DB-MYSQL-S',
          legacySku: 'CI-DB-MYSQL-S',
          monthlyRate: 12000,
          description: 'Managed MySQL - 2 vCPU, 8GB RAM',
          specs: { vcpu: 2, ram: 8, storage: 100 },
          features: ['Automated Backups', 'Point-in-time Recovery', 'Read Replicas']
        },
        {
          id: 'db-mysql-m',
          name: 'MySQL Database - Medium',
          sku: 'CI-DB-MYSQL-M',
          legacySku: 'CI-DB-MYSQL-M',
          monthlyRate: 25000,
          description: 'Managed MySQL - 4 vCPU, 16GB RAM',
          specs: { vcpu: 4, ram: 16, storage: 500 },
          features: ['Automated Backups', 'Point-in-time Recovery', 'Read Replicas', 'Performance Insights']
        },
        {
          id: 'db-postgresql-s',
          name: 'PostgreSQL Database - Small',
          sku: 'CI-DB-PGSQL-S',
          legacySku: 'CI-DB-PGSQL-S',
          monthlyRate: 13000,
          description: 'Managed PostgreSQL - 2 vCPU, 8GB RAM',
          specs: { vcpu: 2, ram: 8, storage: 100 },
          features: ['Automated Backups', 'Extensions Support', 'Connection Pooling']
        },
        {
          id: 'db-mongodb-s',
          name: 'MongoDB Database - Small',
          sku: 'CI-DB-MONGO-S',
          legacySku: 'CI-DB-MONGO-S',
          monthlyRate: 15000,
          description: 'Managed MongoDB - 2 vCPU, 8GB RAM',
          specs: { vcpu: 2, ram: 8, storage: 100 },
          features: ['Replica Sets', 'Sharding', 'Automated Backups', 'Performance Advisor']
        }
      ]
    },
    monitoring: {
      name: 'Monitoring',
      icon: <Activity className="h-5 w-5" />,
      color: 'bg-orange-100 text-orange-800',
      components: [
        {
          id: 'mon-basic',
          name: 'Basic Monitoring',
          sku: 'CI-MON-BASIC',
          legacySku: 'CI-MON-BASIC',
          monthlyRate: 1000,
          description: 'Basic infrastructure monitoring',
          features: ['CPU/Memory/Disk Monitoring', 'Email Alerts', 'Basic Dashboards']
        },
        {
          id: 'mon-advanced',
          name: 'Advanced Monitoring',
          sku: 'CI-MON-ADVANCED',
          legacySku: 'CI-MON-ADV',
          monthlyRate: 3000,
          description: 'Advanced monitoring with APM',
          features: ['Application Performance Monitoring', 'Custom Metrics', 'Advanced Analytics', 'API Integration']
        },
        {
          id: 'mon-enterprise',
          name: 'Enterprise Monitoring',
          sku: 'CI-MON-ENTERPRISE',
          legacySku: 'CI-MON-ENT',
          monthlyRate: 8000,
          description: 'Enterprise monitoring suite',
          features: ['Full Stack Monitoring', 'AI-powered Insights', 'Predictive Analytics', '24/7 NOC Support']
        }
      ]
    }
  }

  // Smart recommendations based on selected components
  const getRecommendations = () => {
    const recommendations = []
    
    workspaceItems.forEach(item => {
      const component = findComponentById(item.componentId)
      if (!component) return

      // Compute recommendations
      if (component.requiresOS && !workspaceItems.some(w => findComponentById(w.componentId)?.sku?.includes('OS'))) {
        recommendations.push({
          type: 'required',
          message: `${component.name} requires an Operating System`,
          suggestedComponent: componentCategories.os.components[0],
          category: 'os'
        })
      }

      if (component.requiresAV && !workspaceItems.some(w => findComponentById(w.componentId)?.sku?.includes('AV'))) {
        recommendations.push({
          type: 'required',
          message: `${component.name} requires Antivirus protection`,
          suggestedComponent: componentCategories.security.components[0],
          category: 'security'
        })
      }

      if (component.requiresBackup && !workspaceItems.some(w => findComponentById(w.componentId)?.sku?.includes('BAK'))) {
        recommendations.push({
          type: 'required',
          message: `${component.name} requires Backup service`,
          suggestedComponent: componentCategories.backup.components[0],
          category: 'backup'
        })
      }

      if (component.requiresMonitoring && !workspaceItems.some(w => findComponentById(w.componentId)?.sku?.includes('MON'))) {
        recommendations.push({
          type: 'recommended',
          message: `Consider adding Monitoring for ${component.name}`,
          suggestedComponent: componentCategories.monitoring.components[0],
          category: 'monitoring'
        })
      }

      // High Availability recommendations
      if (component.name.includes('Database') && !workspaceItems.some(w => findComponentById(w.componentId)?.name?.includes('Load Balancer'))) {
        recommendations.push({
          type: 'recommended',
          message: 'Consider adding Load Balancer for high availability',
          suggestedComponent: componentCategories.network.components[1],
          category: 'network'
        })
      }

      // DR recommendations
      if (item.environment === 'Production' && !workspaceItems.some(w => w.environment === 'DR')) {
        recommendations.push({
          type: 'recommended',
          message: 'Consider adding DR components for business continuity',
          suggestedComponent: componentCategories.backup.components[2],
          category: 'backup'
        })
      }
    })

    return recommendations.slice(0, 5) // Limit to 5 recommendations
  }

  const findComponentById = (id) => {
    for (const category of Object.values(componentCategories)) {
      const component = category.components.find(c => c.id === id)
      if (component) return component
    }
    return null
  }

  const addToWorkspace = (component, category) => {
    const newItem = {
      id: Date.now(),
      componentId: component.id,
      category: category,
      location: selectedLocation,
      environment: selectedEnvironment,
      quantity: 1,
      customSpecs: { ...component.specs },
      monthlyRate: component.monthlyRate
    }
    setWorkspaceItems([...workspaceItems, newItem])
  }

  const removeFromWorkspace = (itemId) => {
    setWorkspaceItems(workspaceItems.filter(item => item.id !== itemId))
  }

  const updateWorkspaceItem = (itemId, updates) => {
    setWorkspaceItems(workspaceItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ))
  }

  const calculateTotalCost = () => {
    return workspaceItems.reduce((total, item) => {
      const component = findComponentById(item.componentId)
      if (!component) return total

      let itemCost = component.monthlyRate
      
      // Handle per-vCPU pricing
      if (component.pricingModel === 'per_vcpu' && item.customSpecs?.vcpu) {
        itemCost = component.monthlyRate * item.customSpecs.vcpu
      }
      
      // Handle per-GB pricing
      if (component.pricingModel === 'per_gb' && item.customSpecs?.storage) {
        itemCost = component.monthlyRate * item.customSpecs.storage
      }

      return total + (itemCost * item.quantity)
    }, 0)
  }

  const generateQuote = () => {
    const quote = {
      projectName,
      projectDescription,
      items: workspaceItems.map(item => {
        const component = findComponentById(item.componentId)
        return {
          ...item,
          component,
          totalCost: calculateItemCost(item)
        }
      }),
      totalMonthlyCost: calculateTotalCost(),
      totalAnnualCost: calculateTotalCost() * 12,
      createdDate: new Date().toISOString().split('T')[0]
    }
    
    console.log('Generated Quote:', quote)
    // Here you would typically send this to a quote generation service
  }

  const calculateItemCost = (item) => {
    const component = findComponentById(item.componentId)
    if (!component) return 0

    let itemCost = component.monthlyRate
    
    if (component.pricingModel === 'per_vcpu' && item.customSpecs?.vcpu) {
      itemCost = component.monthlyRate * item.customSpecs.vcpu
    }
    
    if (component.pricingModel === 'per_gb' && item.customSpecs?.storage) {
      itemCost = component.monthlyRate * item.customSpecs.storage
    }

    return itemCost * item.quantity
  }

  const filteredComponents = (category) => {
    if (!searchTerm) return componentCategories[category].components
    
    return componentCategories[category].components.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const ComponentCard = ({ component, category }) => (
    <Card className="sify-card hover:shadow-md transition-all duration-200 cursor-pointer group">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="font-semibold text-sify-blue group-hover:text-sify-orange transition-colors">
              {component.name}
            </h4>
            <p className="text-sm text-gray-600 mb-1">{component.description}</p>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs">{component.sku}</Badge>
              <Badge variant="outline" className="text-xs text-gray-500">{component.legacySku}</Badge>
            </div>
          </div>
          <Button
            size="sm"
            onClick={() => addToWorkspace(component, category)}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {component.specs && (
          <div className="text-xs text-gray-600 mb-2">
            {Object.entries(component.specs).map(([key, value]) => (
              <span key={key} className="mr-3">
                {key}: {value}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-bold text-sify-orange">
              ₹{component.monthlyRate.toLocaleString()}
              {component.pricingModel === 'per_vcpu' && '/vCPU'}
              {component.pricingModel === 'per_gb' && '/GB'}
              /month
            </span>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addToWorkspace(component, category)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {component.features && (
          <div className="mt-2 pt-2 border-t">
            <div className="flex flex-wrap gap-1">
              {component.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {component.features.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{component.features.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const WorkspaceItem = ({ item }) => {
    const component = findComponentById(item.componentId)
    if (!component) return null

    return (
      <Card className="sify-card mb-3">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-semibold text-sify-blue">{component.name}</h4>
              <p className="text-sm text-gray-600">{item.location} • {item.environment}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">{component.sku}</Badge>
                <Badge variant="outline" className="text-xs text-gray-500">{component.legacySku}</Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromWorkspace(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="text-xs text-gray-600">Quantity</label>
              <Input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateWorkspaceItem(item.id, { quantity: parseInt(e.target.value) || 1 })}
                className="h-8"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600">Environment</label>
              <Select
                value={item.environment}
                onValueChange={(value) => updateWorkspaceItem(item.id, { environment: value })}
              >
                <SelectTrigger className="h-8">
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

          {/* Custom specifications */}
          {component.specs && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {Object.entries(component.specs).map(([key, defaultValue]) => (
                <div key={key}>
                  <label className="text-xs text-gray-600 capitalize">{key}</label>
                  <Input
                    type={typeof defaultValue === 'number' ? 'number' : 'text'}
                    value={item.customSpecs?.[key] || defaultValue}
                    onChange={(e) => {
                      const value = typeof defaultValue === 'number' ? parseInt(e.target.value) || 0 : e.target.value
                      updateWorkspaceItem(item.id, {
                        customSpecs: { ...item.customSpecs, [key]: value }
                      })
                    }}
                    className="h-8"
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm text-gray-600">Monthly Cost:</span>
            <span className="font-bold text-sify-orange">₹{calculateItemCost(item).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Component Palette */}
          <div className="lg:col-span-2">
            <Card className="sify-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Component Palette</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search components..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                  <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
                    {Object.entries(componentCategories).map(([key, category]) => (
                      <TabsTrigger key={key} value={key} className="text-xs">
                        <div className="flex items-center space-x-1">
                          {category.icon}
                          <span className="hidden sm:inline">{category.name}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {Object.entries(componentCategories).map(([key, category]) => (
                    <TabsContent key={key} value={key} className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredComponents(key).map((component) => (
                          <ComponentCard
                            key={component.id}
                            component={component}
                            category={key}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Workspace */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card className="sify-card">
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Name</label>
                  <Input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <Textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Project description"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Default Location</label>
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
                    <label className="text-sm font-medium text-gray-700">Default Environment</label>
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

            {/* Smart Recommendations */}
            {showRecommendations && recommendations.length > 0 && (
              <Card className="sify-card border-orange-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-orange-600" />
                      <CardTitle className="text-orange-800">Smart Recommendations</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowRecommendations(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {rec.type === 'required' ? (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          ) : (
                            <Info className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="text-sm font-medium">{rec.message}</span>
                        </div>
                        <p className="text-xs text-gray-600">{rec.suggestedComponent.name}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToWorkspace(rec.suggestedComponent, rec.category)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Workspace Items */}
            <Card className="sify-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Workspace ({workspaceItems.length} items)</CardTitle>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Monthly Cost</p>
                    <p className="text-xl font-bold text-sify-orange">₹{calculateTotalCost().toLocaleString()}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  {workspaceItems.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Server className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No components added yet</p>
                      <p className="text-sm">Click on components from the palette to add them</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {workspaceItems.map((item) => (
                        <WorkspaceItem key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Cost Summary */}
            {workspaceItems.length > 0 && (
              <Card className="sify-card">
                <CardHeader>
                  <CardTitle>Cost Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monthly Cost:</span>
                    <span className="font-bold">₹{calculateTotalCost().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Cost:</span>
                    <span className="font-bold">₹{(calculateTotalCost() * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>3-Year RI Savings (30%):</span>
                    <span className="font-bold">₹{(calculateTotalCost() * 12 * 3 * 0.3).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>3-Year Total (with RI):</span>
                    <span className="text-sify-orange">₹{(calculateTotalCost() * 12 * 3 * 0.7).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceManualEntry

