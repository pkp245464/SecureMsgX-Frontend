// app/api-usage-dashboard/page.tsx

'use client';

import React from 'react';
import { DigitalDashboard } from '@/app/components/dashboard/DigitalDashboard';
import '@/app/dashboard.css';

export default function ApiUsageDashboard() {
  return (
    <div className="digital-terminal">
      <DigitalDashboard />
    </div>
  );
}