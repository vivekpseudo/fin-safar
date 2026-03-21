import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FileText, Video, Image as ImageIcon, PlayCircle, Download } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface LearnPageProps {}

export const LearnPage: React.FC<LearnPageProps> = () => {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<'all' | 'video' | 'doc'>('all');

    const resources = [
        { id: 1, type: 'pdf', title: t('learn.resources.r1'), size: '2.4 MB' },
        { id: 2, type: 'video', title: t('learn.resources.r2'), duration: '4:20 mins' },
        { id: 3, type: 'image', title: t('learn.resources.r3'), size: 'Image' },
        { id: 4, type: 'pdf', title: t('learn.resources.r4'), size: '1.1 MB' },
        { id: 5, type: 'ppt', title: t('learn.resources.r5'), size: '5 MB' },
        { id: 6, type: 'video', title: t('learn.resources.r6'), duration: '2:15 mins' },
    ];

    const filteredResources = filter === 'all' 
        ? resources 
        : resources.filter(r => r.type === filter || (filter === 'doc' && (r.type === 'pdf' || r.type === 'ppt')));

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText color="#ef4444" size={24} />;
            case 'ppt': return <FileText color="#f97316" size={24} />;
            case 'video': return <Video color="#3b82f6" size={24} />;
            case 'image': return <ImageIcon color="#22c55e" size={24} />;
            default: return <FileText color="#64748b" size={24} />;
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('learn.title')}</Text>
                
                <View style={styles.filterContainer}>
                    <TouchableOpacity 
                        onPress={() => setFilter('all')} 
                        style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
                    >
                        <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>{t('learn.filter.all')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setFilter('video')} 
                        style={[styles.filterButton, filter === 'video' && styles.filterButtonActive]}
                    >
                        <Text style={[styles.filterText, filter === 'video' && styles.filterTextActive]}>{t('learn.filter.video')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setFilter('doc')} 
                        style={[styles.filterButton, filter === 'doc' && styles.filterButtonActive]}
                    >
                        <Text style={[styles.filterText, filter === 'doc' && styles.filterTextActive]}>{t('learn.filter.doc')}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.list}>
                {filteredResources.map(res => (
                    <View key={res.id} style={styles.resourceCard}>
                        <View style={styles.resourceInfo}>
                            <View style={styles.resourceIconContainer}>
                                {getIcon(res.type)}
                            </View>
                            <View style={styles.resourceTextContainer}>
                                <Text style={styles.resourceTitle} numberOfLines={2}>{res.title}</Text>
                                <Text style={styles.resourceMeta}>{res.type.toUpperCase()} • {res.size || res.duration}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.actionButton}>
                            {res.type === 'video' ? <PlayCircle size={24} color="#94a3b8" /> : <Download size={24} color="#94a3b8" />}
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    contentContainer: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
    },
    filterContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
        padding: 4,
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    filterButtonActive: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    filterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#64748b',
    },
    filterTextActive: {
        color: '#1e293b',
    },
    list: {
        flexDirection: 'column',
        gap: 12,
    },
    resourceCard: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#f1f5f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    resourceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    resourceIconContainer: {
        padding: 12,
        backgroundColor: '#f8fafc',
        borderRadius: 12,
        marginRight: 16,
    },
    resourceTextContainer: {
        flex: 1,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 4,
    },
    resourceMeta: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    actionButton: {
        padding: 8,
        borderRadius: 20,
    }
});
