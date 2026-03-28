const TOTAL_TIPS = 10;

export const getTodayTipId = (): number => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    return (dayOfYear % TOTAL_TIPS) + 1;
};