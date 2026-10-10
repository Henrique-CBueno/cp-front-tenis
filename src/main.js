import '@fontsource-variable/anybody/standard.css';
import '@fontsource/schibsted-grotesk/400.css';
import '@fontsource/schibsted-grotesk/700.css';
import './style.css';
import { OFFICIAL_TICKETS_URL } from './config.js';

for (const link of document.querySelectorAll('[data-cta]')) {
  link.href = OFFICIAL_TICKETS_URL;
}
