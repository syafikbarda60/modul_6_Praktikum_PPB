// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     Alert,
//     ActivityIndicator,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
// } from 'react-native';
// import { useAuth } from '../context/AuthContext';
// import { MaterialIcons } from '@expo/vector-icons';

// const LoginScreen = ({ navigation }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const { login } = useAuth();

//     const handleLogin = async () => {
//         if (!email || !password) {
//             Alert.alert('Error', 'Email dan password wajib diisi');
//             return;
//         }

//         setLoading(true);
//         const result = await login(email, password);
//         setLoading(false);

//         if (result.success) {
//             Alert.alert('Sukses', 'Login berhasil!');
//             navigation.replace('MainApp');
//         } else {
//             Alert.alert('Error', result.error);
//         }
//     };

//     const handleSkipLogin = () => {
//         navigation.replace('MainApp');
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={styles.container}
//         >
//             <ScrollView contentContainerStyle={styles.scrollContent}>
//                 <View style={styles.header}>
//                     <MaterialIcons name="lock-outline" size={80} color="#007AFF" />
//                     <Text style={styles.title}>IoT Monitoring</Text>
//                     <Text style={styles.subtitle}>Login untuk mengakses semua fitur</Text>
//                 </View>

//                 <View style={styles.form}>
//                     <View style={styles.inputContainer}>
//                         <MaterialIcons name="email" size={24} color="#666" style={styles.icon} />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Email"
//                             value={email}
//                             onChangeText={setEmail}
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                             autoComplete="email"
//                         />
//                     </View>

//                     <View style={styles.inputContainer}>
//                         <MaterialIcons name="lock" size={24} color="#666" style={styles.icon} />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Password"
//                             value={password}
//                             onChangeText={setPassword}
//                             secureTextEntry={!showPassword}
//                             autoCapitalize="none"
//                         />
//                         <TouchableOpacity
//                             onPress={() => setShowPassword(!showPassword)}
//                             style={styles.eyeIcon}
//                         >
//                             <MaterialIcons
//                                 name={showPassword ? 'visibility' : 'visibility-off'}
//                                 size={24}
//                                 color="#666"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     <TouchableOpacity
//                         style={[styles.button, styles.loginButton]}
//                         onPress={handleLogin}
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <ActivityIndicator color="#fff" />
//                         ) : (
//                             <Text style={styles.buttonText}>Login</Text>
//                         )}
//                     </TouchableOpacity>

//                     <View style={styles.divider}>
//                         <View style={styles.dividerLine} />
//                         <Text style={styles.dividerText}>atau</Text>
//                         <View style={styles.dividerLine} />
//                     </View>

//                     <TouchableOpacity
//                         style={[styles.button, styles.skipButton]}
//                         onPress={handleSkipLogin}
//                     >
//                         <Text style={styles.skipButtonText}>Lanjutkan Tanpa Login</Text>
//                     </TouchableOpacity>

//                     <View style={styles.infoBox}>
//                         <MaterialIcons name="info" size={20} color="#007AFF" />
//                         <Text style={styles.infoText}>
//                             Tanpa login, Anda hanya bisa melihat halaman monitoring
//                         </Text>
//                     </View>
//                 </View>

//                 <View style={styles.demoInfo}>
//                     <Text style={styles.demoTitle}>Demo Account:</Text>
//                     <Text style={styles.demoText}>Email: admin@example.com</Text>
//                     <Text style={styles.demoText}>Password: admin123</Text>
//                 </View>
//             </ScrollView>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//     },
//     scrollContent: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         padding: 20,
//     },
//     header: {
//         alignItems: 'center',
//         marginBottom: 40,
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#333',
//         marginTop: 20,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#666',
//         marginTop: 8,
//     },
//     form: {
//         backgroundColor: '#fff',
//         borderRadius: 12,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 3,
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 8,
//         marginBottom: 16,
//         paddingHorizontal: 12,
//         backgroundColor: '#f9f9f9',
//     },
//     icon: {
//         marginRight: 10,
//     },
//     input: {
//         flex: 1,
//         height: 50,
//         fontSize: 16,
//     },
//     eyeIcon: {
//         padding: 5,
//     },
//     button: {
//         height: 50,
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     loginButton: {
//         backgroundColor: '#007AFF',
//     },
//     skipButton: {
//         backgroundColor: '#fff',
//         borderWidth: 1,
//         borderColor: '#007AFF',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     skipButtonText: {
//         color: '#007AFF',
//         fontSize: 16,
//         fontWeight: '600',
//     },
//     divider: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     dividerLine: {
//         flex: 1,
//         height: 1,
//         backgroundColor: '#ddd',
//     },
//     dividerText: {
//         marginHorizontal: 10,
//         color: '#666',
//         fontSize: 14,
//     },
//     infoBox: {
//         flexDirection: 'row',
//         backgroundColor: '#E3F2FD',
//         padding: 12,
//         borderRadius: 8,
//         marginTop: 20,
//         alignItems: 'flex-start',
//     },
//     infoText: {
//         flex: 1,
//         marginLeft: 10,
//         color: '#1976D2',
//         fontSize: 14,
//     },
//     demoInfo: {
//         marginTop: 30,
//         padding: 15,
//         backgroundColor: '#FFF3E0',
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     demoTitle: {
//         fontSize: 14,
//         fontWeight: '600',
//         color: '#E65100',
//         marginBottom: 5,
//     },
//     demoText: {
//         fontSize: 13,
//         color: '#E65100',
//     },
// });

// export default LoginScreen;
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Email dan password wajib diisi');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            Alert.alert('Sukses', 'Login berhasil!');
            navigation.replace('MainApp');
        } else {
            Alert.alert('Error', result.error);
        }
    };

    const handleSkipLogin = () => {
        navigation.replace('MainApp');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <MaterialIcons name="lock-outline" size={80} color="#007AFF" />
                    <Text style={styles.title}>IoT Monitoring</Text>
                    <Text style={styles.subtitle}>Login untuk mengakses semua fitur</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="email" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <MaterialIcons
                                name={showPassword ? 'visibility' : 'visibility-off'}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.loginButton]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>atau</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.skipButton]}
                        onPress={handleSkipLogin}
                    >
                        <Text style={styles.skipButtonText}>Lanjutkan Tanpa Login</Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Belum punya akun? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLink}>Daftar disini</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoBox}>
                        <MaterialIcons name="info" size={20} color="#007AFF" />
                        <Text style={styles.infoText}>
                            Tanpa login, Anda hanya bisa melihat halaman monitoring
                        </Text>
                    </View>
                </View>

                <View style={styles.demoInfo}>
                    <Text style={styles.demoTitle}>Demo Account:</Text>
                    <Text style={styles.demoText}>Email: admin@example.com</Text>
                    <Text style={styles.demoText}>Password: admin123</Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: '#f9f9f9',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 5,
    },
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#007AFF',
    },
    skipButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    skipButtonText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#666',
        fontSize: 14,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#E3F2FD',
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'flex-start',
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        color: '#1976D2',
        fontSize: 14,
    },
    demoInfo: {
        marginTop: 30,
        padding: 15,
        backgroundColor: '#FFF3E0',
        borderRadius: 8,
        alignItems: 'center',
    },
    demoTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#E65100',
        marginBottom: 5,
    },
    demoText: {
        fontSize: 13,
        color: '#E65100',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    registerText: {
        fontSize: 14,
        color: '#666',
    },
    registerLink: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },
});

export default LoginScreen;
