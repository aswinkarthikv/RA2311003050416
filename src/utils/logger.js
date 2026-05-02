import { fetchApi } from '../services/api';

/**
 * Utility to send logs/events happening in the web UI back to the server.
 * Ensures that if logging fails, it does not break the application flow.
 *
 * @param {string} level - "debug", "info", "warn", "error", "fatal"
 * @param {string} message - The log description
 * @param {string} pkg - "component", "api", "page", "state", "style"
 */
export const Log = async (level, message, pkg = "component") => {
  try {
    const logPayload = {
      stack: "frontend",
      level,
      package: pkg,
      message,
    };

    await fetchApi('/logs', {
      method: "POST",
      body: JSON.stringify(logPayload),
    });
  } catch (err) {
    // We swallow the error deliberately here so that a logging failure 
    // never causes a crash or disruption to the user experience.
    console.error("Logger failed to send data to server:", err);
  }
};
