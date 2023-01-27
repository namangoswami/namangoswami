import React from 'react'
import lang from '../../lang'

export default function index() {
    return ( 
        <section className="section section-1 " id="section-1">
          <div className="name">{lang.name}</div>
          <div className="age">{lang.age}</div>
          <div className="titles">
            {lang.titles.map((title, index) => (
              <div key={index} className="title">
                {title}
              </div>
            )
            )}
          </div>
        </section>
    )
}