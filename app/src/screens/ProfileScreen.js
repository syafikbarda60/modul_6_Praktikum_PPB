// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
//     Alert,
// } from 'react-native';
// import { useAuth } from '../context/AuthContext';
// import { MaterialIcons } from '@expo/vector-icons';

// const ProfileScreen = ({ navigation }) => {
//     const { user, logout, isAuthenticated } = useAuth();

//     const handleLogout = () => {
//         Alert.alert(
//             'Konfirmasi Logout',
//             'Apakah Anda yakin ingin keluar?',
//             [
//                 {
//                     text: 'Batal',
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Logout',
//                     style: 'destructive',
//                     onPress: async () => {
//                         await logout();
//                         navigation.replace('Login');
//                     },
//                 },
//             ]
//         );
//     };

//     const handleLogin = () => {
//         navigation.navigate('Login');
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return '-';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('id-ID', {
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric',
//         });
//     };

//     // Jika belum login
//     if (!isAuthenticated()) {
//         return (
//             <View style={styles.container}>
//                 <ScrollView contentContainerStyle={styles.guestContainer}>
//                     <MaterialIcons name="account-circle" size={120} color="#ccc" />
//                     <Text style={styles.guestTitle}>Belum Login</Text>
//                     <Text style={styles.guestSubtitle}>
//                         Login untuk mengakses semua fitur aplikasi
//                     </Text>

//                     <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//                         <MaterialIcons name="login" size={24} color="#fff" />
//                         <Text style={styles.loginButtonText}>Login Sekarang</Text>
//                     </TouchableOpacity>

//                     <View style={styles.guestInfoBox}>
//                         <MaterialIcons name="info" size={20} color="#007AFF" />
//                         <Text style={styles.guestInfoText}>
//                             Saat ini Anda hanya dapat melihat halaman monitoring
//                         </Text>
//                     </View>
//                 </ScrollView>
//             </View>
//         );
//     }

//     // Jika sudah login
//     return (
//         <View style={styles.container}>
//             <ScrollView>
//                 {/* Header Profil */}
//                 <View style={styles.header}>
//                     <View style={styles.avatarContainer}>
//                         <MaterialIcons name="account-circle" size={100} color="#007AFF" />
//                     </View>
//                     <Text style={styles.name}>{user?.name || 'User'}</Text>
//                     <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
//                 </View>

//                 {/* Informasi Detail */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Informasi Akun</Text>

//                     <View style={styles.infoCard}>
//                         <View style={styles.infoRow}>
//                             <View style={styles.infoLabel}>
//                                 <MaterialIcons name="badge" size={20} color="#666" />
//                                 <Text style={styles.infoLabelText}>User ID</Text>
//                             </View>
//                             <Text style={styles.infoValue}>{user?.id?.slice(0, 8)}...</Text>
//                         </View>

//                         <View style={styles.divider} />

//                         <View style={styles.infoRow}>
//                             <View style={styles.infoLabel}>
//                                 <MaterialIcons name="email" size={20} color="#666" />
//                                 <Text style={styles.infoLabelText}>Email</Text>
//                             </View>
//                             <Text style={styles.infoValue}>{user?.email}</Text>
//                         </View>

//                         <View style={styles.divider} />

//                         <View style={styles.infoRow}>
//                             <View style={styles.infoLabel}>
//                                 <MaterialIcons name="person" size={20} color="#666" />
//                                 <Text style={styles.infoLabelText}>Nama</Text>
//                             </View>
//                             <Text style={styles.infoValue}>{user?.name}</Text>
//                         </View>

//                         <View style={styles.divider} />

//                         <View style={styles.infoRow}>
//                             <View style={styles.infoLabel}>
//                                 <MaterialIcons name="calendar-today" size={20} color="#666" />
//                                 <Text style={styles.infoLabelText}>Terdaftar Sejak</Text>
//                             </View>
//                             <Text style={styles.infoValue}>{formatDate(user?.created_at)}</Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Akses & Privilege */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Akses & Hak Akses</Text>

//                     <View style={styles.accessCard}>
//                         <View style={styles.accessItem}>
//                             <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
//                             <Text style={styles.accessText}>Lihat Data Monitoring</Text>
//                         </View>
//                         <View style={styles.accessItem}>
//                             <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
//                             <Text style={styles.accessText}>Kontrol Threshold</Text>
//                         </View>
//                         <View style={styles.accessItem}>
//                             <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
//                             <Text style={styles.accessText}>Akses Semua Halaman</Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Menu Aksi */}
//                 <View style={styles.section}>
//                     <Text style={styles.sectionTitle}>Pengaturan</Text>

//                     <TouchableOpacity style={styles.menuItem}>
//                         <View style={styles.menuLeft}>
//                             <MaterialIcons name="notifications" size={24} color="#666" />
//                             <Text style={styles.menuText}>Notifikasi</Text>
//                         </View>
//                         <MaterialIcons name="chevron-right" size={24} color="#ccc" />
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.menuItem}>
//                         <View style={styles.menuLeft}>
//                             <MaterialIcons name="security" size={24} color="#666" />
//                             <Text style={styles.menuText}>Keamanan</Text>
//                         </View>
//                         <MaterialIcons name="chevron-right" size={24} color="#ccc" />
//                     </TouchableOpacity>

//                     <TouchableOpacity style={styles.menuItem}>
//                         <View style={styles.menuLeft}>
//                             <MaterialIcons name="help" size={24} color="#666" />
//                             <Text style={styles.menuText}>Bantuan</Text>
//                         </View>
//                         <MaterialIcons name="chevron-right" size={24} color="#ccc" />
//                     </TouchableOpacity>
//                 </View>

//                 {/* Logout Button */}
//                 <View style={styles.section}>
//                     <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//                         <MaterialIcons name="logout" size={24} color="#f44336" />
//                         <Text style={styles.logoutButtonText}>Logout</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={styles.footer}>
//                     <Text style={styles.footerText}>IoT Monitoring App v1.0.0</Text>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//     },
//     guestContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//     },
//     guestTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//         marginTop: 20,
//     },
//     guestSubtitle: {
//         fontSize: 16,
//         color: '#666',
//         textAlign: 'center',
//         marginTop: 8,
//         marginBottom: 30,
//     },
//     loginButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#007AFF',
//         paddingHorizontal: 30,
//         paddingVertical: 15,
//         borderRadius: 25,
//     },
//     loginButtonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: '600',
//         marginLeft: 10,
//     },
//     guestInfoBox: {
//         flexDirection: 'row',
//         backgroundColor: '#E3F2FD',
//         padding: 15,
//         borderRadius: 8,
//         marginTop: 30,
//         alignItems: 'flex-start',
//     },
//     guestInfoText: {
//         flex: 1,
//         marginLeft: 10,
//         color: '#1976D2',
//         fontSize: 14,
//         textAlign: 'center',
//     },
//     header: {
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         paddingVertical: 30,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     avatarContainer: {
//         marginBottom: 15,
//     },
//     name: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 5,
//     },
//     email: {
//         fontSize: 16,
//         color: '#666',
//     },
//     section: {
//         marginTop: 20,
//         paddingHorizontal: 16,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: 12,
//     },
//     infoCard: {
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     infoRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: 12,
//     },
//     infoLabel: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     infoLabelText: {
//         fontSize: 16,
//         color: '#666',
//         marginLeft: 10,
//     },
//     infoValue: {
//         fontSize: 16,
//         color: '#333',
//         fontWeight: '500',
//     },
//     divider: {
//         height: 1,
//         backgroundColor: '#e0e0e0',
//     },
//     accessCard: {
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     accessItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 10,
//     },
//     accessText: {
//         fontSize: 16,
//         color: '#333',
//         marginLeft: 12,
//     },
//     menuItem: {
//         backgroundColor: '#fff',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 16,
//         borderRadius: 8,
//         marginBottom: 8,
//     },
//     menuLeft: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     menuText: {
//         fontSize: 16,
//         color: '#333',
//         marginLeft: 12,
//     },
//     logoutButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//         paddingVertical: 16,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: '#f44336',
//     },
//     logoutButtonText: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#f44336',
//         marginLeft: 10,
//     },
//     footer: {
//         alignItems: 'center',
//         paddingVertical: 30,
//     },
//     footerText: {
//         fontSize: 14,
//         color: '#999',
//     },
// });

// export default ProfileScreen;

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
// 1. Import Library Gesture
import { GestureHandlerRootView, GestureDetector, Gesture, Directions } from 'react-native-gesture-handler';
import { useAuth } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    const { user, logout, isAuthenticated } = useAuth();

    // --- LOGIKA GESTURE ---
    // Menggunakan Directions.RIGHT (Swipe Kanan) untuk kembali ke Control
    // karena Control berada di sebelah "kiri" dari halaman Profile.
    const swipeRightGesture = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd(() => {
            console.log("Swipe Right -> Kembali ke Control");
            // Gunakan goBack jika ada di stack, atau navigate untuk memaksa
            navigation.navigate("Control");
        });

    // Opsional: Jika ingin memblokir swipe kiri (karena ini halaman terakhir)
    // atau biarkan default. Disini kita pasang Exclusive hanya untuk swipeRight.

    const handleLogout = () => {
        Alert.alert(
            'Konfirmasi Logout',
            'Apakah Anda yakin ingin keluar?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        navigation.replace('Login');
                    },
                },
            ]
        );
    };

    const handleLogin = () => navigation.navigate('Login');
    const handleRegister = () => navigation.navigate('Register');

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric',
        });
    };

    // --- UI UNTUK GUEST (BELUM LOGIN) ---
    if (!isAuthenticated()) {
        return (
            <GestureHandlerRootView style={styles.container}>
                <GestureDetector gesture={swipeRightGesture}>
                    <View style={styles.container}>
                        {/* Gesture Hint */}
                        <View style={styles.gestureHint}>
                            <MaterialIcons name="arrow-back" size={16} color="#999" />
                            <Text style={styles.gestureHintText}>Swipe Kanan ke Control</Text>
                        </View>

                        <ScrollView contentContainerStyle={styles.guestContainer}>
                            <MaterialIcons name="account-circle" size={120} color="#ccc" />
                            <Text style={styles.guestTitle}>Belum Login</Text>
                            <Text style={styles.guestSubtitle}>
                                Login untuk mengakses semua fitur aplikasi
                            </Text>

                            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                <MaterialIcons name="login" size={24} color="#fff" />
                                <Text style={styles.loginButtonText}>Login Sekarang</Text>
                            </TouchableOpacity>

                            <View style={styles.guestInfoBox}>
                                <MaterialIcons name="info" size={20} color="#007AFF" />
                                <Text style={styles.guestInfoText}>
                                    Saat ini Anda hanya dapat melihat halaman monitoring
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </GestureDetector>
            </GestureHandlerRootView>
        );
    }

    // --- UI UTAMA (SUDAH LOGIN) ---
    return (
        <GestureHandlerRootView style={styles.container}>
            <GestureDetector gesture={swipeRightGesture}>
                <View style={styles.container}>

                    {/* Gesture Hint Visual */}
                    <View style={styles.gestureHint}>
                        <MaterialIcons name="arrow-back" size={16} color="#999" />
                        <Text style={styles.gestureHintText}>Swipe Kanan ke Control</Text>
                    </View>

                    <ScrollView>
                        {/* Header Profil */}
                        <View style={styles.header}>
                            <View style={styles.avatarContainer}>
                                <MaterialIcons name="account-circle" size={100} color="#007AFF" />
                            </View>
                            <Text style={styles.name}>{user?.name || 'User'}</Text>
                            <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
                        </View>

                        {/* Informasi Detail */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Informasi Akun</Text>

                            <View style={styles.infoCard}>
                                <View style={styles.infoRow}>
                                    <View style={styles.infoLabel}>
                                        <MaterialIcons name="badge" size={20} color="#666" />
                                        <Text style={styles.infoLabelText}>User ID</Text>
                                    </View>
                                    <Text style={styles.infoValue}>{user?.id?.slice(0, 8)}...</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.infoRow}>
                                    <View style={styles.infoLabel}>
                                        <MaterialIcons name="email" size={20} color="#666" />
                                        <Text style={styles.infoLabelText}>Email</Text>
                                    </View>
                                    <Text style={styles.infoValue}>{user?.email}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.infoRow}>
                                    <View style={styles.infoLabel}>
                                        <MaterialIcons name="person" size={20} color="#666" />
                                        <Text style={styles.infoLabelText}>Nama</Text>
                                    </View>
                                    <Text style={styles.infoValue}>{user?.name}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.infoRow}>
                                    <View style={styles.infoLabel}>
                                        <MaterialIcons name="calendar-today" size={20} color="#666" />
                                        <Text style={styles.infoLabelText}>Terdaftar Sejak</Text>
                                    </View>
                                    <Text style={styles.infoValue}>{formatDate(user?.created_at)}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Akses & Privilege */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Akses & Hak Akses</Text>
                            <View style={styles.accessCard}>
                                <View style={styles.accessItem}>
                                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                                    <Text style={styles.accessText}>Lihat Data Monitoring</Text>
                                </View>
                                <View style={styles.accessItem}>
                                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                                    <Text style={styles.accessText}>Kontrol Threshold</Text>
                                </View>
                                <View style={styles.accessItem}>
                                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                                    <Text style={styles.accessText}>Akses Semua Halaman</Text>
                                </View>
                            </View>
                        </View>

                        {/* Menu Aksi */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Pengaturan</Text>
                            <TouchableOpacity style={styles.menuItem}>
                                <View style={styles.menuLeft}>
                                    <MaterialIcons name="notifications" size={24} color="#666" />
                                    <Text style={styles.menuText}>Notifikasi</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}>
                                <View style={styles.menuLeft}>
                                    <MaterialIcons name="security" size={24} color="#666" />
                                    <Text style={styles.menuText}>Keamanan</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}>
                                <View style={styles.menuLeft}>
                                    <MaterialIcons name="help" size={24} color="#666" />
                                    <Text style={styles.menuText}>Bantuan</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={24} color="#ccc" />
                            </TouchableOpacity>
                        </View>

                        {/* Logout Button */}
                        <View style={styles.section}>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <MaterialIcons name="logout" size={24} color="#f44336" />
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>IoT Monitoring App v1.0.0</Text>
                        </View>
                    </ScrollView>
                </View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    // Style baru untuk Gesture Hint
    gestureHint: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    gestureHintText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 5,
    },
    // ... style lama tetap sama ...
    guestContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    guestTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 20 },
    guestSubtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 8, marginBottom: 30 },
    loginButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 25 },
    loginButtonText: { color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 10 },
    guestInfoBox: { flexDirection: 'row', backgroundColor: '#E3F2FD', padding: 15, borderRadius: 8, marginTop: 30, alignItems: 'flex-start' },
    guestInfoText: { flex: 1, marginLeft: 10, color: '#1976D2', fontSize: 14, textAlign: 'center' },
    header: { backgroundColor: '#fff', alignItems: 'center', paddingVertical: 30, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
    avatarContainer: { marginBottom: 15 },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    email: { fontSize: 16, color: '#666' },
    section: { marginTop: 20, paddingHorizontal: 16 },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12 },
    infoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
    infoLabel: { flexDirection: 'row', alignItems: 'center' },
    infoLabelText: { fontSize: 16, color: '#666', marginLeft: 10 },
    infoValue: { fontSize: 16, color: '#333', fontWeight: '500' },
    divider: { height: 1, backgroundColor: '#e0e0e0' },
    accessCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    accessItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
    accessText: { fontSize: 16, color: '#333', marginLeft: 12 },
    menuItem: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 8, marginBottom: 8 },
    menuLeft: { flexDirection: 'row', alignItems: 'center' },
    menuText: { fontSize: 16, color: '#333', marginLeft: 12 },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 16, borderRadius: 8, borderWidth: 1, borderColor: '#f44336' },
    logoutButtonText: { fontSize: 16, fontWeight: '600', color: '#f44336', marginLeft: 10 },
    footer: { alignItems: 'center', paddingVertical: 30 },
    footerText: { fontSize: 14, color: '#999' },
});

export default ProfileScreen;