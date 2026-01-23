import React, { useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 2500); // 2.5 seconds splash
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="h-screen bg-orange-600 flex flex-col items-center justify-center text-white animate-fadeIn">
            <div className="bg-white p-6 rounded-3xl mb-6 shadow-2xl animate-bounce">
                <TrendingUp size={64} className="text-orange-600" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">FinSafar</h1>
            <p className="text-orange-100 text-lg font-medium tracking-wide">Financial Literacy for Bharat</p>

            <div className="absolute bottom-10 flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
            </div>
        </div>
    );
};
