import{a as i,j as n,g as o,al as l,d as s,z as c}from"./index-c3da158f.js";import{s as t,m}from"./vendor-3ba6fd3e.js";import{C as r}from"./Card-66c37868.js";import{B as d}from"./Button-d4df2000.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const p=t.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
  padding: ${e=>e.theme.spacing(3)};
`,h=t(r)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;
  background-color: ${e=>e.theme.colors.background.default};
`,g=t.div`
  font-size: 64px;
  margin-bottom: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.primary.main};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};
`,f=t.h1`
  font-size: 36px;
  margin-bottom: ${e=>e.theme.spacing(2)};
  color: ${e=>e.theme.colors.text.primary};
`,u=t.h2`
  font-size: 20px;
  margin-bottom: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.text.secondary};
  max-width: 600px;
`,x=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
  margin: ${e=>e.theme.spacing(4)} 0;
  width: 100%;
  max-width: 800px;
`,a=t(r)`
  padding: ${e=>e.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  svg {
    font-size: 32px;
    margin-bottom: ${e=>e.theme.spacing(2)};
    color: ${e=>e.theme.colors.primary.main};
  }

  h3 {
    margin-bottom: ${e=>e.theme.spacing(1)};
    font-size: 18px;
  }

  p {
    color: ${e=>e.theme.colors.text.secondary};
    font-size: 14px;
  }
`,z=()=>i(p,{children:n(h,{as:m.div,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[n(g,{children:[i(o,{}),i(l,{})]}),i(f,{children:"Telemedicine Dashboard Coming Soon"}),i(u,{children:"We're working hard to bring you a powerful telemedicine platform for managing your virtual appointments with patients."}),n(x,{children:[n(a,{children:[i(o,{}),i("h3",{children:"Video Consultations"}),i("p",{children:"Conduct high-quality video appointments with your patients from anywhere"})]}),n(a,{children:[i(s,{}),i("h3",{children:"Appointment Management"}),i("p",{children:"Easily schedule, reschedule and manage all your telemedicine appointments"})]}),n(a,{children:[i(c,{}),i("h3",{children:"Efficient Workflow"}),i("p",{children:"Streamlined interface designed for busy healthcare professionals"})]})]}),i(d,{variant:"primary",size:"large",onClick:()=>alert("This feature will be available soon!"),children:"Notify Me When Available"})]})});export{z as default};
//# sourceMappingURL=DoctorTelemedicine-7d9d4bb0.js.map
