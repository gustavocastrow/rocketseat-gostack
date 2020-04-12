import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:3333"
});

export default api;

/**
 * iOS com Emulador: localhost
 * iOS com físico: IP da máquina
 * Android com Emulador: adb reverse
 * Android com Emulador: 10.0.2.2 (Android Studio)
 * Android com Emulador Geny Motion: 10.0.3.2
 * Android com físico: IP da máquina
 */