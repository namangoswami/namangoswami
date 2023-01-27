import React from 'react'

export default function ScreenshotGallery({images}) {
    const [current, setCurrent]=React.useState(0);
    const changeImage=(value)=>{
        if(value<0)
            setCurrent(images.length-1);
        else if(value>=images.length)
            setCurrent(0);
        else
            setCurrent(value);
    }
  return (
        <div className="screenshot-gallery">
            <img src={images[current]} className="screenshot" />
            <div className="screenshot-gallery-buttons">
                <button className="gallery-left" onClick={()=>changeImage(current-1)} ><i class="fa fa-arrow-left"></i></button>
                <button className="gallery-right" onClick={()=>changeImage(current+1)} ><i class="fa fa-arrow-right"></i></button>
                </div>
            </div>
  )
}
