// CI-* SKU Data Structure - Following Technical Documentation
// Maintains CI-* prefix with PAYG/RI payment models and MDS support

export const PAYMENT_MODELS = {
  PAYG: {
    code: 'PAYG',
    name: 'Pay As You Go',
    description: 'Flexible hourly billing with no commitments',
    commitmentMonths: 0,
    discountPercentage: 0,
    upfrontOptions: ['none'],
    features: ['No commitment', 'Hourly billing', 'Maximum flexibility', 'Immediate termination']
  },
  RI1Y: {
    code: 'RI1Y',
    name: 'Reserved Instance 1 Year',
    description: '1-year commitment with significant savings',
    commitmentMonths: 12,
    discountPercentage: 20,
    upfrontOptions: ['none', 'partial', 'full'],
    features: ['20% savings', '1-year commitment', 'Capacity reservation', 'Transferable']
  },
  RI3Y: {
    code: 'RI3Y',
    name: 'Reserved Instance 3 Year',
    description: '3-year commitment with maximum savings',
    commitmentMonths: 36,
    discountPercentage: 40,
    upfrontOptions: ['none', 'partial', 'full'],
    features: ['40% savings', '3-year commitment', 'Maximum discount', 'Transferable']
  }
}

export const SERVICE_CATEGORIES = {
  COMP: 'Compute',
  STOR: 'Storage',
  NET: 'Network',
  DB: 'Database',
  SEC: 'Security',
  MON: 'Monitoring',
  BAK: 'Backup'
}

export const TENANCY_TYPES = {
  SHARED: 'Shared Infrastructure',
  DEDICATED: 'Dedicated Infrastructure',
  MDS: 'Managed Dedicated Service'
}

export const LOCATIONS = {
  MUM: 'Mumbai',
  DEL: 'Delhi',
  BLR: 'Bangalore',
  CHE: 'Chennai',
  HYD: 'Hyderabad',
  PUN: 'Pune',
  KOL: 'Kolkata',
  AHM: 'Ahmedabad'
}

// CI-* SKU Catalog with PAYG/RI pricing
export const SKU_CATALOG = [
  // Compute Services
  {
    sku: 'CI-COMP-SHARED-S-MUM',
    name: 'Small Shared Compute - Mumbai',
    category: 'COMP',
    type: 'SHARED',
    size: 'S',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      vcpu: 2,
      memory: '4 GB',
      storage: '50 GB SSD',
      network: '1 Gbps'
    },
    pricing: {
      PAYG: { monthly: 2500, hourly: 3.47 },
      RI1Y: { monthly: 2000, hourly: 2.78, upfront: 0 },
      RI3Y: { monthly: 1500, hourly: 2.08, upfront: 0 }
    },
    floorPrice: 1200,
    isStandard: true,
    description: 'Small shared compute instance suitable for development and testing'
  },
  {
    sku: 'CI-COMP-SHARED-M-MUM',
    name: 'Medium Shared Compute - Mumbai',
    category: 'COMP',
    type: 'SHARED',
    size: 'M',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      vcpu: 4,
      memory: '8 GB',
      storage: '100 GB SSD',
      network: '2 Gbps'
    },
    pricing: {
      PAYG: { monthly: 4500, hourly: 6.25 },
      RI1Y: { monthly: 3600, hourly: 5.00, upfront: 0 },
      RI3Y: { monthly: 2700, hourly: 3.75, upfront: 0 }
    },
    floorPrice: 2200,
    isStandard: true,
    description: 'Medium shared compute instance for production workloads'
  },
  {
    sku: 'CI-COMP-SHARED-L-MUM',
    name: 'Large Shared Compute - Mumbai',
    category: 'COMP',
    type: 'SHARED',
    size: 'L',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      vcpu: 8,
      memory: '16 GB',
      storage: '200 GB SSD',
      network: '5 Gbps'
    },
    pricing: {
      PAYG: { monthly: 8500, hourly: 11.81 },
      RI1Y: { monthly: 6800, hourly: 9.44, upfront: 0 },
      RI3Y: { monthly: 5100, hourly: 7.08, upfront: 0 }
    },
    floorPrice: 4200,
    isStandard: true,
    description: 'Large shared compute instance for high-performance applications'
  },
  {
    sku: 'CI-COMP-MDS-GPU-MUM',
    name: 'GPU Managed Dedicated Service - Mumbai',
    category: 'COMP',
    type: 'MDS',
    size: 'GPU',
    location: 'MUM',
    tenancy: 'MDS',
    specifications: {
      vcpu: 16,
      memory: '64 GB',
      storage: '500 GB NVMe',
      network: '10 Gbps',
      gpu: 'NVIDIA V100',
      dedicated: true
    },
    pricing: {
      PAYG: { monthly: 45000, hourly: 62.50 },
      RI1Y: { monthly: 36000, hourly: 50.00, upfront: 0 },
      RI3Y: { monthly: 27000, hourly: 37.50, upfront: 0 }
    },
    floorPrice: 22000,
    isStandard: true,
    description: 'Dedicated GPU instance with premium SLA and dedicated support'
  },

  // Storage Services
  {
    sku: 'CI-STOR-BLOCK-100GB-MUM',
    name: 'Block Storage 100GB - Mumbai',
    category: 'STOR',
    type: 'BLOCK',
    size: '100GB',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      capacity: '100 GB',
      type: 'SSD',
      iops: '3000',
      throughput: '125 MB/s'
    },
    pricing: {
      PAYG: { monthly: 800, hourly: 1.11 },
      RI1Y: { monthly: 640, hourly: 0.89, upfront: 0 },
      RI3Y: { monthly: 480, hourly: 0.67, upfront: 0 }
    },
    floorPrice: 400,
    isStandard: true,
    description: 'High-performance SSD block storage'
  },
  {
    sku: 'CI-STOR-BLOCK-1TB-MUM',
    name: 'Block Storage 1TB - Mumbai',
    category: 'STOR',
    type: 'BLOCK',
    size: '1TB',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      capacity: '1 TB',
      type: 'SSD',
      iops: '10000',
      throughput: '500 MB/s'
    },
    pricing: {
      PAYG: { monthly: 6500, hourly: 9.03 },
      RI1Y: { monthly: 5200, hourly: 7.22, upfront: 0 },
      RI3Y: { monthly: 3900, hourly: 5.42, upfront: 0 }
    },
    floorPrice: 3200,
    isStandard: true,
    description: 'Enterprise-grade 1TB SSD block storage'
  },
  {
    sku: 'CI-STOR-MDS-10TB-MUM',
    name: 'Managed Dedicated Storage 10TB - Mumbai',
    category: 'STOR',
    type: 'MDS',
    size: '10TB',
    location: 'MUM',
    tenancy: 'MDS',
    specifications: {
      capacity: '10 TB',
      type: 'NVMe',
      iops: '50000',
      throughput: '2 GB/s',
      dedicated: true,
      backup: 'Included',
      replication: '3-way'
    },
    pricing: {
      PAYG: { monthly: 35000, hourly: 48.61 },
      RI1Y: { monthly: 28000, hourly: 38.89, upfront: 0 },
      RI3Y: { monthly: 21000, hourly: 29.17, upfront: 0 }
    },
    floorPrice: 18000,
    isStandard: true,
    description: 'Premium dedicated storage with enterprise features'
  },

  // Database Services
  {
    sku: 'CI-DB-MYSQL-M-MUM',
    name: 'MySQL Database Medium - Mumbai',
    category: 'DB',
    type: 'MYSQL',
    size: 'M',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      engine: 'MySQL 8.0',
      vcpu: 4,
      memory: '16 GB',
      storage: '200 GB SSD',
      connections: '1000'
    },
    pricing: {
      PAYG: { monthly: 12000, hourly: 16.67 },
      RI1Y: { monthly: 9600, hourly: 13.33, upfront: 0 },
      RI3Y: { monthly: 7200, hourly: 10.00, upfront: 0 }
    },
    floorPrice: 6000,
    isStandard: true,
    description: 'Managed MySQL database with automated backups'
  },
  {
    sku: 'CI-DB-POSTGRES-L-MUM',
    name: 'PostgreSQL Database Large - Mumbai',
    category: 'DB',
    type: 'POSTGRES',
    size: 'L',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      engine: 'PostgreSQL 14',
      vcpu: 8,
      memory: '32 GB',
      storage: '500 GB SSD',
      connections: '2000'
    },
    pricing: {
      PAYG: { monthly: 22000, hourly: 30.56 },
      RI1Y: { monthly: 17600, hourly: 24.44, upfront: 0 },
      RI3Y: { monthly: 13200, hourly: 18.33, upfront: 0 }
    },
    floorPrice: 11000,
    isStandard: true,
    description: 'High-performance PostgreSQL with advanced features'
  },

  // Network Services
  {
    sku: 'CI-NET-LB-BASIC-MUM',
    name: 'Basic Load Balancer - Mumbai',
    category: 'NET',
    type: 'LB',
    size: 'BASIC',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      type: 'Application Load Balancer',
      throughput: '1 Gbps',
      ssl: 'Included',
      healthChecks: 'Basic'
    },
    pricing: {
      PAYG: { monthly: 3500, hourly: 4.86 },
      RI1Y: { monthly: 2800, hourly: 3.89, upfront: 0 },
      RI3Y: { monthly: 2100, hourly: 2.92, upfront: 0 }
    },
    floorPrice: 1800,
    isStandard: true,
    description: 'Basic application load balancer with SSL termination'
  },
  {
    sku: 'CI-NET-VPN-SITE2SITE-MUM',
    name: 'Site-to-Site VPN - Mumbai',
    category: 'NET',
    type: 'VPN',
    size: 'SITE2SITE',
    location: 'MUM',
    tenancy: 'SHARED',
    specifications: {
      type: 'Site-to-Site VPN',
      throughput: '500 Mbps',
      encryption: 'AES-256',
      tunnels: '2'
    },
    pricing: {
      PAYG: { monthly: 5500, hourly: 7.64 },
      RI1Y: { monthly: 4400, hourly: 6.11, upfront: 0 },
      RI3Y: { monthly: 3300, hourly: 4.58, upfront: 0 }
    },
    floorPrice: 2800,
    isStandard: true,
    description: 'Secure site-to-site VPN connectivity'
  }
]

// MACD Operations Configuration
export const MACD_OPERATIONS = {
  MOVE: {
    code: 'MOVE',
    name: 'Move Resource',
    description: 'Migrate resources between locations or environments',
    icon: 'ArrowRightLeft',
    requiresApproval: true,
    estimatedDuration: 120,
    riskLevel: 'medium'
  },
  ADD: {
    code: 'ADD',
    name: 'Add Resource',
    description: 'Provision new resources or expand capacity',
    icon: 'Plus',
    requiresApproval: false,
    estimatedDuration: 30,
    riskLevel: 'low'
  },
  CHANGE: {
    code: 'CHANGE',
    name: 'Change Configuration',
    description: 'Modify resource specifications or settings',
    icon: 'Settings',
    requiresApproval: true,
    estimatedDuration: 60,
    riskLevel: 'medium'
  },
  DELETE: {
    code: 'DELETE',
    name: 'Delete Resource',
    description: 'Safely decommission and remove resources',
    icon: 'Trash2',
    requiresApproval: true,
    estimatedDuration: 45,
    riskLevel: 'high'
  }
}

// Sample Customer Inventory Data
export const SAMPLE_INVENTORY = [
  {
    id: 'res-001',
    resourceName: 'Web Server Cluster',
    sku: 'CI-COMP-SHARED-M-MUM',
    customer: 'Max Healthcare',
    status: 'running',
    paymentModel: 'PAYG',
    monthlyRate: 4500,
    riExpiry: null,
    location: 'Mumbai',
    specifications: {
      vcpu: 4,
      memory: '8 GB',
      storage: '100 GB SSD'
    },
    usage: {
      cpu: 65,
      memory: 78,
      storage: 45
    },
    potentialSavings: 900, // Monthly savings if switched to RI1Y
    lastModified: '2024-12-28T10:30:00Z',
    tags: ['production', 'web-tier']
  },
  {
    id: 'res-002',
    resourceName: 'Database Primary',
    sku: 'CI-DB-MYSQL-M-MUM',
    customer: 'Max Healthcare',
    status: 'running',
    paymentModel: 'RI1Y',
    monthlyRate: 9600,
    riExpiry: '2025-08-15',
    location: 'Mumbai',
    specifications: {
      engine: 'MySQL 8.0',
      vcpu: 4,
      memory: '16 GB',
      storage: '200 GB SSD'
    },
    usage: {
      cpu: 45,
      memory: 82,
      storage: 67
    },
    potentialSavings: 0, // Already on RI
    lastModified: '2024-12-27T15:45:00Z',
    tags: ['production', 'database']
  },
  {
    id: 'res-003',
    resourceName: 'GPU Training Cluster',
    sku: 'CI-COMP-MDS-GPU-MUM',
    customer: 'Max Healthcare',
    status: 'running',
    paymentModel: 'PAYG',
    monthlyRate: 45000,
    riExpiry: null,
    location: 'Mumbai',
    specifications: {
      vcpu: 16,
      memory: '64 GB',
      storage: '500 GB NVMe',
      gpu: 'NVIDIA V100'
    },
    usage: {
      cpu: 85,
      memory: 92,
      storage: 34,
      gpu: 78
    },
    potentialSavings: 9000, // Significant savings potential
    lastModified: '2024-12-28T09:15:00Z',
    tags: ['ai-ml', 'gpu', 'mds']
  },
  {
    id: 'res-004',
    resourceName: 'Backup Storage',
    sku: 'CI-STOR-BLOCK-1TB-MUM',
    customer: 'Max Healthcare',
    status: 'running',
    paymentModel: 'RI3Y',
    monthlyRate: 3900,
    riExpiry: '2026-12-31',
    location: 'Mumbai',
    specifications: {
      capacity: '1 TB',
      type: 'SSD',
      iops: '10000'
    },
    usage: {
      storage: 78
    },
    potentialSavings: 0, // Already on best RI plan
    lastModified: '2024-12-26T14:20:00Z',
    tags: ['backup', 'storage']
  }
]

// Cost Optimization Recommendations
export const COST_OPTIMIZATION_RECOMMENDATIONS = [
  {
    id: 'rec-001',
    resourceId: 'res-001',
    type: 'payment_model_upgrade',
    title: 'Switch to Reserved Instance',
    description: 'Save ₹900/month by switching to RI 1-Year plan',
    potentialSavings: 900,
    annualSavings: 10800,
    effort: 'low',
    riskLevel: 'low',
    implementation: 'Immediate - no downtime required'
  },
  {
    id: 'rec-002',
    resourceId: 'res-003',
    type: 'payment_model_upgrade',
    title: 'Consider Reserved Instance for GPU',
    description: 'Save ₹9,000/month with RI 1-Year commitment',
    potentialSavings: 9000,
    annualSavings: 108000,
    effort: 'low',
    riskLevel: 'low',
    implementation: 'Requires commitment planning'
  },
  {
    id: 'rec-003',
    resourceId: 'res-001',
    type: 'rightsizing',
    title: 'Consider Downsizing',
    description: 'CPU usage consistently below 70% - consider smaller instance',
    potentialSavings: 1500,
    annualSavings: 18000,
    effort: 'medium',
    riskLevel: 'medium',
    implementation: 'Requires testing and migration'
  }
]

export default {
  PAYMENT_MODELS,
  SERVICE_CATEGORIES,
  TENANCY_TYPES,
  LOCATIONS,
  SKU_CATALOG,
  MACD_OPERATIONS,
  SAMPLE_INVENTORY,
  COST_OPTIMIZATION_RECOMMENDATIONS
}

