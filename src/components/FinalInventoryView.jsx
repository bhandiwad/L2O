import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MoreHorizontal,
  Server,
  Network,
  Shield,
  HardDrive,
  Database,
  Monitor,
  Archive,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Pause,
  Play,
  RefreshCw,
  DollarSign,
  Calendar,
  MapPin,
  Activity,
  TrendingUp,
  TrendingDown,
  Zap,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

const FinalInventoryView = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPaymentModel, setSelectedPaymentModel] = useState('all')
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [showLegacySKUs, setShowLegacySKUs] = useState(false)
  const [selectedResource, setSelectedResource] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showMonitoringModal, setShowMonitoringModal] = useState(false)
  const [editFormData, setEditFormData] = useState({})

  // Enhanced inventory data with OS SKUs and proper status management
  const inventoryData = [
    // Mumbai Production Resources
    {
      id: 'res-001',
      name: 'Web Server Cluster Node 1',
      sku: 'CI-COMP-SHARED-XL-MUM',
      legacySku: 'CI-COMP-VPI-XL',
      category: 'Compute',
      type: 'Shared',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 18000,
      riPrice: 15300,
      riSavings: 15,
      specs: { vcpu: 8, ram: 32, storage: 500 },
      utilization: { cpu: 75, memory: 68, storage: 45 },
      commissioned: '2024-01-05',
      riExpiry: null,
      tags: ['web', 'frontend', 'production'],
      dependencies: ['res-002', 'res-003']
    },
    {
      id: 'res-002',
      name: 'Ubuntu Server 22.04 LTS',
      sku: 'CI-OS-UBUNTU-22-LTS-MUM',
      legacySku: 'CI-OS-UBUNTU-LTS',
      category: 'Operating System',
      type: 'Linux',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 0,
      riPrice: 0,
      riSavings: 0,
      specs: { version: '22.04', support: 'LTS', license: 'Open Source' },
      utilization: { uptime: 99.9, patches: 'Current', security: 'Enabled' },
      commissioned: '2024-01-05',
      riExpiry: null,
      tags: ['os', 'linux', 'lts'],
      dependencies: ['res-001']
    },
    {
      id: 'res-003',
      name: 'ClamAV Antivirus',
      sku: 'CI-SEC-AV-CLAM-MUM',
      legacySku: 'CI-SEC-AV-CLAM',
      category: 'Security',
      type: 'Antivirus',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 500,
      riPrice: 425,
      riSavings: 15,
      specs: { engine: 'ClamAV', realtime: true, updates: 'Automatic' },
      utilization: { scans: 'Daily', threats: 0, lastUpdate: '2024-06-30' },
      commissioned: '2024-01-05',
      riExpiry: null,
      tags: ['security', 'antivirus', 'protection'],
      dependencies: ['res-001']
    },
    {
      id: 'res-004',
      name: 'Application Backup Service',
      sku: 'CI-BAK-APP-750GB-MUM',
      legacySku: 'CI-BAK-APP-750GB',
      category: 'Backup',
      type: 'Application',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 3750,
      riPrice: 3750,
      riSavings: 20,
      specs: { capacity: '750GB', retention: '30 days', frequency: 'Daily' },
      utilization: { used: 425, available: 325, lastBackup: '2024-06-30 02:00' },
      commissioned: '2024-01-05',
      riExpiry: '2025-01-05',
      tags: ['backup', 'application', 'daily'],
      dependencies: ['res-001']
    },
    {
      id: 'res-005',
      name: 'Database Server Primary',
      sku: 'CI-COMP-DEDICATED-XL-MUM',
      legacySku: 'CI-COMP-VPE-XL',
      category: 'Compute',
      type: 'Dedicated',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 45000,
      riPrice: 45000,
      riSavings: 25,
      specs: { vcpu: 16, ram: 64, storage: 1000 },
      utilization: { cpu: 82, memory: 75, storage: 60 },
      commissioned: '2024-02-15',
      riExpiry: '2025-02-15',
      tags: ['database', 'primary', 'dedicated'],
      dependencies: ['res-006', 'res-007']
    },
    {
      id: 'res-006',
      name: 'Red Hat Enterprise Linux 9',
      sku: 'CI-OS-RHEL-9-ENT-MUM',
      legacySku: 'CI-OS-RHEL-ENT',
      category: 'Operating System',
      type: 'Linux',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 8000,
      riPrice: 8000,
      riSavings: 20,
      specs: { version: '9.0', support: 'Enterprise', license: 'Commercial' },
      utilization: { uptime: 99.95, patches: 'Current', security: 'Enhanced' },
      commissioned: '2024-02-15',
      riExpiry: '2025-02-15',
      tags: ['os', 'rhel', 'enterprise'],
      dependencies: ['res-005']
    },
    {
      id: 'res-007',
      name: 'Database Security Suite',
      sku: 'CI-SEC-DB-SUITE-MUM',
      legacySku: 'CI-SEC-DB-SUITE',
      category: 'Security',
      type: 'Database Security',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 5000,
      riPrice: 5000,
      riSavings: 20,
      specs: { encryption: 'AES-256', auditing: 'Enabled', compliance: 'HIPAA' },
      utilization: { queries: 'Monitored', threats: 0, compliance: '100%' },
      commissioned: '2024-02-15',
      riExpiry: '2025-02-15',
      tags: ['security', 'database', 'compliance'],
      dependencies: ['res-005']
    },
    {
      id: 'res-008',
      name: 'Enterprise Backup - 2TB',
      sku: 'CI-BAK-ENT-2TB-MUM',
      legacySku: 'CI-BAK-ENT-2TB',
      category: 'Backup',
      type: 'Enterprise',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 8000,
      riPrice: 8000,
      riSavings: 25,
      specs: { capacity: '2TB', retention: '90 days', frequency: 'Hourly' },
      utilization: { used: 1200, available: 800, lastBackup: '2024-06-30 14:00' },
      commissioned: '2024-02-15',
      riExpiry: '2025-02-15',
      tags: ['backup', 'enterprise', 'database'],
      dependencies: ['res-005']
    },
    {
      id: 'res-009',
      name: 'Database Performance Monitoring',
      sku: 'CI-MON-DB-PERF-MUM',
      legacySku: 'CI-MON-DB-PERF',
      category: 'Monitoring',
      type: 'Database',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 4000,
      riPrice: 3400,
      riSavings: 15,
      specs: { metrics: 'Real-time', alerts: 'Enabled', dashboard: 'Custom' },
      utilization: { queries: 15000, alerts: 2, performance: 'Good' },
      commissioned: '2024-02-15',
      riExpiry: null,
      tags: ['monitoring', 'database', 'performance'],
      dependencies: ['res-005']
    },
    {
      id: 'res-010',
      name: 'Advanced Load Balancer',
      sku: 'CI-NET-LB-ADVANCED-MUM',
      legacySku: 'CI-NET-LB-ADV',
      category: 'Network',
      type: 'Load Balancer',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 8500,
      riPrice: 7225,
      riSavings: 15,
      specs: { throughput: '10 Gbps', ssl: 'Termination', healthCheck: 'Enabled' },
      utilization: { connections: 5000, throughput: 6.5, uptime: 99.99 },
      commissioned: '2024-03-12',
      riExpiry: null,
      tags: ['network', 'loadbalancer', 'ha'],
      dependencies: ['res-001', 'res-005']
    },
    {
      id: 'res-011',
      name: 'Wildcard SSL Certificate',
      sku: 'CI-SEC-SSL-WILD-MUM',
      legacySku: 'CI-SEC-SSL-WILD',
      category: 'Security',
      type: 'SSL Certificate',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 2000,
      riPrice: 1700,
      riSavings: 15,
      specs: { type: 'Wildcard', encryption: '256-bit', validity: '1 year' },
      utilization: { domains: 5, expiry: '2025-03-12', status: 'Valid' },
      commissioned: '2024-03-12',
      riExpiry: null,
      tags: ['security', 'ssl', 'certificate'],
      dependencies: ['res-010']
    },
    {
      id: 'res-012',
      name: 'Network Advanced Monitoring',
      sku: 'CI-MON-NET-ADV-MUM',
      legacySku: 'CI-MON-NET-ADV',
      category: 'Monitoring',
      type: 'Network',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 2500,
      riPrice: 2125,
      riSavings: 15,
      specs: { bandwidth: 'Real-time', latency: 'Monitored', alerts: 'Custom' },
      utilization: { bandwidth: 7.2, latency: 15, alerts: 1 },
      commissioned: '2024-03-12',
      riExpiry: null,
      tags: ['monitoring', 'network', 'advanced'],
      dependencies: ['res-010']
    },
    {
      id: 'res-013',
      name: 'Enterprise Firewall',
      sku: 'CI-SEC-FW-ENTERPRISE-MUM',
      legacySku: 'CI-SEC-FW-ENT',
      category: 'Security',
      type: 'Firewall',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 15000,
      riPrice: 15000,
      riSavings: 20,
      specs: { throughput: '20 Gbps', rules: 10000, ips: 'Enabled' },
      utilization: { rules: 2500, threats: 15, blocked: 150 },
      commissioned: '2024-04-25',
      riExpiry: '2025-04-25',
      tags: ['security', 'firewall', 'enterprise'],
      dependencies: []
    },
    {
      id: 'res-014',
      name: 'Firewall Management License',
      sku: 'CI-LIC-FW-MGMT-MUM',
      legacySku: 'CI-LIC-FW-MGMT',
      category: 'License',
      type: 'Management',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 3000,
      riPrice: 3000,
      riSavings: 20,
      specs: { users: 10, features: 'Full', support: '24x7' },
      utilization: { users: 6, features: 'Active', support: 'Available' },
      commissioned: '2024-04-25',
      riExpiry: '2025-04-25',
      tags: ['license', 'firewall', 'management'],
      dependencies: ['res-013']
    },
    {
      id: 'res-015',
      name: 'Threat Intelligence Feed',
      sku: 'CI-SEC-TI-FEED-MUM',
      legacySku: 'CI-SEC-TI-FEED',
      category: 'Security',
      type: 'Threat Intelligence',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 2500,
      riPrice: 2125,
      riSavings: 15,
      specs: { sources: 'Global', updates: 'Real-time', integration: 'API' },
      utilization: { threats: 1250, blocked: 45, accuracy: 98.5 },
      commissioned: '2024-04-25',
      riExpiry: null,
      tags: ['security', 'threat', 'intelligence'],
      dependencies: ['res-013']
    },
    {
      id: 'res-016',
      name: 'Block Storage - 5TB',
      sku: 'CI-STOR-BLOCK-5TB-MUM',
      legacySku: 'CI-STOR-BLOCK-5TB',
      category: 'Storage',
      type: 'Block Storage',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 25000,
      riPrice: 25000,
      riSavings: 25,
      specs: { capacity: '5TB', iops: 10000, encryption: 'AES-256' },
      utilization: { used: 3200, available: 1800, iops: 6500 },
      commissioned: '2024-05-20',
      riExpiry: '2025-05-20',
      tags: ['storage', 'block', 'high-performance'],
      dependencies: []
    },
    {
      id: 'res-017',
      name: 'Storage Encryption Service',
      sku: 'CI-SEC-STOR-ENC-MUM',
      legacySku: 'CI-SEC-STOR-ENC',
      category: 'Security',
      type: 'Storage Encryption',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 3500,
      riPrice: 3500,
      riSavings: 20,
      specs: { algorithm: 'AES-256', keyManagement: 'HSM', compliance: 'FIPS' },
      utilization: { encrypted: '5TB', keys: 25, compliance: '100%' },
      commissioned: '2024-05-20',
      riExpiry: '2025-05-20',
      tags: ['security', 'encryption', 'storage'],
      dependencies: ['res-016']
    },
    {
      id: 'res-018',
      name: 'Storage Replication - 5TB',
      sku: 'CI-STOR-REPL-5TB-MUM',
      legacySku: 'CI-STOR-REPL-5TB',
      category: 'Storage',
      type: 'Replication',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 12500,
      riPrice: 12500,
      riSavings: 25,
      specs: { capacity: '5TB', rpo: '15 minutes', rto: '1 hour' },
      utilization: { replicated: 3200, lag: '5 minutes', health: 'Good' },
      commissioned: '2024-05-20',
      riExpiry: '2025-05-20',
      tags: ['storage', 'replication', 'dr'],
      dependencies: ['res-016']
    },
    {
      id: 'res-019',
      name: 'MySQL Database - Large',
      sku: 'CI-DB-MYSQL-L-MUM',
      legacySku: 'CI-DB-MYSQL-L',
      category: 'Database',
      type: 'MySQL',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 18000,
      riPrice: 18000,
      riSavings: 25,
      specs: { version: '8.0', storage: '1TB', connections: 1000 },
      utilization: { connections: 650, storage: 750, queries: 25000 },
      commissioned: '2024-06-15',
      riExpiry: '2025-06-15',
      tags: ['database', 'mysql', 'analytics'],
      dependencies: ['res-020', 'res-021']
    },
    {
      id: 'res-020',
      name: 'Database Automated Backup - 1TB',
      sku: 'CI-BAK-DB-AUTO-1TB-MUM',
      legacySku: 'CI-BAK-DB-AUTO-1TB',
      category: 'Backup',
      type: 'Database',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 5000,
      riPrice: 5000,
      riSavings: 25,
      specs: { capacity: '1TB', frequency: 'Every 6 hours', retention: '60 days' },
      utilization: { used: 750, available: 250, lastBackup: '2024-06-30 12:00' },
      commissioned: '2024-06-15',
      riExpiry: '2025-06-15',
      tags: ['backup', 'database', 'automated'],
      dependencies: ['res-019']
    },

    // Chennai DR Resources
    {
      id: 'res-021',
      name: 'Shared Compute - Medium (DR)',
      sku: 'CI-COMP-SHARED-M-CHE',
      legacySku: 'CI-COMP-VPI-M',
      category: 'Compute',
      type: 'Shared',
      location: 'Chennai',
      environment: 'DR',
      status: 'Standby',
      paymentModel: 'RI',
      monthlyPrice: 8000,
      riPrice: 8000,
      riSavings: 20,
      specs: { vcpu: 4, ram: 16, storage: 250 },
      utilization: { cpu: 15, memory: 20, storage: 25 },
      commissioned: '2024-07-12',
      riExpiry: '2025-07-12',
      tags: ['dr', 'standby', 'shared'],
      dependencies: ['res-022', 'res-023']
    },
    {
      id: 'res-022',
      name: 'Windows Server 2022 Standard (DR)',
      sku: 'CI-OS-WIN-2022-STD-CHE',
      legacySku: 'CI-OS-WIN-STD',
      category: 'Operating System',
      type: 'Windows',
      location: 'Chennai',
      environment: 'DR',
      status: 'Standby',
      paymentModel: 'RI',
      monthlyPrice: 2400,
      riPrice: 2400,
      riSavings: 20,
      specs: { version: '2022', edition: 'Standard', license: 'Commercial' },
      utilization: { uptime: 99.8, patches: 'Current', security: 'Enabled' },
      commissioned: '2024-07-12',
      riExpiry: '2025-07-12',
      tags: ['os', 'windows', 'dr'],
      dependencies: ['res-021']
    },
    {
      id: 'res-023',
      name: 'Basic Antivirus (DR)',
      sku: 'CI-SEC-AV-BASIC-CHE',
      legacySku: 'CI-SEC-AV-BASIC',
      category: 'Security',
      type: 'Antivirus',
      location: 'Chennai',
      environment: 'DR',
      status: 'Standby',
      paymentModel: 'RI',
      monthlyPrice: 800,
      riPrice: 800,
      riSavings: 20,
      specs: { engine: 'Windows Defender', realtime: true, updates: 'Automatic' },
      utilization: { scans: 'Weekly', threats: 0, lastUpdate: '2024-06-30' },
      commissioned: '2024-07-12',
      riExpiry: '2025-07-12',
      tags: ['security', 'antivirus', 'dr'],
      dependencies: ['res-021']
    },
    {
      id: 'res-024',
      name: 'DR Backup Service - 250GB',
      sku: 'CI-BAK-DR-250GB-CHE',
      legacySku: 'CI-BAK-DR-250GB',
      category: 'Backup',
      type: 'DR',
      location: 'Chennai',
      environment: 'DR',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 1500,
      riPrice: 1500,
      riSavings: 20,
      specs: { capacity: '250GB', retention: '90 days', frequency: 'Daily' },
      utilization: { used: 180, available: 70, lastBackup: '2024-06-30 03:00' },
      commissioned: '2024-07-12',
      riExpiry: '2025-07-12',
      tags: ['backup', 'dr', 'daily'],
      dependencies: ['res-021']
    },
    {
      id: 'res-025',
      name: 'Dedicated Compute - Large (DR)',
      sku: 'CI-COMP-DEDICATED-L-CHE',
      legacySku: 'CI-COMP-VPE-L',
      category: 'Compute',
      type: 'Dedicated',
      location: 'Chennai',
      environment: 'DR',
      status: 'Standby',
      paymentModel: 'RI',
      monthlyPrice: 35000,
      riPrice: 35000,
      riSavings: 25,
      specs: { vcpu: 12, ram: 48, storage: 750 },
      utilization: { cpu: 10, memory: 15, storage: 30 },
      commissioned: '2024-08-25',
      riExpiry: '2025-08-25',
      tags: ['dr', 'dedicated', 'standby'],
      dependencies: ['res-026', 'res-027']
    },
    {
      id: 'res-026',
      name: 'Red Hat Enterprise Linux 9 (DR)',
      sku: 'CI-OS-RHEL-9-ENT-CHE',
      legacySku: 'CI-OS-RHEL-ENT',
      category: 'Operating System',
      type: 'Linux',
      location: 'Chennai',
      environment: 'DR',
      status: 'Standby',
      paymentModel: 'RI',
      monthlyPrice: 6000,
      riPrice: 6000,
      riSavings: 20,
      specs: { version: '9.0', support: 'Enterprise', license: 'Commercial' },
      utilization: { uptime: 99.9, patches: 'Current', security: 'Enhanced' },
      commissioned: '2024-08-25',
      riExpiry: '2025-08-25',
      tags: ['os', 'rhel', 'dr'],
      dependencies: ['res-025']
    },
    {
      id: 'res-027',
      name: 'Database Security Suite (DR)',
      sku: 'CI-SEC-DB-SUITE-CHE',
      legacySku: 'CI-SEC-DB-SUITE',
      category: 'Security',
      type: 'Database Security',
      location: 'Chennai',
      environment: 'DR',
      status: 'Standby',
      paymentModel: 'RI',
      monthlyPrice: 3500,
      riPrice: 3500,
      riSavings: 20,
      specs: { encryption: 'AES-256', auditing: 'Enabled', compliance: 'HIPAA' },
      utilization: { queries: 'Monitored', threats: 0, compliance: '100%' },
      commissioned: '2024-08-25',
      riExpiry: '2025-08-25',
      tags: ['security', 'database', 'dr'],
      dependencies: ['res-025']
    },
    {
      id: 'res-028',
      name: 'Database DR Backup - 1.5TB',
      sku: 'CI-BAK-DB-DR-1.5TB-CHE',
      legacySku: 'CI-BAK-DB-DR-1.5TB',
      category: 'Backup',
      type: 'Database DR',
      location: 'Chennai',
      environment: 'DR',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 7500,
      riPrice: 7500,
      riSavings: 25,
      specs: { capacity: '1.5TB', retention: '180 days', frequency: 'Continuous' },
      utilization: { used: 900, available: 600, lastBackup: '2024-06-30 14:30' },
      commissioned: '2024-08-25',
      riExpiry: '2025-08-25',
      tags: ['backup', 'database', 'dr'],
      dependencies: ['res-025']
    },
    {
      id: 'res-029',
      name: 'MPLS Link - 10 Gbps',
      sku: 'CI-NET-MPLS-10G-CHE',
      legacySku: 'CI-NET-MPLS-10G',
      category: 'Network',
      type: 'MPLS',
      location: 'Chennai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 45000,
      riPrice: 45000,
      riSavings: 20,
      specs: { bandwidth: '10 Gbps', latency: '<5ms', sla: '99.9%' },
      utilization: { bandwidth: 6.8, latency: 3.2, uptime: 99.95 },
      commissioned: '2024-09-20',
      riExpiry: '2025-09-20',
      tags: ['network', 'mpls', 'connectivity'],
      dependencies: []
    },
    {
      id: 'res-030',
      name: 'Network Redundancy - 10G',
      sku: 'CI-NET-REDUN-10G-CHE',
      legacySku: 'CI-NET-REDUN-10G',
      category: 'Network',
      type: 'Redundancy',
      location: 'Chennai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 22500,
      riPrice: 22500,
      riSavings: 20,
      specs: { bandwidth: '10 Gbps', failover: '<30s', redundancy: 'Active-Passive' },
      utilization: { primary: 6.8, secondary: 0, failovers: 0 },
      commissioned: '2024-09-20',
      riExpiry: '2025-09-20',
      tags: ['network', 'redundancy', 'ha'],
      dependencies: ['res-029']
    },
    {
      id: 'res-031',
      name: 'WAN Monitoring Service',
      sku: 'CI-MON-NET-WAN-CHE',
      legacySku: 'CI-MON-NET-WAN',
      category: 'Monitoring',
      type: 'WAN',
      location: 'Chennai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'PAYG',
      monthlyPrice: 3500,
      riPrice: 2975,
      riSavings: 15,
      specs: { monitoring: '24x7', alerts: 'Real-time', reporting: 'Detailed' },
      utilization: { links: 2, alerts: 0, reports: 'Monthly' },
      commissioned: '2024-09-20',
      riExpiry: null,
      tags: ['monitoring', 'wan', 'network'],
      dependencies: ['res-029', 'res-030']
    },
    {
      id: 'res-032',
      name: 'Backup Storage - 10TB',
      sku: 'CI-STOR-BACKUP-10TB-CHE',
      legacySku: 'CI-STOR-BACKUP-10TB',
      category: 'Storage',
      type: 'Backup Storage',
      location: 'Chennai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 20000,
      riPrice: 20000,
      riSavings: 25,
      specs: { capacity: '10TB', redundancy: 'RAID-6', encryption: 'AES-256' },
      utilization: { used: 6500, available: 3500, growth: '5%/month' },
      commissioned: '2024-10-15',
      riExpiry: '2025-10-15',
      tags: ['storage', 'backup', 'large'],
      dependencies: []
    },
    {
      id: 'res-033',
      name: 'Backup Encryption Service',
      sku: 'CI-SEC-BAK-ENC-CHE',
      legacySku: 'CI-SEC-BAK-ENC',
      category: 'Security',
      type: 'Backup Encryption',
      location: 'Chennai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 2500,
      riPrice: 2500,
      riSavings: 20,
      specs: { algorithm: 'AES-256', keyRotation: 'Monthly', compliance: 'SOC2' },
      utilization: { encrypted: '10TB', keys: 50, compliance: '100%' },
      commissioned: '2024-10-15',
      riExpiry: '2025-10-15',
      tags: ['security', 'encryption', 'backup'],
      dependencies: ['res-032']
    },
    {
      id: 'res-034',
      name: 'Storage Deduplication - 10TB',
      sku: 'CI-STOR-DEDUP-10TB-CHE',
      legacySku: 'CI-STOR-DEDUP-10TB',
      category: 'Storage',
      type: 'Deduplication',
      location: 'Chennai',
      environment: 'Production',
      status: 'Active',
      paymentModel: 'RI',
      monthlyPrice: 5000,
      riPrice: 5000,
      riSavings: 25,
      specs: { capacity: '10TB', ratio: '3:1', algorithm: 'Variable Block' },
      utilization: { logical: 10000, physical: 3300, ratio: 3.03 },
      commissioned: '2024-10-15',
      riExpiry: '2025-10-15',
      tags: ['storage', 'deduplication', 'optimization'],
      dependencies: ['res-032']
    },

    // Terminated/Maintenance Resources
    {
      id: 'res-035',
      name: 'Legacy Web Server',
      sku: 'CI-COMP-SHARED-S-MUM',
      legacySku: 'CI-COMP-VPI-S',
      category: 'Compute',
      type: 'Shared',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Terminated',
      paymentModel: 'PAYG',
      monthlyPrice: 6000,
      riPrice: 5100,
      riSavings: 15,
      specs: { vcpu: 2, ram: 8, storage: 100 },
      utilization: { cpu: 0, memory: 0, storage: 0 },
      commissioned: '2023-12-01',
      terminated: '2024-01-05',
      riExpiry: null,
      tags: ['legacy', 'terminated', 'replaced'],
      dependencies: []
    },
    {
      id: 'res-036',
      name: 'Test Database Server',
      sku: 'CI-COMP-SHARED-M-MUM',
      legacySku: 'CI-COMP-VPI-M',
      category: 'Compute',
      type: 'Shared',
      location: 'Mumbai',
      environment: 'Staging',
      status: 'Maintenance',
      paymentModel: 'PAYG',
      monthlyPrice: 10000,
      riPrice: 8500,
      riSavings: 15,
      specs: { vcpu: 4, ram: 16, storage: 250 },
      utilization: { cpu: 0, memory: 0, storage: 45 },
      commissioned: '2024-05-01',
      riExpiry: null,
      tags: ['staging', 'maintenance', 'testing'],
      dependencies: []
    },
    {
      id: 'res-037',
      name: 'Development Environment',
      sku: 'CI-COMP-SHARED-S-MUM',
      legacySku: 'CI-COMP-VPI-S',
      category: 'Compute',
      type: 'Shared',
      location: 'Mumbai',
      environment: 'Development',
      status: 'Error',
      paymentModel: 'PAYG',
      monthlyPrice: 6000,
      riPrice: 5100,
      riSavings: 15,
      specs: { vcpu: 2, ram: 8, storage: 100 },
      utilization: { cpu: 0, memory: 0, storage: 25 },
      commissioned: '2024-04-15',
      riExpiry: null,
      tags: ['development', 'error', 'troubleshooting'],
      dependencies: []
    },
    {
      id: 'res-038',
      name: 'Backup Test Server',
      sku: 'CI-COMP-SHARED-S-CHE',
      legacySku: 'CI-COMP-VPI-S',
      category: 'Compute',
      type: 'Shared',
      location: 'Chennai',
      environment: 'Staging',
      status: 'Paused',
      paymentModel: 'PAYG',
      monthlyPrice: 6000,
      riPrice: 5100,
      riSavings: 15,
      specs: { vcpu: 2, ram: 8, storage: 100 },
      utilization: { cpu: 0, memory: 0, storage: 15 },
      commissioned: '2024-03-20',
      riExpiry: null,
      tags: ['staging', 'paused', 'backup-testing'],
      dependencies: []
    },
    {
      id: 'res-039',
      name: 'Ubuntu Server 20.04 LTS (Dev)',
      sku: 'CI-OS-UBUNTU-20-LTS-MUM',
      legacySku: 'CI-OS-UBUNTU-LTS',
      category: 'Operating System',
      type: 'Linux',
      location: 'Mumbai',
      environment: 'Development',
      status: 'Error',
      paymentModel: 'PAYG',
      monthlyPrice: 0,
      riPrice: 0,
      riSavings: 0,
      specs: { version: '20.04', support: 'LTS', license: 'Open Source' },
      utilization: { uptime: 0, patches: 'Outdated', security: 'Disabled' },
      commissioned: '2024-04-15',
      riExpiry: null,
      tags: ['os', 'linux', 'development'],
      dependencies: ['res-037']
    },
    {
      id: 'res-040',
      name: 'CentOS 7 (Legacy)',
      sku: 'CI-OS-CENTOS-7-MUM',
      legacySku: 'CI-OS-CENTOS-7',
      category: 'Operating System',
      type: 'Linux',
      location: 'Mumbai',
      environment: 'Production',
      status: 'Terminated',
      paymentModel: 'PAYG',
      monthlyPrice: 0,
      riPrice: 0,
      riSavings: 0,
      specs: { version: '7.9', support: 'EOL', license: 'Open Source' },
      utilization: { uptime: 0, patches: 'EOL', security: 'Disabled' },
      commissioned: '2023-12-01',
      terminated: '2024-01-05',
      riExpiry: null,
      tags: ['os', 'centos', 'eol'],
      dependencies: ['res-035']
    }
  ]

  const filteredResources = inventoryData.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesLocation = selectedLocation === 'all' || resource.location === selectedLocation
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesPaymentModel = selectedPaymentModel === 'all' || resource.paymentModel === selectedPaymentModel
    const matchesEnvironment = selectedEnvironment === 'all' || resource.environment === selectedEnvironment
    const matchesStatus = selectedStatus === 'all' || resource.status === selectedStatus
    
    return matchesSearch && matchesLocation && matchesCategory && matchesPaymentModel && matchesEnvironment && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Standby': return 'bg-blue-100 text-blue-800'
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'Error': return 'bg-red-100 text-red-800'
      case 'Paused': return 'bg-gray-100 text-gray-800'
      case 'Terminated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4" />
      case 'Standby': return <Clock className="h-4 w-4" />
      case 'Maintenance': return <Settings className="h-4 w-4" />
      case 'Error': return <XCircle className="h-4 w-4" />
      case 'Paused': return <Pause className="h-4 w-4" />
      case 'Terminated': return <XCircle className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Compute': return <Server className="h-5 w-5" />
      case 'Network': return <Network className="h-5 w-5" />
      case 'Security': return <Shield className="h-5 w-5" />
      case 'Storage': return <HardDrive className="h-5 w-5" />
      case 'Database': return <Database className="h-5 w-5" />
      case 'Monitoring': return <Monitor className="h-5 w-5" />
      case 'Backup': return <Archive className="h-5 w-5" />
      case 'Operating System': return <Settings className="h-5 w-5" />
      case 'License': return <CheckCircle className="h-5 w-5" />
      default: return <Server className="h-5 w-5" />
    }
  }

  const handleEdit = (resource) => {
    setSelectedResource(resource)
    setEditFormData({
      paymentModel: resource.paymentModel,
      specs: { ...resource.specs },
      environment: resource.environment,
      status: resource.status
    })
    setShowEditModal(true)
  }

  const handleMonitoring = (resource) => {
    setSelectedResource(resource)
    setShowMonitoringModal(true)
  }

  const handleSaveEdit = () => {
    // In a real application, this would make an API call
    console.log('Saving changes for resource:', selectedResource.id, editFormData)
    setShowEditModal(false)
    setSelectedResource(null)
  }

  const getEditFields = (category, specs) => {
    switch (category) {
      case 'Compute':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">vCPU</label>
              <Slider
                value={[editFormData.specs?.vcpu || specs.vcpu]}
                onValueChange={(value) => setEditFormData(prev => ({
                  ...prev,
                  specs: { ...prev.specs, vcpu: value[0] }
                }))}
                max={32}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                Current: {editFormData.specs?.vcpu || specs.vcpu} vCPU
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">RAM (GB)</label>
              <Slider
                value={[editFormData.specs?.ram || specs.ram]}
                onValueChange={(value) => setEditFormData(prev => ({
                  ...prev,
                  specs: { ...prev.specs, ram: value[0] }
                }))}
                max={256}
                min={4}
                step={4}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                Current: {editFormData.specs?.ram || specs.ram} GB
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Storage (GB)</label>
              <Slider
                value={[editFormData.specs?.storage || specs.storage]}
                onValueChange={(value) => setEditFormData(prev => ({
                  ...prev,
                  specs: { ...prev.specs, storage: value[0] }
                }))}
                max={5000}
                min={100}
                step={50}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                Current: {editFormData.specs?.storage || specs.storage} GB
              </div>
            </div>
          </div>
        )
      case 'Network':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Bandwidth (Gbps)</label>
              <Slider
                value={[parseFloat(editFormData.specs?.bandwidth || specs.bandwidth || '1')]}
                onValueChange={(value) => setEditFormData(prev => ({
                  ...prev,
                  specs: { ...prev.specs, bandwidth: value[0].toString() + ' Gbps' }
                }))}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                Current: {editFormData.specs?.bandwidth || specs.bandwidth}
              </div>
            </div>
          </div>
        )
      case 'Storage':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Capacity (TB)</label>
              <Slider
                value={[parseFloat(editFormData.specs?.capacity?.replace('TB', '') || specs.capacity?.replace('TB', '') || '1')]}
                onValueChange={(value) => setEditFormData(prev => ({
                  ...prev,
                  specs: { ...prev.specs, capacity: value[0] + 'TB' }
                }))}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                Current: {editFormData.specs?.capacity || specs.capacity}
              </div>
            </div>
          </div>
        )
      case 'Database':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Storage (TB)</label>
              <Slider
                value={[parseFloat(editFormData.specs?.storage?.replace('TB', '') || specs.storage?.replace('TB', '') || '1')]}
                onValueChange={(value) => setEditFormData(prev => ({
                  ...prev,
                  specs: { ...prev.specs, storage: value[0] + 'TB' }
                }))}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                Current: {editFormData.specs?.storage || specs.storage}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Connections</label>
              <Slider
                value={[editFormData.specs?.connections || specs.connections || 100]}
                onValueChange={(value) => setEditFormData(prev => ({
                  ...prev,
                  specs: { ...prev.specs, connections: value[0] }
                }))}
                max={5000}
                min={100}
                step={100}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                Current: {editFormData.specs?.connections || specs.connections}
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-sm text-gray-500">
            No configurable parameters for this resource type.
          </div>
        )
    }
  }

  const totalResources = filteredResources.length
  const activeResources = filteredResources.filter(r => r.status === 'Active').length
  const totalMonthlyCost = filteredResources.reduce((sum, r) => sum + r.monthlyPrice, 0)
  const riCoverage = Math.round((filteredResources.filter(r => r.paymentModel === 'RI').length / totalResources) * 100)

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
                onClick={() => navigate('/order-history')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                Order History
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/audit-trail')}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
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
                  <p className="text-3xl font-bold text-sify-blue">2</p>
                </div>
                <MapPin className="h-8 w-8 text-sify-blue" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
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
                    <SelectItem value="Operating System">Operating System</SelectItem>
                    <SelectItem value="Network">Network</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Storage">Storage</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="Backup">Backup</SelectItem>
                    <SelectItem value="Monitoring">Monitoring</SelectItem>
                    <SelectItem value="License">License</SelectItem>
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
                    <SelectItem value="PAYG">Pay As You Go</SelectItem>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Standby">Standby</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Error">Error</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={showLegacySKUs}
                    onCheckedChange={setShowLegacySKUs}
                    id="legacy-skus"
                  />
                  <label htmlFor="legacy-skus" className="text-sm font-medium">
                    Show Legacy SKUs
                  </label>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredResources.length} of {inventoryData.length} resources
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">View Mode</label>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="sify-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-sify-blue/10 rounded-lg flex items-center justify-center">
                        {getCategoryIcon(resource.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sify-blue">{resource.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(resource.status)}>
                            {getStatusIcon(resource.status)}
                            <span className="ml-1">{resource.status}</span>
                          </Badge>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">SKU:</span>
                      <div className="text-right">
                        <span className="font-mono text-xs">{resource.sku}</span>
                        {showLegacySKUs && (
                          <div className="text-xs text-gray-400 font-mono">
                            Legacy: {resource.legacySku}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Location:</span>
                      <span>{resource.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Environment:</span>
                      <span>{resource.environment}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment:</span>
                      <Badge variant={resource.paymentModel === 'RI' ? 'default' : 'secondary'}>
                        {resource.paymentModel}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Commissioned:</span>
                      <span>{resource.commissioned}</span>
                    </div>
                  </div>

                  {/* Utilization Metrics */}
                  {resource.category === 'Compute' && resource.utilization && (
                    <div className="space-y-2 mb-4">
                      <div className="text-sm font-medium">Utilization</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>CPU</span>
                          <span>{resource.utilization.cpu}%</span>
                        </div>
                        <Progress value={resource.utilization.cpu} className="h-1" />
                        <div className="flex justify-between text-xs">
                          <span>Memory</span>
                          <span>{resource.utilization.memory}%</span>
                        </div>
                        <Progress value={resource.utilization.memory} className="h-1" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-right">
                      <p className="text-lg font-bold text-sify-orange">₹{resource.monthlyPrice.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">per month</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMonitoring(resource)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(resource)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="sify-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Resource</th>
                      <th className="text-left p-4">SKU</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Location</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Payment</th>
                      <th className="text-right p-4">Cost</th>
                      <th className="text-center p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResources.map((resource) => (
                      <tr key={resource.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-sify-blue/10 rounded-lg flex items-center justify-center">
                              {getCategoryIcon(resource.category)}
                            </div>
                            <div>
                              <div className="font-medium">{resource.name}</div>
                              <div className="text-sm text-gray-500">{resource.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-mono text-sm">{resource.sku}</div>
                          {showLegacySKUs && (
                            <div className="text-xs text-gray-400 font-mono">
                              {resource.legacySku}
                            </div>
                          )}
                        </td>
                        <td className="p-4">{resource.category}</td>
                        <td className="p-4">{resource.location}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(resource.status)}>
                            {getStatusIcon(resource.status)}
                            <span className="ml-1">{resource.status}</span>
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={resource.paymentModel === 'RI' ? 'default' : 'secondary'}>
                            {resource.paymentModel}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-bold text-sify-orange">₹{resource.monthlyPrice.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">per month</div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleMonitoring(resource)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(resource)}
                            >
                              <Edit className="h-4 w-4" />
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

        {/* Edit Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-2xl">
            {selectedResource && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit Resource: {selectedResource.name}</DialogTitle>
                  <DialogDescription>
                    Modify resource configuration and payment model
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="config" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="config">Configuration</TabsTrigger>
                    <TabsTrigger value="payment">Payment Model</TabsTrigger>
                    <TabsTrigger value="management">Management</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="config" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Resource Specifications</h4>
                      {getEditFields(selectedResource.category, selectedResource.specs)}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Payment Model</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Current Model</label>
                          <Select 
                            value={editFormData.paymentModel} 
                            onValueChange={(value) => setEditFormData(prev => ({ ...prev, paymentModel: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PAYG">Pay As You Go</SelectItem>
                              <SelectItem value="RI">Reserved Instance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h5 className="font-medium mb-2">Cost Comparison</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>PAYG Monthly:</span>
                              <span className="font-medium">₹{selectedResource.monthlyPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>RI Monthly:</span>
                              <span className="font-medium">₹{selectedResource.riPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                              <span>Potential Savings:</span>
                              <span className="font-medium">{selectedResource.riSavings}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="management" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Resource Management</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Environment</label>
                          <Select 
                            value={editFormData.environment} 
                            onValueChange={(value) => setEditFormData(prev => ({ ...prev, environment: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Production">Production</SelectItem>
                              <SelectItem value="DR">DR</SelectItem>
                              <SelectItem value="Staging">Staging</SelectItem>
                              <SelectItem value="Development">Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Status</label>
                          <Select 
                            value={editFormData.status} 
                            onValueChange={(value) => setEditFormData(prev => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Standby">Standby</SelectItem>
                              <SelectItem value="Maintenance">Maintenance</SelectItem>
                              <SelectItem value="Paused">Paused</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Monitoring Modal */}
        <Dialog open={showMonitoringModal} onOpenChange={setShowMonitoringModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedResource && (
              <>
                <DialogHeader>
                  <DialogTitle>Resource Monitoring: {selectedResource.name}</DialogTitle>
                  <DialogDescription>
                    Real-time monitoring and performance metrics
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Resource Overview */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-600">Status</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(selectedResource.status)}>
                            {getStatusIcon(selectedResource.status)}
                            <span className="ml-1">{selectedResource.status}</span>
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-600">Location</div>
                        <div className="font-medium mt-1">{selectedResource.location}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-600">Environment</div>
                        <div className="font-medium mt-1">{selectedResource.environment}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-gray-600">Monthly Cost</div>
                        <div className="font-bold text-sify-orange mt-1">₹{selectedResource.monthlyPrice.toLocaleString()}</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Performance Metrics */}
                  {selectedResource.category === 'Compute' && selectedResource.utilization && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>CPU Utilization</span>
                              <span>{selectedResource.utilization.cpu}%</span>
                            </div>
                            <Progress value={selectedResource.utilization.cpu} className="h-2" />
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedResource.specs.vcpu} vCPU allocated
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Memory Utilization</span>
                              <span>{selectedResource.utilization.memory}%</span>
                            </div>
                            <Progress value={selectedResource.utilization.memory} className="h-2" />
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedResource.specs.ram} GB allocated
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Storage Utilization</span>
                              <span>{selectedResource.utilization.storage}%</span>
                            </div>
                            <Progress value={selectedResource.utilization.storage} className="h-2" />
                            <div className="text-xs text-gray-500 mt-1">
                              {selectedResource.specs.storage} GB allocated
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Network Metrics */}
                  {selectedResource.category === 'Network' && selectedResource.utilization && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Network Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <div className="text-sm text-gray-600">Throughput</div>
                            <div className="text-2xl font-bold">{selectedResource.utilization.throughput} Gbps</div>
                            <div className="text-xs text-gray-500">of {selectedResource.specs.throughput}</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-600">Active Connections</div>
                            <div className="text-2xl font-bold">{selectedResource.utilization.connections?.toLocaleString()}</div>
                            <div className="text-xs text-gray-500">concurrent connections</div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-600">Uptime</div>
                            <div className="text-2xl font-bold">{selectedResource.utilization.uptime}%</div>
                            <div className="text-xs text-gray-500">last 30 days</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Dependencies */}
                  {selectedResource.dependencies && selectedResource.dependencies.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Dependencies</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedResource.dependencies.map(depId => {
                            const dep = inventoryData.find(r => r.id === depId)
                            return dep ? (
                              <div key={depId} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                <div className="w-6 h-6 bg-sify-blue/10 rounded flex items-center justify-center">
                                  {getCategoryIcon(dep.category)}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium">{dep.name}</div>
                                  <div className="text-sm text-gray-500">{dep.sku}</div>
                                </div>
                                <Badge className={getStatusColor(dep.status)}>
                                  {dep.status}
                                </Badge>
                              </div>
                            ) : null
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Tags */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Resource Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedResource.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={() => setShowMonitoringModal(false)}>
                    Close
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default FinalInventoryView

