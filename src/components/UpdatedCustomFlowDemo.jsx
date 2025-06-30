import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  DollarSign,
  FileText,
  Settings,
  Shield,
  Zap,
  Eye,
  Edit,
  Save,
  X,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { expandedSkuData, allSkus } from '../data/expandedSkuData';
import EnhancedProposalGeneration from './EnhancedProposalGeneration';

const CustomFlowDemo = () => {
  const [currentPersona, setCurrentPersona] = useState('AM');
  const [workflowStage, setWorkflowStage] = useState(1);
  const [customRequirements, setCustomRequirements] = useState([]);
  const [selectedRequirement, setSelectedRequirement] = useState(null);
  const [pmReview, setPmReview] = useState({});
  const [showProposal, setShowProposal] = useState(false);
  const [approvedRequirements, setApprovedRequirements] = useState([]);

  const personas = {
    AM: {
      name: 'Rajesh Kumar',
      role: 'Account Manager',
      color: 'blue',
      icon: Users,
      capabilities: ['requirement-capture', 'customer-interaction']
    },
    SA: {
      name: 'Priya Sharma', 
      role: 'Solution Architect',
      color: 'purple',
      icon: Settings,
      capabilities: ['technical-review', 'architecture-design']
    },
    PM: {
      name: 'Amit Patel',
      role: 'Product Manager', 
      color: 'green',
      icon: Shield,
      capabilities: ['sku-approval', 'pricing-control', 'commercial-terms']
    },
    Finance: {
      name: 'Sunita Reddy',
      role: 'Finance Administrator',
      color: 'orange',
      icon: DollarSign,
      capabilities: ['final-approval', 'contract-generation']
    }
  };

  // Realistic Enterprise Custom Requirements
  const enterpriseRequirements = [
    {
      id: 'req-001',
      title: 'VDI Infrastructure for Remote Workforce',
      description: 'Virtual desktop infrastructure to support 500+ remote employees with Windows 10/11 desktops',
      estimatedCost: 175000,
      timeline: '4-6 weeks',
      complexity: 'Medium',
      suggestedSkus: [
        'CI-COMP-VDI-STANDARD-MUM',
        'CI-NET-LB-BASIC-MUM',
        'CI-SEC-AV-ENTERPRISE-MUM',
        'CI-STOR-BLOCK-1TB-MUM'
      ],
      status: 'pending-sa-review'
    },
    {
      id: 'req-002', 
      title: 'AI/ML Analytics Platform',
      description: 'High-performance AI/ML platform for data analytics and machine learning workloads with GPU acceleration',
      estimatedCost: 220000,
      timeline: '6-8 weeks',
      complexity: 'High',
      suggestedSkus: [
        'CI-COMP-GPU-AI-MUM',
        'CI-AI-PLATFORM-BASIC-MUM',
        'CI-STOR-OBJECT-1TB-MUM',
        'CI-DB-MONGODB-M-MUM'
      ],
      status: 'pending-sa-review'
    },
    {
      id: 'req-003',
      title: 'Graph Database for Recommendation Engine',
      description: 'Neo4j-based graph database platform for building advanced recommendation systems',
      estimatedCost: 180000,
      timeline: '5-7 weeks', 
      complexity: 'High',
      suggestedSkus: [
        'CI-DB-GRAPHDB-M-MUM',
        'CI-COMP-DEDICATED-M-MUM',
        'CI-NET-LB-ADVANCED-MUM',
        'CI-MON-ADVANCED-MUM'
      ],
      status: 'pending-sa-review'
    },
    {
      id: 'req-004',
      title: 'DevOps CI/CD Pipeline',
      description: 'Complete DevOps platform with automated CI/CD pipelines, container orchestration, and monitoring',
      estimatedCost: 125000,
      timeline: '3-4 weeks',
      complexity: 'Medium',
      suggestedSkus: [
        'CI-DEVOPS-CICD-MUM',
        'CI-COMP-SHARED-L-MUM',
        'CI-MON-ADVANCED-MUM',
        'CI-STOR-OBJECT-1TB-MUM'
      ],
      status: 'pending-sa-review'
    }
  ];

  useEffect(() => {
    setCustomRequirements(enterpriseRequirements);
  }, []);

  const switchPersona = (persona) => {
    setCurrentPersona(persona);
  };

  const advanceWorkflow = () => {
    if (workflowStage < 5) {
      setWorkflowStage(workflowStage + 1);
      
      // Auto-switch persona based on workflow stage
      const personaMap = {
        1: 'AM',
        2: 'SA', 
        3: 'PM',
        4: 'SA',
        5: 'Finance'
      };
      setCurrentPersona(personaMap[workflowStage + 1]);
    }
  };

  // PM Functions for SKU Review and Pricing
  const handlePmSkuReview = (reqId, skuId, action, data = {}) => {
    setPmReview(prev => ({
      ...prev,
      [reqId]: {
        ...prev[reqId],
        [skuId]: {
          action,
          ...data,
          reviewedBy: 'Amit Patel',
          reviewDate: new Date().toISOString()
        }
      }
    }));
  };

  const approveSku = (reqId, skuId) => {
    handlePmSkuReview(reqId, skuId, 'approved');
  };

  const rejectSku = (reqId, skuId, reason) => {
    handlePmSkuReview(reqId, skuId, 'rejected', { reason });
  };

  const updateSkuPricing = (reqId, skuId, pricing) => {
    handlePmSkuReview(reqId, skuId, 'pricing-updated', { customPricing: pricing });
  };

  const suggestAlternativeSku = (reqId, originalSkuId, alternativeSkuId, reason) => {
    handlePmSkuReview(reqId, originalSkuId, 'alternative-suggested', { 
      alternativeSkuId, 
      reason 
    });
  };

  const generateProposal = () => {
    // Convert custom requirements to proposal format
    const proposalRequirements = customRequirements.map(req => ({
      id: req.id,
      sku: req.suggestedSkus[0],
      name: req.title,
      description: req.description,
      monthlyRate: req.estimatedCost,
      quantity: 1,
      paymentModel: 'Pay As You Go',
      specifications: {
        complexity: req.complexity,
        timeline: req.timeline
      }
    }));
    
    setShowProposal(true);
  };

  const getWorkflowStageInfo = (stage) => {
    const stages = {
      1: { title: 'AM Submit', description: 'Account Manager captures requirements', persona: 'AM' },
      2: { title: 'SA Review', description: 'Solution Architect technical review', persona: 'SA' },
      3: { title: 'PM Standardize', description: 'Product Manager SKU approval', persona: 'PM' },
      4: { title: 'SA Approve', description: 'Solution Architect final approval', persona: 'SA' },
      5: { title: 'Finance Approve', description: 'Finance Administrator approval', persona: 'Finance' }
    };
    return stages[stage];
  };

  if (showProposal) {
    const proposalRequirements = customRequirements.map(req => ({
      id: req.id,
      sku: req.suggestedSkus[0],
      name: req.title,
      description: req.description,
      monthlyRate: req.estimatedCost,
      quantity: 1,
      paymentModel: 'Pay As You Go',
      specifications: {
        complexity: req.complexity,
        timeline: req.timeline
      }
    }));

    return (
      <EnhancedProposalGeneration 
        requirements={proposalRequirements}
        onBack={() => setShowProposal(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Custom Flow Demo</h1>
              <p className="text-blue-200">Enterprise requirements workflow demonstration</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Persona Switcher */}
        <Card className="mb-6 border-l-4 border-l-blue-600">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Persona Switcher
            </CardTitle>
            <p className="text-slate-600">Switch between different roles to experience the custom requirements workflow</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(personas).map(([key, persona]) => {
                const IconComponent = persona.icon;
                return (
                  <Button
                    key={key}
                    onClick={() => switchPersona(key)}
                    variant={currentPersona === key ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      currentPersona === key 
                        ? `bg-${persona.color}-600 hover:bg-${persona.color}-700 text-white` 
                        : `border-${persona.color}-200 hover:bg-${persona.color}-50`
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-semibold">{persona.name}</div>
                      <div className="text-xs opacity-75">{persona.role}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Persona Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-${personas[currentPersona].color}-100 rounded-full flex items-center justify-center`}>
                  {React.createElement(personas[currentPersona].icon, { 
                    className: `w-6 h-6 text-${personas[currentPersona].color}-600` 
                  })}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">Current Persona: {personas[currentPersona].name}</h3>
                  <p className="text-slate-600">{personas[currentPersona].role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Capabilities:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {personas[currentPersona].capabilities.map(cap => (
                    <Badge key={cap} variant="secondary" className="text-xs">
                      {cap.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Custom Requirements Workflow Progress
            </CardTitle>
            <p className="text-slate-600">Track the progress of custom requirements through the approval workflow</p>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                <span className="text-sm text-slate-600">{Math.round((workflowStage / 5) * 100)}% Complete</span>
              </div>
              <Progress value={(workflowStage / 5) * 100} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              {[1, 2, 3, 4, 5].map((stage) => {
                const stageInfo = getWorkflowStageInfo(stage);
                const isActive = stage === workflowStage;
                const isCompleted = stage < workflowStage;
                
                return (
                  <div key={stage} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : isActive 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : stage}
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-xs font-medium text-slate-700">{stageInfo.title}</div>
                      <div className="text-xs text-slate-500">{stageInfo.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Requirements List - Different views based on persona */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Custom Requirements
              {currentPersona === 'PM' && (
                <Badge className="ml-2 bg-green-100 text-green-800">PM Review Mode</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customRequirements.map((req) => (
                <div key={req.id} className="border rounded-lg p-4 hover:bg-slate-50">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800">{req.title}</h4>
                      <p className="text-slate-600 text-sm mt-1">{req.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-lg font-bold text-blue-600">₹{req.estimatedCost.toLocaleString()}/month</div>
                      <div className="text-sm text-slate-500">Timeline: {req.timeline}</div>
                      <Badge variant={req.complexity === 'High' ? 'destructive' : req.complexity === 'Medium' ? 'default' : 'secondary'}>
                        {req.complexity} Complexity
                      </Badge>
                    </div>
                  </div>

                  {/* SKU Details */}
                  <div className="mt-4">
                    <h5 className="font-medium text-slate-700 mb-2">Suggested SKUs:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {req.suggestedSkus.map((skuId) => {
                        const sku = allSkus.find(s => s.sku === skuId);
                        const review = pmReview[req.id]?.[skuId];
                        
                        return (
                          <div key={skuId} className="border rounded p-3 bg-white">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <div className="font-medium text-sm">{sku?.name}</div>
                                <div className="text-xs text-slate-500 font-mono">{skuId}</div>
                              </div>
                              {review && (
                                <Badge variant={
                                  review.action === 'approved' ? 'default' :
                                  review.action === 'rejected' ? 'destructive' :
                                  'secondary'
                                }>
                                  {review.action}
                                </Badge>
                              )}
                            </div>
                            
                            {sku && (
                              <div className="text-xs text-slate-600 mb-2">
                                ₹{sku.pricing.payg.toLocaleString()}/month
                              </div>
                            )}

                            {/* PM Controls */}
                            {currentPersona === 'PM' && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => approveSku(req.id, skuId)}
                                  className="text-xs"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => rejectSku(req.id, skuId, 'Cost optimization required')}
                                  className="text-xs"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedRequirement({reqId: req.id, skuId})}
                                  className="text-xs"
                                >
                                  <Edit className="w-3 h-3 mr-1" />
                                  Edit Price
                                </Button>
                              </div>
                            )}

                            {review?.reason && (
                              <div className="mt-2 p-2 bg-orange-50 rounded text-xs text-orange-800">
                                <strong>PM Note:</strong> {review.reason}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons based on persona */}
                  <div className="flex justify-between items-center mt-4 pt-3 border-t">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{req.status.replace('-', ' ')}</Badge>
                      {currentPersona === 'SA' && (
                        <Badge className="bg-purple-100 text-purple-800">Technical Review</Badge>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {currentPersona === 'AM' && (
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit Requirements
                        </Button>
                      )}
                      {currentPersona === 'SA' && (
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Technical Approve
                        </Button>
                      )}
                      {currentPersona === 'PM' && (
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Shield className="w-4 h-4 mr-1" />
                          Commercial Approve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-3 py-1">
              Current Stage: {getWorkflowStageInfo(workflowStage).title}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {customRequirements.length} Requirements
            </Badge>
          </div>
          
          <div className="flex space-x-3">
            {workflowStage < 5 && (
              <Button 
                onClick={advanceWorkflow}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Advance Workflow
              </Button>
            )}
            
            {workflowStage === 5 && currentPersona === 'Finance' && (
              <Button 
                onClick={generateProposal}
                className="bg-green-600 hover:bg-green-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Final Proposal
              </Button>
            )}
          </div>
        </div>

        {/* PM Pricing Modal */}
        {selectedRequirement && currentPersona === 'PM' && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Update SKU Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>SKU ID</Label>
                  <Input value={selectedRequirement.skuId} disabled />
                </div>
                <div>
                  <Label>Custom Monthly Price (₹)</Label>
                  <Input 
                    type="number" 
                    placeholder="Enter custom price"
                    onChange={(e) => setSelectedRequirement(prev => ({
                      ...prev, 
                      customPrice: parseInt(e.target.value)
                    }))}
                  />
                </div>
                <div>
                  <Label>Pricing Reason</Label>
                  <Textarea 
                    placeholder="Reason for custom pricing..."
                    onChange={(e) => setSelectedRequirement(prev => ({
                      ...prev, 
                      reason: e.target.value
                    }))}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedRequirement(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      updateSkuPricing(
                        selectedRequirement.reqId, 
                        selectedRequirement.skuId, 
                        {
                          monthly: selectedRequirement.customPrice,
                          reason: selectedRequirement.reason
                        }
                      );
                      setSelectedRequirement(null);
                    }}
                  >
                    Update Pricing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFlowDemo;

