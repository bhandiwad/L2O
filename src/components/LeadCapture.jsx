import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Users,
  DollarSign,
  Calendar,
  Target,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

const LeadCapture = ({ onLeadCapture }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    
    // Contact Information
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    
    // Project Information
    projectName: '',
    projectType: '',
    timeline: '',
    budget: '',
    description: '',
    
    // Location
    location: '',
    region: ''
  })

  const [errors, setErrors] = useState({})

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
    'Education', 'Government', 'Media', 'Telecommunications', 'Other'
  ]

  const companySizes = [
    'Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 
    'Large (201-1000)', 'Enterprise (1000+)'
  ]

  const projectTypes = [
    'Cloud Migration', 'New Application', 'Infrastructure Upgrade',
    'Disaster Recovery', 'Data Analytics', 'AI/ML Platform', 'Other'
  ]

  const timelines = [
    'Immediate (< 1 month)', 'Short-term (1-3 months)', 
    'Medium-term (3-6 months)', 'Long-term (6+ months)'
  ]

  const budgetRanges = [
    '< ₹1 Lakh', '₹1-5 Lakhs', '₹5-25 Lakhs', 
    '₹25 Lakhs - ₹1 Crore', '> ₹1 Crore'
  ]

  const locations = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Other'
  ]

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.companyName) newErrors.companyName = 'Company name is required'
      if (!formData.industry) newErrors.industry = 'Industry is required'
      if (!formData.companySize) newErrors.companySize = 'Company size is required'
    } else if (step === 2) {
      if (!formData.contactName) newErrors.contactName = 'Contact name is required'
      if (!formData.email) newErrors.email = 'Email is required'
      if (!formData.phone) newErrors.phone = 'Phone is required'
    } else if (step === 3) {
      if (!formData.projectName) newErrors.projectName = 'Project name is required'
      if (!formData.projectType) newErrors.projectType = 'Project type is required'
      if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    onLeadCapture(formData)
    navigate('/requirements')
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const steps = [
    { number: 1, title: 'Company Info', icon: Building2 },
    { number: 2, title: 'Contact Details', icon: User },
    { number: 3, title: 'Project Info', icon: Target }
  ]

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
              <span className="font-semibold text-gray-900">New Lead Capture</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-white/60 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                {steps[currentStep - 1].icon && (
                  <steps[currentStep - 1].icon className="h-6 w-6 mr-3 text-blue-600" />
                )}
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your company and business"}
                {currentStep === 2 && "Provide your contact information"}
                {currentStep === 3 && "Describe your project requirements"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Company Information */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      className={errors.companyName ? 'border-red-300' : ''}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={(e) => updateFormData('website', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry *</Label>
                    <Select value={formData.industry} onValueChange={(value) => updateFormData('industry', value)}>
                      <SelectTrigger className={errors.industry ? 'border-red-300' : ''}>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.industry}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size *</Label>
                    <Select value={formData.companySize} onValueChange={(value) => updateFormData('companySize', value)}>
                      <SelectTrigger className={errors.companySize ? 'border-red-300' : ''}>
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.companySize && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.companySize}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Full Name *</Label>
                    <Input
                      id="contactName"
                      placeholder="Enter your full name"
                      value={formData.contactName}
                      onChange={(e) => updateFormData('contactName', e.target.value)}
                      className={errors.contactName ? 'border-red-300' : ''}
                    />
                    {errors.contactName && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.contactName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      placeholder="e.g., CTO, IT Manager"
                      value={formData.designation}
                      onChange={(e) => updateFormData('designation', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={errors.email ? 'border-red-300' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={errors.phone ? 'border-red-300' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={formData.location} onValueChange={(value) => updateFormData('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Project Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input
                        id="projectName"
                        placeholder="Enter project name"
                        value={formData.projectName}
                        onChange={(e) => updateFormData('projectName', e.target.value)}
                        className={errors.projectName ? 'border-red-300' : ''}
                      />
                      {errors.projectName && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.projectName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select value={formData.projectType} onValueChange={(value) => updateFormData('projectType', value)}>
                        <SelectTrigger className={errors.projectType ? 'border-red-300' : ''}>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.projectType && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.projectType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline *</Label>
                      <Select value={formData.timeline} onValueChange={(value) => updateFormData('timeline', value)}>
                        <SelectTrigger className={errors.timeline ? 'border-red-300' : ''}>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>{timeline}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.timeline && (
                        <p className="text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.timeline}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => updateFormData('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((budget) => (
                            <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your project requirements, goals, and any specific needs..."
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="bg-white/50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Step {currentStep} of {steps.length}
                  </span>
                </div>

                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {currentStep === 3 ? 'Continue to Requirements' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default LeadCapture

