import React, { useState, useEffect } from 'react';
import { GETUserCountMetrics } from '../../apis/metrics';
import Layout from '../../components/layout';
import Loading from '../../components/loading';
import { UserAdminCountMetricTypes } from '../../types/metrics';
import './index.css'

const Home: React.FC = () => {

  const [metrics, setMetrics] = useState<UserAdminCountMetricTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    GETUserCountMetrics()
    .then((resp) => {
      const {data} = resp;
      console.log('data', data)
      setMetrics(data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <Loading />

  return (
    <Layout>
      <div className="kpi-container">
        <div className="kpi-card">
          <h2 className="kpi-title">User Count</h2>
          <p className="kpi-value">{metrics?.user_count}</p>
        </div>
        <div className="kpi-card">
          <h2 className="kpi-title">Admin Count</h2>
          <p className="kpi-value">{metrics?.admin_count}</p>
          <div className="admin-breakdown-chart">
            <h3 className="chart-title">Admin Breakdown</h3>
            <div className="chart-data">
              <div className="chart-bar active-admins" style={{width: (metrics ? metrics.active_admin_count/metrics.admin_count : 0) * 100 + '%'}}>
                <p className="chart-label">{metrics?.active_admin_count}</p>
              </div>
              <div className="chart-bar inactive-admins" style={{width: (metrics ? metrics.inactive_admin_count/metrics.admin_count : 0) * 100 + '%'}}>
                <p className="chart-label">{metrics?.inactive_admin_count}</p>
              </div>
            </div>
            <div className="chart-legend">
              <div className="chart-legend-item active-admins">
                <span className="chart-legend-color"></span>
                <span className="chart-legend-label">Active Admins</span>
              </div>
              <div className="chart-legend-item inactive-admins">
                <span className="chart-legend-color"></span>
                <span className="chart-legend-label">Inactive Admins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;