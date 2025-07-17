import React from 'react'
import { MapPin } from 'lucide-react'

export default function StorageLocations() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">Storage Management</h1>
            <p className="page-subtitle">
              Professional storage location management and optimization
            </p>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Enterprise Storage System
          </h3>
          <p className="text-slate-500">
            Advanced storage location management with capacity planning and optimization.
          </p>
        </div>
      </div>
    </div>
  )
}