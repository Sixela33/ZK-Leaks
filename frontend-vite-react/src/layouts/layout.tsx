import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div>
            <p>Main Layout</p>
            <Outlet />
        </div>
    );
};