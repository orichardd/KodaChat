import "./Criador.css"

export function Criador({picture, name, work}){
    return(
        <div className="criador">
                            <div className="criadorHeader">
                                <img src={picture} alt="" />
                                <h3 className="creatorTitle">
                                    {name}
                                </h3>
                            </div>
                            <div className="trabalho">
                                <ul>
                                    {work.map((e) =>
                                    <li>{e}</li>
                                    )}
                                </ul>
                            </div>

                        </div>
    )
    /*
    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
    */
}