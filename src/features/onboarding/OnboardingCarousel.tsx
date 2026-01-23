import React, { useState } from 'react';
import { Smartphone, Trophy, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface OnboardingCarouselProps {
    onNext: () => void;
}

export const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onNext }) => {
    const [slide, setSlide] = useState(0);

    const slides = [
        {
            title: "Play & Learn Finance",
            desc: "Master farming, business, and savings through fun games.",
            icon: <Smartphone size={64} className="text-orange-500" />,
            color: "bg-orange-50"
        },
        {
            title: "Earn Rewards",
            desc: "Collect coins and badges as you improve your financial skills.",
            icon: <Trophy size={64} className="text-yellow-500" />,
            color: "bg-yellow-50"
        },
        {
            title: "Safe & Secure",
            desc: "Learn to protect your money from scams and fraud.",
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
                    {slide === slides.length - 1 ? "Get Started" : "Next"} <ArrowRight size={20} />
                </Button>
            </div>
        </div>
    );
};
