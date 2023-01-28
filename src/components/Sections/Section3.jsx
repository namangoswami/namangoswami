import React from 'react'
import { useState, useEffect} from 'react'
import lang from '../../lang'
import ScreenshotGallery from '../ScreenshotGallery/ScreenshotGallery';

export default function Section3({isVisible, setShowTip}) {
const [current, setCurrentValue]=React.useState(-1);

const [showSs, setShowSs]=React.useState(false);
const [isPristine, setIsPristine] = React.useState(true);
      

const setNull=()=>{
    setCurrentValue(-1);
    setShowSs(false);
};
const setValue=(value)=>{
    if(value==current)
        return;
    setCurrentValue(value);
};

useEffect(() => {
    if (isVisible) {
      if(current==-1&&isPristine)
        setShowTip({show:true, tip:"Click on a project to see more"});
      else
        setShowTip({show:false, tip:"Click on a project to see more"});
    }
  }, [isVisible, current]);

  useEffect(() => {
    if(current!==-1&&isPristine)
    setIsPristine(false);
  }, [current]);

  return (
    <section className="section section-3" id="section-3">
          {current===-1&&<div className="title">Projects</div>}
          <div className={current!==-1?"projects-grid has-selected":"projects-grid"}>
            {lang.projects.map((project, index) => (
                <div key={index}  className={current==-1?"project hoverable":current==project?"project hoverable selected":"project hoverable not-selected"} onClick={()=>setValue(project)} >
              {current==project&&<div className="cross-button" onClick={()=>setNull()} >
                <i className="fa fa-times"></i>
              </div>}
              <div className="project-name">
                {project.name}
              </div>
              {current!=project&&<><div className="project-notes hoverable">
                <ul>
                    {project.description.map((note, project) => (
                        <li key={project}>{note}</li>
                    ))}
                </ul>
              </div>
              <div className="project-footer-links">
                <a className="project-footer-link" href={project.github} >Github</a>
                {project.website&&<a className="project-footer-link" href={project.website} >Website</a>}
                <div className="project-footer-link" onClick={()=>setValue(project, setShowSs(true))} >Screenshots</div>
              </div></>
              }
              {
                current===project&&project.website&&!showSs&&<iframe className='project-iframe' src={project.website} title={project.name} />
              }
              {
               (current===project&&!project.website||showSs&&current===project)&&<ScreenshotGallery images={project.screenshots} />
              }
            </div>))}    
          </div>
         
        </section>
  )
}
