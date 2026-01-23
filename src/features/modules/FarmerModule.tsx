import React, { useState } from 'react';
import { Sprout, ShieldCheck, X, CloudRain, Sun, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MarketMandiGame } from '@/features/games/MarketMandiGame';

interface FarmerModuleProps {
    onComplete: (score: number, badge: string) => void;
}

interface HarvestData {
    yieldQty: number;
    costs: number;
    cropLoss: number;
    insurancePayout: number;
    loanCost: number;
    insuranceCost: number;
}

export const FarmerModule: React.FC<FarmerModuleProps> = ({ onComplete }) => {
    const [step, setStep] = useState<'planning' | 'season' | 'result' | 'mandi' | 'final'>('planning');
    const [loanType, setLoanType] = useState<'bank' | 'moneylender' | null>(null);
    const [insurance, setInsurance] = useState<boolean | null>(null);
    const [weather, setWeather] = useState<'good' | 'drought' | null>(null);
    const [harvestData, setHarvestData] = useState<HarvestData>({ yieldQty: 0, costs: 0, cropLoss: 0, insurancePayout: 0, loanCost: 0, insuranceCost: 0 });
    const [finalProfit, setFinalProfit] = useState(0);

    const calculateHarvest = () => {
        // Simulation Logic
        const isDrought = Math.random() > 0.5;
        setWeather(isDrought ? 'drought' : 'good');

        // Base params
        const baseQty = 2000; // kg
        let loanCost = loanType === 'moneylender' ? 15000 : 5000;
        let insuranceCost = insurance ? 2000 : 0;

        // Impact of weather on Quantity
        let actualQty = isDrought ? baseQty * 0.4 : baseQty; // 40% yield in drought
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let _cropLossValue = isDrought ? (insurance ? 0 : 20000) : 0; // Notional value loss
        let insurancePayout = (isDrought && insurance) ? 15000 : 0; // Cash injection

        setHarvestData({
            yieldQty: actualQty,
            costs: loanCost + insuranceCost,
            insurancePayout,
            cropLoss: _cropLossValue,
            loanCost,
            insuranceCost
        });

        setStep('result');
    };

    const handleMandiSale = (revenue: number, _pricePerKg: number) => {
        const profit = revenue + harvestData.insurancePayout - harvestData.costs;
        setFinalProfit(profit);
        setStep('final');
        if (profit > 20000) onComplete(100, "Harvest Hero");
    };

    return (
        <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <h3 className="font-bold text-green-800 flex items-center gap-2">
                    <Sprout size={20} /> Mission: Kisan Chakra
                </h3>
                <p className="text-sm text-green-700">Make smart choices for the Kharif season to maximize profit.</p>
            </div>

            {step === 'planning' && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">1. Choose Credit Source</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                                onClick={() => setLoanType('moneylender')}
                                className={`p-4 border-2 rounded-lg text-left ${loanType === 'moneylender' ? 'border-orange-500 bg-orange-50' : 'border-slate-200'}`}
                            >
                                <div className="font-bold text-slate-800">Local Moneylender</div>
                                <div className="text-xs text-slate-500">Instant cash, but 5% monthly interest.</div>
                            </button>
                            <button
                                onClick={() => setLoanType('bank')}
                                className={`p-4 border-2 rounded-lg text-left ${loanType === 'bank' ? 'border-teal-500 bg-teal-50' : 'border-slate-200'}`}
                            >
                                <div className="font-bold text-slate-800">Bank KCC Loan</div>
                                <div className="text-xs text-slate-500">Paperwork needed, but 7% annual interest.</div>
                            </button>
                        </div>
                    </div>

                    {loanType && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">2. Buy Crop Insurance (PMFBY)?</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setInsurance(true)}
                                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 ${insurance === true ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`}
                                >
                                    <ShieldCheck className="text-blue-600" />
                                    <span className="font-bold text-sm">Yes (₹2,000)</span>
                                </button>
                                <button
                                    onClick={() => setInsurance(false)}
                                    className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 ${insurance === false ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                                >
                                    <X className="text-red-500" />
                                    <span className="font-bold text-sm">No (Save Money)</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {loanType && insurance !== null && (
                        <Button onClick={calculateHarvest}>Start Season</Button>
                    )}
                </div>
            )}

            {step === 'result' && (
                <div className="text-center space-y-4 animate-fadeIn">
                    <div className="flex justify-center">
                        {weather === 'drought' ? <CloudRain size={64} className="text-slate-400" /> : <Sun size={64} className="text-yellow-500" />}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">{weather === 'drought' ? "Drought Struck!" : "Good Rains!"}</h2>

                    <div className="bg-slate-100 p-4 rounded-lg text-left space-y-2 text-sm">
                        <div className="flex justify-between"><span>Yield Harvested:</span> <span className="font-bold">{harvestData.yieldQty} kg</span></div>
                        {weather === 'drought' && insurance && (
                            <div className="flex justify-between text-green-600"><span>Insurance Payout:</span> <span>+ ₹{harvestData.insurancePayout}</span></div>
                        )}
                        {weather === 'drought' && !insurance && (
                            <div className="text-center text-red-500 font-bold py-2">Low Yield & No Insurance!</div>
                        )}
                    </div>

                    <Button onClick={() => setStep('mandi')}>Go to Mandi to Sell</Button>
                </div>
            )}

            {step === 'mandi' && (
                <MarketMandiGame harvestQty={harvestData.yieldQty} onSellComplete={handleMandiSale} />
            )}

            {step === 'final' && (
                <div className="text-center space-y-4 animate-fadeIn">
                    <Trophy size={64} className={`mx-auto ${finalProfit > 20000 ? "text-yellow-500" : "text-slate-300"}`} />
                    <h2 className="text-2xl font-bold text-slate-800">Season Summary</h2>

                    <div className="bg-slate-100 p-4 rounded-lg text-left space-y-2 text-sm">
                        <div className="flex justify-between text-green-700"><span>Crop Revenue:</span> <span>+ ₹{(finalProfit + harvestData.costs - harvestData.insurancePayout).toLocaleString()}</span></div>
                        {harvestData.insurancePayout > 0 && (
                            <div className="flex justify-between text-green-700"><span>Insurance Claim:</span> <span>+ ₹{harvestData.insurancePayout.toLocaleString()}</span></div>
                        )}
                        <div className="flex justify-between text-red-600"><span>Total Costs:</span> <span>- ₹{harvestData.costs.toLocaleString()}</span></div>
                        <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-lg">
                            <span>Net Profit:</span>
                            <span className={finalProfit > 0 ? "text-green-600" : "text-red-600"}>₹{finalProfit.toLocaleString()}</span>
                        </div>
                    </div>

                    <Button onClick={() => setStep('planning')} variant="outline">Start Next Season</Button>
                </div>
            )}
        </div>
    );
};
