export const calculateTotalPointsByMonth = transactions => {
    const totals = {};
    transactions.forEach(transaction => {
        const month = new Date(transaction.date).toLocaleString('default', {
            month: 'long',
        });
        if (!totals[month]) {
            totals[month] = 0;
        }
        totals[month] += calculatePoints(transaction.value);
    });
    return totals;
};
const calculatePoints = amount => {
    let points = 0;
    if (amount > 100) {
        points += (amount - 100) * 2;
    }
    if (amount > 50) {
        points += Math.min(amount - 50, 50);
    }
    return points;
};
