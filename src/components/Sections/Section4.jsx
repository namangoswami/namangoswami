import React from 'react'
import { useEffect } from 'react';
import lang from '../../lang'


export default function Section4({isVisible, setShowTip}) {
    
  function contactSubmit(e) {
    e.preventDefault();
    document.getElementById("contact-form").reset();

  }

  const [isPristine, setIsPristine] = React.useState(true);

  useEffect(() => {
    if (isVisible) {
      if(isPristine){
      setShowTip({show: true, tip: "Thank You!"});
    } else {
      setShowTip({show: false, tip: "Thank You!"});
    }}
  }, [isVisible, isPristine]);


  return (
    <section className="section section-4" id="section-4" >
          <div className="title">Contact</div>
          <div className="contact-wrapper">
            <div className="left-side">
                {
                    lang.contact.map((contact, index) => (
              <a className="contact" key={index} href={contact.link} onMouseOver={()=>setIsPristine(false)} >
                <div className="contact-icon">
                    {contact.icon&&<i className={"fa fa-"+contact.icon }></i>}
                    {contact.svg&&<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d={contact.svg}/></svg>}
                </div>
                <div className="contact-text">
                  <div className="contact-text-title">{contact.name}</div>
                  <div className="contact-text-content">{contact.value}</div>
                </div>

              </a>
                        ))
                    }
            </div>
            <div className="right-side">
              <form className="contact-form" id="contact-form" onSubmit={contactSubmit} onMouseOver={()=>setIsPristine(false)}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <input type="text" className="half-width" placeholder="First Name" />
                  <input type="text" className="half-width" placeholder="Last Name" />
                </div>
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Phone" />
                <textarea type="text" placeholder="What do you want to talk about?"></textarea>
                <div className="buttons">
                  <button type="reset" className="reset">Reset</button>
                  <button type="submit" className="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
          
        </section>
  )
}
