import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Calendar,
  User,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Shield,
  Database,
  Server,
  Network,
  HardDrive,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Download,
  Archive,
  DollarSign
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

const AuditTrailPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAction, setSelectedAction] = useState('all')
  const [selectedUser, setSelectedUser] = useState('all')
  const [selectedDate, setSelectedDate] = useState('all')

  // Comprehensive audit trail data
  const auditTrail = [
    {
      id: 'AUD-2024-001',
      timestamp: '2024-06-30 14:30:25',
      user: 'Rajesh Kumar',
      role: 'Account Manager',
      action: 'Resource Created',
      category: 'Compute',
      resource: 'Web Server Cluster Node 1',
      resourceId: 'CI-COMP-SHARED-XL-MUM-001',
      details: 'Created new shared compute instance with 8 vCPU, 32GB RAM, 500GB storage',
      status: 'Success',
      ipAddress: '192.168.1.100',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-002',
      timestamp: '2024-06-30 14:32:15',
      user: 'Priya Sharma',
      role: 'Solution Architect',
      action: 'Configuration Modified',
      category: 'Operating System',
      resource: 'Ubuntu Server 22.04 LTS',
      resourceId: 'CI-OS-UBUNTU-22-LTS-MUM-001',
      details: 'Installed Ubuntu Server 22.04 LTS on compute instance',
      status: 'Success',
      ipAddress: '192.168.1.101',
      location: 'Mumbai',
      impact: 'Medium'
    },
    {
      id: 'AUD-2024-003',
      timestamp: '2024-06-30 14:35:42',
      user: 'Amit Patel',
      role: 'Security Administrator',
      action: 'Security Policy Applied',
      category: 'Security',
      resource: 'ClamAV Antivirus',
      resourceId: 'CI-SEC-AV-CLAM-MUM-001',
      details: 'Deployed and configured ClamAV antivirus with real-time scanning',
      status: 'Success',
      ipAddress: '192.168.1.102',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-004',
      timestamp: '2024-06-30 14:40:18',
      user: 'Sneha Reddy',
      role: 'Backup Administrator',
      action: 'Backup Configured',
      category: 'Backup',
      resource: 'Application Backup Service',
      resourceId: 'CI-BAK-APP-750GB-MUM-001',
      details: 'Configured daily backup for 750GB application data with 30-day retention',
      status: 'Success',
      ipAddress: '192.168.1.103',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-005',
      timestamp: '2024-06-30 15:15:33',
      user: 'Vikram Singh',
      role: 'Database Administrator',
      action: 'Resource Scaled',
      category: 'Compute',
      resource: 'Database Server Primary',
      resourceId: 'CI-COMP-DEDICATED-XL-MUM-002',
      details: 'Scaled database server from Medium to XL (16 vCPU, 64GB RAM, 1TB storage)',
      status: 'Success',
      ipAddress: '192.168.1.104',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-006',
      timestamp: '2024-06-30 15:20:45',
      user: 'Anita Gupta',
      role: 'Network Administrator',
      action: 'Network Configured',
      category: 'Network',
      resource: 'Advanced Load Balancer',
      resourceId: 'CI-NET-LB-ADVANCED-MUM-001',
      details: 'Configured advanced load balancer with SSL termination and health checks',
      status: 'Success',
      ipAddress: '192.168.1.105',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-007',
      timestamp: '2024-06-30 15:45:12',
      user: 'Rahul Joshi',
      role: 'Security Administrator',
      action: 'Certificate Installed',
      category: 'Security',
      resource: 'Wildcard SSL Certificate',
      resourceId: 'CI-SEC-SSL-WILD-MUM-001',
      details: 'Installed wildcard SSL certificate for *.maxhealthcare.com domain',
      status: 'Success',
      ipAddress: '192.168.1.106',
      location: 'Mumbai',
      impact: 'Medium'
    },
    {
      id: 'AUD-2024-008',
      timestamp: '2024-06-30 16:10:28',
      user: 'Kavya Nair',
      role: 'Monitoring Specialist',
      action: 'Monitoring Enabled',
      category: 'Monitoring',
      resource: 'Network Advanced Monitoring',
      resourceId: 'CI-MON-NET-ADV-MUM-001',
      details: 'Enabled advanced network monitoring with alerting and dashboards',
      status: 'Success',
      ipAddress: '192.168.1.107',
      location: 'Mumbai',
      impact: 'Medium'
    },
    {
      id: 'AUD-2024-009',
      timestamp: '2024-06-30 16:30:55',
      user: 'Suresh Kumar',
      role: 'Firewall Administrator',
      action: 'Firewall Deployed',
      category: 'Security',
      resource: 'Enterprise Firewall',
      resourceId: 'CI-SEC-FW-ENTERPRISE-MUM-001',
      details: 'Deployed enterprise firewall with intrusion detection and prevention',
      status: 'Success',
      ipAddress: '192.168.1.108',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-010',
      timestamp: '2024-06-30 17:00:22',
      user: 'Meera Iyer',
      role: 'Storage Administrator',
      action: 'Storage Provisioned',
      category: 'Storage',
      resource: 'Block Storage - 5TB',
      resourceId: 'CI-STOR-BLOCK-5TB-MUM-001',
      details: 'Provisioned 5TB block storage with encryption and replication',
      status: 'Success',
      ipAddress: '192.168.1.109',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-011',
      timestamp: '2024-06-30 17:25:18',
      user: 'Arjun Mehta',
      role: 'Database Administrator',
      action: 'Database Created',
      category: 'Database',
      resource: 'MySQL Database - Large',
      resourceId: 'CI-DB-MYSQL-L-MUM-001',
      details: 'Created MySQL database instance with automated backup and monitoring',
      status: 'Success',
      ipAddress: '192.168.1.110',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-012',
      timestamp: '2024-06-30 18:00:45',
      user: 'Pooja Agarwal',
      role: 'DR Administrator',
      action: 'DR Setup Initiated',
      category: 'Compute',
      resource: 'Shared Compute - Medium (DR)',
      resourceId: 'CI-COMP-SHARED-M-CHE-001',
      details: 'Initiated disaster recovery setup in Chennai location',
      status: 'Success',
      ipAddress: '192.168.2.100',
      location: 'Chennai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-013',
      timestamp: '2024-06-30 18:15:33',
      user: 'Karthik Raman',
      role: 'Network Engineer',
      action: 'Network Link Established',
      category: 'Network',
      resource: 'MPLS Link - 10 Gbps',
      resourceId: 'CI-NET-MPLS-10G-CHE-001',
      details: 'Established 10 Gbps MPLS link between Mumbai and Chennai',
      status: 'Success',
      ipAddress: '192.168.2.101',
      location: 'Chennai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-014',
      timestamp: '2024-06-30 18:45:12',
      user: 'Deepika Sinha',
      role: 'Compliance Officer',
      action: 'Compliance Check',
      category: 'Compliance',
      resource: 'Database Compliance Suite',
      resourceId: 'CI-COMP-DB-SUITE-MUM-001',
      details: 'Performed compliance check for healthcare data regulations',
      status: 'Success',
      ipAddress: '192.168.1.111',
      location: 'Mumbai',
      impact: 'High'
    },
    {
      id: 'AUD-2024-015',
      timestamp: '2024-06-30 19:10:28',
      user: 'Rajesh Kumar',
      role: 'Account Manager',
      action: 'Payment Model Changed',
      category: 'Billing',
      resource: 'Web Server Cluster Node 1',
      resourceId: 'CI-COMP-SHARED-XL-MUM-001',
      details: 'Changed payment model from PAYG to Reserved Instance (1-year term)',
      status: 'Success',
      ipAddress: '192.168.1.100',
      location: 'Mumbai',
      impact: 'Medium'
    },
    {
      id: 'AUD-2024-016',
      timestamp: '2024-06-30 19:30:55',
      user: 'System Automation',
      role: 'System',
      action: 'Automated Backup',
      category: 'Backup',
      resource: 'Database Automated Backup - 1TB',
      resourceId: 'CI-BAK-DB-AUTO-1TB-MUM-001',
      details: 'Automated daily backup completed successfully',
      status: 'Success',
      ipAddress: 'System',
      location: 'Mumbai',
      impact: 'Low'
    },
    {
      id: 'AUD-2024-017',
      timestamp: '2024-06-30 20:00:15',
      user: 'Monitoring System',
      role: 'System',
      action: 'Alert Generated',
      category: 'Monitoring',
      resource: 'Database Performance Monitoring',
      resourceId: 'CI-MON-DB-PERF-MUM-001',
      details: 'High CPU utilization alert generated for database server',
      status: 'Warning',
      ipAddress: 'System',
      location: 'Mumbai',
      impact: 'Medium'
    },
    {
      id: 'AUD-2024-018',
      timestamp: '2024-06-30 20:15:42',
      user: 'Vikram Singh',
      role: 'Database Administrator',
      action: 'Performance Tuning',
      category: 'Database',
      resource: 'Database Server Primary',
      resourceId: 'CI-COMP-DEDICATED-XL-MUM-002',
      details: 'Applied performance tuning to resolve high CPU utilization',
      status: 'Success',
      ipAddress: '192.168.1.104',
      location: 'Mumbai',
      impact: 'Medium'
    },
    {
      id: 'AUD-2024-019',
      timestamp: '2024-06-30 20:45:18',
      user: 'Anita Gupta',
      role: 'Network Administrator',
      action: 'Traffic Analysis',
      category: 'Network',
      resource: 'WAN Monitoring Service',
      resourceId: 'CI-MON-NET-WAN-CHE-001',
      details: 'Analyzed network traffic patterns between Mumbai and Chennai',
      status: 'Success',
      ipAddress: '192.168.2.102',
      location: 'Chennai',
      impact: 'Low'
    },
    {
      id: 'AUD-2024-020',
      timestamp: '2024-06-30 21:00:33',
      user: 'Security Scanner',
      role: 'System',
      action: 'Security Scan',
      category: 'Security',
      resource: 'Threat Intelligence Feed',
      resourceId: 'CI-SEC-TI-FEED-MUM-001',
      details: 'Automated security scan completed - no threats detected',
      status: 'Success',
      ipAddress: 'System',
      location: 'Mumbai',
      impact: 'Low'
    }
  ]

  const filteredAuditTrail = auditTrail.filter(entry => {
    const matchesSearch = entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.details.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAction = selectedAction === 'all' || entry.action === selectedAction
    const matchesUser = selectedUser === 'all' || entry.user === selectedUser
    const matchesDate = selectedDate === 'all' || entry.timestamp.startsWith(selectedDate)
    
    return matchesSearch && matchesAction && matchesUser && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800'
      case 'Warning': return 'bg-yellow-100 text-yellow-800'
      case 'Error': return 'bg-red-100 text-red-800'
      case 'Info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Compute': return <Server className="h-4 w-4" />
      case 'Network': return <Network className="h-4 w-4" />
      case 'Security': return <Shield className="h-4 w-4" />
      case 'Storage': return <HardDrive className="h-4 w-4" />
      case 'Database': return <Database className="h-4 w-4" />
      case 'Monitoring': return <Activity className="h-4 w-4" />
      case 'Backup': return <Archive className="h-4 w-4" />
      case 'Billing': return <DollarSign className="h-4 w-4" />
      case 'Compliance': return <CheckCircle className="h-4 w-4" />
      case 'Operating System': return <Settings className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'Resource Created': return <Plus className="h-4 w-4" />
      case 'Configuration Modified': return <Edit className="h-4 w-4" />
      case 'Resource Deleted': return <Trash2 className="h-4 w-4" />
      case 'Resource Scaled': return <RefreshCw className="h-4 w-4" />
      case 'Security Policy Applied': return <Shield className="h-4 w-4" />
      case 'Backup Configured': return <Archive className="h-4 w-4" />
      case 'Monitoring Enabled': return <Activity className="h-4 w-4" />
      case 'Alert Generated': return <AlertCircle className="h-4 w-4" />
      case 'Payment Model Changed': return <DollarSign className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const uniqueActions = [...new Set(auditTrail.map(entry => entry.action))]
  const uniqueUsers = [...new Set(auditTrail.map(entry => entry.user))]

  const totalActions = filteredAuditTrail.length
  const successfulActions = filteredAuditTrail.filter(entry => entry.status === 'Success').length
  const highImpactActions = filteredAuditTrail.filter(entry => entry.impact === 'High').length

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
                <h1 className="text-2xl font-bold text-white">Audit Trail</h1>
                <p className="text-blue-100">Complete activity log for Max Healthcare account</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Audit Log
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
                  <p className="text-sm font-medium text-gray-600">Total Actions</p>
                  <p className="text-3xl font-bold text-sify-blue">{totalActions}</p>
                </div>
                <Activity className="h-8 w-8 text-sify-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Successful</p>
                  <p className="text-3xl font-bold text-green-600">{successfulActions}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">High Impact</p>
                  <p className="text-3xl font-bold text-sify-orange">{highImpactActions}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-sify-orange" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="sify-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today</p>
                  <p className="text-3xl font-bold text-sify-blue">{filteredAuditTrail.filter(e => e.timestamp.startsWith('2024-06-30')).length}</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Audit Trail</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by user, action, resource..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
                <Select value={selectedAction} onValueChange={setSelectedAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    {uniqueActions.map(action => (
                      <SelectItem key={action} value={action}>{action}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Users" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    {uniqueUsers.map(user => (
                      <SelectItem key={user} value={user}>{user}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="2024-06-30">Today</SelectItem>
                    <SelectItem value="2024-06-29">Yesterday</SelectItem>
                    <SelectItem value="2024-06">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Trail List */}
        <div className="space-y-3">
          {filteredAuditTrail.map((entry) => (
            <Card key={entry.id} className="sify-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-sify-blue/10 rounded-full flex items-center justify-center">
                        {getActionIcon(entry.action)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-sify-blue">{entry.action}</h3>
                        <Badge className={getStatusColor(entry.status)}>{entry.status}</Badge>
                        <Badge className={getImpactColor(entry.impact)}>{entry.impact} Impact</Badge>
                        <div className="flex items-center space-x-1 text-gray-500">
                          {getCategoryIcon(entry.category)}
                          <span className="text-sm">{entry.category}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{entry.details}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Resource:</span>
                          <p className="font-medium">{entry.resource}</p>
                          <p className="text-xs text-gray-400 font-mono">{entry.resourceId}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">User:</span>
                          <p className="font-medium">{entry.user}</p>
                          <p className="text-xs text-gray-400">{entry.role}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <p className="font-medium">{entry.location}</p>
                          <p className="text-xs text-gray-400">{entry.ipAddress}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Timestamp:</span>
                          <p className="font-medium">{entry.timestamp.split(' ')[1]}</p>
                          <p className="text-xs text-gray-400">{entry.timestamp.split(' ')[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAuditTrail.length === 0 && (
          <Card className="sify-card">
            <CardContent className="p-12 text-center">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No audit entries found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AuditTrailPage

