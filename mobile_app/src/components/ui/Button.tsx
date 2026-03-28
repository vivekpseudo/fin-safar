import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    type?: 'button' | 'submit' | 'reset'; // Kept for API compatibility, though not strictly relevant in RN
}

export const Button: React.FC<ButtonProps> = ({ 
    onClick, 
    children, 
    variant = "primary", 
    disabled = false, 
    style,
    textStyle,
}) => {
    
    const getBackgroundStyle = () => {
        switch (variant) {
            case 'primary': return styles.primary;
            case 'secondary': return styles.secondary;
            case 'outline': return styles.outline;
            case 'danger': return styles.danger;
            case 'success': return styles.success;
            default: return styles.primary;
        }
    };

    const getTextStyle = () => {
        if (variant === 'outline') return styles.outlineText;
        return styles.defaultText;
    };

    return (
        <TouchableOpacity
            onPress={onClick}
            disabled={disabled}
            activeOpacity={0.8}
            style={[
                styles.baseStyle, 
                getBackgroundStyle(), 
                disabled && styles.disabled, 
                style
            ]}
        >
            <Text style={[getTextStyle(), textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    baseStyle: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.5,
    },
    primary: {
        backgroundColor: '#ea580c', // orange-600
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    secondary: {
        backgroundColor: '#0d9488', // teal-600
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#e2e8f0', // slate-200
    },
    danger: {
        backgroundColor: '#ef4444', // red-500
    },
    success: {
        backgroundColor: '#16a34a', // green-600
    },
    defaultText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    outlineText: {
        color: '#334155', // slate-700
        fontWeight: 'bold',
        fontSize: 16,
    }
});
