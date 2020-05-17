import React from "react";
import "./About.scss";
import Medias from '../../Medias/Medias'

export default function About({mediasData}) {
  return (
    <div className="about">
      <div>
        <h1>Łukasz Cieślak</h1>
        <h2>Junior Front-end Developer</h2>
        <h2> Junior Tester</h2>
        <p>
          Po ukończonym kursie „Tester
          oprogramowania” zacząłem pasjonować się programowaniem, aktualnie
          poszerzam swoją wiedzę i doskonalę umiejętności w języku JavaScript. Ten projekt jest częścią tego, czego do tej pory się nauczyłem.
          Chciałbym wykorzystać swoją wiedzę w praktyce oraz dalej się rozwijać. Dobrze odnajduje się w pracy zespołowej jak i w indywidualnych
          zadaniach. Nauczę się wszystkiego, co będzie potrzebne by wnieść
          większą wartość w swój poświęcony czas.</p><p>
          Zapraszam do kontaktu przez linkedin oraz do sprawdzenia mojego profilu na githubie, który będę stopniowo uzupełniać o nowe projekty.
        </p>
        <div className='media_about'>
        {mediasData.map((el=> <Medias el={el} />))}
        </div>
      </div>
      <img src="/assets/images/IMG_20191019_221930.jpg" />
    </div>
  );
}
