import { createContext, useContext, useReducer, useEffect } from 'react'
import { SKU_CATALOG, SAMPLE_INVENTORY, PAYMENT_MODELS } from '../data/skuData'

const AppContext = createContext()

const initialState = {
  // Customer Information
  currentCustomer: {
    id: 'CUST-001',
    name: 'Max Healthcare',
    industry: 'Healthcare',
    location: 'Mumbai',
    accountManager: 'Rajesh Kumar'
  },
  
  // Inventory and Resources
  inventory: SAMPLE_INVENTORY,
  skuCatalog: SKU_CATALOG,
  paymentModels: PAYMENT_MODELS,
  
  // Current Order/Quote
  currentOrder: {
    id: null,
    items: [],
    totalCost: 0,
    paymentModel: 'PAYG',
    status: 'draft'
  },
  
  // UI State
  loading: false,
  error: null,
  notifications: [],
  
  // Demo State (hidden from customer)
  demoMode: 'standard', // 'standard' or 'custom'
  showDemoControls: false
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload
        }]
      }
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      }
    
    case 'SET_DEMO_MODE':
      return { ...state, demoMode: action.payload }
    
    case 'TOGGLE_DEMO_CONTROLS':
      return { ...state, showDemoControls: !state.showDemoControls }
    
    case 'ADD_ORDER_ITEM':
      const newItem = action.payload
      const existingItemIndex = state.currentOrder.items.findIndex(
        item => item.sku === newItem.sku
      )
      
      let updatedItems
      if (existingItemIndex >= 0) {
        updatedItems = state.currentOrder.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      } else {
        updatedItems = [...state.currentOrder.items, newItem]
      }
      
      const totalCost = updatedItems.reduce((sum, item) => {
        const pricing = item.pricing[state.currentOrder.paymentModel]
        return sum + (pricing.monthly * item.quantity)
      }, 0)
      
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: updatedItems,
          totalCost
        }
      }
    
    case 'REMOVE_ORDER_ITEM':
      const filteredItems = state.currentOrder.items.filter(
        item => item.sku !== action.payload
      )
      const newTotalCost = filteredItems.reduce((sum, item) => {
        const pricing = item.pricing[state.currentOrder.paymentModel]
        return sum + (pricing.monthly * item.quantity)
      }, 0)
      
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: filteredItems,
          totalCost: newTotalCost
        }
      }
    
    case 'UPDATE_ORDER_ITEM':
      const updatedOrderItems = state.currentOrder.items.map(item =>
        item.sku === action.payload.sku
          ? { ...item, ...action.payload.updates }
          : item
      )
      
      const updatedTotalCost = updatedOrderItems.reduce((sum, item) => {
        const pricing = item.pricing[state.currentOrder.paymentModel]
        return sum + (pricing.monthly * item.quantity)
      }, 0)
      
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: updatedOrderItems,
          totalCost: updatedTotalCost
        }
      }
    
    case 'SET_ORDER_PAYMENT_MODEL':
      const recalculatedItems = state.currentOrder.items.map(item => ({
        ...item,
        // Recalculate based on new payment model
      }))
      
      const recalculatedTotal = recalculatedItems.reduce((sum, item) => {
        const pricing = item.pricing[action.payload]
        return sum + (pricing.monthly * item.quantity)
      }, 0)
      
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          paymentModel: action.payload,
          items: recalculatedItems,
          totalCost: recalculatedTotal
        }
      }
    
    case 'CLEAR_ORDER':
      return {
        ...state,
        currentOrder: {
          id: null,
          items: [],
          totalCost: 0,
          paymentModel: 'PAYG',
          status: 'draft'
        }
      }
    
    case 'UPDATE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.map(item =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item
        )
      }
    
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  
  // Demo mode keyboard shortcut (Ctrl+Shift+M)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        dispatch({ type: 'TOGGLE_DEMO_CONTROLS' })
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])
  
  // Helper functions
  const addNotification = (notification) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: notification.id })
    }, 5000)
  }
  
  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }
  
  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error })
  }
  
  const addOrderItem = (item) => {
    dispatch({ type: 'ADD_ORDER_ITEM', payload: item })
    addNotification({
      type: 'success',
      title: 'Item Added',
      message: `${item.name} added to order`
    })
  }
  
  const removeOrderItem = (sku) => {
    dispatch({ type: 'REMOVE_ORDER_ITEM', payload: sku })
    addNotification({
      type: 'info',
      title: 'Item Removed',
      message: 'Item removed from order'
    })
  }
  
  const updateOrderItem = (sku, updates) => {
    dispatch({ type: 'UPDATE_ORDER_ITEM', payload: { sku, updates } })
  }
  
  const setOrderPaymentModel = (paymentModel) => {
    dispatch({ type: 'SET_ORDER_PAYMENT_MODEL', payload: paymentModel })
    addNotification({
      type: 'info',
      title: 'Payment Model Updated',
      message: `Switched to ${PAYMENT_MODELS[paymentModel].name}`
    })
  }
  
  const clearOrder = () => {
    dispatch({ type: 'CLEAR_ORDER' })
    addNotification({
      type: 'info',
      title: 'Order Cleared',
      message: 'All items removed from order'
    })
  }
  
  const updateInventoryItem = (id, updates) => {
    dispatch({ type: 'UPDATE_INVENTORY_ITEM', payload: { id, updates } })
  }
  
  const setDemoMode = (mode) => {
    dispatch({ type: 'SET_DEMO_MODE', payload: mode })
  }
  
  const value = {
    ...state,
    // Actions
    addNotification,
    setLoading,
    setError,
    addOrderItem,
    removeOrderItem,
    updateOrderItem,
    setOrderPaymentModel,
    clearOrder,
    updateInventoryItem,
    setDemoMode
  }
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext

