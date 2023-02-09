import './App.css';
import mockData from './mockData.json';
import { calculateTotalPointsByMonth } from './util';
import { useEffect, useState } from 'react';

const App = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setData(mockData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }
    if (data) {
        return (
            <div className="App">
                <RewardPointsTableComponent transactions={data.transactions} />
            </div>
        );
    }
};
const RewardPointsTableComponent = ({ transactions }) => {
    const totals = calculateTotalPointsByMonth(transactions);
    return (
        <ul>
            {Object.entries(totals).map(([month, value]) => (
                <li key={month}>
                    {[month]}: {value}
                </li>
            ))}
        </ul>
    );
};
export default App;
