import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Dashboard from './components/Dashboard'
import FixedExcelUpload from './components/FixedExcelUpload'
import SmartWorkspaceManualEntry from './components/SmartWorkspaceManualEntry'
import FinalInventoryView from './components/FinalInventoryView'
import QuoteGeneration from './components/QuoteGeneration'
import FixedCustomFlowDemo from './components/FixedCustomFlowDemo'
import OrderHistoryPage from './components/OrderHistoryPage'
import AuditTrailPage from './components/AuditTrailPage'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/excel-upload" element={<FixedExcelUpload />} />
            <Route path="/manual-entry" element={<SmartWorkspaceManualEntry />} />
            <Route path="/inventory" element={<FinalInventoryView />} />
            <Route path="/quote-generation" element={<QuoteGeneration />} />
            <Route path="/custom-flow" element={<FixedCustomFlowDemo />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="/audit-trail" element={<AuditTrailPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App

