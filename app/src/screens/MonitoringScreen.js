// import { useCallback, useState } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   RefreshControl,
//   ActivityIndicator,
// } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
// import { useMqttSensor } from "../hooks/useMqttSensor.js";
// import { Api } from "../services/api.js";
// import { DataTable } from "../components/DataTable.js";
// import { SafeAreaView } from "react-native-safe-area-context";

// export function MonitoringScreen() {
//   const { temperature, timestamp, connectionState, error: mqttError } = useMqttSensor();
//   const [readings, setReadings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [apiError, setApiError] = useState(null);

//   const fetchReadings = useCallback(async () => {
//     setLoading(true);
//     setApiError(null);
//     try {
//       const data = await Api.getSensorReadings();
//       setReadings(data ?? []);
//     } catch (err) {
//       setApiError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchReadings();
//     }, [fetchReadings])
//   );

//   const onRefresh = useCallback(async () => {
//     setRefreshing(true);
//     try {
//       await fetchReadings();
//     } finally {
//       setRefreshing(false);
//     }
//   }, [fetchReadings]);

//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       <View style={styles.card}>
//         <Text style={styles.title}>Realtime Temperature</Text>
//         <View style={styles.valueRow}>
//           <Text style={styles.temperatureText}>
//             {typeof temperature === "number" ? `${temperature.toFixed(2)}°C` : "--"}
//           </Text>
//         </View>
//         <Text style={styles.metaText}>MQTT status: {connectionState}</Text>
//         {timestamp && (
//           <Text style={styles.metaText}>
//             Last update: {new Date(timestamp).toLocaleString()}
//           </Text>
//         )}
//         {mqttError && <Text style={styles.errorText}>MQTT error: {mqttError}</Text>}
//       </View>

//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Triggered Readings History</Text>
//         {loading && <ActivityIndicator />}
//       </View>
//       {apiError && <Text style={styles.errorText}>Failed to load history: {apiError}</Text>}
//       <DataTable
//         columns={[
//           {
//             key: "recorded_at",
//             title: "Timestamp",
//             render: (value) => (value ? new Date(value).toLocaleString() : "--"),
//           },
//           {
//             key: "temperature",
//             title: "Temperature (°C)",
//             render: (value) =>
//               typeof value === "number" ? `${Number(value).toFixed(2)}` : "--",
//           },
//           {
//             key: "threshold_value",
//             title: "Threshold (°C)",
//             render: (value) =>
//               typeof value === "number" ? `${Number(value).toFixed(2)}` : "--",
//           },
//         ]}
//         data={readings}
//         keyExtractor={(item) => item.id}
//       />
//     </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fb",
//     padding: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 12,
//   },
//   valueRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   temperatureText: {
//     fontSize: 48,
//     fontWeight: "700",
//     color: "#ff7a59",
//   },
//   metaText: {
//     marginTop: 8,
//     color: "#555",
//   },
//   errorText: {
//     marginTop: 8,
//     color: "#c82333",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   RefreshControl,
//   ActivityIndicator,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import Constants from 'expo-constants';
// import { MaterialIcons } from '@expo/vector-icons';

// const MonitoringScreen = () => {
//   const [readings, setReadings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     limit: 10,
//     offset: 0,
//     hasMore: false,
//   });
//   const [loadingMore, setLoadingMore] = useState(false);

//   const backendUrl = Constants.expoConfig.extra.backendUrl;

//   // Fungsi untuk fetch data
//   const fetchReadings = async (offset = 0, isRefresh = false) => {
//     try {
//       if (offset === 0 && !isRefresh) {
//         setLoading(true);
//       }

//       const response = await fetch(
//         `${backendUrl}/api/readings?limit=${pagination.limit}&offset=${offset}`
//       );

//       if (!response.ok) {
//         throw new Error('Gagal mengambil data');
//       }

//       const result = await response.json();

//       if (isRefresh || offset === 0) {
//         setReadings(result.data);
//       } else {
//         setReadings((prev) => [...prev, ...result.data]);
//       }

//       setPagination({
//         total: result.pagination.total,
//         limit: result.pagination.limit,
//         offset: result.pagination.offset,
//         hasMore: result.pagination.hasMore,
//       });
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     fetchReadings();
//   }, []);

//   // Refresh data
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     fetchReadings(0, true);
//   }, []);

//   // Load halaman berikutnya
//   const loadNextPage = () => {
//     if (!loadingMore && pagination.hasMore) {
//       setLoadingMore(true);
//       const nextOffset = pagination.offset + pagination.limit;
//       fetchReadings(nextOffset);
//     }
//   };

//   // Load halaman sebelumnya
//   const loadPreviousPage = () => {
//     if (!loadingMore && pagination.offset > 0) {
//       setLoadingMore(true);
//       const prevOffset = Math.max(0, pagination.offset - pagination.limit);
//       fetchReadings(prevOffset);
//     }
//   };

//   // Format tanggal
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString('id-ID', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   // Render item
//   const renderItem = ({ item, index }) => {
//     const isWarning = item.threshold_value && item.temperature > item.threshold_value;
//     const globalIndex = pagination.offset + index + 1;

//     return (
//       <View style={[styles.card, isWarning && styles.cardWarning]}>
//         <View style={styles.cardHeader}>
//           <Text style={styles.cardIndex}>#{globalIndex}</Text>
//           {isWarning && (
//             <View style={styles.warningBadge}>
//               <MaterialIcons name="warning" size={16} color="#fff" />
//               <Text style={styles.warningText}>Melebihi Batas</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.temperatureContainer}>
//           <MaterialIcons name="thermostat" size={40} color={isWarning ? '#f44336' : '#4CAF50'} />
//           <Text style={[styles.temperature, isWarning && styles.temperatureWarning]}>
//             {item.temperature}°C
//           </Text>
//         </View>

//         {item.threshold_value && (
//           <View style={styles.thresholdContainer}>
//             <Text style={styles.thresholdLabel}>Batas Threshold:</Text>
//             <Text style={styles.thresholdValue}>{item.threshold_value}°C</Text>
//           </View>
//         )}

//         <View style={styles.dateContainer}>
//           <MaterialIcons name="access-time" size={16} color="#666" />
//           <Text style={styles.date}>{formatDate(item.recorded_at)}</Text>
//         </View>
//       </View>
//     );
//   };

//   // Render footer dengan pagination controls
//   const renderFooter = () => {
//     if (readings.length === 0) return null;

//     const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
//     const totalPages = Math.ceil(pagination.total / pagination.limit);

//     return (
//       <View style={styles.paginationContainer}>
//         <View style={styles.paginationInfo}>
//           <Text style={styles.paginationText}>
//             Halaman {currentPage} dari {totalPages}
//           </Text>
//           <Text style={styles.paginationText}>
//             Total: {pagination.total} data
//           </Text>
//         </View>

//         <View style={styles.paginationButtons}>
//           <TouchableOpacity
//             style={[
//               styles.paginationButton,
//               pagination.offset === 0 && styles.paginationButtonDisabled,
//             ]}
//             onPress={loadPreviousPage}
//             disabled={pagination.offset === 0 || loadingMore}
//           >
//             <MaterialIcons
//               name="chevron-left"
//               size={24}
//               color={pagination.offset === 0 ? '#ccc' : '#007AFF'}
//             />
//             <Text
//               style={[
//                 styles.paginationButtonText,
//                 pagination.offset === 0 && styles.paginationButtonTextDisabled,
//               ]}
//             >
//               Sebelumnya
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.paginationButton,
//               !pagination.hasMore && styles.paginationButtonDisabled,
//             ]}
//             onPress={loadNextPage}
//             disabled={!pagination.hasMore || loadingMore}
//           >
//             <Text
//               style={[
//                 styles.paginationButtonText,
//                 !pagination.hasMore && styles.paginationButtonTextDisabled,
//               ]}
//             >
//               Berikutnya
//             </Text>
//             <MaterialIcons
//               name="chevron-right"
//               size={24}
//               color={!pagination.hasMore ? '#ccc' : '#007AFF'}
//             />
//           </TouchableOpacity>
//         </View>

//         {loadingMore && (
//           <ActivityIndicator size="small" color="#007AFF" style={styles.loadingMore} />
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={styles.loadingText}>Memuat data...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <MaterialIcons name="analytics" size={28} color="#007AFF" />
//         <Text style={styles.headerTitle}>Data Sensor</Text>
//       </View>

//       <FlatList
//         data={readings}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.listContainer}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <MaterialIcons name="inbox" size={64} color="#ccc" />
//             <Text style={styles.emptyText}>Belum ada data sensor</Text>
//           </View>
//         }
//         ListFooterComponent={renderFooter}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#666',
//     fontSize: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#333',
//   },
//   listContainer: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardWarning: {
//     borderLeftWidth: 4,
//     borderLeftColor: '#f44336',
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardIndex: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//   },
//   warningBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f44336',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   warningText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//     marginLeft: 4,
//   },
//   temperatureContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   temperature: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginLeft: 12,
//     color: '#4CAF50',
//   },
//   temperatureWarning: {
//     color: '#f44336',
//   },
//   thresholdContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   thresholdLabel: {
//     fontSize: 14,
//     color: '#666',
//   },
//   thresholdValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginLeft: 8,
//     color: '#FF9800',
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   date: {
//     fontSize: 14,
//     color: '#666',
//     marginLeft: 6,
//   },
//   paginationContainer: {
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   paginationInfo: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   paginationText: {
//     fontSize: 14,
//     color: '#666',
//     marginVertical: 2,
//   },
//   paginationButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   paginationButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#007AFF',
//   },
//   paginationButtonDisabled: {
//     borderColor: '#ccc',
//     backgroundColor: '#f5f5f5',
//   },
//   paginationButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#007AFF',
//     marginHorizontal: 4,
//   },
//   paginationButtonTextDisabled: {
//     color: '#ccc',
//   },
//   loadingMore: {
//     marginTop: 16,
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 60,
//   },
//   emptyText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: '#999',
//   },
// });

// export default MonitoringScreen;

import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const MonitoringScreen = ({ navigation }) => {
  // Ref untuk otomatis scroll ke atas saat ganti halaman
  const flatListRef = useRef(null);

  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 15, // LIMIT TETAP 15
    offset: 0,
    hasMore: false,
  });

  // Kita gunakan satu state loading saja agar transisi halaman lebih jelas
  // tidak perlu loadingMore terpisah karena data diganti total

  const backendUrl = Constants.expoConfig.extra.backendUrl;

  const fetchReadings = async (offset = 0, isRefresh = false) => {
    try {
      // Selalu set loading true saat fetch (kecuali pull-to-refresh)
      // Ini agar user tahu data sedang diganti halaman
      if (!isRefresh) setLoading(true);

      const response = await fetch(
        `${backendUrl}/api/readings?limit=${pagination.limit}&offset=${offset}`
      );

      if (!response.ok) throw new Error('Gagal mengambil data');

      const result = await response.json();

      // --- PERUBAHAN UTAMA DISINI ---
      // Kita SELALU me-replace data (setReadings), tidak pernah append (...prev)
      // Baik itu refresh, halaman pertama, atau halaman selanjutnya.
      setReadings(result.data);

      setPagination({
        total: result.pagination.total,
        limit: result.pagination.limit,
        offset: result.pagination.offset,
        hasMore: result.pagination.hasMore,
      });

      // Scroll otomatis ke paling atas setelah data baru dimuat
      if (flatListRef.current && !isRefresh) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }

    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Reset ke halaman 1 saat layar fokus
      fetchReadings(0, true);
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Reset offset ke 0 saat refresh
    fetchReadings(0, true);
  }, []);

  const loadNextPage = () => {
    if (pagination.hasMore) {
      // Request offset berikutnya (misal: 0 -> 15)
      fetchReadings(pagination.offset + pagination.limit);
    }
  };

  const loadPreviousPage = () => {
    if (pagination.offset > 0) {
      // Request offset sebelumnya (misal: 15 -> 0)
      const prevOffset = Math.max(0, pagination.offset - pagination.limit);
      fetchReadings(prevOffset);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  // Gesture Navigasi
  const swipeLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      console.log("Navigasi ke Control");
      navigation.navigate("Control");
    });

  const renderItem = ({ item, index }) => {
    const isWarning = item.threshold_value && item.temperature > item.threshold_value;
    // Menghitung nomor urut global berdasarkan halaman
    const globalIndex = pagination.offset + index + 1;

    return (
      <View style={[styles.card, isWarning && styles.cardWarning]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIndex}>Data ke-{globalIndex}</Text>
          {isWarning && (
            <View style={styles.warningBadge}>
              <MaterialIcons name="warning" size={16} color="#fff" />
              <Text style={styles.warningText}>Melebihi Batas</Text>
            </View>
          )}
        </View>
        <View style={styles.temperatureContainer}>
          <MaterialIcons name="thermostat" size={40} color={isWarning ? '#f44336' : '#4CAF50'} />
          <Text style={[styles.temperature, isWarning && styles.temperatureWarning]}>
            {item.temperature}°C
          </Text>
        </View>
        {item.threshold_value && (
          <View style={styles.thresholdContainer}>
            <Text style={styles.thresholdLabel}>Batas:</Text>
            <Text style={styles.thresholdValue}>{item.threshold_value}°C</Text>
          </View>
        )}
        <View style={styles.dateContainer}>
          <MaterialIcons name="access-time" size={16} color="#666" />
          <Text style={styles.date}>{formatDate(item.recorded_at)}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (readings.length === 0) return null;

    const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
    const totalPages = Math.ceil(pagination.total / pagination.limit);

    // Hitung range data yang sedang ditampilkan (misal: 16 - 30)
    const startRange = pagination.offset + 1;
    const endRange = Math.min(pagination.offset + pagination.limit, pagination.total);

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationInfo}>
          <Text style={styles.paginationText}>
            Menampilkan data {startRange} - {endRange}
          </Text>
          <Text style={styles.paginationSubText}>
            Halaman {currentPage} dari {totalPages} (Total: {pagination.total})
          </Text>
        </View>
        <View style={styles.paginationButtons}>
          <TouchableOpacity
            style={[styles.paginationButton, pagination.offset === 0 && styles.paginationButtonDisabled]}
            onPress={loadPreviousPage}
            disabled={pagination.offset === 0 || loading}
          >
            <MaterialIcons name="chevron-left" size={24} color={pagination.offset === 0 ? '#ccc' : '#007AFF'} />
            <Text style={[styles.paginationButtonText, pagination.offset === 0 && styles.paginationButtonTextDisabled]}>Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.paginationButton, !pagination.hasMore && styles.paginationButtonDisabled]}
            onPress={loadNextPage}
            disabled={!pagination.hasMore || loading}
          >
            <Text style={[styles.paginationButtonText, !pagination.hasMore && styles.paginationButtonTextDisabled]}>Next</Text>
            <MaterialIcons name="chevron-right" size={24} color={!pagination.hasMore ? '#ccc' : '#007AFF'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={swipeLeftGesture}>
        <View style={styles.container}>
          <View style={styles.gestureHint}>
            <Text style={styles.gestureHintText}>Swipe Kiri ke Control</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#999" />
          </View>

          <View style={styles.header}>
            <MaterialIcons name="analytics" size={28} color="#007AFF" />
            <Text style={styles.headerTitle}>Data Sensor</Text>
          </View>

          {loading ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Memuat halaman...</Text>
            </View>
          ) : (
            <FlatList
              ref={flatListRef} // Pasang ref disini
              data={readings}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              contentContainerStyle={styles.listContainer}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <MaterialIcons name="inbox" size={64} color="#ccc" />
                  <Text style={styles.emptyText}>Belum ada data</Text>
                </View>
              }
              ListFooterComponent={renderFooter}
            />
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666' },
  gestureHint: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  gestureHintText: { fontSize: 12, color: '#999', marginRight: 5 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e0e0e0' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#333' },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardWarning: { borderLeftWidth: 4, borderLeftColor: '#f44336' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardIndex: { color: '#666', fontWeight: '600', fontSize: 12 },
  warningBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f44336', paddingHorizontal: 8, borderRadius: 12 },
  warningText: { color: '#fff', fontSize: 10, marginLeft: 4, fontWeight: 'bold' },
  temperatureContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  temperature: { fontSize: 32, fontWeight: 'bold', marginLeft: 12, color: '#4CAF50' },
  temperatureWarning: { color: '#f44336' },
  thresholdContainer: { flexDirection: 'row', marginBottom: 8 },
  thresholdLabel: { color: '#666' },
  thresholdValue: { fontWeight: '600', marginLeft: 8, color: '#FF9800' },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  date: { color: '#666', marginLeft: 6, fontSize: 12 },
  paginationContainer: { marginTop: 10, marginBottom: 20 },
  paginationInfo: { alignItems: 'center', marginBottom: 15 },
  paginationText: { color: '#333', fontWeight: '600', marginBottom: 4 },
  paginationSubText: { color: '#999', fontSize: 12 },
  paginationButtons: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  paginationButton: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#007AFF', minWidth: 100, justifyContent: 'center' },
  paginationButtonDisabled: { borderColor: '#ccc', backgroundColor: '#f9f9f9' },
  paginationButtonText: { marginHorizontal: 5, color: '#007AFF', fontWeight: '600' },
  paginationButtonTextDisabled: { color: '#ccc' },
  emptyContainer: { alignItems: 'center', padding: 40 },
  emptyText: { color: '#999', marginTop: 10 }
});

export default MonitoringScreen;