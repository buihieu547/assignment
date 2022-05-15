import { Suspense, lazy, memo } from 'react';
import './App.scss';

const Dashboard = lazy(() => import('containers/Dashboard/Dashboard'));
const App = memo((): JSX.Element => {
    return (
        <Suspense fallback="Loading...">
            <div className='wrapper'>
                <Dashboard />
            </div>
        </Suspense>
    );
});

export default App;
