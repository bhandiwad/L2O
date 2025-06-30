import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  FileText, 
  Download, 
  Mail, 
  Save, 
  Calculator,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const EnhancedProposalGeneration = ({ requirements = [], onBack }) => {
  const [proposalData, setProposalData] = useState({
    proposalId: `SIFY-PROP-${Date.now()}`,
    date: new Date().toLocaleDateString(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    customerInfo: {
      name: 'Enterprise Customer',
      contact: 'procurement@customer.com',
      phone: '+91-9876543210'
    }
  });

  const printRef = useRef();

  // Calculate totals and breakdowns
  const calculateCostBreakdown = () => {
    const breakdown = {
      compute: 0,
      network: 0,
      security: 0,
      storage: 0,
      managed: 0
    };

    let totalMonthly = 0;
    let totalSetup = 0;

    requirements.forEach(req => {
      const monthly = req.monthlyRate || 0;
      const setup = req.setupFee || 0;
      
      totalMonthly += monthly * (req.quantity || 1);
      totalSetup += setup * (req.quantity || 1);

      // Categorize costs
      if (req.sku.includes('COMP')) breakdown.compute += monthly * (req.quantity || 1);
      else if (req.sku.includes('NET')) breakdown.network += monthly * (req.quantity || 1);
      else if (req.sku.includes('SEC')) breakdown.security += monthly * (req.quantity || 1);
      else if (req.sku.includes('STOR')) breakdown.storage += monthly * (req.quantity || 1);
      else breakdown.managed += monthly * (req.quantity || 1);
    });

    return {
      breakdown,
      totalMonthly,
      totalSetup,
      yearlyTotal: totalMonthly * 12,
      threeYearTotal: totalMonthly * 36
    };
  };

  const costData = calculateCostBreakdown();

  const handleExportPDF = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const subject = `Sify Cloud Proposal - ${proposalData.proposalId}`;
    const body = `Dear Customer,\n\nPlease find attached your cloud infrastructure proposal.\n\nProposal ID: ${proposalData.proposalId}\nTotal Monthly Cost: ₹${costData.totalMonthly.toLocaleString()}\nValid Until: ${proposalData.validUntil}\n\nBest regards,\nSify Technologies`;
    
    window.open(`mailto:${proposalData.customerInfo.contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              ← Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Professional Proposal</h1>
              <p className="text-blue-200">Comprehensive cloud infrastructure solution</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={handleExportPDF}
              className="bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button 
              onClick={handleSendEmail}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6" ref={printRef}>
        {/* Proposal Header */}
        <Card className="mb-6 border-l-4 border-l-blue-600">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-slate-800">
                  Sify Cloud Infrastructure Proposal
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Proposal ID: <span className="font-mono font-semibold">{proposalData.proposalId}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Date: {proposalData.date}</p>
                <p className="text-sm text-slate-600">Valid Until: {proposalData.validUntil}</p>
                <Badge className="mt-2 bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Ready for Approval
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Executive Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  ₹{costData.totalMonthly.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">Monthly Cost</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {requirements.length}
                </div>
                <div className="text-sm text-slate-600">Services</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  ₹{costData.yearlyTotal.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600">Annual Cost</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  30 Days
                </div>
                <div className="text-sm text-slate-600">Validity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Calculator className="w-5 h-5 mr-2 text-blue-600" />
              Cost Analysis & Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Breakdown */}
              <div>
                <h4 className="font-semibold mb-4 text-slate-700">Monthly Cost by Category</h4>
                <div className="space-y-3">
                  {Object.entries(costData.breakdown).map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="capitalize text-slate-600">{category}</span>
                      <span className="font-semibold">₹{amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Monthly</span>
                    <span className="text-blue-600">₹{costData.totalMonthly.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Multi-year Projections */}
              <div>
                <h4 className="font-semibold mb-4 text-slate-700">Multi-Year Cost Projections</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Setup Costs (One-time)</span>
                    <span className="font-semibold">₹{costData.totalSetup.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Year 1 Total</span>
                    <span className="font-semibold">₹{(costData.yearlyTotal + costData.totalSetup).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">3-Year Total</span>
                    <span className="font-semibold">₹{(costData.threeYearTotal + costData.totalSetup).toLocaleString()}</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center text-green-800">
                      <span className="font-medium">Potential RI Savings (3-Year)</span>
                      <span className="font-bold">₹{Math.round(costData.threeYearTotal * 0.3).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">*Based on Reserved Instance pricing</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Bill of Quantities */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Detailed Bill of Quantities (BoQ)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border p-3 text-left font-semibold">SKU</th>
                    <th className="border p-3 text-left font-semibold">Description</th>
                    <th className="border p-3 text-center font-semibold">Qty</th>
                    <th className="border p-3 text-center font-semibold">Unit Price</th>
                    <th className="border p-3 text-center font-semibold">Setup Fee</th>
                    <th className="border p-3 text-center font-semibold">Monthly Total</th>
                    <th className="border p-3 text-center font-semibold">Payment Model</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((req, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="border p-3 font-mono text-sm">{req.sku}</td>
                      <td className="border p-3">
                        <div>
                          <div className="font-medium">{req.name}</div>
                          <div className="text-sm text-slate-600">{req.description}</div>
                          {req.specifications && (
                            <div className="text-xs text-slate-500 mt-1">
                              {Object.entries(req.specifications).map(([key, value]) => (
                                <span key={key} className="mr-3">{key}: {value}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="border p-3 text-center">{req.quantity || 1}</td>
                      <td className="border p-3 text-center">₹{(req.monthlyRate || 0).toLocaleString()}</td>
                      <td className="border p-3 text-center">₹{(req.setupFee || 0).toLocaleString()}</td>
                      <td className="border p-3 text-center font-semibold">
                        ₹{((req.monthlyRate || 0) * (req.quantity || 1)).toLocaleString()}
                      </td>
                      <td className="border p-3 text-center">
                        <Badge variant={req.paymentModel === 'Reserved Instance' ? 'default' : 'secondary'}>
                          {req.paymentModel || 'Pay As You Go'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 font-bold">
                    <td colSpan="5" className="border p-3 text-right">Total Monthly Cost:</td>
                    <td className="border p-3 text-center text-blue-600">
                      ₹{costData.totalMonthly.toLocaleString()}
                    </td>
                    <td className="border p-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Terms & Conditions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Terms & Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-slate-700">Commercial Terms</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Payment Terms: Net 30 days from invoice date</li>
                  <li>• Setup fees are one-time charges</li>
                  <li>• Monthly charges are billed in advance</li>
                  <li>• Reserved Instance pricing requires annual commitment</li>
                  <li>• All prices are exclusive of applicable taxes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-slate-700">Service Level Agreement</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• 99.9% uptime guarantee for all services</li>
                  <li>• 24x7 technical support included</li>
                  <li>• 4-hour response time for critical issues</li>
                  <li>• Monthly service reports provided</li>
                  <li>• Service credits for SLA breaches</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Implementation Timeline */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-800">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Implementation Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <div className="font-medium">Contract Signing & Setup (Week 1)</div>
                  <div className="text-sm text-slate-600">Contract execution, account setup, and initial configuration</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <div className="font-medium">Infrastructure Provisioning (Week 2-3)</div>
                  <div className="text-sm text-slate-600">Resource provisioning, network setup, and security configuration</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium">Go-Live & Support (Week 4)</div>
                  <div className="text-sm text-slate-600">Final testing, go-live, and ongoing support activation</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-6 border-t">
          <p className="text-slate-600 mb-2">
            This proposal is valid until {proposalData.validUntil}
          </p>
          <p className="text-sm text-slate-500">
            Sify Technologies Limited | www.sifytechnologies.com | support@sifytechnologies.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProposalGeneration;

