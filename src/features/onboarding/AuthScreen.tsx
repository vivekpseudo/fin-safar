import React, { useState, useRef } from 'react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AuthScreenProps {
    onLogin: (phone: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length === 10) setStep('otp');
        else alert("Please enter a valid 10-digit number");
    };

    const handleOtpChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;

        // Handle typing single digit
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

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace to move focus back
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);

        if (/^\d+$/.test(pastedData)) {
            const newOtp = [...otp];
            const digits = pastedData.split('');
            digits.forEach((digit, index) => {
                if (index < 4) newOtp[index] = digit;
            });
            setOtp(newOtp);

            // Focus the last filled input
            const lastIndex = Math.min(digits.length, 3);
            if (digits.length === 4) {
                inputRefs.current[3]?.focus();
            } else {
                inputRefs.current[lastIndex]?.focus();
            }
        }
    };

    const handleVerify = () => {
        if (otp.join('').length === 4) {
            onLogin(phone);
        } else {
            alert("Please enter valid OTP (Any 4 digits)");
        }
    };

    return (
        <div className="h-screen bg-white p-6 flex flex-col justify-center animate-fadeIn">
            <div className="mb-8 text-center">
                <div className="inline-block p-4 bg-orange-100 rounded-full mb-4">
                    <ShieldCheck size={40} className="text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                    {step === 'phone' ? "Welcome to FinSafar" : "Verify OTP"}
                </h2>
                <p className="text-slate-500">
                    {step === 'phone' ? "Enter your mobile number to login" : `Sent to +91 ${phone}`}
                </p>
            </div>

            {step === 'phone' ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Mobile Number</label>
                        <div className="flex items-center border-2 border-slate-200 rounded-lg overflow-hidden focus-within:border-orange-500">
                            <span className="bg-slate-100 px-3 py-3 text-slate-500 font-bold border-r">+91</span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                maxLength={10}
                                placeholder="98765 43210"
                                className="w-full p-3 outline-none font-bold text-slate-800 tracking-widest"
                            />
                        </div>
                    </div>
                    <Button type="submit">Send OTP <ChevronRight size={20} /></Button>
                </form>
            ) : (
                <div className="space-y-8">
                    <div className="flex justify-center gap-4">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={el => { inputRefs.current[i] = el; }}
                                type="tel"
                                value={digit}
                                onChange={(e) => handleOtpChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                onPaste={handlePaste}
                                maxLength={1}
                                className="w-14 h-14 border-2 border-slate-200 rounded-lg text-center text-2xl font-bold focus:border-orange-500 outline-none transition-all focus:scale-105"
                            />
                        ))}
                    </div>
                    <Button onClick={handleVerify}>Verify & Login</Button>
                    <button onClick={() => setStep('phone')} className="w-full text-center text-sm text-slate-500 font-semibold">
                        Change Mobile Number
                    </button>
                </div>
            )}
        </div>
    );
};
