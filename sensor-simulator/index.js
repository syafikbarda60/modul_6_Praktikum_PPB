// import mqtt from "mqtt";

// const BROKER_URL = "mqtt://broker.hivemq.com:1883";
// const TOPIC = "ppb/kel36/iot/temperature";
// // const BACKEND_BASE_URL = "http://localhost:5000";
// const BACKEND_BASE_URL = "http://192.168.1.20:3000";
// const PUBLISH_INTERVAL_MS = 5000;

// const clientId = `simulator-${Math.random().toString(16).slice(2)}`;
// const client = mqtt.connect(BROKER_URL, {
//   clientId,
//   clean: true,
//   reconnectPeriod: 5000,
// });

// client.on("connect", () => {
//   console.log(`MQTT connected as ${clientId}`);
// });

// client.on("reconnect", () => {
//   console.log("Reconnecting to MQTT broker...");
// });

// client.on("error", (error) => {
//   console.error("MQTT error", error.message);
// });

// async function fetchLatestThreshold() {
//   try {
//     const response = await fetch(`${BACKEND_BASE_URL}/api/thresholds/latest`);
//     if (!response.ok) throw new Error(`HTTP ${response.status}`);
//     const data = await response.json();
//     return data?.value ?? null;
//   } catch (error) {
//     console.error("Failed to fetch threshold:", error.message);
//     return null;
//   }
// }

// async function publishLoop() {
//   let latestThreshold = await fetchLatestThreshold();

//   setInterval(async () => {
//     const temperature = Number((Math.random() * 15 + 20).toFixed(2));
//     const payload = JSON.stringify({ temperature, timestamp: new Date().toISOString() });

//     client.publish(TOPIC, payload, { qos: 0 }, (error) => {
//       if (error) {
//         console.error("Failed to publish temperature", error.message);
//       } else {
//         console.log(`Published ${payload} to ${TOPIC}`);
//       }
//     });

//     if (latestThreshold === null || Math.random() < 0.2) {
//       latestThreshold = await fetchLatestThreshold();
//     }

//     if (typeof latestThreshold === "number" && temperature >= latestThreshold) {
//       try {
//         const response = await fetch(`${BACKEND_BASE_URL}/api/readings`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ temperature, threshold_value: latestThreshold }),
//         });

//         if (!response.ok) {
//           const text = await response.text();
//           throw new Error(`HTTP ${response.status}: ${text}`);
//         }

//         console.log(
//           `Saved triggered reading ${temperature}°C (threshold ${latestThreshold}°C)`
//         );
//       } catch (error) {
//         console.error("Failed to save triggered reading:", error.message);
//       }
//     }
//   }, PUBLISH_INTERVAL_MS);
// }

// publishLoop().catch((error) => {
//   console.error("Simulator failed to start:", error.message);
//   process.exit(1);
// });

// import mqtt from 'mqtt';
// import dotenv from 'dotenv';

// dotenv.config();

// // MQTT Configuration
// const MQTT_BROKER = 'broker.emqx.io';
// const MQTT_PORT = 1883;
// const MQTT_TOPIC = 'ppb/kel36/iot/temperature'; // Sesuaikan dengan kelompok Anda

// // Backend API Configuration
// const BACKEND_URL = process.env.BACKEND_URL || ' http://192.168.1.20:3000';

// // Connect to MQTT Broker
// const client = mqtt.connect(`mqtt://${MQTT_BROKER}:${MQTT_PORT}`, {
//   clientId: `simulator-${Math.random().toString(16).slice(2, 8)}${Math.random().toString(16).slice(2, 8)}`,
//   clean: true,
//   reconnectPeriod: 1000,
// });

// client.on('connect', () => {
//   console.log('MQTT connected as', client.options.clientId);
//   startSimulation();
// });

// client.on('error', (error) => {
//   console.error('MQTT Error:', error);
// });

// client.on('offline', () => {
//   console.log('MQTT offline');
// });

// client.on('reconnect', () => {
//   console.log('MQTT reconnecting...');
// });

// // Fetch current threshold from backend
// async function fetchThreshold() {
//   try {
//     // Changed endpoint from /api/threshold to /api/thresholds
//     const response = await fetch(`${BACKEND_URL}/api/thresholds`);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }

//     const data = await response.json();
//     return data.value || 30; // Default to 30 if no threshold set
//   } catch (error) {
//     console.error('Failed to fetch threshold:', error.message);
//     return 30; // Return default threshold on error
//   }
// }

// // Generate random temperature reading
// function generateTemperature(min = 20, max = 35) {
//   return (Math.random() * (max - min) + min).toFixed(2);
// }

// // Simulate sensor readings
// async function startSimulation() {
//   console.log(`Starting temperature sensor simulation...`);
//   console.log(`Publishing to topic: ${MQTT_TOPIC}`);
//   console.log(`Backend URL: ${BACKEND_URL}`);

//   setInterval(async () => {
//     const temperature = generateTemperature();
//     const timestamp = new Date().toISOString();

//     const payload = {
//       temperature: parseFloat(temperature),
//       timestamp: timestamp,
//     };

//     // Publish to MQTT
//     client.publish(MQTT_TOPIC, JSON.stringify(payload), { qos: 1 }, (error) => {
//       if (error) {
//         console.error('Publish error:', error);
//       } else {
//         console.log('Published', payload, 'to', MQTT_TOPIC);
//       }
//     });

//     // Fetch threshold periodically (every 10 publishes)
//     if (Math.random() < 0.1) {
//       const threshold = await fetchThreshold();
//       console.log(`Current threshold: ${threshold}°C`);
//     }
//   }, 5000); // Publish every 5 seconds
// }

// // Handle graceful shutdown
// process.on('SIGINT', () => {
//   console.log('\nShutting down simulator...');
//   client.end();
//   process.exit(0);
// });

import mqtt from 'mqtt';

// MQTT Configuration
const MQTT_BROKER = 'broker.emqx.io';
const MQTT_PORT = 1883;
const MQTT_TOPIC = 'ppb/kel36/iot/temperature';

// Backend API Configuration
const BACKEND_URL = 'http://192.168.1.3:3000';

// Connect to MQTT Broker
const client = mqtt.connect(`mqtt://${MQTT_BROKER}:${MQTT_PORT}`, {
  clientId: `simulator-${Math.random().toString(16).slice(2, 8)}${Math.random().toString(16).slice(2, 8)}`,
  clean: true,
  reconnectPeriod: 1000,
});

client.on('connect', () => {
  console.log('✓ MQTT connected as', client.options.clientId);
  startSimulation();
});

client.on('error', (error) => {
  console.error('✗ MQTT Error:', error);
});

client.on('offline', () => {
  console.log('⚠ MQTT offline');
});

client.on('reconnect', () => {
  console.log('🔄 MQTT reconnecting...');
});

// Fetch current threshold from backend
async function fetchThreshold() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/thresholds`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.value || 30;
  } catch (error) {
    console.error('✗ Failed to fetch threshold:', error.message);
    return 30;
  }
}

// Save reading directly to backend/Supabase
async function saveToBackend(temperature, thresholdValue) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temperature: temperature,
        threshold_value: thresholdValue,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log(`✓ Saved to database: ${temperature}°C (threshold: ${thresholdValue}°C)`);
    return result;
  } catch (error) {
    console.error('✗ Failed to save to backend:', error.message);
    return null;
  }
}

// Generate random temperature reading
function generateTemperature(min = 20, max = 35) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Simulate sensor readings
async function startSimulation() {
  console.log('🚀 Starting temperature sensor simulation...');
  console.log(`📡 MQTT Topic: ${MQTT_TOPIC}`);
  console.log(`🌐 Backend URL: ${BACKEND_URL}`);
  console.log('');

  // Fetch initial threshold
  let currentThreshold = await fetchThreshold();
  console.log(`📊 Initial threshold: ${currentThreshold}°C`);
  console.log('─────────────────────────────────────');

  let publishCount = 0;

  setInterval(async () => {
    publishCount++;
    const temperature = generateTemperature();
    const timestamp = new Date().toISOString();

    const payload = {
      temperature: temperature,
      timestamp: timestamp,
    };

    console.log(`\n[${publishCount}] ${new Date().toLocaleTimeString()}`);

    // 1. Publish to MQTT
    client.publish(MQTT_TOPIC, JSON.stringify(payload), { qos: 1 }, (error) => {
      if (error) {
        console.error('✗ MQTT Publish error:', error);
      } else {
        console.log(`📤 Published to MQTT: ${temperature}°C`);
      }
    });

    // 2. Save directly to backend (POST to /api/readings)
    const saved = await saveToBackend(temperature, currentThreshold);

    // 3. Check if temperature exceeds threshold
    if (temperature > currentThreshold) {
      console.log(`⚠️  WARNING: Temperature ${temperature}°C exceeds threshold ${currentThreshold}°C!`);
    }

    // 4. Refresh threshold every 5 publishes (~25 seconds)
    if (publishCount % 5 === 0) {
      const newThreshold = await fetchThreshold();
      if (newThreshold !== currentThreshold) {
        console.log(`🔄 Threshold updated: ${currentThreshold}°C → ${newThreshold}°C`);
        currentThreshold = newThreshold;
      }
    }

    console.log('─────────────────────────────────────');
  }, 5000); // Publish every 5 seconds
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n⏹  Shutting down simulator...');
  client.end();
  console.log('✓ MQTT connection closed');
  process.exit(0);
});