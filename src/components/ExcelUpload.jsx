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
  Play
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useApp } from '../context/AppContext'

const ExcelUpload = () => {
  const navigate = useNavigate()
  const { currentCustomer, demoMode, addNotification } = useApp()
  
  const [uploadState, setUploadState] = useState('ready') // ready, processing, completed
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState(null)

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
            requirement: 'Web Server Cluster',
            sku: 'CI-COMP-SHARED-M-MUM',
            quantity: 2,
            status: 'matched',
            monthlyRate: 4500,
            description: '2 vCPU, 4GB RAM, Mumbai'
          },
          {
            requirement: 'Database Server',
            sku: 'CI-DB-MYSQL-M-MUM',
            quantity: 1,
            status: 'matched',
            monthlyRate: 12000,
            description: '4 vCPU, 8GB RAM, MySQL 8.0'
          },
          {
            requirement: 'Load Balancer',
            sku: 'CI-NET-LB-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            monthlyRate: 3500,
            description: 'Application Load Balancer'
          },
          {
            requirement: 'Block Storage',
            sku: 'CI-STOR-BLOCK-1TB-MUM',
            quantity: 3,
            status: 'matched',
            monthlyRate: 6500,
            description: '1TB SSD Block Storage'
          },
          {
            requirement: 'Backup Storage',
            sku: 'CI-STOR-BACKUP-100GB-MUM',
            quantity: 2,
            status: 'matched',
            monthlyRate: 800,
            description: '100GB Backup Storage'
          },
          {
            requirement: 'CDN Service',
            sku: 'CI-NET-CDN-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            monthlyRate: 2500,
            description: 'Content Delivery Network'
          },
          {
            requirement: 'SSL Certificate',
            sku: 'CI-SEC-SSL-WILDCARD-MUM',
            quantity: 1,
            status: 'matched',
            monthlyRate: 1200,
            description: 'Wildcard SSL Certificate'
          },
          {
            requirement: 'Monitoring Service',
            sku: 'CI-MON-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            monthlyRate: 1500,
            description: 'Basic Infrastructure Monitoring'
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
            requirement: 'Web Server Cluster',
            sku: 'CI-COMP-SHARED-M-MUM',
            quantity: 2,
            status: 'matched',
            monthlyRate: 4500,
            description: '2 vCPU, 4GB RAM, Mumbai'
          },
          {
            requirement: 'Database Server',
            sku: 'CI-DB-MYSQL-M-MUM',
            quantity: 1,
            status: 'matched',
            monthlyRate: 12000,
            description: '4 vCPU, 8GB RAM, MySQL 8.0'
          },
          {
            requirement: 'Load Balancer',
            sku: 'CI-NET-LB-BASIC-MUM',
            quantity: 1,
            status: 'matched',
            monthlyRate: 3500,
            description: 'Application Load Balancer'
          },
          {
            requirement: 'Quantum Computing Module',
            sku: null,
            quantity: 1,
            status: 'custom',
            description: 'Specialized quantum computing capability for research workloads',
            estimatedRate: 25000,
            customNote: 'Requires Solution Architect and Product Manager review'
          },
          {
            requirement: 'AI/ML Training Platform',
            sku: null,
            quantity: 1,
            status: 'custom',
            description: 'Custom AI training environment with specialized GPUs and ML frameworks',
            estimatedRate: 18000,
            customNote: 'Custom GPU cluster with TensorFlow/PyTorch optimization'
          },
          {
            requirement: 'Blockchain Infrastructure',
            sku: null,
            quantity: 1,
            status: 'custom',
            description: 'Private blockchain network with consensus mechanisms',
            estimatedRate: 15000,
            customNote: 'Custom blockchain deployment with smart contract support'
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

  const proceedToQuote = () => {
    navigate('/quote', { state: { analysisResults } })
  }

  const resetProcess = () => {
    setUploadState('ready')
    setUploadProgress(0)
    setAnalysisResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              </CardContent>
            </Card>

            {/* Flow Type Indicator */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {analysisResults.flowType === 'standard' ? (
                      <>
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Zap className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Standard Flow</h3>
                          <p className="text-gray-600">All requirements match existing SKUs</p>
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
                        </div>
                      </>
                    )}
                  </div>
                  <Badge 
                    variant={analysisResults.flowType === 'standard' ? 'default' : 'secondary'}
                    className={analysisResults.flowType === 'standard' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                  >
                    {analysisResults.processingTime}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Items List */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Requirements Breakdown</CardTitle>
                <CardDescription>Detailed analysis of each requirement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResults.items.map((item, index) => (
                    <div key={index} className="p-4 bg-white/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            item.status === 'matched' ? 'bg-green-500' : 'bg-orange-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-900">{item.requirement}</p>
                            {item.sku ? (
                              <p className="text-sm text-gray-600">{item.sku}</p>
                            ) : (
                              <p className="text-sm text-orange-600">Custom solution required</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Qty: {item.quantity}</p>
                          <p className="text-sm text-gray-600">
                            ₹{((item.monthlyRate || item.estimatedRate) / 1000).toFixed(1)}K/month
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 ml-6">{item.description}</p>
                      {item.customNote && (
                        <p className="text-sm text-orange-600 ml-6 mt-1 italic">{item.customNote}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={resetProcess}
                className="bg-white/50"
              >
                Process Another File
              </Button>
              <Button 
                onClick={proceedToQuote}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Generate Quote
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExcelUpload

