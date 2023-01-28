import React, {useEffect} from 'react'
import lang from '../../lang'

export default function Section1({docReady, setShowTip, isVisible}) {

  const [isPristine, setIsPristine] = React.useState(true);
  const [showMessage , setShowMessage] = React.useState(false);
  const [messagePristine, setMessagePristine] = React.useState(true);
  useEffect(() => {
    if(!docReady)
    return;
    if (isVisible && isPristine) {
      setShowTip({show: true, tip: "Hover over the name"});
    } else {
      setShowTip({show: false, tip: "Hover over the name"});
    }
  }, [isPristine, isVisible, docReady]);

  useEffect(() => {
    if(!docReady)
    return;
    if(showMessage){
    if(isPristine)
    {
      setIsPristine(false);
    }}

    if(!showMessage&&!isPristine)
    {
      setMessagePristine(false);
    }
    
  }, [showMessage, docReady]);

  const setMessage=(value)=>{
    if(!docReady)
    return;
    setShowMessage(value);
  };

    return ( 
        <section className="section section-1 " id="section-1">
          <div className="name-container"  onMouseOver={()=>setMessage(true)} onMouseOut={()=>setMessage(false)} >
          <div className="name" >{lang.name}</div>
          <div className="age" >{lang.age}</div>
          <div className="titles" >
            {lang.titles.map((title, index) => (
              <div key={index} className="title">
                {title}
              </div>
            )
            )}
          </div>
          </div>
          <div className={!messagePristine?"message  message-fixed":isVisible&&showMessage?"visible message":"message"}>
            <div className="message-text" dangerouslySetInnerHTML={{__html:lang.message}} >
            </div>
           <img src={lang.profile} />
          </div>
          {
            !messagePristine&&<div className='message-placeholder'>Message placeholder</div>
          }
        </section>
    )
}