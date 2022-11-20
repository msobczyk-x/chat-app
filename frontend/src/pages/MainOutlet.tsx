import {Outlet} from "react-router-dom"
import Header from "../components/Header/Header";
const MainOutlet = () => {
    return(
<div className="main-outlet">
    <Header/>
    <Outlet />

    </div>
    );
}

export default MainOutlet