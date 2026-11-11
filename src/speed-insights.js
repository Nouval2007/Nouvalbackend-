/**
 * Speed Insights configuration for LiteraBook Store API
 * 
 * This module provides integration with Vercel Speed Insights for monitoring
 * web performance metrics on the frontend landing page.
 * 
 * Note: Speed Insights is designed for frontend performance monitoring.
 * For a pure REST API without HTML pages, Speed Insights data will only
 * be collected when users visit the landing page.
 */

const { injectSpeedInsights } = require('@vercel/speed-insights');

/**
 * Speed Insights configuration options
 */
const speedInsightsConfig = {
  // Enable debug mode in development
  debug: process.env.NODE_ENV !== 'production',
  
  // Sample rate: 1 = 100% of events, 0.5 = 50% of events
  sampleRate: 1,
  
  // Framework identifier
  framework: 'express',
  
  // Base path for the application
  basePath: '/'
};

/**
 * Middleware to add Speed Insights header information
 * This helps with proper route tracking in Speed Insights dashboard
 */
function speedInsightsMiddleware(req, res, next) {
  // Add route information for Speed Insights tracking
  res.locals.route = req.route?.path || req.path;
  next();
}

/**
 * Initialize Speed Insights for browser environments
 * This is used in the client-side HTML page
 */
function initSpeedInsights() {
  if (typeof window !== 'undefined') {
    injectSpeedInsights(speedInsightsConfig);
  }
}

module.exports = {
  speedInsightsConfig,
  speedInsightsMiddleware,
  initSpeedInsights
};
