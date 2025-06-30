import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Separator } from '../components/ui/separator';
import { 
  Server, 
  Network, 
  Shield, 
  Database,
  HardDrive,
  MapPin,
  TrendingUp,
  Settings,
  Search,
  Filter,
  RefreshCw,
  Download,
  Eye,
  Edit,
  Move,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  BarChart3,
  Layers,
  Globe,
  Building,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { enterpriseCustomerData, allSkus } from '../data/expandedSkuData';

const EnterpriseInventoryView = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPaymentModel, setSelectedPaymentModel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list, topology
  const [selectedResource, setSelectedResource] = useState(null);
  const [showMacdModal, setShowMacdModal] = useState(false);
  const [macdOperation, setMacdOperation] = useState('');

  // Generate comprehensive enterprise inventory
  const generateEnterpriseInventory = () => {
    const inventory = [];
    let resourceId = 1;

    // Generate resources for each location and environment
    enterpriseCustomerData.locations.forEach(location => {
      enterpriseCustomerData.environments.forEach(environment => {
        // Distribute resources across categories
        const resourceDistribution = {
          'Production': { compute: 15, network: 8, security: 6, storage: 10, database: 8 },
          'Staging': { compute: 8, network: 4, security: 3, storage: 5, database: 4 },
          'Development': { compute: 6, network: 3, security: 2, storage: 4, database: 3 },
          'DR': { compute: 4, network: 2, security: 2, storage: 6, database: 2 }
        };

        const distribution = resourceDistribution[environment.name] || { compute: 2, network: 1, security: 1, storage: 2, database: 1 };

        // Generate compute resources
        for (let i = 0; i < distribution.compute; i++) {
          const sku = allSkus.find(s => s.category === 'Compute');
          if (sku) {
            inventory.push({
              id: `RES-${resourceId++}`,
              name: `${sku.name} ${i + 1}`,
              sku: sku.sku,
              category: 'Compute',
              location: location.code,
              locationName: location.name,
              environment: environment.name,
              status: Math.random() > 0.1 ? 'running' : 'stopped',
              paymentModel: Math.random() > 0.6 ? 'Reserved Instance' : 'Pay As You Go',
              monthlyRate: sku.pricing.payg,
              specifications: sku.specifications,
              utilization: {
                cpu: Math.floor(Math.random() * 100),
                memory: Math.floor(Math.random() * 100),
                storage: Math.floor(Math.random() * 100)
              },
              lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
              tags: [`${environment.name.toLowerCase()}`, location.code.toLowerCase(), 'compute'],
              riExpiry: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000) : null,
              costOptimization: Math.random() > 0.7 ? {
                potential: 'Convert to RI',
                savings: Math.floor(sku.pricing.payg * 0.3)
              } : null
            });
          }
        }

        // Generate network resources
        for (let i = 0; i < distribution.network; i++) {
          const sku = allSkus.find(s => s.category === 'Network');
          if (sku) {
            inventory.push({
              id: `RES-${resourceId++}`,
              name: `${sku.name} ${i + 1}`,
              sku: sku.sku,
              category: 'Network',
              location: location.code,
              locationName: location.name,
              environment: environment.name,
              status: Math.random() > 0.05 ? 'active' : 'inactive',
              paymentModel: Math.random() > 0.7 ? 'Reserved Instance' : 'Pay As You Go',
              monthlyRate: sku.pricing.payg,
              specifications: sku.specifications,
              utilization: {
                bandwidth: Math.floor(Math.random() * 100),
                connections: Math.floor(Math.random() * 100)
              },
              lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
              tags: [`${environment.name.toLowerCase()}`, location.code.toLowerCase(), 'network'],
              riExpiry: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000) : null
            });
          }
        }

        // Generate security resources
        for (let i = 0; i < distribution.security; i++) {
          const sku = allSkus.find(s => s.category === 'Security');
          if (sku) {
            inventory.push({
              id: `RES-${resourceId++}`,
              name: `${sku.name} ${i + 1}`,
              sku: sku.sku,
              category: 'Security',
              location: location.code,
              locationName: location.name,
              environment: environment.name,
              status: Math.random() > 0.02 ? 'active' : 'maintenance',
              paymentModel: Math.random() > 0.8 ? 'Reserved Instance' : 'Pay As You Go',
              monthlyRate: sku.pricing.payg,
              specifications: sku.specifications,
              lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
              tags: [`${environment.name.toLowerCase()}`, location.code.toLowerCase(), 'security'],
              riExpiry: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000) : null
            });
          }
        }

        // Generate storage resources
        for (let i = 0; i < distribution.storage; i++) {
          const sku = allSkus.find(s => s.category === 'Storage');
          if (sku) {
            inventory.push({
              id: `RES-${resourceId++}`,
              name: `${sku.name} ${i + 1}`,
              sku: sku.sku,
              category: 'Storage',
              location: location.code,
              locationName: location.name,
              environment: environment.name,
              status: Math.random() > 0.05 ? 'online' : 'offline',
              paymentModel: Math.random() > 0.5 ? 'Reserved Instance' : 'Pay As You Go',
              monthlyRate: sku.pricing.payg,
              specifications: sku.specifications,
              utilization: {
                storage: Math.floor(Math.random() * 100)
              },
              lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
              tags: [`${environment.name.toLowerCase()}`, location.code.toLowerCase(), 'storage'],
              riExpiry: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000) : null
            });
          }
        }

        // Generate database resources
        for (let i = 0; i < distribution.database; i++) {
          const sku = allSkus.find(s => s.category === 'Database');
          if (sku) {
            inventory.push({
              id: `RES-${resourceId++}`,
              name: `${sku.name} ${i + 1}`,
              sku: sku.sku,
              category: 'Database',
              location: location.code,
              locationName: location.name,
              environment: environment.name,
              status: Math.random() > 0.08 ? 'running' : 'maintenance',
              paymentModel: Math.random() > 0.4 ? 'Reserved Instance' : 'Pay As You Go',
              monthlyRate: sku.pricing.payg,
              specifications: sku.specifications,
              utilization: {
                cpu: Math.floor(Math.random() * 100),
                memory: Math.floor(Math.random() * 100),
                connections: Math.floor(Math.random() * 100)
              },
              lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
              tags: [`${environment.name.toLowerCase()}`, location.code.toLowerCase(), 'database'],
              riExpiry: Math.random() > 0.5 ? new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000) : null,
              costOptimization: Math.random() > 0.6 ? {
                potential: 'Optimize instance size',
                savings: Math.floor(sku.pricing.payg * 0.25)
              } : null
            });
          }
        }
      });
    });

    return inventory;
  };

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    setInventory(generateEnterpriseInventory());
  }, []);

  // Filter inventory based on selected criteria
  const filteredInventory = inventory.filter(resource => {
    const matchesLocation = selectedLocation === 'all' || resource.location === selectedLocation;
    const matchesEnvironment = selectedEnvironment === 'all' || resource.environment === selectedEnvironment;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesPaymentModel = selectedPaymentModel === 'all' || resource.paymentModel === selectedPaymentModel;
    const matchesSearch = searchQuery === '' || 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.includes(searchQuery.toLowerCase()));

    return matchesLocation && matchesEnvironment && matchesCategory && matchesPaymentModel && matchesSearch;
  });

  // Calculate summary statistics
  const summaryStats = {
    totalResources: filteredInventory.length,
    totalMonthlyCost: filteredInventory.reduce((sum, resource) => sum + resource.monthlyRate, 0),
    riCoverage: Math.round((filteredInventory.filter(r => r.paymentModel === 'Reserved Instance').length / filteredInventory.length) * 100) || 0,
    potentialSavings: filteredInventory.reduce((sum, resource) => sum + (resource.costOptimization?.savings || 0), 0),
    locationBreakdown: enterpriseCustomerData.locations.map(loc => ({
      name: loc.name,
      code: loc.code,
      count: filteredInventory.filter(r => r.location === loc.code).length
    })),
    categoryBreakdown: ['Compute', 'Network', 'Security', 'Storage', 'Database'].map(cat => ({
      name: cat,
      count: filteredInventory.filter(r => r.category === cat).length,
      cost: filteredInventory.filter(r => r.category === cat).reduce((sum, r) => sum + r.monthlyRate, 0)
    }))
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Compute': Server,
      'Network': Network,
      'Security': Shield,
      'Storage': HardDrive,
      'Database': Database
    };
    return icons[category] || Server;
  };

  const getStatusColor = (status) => {
    const colors = {
      'running': 'text-green-600 bg-green-100',
      'active': 'text-green-600 bg-green-100',
      'online': 'text-green-600 bg-green-100',
      'stopped': 'text-red-600 bg-red-100',
      'inactive': 'text-red-600 bg-red-100',
      'offline': 'text-red-600 bg-red-100',
      'maintenance': 'text-yellow-600 bg-yellow-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const handleMacdOperation = (operation, resource) => {
    setMacdOperation(operation);
    setSelectedResource(resource);
    setShowMacdModal(true);
  };

  const renderTopologyView = () => {
    const locationGroups = enterpriseCustomerData.locations.map(location => ({
      ...location,
      resources: filteredInventory.filter(r => r.location === location.code)
    }));

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Network Topology View</h3>
          <p className="text-slate-600">Interactive visualization of your infrastructure across locations</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {locationGroups.map(location => (
            <Card key={location.code} className="border-2 hover:border-blue-300 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-sm">{location.name}</CardTitle>
                      <p className="text-xs text-slate-500">{location.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{location.resources.length}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Compute', 'Network', 'Security', 'Storage', 'Database'].map(category => {
                    const categoryResources = location.resources.filter(r => r.category === category);
                    const IconComponent = getCategoryIcon(category);
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-700">{category}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {categoryResources.length}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
                
                {/* Connection lines visualization */}
                <div className="mt-4 pt-3 border-t">
                  <div className="text-xs text-slate-500 text-center">
                    Connected to {enterpriseCustomerData.locations.length - 1} other sites
                  </div>
                  <div className="flex justify-center mt-2">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-200 to-green-200 rounded"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Connections Diagram */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Network className="w-5 h-5 mr-2 text-blue-600" />
              Inter-Site Connectivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-3">Primary Connections</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm">Mumbai ↔ Delhi</span>
                    <Badge className="bg-green-100 text-green-800">10 Gbps MPLS</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm">Mumbai ↔ Bangalore</span>
                    <Badge className="bg-green-100 text-green-800">10 Gbps MPLS</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm">Mumbai ↔ Chennai</span>
                    <Badge className="bg-blue-100 text-blue-800">1 Gbps VPN</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Backup Connections</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <span className="text-sm">Delhi ↔ Bangalore</span>
                    <Badge className="bg-orange-100 text-orange-800">Internet Backup</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                    <span className="text-sm">Bangalore ↔ Chennai</span>
                    <Badge className="bg-orange-100 text-orange-800">Internet Backup</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

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
              <h1 className="text-2xl font-bold">Enterprise Inventory Management</h1>
              <p className="text-blue-200">{enterpriseCustomerData.customerName} - Multi-Location Infrastructure</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-green-600 hover:bg-green-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Cost Optimization
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Summary Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Resources</p>
                  <p className="text-2xl font-bold text-blue-600">{summaryStats.totalResources}</p>
                </div>
                <Server className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Monthly Cost</p>
                  <p className="text-2xl font-bold text-green-600">₹{summaryStats.totalMonthlyCost.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">RI Coverage</p>
                  <p className="text-2xl font-bold text-purple-600">{summaryStats.riCoverage}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-600">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Potential Savings</p>
                  <p className="text-2xl font-bold text-orange-600">₹{summaryStats.potentialSavings.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-blue-600" />
              Advanced Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {enterpriseCustomerData.locations.map(loc => (
                    <SelectItem key={loc.code} value={loc.code}>{loc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                <SelectTrigger>
                  <SelectValue placeholder="All Environments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Environments</SelectItem>
                  {enterpriseCustomerData.environments.map(env => (
                    <SelectItem key={env.name} value={env.name}>{env.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Compute">Compute</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedPaymentModel} onValueChange={setSelectedPaymentModel}>
                <SelectTrigger>
                  <SelectValue placeholder="All Payment Models" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Models</SelectItem>
                  <SelectItem value="Pay As You Go">Pay As You Go</SelectItem>
                  <SelectItem value="Reserved Instance">Reserved Instance</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => {
                setSelectedLocation('all');
                setSelectedEnvironment('all');
                setSelectedCategory('all');
                setSelectedPaymentModel('all');
                setSearchQuery('');
              }}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* View Mode Tabs */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grid" className="flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span>Grid View</span>
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>List View</span>
            </TabsTrigger>
            <TabsTrigger value="topology" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Topology View</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInventory.map(resource => {
                const IconComponent = getCategoryIcon(resource.category);
                return (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                          <div>
                            <CardTitle className="text-sm">{resource.name}</CardTitle>
                            <p className="text-xs text-slate-500 font-mono">{resource.sku}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(resource.status)}>
                          {resource.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Location:</span>
                          <span className="font-medium">{resource.locationName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Environment:</span>
                          <Badge variant="outline">{resource.environment}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Monthly Cost:</span>
                          <span className="font-semibold text-green-600">₹{resource.monthlyRate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Payment:</span>
                          <Badge variant={resource.paymentModel === 'Reserved Instance' ? 'default' : 'secondary'}>
                            {resource.paymentModel === 'Reserved Instance' ? 'RI' : 'PAYG'}
                          </Badge>
                        </div>
                        
                        {/* Utilization bars */}
                        {resource.utilization && (
                          <div className="space-y-2">
                            {Object.entries(resource.utilization).map(([metric, value]) => (
                              <div key={metric}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="capitalize">{metric}</span>
                                  <span>{value}%</span>
                                </div>
                                <Progress value={value} className="h-1" />
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Cost optimization alert */}
                        {resource.costOptimization && (
                          <div className="p-2 bg-orange-50 border border-orange-200 rounded text-xs">
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3 text-orange-600" />
                              <span className="text-orange-800">{resource.costOptimization.potential}</span>
                            </div>
                            <div className="text-orange-600 mt-1">
                              Save ₹{resource.costOptimization.savings.toLocaleString()}/month
                            </div>
                          </div>
                        )}
                        
                        {/* RI Expiry warning */}
                        {resource.riExpiry && new Date(resource.riExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
                          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs">
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="w-3 h-3 text-yellow-600" />
                              <span className="text-yellow-800">RI expires in {Math.ceil((new Date(resource.riExpiry) - new Date()) / (24 * 60 * 60 * 1000))} days</span>
                            </div>
                          </div>
                        )}
                        
                        {/* MACD Operations */}
                        <div className="flex justify-between items-center pt-2 border-t">
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleMacdOperation('move', resource)}
                              className="text-xs px-2 py-1"
                            >
                              <Move className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleMacdOperation('add', resource)}
                              className="text-xs px-2 py-1"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleMacdOperation('change', resource)}
                              className="text-xs px-2 py-1"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => handleMacdOperation('delete', resource)}
                              className="text-xs px-2 py-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold">Resource</th>
                        <th className="text-left p-4 font-semibold">Category</th>
                        <th className="text-left p-4 font-semibold">Location</th>
                        <th className="text-left p-4 font-semibold">Environment</th>
                        <th className="text-left p-4 font-semibold">Status</th>
                        <th className="text-left p-4 font-semibold">Payment</th>
                        <th className="text-left p-4 font-semibold">Monthly Cost</th>
                        <th className="text-left p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInventory.map(resource => {
                        const IconComponent = getCategoryIcon(resource.category);
                        return (
                          <tr key={resource.id} className="border-b hover:bg-slate-50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <IconComponent className="w-5 h-5 text-blue-600" />
                                <div>
                                  <div className="font-medium">{resource.name}</div>
                                  <div className="text-sm text-slate-500 font-mono">{resource.sku}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline">{resource.category}</Badge>
                            </td>
                            <td className="p-4">{resource.locationName}</td>
                            <td className="p-4">
                              <Badge variant="secondary">{resource.environment}</Badge>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(resource.status)}>
                                {resource.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <Badge variant={resource.paymentModel === 'Reserved Instance' ? 'default' : 'secondary'}>
                                {resource.paymentModel === 'Reserved Instance' ? 'RI' : 'PAYG'}
                              </Badge>
                            </td>
                            <td className="p-4 font-semibold text-green-600">
                              ₹{resource.monthlyRate.toLocaleString()}
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-1">
                                <Button size="sm" variant="outline" onClick={() => handleMacdOperation('move', resource)}>
                                  <Move className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleMacdOperation('change', resource)}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Eye className="w-3 h-3" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topology" className="mt-6">
            {renderTopologyView()}
          </TabsContent>
        </Tabs>

        {/* MACD Modal */}
        {showMacdModal && selectedResource && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>MACD Operation: {macdOperation.toUpperCase()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Resource: {selectedResource.name}</p>
                  <p className="text-sm text-slate-600">SKU: {selectedResource.sku}</p>
                </div>
                
                {macdOperation === 'move' && (
                  <div>
                    <label className="text-sm font-medium">Move to Location:</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {enterpriseCustomerData.locations.map(loc => (
                          <SelectItem key={loc.code} value={loc.code}>{loc.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {macdOperation === 'change' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">New Configuration:</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select new SKU" />
                        </SelectTrigger>
                        <SelectContent>
                          {allSkus.filter(s => s.category === selectedResource.category).map(sku => (
                            <SelectItem key={sku.sku} value={sku.sku}>{sku.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowMacdModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    // Handle MACD operation
                    setShowMacdModal(false);
                  }}>
                    Execute {macdOperation.toUpperCase()}
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

export default EnterpriseInventoryView;

