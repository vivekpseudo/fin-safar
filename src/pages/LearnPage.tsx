import React, { useState } from 'react';
import { FileText, Video, Image as ImageIcon, PlayCircle, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LearnPageProps { }

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

    const filteredResources = filter === 'all' ? resources : resources.filter(r => r.type === filter || (filter === 'doc' && (r.type === 'pdf' || r.type === 'ppt')));

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="text-red-500" />;
            case 'ppt': return <FileText className="text-orange-500" />;
            case 'video': return <Video className="text-blue-500" />;
            case 'image': return <ImageIcon className="text-green-500" />;
            default: return <FileText />;
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">{t('learn.title')}</h2>
                <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-bold">
                    <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-white shadow' : 'text-slate-500'}`}>{t('learn.filter.all')}</button>
                    <button onClick={() => setFilter('video')} className={`px-3 py-1 rounded-md ${filter === 'video' ? 'bg-white shadow' : 'text-slate-500'}`}>{t('learn.filter.video')}</button>
                    <button onClick={() => setFilter('doc')} className={`px-3 py-1 rounded-md ${filter === 'doc' ? 'bg-white shadow' : 'text-slate-500'}`}>{t('learn.filter.doc')}</button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                {filteredResources.map(res => (
                    <div key={res.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-slate-50 rounded-lg">
                                {getIcon(res.type)}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{res.title}</h4>
                                <p className="text-xs text-slate-500 uppercase">{res.type} • {res.size || res.duration}</p>
                            </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                            {res.type === 'video' ? <PlayCircle size={20} /> : <Download size={20} />}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
