import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
    icon: React.ElementType;
    label: string;
    earned: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ icon: Icon, label, earned }) => {
    return (
        <View style={[styles.container, earned ? styles.earnedContainer : styles.unearnedContainer]}>
            <View style={[styles.iconContainer, earned ? styles.earnedIconContainer : styles.unearnedIconContainer]}>
                <Icon size={24} color={earned ? "#ca8a04" : "#94a3b8"} />
            </View>
            <Text style={[styles.label, earned ? styles.earnedLabel : styles.unearnedLabel]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 2,
        width: 100, // Fixed width equivalent to web or flex 1
    },
    earnedContainer: {
        borderColor: '#facc15', // yellow-400
        backgroundColor: '#fefce8', // yellow-50
    },
    unearnedContainer: {
        borderColor: '#e2e8f0', // slate-200
        backgroundColor: '#f8fafc', // slate-50
        opacity: 0.6,
    },
    iconContainer: {
        padding: 8,
        borderRadius: 20,
        marginBottom: 8,
    },
    earnedIconContainer: {
        backgroundColor: '#fef08a', // yellow-100
    },
    unearnedIconContainer: {
        backgroundColor: '#e2e8f0', // slate-200
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    earnedLabel: {
        color: '#334155', // slate-700
    },
    unearnedLabel: {
        color: '#334155', // slate-700
    }
});
