import { Link } from "react-router-dom"
import "./MenuElements.css"

export function MenuElements({image, name, onClick, route}) {
    return(
    <Link to={route} className="sideMenuElement" onClick={onClick}>
            <img src={image} alt="" className="sideMenuElementImage" />
            <h2>{name}</h2>
    </Link>)
}