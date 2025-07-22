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
    totalLicenses: 500,
    activeLicenses: 387,
    availableLicenses: 113
  });

  // Funcionalidades FortiSASE con tecnologías específicas
  const [featuresData, setFeaturesData] = useState([
    {
      id: 'sia',
      name: 'Secure Internet Access (SIA)',
      category: 'Acceso Seguro a Internet',
      description: 'Funcionalidad base que habilita todas las tecnologías de seguridad web',
      licensesRequired: 500,
      licensesActive: 500,
      utilizationRate: 100,
      status: 'active',
      technologies: ['SSL Deep Inspection', 'DNS Security', 'URL Filtering'],
      requirements: 'FortiClient Agent instalado en dispositivos endpoint',
      prerequisites: [],
      enables: ['antimalware', 'web_filter', 'application_control', 'ips', 'sandbox', 'dlp', 'casb'],
      businessValue: 'Crítico',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'antimalware',
      name: 'Antimalware Protection',
      category: 'Protección contra Amenazas',
      description: 'Protección en tiempo real contra malware, virus y amenazas conocidas',
      licensesRequired: 500,
      licensesActive: 487,
      utilizationRate: 97,
      status: 'active',
      technologies: ['Signature-based Detection', 'Heuristic Analysis', 'Real-time Scanning'],
      requirements: 'SSL Deep Inspection habilitado para máxima efectividad',
      prerequisites: ['sia', 'ssl_inspection'],
      enables: ['advanced_threat_protection'],
      businessValue: 'Crítico',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'web_filter',
      name: 'Web Filtering',
      category: 'Control de Contenido Web',
      description: 'Filtrado y categorización de sitios web, control de acceso por políticas',
      licensesRequired: 500,
      licensesActive: 456,
      utilizationRate: 91,
      status: 'active',
      technologies: ['URL Categorization', 'Content Filtering', 'Block/Allow Lists', 'Safe Search'],
      requirements: 'Configuración de políticas de filtrado web',
      prerequisites: ['sia'],
      enables: ['productivity_control', 'compliance_enforcement'],
      businessValue: 'Alto',
      sslInspectionEnabled: true,
      agentDeployed: true,
      configurationStatus: 'Completa'
    },
    {
      id: 'dlp',
      name: 'Data Loss Prevention (DLP)',
      category: 'Prevención de Pérdida de Datos',
      description: 'Prevención de pérdida de datos sensibles en tiempo real',
      licensesRequired: 300,
      licensesActive: 178,
      utilizationRate: 59,
      status: 'partial',
      technologies: ['Content Inspection', 'Data Classification', 'Policy Enforcement', 'Incident Response'],
      requirements: 'SSL Deep Inspection obligatorio, configuración de reglas DLP',
      prerequisites: ['sia', 'ssl_inspection'],
      enables: ['data_protection', 'compliance'],
      businessValue: 'Crítico',
      sslInspectionEnabled: true,
      agentDeployed: false,
      configurationStatus: 'Incompleta',
      configurationGaps: ['Agente no desplegado en todos los endpoints', 'Reglas de clasificación de datos pendientes']
    }
  ]);

  // Calcular estadísticas
  const totalUtilization = Math.round(
    featuresData.reduce((acc, feature) => acc + feature.utilizationRate, 0) / featuresData.length
  );
  
  const activeFeatures = featuresData.filter(f => f.status === 'active').length;
  const partialFeatures = featuresData.filter(f => f.status === 'partial').length;
  const inactiveFeatures = featuresData.filter(f => f.status === 'inactive').length;

  const utilizationData = featuresData.map((feature, index) => ({
    name: (feature.name || '').replace(/\s*\([^)]*\)/, '').slice(0, 20),
    fullName: feature.name || '',
    utilization: feature.utilizationRate || 0
  }));

  const statusData = [
    { name: 'Activas', value: activeFeatures, color: '#10b981' },
    { name: 'Parciales', value: partialFeatures, color: '#f59e0b' },
    { name: 'Inactivas', value: inactiveFeatures, color: '#ef4444' }
  ];

  const saveClientName = () => {
    setClientName(tempClientName);
    setEditingClient(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  📊 Análisis de Aprovechamiento FortiSASE
                </h1>
                {editingClient ? (
                  <div className="ml-4 flex items-center space-x-2">
                    <input
                      type="text"
                      value={tempClientName}
                      onChange={(e) => setTempClientName(e.target.value)}
                      placeholder="Nombre del cliente"
                      className="px-3 py-1 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500"
                      autoFocus
                    />
                    <button onClick={saveClientName} className="p-1 text-green-600">
                      <Save className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="ml-4 flex items-center space-x-2">
                    {clientName && <span className="text-red-600 font-bold">- {clientName}</span>}
                    <button onClick={() => setEditingClient(true)} className="p-1 text-gray-400">
                      <Edit3 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-xl shadow-lg mb-8 p-8 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Resumen de Aprovechamiento FortiSASE</h2>
            <div className="text-3xl font-bold">{totalUtilization}%</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-15 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-10 w-10 text-red-200" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{licenseData.totalLicenses}</div>
                  <div className="text-red-200 text-sm">Licencias Totales</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white bg-opacity-15 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Shield className="h-10 w-10 text-gray-200" />
                <div className="text-right">
                  <div className="text-2xl font-bold">{activeFeatures}/{featuresData.length}</div>
                  <div className="text-red-200 text-sm">Funcionalidades</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Aprovechamiento por Funcionalidad</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🔄 Estados</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortiSASEDashboard;
