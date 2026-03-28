import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { ShieldCheck, ChevronRight } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface AuthScreenProps {
    onLogin: (phone: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
    const { t } = useTranslation();
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

    const handlePhoneSubmit = () => {
        if (phone.length === 10) setStep('otp');
        else Alert.alert('Error', t('auth.invalidMobile'));
    };

    const handleOtpChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus next input
            if (value !== '' && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (index: number, e: any) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        if (otp.join('').length === 4) {
            onLogin(phone);
        } else {
            Alert.alert('Error', t('auth.invalidOtp'));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <ShieldCheck size={40} color="#ea580c" />
                </View>
                <Text style={styles.title}>
                    {step === 'phone' ? t('auth.welcome') : t('auth.verifyTitle')}
                </Text>
                <Text style={styles.subtitle}>
                    {step === 'phone' ? t('auth.enterMobile') : t('auth.sentTo', { phone })}
                </Text>
            </View>

            {step === 'phone' ? (
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('auth.mobileLabel')}</Text>
                        <View style={styles.phoneInputContainer}>
                            <View style={styles.countryCodeContainer}>
                                <Text style={styles.countryCode}>+91</Text>
                            </View>
                            <TextInput
                                style={styles.phoneInput}
                                value={phone}
                                onChangeText={(text) => setPhone(text.replace(/\D/g, ''))}
                                keyboardType="number-pad"
                                maxLength={10}
                                placeholder={t('auth.placeholder')}
                                placeholderTextColor="#94a3b8"
                            />
                        </View>
                    </View>
                    <Button onClick={handlePhoneSubmit}>
                        <Text style={styles.buttonText}>{t('auth.sendOtp')}</Text>
                        <ChevronRight size={20} color="#ffffff" style={styles.buttonIcon} />
                    </Button>
                </View>
            ) : (
                <View style={styles.formContainer}>
                    <View style={styles.otpContainer}>
                        {otp.map((digit, i) => (
                            <TextInput
                                key={i}
                                ref={(el) => (inputRefs.current[i] = el)}
                                style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                                value={digit}
                                onChangeText={(val) => handleOtpChange(i, val)}
                                onKeyPress={(e) => handleKeyPress(i, e)}
                                keyboardType="number-pad"
                                maxLength={1}
                            />
                        ))}
                    </View>
                    <Button onClick={handleVerify}>
                        <Text style={styles.buttonText}>{t('auth.verifyLogin')}</Text>
                    </Button>
                    <TouchableOpacity onPress={() => setStep('phone')} style={styles.changeNumberButton}>
                        <Text style={styles.changeNumberText}>{t('auth.changeNumber')}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    iconContainer: {
        backgroundColor: '#ffedd5',
        padding: 16,
        borderRadius: 40,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#64748b',
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#334155',
        marginBottom: 8,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    countryCodeContainer: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingVertical: 14,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e2e8f0',
    },
    countryCode: {
        color: '#64748b',
        fontWeight: 'bold',
        fontSize: 16,
    },
    phoneInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
        letterSpacing: 2,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 32,
    },
    otpInput: {
        width: 56,
        height: 56,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    otpInputFilled: {
        borderColor: '#ea580c',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
        lineHeight: 26,
    },
    buttonIcon: {
        marginLeft: 10,
    },
    changeNumberButton: {
        marginTop: 16,
        padding: 8,
    },
    changeNumberText: {
        textAlign: 'center',
        color: '#64748b',
        fontWeight: 'bold',
        fontSize: 14,
    }
});
