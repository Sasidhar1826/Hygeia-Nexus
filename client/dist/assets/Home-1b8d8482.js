import{u as A,j as t,a as i,F as n,b as T,c as M,d as R,e as j,f as I,g as P,h as B,i as G,k as D,l as N}from"./index-c3da158f.js";import{s as o,m as h,e as H}from"./vendor-3ba6fd3e.js";import"./animations-c827faa9.js";const E=o.div`
  width: 100%;
  overflow-x: hidden;
`,L=o.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  padding: ${e=>e.theme.spacing(3)};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  @media (max-width: 768px) {
    height: auto;
    padding: ${e=>e.theme.spacing(6)}
      ${e=>e.theme.spacing(3)};
  }
`,Y=o.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  & > img,
  & > svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,O=o.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;
`,J=o(h.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: ${e=>e.theme.spacing(2)};
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`,V=o(h.p)`
  font-size: 1.2rem;
  margin-bottom: ${e=>e.theme.spacing(4)};
  max-width: 600px;
  line-height: 1.6;
`,X=o(h.div)`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  flex-wrap: wrap;
`,z=o(H)`
  display: inline-flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border-radius: ${e=>e.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.light};
  }

  svg {
    margin-left: ${e=>e.theme.spacing(1)};
  }
`,U=o(H)`
  display: inline-flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: ${e=>e.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: ${e=>e.theme.colors.primary.main};
  }

  svg {
    margin-left: ${e=>e.theme.spacing(1)};
  }
`,F=o.section`
  padding: ${e=>e.theme.spacing(8)}
    ${e=>e.theme.spacing(3)};
  max-width: 1200px;
  margin: 0 auto;
`,u=o.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing(6)};
  color: ${e=>e.theme.colors.text.primary};
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: ${e=>e.theme.colors.primary.main};
  }
`,W=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(4)};
`,a=o(h.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(4)};
  box-shadow: ${e=>e.theme.shadows.medium};
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`,r=o.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${e=>e.theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${e=>e.theme.spacing(2)};

  svg {
    font-size: 2rem;
    color: ${e=>e.theme.colors.primary.main};
  }
`,c=o.h3`
  font-size: 1.5rem;
  margin-bottom: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.primary};
`,l=o.p`
  color: ${e=>e.theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${e=>e.theme.spacing(2)};
`,s=o(H)`
  display: inline-flex;
  align-items: center;
  color: ${e=>e.theme.colors.primary.main};
  text-decoration: none;
  font-weight: 600;

  svg {
    margin-left: ${e=>e.theme.spacing(.5)};
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`,q=o.section`
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  padding: ${e=>e.theme.spacing(8)}
    ${e=>e.theme.spacing(3)};
`,K=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${e=>e.theme.spacing(4)};
  max-width: 1200px;
  margin: 0 auto;
`,m=o.div`
  text-align: center;
`,p=o.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: ${e=>e.theme.spacing(1)};
`,g=o.div`
  font-size: 1.2rem;
`,Q=o(F)`
  background-color: ${e=>e.theme.colors.background.default};
`,Z=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${e=>e.theme.spacing(4)};
`,y=o(h.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(4)};
  box-shadow: ${e=>e.theme.shadows.medium};
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 4rem;
    color: ${e=>e.theme.colors.primary.main}20;
    font-family: Georgia, serif;
    line-height: 1;
  }
`,f=o.p`
  font-style: italic;
  margin-bottom: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.text.secondary};
  line-height: 1.6;
  position: relative;
  z-index: 1;
`,b=o.div`
  display: flex;
  align-items: center;
`,x=o.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f3f4f6;
  margin-right: ${e=>e.theme.spacing(2)};

  & > img,
  & > svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,v=o.div``,$=o.div`
  font-weight: 600;
  color: ${e=>e.theme.colors.text.primary};
`,w=o.div`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,_=o(F)`
  background-color: ${e=>e.theme.colors.background.paper};
`,ee=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(4)};
`,k=o.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(3)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  background-color: ${e=>e.theme.colors.background.default};
  box-shadow: ${e=>e.theme.shadows.small};
`,S=o.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${e=>e.theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${e=>e.theme.spacing(2)};

  svg {
    font-size: 1.5rem;
    color: ${e=>e.theme.colors.primary.main};
  }
`,C=o.h3`
  margin-bottom: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.primary};
`,d=o.p`
  color: ${e=>e.theme.colors.text.secondary};
`,ne=()=>{const{isAuthenticated:e}=A();return t(E,{children:[t(L,{children:[i(Y,{children:i("img",{src:"/images/hospital-hero.jpg.png",alt:"Hospital"})}),t(O,{children:[i(J,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:"Advanced Healthcare at Your Fingertips"}),i(V,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},children:"Experience the future of healthcare with our comprehensive hospital management system. Book appointments, consult with specialists, and manage your medical records all in one place."}),i(X,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},children:e?t(z,{to:"/dashboard",children:["Go to Dashboard ",i(n,{})]}):t(T,{children:[t(z,{to:"/login",children:["Sign In ",i(n,{})]}),t(U,{to:"/signup",children:["Create Account ",i(n,{})]})]})})]})]}),t(F,{children:[i(u,{children:"Our Services"}),t(W,{children:[t(a,{whileHover:{y:-10},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[i(r,{children:i(M,{})}),i(c,{children:"Online Consultations"}),i(l,{children:"Connect with healthcare professionals from the comfort of your home and get expert medical advice."}),t(s,{to:"/consultations",children:["Learn More ",i(n,{})]})]}),t(a,{whileHover:{y:-10},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1},children:[i(r,{children:i(R,{})}),i(c,{children:"Appointment Scheduling"}),i(l,{children:"Book appointments with doctors, specialists, or for medical procedures with our easy-to-use scheduling system."}),t(s,{to:"/appointments",children:["Book Now ",i(n,{})]})]}),t(a,{whileHover:{y:-10},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.2},children:[i(r,{children:i(j,{})}),i(c,{children:"Health Monitoring"}),i(l,{children:"Track your vital signs, medication schedule, and health metrics for better management of chronic conditions."}),t(s,{to:"/health-monitoring",children:["Start Tracking ",i(n,{})]})]}),t(a,{whileHover:{y:-10},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.3},children:[i(r,{children:i(I,{})}),i(c,{children:"Digital Medical Records"}),i(l,{children:"Access your complete medical history, test results, and prescriptions in one secure digital platform."}),t(s,{to:"/medical-records",children:["View Records ",i(n,{})]})]}),t(a,{whileHover:{y:-10},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.4},children:[i(r,{children:i(P,{})}),i(c,{children:"Telemedicine"}),i(l,{children:"Connect with specialists through video consultations for remote diagnosis and follow-up appointments."}),t(s,{to:"/telemedicine",children:["Connect Now ",i(n,{})]})]}),t(a,{whileHover:{y:-10},initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.5},children:[i(r,{children:i(B,{})}),i(c,{children:"Medication Management"}),i(l,{children:"Receive reminders for medication, refill prescriptions online, and track your medication history."}),t(s,{to:"/medications",children:["Manage Medications ",i(n,{})]})]})]})]}),i(q,{children:t(K,{children:[t(m,{children:[i(p,{children:"50+"}),i(g,{children:"Specialist Doctors"})]}),t(m,{children:[i(p,{children:"10+"}),i(g,{children:"Departments"})]}),t(m,{children:[i(p,{children:"5000+"}),i(g,{children:"Happy Patients"})]}),t(m,{children:[i(p,{children:"15+"}),i(g,{children:"Years of Service"})]})]})}),t(Q,{children:[i(u,{children:"What Our Patients Say"}),t(Z,{children:[t(y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[i(f,{children:"The online appointment booking system saved me so much time. I was able to find a specialist, book an appointment, and have a video consultation all within the same day!"}),t(b,{children:[i(x,{children:i("img",{src:"/images/patient1.jpg",alt:"Sarah Johnson"})}),t(v,{children:[i($,{children:"Sarah Johnson"}),i(w,{children:"Patient"})]})]})]}),t(y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1},children:[i(f,{children:"Having all my medical records in one place has been a game-changer. I can easily share my history with new doctors and track my health progress over time."}),t(b,{children:[i(x,{children:i("img",{src:"/images/patient2.jpg",alt:"Michael Rodriguez"})}),t(v,{children:[i($,{children:"Michael Rodriguez"}),i(w,{children:"Patient"})]})]})]}),t(y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.2},children:[i(f,{children:"The telemedicine feature has been invaluable for managing my chronic condition. I can have regular check-ins with my doctor without having to travel to the hospital."}),t(b,{children:[i(x,{children:i("img",{src:"/images/patient3.jpg",alt:"Emily Chen"})}),t(v,{children:[i($,{children:"Emily Chen"}),i(w,{children:"Patient"})]})]})]})]})]}),t(_,{children:[i(u,{children:"Contact Us"}),t(ee,{children:[t(k,{children:[i(S,{children:i(G,{})}),i(C,{children:"Phone"}),i(d,{children:"+1 (555) 123-4567"}),i(d,{children:"+1 (555) 987-6543"})]}),t(k,{children:[i(S,{children:i(D,{})}),i(C,{children:"Email"}),i(d,{children:"info@medicare.com"}),i(d,{children:"support@medicare.com"})]}),t(k,{children:[i(S,{children:i(N,{})}),i(C,{children:"Location"}),i(d,{children:"123 Healthcare Avenue"}),i(d,{children:"Medical District, NY 10001"})]})]})]})]})};export{ne as default};
//# sourceMappingURL=Home-1b8d8482.js.map
