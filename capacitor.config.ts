import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aliensaileen.app',
  appName: "Alien's Aileen",
  webDir: 'public',
  server: {
    url: 'https://www.aliensaileenapp.xyz',
    cleartext: true
  }
};

export default config;
