import React, { useState, useEffect} from "react";
import "./Medias.scss";
import { SocialMediaIconsReact } from "social-media-icons-react";

export default function Medias({ el, winW }) {
const [bgColor, setBgColor] = useState(false);

useEffect(() => {
winW<800 ? setBgColor(true) : setBgColor(false)
}, [winW])

    const handleEnter = () => {
        setBgColor(true)
    }
    const handleLeave = () => {
        setBgColor(false)
    }

  return (
      <div className='icon' onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
    {!bgColor?
     <SocialMediaIconsReact
     borderColor="rgba(0,0,0,0.25)"
    borderWidth="2"
    borderStyle="solid"
    icon={el.name}
    iconColor="rgba(255,255,255,1)"
    backgroundColor="rgba(0,0,0,0.25)"
    iconSize="6"
    roundness="50%"
    url={el.url}
    size="30"
  />
  : <SocialMediaIconsReact
      borderColor="rgba(0,0,0,0.25)"
    borderWidth="2"
    borderStyle="solid"
    icon={el.name}
    iconColor="rgba(255,255,255,1)"
    backgroundColor={el.color}
    iconSize="6"
    roundness="50%"
    url={el.url}
    size="30"
  />}
  </div>)
}
