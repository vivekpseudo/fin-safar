import React, { useState } from 'react';
import { Smartphone, Trophy, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';

interface OnboardingCarouselProps {
    onNext: () => void;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onNext }) => {
    const { t } = useTranslation();
    const [slide, setSlide] = useState(0);

    const slides = [
        {
            title: t('carousel.slide1.title'),
            desc: t('carousel.slide1.desc'),
            icon: <Smartphone size={64} className="text-orange-500" />,
            color: "bg-orange-50"
        },
        {
            title: t('carousel.slide2.title'),
            desc: t('carousel.slide2.desc'),
            icon: <Trophy size={64} className="text-yellow-500" />,
            color: "bg-yellow-50"
        },
        {
            title: t('carousel.slide3.title'),
            desc: t('carousel.slide3.desc'),
            icon: <ShieldCheck size={64} className="text-green-500" />,
            color: "bg-green-50"
        }
    ];

    const handleNext = () => {
        if (slide < slides.length - 1) {
            setSlide(s => s + 1);
        } else {
            onNext();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white p-6 animate-fadeIn">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                <div className={`p-8 rounded-full ${slides[slide].color} mb-4 animate-slideUp`}>
                    {slides[slide].icon}
                </div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-800">{slides[slide].title}</h2>
                    <p className="text-slate-500 text-lg px-4">{slides[slide].desc}</p>
                </div>
            </div>

            <div className="space-y-6 mb-8">
                <div className="flex justify-center gap-2">
                    {slides.map((_, i) => (
                        <div key={i} className={`h-2 rounded-full transition-all ${i === slide ? 'w-8 bg-orange-600' : 'w-2 bg-slate-200'}`} />
                    ))}
                </div>

                <Button onClick={handleNext}>
                    {slide === slides.length - 1 ? t('carousel.getStarted') : t('carousel.next')} <ArrowRight size={20} />
                </Button>
            </div>
        </div>
    );
};
