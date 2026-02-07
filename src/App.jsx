import Topbar from "./pages/component/topbar";
import Hero from "./pages/homepage/hero";
import Section2 from "./pages/homepage/Section2";
import Section3 from "./pages/homepage/Section3";
import Section4 from "./pages/homepage/Section4";
import Section5 from "./pages/homepage/Section5";
import Pricing from "./pages/Pricing/Pricing";
import OnboardingFlow from "./pages/startingpages/Q";
import Q1 from "./pages/startingpages/Q1";
import Q2 from "./pages/startingpages/Q2";
import Q3 from "./pages/startingpages/Q3";

function App() {
  return (
   <div>
    <Hero/>
    <Section2/>
    <Section3/>
    <Section4/>
    <Pricing/>
    <Section5/>  
   </div>
  );
}

export default App;
