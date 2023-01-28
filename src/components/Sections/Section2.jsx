import React, {useState, useEffect} from 'react'
import lang from '../../lang'

export default function Section2({isVisible, setShowTip}) {
    const skills=lang.skills;
    const [currentSkill, setCurrentSkill] = useState(skills['Languages']);
    const [currentCompany, setCurrentCompany] = useState(null);
    const setCurrent=(value)=>{
        if(currentCompany===value)
            setCurrentCompany(null);
        else
            setCurrentCompany(value);
    }
    const [isPristine, setIsPristine] = useState(true);
    useEffect(()=>{
        if(isVisible)
        {  
            if(isPristine)
                setShowTip({show:true, tip:"Click"});
            else
                setShowTip({show:false, tip:"Click"});
        }
    }, [isVisible, isPristine])
    
   
    return (
    <section className="section section-2" id="section-2">
        <div>

          <div className="section-title">Experience</div>
          <div className="experience-table">
            {lang.experience.map((experience, index) => (
                <div className={currentCompany===index?'experience-parent selected':'experience-parent'} onClick={()=>{setCurrent(index);setIsPristine(false)}}  >
                <div key={index} className="experience hoverable">
                    <div className="period">{experience.time}</div>
                    <div className="company">{experience.company}</div>
                    <div className="position">{experience.role}</div>
                    <div className="Location">{experience.location}</div>
                    <div className="expand">
                        <i className="fa fa-plus"></i>
                    </div>
                            </div>
                    <div className="description">
                        <ul>
                            {experience.description.map((desc, index) => (
                                <li key={index}>{desc}</li>
                            ))}
                        </ul>
                    </div>
                    </div>
            ))}
            
        </div>
          </div>
          <div>

          <div className="section-title">Skills</div>
          <div className="skills-table">
            <div className="skills-header">
                {Object.keys(lang.skills).map((skill, index) => (
                    <div key={index} className={currentSkill===skills[skill]?"active":""} onClick={()=>setCurrentSkill(skills[skill])} >{skill}</div>)
                )}
            </div>
            <div className="skills-body">
                {currentSkill.map((skill, index) => (
                    <div key={index} className="skill hoverable">   
                    {skill}
                    </div>
                ))}
          </div>
            </div>
          </div>
        </section>
  )
}
