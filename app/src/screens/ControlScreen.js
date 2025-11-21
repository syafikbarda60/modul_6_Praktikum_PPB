// import { useCallback, useMemo, useState } from "react";
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
// import { Api } from "../services/api.js";
// import { DataTable } from "../components/DataTable.js";
// import { SafeAreaView } from "react-native-safe-area-context";

// export function ControlScreen() {
//   const [thresholdValue, setThresholdValue] = useState(30);
//   const [note, setNote] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchHistory = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await Api.getThresholds();
//       setHistory(data ?? []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchHistory();
//     }, [fetchHistory])
//   );

//   const latestThreshold = useMemo(() => history?.[0]?.value ?? null, [history]);

//   const handleSubmit = useCallback(async () => {
//     const valueNumber = Number(thresholdValue);
//     if (Number.isNaN(valueNumber)) {
//       setError("Please enter a numeric threshold.");
//       return;
//     }

//     setSubmitting(true);
//     setError(null);
//     try {
//       await Api.createThreshold({ value: valueNumber, note });
//       setNote("");
//       await fetchHistory();
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   }, [thresholdValue, note, fetchHistory]);

//   return (
//     <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.card}>
//           <Text style={styles.title}>Configure Threshold</Text>
//           {latestThreshold !== null && (
//             <Text style={styles.metaText}>
//               Current threshold: {Number(latestThreshold).toFixed(2)}°C
//             </Text>
//           )}
//           <Text style={styles.label}>Threshold (°C)</Text>
//           <TextInput
//             style={styles.input}
//             keyboardType="numeric"
//             value={String(thresholdValue)}
//             onChangeText={setThresholdValue}
//           />
//           <Text style={styles.label}>Note (optional)</Text>
//           <TextInput
//             style={[styles.input, styles.noteInput]}
//             value={note}
//             onChangeText={setNote}
//             multiline
//             numberOfLines={3}
//             placeholder="Describe why you are changing the threshold"
//           />
//           {error && <Text style={styles.errorText}>{error}</Text>}
//           <TouchableOpacity
//             style={[styles.button, submitting && styles.buttonDisabled]}
//             onPress={handleSubmit}
//             disabled={submitting}
//           >
//             {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save Threshold</Text>}
//           </TouchableOpacity>
//         </View>

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Threshold History</Text>
//           {loading && <ActivityIndicator />}
//         </View>
//         <DataTable
//           columns={[
//             {
//               key: "created_at",
//               title: "Saved At",
//               render: (value) => (value ? new Date(value).toLocaleString() : "--"),
//             },
//             {
//               key: "value",
//               title: "Threshold (°C)",
//               render: (value) =>
//                 typeof value === "number" ? `${Number(value).toFixed(2)}` : "--",
//             },
//             {
//               key: "note",
//               title: "Note",
//               render: (value) => value || "-",
//             },
//           ]}
//           data={history}
//           keyExtractor={(item) => item.id}
//         />
//       </ScrollView>
//     </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#f8f9fb",
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
//   label: {
//     marginTop: 16,
//     fontWeight: "600",
//     color: "#444",
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#d0d0d0",
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 8,
//     fontSize: 16,
//     backgroundColor: "#fff",
//   },
//   noteInput: {
//     minHeight: 80,
//     textAlignVertical: "top",
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#2563eb",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonDisabled: {
//     opacity: 0.7,
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   metaText: {
//     color: "#666",
//   },
//   errorText: {
//     marginTop: 12,
//     color: "#c82333",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 12,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   Animated,
// } from 'react-native';
// import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
// import Constants from 'expo-constants';
// import { MaterialIcons } from '@expo/vector-icons';
// import { useAuth } from '../context/AuthContext';

// const ControlScreen = ({ navigation }) => {
//   const [threshold, setThreshold] = useState('');
//   const [currentThreshold, setCurrentThreshold] = useState(null);
//   const [note, setNote] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const { token, isAuthenticated } = useAuth();
//   const backendUrl = Constants.expoConfig.extra.backendUrl;

//   // Animation values for gesture feedback
//   const translateX = new Animated.Value(0);
//   const opacity = new Animated.Value(1);

//   useEffect(() => {
//     fetchCurrentThreshold();
//   }, []);

//   const fetchCurrentThreshold = async () => {
//     try {
//       setFetching(true);
//       const response = await fetch(`${backendUrl}/api/threshold`);
//       const data = await response.json();

//       if (response.ok) {
//         setCurrentThreshold(data);
//         setThreshold(data.value?.toString() || '30');
//       }
//     } catch (error) {
//       console.error('Error fetching threshold:', error);
//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleUpdateThreshold = async () => {
//     if (!isAuthenticated()) {
//       Alert.alert('Error', 'Anda harus login untuk mengubah threshold');
//       return;
//     }

//     if (!threshold || isNaN(parseFloat(threshold))) {
//       Alert.alert('Error', 'Masukkan nilai threshold yang valid');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${backendUrl}/api/threshold`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           value: parseFloat(threshold),
//           note: note || undefined,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Sukses', 'Threshold berhasil diupdate');
//         setCurrentThreshold(data.data);
//         setNote('');
//         fetchCurrentThreshold();
//       } else {
//         Alert.alert('Error', data.error || 'Gagal mengupdate threshold');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Gesture untuk swipe ke kanan (ke Monitoring)
//   const swipeRightGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       if (event.translationX > 0) {
//         translateX.setValue(event.translationX);
//         opacity.setValue(1 - event.translationX / 200);
//       }
//     })
//     .onEnd((event) => {
//       if (event.translationX > 100) {
//         // Swipe successful - navigate
//         Animated.parallel([
//           Animated.timing(translateX, {
//             toValue: 400,
//             duration: 200,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacity, {
//             toValue: 0,
//             duration: 200,
//             useNativeDriver: true,
//           }),
//         ]).start(() => {
//           navigation.navigate('Monitoring');
//           translateX.setValue(0);
//           opacity.setValue(1);
//         });
//       } else {
//         // Reset animation
//         Animated.parallel([
//           Animated.spring(translateX, {
//             toValue: 0,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacity, {
//             toValue: 1,
//             duration: 200,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       }
//     });

//   // Gesture untuk swipe ke kiri (ke Profile)
//   const swipeLeftGesture = Gesture.Pan()
//     .onUpdate((event) => {
//       if (event.translationX < 0) {
//         translateX.setValue(event.translationX);
//         opacity.setValue(1 + event.translationX / 200);
//       }
//     })
//     .onEnd((event) => {
//       if (event.translationX < -100) {
//         // Swipe successful - navigate
//         Animated.parallel([
//           Animated.timing(translateX, {
//             toValue: -400,
//             duration: 200,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacity, {
//             toValue: 0,
//             duration: 200,
//             useNativeDriver: true,
//           }),
//         ]).start(() => {
//           navigation.navigate('Profile');
//           translateX.setValue(0);
//           opacity.setValue(1);
//         });
//       } else {
//         // Reset animation
//         Animated.parallel([
//           Animated.spring(translateX, {
//             toValue: 0,
//             useNativeDriver: true,
//           }),
//           Animated.timing(opacity, {
//             toValue: 1,
//             duration: 200,
//             useNativeDriver: true,
//           }),
//         ]).start();
//       }
//     });

//   const composedGesture = Gesture.Race(swipeRightGesture, swipeLeftGesture);

//   if (!isAuthenticated()) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.lockedContainer}>
//           <MaterialIcons name="lock" size={80} color="#ccc" />
//           <Text style={styles.lockedTitle}>Akses Terbatas</Text>
//           <Text style={styles.lockedSubtitle}>
//             Login untuk mengakses halaman kontrol
//           </Text>
//           <TouchableOpacity
//             style={styles.loginButton}
//             onPress={() => navigation.navigate('Profile')}
//           >
//             <Text style={styles.loginButtonText}>Login Sekarang</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   if (fetching) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={styles.loadingText}>Memuat data...</Text>
//       </View>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <GestureDetector gesture={composedGesture}>
//         <Animated.View
//           style={[
//             styles.contentContainer,
//             {
//               transform: [{ translateX }],
//               opacity,
//             },
//           ]}
//         >
//           {/* Gesture Hint */}
//           <View style={styles.gestureHint}>
//             <View style={styles.gestureHintItem}>
//               <MaterialIcons name="arrow-back" size={20} color="#999" />
//               <Text style={styles.gestureHintText}>Monitoring</Text>
//             </View>
//             <Text style={styles.gestureHintDivider}>|</Text>
//             <View style={styles.gestureHintItem}>
//               <Text style={styles.gestureHintText}>Profile</Text>
//               <MaterialIcons name="arrow-forward" size={20} color="#999" />
//             </View>
//           </View>

//           {/* Header */}
//           <View style={styles.header}>
//             <MaterialIcons name="tune" size={28} color="#007AFF" />
//             <Text style={styles.headerTitle}>Kontrol Threshold</Text>
//           </View>

//           {/* Current Threshold Info */}
//           {currentThreshold && (
//             <View style={styles.currentCard}>
//               <Text style={styles.currentLabel}>Threshold Saat Ini</Text>
//               <View style={styles.currentValueContainer}>
//                 <Text style={styles.currentValue}>
//                   {currentThreshold.value}°C
//                 </Text>
//                 <MaterialIcons name="thermostat" size={40} color="#4CAF50" />
//               </View>
//               {currentThreshold.note && (
//                 <Text style={styles.currentNote}>{currentThreshold.note}</Text>
//               )}
//             </View>
//           )}

//           {/* Update Form */}
//           <View style={styles.formCard}>
//             <Text style={styles.formTitle}>Update Threshold Baru</Text>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Nilai Threshold (°C)</Text>
//               <View style={styles.inputContainer}>
//                 <MaterialIcons name="thermostat" size={24} color="#666" />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Contoh: 30"
//                   value={threshold}
//                   onChangeText={setThreshold}
//                   keyboardType="decimal-pad"
//                 />
//                 <Text style={styles.inputUnit}>°C</Text>
//               </View>
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.inputLabel}>Catatan (Opsional)</Text>
//               <View style={styles.inputContainer}>
//                 <MaterialIcons name="note" size={24} color="#666" />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Tambahkan catatan..."
//                   value={note}
//                   onChangeText={setNote}
//                   multiline
//                 />
//               </View>
//             </View>

//             <TouchableOpacity
//               style={[styles.updateButton, loading && styles.updateButtonDisabled]}
//               onPress={handleUpdateThreshold}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <>
//                   <MaterialIcons name="check" size={24} color="#fff" />
//                   <Text style={styles.updateButtonText}>Update Threshold</Text>
//                 </>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* Info Box */}
//           <View style={styles.infoBox}>
//             <MaterialIcons name="info" size={20} color="#007AFF" />
//             <Text style={styles.infoText}>
//               Threshold digunakan untuk menentukan batas suhu maksimal. Jika suhu
//               melebihi threshold, akan ditandai sebagai warning.
//             </Text>
//           </View>
//         </Animated.View>
//       </GestureDetector>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   contentContainer: {
//     flex: 1,
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 10,
//     color: '#666',
//     fontSize: 16,
//   },
//   gestureHint: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 8,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   gestureHintItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   gestureHintText: {
//     fontSize: 12,
//     color: '#999',
//     marginHorizontal: 5,
//   },
//   gestureHintDivider: {
//     marginHorizontal: 15,
//     color: '#ddd',
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
//   currentCard: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   currentLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 10,
//   },
//   currentValueContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   currentValue: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//   },
//   currentNote: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 10,
//     fontStyle: 'italic',
//   },
//   formCard: {
//     margin: 16,
//     marginTop: 0,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   formTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 20,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 8,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     backgroundColor: '#f9f9f9',
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   inputUnit: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#666',
//   },
//   updateButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007AFF',
//     paddingVertical: 15,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   updateButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   updateButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   infoBox: {
//     flexDirection: 'row',
//     margin: 16,
//     marginTop: 0,
//     padding: 15,
//     backgroundColor: '#E3F2FD',
//     borderRadius: 8,
//     alignItems: 'flex-start',
//   },
//   infoText: {
//     flex: 1,
//     marginLeft: 10,
//     color: '#1976D2',
//     fontSize: 14,
//     lineHeight: 20,
//   },
//   lockedContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   lockedTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 20,
//   },
//   lockedSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 8,
//     marginBottom: 30,
//   },
//   loginButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 30,
//     paddingVertical: 15,
//     borderRadius: 25,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default ControlScreen;
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const ControlScreen = ({ navigation }) => {
  const [threshold, setThreshold] = useState('');
  const [currentThreshold, setCurrentThreshold] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { token, isAuthenticated } = useAuth();
  const backendUrl = Constants.expoConfig.extra.backendUrl;

  // Fetch data saat komponen mount
  useEffect(() => {
    fetchCurrentThreshold();
  }, []);

  const fetchCurrentThreshold = async () => {
    try {
      setFetching(true);
      const response = await fetch(`${backendUrl}/api/thresholds`);

      // Handle non-OK response
      if (!response.ok) {
        setFetching(false); return;
      }

      const data = await response.json();
      if (data) {
        setCurrentThreshold(data);
        setThreshold(data.value?.toString() || '30');
      }
    } catch (error) {
      console.error('Error:', error);
      setThreshold('30');
    } finally {
      setFetching(false);
    }
  };

  const handleUpdateThreshold = async () => {
    if (!isAuthenticated()) {
      Alert.alert('Akses Ditolak', 'Anda harus login untuk mengubah threshold.');
      // Opsional: Redirect ke login
      // navigation.navigate('Profile');
      return;
    }

    if (!threshold || isNaN(parseFloat(threshold))) {
      Alert.alert('Error', 'Masukkan nilai threshold yang valid');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/thresholds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          value: parseFloat(threshold),
          note: note || undefined,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sukses', 'Threshold berhasil diupdate');
        setCurrentThreshold(data.data);
        setNote('');
      } else {
        Alert.alert('Error', data.error || 'Gagal mengupdate');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGIKA GESTURE ---

  // Swipe KANAN: Kembali ke Monitoring (goBack lebih efisien daripada navigate)
  const swipeRightGesture = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Monitoring");
      }
    });

  // Swipe KIRI: Pergi ke Profile
  const swipeLeftGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      navigation.navigate("Profile");
    });

  // Gabungkan gesture
  const composedGesture = Gesture.Exclusive(swipeRightGesture, swipeLeftGesture);

  // Jika belum login, tampilkan UI Terkunci (tanpa Gesture untuk keamanan/UX)
  if (!isAuthenticated()) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kontrol Threshold</Text>
        </View>
        <View style={styles.lockedContainer}>
          <MaterialIcons name="lock" size={80} color="#ccc" />
          <Text style={styles.lockedTitle}>Akses Terbatas</Text>
          <Text style={styles.lockedSubtitle}>Login di menu Profile untuk akses.</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.loginButtonText}>Ke Halaman Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <View style={styles.contentContainer}>

          {/* Gesture Hint */}
          <View style={styles.gestureHint}>
            <View style={styles.gestureHintItem}>
              <MaterialIcons name="arrow-back" size={16} color="#999" />
              <Text style={styles.gestureHintText}>Monitoring</Text>
            </View>
            <Text style={styles.gestureHintDivider}>|</Text>
            <View style={styles.gestureHintItem}>
              <Text style={styles.gestureHintText}>Profile</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#999" />
            </View>
          </View>

          <View style={styles.header}>
            <MaterialIcons name="tune" size={28} color="#007AFF" />
            <Text style={styles.headerTitle}>Kontrol Threshold</Text>
          </View>

          {fetching ? (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : (
            <View>
              {/* Info Card */}
              <View style={styles.currentCard}>
                <Text style={styles.currentLabel}>Saat Ini</Text>
                <View style={styles.currentValueContainer}>
                  <Text style={styles.currentValue}>{currentThreshold?.value ?? '--'}°C</Text>
                  <MaterialIcons name="thermostat" size={32} color="#4CAF50" />
                </View>
                {currentThreshold?.note && <Text style={styles.currentNote}>"{currentThreshold.note}"</Text>}
              </View>

              {/* Form */}
              <View style={styles.formCard}>
                <Text style={styles.formTitle}>Update Baru</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nilai Threshold (°C)</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={threshold}
                      onChangeText={setThreshold}
                      keyboardType="numeric"
                      placeholder="Ex: 30"
                    />
                    <Text style={styles.inputUnit}>°C</Text>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Catatan</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      value={note}
                      onChangeText={setNote}
                      placeholder="Opsional"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.updateButton, loading && styles.updateButtonDisabled]}
                  onPress={handleUpdateThreshold}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : (
                    <Text style={styles.updateButtonText}>Simpan Perubahan</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  contentContainer: { flex: 1 },
  centerContainer: { padding: 50, alignItems: 'center' },
  gestureHint: { flexDirection: 'row', justifyContent: 'center', padding: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  gestureHintItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 },
  gestureHintText: { fontSize: 12, color: '#999', marginHorizontal: 4 },
  gestureHintDivider: { color: '#ddd' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#e0e0e0' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10, color: '#333' },
  currentCard: { margin: 16, padding: 16, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
  currentLabel: { color: '#666', marginBottom: 5 },
  currentValueContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  currentValue: { fontSize: 32, fontWeight: 'bold', color: '#4CAF50' },
  currentNote: { fontStyle: 'italic', color: '#888', marginTop: 8 },
  formCard: { marginHorizontal: 16, padding: 16, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
  formTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { marginBottom: 6, fontWeight: '500', color: '#333' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, backgroundColor: '#fafafa' },
  input: { flex: 1, height: 45, fontSize: 16 },
  inputUnit: { fontWeight: 'bold', color: '#666' },
  updateButton: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  updateButtonDisabled: { backgroundColor: '#ccc' },
  updateButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  lockedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  lockedTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, color: '#333' },
  lockedSubtitle: { color: '#666', textAlign: 'center', marginVertical: 10 },
  loginButton: { backgroundColor: '#007AFF', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, marginTop: 10 },
  loginButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default ControlScreen;