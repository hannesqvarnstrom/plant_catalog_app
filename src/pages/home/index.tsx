import { Outlet } from "react-router-dom"

const Home: React.FC = () => {
    return (
        <div>
            <p>This component can have all the scaffolding of the website</p>
            <Outlet />
        </div>
    );
};

export default Home;
