// Global error logging for runtime errors

import { Platform } from "react-native";

// Simple debouncing to prevent duplicate errors
const recentErrors = {};
const clearErrorAfterDelay = (errorKey) => {
  setTimeout(() => delete recentErrors[errorKey], 100);
};

// Function to send errors to parent window (React frontend)
const sendErrorToParent = (level, message, data) => {
  // Create a simple key to identify duplicate errors
  const errorKey = `${level}:${message}:${JSON.stringify(data)}`;

  // Skip if we've seen this exact error recently
  if (recentErrors[errorKey]) {
    return;
  }

  // Mark this error as seen and schedule cleanup
  recentErrors[errorKey] = true;
  clearErrorAfterDelay(errorKey);

  try {
    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'EXPO_ERROR',
        level: level,
        message: message,
        data: data,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        source: 'expo-template'
      }, '*');
    } else {
      // Fallback to console if no parent window
      console.error('🚨 ERROR (no parent):', level, message, data);
    }
  } catch (error) {
    console.error('❌ Failed to send error to parent:', error);
  }
};

// Function to extract meaningful source location from stack trace
const extractSourceLocation = (stack) => {
  if (!stack) return '';

  // Look for various patterns in the stack trace
  const patterns = [
    /at .+\/(app\/[^:)]+):(\d+):(\d+)/,
    /at .+\/(components\/[^:)]+):(\d+):(\d+)/,
    /at .+\/([^/]+\.jsx?):(\d+):(\d+)/,
    /at .+\/([^/]+\.bundle[^:]*):(\d+):(\d+)/,
    /at .+\/([^/\s:)]+\.[j]sx?):(\d+):(\d+)/ // Only .js and .jsx
  ];

  for (const pattern of patterns) {
    const match = stack.match(pattern);
    if (match) {
      return ` | Source: ${match[1]}:${match[2]}:${match[3]}`;
    }
  }

  // If no specific pattern matches, try to find any file reference
  const fileMatch = stack.match(/at .+\/([^/\s:)]+\.[j]sx?):(\d+)/);
  if (fileMatch) {
    return ` | Source: ${fileMatch[1]}:${fileMatch[2]}`;
  }

  return '';
};

// Function to get caller information from stack trace
const getCallerInfo = () => {
  const stack = new Error().stack || '';
  const lines = stack.split('\n');

  // Skip the first few lines (Error, getCallerInfo, console override)
  for (let i = 3; i < lines.length; i++) {
    const line = lines[i];
    if (
      line.indexOf('app/') !== -1 ||
      line.indexOf('components/') !== -1 ||
      line.indexOf('.jsx') !== -1 ||
      line.indexOf('.js') !== -1
    ) {
      const match = line.match(/at .+\/([^/\s:)]+\.[j]sx?):(\d+):(\d+)/);
      if (match) {
        return ` | Called from: ${match[1]}:${match[2]}:${match[3]}`;
      }
    }
  }

  return '';
};

export const setupErrorLogging = () => {
  // Capture unhandled errors in web environment
  if (typeof window !== 'undefined') {
    window.onerror = (message, source, lineno, colno, error) => {
      const sourceFile = source ? source.split('/').pop() : 'unknown';
      const errorData = {
        message: message,
        source: `${sourceFile}:${lineno}:${colno}`,
        line: lineno,
        column: colno,
        error: error && error.stack ? error.stack : error,
        timestamp: new Date().toISOString()
      };

      console.error('🚨 RUNTIME ERROR:', errorData);
      sendErrorToParent('error', 'JavaScript Runtime Error', errorData);
      return false;
    };
    if (Platform.OS === 'web') {
      window.addEventListener('unhandledrejection', (event) => {
        const errorData = {
          reason: event.reason,
          timestamp: new Date().toISOString()
        };

        console.error('🚨 UNHANDLED PROMISE REJECTION:', errorData);
        sendErrorToParent('error', 'Unhandled Promise Rejection', errorData);
      });
    }
  }

  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;

  // UNCOMMENT BELOW CODE TO GET MORE SENSITIVE ERROR LOGGING

  // Override console.error to capture more detailed information
  // console.error = (...args) => {
  //   const stack = new Error().stack || '';
  //   const sourceInfo = extractSourceLocation(stack);
  //   const callerInfo = getCallerInfo();
  //   const enhancedMessage = args.join(' ') + sourceInfo + callerInfo;
  //   originalConsoleError('🔥🔥🔥 ERROR:', new Date().toISOString(), enhancedMessage);
  //   sendErrorToParent('error', 'Console Error', enhancedMessage);
  // };

  // Override console.warn to capture warnings with source location
  // console.warn = (...args) => {
  //   const stack = new Error().stack || '';
  //   const sourceInfo = extractSourceLocation(stack);
  //   const callerInfo = getCallerInfo();
  //   const enhancedMessage = args.join(' ') + sourceInfo + callerInfo;
  //   originalConsoleWarn('⚠️ WARNING:', new Date().toISOString(), enhancedMessage);
  //   sendErrorToParent('warn', 'Console Warning', enhancedMessage);
  // };

  // console.log = (...args) => {
  //   const message = args.join(' ');
  //   if (
  //     message.indexOf('deprecated') !== -1 ||
  //     message.indexOf('warning') !== -1 ||
  //     message.indexOf('error') !== -1
  //   ) {
  //     const stack = new Error().stack || '';
  //     const sourceInfo = extractSourceLocation(stack);
  //     const callerInfo = getCallerInfo();
  //     const enhancedMessage = message + sourceInfo + callerInfo;
  //     originalConsoleLog('📝 LOG (potential issue):', new Date().toISOString(), enhancedMessage);
  //     sendErrorToParent('info', 'Console Log (potential issue)', enhancedMessage);
  //   } else {
  //     originalConsoleLog(...args);
  //   }
  // };

  // Try to intercept React Native warnings at a lower level
  if (typeof window !== 'undefined' && window.__DEV__) {
    const originalWarn = window.console?.warn || console.warn;
    if (window.React && window.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
      const internals = window.React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      if (internals.ReactDebugCurrentFrame) {
        const originalGetStackAddendum = internals.ReactDebugCurrentFrame.getStackAddendum;
        internals.ReactDebugCurrentFrame.getStackAddendum = function() {
          const stack = originalGetStackAddendum ? originalGetStackAddendum.call(this) : '';
          return stack + ' | Enhanced by error logger';
        };
      }
    }
  }
};