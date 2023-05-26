import './Jumbotron.css'

export default function Jumbotron({
  title,
  subTitle = "Moda con propósito que representa mensajes y expresiones artísticas, cuidando el planeta. Playeras de materiales 100% reciclados y certificados por Global Recycled Standard, vistiendo con estilo consciente.",
}) {
  return (
    <div className="container--jumbotron" >
      <div className="row--yo">
        <div className="yuka">
          <h1 className="fw--bold">{title}</h1>
          <p className="lead">{subTitle}</p>
        </div>
      </div>
    </div>
  );
}
