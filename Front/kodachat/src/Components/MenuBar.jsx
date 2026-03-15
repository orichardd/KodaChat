    import "./MenuBar.css"
    import { MenuElements } from "./MenuElements.jsx";

    export function MenuBar({openPanel}) {

        function logout(){
            localStorage.removeItem("jwt");
        }

        return(
        <div className="sideMenu" style={{
                        transform: openPanel == "menu" ? "translateX(0)" : "translateX(100%)"

                    }}>
            <div className="sideMenuContent">
                <MenuElements image="/home.png" name="Home" route="/" />
                <MenuElements image="/profile.png" name="Profile" route={"/perfil/" + localStorage.getItem("username")} />
                <MenuElements image="/about.png" name="Sobre" route="/sobre" />
                <MenuElements image="/exit.png" name="Logout" onClick={logout} route="/login" />
            </div>
        </div>)
    }