import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FileSpreadsheet, 
  CheckCircle, 
  AlertTriangle, 
  ArrowLeft, 
  Download,
  Sparkles,
  Zap,
  Clock,
  DollarSign,
  Play,
  Edit3,
  Save,
  X,
  AlertCircle,
  Users,
  TrendingUp,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useApp } from '../context/AppContext'
import { SKU_CATALOG, PAYMENT_MODELS } from '../data/skuData'
import EnhancedProposalGeneration from './EnhancedProposalGeneration'

const EnhancedExcelUpload = () => {
  const navigate = useNavigate()
  const { currentCustomer, demoMode, addNotification, currentUser } = useApp()
  
  const [uploadState, setUploadState] = useState('ready') // ready, processing, completed
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [approvalRequired, setApprovalRequired] = useState(false)
  const [belowFloorItems, setBelowFloorItems] = useState([])
  const [showProposal, setShowProposal] = useState(false)

  // Mock Excel file analysis based on demo mode
  const processRequirements = useCallback(() => {
    setUploadState('processing')
    setUploadProgress(0)

    // Simulate processing progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate processing time and generate results
    setTimeout(() => {
      const mockResults = demoMode === 'standard' ? {
        flowType: 'standard',
        totalItems: 8,
        knownSkus: 8,
        unknownRequirements: 0,
        estimatedCost: 45600,
        processingTime: '2-3 minutes',
        items: [
          {
            id: 'item-001',
            requirement: 'Web Server Cluster',
            sku: 'CI-COMP-SHARED-M-MUM',
            quantity: 2,
            status: 'matched',
            specifications: {
              vcpu: 4,
              memory: 8,
              storage: 100,
              network: '2 Gbps'
            },
            pricing: {
              PAYG: { monthly: 4500, hourly: 6.25 },
              RI1Y: { monthly: 3600, hourly: 5.00 },
              RI3Y: { monthly: 2700, hourly: 3.75 }
            },
            floorPrice: 2200,
            askPrice: 4500,
            paymentModel: 'PAYG',
            description: 'Medium shared compute instance for production workloads',
            isEditable: true
          },
          {
            id: 'item-002',
            requirement: 'Database Server',
            sku: 'CI-DB-MYSQL-M-MUM',
            quantity: 1,
            status: 'matched',
            specifications: {
              vcpu: 4,
              memory: 16,
              storage: 200,
              engine: 'MySQL 8.0'
            },
            pricing: {
              PAYG: { monthly: 12000, hourly: 16.67 },
              RI1Y: { monthly: 9600, hourly: 13.33 },
              RI3Y: { monthly: 7200, hourly: 10.00 }
            },
            floorPrice: 6000,
            askPrice: 12000,
            paymentModel: 'PAYG',
            description: 'Managed MySQL database with automated backups',
            isEditable: true
          },
          {
            id: 'item-003',
            requirement: 'Load Balancer',
            sku: 'CI-NET-LB-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            specifications: {
              type: 'Application Load Balancer',
              throughput: '1 Gbps',
              ssl: 'Included'
            },
            pricing: {
              PAYG: { monthly: 3500, hourly: 4.86 },
              RI1Y: { monthly: 2800, hourly: 3.89 },
              RI3Y: { monthly: 2100, hourly: 2.92 }
            },
            floorPrice: 1800,
            askPrice: 3500,
            paymentModel: 'PAYG',
            description: 'Basic application load balancer with SSL termination',
            isEditable: true
          },
          {
            id: 'item-004',
            requirement: 'Block Storage',
            sku: 'CI-STOR-BLOCK-1TB-MUM',
            quantity: 3,
            status: 'matched',
            specifications: {
              capacity: '1 TB',
              type: 'SSD',
              iops: '10000'
            },
            pricing: {
              PAYG: { monthly: 6500, hourly: 9.03 },
              RI1Y: { monthly: 5200, hourly: 7.22 },
              RI3Y: { monthly: 3900, hourly: 5.42 }
            },
            floorPrice: 3200,
            askPrice: 6500,
            paymentModel: 'PAYG',
            description: 'Enterprise-grade 1TB SSD block storage',
            isEditable: true
          },
          {
            id: 'item-005',
            requirement: 'Backup Storage',
            sku: 'CI-STOR-BACKUP-100GB-MUM',
            quantity: 2,
            status: 'matched',
            specifications: {
              capacity: '100 GB',
              type: 'Standard',
              retention: '30 days'
            },
            pricing: {
              PAYG: { monthly: 800, hourly: 1.11 },
              RI1Y: { monthly: 640, hourly: 0.89 },
              RI3Y: { monthly: 480, hourly: 0.67 }
            },
            floorPrice: 400,
            askPrice: 800,
            paymentModel: 'PAYG',
            description: 'Automated backup storage with 30-day retention',
            isEditable: true
          },
          {
            id: 'item-006',
            requirement: 'CDN Service',
            sku: 'CI-NET-CDN-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            specifications: {
              bandwidth: '1 TB/month',
              locations: '10 PoPs',
              ssl: 'Included'
            },
            pricing: {
              PAYG: { monthly: 2500, hourly: 3.47 },
              RI1Y: { monthly: 2000, hourly: 2.78 },
              RI3Y: { monthly: 1500, hourly: 2.08 }
            },
            floorPrice: 1200,
            askPrice: 2500,
            paymentModel: 'PAYG',
            description: 'Content delivery network with global PoPs',
            isEditable: true
          },
          {
            id: 'item-007',
            requirement: 'SSL Certificate',
            sku: 'CI-SEC-SSL-WILDCARD-MUM',
            quantity: 1,
            status: 'matched',
            specifications: {
              type: 'Wildcard',
              validation: 'Domain Validated',
              warranty: '$1M'
            },
            pricing: {
              PAYG: { monthly: 1200, hourly: 1.67 },
              RI1Y: { monthly: 960, hourly: 1.33 },
              RI3Y: { monthly: 720, hourly: 1.00 }
            },
            floorPrice: 600,
            askPrice: 1200,
            paymentModel: 'PAYG',
            description: 'Wildcard SSL certificate with domain validation',
            isEditable: true
          },
          {
            id: 'item-008',
            requirement: 'Monitoring Service',
            sku: 'CI-MON-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            specifications: {
              metrics: 'Basic',
              retention: '30 days',
              alerts: 'Email/SMS'
            },
            pricing: {
              PAYG: { monthly: 1500, hourly: 2.08 },
              RI1Y: { monthly: 1200, hourly: 1.67 },
              RI3Y: { monthly: 900, hourly: 1.25 }
            },
            floorPrice: 750,
            askPrice: 1500,
            paymentModel: 'PAYG',
            description: 'Basic infrastructure monitoring with alerts',
            isEditable: true
          }
        ]
      } : {
        flowType: 'custom',
        totalItems: 6,
        knownSkus: 3,
        unknownRequirements: 3,
        estimatedCost: 67400,
        processingTime: '5-7 business days',
        items: [
          {
            id: 'item-001',
            requirement: 'Web Server Cluster',
            sku: 'CI-COMP-SHARED-M-MUM',
            quantity: 2,
            status: 'matched',
            specifications: {
              vcpu: 4,
              memory: 8,
              storage: 100
            },
            pricing: {
              PAYG: { monthly: 4500, hourly: 6.25 },
              RI1Y: { monthly: 3600, hourly: 5.00 },
              RI3Y: { monthly: 2700, hourly: 3.75 }
            },
            floorPrice: 2200,
            askPrice: 4500,
            paymentModel: 'PAYG',
            description: 'Medium shared compute instance for production workloads',
            isEditable: true
          },
          {
            id: 'item-002',
            requirement: 'Database Server',
            sku: 'CI-DB-MYSQL-M-MUM',
            quantity: 1,
            status: 'matched',
            specifications: {
              vcpu: 4,
              memory: 16,
              storage: 200
            },
            pricing: {
              PAYG: { monthly: 12000, hourly: 16.67 },
              RI1Y: { monthly: 9600, hourly: 13.33 },
              RI3Y: { monthly: 7200, hourly: 10.00 }
            },
            floorPrice: 6000,
            askPrice: 12000,
            paymentModel: 'PAYG',
            description: 'Managed MySQL database with automated backups',
            isEditable: true
          },
          {
            id: 'item-003',
            requirement: 'Load Balancer',
            sku: 'CI-NET-LB-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            specifications: {
              type: 'Application Load Balancer',
              throughput: '1 Gbps'
            },
            pricing: {
              PAYG: { monthly: 3500, hourly: 4.86 },
              RI1Y: { monthly: 2800, hourly: 3.89 },
              RI3Y: { monthly: 2100, hourly: 2.92 }
            },
            floorPrice: 1800,
            askPrice: 3500,
            paymentModel: 'PAYG',
            description: 'Basic application load balancer with SSL termination',
            isEditable: true
          },
          {
            id: 'item-004',
            requirement: 'Quantum Computing Module',
            sku: null,
            quantity: 1,
            status: 'custom',
            description: 'Specialized quantum computing capability for research workloads',
            estimatedRate: 25000,
            customNote: 'Requires Solution Architect and Product Manager review',
            isEditable: false,
            needsApproval: true,
            approvalFlow: ['SA', 'PM']
          },
          {
            id: 'item-005',
            requirement: 'AI/ML Training Platform',
            sku: null,
            quantity: 1,
            status: 'custom',
            description: 'Custom AI training environment with specialized GPUs and ML frameworks',
            estimatedRate: 18000,
            customNote: 'Custom GPU cluster with TensorFlow/PyTorch optimization',
            isEditable: false,
            needsApproval: true,
            approvalFlow: ['SA', 'PM']
          },
          {
            id: 'item-006',
            requirement: 'Blockchain Infrastructure',
            sku: null,
            quantity: 1,
            status: 'custom',
            description: 'Private blockchain network with consensus mechanisms',
            estimatedRate: 15000,
            customNote: 'Custom blockchain deployment with smart contract support',
            isEditable: false,
            needsApproval: true,
            approvalFlow: ['SA', 'PM']
          }
        ]
      }
      
      setAnalysisResults(mockResults)
      setUploadState('completed')
      
      addNotification({
        type: 'success',
        title: 'Requirements Processed',
        message: `Analyzed ${mockResults.totalItems} requirements successfully`
      })
    }, 3000)
  }, [demoMode, addNotification])

  const startEdit = (item) => {
    setEditingItem(item.id)
    setEditForm({
      vcpu: item.specifications.vcpu || '',
      memory: item.specifications.memory || '',
      storage: item.specifications.storage || '',
      quantity: item.quantity,
      askPrice: item.askPrice,
      paymentModel: item.paymentModel
    })
  }

  const cancelEdit = () => {
    setEditingItem(null)
    setEditForm({})
  }

  const calculatePricing = (basePrice, vcpu, memory, storage) => {
    // Simple pricing calculation based on resource changes
    const vcpuMultiplier = vcpu / 4 // Base is 4 vCPU
    const memoryMultiplier = memory / 8 // Base is 8 GB
    const storageMultiplier = storage / 100 // Base is 100 GB
    
    const avgMultiplier = (vcpuMultiplier + memoryMultiplier + storageMultiplier) / 3
    return Math.round(basePrice * avgMultiplier)
  }

  const saveEdit = () => {
    const updatedResults = { ...analysisResults }
    const itemIndex = updatedResults.items.findIndex(item => item.id === editingItem)
    
    if (itemIndex !== -1) {
      const item = updatedResults.items[itemIndex]
      const newPricing = calculatePricing(
        item.pricing.PAYG.monthly,
        editForm.vcpu,
        editForm.memory,
        editForm.storage
      )
      
      // Update specifications
      updatedResults.items[itemIndex] = {
        ...item,
        specifications: {
          ...item.specifications,
          vcpu: editForm.vcpu,
          memory: editForm.memory,
          storage: editForm.storage
        },
        quantity: editForm.quantity,
        askPrice: editForm.askPrice,
        paymentModel: editForm.paymentModel,
        pricing: {
          ...item.pricing,
          PAYG: { ...item.pricing.PAYG, monthly: newPricing },
          RI1Y: { ...item.pricing.RI1Y, monthly: Math.round(newPricing * 0.8) },
          RI3Y: { ...item.pricing.RI3Y, monthly: Math.round(newPricing * 0.6) }
        }
      }
      
      // Check if ask price is below floor price
      if (editForm.askPrice < item.floorPrice) {
        setBelowFloorItems(prev => [...prev, editingItem])
        setApprovalRequired(true)
        addNotification({
          type: 'warning',
          title: 'Finance Approval Required',
          message: `Ask price ₹${editForm.askPrice} is below floor price ₹${item.floorPrice}`
        })
      } else {
        setBelowFloorItems(prev => prev.filter(id => id !== editingItem))
        if (belowFloorItems.length === 1 && belowFloorItems[0] === editingItem) {
          setApprovalRequired(false)
        }
      }
      
      // Recalculate total cost
      const totalCost = updatedResults.items.reduce((sum, item) => {
        const price = item.askPrice || item.estimatedRate || item.pricing?.PAYG?.monthly || 0
        return sum + (price * item.quantity)
      }, 0)
      
      updatedResults.estimatedCost = totalCost
      setAnalysisResults(updatedResults)
    }
    
    setEditingItem(null)
    setEditForm({})
    
    addNotification({
      type: 'success',
      title: 'Resource Updated',
      message: 'Resource specifications and pricing updated successfully'
    })
  }

  const proceedToQuote = () => {
    if (approvalRequired) {
      addNotification({
        type: 'error',
        title: 'Approval Required',
        message: 'Cannot proceed to quote generation. Finance approval required for below-floor pricing.'
      })
      return
    }
    setShowProposal(true)
  }

  const requestFinanceApproval = () => {
    addNotification({
      type: 'info',
      title: 'Approval Request Sent',
      message: 'Finance approval request sent for below-floor pricing items'
    })
  }

  const resetProcess = () => {
    setUploadState('ready')
    setUploadProgress(0)
    setAnalysisResults(null)
    setEditingItem(null)
    setEditForm({})
    setApprovalRequired(false)
    setBelowFloorItems([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Sparkles className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Requirements Processing</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ready State */}
        {uploadState === 'ready' && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Process Requirements</h1>
              <p className="text-gray-600">
                Process infrastructure requirements for {currentCustomer.name}
              </p>
            </div>

            {/* Mock Excel File Display */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  <span>Requirements File Ready</span>
                </CardTitle>
                <CardDescription>
                  {demoMode === 'standard' 
                    ? 'Standard infrastructure requirements with known SKUs'
                    : 'Mixed requirements including custom solutions'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileSpreadsheet className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {demoMode === 'standard' 
                            ? 'Standard_Infrastructure_Requirements.xlsx'
                            : 'Custom_Infrastructure_Requirements.xlsx'
                          }
                        </p>
                        <p className="text-sm text-gray-600">
                          {demoMode === 'standard' ? '8 standard items' : '6 items (3 custom)'}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={demoMode === 'standard' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}
                    >
                      {demoMode === 'standard' ? 'Standard Flow' : 'Custom Flow'}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Web servers, databases, and networking components</p>
                    <p>• Storage and backup requirements</p>
                    {demoMode === 'custom' && (
                      <>
                        <p>• Quantum computing modules (custom)</p>
                        <p>• AI/ML training platforms (custom)</p>
                        <p>• Blockchain infrastructure (custom)</p>
                      </>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={processRequirements}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Process Requirements
                </Button>
              </CardContent>
            </Card>

            {/* Flow Information */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {demoMode === 'standard' ? (
                    <>
                      <div className="p-3 bg-green-100 rounded-lg">
                        <Zap className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Standard Flow</h3>
                        <p className="text-gray-600">All requirements match existing CI-* SKUs</p>
                        <p className="text-sm text-green-600 mt-1">Fast processing • Immediate quote generation</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Clock className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Custom Flow</h3>
                        <p className="text-gray-600">Some requirements need custom solutions</p>
                        <p className="text-sm text-orange-600 mt-1">SA/PM review required • Extended timeline</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Processing State */}
        {uploadState === 'processing' && (
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <FileSpreadsheet className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Processing Requirements...
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Analyzing requirements and matching against CI-* SKU catalog
                  </p>
                  <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                  <p className="text-sm text-gray-500 mt-2">{uploadProgress}% complete</p>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>✓ Parsing Excel file structure</p>
                  <p>✓ Validating requirement specifications</p>
                  <p>{uploadProgress > 50 ? '✓' : '○'} Matching against SKU catalog</p>
                  <p>{uploadProgress > 80 ? '✓' : '○'} Calculating pricing estimates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results State */}
        {uploadState === 'completed' && analysisResults && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analysis Complete</h1>
              <p className="text-gray-600">
                Requirements have been processed and analyzed
              </p>
            </div>

            {/* Summary Card */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Analysis Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white/50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{analysisResults.totalItems}</p>
                    <p className="text-sm text-gray-600">Total Items</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{analysisResults.knownSkus}</p>
                    <p className="text-sm text-gray-600">Known SKUs</p>
                  </div>
                  {analysisResults.unknownRequirements > 0 && (
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{analysisResults.unknownRequirements}</p>
                      <p className="text-sm text-gray-600">Custom Requirements</p>
                    </div>
                  )}
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">₹{(analysisResults.estimatedCost / 1000).toFixed(1)}K</p>
                    <p className="text-sm text-gray-600">Est. Monthly Cost</p>
                  </div>
                </div>

                {/* Approval Status */}
                {approvalRequired && (
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span className="font-medium text-orange-800">Finance Approval Required</span>
                    </div>
                    <p className="text-sm text-orange-700 mt-1">
                      Some items have ask prices below floor price. Finance approval required before proceeding.
                    </p>
                    <Button 
                      onClick={requestFinanceApproval}
                      size="sm"
                      className="mt-2 bg-orange-600 hover:bg-orange-700"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Request Finance Approval
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Items */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Resource Details</CardTitle>
                <CardDescription>
                  Review and edit resource specifications and pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResults.items.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge 
                            variant={item.status === 'matched' ? 'default' : 'secondary'}
                            className={item.status === 'matched' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                          >
                            {item.status === 'matched' ? 'Matched' : 'Custom'}
                          </Badge>
                          <h3 className="font-medium text-gray-900">{item.requirement}</h3>
                          {item.sku && (
                            <Badge variant="outline" className="text-xs">
                              {item.sku}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {belowFloorItems.includes(item.id) && (
                            <Badge variant="destructive" className="text-xs">
                              Below Floor
                            </Badge>
                          )}
                          {item.isEditable && editingItem !== item.id && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(item)}
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>

                      {editingItem === item.id ? (
                        // Edit Mode
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <Label htmlFor="vcpu">vCPU</Label>
                              <Input
                                id="vcpu"
                                type="number"
                                value={editForm.vcpu}
                                onChange={(e) => setEditForm(prev => ({ ...prev, vcpu: parseInt(e.target.value) }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="memory">Memory (GB)</Label>
                              <Input
                                id="memory"
                                type="number"
                                value={editForm.memory}
                                onChange={(e) => setEditForm(prev => ({ ...prev, memory: parseInt(e.target.value) }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="storage">Storage (GB)</Label>
                              <Input
                                id="storage"
                                type="number"
                                value={editForm.storage}
                                onChange={(e) => setEditForm(prev => ({ ...prev, storage: parseInt(e.target.value) }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="quantity">Quantity</Label>
                              <Input
                                id="quantity"
                                type="number"
                                value={editForm.quantity}
                                onChange={(e) => setEditForm(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="paymentModel">Payment Model</Label>
                              <Select 
                                value={editForm.paymentModel} 
                                onValueChange={(value) => setEditForm(prev => ({ ...prev, paymentModel: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PAYG">Pay As You Go</SelectItem>
                                  <SelectItem value="RI1Y">Reserved Instance 1 Year</SelectItem>
                                  <SelectItem value="RI3Y">Reserved Instance 3 Year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="askPrice">Ask Price (₹/month)</Label>
                              <Input
                                id="askPrice"
                                type="number"
                                value={editForm.askPrice}
                                onChange={(e) => setEditForm(prev => ({ ...prev, askPrice: parseInt(e.target.value) }))}
                              />
                              <p className="text-xs text-gray-500 mt-1">
                                Floor Price: ₹{item.floorPrice}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button onClick={saveEdit} size="sm">
                              <Save className="h-4 w-4 mr-1" />
                              Save Changes
                            </Button>
                            <Button onClick={cancelEdit} size="sm" variant="outline">
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="space-y-3">
                          <p className="text-sm text-gray-600">{item.description}</p>
                          
                          {item.specifications && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              {item.specifications.vcpu && (
                                <div>
                                  <span className="text-gray-500">vCPU:</span>
                                  <span className="ml-1 font-medium">{item.specifications.vcpu}</span>
                                </div>
                              )}
                              {item.specifications.memory && (
                                <div>
                                  <span className="text-gray-500">Memory:</span>
                                  <span className="ml-1 font-medium">{item.specifications.memory} GB</span>
                                </div>
                              )}
                              {item.specifications.storage && (
                                <div>
                                  <span className="text-gray-500">Storage:</span>
                                  <span className="ml-1 font-medium">{item.specifications.storage} GB</span>
                                </div>
                              )}
                              <div>
                                <span className="text-gray-500">Quantity:</span>
                                <span className="ml-1 font-medium">{item.quantity}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="text-sm">
                                <span className="text-gray-500">Payment Model:</span>
                                <span className="ml-1 font-medium">
                                  {PAYMENT_MODELS[item.paymentModel]?.name || item.paymentModel}
                                </span>
                              </div>
                              {item.pricing && (
                                <div className="text-sm">
                                  <span className="text-gray-500">Monthly Rate:</span>
                                  <span className="ml-1 font-medium text-blue-600">
                                    ₹{(item.askPrice || item.pricing[item.paymentModel]?.monthly || 0).toLocaleString()}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {item.estimatedRate && (
                              <div className="text-sm">
                                <span className="text-gray-500">Estimated Rate:</span>
                                <span className="ml-1 font-medium text-orange-600">
                                  ₹{item.estimatedRate.toLocaleString()}/month
                                </span>
                              </div>
                            )}
                          </div>

                          {item.customNote && (
                            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <p className="text-sm text-orange-800">{item.customNote}</p>
                              {item.approvalFlow && (
                                <div className="flex items-center space-x-2 mt-2">
                                  <span className="text-xs text-orange-600">Approval Flow:</span>
                                  {item.approvalFlow.map((role, index) => (
                                    <Badge key={role} variant="outline" className="text-xs">
                                      {role}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button 
                onClick={resetProcess}
                variant="outline"
              >
                Process New Requirements
              </Button>
              
              <div className="flex items-center space-x-3">
                {approvalRequired && (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm">Finance approval required</span>
                  </div>
                )}
                <Button 
                  onClick={proceedToQuote}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={approvalRequired}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Proposal Generation */}
      {showProposal && analysisResults && (
        <EnhancedProposalGeneration 
          requirements={analysisResults.items}
          onBack={() => setShowProposal(false)}
        />
      )}
    </div>
  )
}

export default EnhancedExcelUpload

