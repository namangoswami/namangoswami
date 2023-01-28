import React from 'react'
import { useEffect } from 'react';
import lang from '../../lang'
import emailjs from '@emailjs/browser'


export default function Section4({isVisible, setShowTip}) {
    
  function contactSubmit(e) {
    e.preventDefault();
    emailjs.sendForm('service_ilzfy5x', 'template_irv489m', formEl.current, 'qma4BiF5deVizaerE')
      .then((result) => {
          console.log(result.text);
          setForm({firstName: "", lastName: "", email: "", phone: "", message: ""}, setSubmitted(true));
      }, (error) => {
          console.log(error.text);
      });
  }
  const formEl=React.useRef(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const handleChange=(e)=>{
    setForm({...form, [e.target.name]: e.target.value});
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
            <div className={submitted?"right-side submitted":"right-side"}>
              <form className="contact-form" id="contact-form" onSubmit={contactSubmit} onMouseOver={()=>setIsPristine(false)} ref={formEl} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <input type="text" name="firstName" className="half-width" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                  <input type="text" name='lastName' className="half-width" placeholder="Last Name" value={form.lastName} onChange={handleChange}/>
                </div>
                <input type="text" name='email' placeholder="Email" value={form.email} onChange={handleChange}/>
                <input type="text" name='phone' placeholder="Phone" value={form.phone} onChange={handleChange}/>
                <textarea type="text" name='message' placeholder="What do you want to talk about?"onChange={handleChange} value={form.message}></textarea>
                <div className="buttons">
                  <button type="reset" className="reset">Reset</button>
                  <button type="submit" className="submit">Submit</button>
                </div>
              </form>
              <div className="thank-you-message">
                Thank You for reaching out! I will get back to you as soon as possible.
              </div>
            </div>
          </div>
          
        </section>
  )
}
