// Comprehensive SKU Data with Legacy Mapping
// Enhanced for enterprise scenarios with realistic pricing

export const expandedSkuData = {
  // Compute Services
  compute: [
    {
      sku: 'CI-COMP-SHARED-S-MUM',
      legacySku: 'VPI-SMALL-MUM',
      name: 'Small Shared Compute',
      description: 'Entry-level shared compute instance for development workloads',
      category: 'Compute',
      subcategory: 'Shared Virtual Machines',
      specifications: {
        vCPU: 2,
        memory: '4 GB',
        storage: '50 GB SSD',
        network: '1 Gbps'
      },
      pricing: {
        payg: 2500,
        ri1Year: 2000,
        ri3Year: 1750,
        setupFee: 5000,
        floorPrice: 2000
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['development', 'testing', 'small-workload']
    },
    {
      sku: 'CI-COMP-SHARED-M-MUM',
      legacySku: 'VPI-MEDIUM-MUM',
      name: 'Medium Shared Compute',
      description: 'Medium shared compute instance for production workloads',
      category: 'Compute',
      subcategory: 'Shared Virtual Machines',
      specifications: {
        vCPU: 4,
        memory: '8 GB',
        storage: '100 GB SSD',
        network: '1 Gbps'
      },
      pricing: {
        payg: 4500,
        ri1Year: 3600,
        ri3Year: 3150,
        setupFee: 8000,
        floorPrice: 3600
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['production', 'web-server', 'application']
    },
    {
      sku: 'CI-COMP-SHARED-L-MUM',
      legacySku: 'VPI-LARGE-MUM',
      name: 'Large Shared Compute',
      description: 'Large shared compute instance for high-performance applications',
      category: 'Compute',
      subcategory: 'Shared Virtual Machines',
      specifications: {
        vCPU: 8,
        memory: '16 GB',
        storage: '200 GB SSD',
        network: '10 Gbps'
      },
      pricing: {
        payg: 8500,
        ri1Year: 6800,
        ri3Year: 5950,
        setupFee: 12000,
        floorPrice: 6800
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['high-performance', 'enterprise', 'scalable']
    },
    {
      sku: 'CI-COMP-DEDICATED-M-MUM',
      legacySku: 'VPE-MEDIUM-MUM',
      name: 'Medium Dedicated Server',
      description: 'Dedicated physical server for mission-critical applications',
      category: 'Compute',
      subcategory: 'Dedicated Servers',
      specifications: {
        vCPU: 16,
        memory: '32 GB',
        storage: '500 GB NVMe',
        network: '10 Gbps'
      },
      pricing: {
        payg: 25000,
        ri1Year: 20000,
        ri3Year: 17500,
        setupFee: 25000,
        floorPrice: 20000
      },
      location: ['Mumbai', 'Delhi', 'Bangalore'],
      tags: ['dedicated', 'high-security', 'compliance']
    },
    {
      sku: 'CI-COMP-GPU-AI-MUM',
      legacySku: 'GPU-V100-MUM',
      name: 'AI/ML GPU Cluster',
      description: 'High-performance GPU instance for AI/ML workloads',
      category: 'Compute',
      subcategory: 'GPU Computing',
      specifications: {
        vCPU: 16,
        memory: '64 GB',
        storage: '1 TB NVMe',
        gpu: 'NVIDIA V100',
        network: '25 Gbps'
      },
      pricing: {
        payg: 45000,
        ri1Year: 36000,
        ri3Year: 31500,
        setupFee: 50000,
        floorPrice: 36000
      },
      location: ['Mumbai', 'Bangalore'],
      tags: ['ai', 'ml', 'gpu', 'high-performance']
    },
    {
      sku: 'CI-COMP-VDI-STANDARD-MUM',
      legacySku: 'VDI-STD-MUM',
      name: 'Standard VDI Desktop',
      description: 'Virtual desktop infrastructure for remote work',
      category: 'Compute',
      subcategory: 'Virtual Desktop',
      specifications: {
        vCPU: 2,
        memory: '4 GB',
        storage: '100 GB',
        os: 'Windows 10/11'
      },
      pricing: {
        payg: 3500,
        ri1Year: 2800,
        ri3Year: 2450,
        setupFee: 2000,
        floorPrice: 2800
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['vdi', 'remote-work', 'desktop']
    }
  ],

  // Network Services
  network: [
    {
      sku: 'CI-NET-LB-BASIC-MUM',
      legacySku: 'LB-BASIC-MUM',
      name: 'Basic Load Balancer',
      description: 'Layer 4 load balancer with SSL termination',
      category: 'Network',
      subcategory: 'Load Balancing',
      specifications: {
        throughput: '1 Gbps',
        connections: '10,000',
        ssl: 'Yes',
        healthCheck: 'Yes'
      },
      pricing: {
        payg: 3500,
        ri1Year: 2800,
        ri3Year: 2450,
        setupFee: 5000,
        floorPrice: 2800
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['load-balancer', 'high-availability', 'ssl']
    },
    {
      sku: 'CI-NET-LB-ADVANCED-MUM',
      legacySku: 'LB-ADV-MUM',
      name: 'Advanced Load Balancer',
      description: 'Layer 7 load balancer with WAF and advanced routing',
      category: 'Network',
      subcategory: 'Load Balancing',
      specifications: {
        throughput: '10 Gbps',
        connections: '100,000',
        ssl: 'Yes',
        waf: 'Yes',
        routing: 'Advanced'
      },
      pricing: {
        payg: 8500,
        ri1Year: 6800,
        ri3Year: 5950,
        setupFee: 10000,
        floorPrice: 6800
      },
      location: ['Mumbai', 'Delhi', 'Bangalore'],
      tags: ['advanced-lb', 'waf', 'enterprise']
    },
    {
      sku: 'CI-NET-VPN-SITE2SITE-MUM',
      legacySku: 'VPN-S2S-MUM',
      name: 'Site-to-Site VPN',
      description: 'Secure site-to-site VPN connectivity',
      category: 'Network',
      subcategory: 'VPN Services',
      specifications: {
        bandwidth: '100 Mbps',
        encryption: 'AES-256',
        tunnels: '5',
        redundancy: 'Yes'
      },
      pricing: {
        payg: 5500,
        ri1Year: 4400,
        ri3Year: 3850,
        setupFee: 8000,
        floorPrice: 4400
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['vpn', 'secure-connectivity', 'site-to-site']
    },
    {
      sku: 'CI-NET-CDN-BASIC-MUM',
      legacySku: 'CDN-BASIC-MUM',
      name: 'Basic CDN Service',
      description: 'Content delivery network with global PoPs',
      category: 'Network',
      subcategory: 'Content Delivery',
      specifications: {
        bandwidth: '1 TB/month',
        pops: '50+',
        ssl: 'Yes',
        caching: 'Static'
      },
      pricing: {
        payg: 2500,
        ri1Year: 2000,
        ri3Year: 1750,
        setupFee: 3000,
        floorPrice: 2000
      },
      location: ['Global'],
      tags: ['cdn', 'performance', 'global']
    },
    {
      sku: 'CI-NET-MPLS-10M-MUM',
      legacySku: 'MPLS-10M-MUM',
      name: '10 Mbps MPLS Link',
      description: 'Dedicated MPLS connectivity for enterprise',
      category: 'Network',
      subcategory: 'Dedicated Connectivity',
      specifications: {
        bandwidth: '10 Mbps',
        sla: '99.9%',
        latency: '<5ms',
        redundancy: 'Optional'
      },
      pricing: {
        payg: 15000,
        ri1Year: 12000,
        ri3Year: 10500,
        setupFee: 25000,
        floorPrice: 12000
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['mpls', 'dedicated', 'enterprise']
    }
  ],

  // Security Services
  security: [
    {
      sku: 'CI-SEC-FW-BASIC-MUM',
      legacySku: 'FW-BASIC-MUM',
      name: 'Basic Firewall',
      description: 'Stateful firewall with basic threat protection',
      category: 'Security',
      subcategory: 'Firewall',
      specifications: {
        throughput: '1 Gbps',
        rules: '1,000',
        vpn: 'Yes',
        logging: 'Basic'
      },
      pricing: {
        payg: 4500,
        ri1Year: 3600,
        ri3Year: 3150,
        setupFee: 6000,
        floorPrice: 3600
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['firewall', 'security', 'basic-protection']
    },
    {
      sku: 'CI-SEC-FW-NGFW-MUM',
      legacySku: 'FW-NGFW-MUM',
      name: 'Next-Gen Firewall',
      description: 'Advanced firewall with IPS, anti-malware, and application control',
      category: 'Security',
      subcategory: 'Firewall',
      specifications: {
        throughput: '10 Gbps',
        rules: '10,000',
        ips: 'Yes',
        antimalware: 'Yes',
        appControl: 'Yes'
      },
      pricing: {
        payg: 12500,
        ri1Year: 10000,
        ri3Year: 8750,
        setupFee: 15000,
        floorPrice: 10000
      },
      location: ['Mumbai', 'Delhi', 'Bangalore'],
      tags: ['ngfw', 'advanced-security', 'ips']
    },
    {
      sku: 'CI-SEC-DDOS-BASIC-MUM',
      legacySku: 'DDOS-BASIC-MUM',
      name: 'Basic DDoS Protection',
      description: 'Basic DDoS protection for web applications',
      category: 'Security',
      subcategory: 'DDoS Protection',
      specifications: {
        protection: '10 Gbps',
        mitigation: 'Automatic',
        reporting: 'Yes',
        sla: '99.9%'
      },
      pricing: {
        payg: 6500,
        ri1Year: 5200,
        ri3Year: 4550,
        setupFee: 8000,
        floorPrice: 5200
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['ddos', 'protection', 'web-security']
    },
    {
      sku: 'CI-SEC-SSL-WILDCARD-MUM',
      legacySku: 'SSL-WILD-MUM',
      name: 'Wildcard SSL Certificate',
      description: 'Wildcard SSL certificate with domain validation',
      category: 'Security',
      subcategory: 'SSL Certificates',
      specifications: {
        type: 'Wildcard',
        validation: 'Domain',
        warranty: '$1M',
        validity: '1 Year'
      },
      pricing: {
        payg: 1200,
        ri1Year: 960,
        ri3Year: 840,
        setupFee: 500,
        floorPrice: 960
      },
      location: ['Global'],
      tags: ['ssl', 'certificate', 'wildcard']
    },
    {
      sku: 'CI-SEC-AV-ENTERPRISE-MUM',
      legacySku: 'AV-ENT-MUM',
      name: 'Enterprise Antivirus',
      description: 'Enterprise-grade antivirus with centralized management',
      category: 'Security',
      subcategory: 'Endpoint Security',
      specifications: {
        endpoints: '100',
        realtime: 'Yes',
        management: 'Centralized',
        updates: 'Automatic'
      },
      pricing: {
        payg: 2500,
        ri1Year: 2000,
        ri3Year: 1750,
        setupFee: 2000,
        floorPrice: 2000
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['antivirus', 'endpoint', 'enterprise']
    }
  ],

  // Storage Services
  storage: [
    {
      sku: 'CI-STOR-BLOCK-1TB-MUM',
      legacySku: 'STOR-BLK-1TB-MUM',
      name: '1TB Block Storage',
      description: 'High-performance SSD block storage',
      category: 'Storage',
      subcategory: 'Block Storage',
      specifications: {
        capacity: '1 TB',
        type: 'SSD',
        iops: '3,000',
        throughput: '125 MB/s'
      },
      pricing: {
        payg: 6500,
        ri1Year: 5200,
        ri3Year: 4550,
        setupFee: 2000,
        floorPrice: 5200
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['storage', 'block', 'ssd']
    },
    {
      sku: 'CI-STOR-OBJECT-1TB-MUM',
      legacySku: 'STOR-OBJ-1TB-MUM',
      name: '1TB Object Storage',
      description: 'Scalable object storage with S3 compatibility',
      category: 'Storage',
      subcategory: 'Object Storage',
      specifications: {
        capacity: '1 TB',
        api: 'S3 Compatible',
        durability: '99.999999999%',
        availability: '99.9%'
      },
      pricing: {
        payg: 3500,
        ri1Year: 2800,
        ri3Year: 2450,
        setupFee: 1000,
        floorPrice: 2800
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['storage', 'object', 's3']
    },
    {
      sku: 'CI-STOR-BACKUP-100GB-MUM',
      legacySku: 'BACKUP-100GB-MUM',
      name: '100GB Backup Storage',
      description: 'Automated backup storage with 30-day retention',
      category: 'Storage',
      subcategory: 'Backup',
      specifications: {
        capacity: '100 GB',
        retention: '30 days',
        automation: 'Yes',
        encryption: 'AES-256'
      },
      pricing: {
        payg: 800,
        ri1Year: 640,
        ri3Year: 560,
        setupFee: 500,
        floorPrice: 640
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['backup', 'automated', 'retention']
    }
  ],

  // Database Services
  database: [
    {
      sku: 'CI-DB-MYSQL-M-MUM',
      legacySku: 'DB-MYSQL-M-MUM',
      name: 'Managed MySQL Database',
      description: 'Managed MySQL database with automated backups',
      category: 'Database',
      subcategory: 'Relational Database',
      specifications: {
        vCPU: 4,
        memory: '16 GB',
        storage: '200 GB SSD',
        version: 'MySQL 8.0',
        backups: 'Automated'
      },
      pricing: {
        payg: 12000,
        ri1Year: 9600,
        ri3Year: 8400,
        setupFee: 5000,
        floorPrice: 9600
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['database', 'mysql', 'managed']
    },
    {
      sku: 'CI-DB-POSTGRES-M-MUM',
      legacySku: 'DB-PGSQL-M-MUM',
      name: 'Managed PostgreSQL Database',
      description: 'Managed PostgreSQL database with high availability',
      category: 'Database',
      subcategory: 'Relational Database',
      specifications: {
        vCPU: 4,
        memory: '16 GB',
        storage: '200 GB SSD',
        version: 'PostgreSQL 14',
        ha: 'Yes'
      },
      pricing: {
        payg: 13500,
        ri1Year: 10800,
        ri3Year: 9450,
        setupFee: 5000,
        floorPrice: 10800
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['database', 'postgresql', 'ha']
    },
    {
      sku: 'CI-DB-MONGODB-M-MUM',
      legacySku: 'DB-MONGO-M-MUM',
      name: 'Managed MongoDB',
      description: 'Managed MongoDB with replica sets',
      category: 'Database',
      subcategory: 'NoSQL Database',
      specifications: {
        vCPU: 4,
        memory: '16 GB',
        storage: '200 GB SSD',
        version: 'MongoDB 6.0',
        replication: 'Yes'
      },
      pricing: {
        payg: 15000,
        ri1Year: 12000,
        ri3Year: 10500,
        setupFee: 6000,
        floorPrice: 12000
      },
      location: ['Mumbai', 'Delhi', 'Bangalore'],
      tags: ['database', 'mongodb', 'nosql']
    },
    {
      sku: 'CI-DB-GRAPHDB-M-MUM',
      legacySku: 'DB-GRAPH-M-MUM',
      name: 'Managed Graph Database',
      description: 'Neo4j-based graph database for complex relationships',
      category: 'Database',
      subcategory: 'Graph Database',
      specifications: {
        vCPU: 8,
        memory: '32 GB',
        storage: '500 GB SSD',
        version: 'Neo4j 5.0',
        clustering: 'Yes'
      },
      pricing: {
        payg: 25000,
        ri1Year: 20000,
        ri3Year: 17500,
        setupFee: 10000,
        floorPrice: 20000
      },
      location: ['Mumbai', 'Bangalore'],
      tags: ['database', 'graph', 'neo4j']
    }
  ],

  // Managed Services
  managed: [
    {
      sku: 'CI-MON-BASIC-MUM',
      legacySku: 'MON-BASIC-MUM',
      name: 'Basic Infrastructure Monitoring',
      description: 'Basic infrastructure monitoring with alerts',
      category: 'Managed Services',
      subcategory: 'Monitoring',
      specifications: {
        metrics: '100+',
        alerts: 'Email/SMS',
        dashboard: 'Yes',
        retention: '30 days'
      },
      pricing: {
        payg: 1500,
        ri1Year: 1200,
        ri3Year: 1050,
        setupFee: 2000,
        floorPrice: 1200
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['monitoring', 'alerts', 'infrastructure']
    },
    {
      sku: 'CI-MON-ADVANCED-MUM',
      legacySku: 'MON-ADV-MUM',
      name: 'Advanced APM Monitoring',
      description: 'Application performance monitoring with AI insights',
      category: 'Managed Services',
      subcategory: 'Monitoring',
      specifications: {
        metrics: '1000+',
        apm: 'Yes',
        ai: 'Anomaly Detection',
        retention: '90 days'
      },
      pricing: {
        payg: 4500,
        ri1Year: 3600,
        ri3Year: 3150,
        setupFee: 5000,
        floorPrice: 3600
      },
      location: ['Mumbai', 'Delhi', 'Bangalore'],
      tags: ['apm', 'ai', 'advanced-monitoring']
    },
    {
      sku: 'CI-BACKUP-MANAGED-MUM',
      legacySku: 'BACKUP-MGD-MUM',
      name: 'Managed Backup Service',
      description: 'Fully managed backup with disaster recovery',
      category: 'Managed Services',
      subcategory: 'Backup & Recovery',
      specifications: {
        frequency: 'Daily',
        retention: '90 days',
        recovery: 'Point-in-time',
        testing: 'Monthly'
      },
      pricing: {
        payg: 3500,
        ri1Year: 2800,
        ri3Year: 2450,
        setupFee: 3000,
        floorPrice: 2800
      },
      location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
      tags: ['backup', 'disaster-recovery', 'managed']
    },
    {
      sku: 'CI-DEVOPS-CICD-MUM',
      legacySku: 'DEVOPS-CICD-MUM',
      name: 'CI/CD Pipeline Service',
      description: 'Managed CI/CD pipeline with GitOps',
      category: 'Managed Services',
      subcategory: 'DevOps',
      specifications: {
        pipelines: '10',
        git: 'GitLab/GitHub',
        containers: 'Docker/K8s',
        monitoring: 'Integrated'
      },
      pricing: {
        payg: 8500,
        ri1Year: 6800,
        ri3Year: 5950,
        setupFee: 10000,
        floorPrice: 6800
      },
      location: ['Mumbai', 'Bangalore'],
      tags: ['devops', 'cicd', 'automation']
    }
  ],

  // AI/ML Platform Services
  aiml: [
    {
      sku: 'CI-AI-PLATFORM-BASIC-MUM',
      legacySku: 'AI-PLAT-BASIC-MUM',
      name: 'Basic AI/ML Platform',
      description: 'Managed AI/ML platform with Jupyter notebooks',
      category: 'AI/ML Platform',
      subcategory: 'Machine Learning',
      specifications: {
        vCPU: 8,
        memory: '32 GB',
        gpu: 'NVIDIA T4',
        storage: '500 GB',
        frameworks: 'TensorFlow, PyTorch'
      },
      pricing: {
        payg: 18000,
        ri1Year: 14400,
        ri3Year: 12600,
        setupFee: 8000,
        floorPrice: 14400
      },
      location: ['Mumbai', 'Bangalore'],
      tags: ['ai', 'ml', 'jupyter', 'tensorflow']
    },
    {
      sku: 'CI-AI-INFERENCE-API-MUM',
      legacySku: 'AI-API-MUM',
      name: 'AI Model Inference API',
      description: 'Scalable API for AI model inference',
      category: 'AI/ML Platform',
      subcategory: 'Model Serving',
      specifications: {
        requests: '10,000/month',
        latency: '<100ms',
        scaling: 'Auto',
        models: 'Custom/Pre-trained'
      },
      pricing: {
        payg: 5500,
        ri1Year: 4400,
        ri3Year: 3850,
        setupFee: 3000,
        floorPrice: 4400
      },
      location: ['Mumbai', 'Delhi', 'Bangalore'],
      tags: ['ai', 'inference', 'api', 'scalable']
    }
  ]
};

// SKU Intelligence Rules for Smart Recommendations
export const skuIntelligenceRules = {
  // Operating System Dependencies
  os: {
    'windows': ['CI-SEC-AV-ENTERPRISE-MUM', 'CI-BACKUP-MANAGED-MUM'],
    'linux': ['CI-MON-BASIC-MUM', 'CI-BACKUP-MANAGED-MUM']
  },
  
  // High Availability Dependencies
  ha: {
    'enabled': ['CI-NET-LB-BASIC-MUM', 'CI-STOR-BLOCK-1TB-MUM', 'CI-NET-VPN-SITE2SITE-MUM']
  },
  
  // Disaster Recovery Dependencies
  dr: {
    'enabled': ['CI-STOR-BACKUP-100GB-MUM', 'CI-NET-MPLS-10M-MUM', 'CI-BACKUP-MANAGED-MUM']
  },
  
  // Security Dependencies
  security: {
    'public-facing': ['CI-SEC-FW-NGFW-MUM', 'CI-SEC-DDOS-BASIC-MUM', 'CI-SEC-SSL-WILDCARD-MUM'],
    'database': ['CI-SEC-FW-BASIC-MUM', 'CI-BACKUP-MANAGED-MUM']
  },
  
  // Application Type Dependencies
  application: {
    'web': ['CI-NET-LB-BASIC-MUM', 'CI-NET-CDN-BASIC-MUM', 'CI-SEC-SSL-WILDCARD-MUM'],
    'database': ['CI-STOR-BACKUP-100GB-MUM', 'CI-MON-BASIC-MUM'],
    'ai-ml': ['CI-COMP-GPU-AI-MUM', 'CI-STOR-OBJECT-1TB-MUM']
  }
};

// Large Enterprise Customer Scenario Data
export const enterpriseCustomerData = {
  customerId: 'CUST-ENT-001',
  customerName: 'TechCorp Industries Ltd.',
  industry: 'Manufacturing & Technology',
  locations: [
    {
      name: 'Mumbai HQ',
      code: 'MUM',
      type: 'Primary',
      resources: 45
    },
    {
      name: 'Delhi Branch',
      code: 'DEL', 
      type: 'Secondary',
      resources: 28
    },
    {
      name: 'Bangalore R&D',
      code: 'BLR',
      type: 'Development',
      resources: 32
    },
    {
      name: 'Chennai DR Site',
      code: 'CHE',
      type: 'Disaster Recovery',
      resources: 15
    }
  ],
  
  environments: [
    {
      name: 'Production',
      resources: 65,
      criticality: 'High',
      sla: '99.9%'
    },
    {
      name: 'Staging',
      resources: 25,
      criticality: 'Medium',
      sla: '99.5%'
    },
    {
      name: 'Development',
      resources: 20,
      criticality: 'Low',
      sla: '99.0%'
    },
    {
      name: 'DR',
      resources: 10,
      criticality: 'High',
      sla: '99.9%'
    }
  ],
  
  applications: [
    {
      name: 'ERP System',
      environment: 'Production',
      location: 'Mumbai',
      resources: 12,
      monthlySpend: 125000
    },
    {
      name: 'CRM Platform',
      environment: 'Production', 
      location: 'Delhi',
      resources: 8,
      monthlySpend: 85000
    },
    {
      name: 'AI Analytics',
      environment: 'Production',
      location: 'Bangalore',
      resources: 6,
      monthlySpend: 180000
    },
    {
      name: 'Backup & DR',
      environment: 'DR',
      location: 'Chennai',
      resources: 15,
      monthlySpend: 45000
    }
  ],
  
  totalMonthlySpend: 435000,
  contractValue: 15660000, // 3-year contract
  accountManager: 'Rajesh Kumar',
  technicalContact: 'Priya Sharma'
};

// Flatten all SKUs for easy access
export const allSkus = [
  ...expandedSkuData.compute,
  ...expandedSkuData.network,
  ...expandedSkuData.security,
  ...expandedSkuData.storage,
  ...expandedSkuData.database,
  ...expandedSkuData.managed,
  ...expandedSkuData.aiml
];

// Helper function to get SKU by ID
export const getSkuById = (skuId) => {
  return allSkus.find(sku => sku.sku === skuId);
};

// Helper function to get legacy mapping
export const getLegacyMapping = (skuId) => {
  const sku = getSkuById(skuId);
  return sku ? sku.legacySku : null;
};

// Helper function to search SKUs
export const searchSkus = (query, category = null) => {
  const searchTerm = query.toLowerCase();
  return allSkus.filter(sku => {
    const matchesQuery = 
      sku.name.toLowerCase().includes(searchTerm) ||
      sku.description.toLowerCase().includes(searchTerm) ||
      sku.sku.toLowerCase().includes(searchTerm) ||
      sku.tags.some(tag => tag.includes(searchTerm));
    
    const matchesCategory = category ? sku.category === category : true;
    
    return matchesQuery && matchesCategory;
  });
};

export default expandedSkuData;

