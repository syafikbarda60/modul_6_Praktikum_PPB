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

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register } = useAuth();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleRegister = async () => {
        // Validasi input
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Semua field wajib diisi');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Format email tidak valid');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password minimal 6 karakter');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Password dan konfirmasi password tidak sama');
            return;
        }

        setLoading(true);
        const result = await register(email, password, name);
        setLoading(false);

        if (result.success) {
            Alert.alert(
                'Sukses',
                'Registrasi berhasil! Silakan login dengan akun baru Anda.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login'),
                    },
                ]
            );
        } else {
            Alert.alert('Error', result.error);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <MaterialIcons name="person-add" size={80} color="#007AFF" />
                    <Text style={styles.title}>Buat Akun Baru</Text>
                    <Text style={styles.subtitle}>Daftar untuk mengakses semua fitur</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Nama */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="person" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nama Lengkap"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            autoComplete="name"
                        />
                    </View>

                    {/* Email */}
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

                    {/* Password */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password (min. 6 karakter)"
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

                    {/* Confirm Password */}
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock-outline" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Konfirmasi Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                        >
                            <MaterialIcons
                                name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                                size={24}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity
                        style={[styles.button, styles.registerButton]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <>
                                <MaterialIcons name="check" size={24} color="#fff" />
                                <Text style={styles.buttonText}>Daftar</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* Back to Login */}
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Sudah punya akun? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login disini</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Info Box */}
                    <View style={styles.infoBox}>
                        <MaterialIcons name="info" size={20} color="#007AFF" />
                        <Text style={styles.infoText}>
                            Setelah mendaftar, Anda dapat login dan mengakses semua fitur kontrol
                        </Text>
                    </View>
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
        flexDirection: 'row',
    },
    registerButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 14,
        color: '#666',
    },
    loginLink: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
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
});

export default RegisterScreen;