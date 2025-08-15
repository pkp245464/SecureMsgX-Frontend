'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ApiUsageMetric } from '@/types/ticket';
import { fetchApiUsageMetrics } from '@/lib/api';

// Grid background component
const GridBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-10" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    <div className="absolute inset-0 bg-radial-gradient" />
  </div>
);

// Neon glow text component
const NeonText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] ${className}`}>
    {children}
  </span>
);

// Digital card component
const DigitalCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`relative bg-gray-900/80 backdrop-blur-lg border border-cyan-500/30 rounded-xl shadow-[0_0_20px_rgba(56,189,248,0.1)] overflow-hidden ${className}`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
    {children}
  </motion.div>
);

// Main dashboard component
export const DigitalDashboard = () => {
  const [metrics, setMetrics] = useState<ApiUsageMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMetrics = async () => {
    try {
      const data = await fetchApiUsageMetrics();
      setMetrics(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 3000); // Refresh every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Calculate totals
  const totalHits = metrics.reduce((sum, metric) => sum + metric.hit_count, 0);
  const maxHits = Math.max(...metrics.map(m => m.hit_count), 0);

  // Method badge colors
  const methodColors: Record<string, string> = {
    POST: 'bg-cyan-900/50 text-cyan-300',
    GET: 'bg-green-900/50 text-green-300',
    DELETE: 'bg-red-900/50 text-red-300',
    PUT: 'bg-yellow-900/50 text-yellow-300',
    PATCH: 'bg-purple-900/50 text-purple-300',
  };

  // Ticket type icons
  const ticketIcons: Record<string, string> = {
    THREAD: '🧵',
    SINGLE: '📄',
    GROUP: '👥',
    SECURE_SINGLE: '🔒',
  };

  // Custom animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-200 overflow-hidden">
      <GridBackground />
      
      {/* Header */}
      <div className="relative z-10 pt-12 pb-16 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <NeonText>API METRICS TERMINAL</NeonText>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-lg text-gray-400 mb-8">
            Real-time monitoring of encrypted message endpoints
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex items-center px-4 py-2 bg-gray-900/50 border border-cyan-500/30 rounded-lg">
              <div className="w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse" />
              <span className="text-sm font-medium">LIVE DATA STREAM</span>
            </div>
            
            {lastUpdated && (
              <div className="text-sm text-gray-500 font-mono">
                LAST UPDATE: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Stats Summary */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto mb-12"
      >
        <motion.div variants={item}>
          <DigitalCard className="h-full">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">TOTAL REQUESTS</h3>
                  <p className="text-4xl font-bold">
                    <NeonText>{totalHits}</NeonText>
                  </p>
                </div>
                <div className="bg-cyan-500/10 p-3 rounded-lg">
                  <div className="text-2xl">📊</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          </DigitalCard>
        </motion.div>
        
        <motion.div variants={item}>
          <DigitalCard className="h-full">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">TOP ENDPOINT</h3>
                  <p className="text-xl font-mono font-bold truncate">
                    <NeonText>
                      {metrics[0]?.api_endpoint || '/loading...'}
                    </NeonText>
                  </p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <div className="text-2xl">🔥</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {[...new Set(metrics.map(m => m.http_method))].map(method => (
                    <span 
                      key={method}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${methodColors[method] || 'bg-gray-800'}`}
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DigitalCard>
        </motion.div>
        
        <motion.div variants={item}>
          <DigitalCard className="h-full">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">ACTIVITY INDEX</h3>
                  <p className="text-4xl font-bold">
                    <NeonText>
                      {metrics.length > 0 ? Math.round((totalHits / (metrics.length * 50)) * 100) : 0}%
                    </NeonText>
                  </p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <div className="text-2xl">⚡</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#333"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${metrics.length > 0 ? Math.round((totalHits / (metrics.length * 50)) * 100) : 0}, 100`}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </DigitalCard>
        </motion.div>
      </motion.div>

      {/* Endpoint Matrix */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <DigitalCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">
                  <NeonText>ENDPOINT ACTIVITY MATRIX</NeonText>
                </h2>
                <div className="text-sm font-mono text-gray-500">
                  {metrics.length} ACTIVE ENDPOINTS
                </div>
              </div>
              
              {isLoading ? (
                <div className="py-16 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
                  <p className="mt-6 text-gray-500">INITIALIZING DATA STREAM...</p>
                </div>
              ) : (
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                  {metrics.map((metric, index) => (
                    <motion.div 
                      key={`${metric.api_endpoint}-${metric.ticket_type}-${metric.http_method}-${index}`}
                      variants={item}
                    >
                      <div className="border-b border-gray-800/50 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${methodColors[metric.http_method] || 'bg-gray-800'}`}>
                                {metric.http_method}
                              </span>
                              <h3 className="font-mono text-base font-medium">{metric.api_endpoint}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="bg-gray-800 px-3 py-1 rounded-lg text-xs flex items-center">
                                {ticketIcons[metric.ticket_type] || '📋'} {metric.ticket_type}
                              </span>
                              <span className="text-xs text-gray-500 font-mono">
                                {((metric.hit_count / totalHits) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-2xl font-bold font-mono bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                            {metric.hit_count}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center">
                          <div className="w-full bg-gray-800 rounded-full h-2.5 mr-3">
                            <div 
                              className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" 
                              style={{ 
                                width: `${(metric.hit_count / maxHits) * 100}%`,
                                maxWidth: '100%'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </DigitalCard>
        </motion.div>
      </div>

      {/* Visualization Panels */}
      <div className="relative z-10 px-4 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Endpoint Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <DigitalCard>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">
                  <NeonText>ENDPOINT DISTRIBUTION</NeonText>
                </h2>
                
                <div className="space-y-6">
                  {metrics.map((metric, index) => (
                    <div 
                    key={`dist-${metric.api_endpoint}-${metric.ticket_type}-${index}`} 
                      className="flex items-center">
                      <div className="w-1/3 text-sm font-mono truncate mr-3">{metric.api_endpoint}</div>
                      <div className="w-2/3 flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-2.5 mr-2">
                          <div 
                            className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" 
                            style={{ width: `${(metric.hit_count / maxHits) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">{metric.hit_count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DigitalCard>
          </motion.div>
          
          {/* Ticket Type Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <DigitalCard>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">
                  <NeonText>TICKET TYPE DISTRIBUTION</NeonText>
                </h2>
                
                <div className="space-y-6">
                  {Object.entries(
                    metrics.reduce((acc: Record<string, number>, metric) => {
                      acc[metric.ticket_type] = (acc[metric.ticket_type] || 0) + metric.hit_count;
                      return acc;
                    }, {})
                  ).map(([type, count], index) => (
                    <div 
                      key={`type-${type}-${index}`}
                      className="flex items-center"
                    >
                      <div className="w-1/3 flex items-center text-sm font-mono">
                        <span className="mr-2">{ticketIcons[type] || '📋'}</span>
                        {type}
                      </div>
                      <div className="w-2/3 flex items-center">
                        <div className="w-full bg-gray-800 rounded-full h-2.5 mr-2">
                          <div 
                            className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" 
                            style={{ width: `${(Number(count) / totalHits) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DigitalCard>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center pb-12 pt-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-8" />
          <p className="text-gray-500 text-sm font-mono">
            SECUREMSGX API METRICS TERMINAL • ENCRYPTED DATA STREAM • REAL-TIME MONITORING
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Last system refresh: {lastUpdated ? lastUpdated.toLocaleString() : 'Initializing...'}
          </p>
        </div>
      </div>
    </div>
  );
};