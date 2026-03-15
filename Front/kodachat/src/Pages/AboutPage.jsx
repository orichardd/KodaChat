import "./AboutPage.css"
import { Footer } from "../Components/Footer"
import { Criador } from "../Components/Criador"

export function AboutPage() {
    return (
        <div className="aboutScreen">
            <div className="aboutPageContainer">

                <div className="aboutContent">
                    <h3>
                        Sobre Nós
                    </h3>
                </div>
                <div className="aboutContent">
                    <h4>
                        Criado por:
                    </h4>
                    <div className="criadores">
                        <Criador picture="/profilePictures/cristo_nii.jpg" name="cristo_nii" work={["BackEnd Java Spring", "Segurança JWT", "API", "Banco de Dados Postgres", "FrontEnd React", "UI/UX"]} />
                        <Criador picture="/profilePictures/pokado.jpg" name="poKado" work={["Servidor", "Hospedagem"]} />


                    </div>
                </div>
            </div>
            <Footer userPicture="/profilePictures/1.webp" userName="Ellie Kirk" />
        </div>
    )
}