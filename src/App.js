import React, { useRef, useEffect, useState } from "react";
import "./App.css";

const getDimensions = ele => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = ele => {
  ele.scrollIntoView({ behavior: "smooth", block: "start" });
};

function App() {
  const [visibleSection, setVisibleSection] = useState();

  const leadershipRef = useRef(null);
  const providerRef = useRef(null);
  const operationsRef = useRef(null);

  const sectionRefs = [
    { section: "Leadership", ref: leadershipRef },
    { section: "Providers", ref: providerRef },
    { section: "Operations", ref: operationsRef },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const firstSection = sectionRefs[0];
      const lastSection = sectionRefs[sectionRefs.length - 1];

      if (firstSection.ref.current) {
        const { offsetTop } = getDimensions(firstSection.ref.current);
        if (scrollPosition < offsetTop && visibleSection !== undefined) {
          setVisibleSection(undefined);
        }
      }

      sectionRefs.forEach(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          if (scrollPosition > offsetTop && scrollPosition < offsetBottom) {
            if (visibleSection !== section) {
              setVisibleSection(section);
            }
          }
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);
  return (
    <div className="App">
      <div className="spacer" />

      <div className="content">
        <div className="sticky">
          <div className="header">
            <div
              className={`header_link ${visibleSection === "Leadership" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(document.getElementById("Leadership"));
              }}
            >
              Leadership
            </div>
            <div
              className={`header_link ${visibleSection === "Providers" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(document.getElementById("Providers"));
              }}
            >
              Providers
            </div>
            <div
              className={`header_link ${visibleSection === "Operations" ? "selected" : ""}`}
              onClick={() => {
                scrollTo(document.getElementById("Operations"));
              }}
            >
              Operations
            </div>
          </div>
        </div>
        <div className="section" id="Leadership" ref={leadershipRef} />
        <div className="section" id="Providers" ref={providerRef} />
        <div className="section" id="Operations" ref={operationsRef} />
      </div>

      <div className="spacer" />
    </div>
  );
}

export default App;
