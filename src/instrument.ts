import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

// Ensure this is called before importing any other modules!
// Replace the DSN with your actual Sentry DSN
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // Add profiling integration if you want profiling
    nodeProfilingIntegration(),
  ],
  // Adjust as needed for performance monitoring
  tracesSampleRate: 1.0,
  // Set profilesSampleRate if profiling is desired
  profilesSampleRate: 1.0,
});
