// Tu App.js EXACTO como está, solo con panel de configuración de licencias

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, AlertCircle, XCircle, Users, Shield, TrendingUp, Download, Settings, Edit3, Save, X, FileText, AlertTriangle, Target } from 'lucide-react';

const FortiSASEDashboard = () => {
  // Estados principales
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [showCISOReport, setShowCISOReport] = useState(false);
  const [clientName, setClientName] = useState('');
  const [editingClient, setEditingClient] = useState(false);
  const [tempClientName, setTempClientName] = useState('');
  
  const [organizationData, setOrganizationData] = useState({
    industry: 'Servicios Financieros',
    employees: 2500,
    locations: 15,
    complianceFrameworks: ['SOX', 'PCI-DSS', 'ISO 27001'],
    riskTolerance: 'Bajo',
    securityMaturity: 'Avanzado'
  });
  
  const [licenseData, setLicenseData] = useState({
    totalLicenses: 1000,
    activeLicenses: 847,
    availableLicenses: 153
  });

  // Funcionalidades FortiSASE REALES según la matriz Standard
  const [featuresData, setFeaturesData] = useState([
    {
      id: 'sia_ssl_inspection',
      name: 'SSL Inspection',
      category: 'Secure Internet Access (SIA)',
      description: 'Inspección SSL/TLS profunda para análisis de tráfico cifrado',
      licensesRequired: 1000,
      licensesActive: 1000,
      utilizationRate: 100,
      status: 'active',
      technologies: ['Deep SSL Inspection', 'Certificate Analysis', 'Encrypted Traffic Inspection'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Crítico',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'sia_antivirus',
      name: 'Inline Anti-virus (AV)',
      category: 'Secure Internet Access (SIA)',
      description: 'Protección antivirus en línea para archivos y contenido web',
      licensesRequired: 1000,
      licensesActive: 956,
      utilizationRate: 96,
      status: 'active',
      technologies: ['Real-time Scanning', 'Signature Detection', 'Heuristic Analysis'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: ['sia_ssl_inspection'],
      businessValue: 'Crítico',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'sia_ips',
      name: 'Intrusion Prevention',
      category: 'Secure Internet Access (SIA)',
      description: 'Sistema de prevención de intrusiones integrado',
      licensesRequired: 1000,
      licensesActive: 1000,
      utilizationRate: 100,
      status: 'active',
      technologies: ['IPS Signatures', 'Anomaly Detection', 'Protocol Analysis', 'Behavioral Monitoring'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Crítico',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'sia_web_dns_filtering',
      name: 'Web and DNS Filtering',
      category: 'Secure Internet Access (SIA)',
      description: 'Filtrado de contenido web y DNS con categorización',
      licensesRequired: 1000,
      licensesActive: 834,
      utilizationRate: 83,
      status: 'active',
      technologies: ['URL Categorization', 'DNS Filtering', 'Content Filtering', 'Reputation Analysis'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Alto',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'sia_botnet_filtering',
      name: 'Botnet C&C Filtering',
      category: 'Secure Internet Access (SIA)',
      description: 'Filtrado de comunicaciones de comando y control de botnets',
      licensesRequired: 1000,
      licensesActive: 1000,
      utilizationRate: 100,
      status: 'active',
      technologies: ['C&C Detection', 'Botnet Signatures', 'Communication Analysis'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Alto',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'ssa_inline_casb',
      name: 'Inline CASB',
      category: 'Secure SaaS Access (SSA)',
      description: 'Cloud Access Security Broker en línea para aplicaciones SaaS',
      licensesRequired: 800,
      licensesActive: 445,
      utilizationRate: 56,
      status: 'partial',
      technologies: ['SaaS Discovery', 'API Integration', 'Policy Enforcement', 'Activity Monitoring'],
      requirements: 'Configuración de políticas SaaS requerida',
      prerequisites: ['sia_ssl_inspection'],
      businessValue: 'Alto',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Incompleta',
      configurationGaps: ['Políticas SaaS no configuradas completamente', 'Integración API pendiente para algunas aplicaciones']
    },
    {
      id: 'ssa_inline_dlp',
      name: 'Inline DLP',
      category: 'Secure SaaS Access (SSA)',
      description: 'Data Loss Prevention en línea para protección de datos',
      licensesRequired: 800,
      licensesActive: 234,
      utilizationRate: 29,
      status: 'partial',
      technologies: ['Content Inspection', 'Data Classification', 'Policy Enforcement', 'Incident Response'],
      requirements: 'SSL Deep Inspection obligatorio, definición de reglas DLP',
      prerequisites: ['sia_ssl_inspection'],
      businessValue: 'Crítico',
      sslInspectionEnabled: true,
      agentDeployed: false,
      configurationStatus: 'Incompleta',
      configurationGaps: ['Agentes faltantes en endpoints', 'Reglas DLP no definidas', 'Clasificación de datos pendiente']
    },
    {
      id: 'spa_fortigate_access',
      name: 'FortiGate Private Access',
      category: 'Secure Private Access (SPA)',
      description: 'Acceso privado seguro a través de FortiGate',
      licensesRequired: 500,
      licensesActive: 0,
      utilizationRate: 0,
      status: 'inactive',
      technologies: ['Private Network Access', 'FortiGate Integration', 'Secure Tunneling'],
      requirements: 'FortiGate requerido como gateway, no incluido en Standard',
      prerequisites: ['fortigate_appliance'],
      businessValue: 'Alto',
      sslInspectionEnabled: false,
      agentDeployed: true,
      configurationStatus: 'No configurada',
      configurationGaps: ['FortiGate no desplegado', 'Configuración de acceso privado pendiente']
    },
    {
      id: 'spa_ztna',
      name: 'Zero Trust Network Access (ZTNA)',
      category: 'Secure Private Access (SPA)',
      description: 'Acceso de red de confianza cero',
      licensesRequired: 500,
      licensesActive: 127,
      utilizationRate: 25,
      status: 'partial',
      technologies: ['Zero Trust Access', 'Application Tunneling', 'Identity Verification'],
      requirements: 'Configuración de aplicaciones privadas y políticas ZTNA',
      prerequisites: [],
      businessValue: 'Alto',
      sslInspectionEnabled: false,
      agentDeployed: true,
      configurationStatus: 'Incompleta',
      configurationGaps: ['Aplicaciones privadas no mapeadas', 'Políticas ZTNA básicas']
    },
    {
      id: 'endpoint_sandbox',
      name: 'Sandbox',
      category: 'Endpoint Security',
      description: 'Análisis de comportamiento en entorno aislado (sandboxing)',
      licensesRequired: 1000,
      licensesActive: 876,
      utilizationRate: 88,
      status: 'active',
      technologies: ['File Detonation', 'Behavioral Analysis', 'Zero-day Protection', 'Threat Intelligence'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Alto',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'endpoint_vulnerability',
      name: 'Vulnerability Management',
      category: 'Endpoint Security',
      description: 'Gestión de vulnerabilidades en endpoints',
      licensesRequired: 1000,
      licensesActive: 723,
      utilizationRate: 72,
      status: 'active',
      technologies: ['Vulnerability Scanning', 'Patch Management', 'Risk Assessment', 'Remediation'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Alto',
      sslInspectionEnabled: false,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'endpoint_protection_platform',
      name: 'Endpoint Protection Platform',
      category: 'Endpoint Security',
      description: 'Plataforma integrada de protección de endpoints',
      licensesRequired: 1000,
      licensesActive: 1000,
      utilizationRate: 100,
      status: 'active',
      technologies: ['Real-time Protection', 'Behavior Monitoring', 'Threat Hunting', 'Response Automation'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Crítico',
      sslInspectionEnabled: false,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'management_sase_logging',
      name: 'SASE Cloud Logging, Reporting & Log Forwarding',
      category: 'Management',
      description: 'Logging centralizado y reportes de SASE en la nube',
      licensesRequired: 1000,
      licensesActive: 1000,
      utilizationRate: 100,
      status: 'active',
      technologies: ['Centralized Logging', 'Real-time Reporting', 'Log Forwarding', 'Analytics'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Alto',
      sslInspectionEnabled: false,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'management_sase_cloud',
      name: 'SASE Cloud Management',
      category: 'Management',
      description: 'Gestión centralizada de servicios SASE en la nube',
      licensesRequired: 1000,
      licensesActive: 1000,
      utilizationRate: 100,
      status: 'active',
      technologies: ['Cloud Management', 'Policy Management', 'Configuration Management', 'Monitoring'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Alto',
      sslInspectionEnabled: false,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'management_rest_api',
      name: 'REST API',
      category: 'Management',
      description: 'API REST para integración y automatización',
      licensesRequired: 1000,
      licensesActive: 234,
      utilizationRate: 23,
      status: 'partial',
      technologies: ['REST API', 'Automation', 'Integration', 'Third-party Connectivity'],
      requirements: 'Incluido en licencia Standard',
      prerequisites: [],
      businessValue: 'Medio',
      sslInspectionEnabled: false,
      agentDeployed: false,
      configurationStatus: 'Incompleta',
      configurationGaps: ['Integraciones API no configuradas', 'Automatización pendiente']
    }
  ]);

  // Cargar datos del localStorage al inicio
  useEffect(() => {
    const savedConfig = localStorage.getItem('fortisase-client-config');
    
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.clientName) setClientName(config.clientName);
        if (config.featuresData) setFeaturesData(config.featuresData);
        if (config.licenseData) setLicenseData(config.licenseData);
        if (config.organizationData) setOrganizationData(config.organizationData);
      } catch (error) {
        console.error('Error loading saved config:', error);
      }
    }
  }, []);

  // Calcular estadísticas generales
  const totalUtilization = Math.round(
    featuresData.reduce((acc, feature) => acc + (feature.utilizationRate || 0), 0) / featuresData.length
  );

  const activeFeatures = featuresData.filter(f => f.status === 'active').length;
  const partialFeatures = featuresData.filter(f => f.status === 'partial').length;
  const inactiveFeatures = featuresData.filter(f => f.status === 'inactive').length;

  // Calcular métricas de funcionalidades críticas
  const criticalFeatures = featuresData.filter(f => f.businessValue === 'Crítico');
  const criticalActive = criticalFeatures.filter(f => f.status === 'active').length;
  const securityCoverage = criticalFeatures.length > 0 ? Math.round((criticalActive / criticalFeatures.length) * 100) : 0;

  // Calcular gaps de configuración
  const configurationGaps = featuresData.filter(feature => {
    if (feature.status === 'inactive') return false;
    
    // Verificar SSL Deep Inspection para funcionalidades que lo requieren
    if (feature.prerequisites.includes('ssl_inspection') && !feature.sslInspectionEnabled) {
      return true;
    }
    
    // Verificar agent deployment
    if (feature.requirements.includes('Agent') && !feature.agentDeployed) {
      return true;
    }
    
    // Verificar configuration gaps
    if (feature.configurationGaps && feature.configurationGaps.length > 0) {
      return true;
    }
    
    return false;
  });

  // Funciones para el nombre del cliente
  const startEditingClient = () => {
    setTempClientName(clientName);
    setEditingClient(true);
  };

  const saveClientName = () => {
    setClientName(tempClientName);
    setEditingClient(false);
    saveConfiguration();
  };

  const cancelEditingClient = () => {
    setTempClientName('');
    setEditingClient(false);
  };

  // Funciones auxiliares
  const saveConfiguration = () => {
    const config = {
      clientName,
      featuresData,
      licenseData,
      organizationData,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('fortisase-client-config', JSON.stringify(config));
  };

  useEffect(() => {
    saveConfiguration();
  }, [clientName, featuresData, licenseData, organizationData]);

  const updateFeature = (featureId, updates) => {
    setFeaturesData(prev => {
      const newFeatures = prev.map(feature => 
        feature.id === featureId 
          ? { 
              ...feature, 
              ...updates,
              utilizationRate: updates.licensesActive !== undefined && updates.licensesRequired !== undefined
                ? Math.round((updates.licensesActive / Math.max(updates.licensesRequired, 1)) * 100)
                : updates.licensesActive !== undefined && feature.licensesRequired > 0
                  ? Math.round((updates.licensesActive / feature.licensesRequired) * 100)
                  : feature.utilizationRate,
              status: (() => {
                const active = updates.licensesActive !== undefined ? updates.licensesActive : feature.licensesActive;
                const required = updates.licensesRequired !== undefined ? updates.licensesRequired : feature.licensesRequired;
                if (active === 0) return 'inactive';
                if (active === required) return 'active';
                return 'partial';
              })()
            }
          : feature
      );
      
      const totalRequired = newFeatures.reduce((acc, feature) => acc + (feature.licensesRequired || 0), 0);
      const totalActive = newFeatures.reduce((acc, feature) => acc + (feature.licensesActive || 0), 0);
      
      setLicenseData({
        totalLicenses: totalRequired,
        activeLicenses: totalActive,
        availableLicenses: totalRequired - totalActive
      });
      
      return newFeatures;
    });
  };

  const exportReport = () => {
    const reportData = {
      cliente: clientName || 'Organización',
      fecha_evaluacion: new Date().toISOString(),
      licenciamiento: 'FortiSASE Standard',
      resumen_ejecutivo: {
        total_licencias: licenseData.totalLicenses,
        licencias_activas: licenseData.activeLicenses,
        aprovechamiento_general: totalUtilization,
        funcionalidades_activas: activeFeatures,
        funcionalidades_parciales: partialFeatures,
        funcionalidades_inactivas: inactiveFeatures,
        gaps_configuracion: configurationGaps.length
      },
      detalle_funcionalidades: featuresData,
      gaps_identificados: configurationGaps.map(feature => ({
        funcionalidad: feature.name || '',
        estado: feature.status || '',
        aprovechamiento: feature.utilizationRate || 0,
        gaps_configuracion: feature.configurationGaps || [],
        tecnologias: feature.technologies || [],
        valor_negocio: feature.businessValue || ''
      })),
      recomendaciones: configurationGaps.map(feature => ({
        prioridad: feature.businessValue || '',
        funcionalidad: feature.name || '',
        acciones_requeridas: feature.configurationGaps || [],
        impacto_esperado: `Mejora en ${(feature.category || '').toLowerCase()}`
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FortiSASE-Standard-Aprovechamiento-${clientName || 'cliente'}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Datos para gráficos
  const utilizationData = featuresData.map((feature, index) => ({
    name: (feature.name || '').replace(/\s*\([^)]*\)/, '').slice(0, 15),
    fullName: feature.name || '',
    utilization: feature.utilizationRate || 0,
    active: feature.licensesActive || 0,
    required: feature.licensesRequired || 0,
    id: `feature-${index}`
  }));

  const statusData = [
    { name: 'Activas', value: activeFeatures, color: '#10b981' },
    { name: 'Parciales', value: partialFeatures, color: '#f59e0b' },
    { name: 'Inactivas', value: inactiveFeatures, color: '#ef4444' }
  ];

  const categoryData = featuresData.reduce((acc, feature) => {
    const category = feature.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = {
        name: category,
        total: 0,
        active: 0,
        utilization: 0,
        licensesRequired: 0,
        licensesActive: 0
      };
    }
    acc[category].total += 1;
    if (feature.status === 'active') acc[category].active += 1;
    acc[category].licensesRequired += feature.licensesRequired || 0;
    acc[category].licensesActive += feature.licensesActive || 0;
    acc[category].utilization = acc[category].licensesRequired > 0 
      ? Math.round((acc[category].licensesActive / acc[category].licensesRequired) * 100) 
      : 0;
    return acc;
  }, {});

  const categoryChartData = Object.values(categoryData);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'partial':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'inactive':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getValueColor = (businessValue) => {
    switch (businessValue) {
      case 'Crítico': return 'text-red-600 bg-red-50 border-red-200';
      case 'Alto': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Medio': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  // SOLO AGREGAR: Panel de configuración SIMPLE
  const LicenseConfigPanel = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-red-600 text-white sticky top-0 z-10">
          <div className="flex items-center">
            <Settings className="h-6 w-6 mr-3" />
            <h2 className="text-xl font-bold">⚙️ Configurar Cantidades de Licencias</h2>
          </div>
          <button
            onClick={() => setShowConfigPanel(false)}
            className="text-red-100 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">📝 Instrucciones</h3>
            <p className="text-sm text-blue-800">
              Ingresa las cantidades reales de licencias que tiene el cliente. 
              Los porcentajes de aprovechamiento se calcularán automáticamente.
            </p>
          </div>

          <div className="space-y-6">
            {featuresData.map((feature) => (
              <div key={feature.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">{feature.name}</h4>
                    <p className="text-sm text-gray-600">{feature.category}</p>
                    <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${
                      feature.businessValue === 'Crítico' ? 'bg-red-100 text-red-800' :
                      feature.businessValue === 'Alto' ? 'bg-orange-100 text-orange-800' :
                      feature.businessValue === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {feature.businessValue}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      feature.utilizationRate >= 85 ? 'text-green-600' : 
                      feature.utilizationRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {feature.utilizationRate}%
                    </div>
                    <div className="text-xs text-gray-500">Aprovechamiento</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Licencias Requeridas
                    </label>
                    <input
                      type="number"
                      value={feature.licensesRequired}
                      onChange={(e) => updateFeature(feature.id, { 
                        licensesRequired: parseInt(e.target.value) || 0 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Licencias Activas
                    </label>
                    <input
                      type="number"
                      value={feature.licensesActive}
                      onChange={(e) => updateFeature(feature.id, { 
                        licensesActive: parseInt(e.target.value) || 0 
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      min="0"
                    />
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      feature.utilizationRate >= 85 ? 'bg-green-500' : 
                      feature.utilizationRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${feature.utilizationRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50 sticky bottom-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              💾 Los cambios se guardan automáticamente
            </div>
            <button
              onClick={() => setShowConfigPanel(false)}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Listo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  📊 FortiSASE Health Check - Standard Licensing
                </h1>
                {/* Nombre del cliente editable */}
                {editingClient ? (
                  <div className="ml-4 flex items-center space-x-2">
                    <span className="text-red-600 font-bold">-</span>
                    <input
                      type="text"
                      value={tempClientName}
                      onChange={(e) => setTempClientName(e.target.value)}
                      placeholder="Nombre del cliente"
                      className="px-3 py-1 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-red-600 font-bold"
                      autoFocus
                    />
                    <button
                      onClick={saveClientName}
                      className="p-1 text-green-600 hover:text-green-700"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={cancelEditingClient}
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="ml-4 flex items-center space-x-2">
                    {clientName && <span className="text-red-600 font-bold">- {clientName}</span>}
                    <button
                      onClick={startEditingClient}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mt-2">
                Análisis de aprovechamiento de funcionalidades FortiSASE Standard License
              </p>
              <div className="flex items-center mt-3 text-sm text-gray-500">
                <span className="mr-4">🔧 Licenciamiento Standard</span>
                <span className="mr-4">📈 Análisis de Aprovechamiento</span>
                <span className="mr-4">⚙️ Configuración de Funcionalidades</span>
                <span>📋 Reporte Ejecutivo</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCISOReport(!showCISOReport)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                {showCISOReport ? 'Dashboard' : 'Reporte Ejecutivo'}
              </button>
              <button
                onClick={() => setShowConfigPanel(!showConfigPanel)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configurar Licencias
              </button>
              <button
                onClick={exportReport}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Análisis
              </button>
            </div>
          </div>
          
          {/* Welcome Notice para nuevos usuarios */}
          {!clientName && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    👋 ¡Bienvenido al FortiSASE Health Check!
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Para comenzar: <strong>1)</strong> Agrega el nombre del cliente haciendo clic en el ícono de edición, 
                      <strong> 2)</strong> Haz clic en "Configurar Licencias" para meter los datos reales, 
                      <strong> 3)</strong> Revisa el análisis de aprovechamiento y genera reportes ejecutivos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel de configuración SOLO cuando se necesite */}
        {showConfigPanel && <LicenseConfigPanel />}

        {/* Todo tu dashboard EXACTO como está */}
        {!showCISOReport && (
          <>
            {/* Resumen de Aprovechamiento */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg mb-8 p-8 text-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Aprovechamiento FortiSASE Standard</h2>
                  <p className="text-red-100 mt-1">Estado actual de utilización de funcionalidades incluidas</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{totalUtilization}%</div>
                  <div className="text-red-100 text-sm">Aprovechamiento General</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Licencias Totales */}
                <div className="bg-white bg-opacity-15 rounded-lg p-6 backdrop-blur-sm border border-red-400 border-opacity-30">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-10 w-10 text-red-200" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">{licenseData.totalLicenses}</div>
                      <div className="text-red-200 text-sm">Licencias Standard</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-200">Utilizadas:</span>
                    <span className="font-semibold">{licenseData.activeLicenses}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-red-200">Disponibles:</span>
                    <span className="font-semibold">{licenseData.availableLicenses}</span>
                  </div>
                </div>

                {/* Funcionalidades */}
                <div className="bg-white bg-opacity-15 rounded-lg p-6 backdrop-blur-sm border border-red-400 border-opacity-30">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-10 w-10 text-gray-200" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">{activeFeatures}/{featuresData.length}</div>
                      <div className="text-red-200 text-sm">Funcionalidades</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-gray-200 font-bold">{activeFeatures}</div>
                      <div className="text-red-200">Activas</div>
                    </div>
                    <div>
                      <div className="text-amber-300 font-bold">{partialFeatures}</div>
                      <div className="text-red-200">Parciales</div>
                    </div>
                    <div>
                      <div className="text-red-300 font-bold">{inactiveFeatures}</div>
                      <div className="text-red-200">Inactivas</div>
                    </div>
                  </div>
                </div>

                {/* Aprovechamiento Crítico */}
                <div className="bg-white bg-opacity-15 rounded-lg p-6 backdrop-blur-sm border border-red-400 border-opacity-30">
                  <div className="flex items-center justify-between mb-4">
                    <Target className="h-10 w-10 text-amber-300" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">{securityCoverage}%</div>
                      <div className="text-red-200 text-sm">Funciones Críticas</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${securityCoverage >= 90 ? 'text-green-300' : securityCoverage >= 70 ? 'text-yellow-300' : 'text-red-300'}`}>
                      {criticalActive}/{criticalFeatures.length} ACTIVAS
                    </div>
                    <div className="text-red-200 text-xs">Funcionalidades críticas</div>
                  </div>
                </div>

                {/* Gaps de Configuración */}
                <div className="bg-white bg-opacity-15 rounded-lg p-6 backdrop-blur-sm border border-red-400 border-opacity-30">
                  <div className="flex items-center justify-between mb-4">
                    <AlertTriangle className="h-10 w-10 text-amber-300" />
                    <div className="text-right">
                      <div className="text-2xl font-bold">{configurationGaps.length}</div>
                      <div className="text-red-200 text-sm">Gaps Config.</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-200">SSL Inspection:</span>
                      <span className="text-gray-200 font-semibold">{featuresData.filter(f => f.sslInspectionEnabled).length}/{featuresData.filter(f => f.prerequisites.includes('ssl_inspection')).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-200">Agentes:</span>
                      <span className="text-gray-200 font-semibold">{featuresData.filter(f => f.agentDeployed).length}/{featuresData.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Gráfico de Aprovechamiento */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Aprovechamiento por Funcionalidad</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={utilizationData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10, fill: '#374151' }} 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis tick={{ fontSize: 12, fill: '#374151' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f9fafb', 
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                      formatter={(value, name) => [
                        `${value}%`, 
                        'Aprovechamiento'
                      ]}
                      labelFormatter={(label) => {
                        const item = utilizationData.find(d => d.name === label);
                        return item ? item.fullName : label;
                      }}
                    />
                    <Bar dataKey="utilization" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Distribución de Estados */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">🔄 Distribución de Estados</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{featuresData.length}</div>
                    <div className="text-sm text-gray-600">Total Funcionalidades</div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f9fafb', 
                        border: '1px solid #d1d5db',
                        borderRadius: '6px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Resumen numérico debajo del gráfico */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{activeFeatures}</div>
                    <div className="text-xs text-green-700">Activas</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{partialFeatures}</div>
                    <div className="text-xs text-yellow-700">Parciales</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-600">{inactiveFeatures}</div>
                    <div className="text-xs text-red-700">Inactivas</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabla de Funcionalidades */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">📋 Funcionalidades FortiSASE Standard</h3>
                <p className="text-sm text-gray-600 mt-1">Basado en la matriz oficial de funcionalidades por licencia</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuresData.map((feature) => (
                    <div key={feature.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-grow">
                          <h4 className="font-medium text-gray-900 text-sm">{feature.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{feature.category}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                          {getStatusIcon(feature.status)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Licencias:</span>
                          <span className="font-medium">{feature.licensesActive}/{feature.licensesRequired}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                feature.utilizationRate >= 85 ? 'bg-green-500' : 
                                feature.utilizationRate >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${feature.utilizationRate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-900 min-w-[35px]">{feature.utilizationRate}%</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Prioridad:</span>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getValueColor(feature.businessValue)}`}>
                            {feature.businessValue}
                          </span>
                        </div>
                        
                        {/* Estado de configuración */}
                        {feature.configurationStatus && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600">Config:</span>
                            <span className={`px-2 py-1 rounded-full ${
                              feature.configurationStatus === 'Completa' ? 'bg-green-100 text-green-800' :
                              feature.configurationStatus === 'Incompleta' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {feature.configurationStatus}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Acciones Rápidas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">📊 Reporte Ejecutivo</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Generar reporte completo con análisis y recomendaciones para presentar a la dirección
                  </p>
                  <button 
                    onClick={() => setShowCISOReport(true)}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Ver Reporte
                  </button>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">⚙️ Configurar Licencias</h4>
                  <p className="text-sm text-green-800 mb-3">
                    Ajustar las cantidades de licencias adquiridas y en uso para cada funcionalidad
                  </p>
                  <button 
                    onClick={() => setShowConfigPanel(true)}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Configurar
                  </button>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-medium text-amber-900 mb-2">📥 Exportar Análisis</h4>
                  <p className="text-sm text-amber-800 mb-3">
                    Descargar el análisis completo en formato JSON para integración con otros sistemas
                  </p>
                  <button 
                    onClick={exportReport}
                    className="text-sm bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700"
                  >
                    Exportar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>📊 FortiSASE Health Check v5.0 - Standard License Analysis</p>
          <p className="mt-1">🎯 Basado en la matriz oficial de funcionalidades FortiSASE</p>
        </div>
      </div>
    </div>
  );
};

export default FortiSASEDashboard;
