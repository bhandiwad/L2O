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
  Edit,
  Save,
  X,
  Eye,
  EyeOff,
  FileText,
  Mail,
  Calendar,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useApp } from '../context/AppContext'
import { expandedSkuData } from '../data/expandedSkuData'

const ExcelUpload = () => {
  const navigate = useNavigate()
  const { currentCustomer, demoMode, addNotification } = useApp()
  
  const [uploadState, setUploadState] = useState('ready') // ready, processing, completed, editing, proposal
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [editingItem, setEditingItem] = useState(null)
  const [showLegacyMapping, setShowLegacyMapping] = useState({})
  const [financeApprovalNeeded, setFinanceApprovalNeeded] = useState(false)

  // Mock Excel file analysis with realistic enterprise data
  const processRequirements = useCallback(() => {
    setUploadState('processing')
    setUploadProgress(0)

    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    setTimeout(() => {
      const mockResults = {
        flowType: 'standard',
        totalItems: 12,
        knownSkus: 12,
        unknownSkus: 0,
        totalMonthlyCost: 285000,
        totalAnnualCost: 3420000,
        items: [
          {
            id: 1,
            name: 'Web Application Servers',
            category: 'Compute',
            location: 'Mumbai',
            sku: 'CI-COMP-SHARED-L-MUM',
            legacySku: 'CI-COMP-VPI-L',
            quantity: 4,
            vcpu: 8,
            ram: 32,
            storage: 500,
            monthlyRate: 12000,
            floorPrice: 10000,
            paymentModel: 'PAYG',
            riSavings: 2400,
            status: 'active'
          },
          {
            id: 2,
            name: 'Database Servers',
            category: 'Compute',
            location: 'Mumbai',
            sku: 'CI-COMP-DEDICATED-XL-MUM',
            legacySku: 'CI-COMP-VPE-XL',
            quantity: 2,
            vcpu: 16,
            ram: 128,
            storage: 2000,
            monthlyRate: 45000,
            floorPrice: 40000,
            paymentModel: 'PAYG',
            riSavings: 9000,
            status: 'active'
          },
          {
            id: 3,
            name: 'Load Balancer',
            category: 'Network',
            location: 'Mumbai',
            sku: 'CI-NET-LB-ADVANCED-MUM',
            legacySku: 'CI-NET-LB-ADV',
            quantity: 2,
            bandwidth: '10 Gbps',
            monthlyRate: 8500,
            floorPrice: 7000,
            paymentModel: 'PAYG',
            riSavings: 1700,
            status: 'active'
          },
          {
            id: 4,
            name: 'Firewall Security',
            category: 'Security',
            location: 'Mumbai',
            sku: 'CI-SEC-FW-ENTERPRISE-MUM',
            legacySku: 'CI-SEC-FW-ENT',
            quantity: 1,
            throughput: '5 Gbps',
            monthlyRate: 15000,
            floorPrice: 12000,
            paymentModel: 'PAYG',
            riSavings: 3000,
            status: 'active'
          },
          {
            id: 5,
            name: 'Block Storage',
            category: 'Storage',
            location: 'Mumbai',
            sku: 'CI-STOR-BLOCK-5TB-MUM',
            legacySku: 'CI-STOR-BLOCK-5TB',
            quantity: 1,
            capacity: '5TB',
            iops: 10000,
            monthlyRate: 25000,
            floorPrice: 20000,
            paymentModel: 'PAYG',
            riSavings: 5000,
            status: 'active'
          },
          {
            id: 6,
            name: 'Managed Database',
            category: 'Database',
            location: 'Mumbai',
            sku: 'CI-DB-MYSQL-L-MUM',
            legacySku: 'CI-DB-MYSQL-L',
            quantity: 1,
            vcpu: 8,
            ram: 64,
            storage: 1000,
            monthlyRate: 18000,
            floorPrice: 15000,
            paymentModel: 'PAYG',
            riSavings: 3600,
            status: 'active'
          }
        ]
      }
      
      setAnalysisResults(mockResults)
      setUploadState('completed')
      addNotification('Requirements processed successfully', 'success')
    }, 3000)
  }, [demoMode, addNotification])

  const handleEdit = (item) => {
    setEditingItem({ ...item })
  }

  const handleSaveEdit = () => {
    if (!editingItem) return

    // Check if price is below floor price
    if (editingItem.monthlyRate < editingItem.floorPrice) {
      setFinanceApprovalNeeded(true)
      addNotification('Price below floor price - Finance approval required', 'warning')
      return
    }

    // Update the item in results
    const updatedItems = analysisResults.items.map(item => 
      item.id === editingItem.id ? editingItem : item
    )
    
    setAnalysisResults({
      ...analysisResults,
      items: updatedItems,
      totalMonthlyCost: updatedItems.reduce((sum, item) => sum + item.monthlyRate, 0)
    })
    
    setEditingItem(null)
    addNotification('Resource updated successfully', 'success')
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
  }

  const toggleLegacyMapping = (itemId) => {
    setShowLegacyMapping(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const proceedToProposal = () => {
    setUploadState('proposal')
  }

  const generatePDF = () => {
    addNotification('PDF proposal generated successfully', 'success')
  }

  const sendEmail = () => {
    addNotification('Proposal sent via email', 'success')
  }

  if (uploadState === 'proposal') {
    return (
      <div className="min-h-screen sify-bg-gradient">
        <div className="sify-header px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => setUploadState('completed')} 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Requirements
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-white">Professional Proposal</h1>
                  <p className="text-blue-100">Bill of Quantities - {currentCustomer.name}</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button onClick={generatePDF} className="sify-btn-secondary">
                  <FileText className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button onClick={sendEmail} className="sify-btn-primary">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Proposal */}
            <div className="lg:col-span-2">
              <Card className="sify-card">
                <CardHeader className="sify-card-header">
                  <CardTitle className="sify-text-primary">Bill of Quantities</CardTitle>
                  <CardDescription>Comprehensive cost breakdown and technical specifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Executive Summary */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-lg sify-text-primary mb-3">Executive Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Monthly Cost</p>
                        <p className="text-2xl font-bold sify-text-primary">₹{(analysisResults?.totalMonthlyCost / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Annual Cost</p>
                        <p className="text-2xl font-bold sify-text-secondary">₹{((analysisResults?.totalMonthlyCost * 12) / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div>
                    <h3 className="font-semibold text-lg sify-text-primary mb-4">Detailed Resource Breakdown</h3>
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
                          {analysisResults?.items.map((item) => (
                            <tr key={item.id} className="border-t">
                              <td className="p-3">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">{item.category} • {item.location}</p>
                                </div>
                              </td>
                              <td className="p-3">
                                <Badge className="sify-badge-primary">{item.sku}</Badge>
                              </td>
                              <td className="p-3">
                                <div className="text-sm">
                                  {item.vcpu && <p>vCPU: {item.vcpu}</p>}
                                  {item.ram && <p>RAM: {item.ram}GB</p>}
                                  {item.storage && <p>Storage: {item.storage}GB</p>}
                                  {item.bandwidth && <p>Bandwidth: {item.bandwidth}</p>}
                                  {item.capacity && <p>Capacity: {item.capacity}</p>}
                                </div>
                              </td>
                              <td className="p-3 text-right font-medium">₹{item.monthlyRate.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 font-bold">
                            <td colSpan="3" className="p-3">Total Monthly Cost</td>
                            <td className="p-3 text-right text-lg sify-text-primary">₹{analysisResults?.totalMonthlyCost.toLocaleString()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Cost Projections */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-lg sify-text-primary mb-4">Cost Projections</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="sify-card">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-gray-600">1 Year Total</p>
                          <p className="text-xl font-bold sify-text-primary">₹{((analysisResults?.totalMonthlyCost * 12) / 100000).toFixed(1)}L</p>
                        </CardContent>
                      </Card>
                      <Card className="sify-card">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-gray-600">3 Year Total</p>
                          <p className="text-xl font-bold sify-text-secondary">₹{((analysisResults?.totalMonthlyCost * 36) / 100000).toFixed(1)}L</p>
                        </CardContent>
                      </Card>
                      <Card className="sify-card">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-gray-600">RI Savings (3Y)</p>
                          <p className="text-xl font-bold text-green-600">₹{((analysisResults?.totalMonthlyCost * 0.3 * 36) / 100000).toFixed(1)}L</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Timeline */}
              <Card className="sify-card">
                <CardHeader className="sify-card-header">
                  <CardTitle className="sify-text-primary flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Implementation Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Week 1-2</p>
                      <p className="text-sm text-gray-600">Infrastructure Setup</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Week 3-4</p>
                      <p className="text-sm text-gray-600">Application Deployment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Week 5-6</p>
                      <p className="text-sm text-gray-600">Testing & Go-Live</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms */}
              <Card className="sify-card">
                <CardHeader className="sify-card-header">
                  <CardTitle className="sify-text-primary">Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p>• 99.9% SLA guarantee</p>
                  <p>• 24/7 technical support</p>
                  <p>• Monthly billing cycle</p>
                  <p>• 30-day notice for changes</p>
                  <p>• Reserved Instance discounts available</p>
                </CardContent>
              </Card>
            </div>
          </div>
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
                <h1 className="text-2xl font-bold text-white">Excel Upload</h1>
                <p className="text-blue-100">Standard requirements processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {uploadState === 'ready' && (
          <Card className="sify-card max-w-2xl mx-auto">
            <CardHeader className="sify-card-header text-center">
              <div className="w-16 h-16 sify-bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileSpreadsheet className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="sify-text-primary">Upload Requirements</CardTitle>
              <CardDescription>
                Upload your Excel file with infrastructure requirements for automated processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed sify-border-primary rounded-lg p-8 text-center">
                <FileSpreadsheet className="w-12 h-12 sify-text-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Drop your Excel file here</p>
                <p className="text-gray-500 mb-4">or click to browse</p>
                <Button className="sify-btn-primary">
                  Choose File
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-4">For demo purposes, click below to process sample requirements</p>
                <Button 
                  onClick={processRequirements}
                  className="sify-btn-secondary"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Process Sample Requirements
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {uploadState === 'processing' && (
          <Card className="sify-card max-w-2xl mx-auto">
            <CardHeader className="sify-card-header text-center">
              <div className="w-16 h-16 sify-bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white animate-spin" />
              </div>
              <CardTitle className="sify-text-primary">Processing Requirements</CardTitle>
              <CardDescription>
                Analyzing your requirements and matching with our SKU catalog
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="sify-progress" />
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Excel file parsed successfully</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Requirements extracted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 sify-text-primary animate-pulse" />
                  <span>Matching SKUs and calculating costs...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {uploadState === 'completed' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="sify-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Items</p>
                      <p className="text-2xl font-bold sify-text-primary">{analysisResults?.totalItems}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="sify-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Cost</p>
                      <p className="text-2xl font-bold sify-text-secondary">₹{(analysisResults?.totalMonthlyCost / 1000).toFixed(0)}K</p>
                    </div>
                    <DollarSign className="w-8 h-8 sify-text-secondary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="sify-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Annual Cost</p>
                      <p className="text-2xl font-bold sify-text-primary">₹{((analysisResults?.totalMonthlyCost * 12) / 100000).toFixed(1)}L</p>
                    </div>
                    <TrendingUp className="w-8 h-8 sify-text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="sify-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">RI Savings</p>
                      <p className="text-2xl font-bold text-green-600">30%</p>
                    </div>
                    <Zap className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Requirements Table */}
            <Card className="sify-card">
              <CardHeader className="sify-card-header">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="sify-text-primary">Processed Requirements</CardTitle>
                    <CardDescription>Review and edit resource specifications and pricing</CardDescription>
                  </div>
                  <Button 
                    onClick={proceedToProposal}
                    className="sify-btn-primary"
                  >
                    Generate Proposal
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full sify-table">
                    <thead>
                      <tr>
                        <th className="text-left p-3">Resource</th>
                        <th className="text-left p-3">SKU</th>
                        <th className="text-left p-3">Specifications</th>
                        <th className="text-right p-3">Monthly Cost</th>
                        <th className="text-center p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisResults?.items.map((item) => (
                        <tr key={item.id} className="border-t">
                          <td className="p-3">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.category} • {item.location}</p>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-2">
                              <Badge className="sify-badge-primary">{item.sku}</Badge>
                              <div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleLegacyMapping(item.id)}
                                  className="text-xs"
                                >
                                  {showLegacyMapping[item.id] ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                                  Legacy SKU
                                </Button>
                                {showLegacyMapping[item.id] && (
                                  <Badge variant="outline" className="block mt-1">{item.legacySku}</Badge>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            {editingItem?.id === item.id ? (
                              <div className="space-y-2">
                                {item.vcpu && (
                                  <div className="flex items-center space-x-2">
                                    <Label className="text-xs w-12">vCPU:</Label>
                                    <Input
                                      type="number"
                                      value={editingItem.vcpu}
                                      onChange={(e) => setEditingItem({...editingItem, vcpu: parseInt(e.target.value)})}
                                      className="w-16 h-6 text-xs"
                                    />
                                  </div>
                                )}
                                {item.ram && (
                                  <div className="flex items-center space-x-2">
                                    <Label className="text-xs w-12">RAM:</Label>
                                    <Input
                                      type="number"
                                      value={editingItem.ram}
                                      onChange={(e) => setEditingItem({...editingItem, ram: parseInt(e.target.value)})}
                                      className="w-16 h-6 text-xs"
                                    />
                                    <span className="text-xs">GB</span>
                                  </div>
                                )}
                                {item.storage && (
                                  <div className="flex items-center space-x-2">
                                    <Label className="text-xs w-12">Storage:</Label>
                                    <Input
                                      type="number"
                                      value={editingItem.storage}
                                      onChange={(e) => setEditingItem({...editingItem, storage: parseInt(e.target.value)})}
                                      className="w-16 h-6 text-xs"
                                    />
                                    <span className="text-xs">GB</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="text-sm">
                                {item.vcpu && <p>vCPU: {item.vcpu}</p>}
                                {item.ram && <p>RAM: {item.ram}GB</p>}
                                {item.storage && <p>Storage: {item.storage}GB</p>}
                                {item.bandwidth && <p>Bandwidth: {item.bandwidth}</p>}
                                {item.capacity && <p>Capacity: {item.capacity}</p>}
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {editingItem?.id === item.id ? (
                              <div className="space-y-2">
                                <Input
                                  type="number"
                                  value={editingItem.monthlyRate}
                                  onChange={(e) => setEditingItem({...editingItem, monthlyRate: parseInt(e.target.value)})}
                                  className="w-24 h-8 text-sm"
                                />
                                <p className="text-xs text-gray-500">Floor: ₹{item.floorPrice}</p>
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium">₹{item.monthlyRate.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">Floor: ₹{item.floorPrice.toLocaleString()}</p>
                              </div>
                            )}
                          </td>
                          <td className="p-3 text-center">
                            {editingItem?.id === item.id ? (
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  onClick={handleSaveEdit}
                                  className="sify-btn-primary h-8 w-8 p-0"
                                >
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancelEdit}
                                  className="h-8 w-8 p-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(item)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {financeApprovalNeeded && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <p className="font-medium text-yellow-800">Finance Approval Required</p>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      One or more items are priced below floor price. Finance administrator approval is required before proceeding.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExcelUpload

