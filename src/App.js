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
  const deviceWidth=  window.innerWidth;
  const [docReady, setDocReady] = useState(false);
  const circleMouse = useRef(null)
  const circleBackdrop=useRef(null)
  const circleInner=useRef(null)
  const circlesParent = useRef(null);

  function setCircles() {
    if(deviceWidth<=768)
    return;
    var circles = circlesParent.current?.children;
    if(circles==undefined)
    return;
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
          () => setCircles(), 3000);
        }, 2000
        )
        setTimeout(()=>{
          setDocReady(true);
        }, 4500)
    return () => {
      clearInterval(setCircles);
    }
  }, []);

  useEffect(() => {

    document.body.style.setProperty('--x', (globalCords.x) + 'px');
    document.body.style.setProperty('--y', (globalCords.y) + 'px');
  }, [globalCords]);


  useEffect(()=>{
    if(globalCords.x==undefined||globalCords.y==undefined)
    return;
    var el = document.elementFromPoint(globalCords.x, globalCords.y);
    if (el.classList.contains("mouse-center-inner")||el.classList.contains("message-placeholder"))
        return;
    if (el.children.length == 0 && el.tagName != "section"&&el.tagName!="img"|| el.classList.contains('hoverable') || el.classList.contains("expand")||el.tagName=="A"||el.tagName=="BUTTON") {
        circleMouse.current.classList.add("hovering");
        circleInner.current.classList.add("hovering");
        circleBackdrop.current.classList.add("hovering");
    } else {
        circleMouse.current.classList.remove("hovering");
        circleInner.current.classList.remove("hovering");
        circleBackdrop.current.classList.remove("hovering");
    }
  }, [globalCords])

  const setCords = (e) => {
    setGlobalCords({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
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


  const addMouse = () => {
    circleMouse.current.classList.add("mouse-down");
    circleInner.current.classList.add("mouse-down");
  }
  const removeMouse = () => {
    circleMouse.current.classList.remove("mouse-down");
    circleInner.current.classList.remove("mouse-down");
  }
  useEffect(() => {
    document.addEventListener("mousedown", addMouse);
    document.addEventListener("mouseup", removeMouse);
    return () => {
      document.removeEventListener("mousedown", addMouse);
      document.removeEventListener("mouseup", removeMouse);
    }
  }, []);

  const [showTip, setShowTip] = useState({show:false, tip:"Hover over me"});
  const sectionAr=[useRef(null),useRef(null),useRef(null),useRef(null)]
  const [visibleAr, setVisibleAr] = useState({"Section1":true,"Section2":false,"Section3":false,"Section4":false});
  useEffect(() => {
    // intersection observer for all sections
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleAr((prev)=>({...prev,[entry.target.id]:true}))
        }
        else
        {
          setVisibleAr((prev)=>({...prev,[entry.target.id]:false}))
        }
      });
    }, options);
    sectionAr.forEach((section) => {
      if(section.current!=null)
      observer.observe(section.current);
    });
    return () => {
      observer.disconnect();
    }
  }, [sectionAr]);
  
  return (
    <>
      <div className="backdrop">
        <div className="mouse-center-backdrop" ref={circleBackdrop} id="mouse-center-backdrop"></div>

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
        <div className="section-wrapper" ref={sectionAr[0]} id="Section1" >
        <Section1 docReady={docReady} isVisible={visibleAr["Section1"]}  setShowTip={setShowTip} ></Section1>
        </div>
        <div className="section-wrapper" ref={sectionAr[1]} id="Section2" >
        <Section2 isVisible={visibleAr["Section2"]}  setShowTip={setShowTip} ></Section2>
        </div>
        <div className="section-wrapper" ref={sectionAr[2]} id="Section3" >
        <Section3 isVisible={visibleAr["Section3"]}  setShowTip={setShowTip} ></Section3>
        </div>
        <div className="section-wrapper" ref={sectionAr[3]} id="Section4" >
        <Section4 isVisible={visibleAr["Section4"]}  setShowTip={setShowTip} ></Section4>
        </div>
        <div className="footer">
            <div className="footer-text">
              <div className="footer-text-content">© 2023 Naman Goswami</div>
            </div>
          </div>
        <div className="mouse-center" ref={circleMouse} id="mouse-center"></div>
        <div className="mouse-center-inner" ref={circleInner} id="mouse-center-inner"></div>
        <div className={showTip.show?'mouse-tip show':'mouse-tip'}>{"("+showTip.tip+")"}</div>
      </div>

      <div className="mouse-outer"></div>
    </>

  );
}

export default App;
