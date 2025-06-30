import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  Settings,
  Package,
  DollarSign,
  FileText,
  Send,
  MessageSquare,
  ChevronRight,
  Badge as BadgeIcon,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useApp } from '../context/AppContext'

const PERSONAS = {
  AM: {
    code: 'AM',
    name: 'Account Manager',
    fullName: 'Rajesh Kumar',
    role: 'Account Manager',
    color: 'blue',
    icon: User,
    permissions: ['view_requirements', 'edit_standard', 'submit_custom', 'generate_quote']
  },
  SA: {
    code: 'SA',
    name: 'Solution Architect',
    fullName: 'Priya Sharma',
    role: 'Solution Architect',
    color: 'purple',
    icon: Settings,
    permissions: ['review_custom', 'add_technical_details', 'approve_technical', 'send_to_pm']
  },
  PM: {
    code: 'PM',
    name: 'Product Manager',
    fullName: 'Amit Patel',
    role: 'Product Manager',
    color: 'green',
    icon: Package,
    permissions: ['standardize_sku', 'set_pricing', 'approve_product', 'send_to_sa']
  },
  FINANCE: {
    code: 'FINANCE',
    name: 'Finance Admin',
    fullName: 'Sunita Reddy',
    role: 'Finance Administrator',
    color: 'orange',
    icon: DollarSign,
    permissions: ['approve_pricing', 'set_floor_price', 'approve_below_floor']
  }
}

const WORKFLOW_STATES = {
  INITIAL: 'initial',
  SA_REVIEW: 'sa_review',
  PM_STANDARDIZATION: 'pm_standardization',
  SA_APPROVAL: 'sa_approval',
  FINANCE_APPROVAL: 'finance_approval',
  COMPLETED: 'completed'
}

const CustomFlowDemo = () => {
  const navigate = useNavigate()
  const { currentCustomer, addNotification } = useApp()
  
  const [currentPersona, setCurrentPersona] = useState('AM')
  const [workflowState, setWorkflowState] = useState(WORKFLOW_STATES.INITIAL)
  const [customRequirements, setCustomRequirements] = useState([
    {
      id: 'custom-001',
      requirement: 'Quantum Computing Module',
      description: 'Specialized quantum computing capability for research workloads',
      status: 'pending_sa_review',
      estimatedRate: 25000,
      technicalDetails: '',
      saComments: '',
      pmComments: '',
      financeComments: '',
      proposedSku: '',
      floorPrice: 0,
      finalPrice: 0,
      timeline: '5-7 business days'
    },
    {
      id: 'custom-002',
      requirement: 'AI/ML Training Platform',
      description: 'Custom AI training environment with specialized GPUs and ML frameworks',
      status: 'pending_sa_review',
      estimatedRate: 18000,
      technicalDetails: '',
      saComments: '',
      pmComments: '',
      financeComments: '',
      proposedSku: '',
      floorPrice: 0,
      finalPrice: 0,
      timeline: '5-7 business days'
    },
    {
      id: 'custom-003',
      requirement: 'Blockchain Infrastructure',
      description: 'Private blockchain network with consensus mechanisms',
      status: 'pending_sa_review',
      estimatedRate: 15000,
      technicalDetails: '',
      saComments: '',
      pmComments: '',
      financeComments: '',
      proposedSku: '',
      floorPrice: 0,
      finalPrice: 0,
      timeline: '5-7 business days'
    }
  ])
  
  const [activeRequirement, setActiveRequirement] = useState(null)
  const [formData, setFormData] = useState({})

  const getPersonaColor = (persona) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200'
    }
    return colors[PERSONAS[persona]?.color] || colors.blue
  }

  const getStatusColor = (status) => {
    const statusColors = {
      'pending_sa_review': 'bg-yellow-100 text-yellow-800',
      'sa_in_progress': 'bg-blue-100 text-blue-800',
      'pending_pm_review': 'bg-purple-100 text-purple-800',
      'pm_in_progress': 'bg-green-100 text-green-800',
      'pending_sa_approval': 'bg-indigo-100 text-indigo-800',
      'pending_finance_approval': 'bg-orange-100 text-orange-800',
      'approved': 'bg-green-100 text-green-800',
      'completed': 'bg-gray-100 text-gray-800'
    }
    return statusColors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status) => {
    const statusText = {
      'pending_sa_review': 'Pending SA Review',
      'sa_in_progress': 'SA In Progress',
      'pending_pm_review': 'Pending PM Review',
      'pm_in_progress': 'PM In Progress',
      'pending_sa_approval': 'Pending SA Approval',
      'pending_finance_approval': 'Pending Finance Approval',
      'approved': 'Approved',
      'completed': 'Completed'
    }
    return statusText[status] || status
  }

  const switchPersona = (persona) => {
    setCurrentPersona(persona)
    setActiveRequirement(null)
    setFormData({})
    
    addNotification({
      type: 'info',
      title: 'Persona Switched',
      message: `Now viewing as ${PERSONAS[persona].fullName} (${PERSONAS[persona].role})`
    })
  }

  const startReview = (requirement) => {
    setActiveRequirement(requirement.id)
    setFormData({
      technicalDetails: requirement.technicalDetails,
      saComments: requirement.saComments,
      pmComments: requirement.pmComments,
      financeComments: requirement.financeComments,
      proposedSku: requirement.proposedSku,
      floorPrice: requirement.floorPrice,
      finalPrice: requirement.finalPrice
    })
  }

  const submitSAReview = () => {
    const updatedRequirements = customRequirements.map(req => {
      if (req.id === activeRequirement) {
        return {
          ...req,
          technicalDetails: formData.technicalDetails,
          saComments: formData.saComments,
          status: 'pending_pm_review'
        }
      }
      return req
    })
    
    setCustomRequirements(updatedRequirements)
    setActiveRequirement(null)
    setFormData({})
    
    addNotification({
      type: 'success',
      title: 'SA Review Completed',
      message: 'Technical details added and sent to Product Manager for standardization'
    })
  }

  const submitPMStandardization = () => {
    const updatedRequirements = customRequirements.map(req => {
      if (req.id === activeRequirement) {
        return {
          ...req,
          proposedSku: formData.proposedSku,
          floorPrice: formData.floorPrice,
          finalPrice: formData.finalPrice,
          pmComments: formData.pmComments,
          status: 'pending_sa_approval'
        }
      }
      return req
    })
    
    setCustomRequirements(updatedRequirements)
    setActiveRequirement(null)
    setFormData({})
    
    addNotification({
      type: 'success',
      title: 'PM Standardization Completed',
      message: 'SKU standardized and sent back to SA for final approval'
    })
  }

  const submitSAApproval = () => {
    const requirement = customRequirements.find(req => req.id === activeRequirement)
    const needsFinanceApproval = formData.finalPrice < requirement.floorPrice
    
    const updatedRequirements = customRequirements.map(req => {
      if (req.id === activeRequirement) {
        return {
          ...req,
          finalPrice: formData.finalPrice,
          saComments: formData.saComments,
          status: needsFinanceApproval ? 'pending_finance_approval' : 'approved'
        }
      }
      return req
    })
    
    setCustomRequirements(updatedRequirements)
    setActiveRequirement(null)
    setFormData({})
    
    addNotification({
      type: 'success',
      title: 'SA Approval Completed',
      message: needsFinanceApproval 
        ? 'Sent to Finance for below-floor pricing approval'
        : 'Custom requirement approved and ready for quote generation'
    })
  }

  const submitFinanceApproval = () => {
    const updatedRequirements = customRequirements.map(req => {
      if (req.id === activeRequirement) {
        return {
          ...req,
          financeComments: formData.financeComments,
          status: 'approved'
        }
      }
      return req
    })
    
    setCustomRequirements(updatedRequirements)
    setActiveRequirement(null)
    setFormData({})
    
    addNotification({
      type: 'success',
      title: 'Finance Approval Completed',
      message: 'Below-floor pricing approved. Custom requirement ready for quote generation'
    })
  }

  const canPerformAction = (action) => {
    return PERSONAS[currentPersona]?.permissions.includes(action)
  }

  const getWorkflowProgress = () => {
    const totalRequirements = customRequirements.length
    const approvedRequirements = customRequirements.filter(req => req.status === 'approved').length
    return Math.round((approvedRequirements / totalRequirements) * 100)
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
              <Sparkles className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-gray-900">Custom Flow Demo</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Persona Switcher */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Persona Switcher</span>
            </CardTitle>
            <CardDescription>
              Switch between different roles to experience the custom requirements workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(PERSONAS).map((persona) => {
                const Icon = persona.icon
                return (
                  <Button
                    key={persona.code}
                    variant={currentPersona === persona.code ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      currentPersona === persona.code 
                        ? `bg-gradient-to-r from-${persona.color}-500 to-${persona.color}-600 text-white` 
                        : 'hover:bg-white/50'
                    }`}
                    onClick={() => switchPersona(persona.code)}
                  >
                    <Icon className="h-6 w-6" />
                    <div className="text-center">
                      <p className="font-medium text-sm">{persona.fullName}</p>
                      <p className="text-xs opacity-80">{persona.role}</p>
                    </div>
                  </Button>
                )
              })}
            </div>
            
            <div className="mt-4 p-4 bg-white/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full bg-${PERSONAS[currentPersona].color}-500`}></div>
                <div>
                  <p className="font-medium text-gray-900">
                    Current Persona: {PERSONAS[currentPersona].fullName}
                  </p>
                  <p className="text-sm text-gray-600">{PERSONAS[currentPersona].role}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Progress */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle>Custom Requirements Workflow Progress</CardTitle>
            <CardDescription>
              Track the progress of custom requirements through the approval workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-600">{getWorkflowProgress()}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getWorkflowProgress()}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                {[
                  { step: 'AM Submit', status: 'completed', persona: 'AM' },
                  { step: 'SA Review', status: customRequirements.some(r => r.status.includes('sa')) ? 'active' : 'pending', persona: 'SA' },
                  { step: 'PM Standardize', status: customRequirements.some(r => r.status.includes('pm')) ? 'active' : 'pending', persona: 'PM' },
                  { step: 'SA Approve', status: customRequirements.some(r => r.status === 'pending_sa_approval') ? 'active' : 'pending', persona: 'SA' },
                  { step: 'Finance Approve', status: customRequirements.some(r => r.status === 'pending_finance_approval') ? 'active' : 'pending', persona: 'FINANCE' }
                ].map((step, index) => (
                  <div key={step.step} className="text-center">
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'active' ? `bg-${PERSONAS[step.persona].color}-500 text-white` :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-gray-700">{step.step}</p>
                    <p className="text-xs text-gray-500">{PERSONAS[step.persona].name}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Requirements List */}
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle>Custom Requirements</CardTitle>
            <CardDescription>
              Manage custom requirements that need approval workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customRequirements.map((requirement) => (
                <div key={requirement.id} className="border border-gray-200 rounded-lg p-4 bg-white/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900">{requirement.requirement}</h3>
                      <Badge className={getStatusColor(requirement.status)}>
                        {getStatusText(requirement.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        ₹{requirement.estimatedRate.toLocaleString()}/month
                      </span>
                      {activeRequirement !== requirement.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startReview(requirement)}
                          disabled={!canPerformAction('review_custom') && currentPersona !== 'AM'}
                        >
                          {currentPersona === 'AM' ? 'View' : 'Review'}
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{requirement.description}</p>

                  {/* Show workflow details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {requirement.proposedSku && (
                      <div>
                        <span className="text-gray-500">Proposed SKU:</span>
                        <span className="ml-1 font-medium">{requirement.proposedSku}</span>
                      </div>
                    )}
                    {requirement.floorPrice > 0 && (
                      <div>
                        <span className="text-gray-500">Floor Price:</span>
                        <span className="ml-1 font-medium">₹{requirement.floorPrice.toLocaleString()}</span>
                      </div>
                    )}
                    {requirement.finalPrice > 0 && (
                      <div>
                        <span className="text-gray-500">Final Price:</span>
                        <span className="ml-1 font-medium">₹{requirement.finalPrice.toLocaleString()}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <span className="ml-1 font-medium">{requirement.timeline}</span>
                    </div>
                  </div>

                  {/* Review Form */}
                  {activeRequirement === requirement.id && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-4">
                      <h4 className="font-medium text-gray-900">
                        {currentPersona === 'SA' && requirement.status === 'pending_sa_review' && 'Solution Architect Review'}
                        {currentPersona === 'PM' && requirement.status === 'pending_pm_review' && 'Product Manager Standardization'}
                        {currentPersona === 'SA' && requirement.status === 'pending_sa_approval' && 'Solution Architect Final Approval'}
                        {currentPersona === 'FINANCE' && requirement.status === 'pending_finance_approval' && 'Finance Approval'}
                        {currentPersona === 'AM' && 'View Details'}
                      </h4>

                      {/* SA Review Form */}
                      {currentPersona === 'SA' && requirement.status === 'pending_sa_review' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="technicalDetails">Technical Details</Label>
                            <Textarea
                              id="technicalDetails"
                              placeholder="Add technical specifications, architecture details, and implementation notes..."
                              value={formData.technicalDetails || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, technicalDetails: e.target.value }))}
                              rows={4}
                            />
                          </div>
                          <div>
                            <Label htmlFor="saComments">SA Comments</Label>
                            <Textarea
                              id="saComments"
                              placeholder="Add your review comments and recommendations..."
                              value={formData.saComments || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, saComments: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <Button onClick={submitSAReview} className="bg-purple-600 hover:bg-purple-700">
                            <Send className="h-4 w-4 mr-2" />
                            Send to Product Manager
                          </Button>
                        </div>
                      )}

                      {/* PM Standardization Form */}
                      {currentPersona === 'PM' && requirement.status === 'pending_pm_review' && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="proposedSku">Proposed SKU</Label>
                            <Input
                              id="proposedSku"
                              placeholder="CI-CUSTOM-QUANTUM-L-MUM"
                              value={formData.proposedSku || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, proposedSku: e.target.value }))}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="floorPrice">Floor Price (₹/month)</Label>
                              <Input
                                id="floorPrice"
                                type="number"
                                placeholder="20000"
                                value={formData.floorPrice || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, floorPrice: parseInt(e.target.value) }))}
                              />
                            </div>
                            <div>
                              <Label htmlFor="finalPrice">Recommended Price (₹/month)</Label>
                              <Input
                                id="finalPrice"
                                type="number"
                                placeholder="25000"
                                value={formData.finalPrice || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, finalPrice: parseInt(e.target.value) }))}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="pmComments">PM Comments</Label>
                            <Textarea
                              id="pmComments"
                              placeholder="Add standardization notes, pricing rationale, and market positioning..."
                              value={formData.pmComments || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, pmComments: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <Button onClick={submitPMStandardization} className="bg-green-600 hover:bg-green-700">
                            <Send className="h-4 w-4 mr-2" />
                            Send to SA for Approval
                          </Button>
                        </div>
                      )}

                      {/* SA Final Approval Form */}
                      {currentPersona === 'SA' && requirement.status === 'pending_sa_approval' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Proposed SKU</Label>
                              <p className="text-sm font-medium text-gray-900">{requirement.proposedSku}</p>
                            </div>
                            <div>
                              <Label>Floor Price</Label>
                              <p className="text-sm font-medium text-gray-900">₹{requirement.floorPrice?.toLocaleString()}</p>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="finalPrice">Final Price (₹/month)</Label>
                            <Input
                              id="finalPrice"
                              type="number"
                              value={formData.finalPrice || requirement.finalPrice}
                              onChange={(e) => setFormData(prev => ({ ...prev, finalPrice: parseInt(e.target.value) }))}
                            />
                            {formData.finalPrice < requirement.floorPrice && (
                              <p className="text-sm text-orange-600 mt-1">
                                Price below floor - will require Finance approval
                              </p>
                            )}
                          </div>
                          <div>
                            <Label htmlFor="saComments">Final Comments</Label>
                            <Textarea
                              id="saComments"
                              placeholder="Add final approval comments..."
                              value={formData.saComments || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, saComments: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <Button onClick={submitSAApproval} className="bg-purple-600 hover:bg-purple-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Requirement
                          </Button>
                        </div>
                      )}

                      {/* Finance Approval Form */}
                      {currentPersona === 'FINANCE' && requirement.status === 'pending_finance_approval' && (
                        <div className="space-y-4">
                          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <p className="text-sm text-orange-800">
                              <strong>Below Floor Price Alert:</strong> Final price ₹{requirement.finalPrice?.toLocaleString()} 
                              is below floor price ₹{requirement.floorPrice?.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <Label htmlFor="financeComments">Finance Comments</Label>
                            <Textarea
                              id="financeComments"
                              placeholder="Add approval rationale and any conditions..."
                              value={formData.financeComments || ''}
                              onChange={(e) => setFormData(prev => ({ ...prev, financeComments: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          <Button onClick={submitFinanceApproval} className="bg-orange-600 hover:bg-orange-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve Below-Floor Pricing
                          </Button>
                        </div>
                      )}

                      {/* View Only for AM */}
                      {currentPersona === 'AM' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label>Status</Label>
                              <p className="font-medium">{getStatusText(requirement.status)}</p>
                            </div>
                            <div>
                              <Label>Timeline</Label>
                              <p className="font-medium">{requirement.timeline}</p>
                            </div>
                          </div>
                          {requirement.technicalDetails && (
                            <div>
                              <Label>Technical Details</Label>
                              <p className="text-sm text-gray-700">{requirement.technicalDetails}</p>
                            </div>
                          )}
                          {requirement.saComments && (
                            <div>
                              <Label>SA Comments</Label>
                              <p className="text-sm text-gray-700">{requirement.saComments}</p>
                            </div>
                          )}
                          {requirement.pmComments && (
                            <div>
                              <Label>PM Comments</Label>
                              <p className="text-sm text-gray-700">{requirement.pmComments}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <Button 
                        variant="outline" 
                        onClick={() => setActiveRequirement(null)}
                        className="mt-4"
                      >
                        Close
                      </Button>
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
            onClick={() => navigate('/')}
            variant="outline"
          >
            Back to Dashboard
          </Button>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className={getPersonaColor(currentPersona)}>
              {PERSONAS[currentPersona].fullName}
            </Badge>
            {customRequirements.every(req => req.status === 'approved') && (
              <Button 
                onClick={() => navigate('/quote')}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Quote
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomFlowDemo

