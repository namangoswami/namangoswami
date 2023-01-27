import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from "react";
import Section1 from './components/Sections/Section1';
import Section2 from './components/Sections/Section2';
import Section3 from './components/Sections/Section3';
import Section4 from './components/Sections/Section4';

function App() {

  let localRange = 200
  const [globalCords, setGlobalCords] = useState({
    x: undefined,
    y: undefined
  });
  const circlesParent = useRef(null);

  function setCircles() {
    var circles = circlesParent.current?.children;

    for (var i = 0; i < circles.length; i++) {
      var x = circles[i].style.left;
      var y = circles[i].style.top;
      let potentialX = Math.floor(Math.random() * localRange * 2) - localRange;
      let potentialY = Math.floor(Math.random() * localRange * 2) - localRange;

      x = potentialX;
      y = potentialY;


      circles[i].style.left = x + "px";
      circles[i].style.top = y + "px";
    }
  }

  useEffect(() => {
    setTimeout(
      () => {
        setInterval(
          () => setCircles(), 1000);
      }, 2000
    )
    return () => {
      clearInterval(setCircles);
    }
  }, []);

  useEffect(() => {

    document.body.style.setProperty('--x', (globalCords.x) + 'px');
    document.body.style.setProperty('--y', (globalCords.y) + 'px');
  }, [globalCords]);

  const setCords = (e) => {
    setGlobalCords({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.onscroll = setProgress;
    document.addEventListener("mousemove", setCords);
    return () => {
      document.removeEventListener("mousemove", setCords);
    }
  }, []);
  const progressBar = useRef(null);
  function setProgress() {
    let scroll = document.documentElement.scrollTop;
    document.body.style.setProperty(
      "--scroll",
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
    );
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (scroll / height) * 100;
    progressBar.current.style.height = scrolled + "%";
    progressBar.current.style.top = 50 - scrolled / 2 + "%";
  }


  const circleMouse = useRef(null)
  const addMouse = () => {
    circleMouse.current.classList.add("mouse-down");
  }
  const removeMouse = () => {
    circleMouse.current.classList.remove("mouse-down");
  }
  useEffect(() => {
    document.addEventListener("mousedown", addMouse);
    document.addEventListener("mouseup", removeMouse);
    return () => {
      document.removeEventListener("mousedown", addMouse);
      document.removeEventListener("mouseup", removeMouse);
    }
  }, []);
  return (
    <>
      <div className="backdrop">
        <div className="mouse-center-backdrop" id="mouse-center-backdrop"></div>

        <div className="circle-canvas" ref={circlesParent} >
          <div className="circle" style={{ backgroundColor: 'blanchedalmond' }}></div>
          <div className="circle" style={{ backgroundColor: 'pink' }}></div>
          <div className="circle" style={{ backgroundColor: 'red' }}></div>
          <div className="circle" style={{ backgroundColor: 'blue' }}></div>
          <div className="circle" style={{ backgroundColor: 'green' }}></div>
          <div className="circle" style={{ backgroundColor: 'white' }}></div>
          <div className="circle" style={{ backgroundColor: 'coral' }}></div>
          <div className="circle" style={{ backgroundColor: 'aqua' }}></div>
        </div>
      </div>
      <div className="root" >
        <div className="progress-bar" ref={progressBar}></div>
        <div className="header">
          <a className="header-item" href="#section-1">
            About
          </a>
          <a className="header-item" href="#section-2">
            Experience
          </a>
          <a className="header-item" href="#section-3">
            Projects
          </a>
          <a className="header-item" href="#section-4">
            Contact
          </a>
        </div>
        <div className="section-wrapper">
        <Section1></Section1>
        </div>
        <div className="section-wrapper">
        <Section2></Section2>
        </div>
        <div className="section-wrapper">
        <Section3></Section3>
        </div>
        <div className="section-wrapper">
        <Section4></Section4>
        </div>
        <div className="footer">
            <div className="footer-text">
              <div className="footer-text-content">© 2023 Naman Goswami</div>
            </div>
          </div>
        <div className="mouse-center" ref={circleMouse} id="mouse-center"></div>
        <div className="mouse-center-inner" id="mouse-center-inner"></div>
      </div>

      <div className="mouse-outer"></div>
    </>

  );
}

export default App;
