const express = require('express');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

// Initialize Sentry
Sentry.init({
  dsn: 'https://56cec845b8c334f0427f2751ef6ffab9@o4507496476639232.ingest.us.sentry.io/4507496481226752',
  tracesSampleRate: 1.0,
});

const app = express();

// Request Handler
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Simple route that throws an error
app.get('/', function mainHandler(req, res) {
  throw new Error('Broke!');
});

// Error Handler
app.use(Sentry.Handlers.errorHandler());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
