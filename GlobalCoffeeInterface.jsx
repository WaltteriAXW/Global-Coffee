import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Thermometer, Droplets, Coffee, Activity, Settings, 
  AlertTriangle, User, MapPin, Bell, BarChart 
} from 'lucide-react';

const GlobalCoffeeInterface = () => {
  const [systemState, setSystemState] = useState({
    temperature: 94.5,
    pressure: 9.1,
    waterLevel: 78,
    flowRate: 2.3,
    status: 'idle',
    lastMaintenance: '2024-02-05'
  });

  const [userPreferences, setUserPreferences] = useState({
    subscriptionType: 'monthly',
    favoriteProducts: [],
    notificationPreferences: {
      newLocations: true,
      specialOffers: true,
      maintenanceAlerts: false
    },
    advertisingPreferences: {
      personalizedAds: true,
      locationBasedOffers: true,
      shareAnonymousData: true
    }
  });

  const [locationInfo, setLocationInfo] = useState({
    nearestLocations: [
      { id: 1, name: 'Central Station', distance: '0.3 km', status: 'active' },
      { id: 2, name: 'Shopping Mall', distance: '0.8 km', status: 'maintenance' },
      { id: 3, name: 'Business Park', distance: '1.2 km', status: 'active' }
    ],
    currentLocation: 'Helsinki, Finland'
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const products = [
    { id: 1, name: 'Espresso', time: '25s', temp: 94, price: '1.50€' },
    { id: 2, name: 'Americano', time: '35s', temp: 96, price: '2.00€' },
    { id: 3, name: 'Long Black', time: '40s', temp: 95, price: '2.00€' },
    { id: 4, name: 'Cappuccino', time: '45s', temp: 95, price: '2.50€' }
  ];

  const [analyticsData, setAnalyticsData] = useState({
    dailyUsers: 245,
    activeLocations: 12,
    totalSubscribers: 1890,
    averageUsageTime: '08:00 - 10:00'
  });

  const getStatusColor = (status) => {
    const colors = {
      idle: 'bg-blue-500',
      brewing: 'bg-green-500',
      maintenance: 'bg-yellow-500',
      error: 'bg-red-500',
      active: 'bg-green-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Global Coffee System</h1>
        <div className="flex items-center">
          <div className={`h-3 w-3 rounded-full ${getStatusColor(systemState.status)} mr-2`}></div>
          <span className="capitalize">{systemState.status}</span>
        </div>
      </div>

      <Tabs defaultValue="system" className="mb-6">
        <TabsList>
          <TabsTrigger value="system">System Status</TabsTrigger>
          <TabsTrigger value="user">User Profile</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Thermometer className="mr-2" size={20} />
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemState.temperature}°C</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="mr-2" size={20} />
                  Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemState.pressure} bar</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Droplets className="mr-2" size={20} />
                  Water Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemState.waterLevel}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Coffee className="mr-2" size={20} />
                    Product Selection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                        className={`p-4 rounded-lg border transition-colors ${
                          selectedProduct?.id === product.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">
                          {product.time} | {product.temp}°C | {product.price}
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2" size={20} />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Flow Rate</div>
                    <div className="font-medium">{systemState.flowRate} ml/s</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Last Maintenance</div>
                    <div className="font-medium">{systemState.lastMaintenance}</div>
                  </div>
                  {systemState.waterLevel < 20 && (
                    <div className="flex items-center text-yellow-600">
                      <AlertTriangle size={16} className="mr-2" />
                      Low water level
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="user">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" size={20} />
                  User Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-2">Subscription Type</div>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={userPreferences.subscriptionType}
                      onChange={(e) => setUserPreferences({
                        ...userPreferences,
                        subscriptionType: e.target.value
                      })}
                    >
                      <option value="monthly">Monthly (9.99€/month)</option>
                      <option value="yearly">Yearly (99€/year)</option>
                      <option value="payg">Pay As You Go</option>
                    </select>
                  </div>
                  <div>
                    <div className="font-medium mb-2">Notification Preferences</div>
                    {Object.entries(userPreferences.notificationPreferences).map(([key, value]) => (
                      <div key={key} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => {
                            setUserPreferences({
                              ...userPreferences,
                              notificationPreferences: {
                                ...userPreferences.notificationPreferences,
                                [key]: !value
                              }
                            });
                          }}
                          className="mr-2"
                        />
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2" size={20} />
                  Advertising Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(userPreferences.advertisingPreferences).map(([key, value]) => (
                    <div key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => {
                          setUserPreferences({
                            ...userPreferences,
                            advertisingPreferences: {
                              ...userPreferences.advertisingPreferences,
                              [key]: !value
                            }
                          });
                        }}
                        className="mr-2"
                      />
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                  ))}
                  <div className="text-sm text-gray-500 mt-4">
                    Your data is anonymized and handled according to EU GDPR regulations
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" size={20} />
                Nearby Coffee Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationInfo.nearestLocations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-gray-500">{location.distance}</div>
                    </div>
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(location.status)} mr-2`}></div>
                      <span className="capitalize text-sm">{location.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2" size={20} />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500">Daily Active Users</div>
                    <div className="font-medium">{analyticsData.dailyUsers}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Active Locations</div>
                    <div className="font-medium">{analyticsData.activeLocations}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Subscribers</div>
                    <div className="font-medium">{analyticsData.totalSubscribers}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Peak Usage Time</div>
                    <div className="font-medium">{analyticsData.averageUsageTime}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalCoffeeInterface;
