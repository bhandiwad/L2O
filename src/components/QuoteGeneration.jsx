import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, FileText, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const QuoteGeneration = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const analysisResults = location.state?.analysisResults

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/excel-upload')}
                className="hover:bg-white/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Requirements
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-gray-900">Quote Generation</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-white/60 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Quote Generation</CardTitle>
          </CardHeader>
          <CardContent>
            {analysisResults ? (
              <div>
                <p className="mb-4">Quote generation for {analysisResults.totalItems} items...</p>
                <p>Estimated Cost: ₹{(analysisResults.estimatedCost / 1000).toFixed(1)}K/month</p>
                <p>Flow Type: {analysisResults.flowType}</p>
              </div>
            ) : (
              <p>No analysis results found. Please process requirements first.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default QuoteGeneration

