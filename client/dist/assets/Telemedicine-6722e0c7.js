import{j as a,a as t,g as d,aa as y,ab as x,ac as v,ad as $,d as b,z as C}from"./index-c3da158f.js";import{s as i,r as n,m as w}from"./vendor-3ba6fd3e.js";import{C as p}from"./Card-66c37868.js";import{B as k}from"./Button-d4df2000.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const A=i.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
`,I=i.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: ${e=>e.theme.spacing(3)};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,M=i(p)`
  aspect-ratio: 16 / 9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1a1a2e;
  position: relative;
  overflow: hidden;
`,F=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: ${e=>e.theme.spacing(3)};

  svg {
    font-size: 48px;
    margin-bottom: ${e=>e.theme.spacing(2)};
    color: ${e=>e.theme.colors.primary.light};
  }

  h3 {
    margin-bottom: ${e=>e.theme.spacing(1)};
  }
`,N=i.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: ${e=>e.theme.spacing(2)};
  padding: ${e=>e.theme.spacing(2)};
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
`,r=i.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.default};

  &.primary {
    background-color: ${e=>e.theme.colors.primary.main};
    color: white;

    &:hover {
      background-color: ${e=>e.theme.colors.primary.light};
    }
  }

  &.danger {
    background-color: ${e=>e.theme.colors.status.error};
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  }

  &.muted {
    background-color: #555;
    color: white;

    &:hover {
      background-color: #666;
    }
  }
`,P=i.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,j=i(p)`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
  border-left: 4px solid
    ${e=>e.status==="active"?e.theme.colors.status.success:e.status==="upcoming"?e.theme.colors.primary.main:e.theme.colors.text.disabled};
  transition: transform ${e=>e.theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
  }
`,S=i.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,T=i.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${e=>e.theme.colors.primary.light};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`,J=i.div`
  flex: 1;
`,V=i.h4`
  margin: 0;
  font-size: 16px;
`,z=i.span`
  font-size: 14px;
  color: ${e=>e.theme.colors.text.secondary};
`,D=i.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing(2)};
`,m=i.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  font-size: 14px;
  color: ${e=>e.theme.colors.text.secondary};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,R=i.span`
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 12px;
  font-weight: 600;

  &.active {
    background-color: ${e=>e.theme.colors.status.success}20;
    color: ${e=>e.theme.colors.status.success};
  }

  &.upcoming {
    background-color: ${e=>e.theme.colors.primary.main}20;
    color: ${e=>e.theme.colors.primary.main};
  }

  &.completed {
    background-color: ${e=>e.theme.colors.text.disabled}20;
    color: ${e=>e.theme.colors.text.disabled};
  }
`,q=()=>{const[e,h]=n.useState(!1),[s,u]=n.useState(!1),[l,c]=n.useState(!1),g=[{id:1,patientName:"John Doe",patientInitials:"JD",type:"Follow-up Consultation",date:"Today",time:"10:00 AM",status:"active"},{id:2,patientName:"Jane Smith",patientInitials:"JS",type:"Initial Consultation",date:"Today",time:"2:30 PM",status:"upcoming"},{id:3,patientName:"Robert Johnson",patientInitials:"RJ",type:"Medication Review",date:"Tomorrow",time:"11:15 AM",status:"upcoming"},{id:4,patientName:"Emily Davis",patientInitials:"ED",type:"Follow-up Consultation",date:"Yesterday",time:"3:00 PM",status:"completed"}],f=()=>{c(!0)};return a(A,{children:[t("h2",{children:"Telemedicine"}),a(I,{children:[a(M,{children:[l?t("video",{src:"/video-placeholder.mp4",autoPlay:!0,loop:!0,muted:!0,style:{width:"100%",height:"100%",objectFit:"cover"}}):a(F,{children:[t(d,{}),t("h3",{children:"Ready for your next appointment"}),t("p",{children:"Click on an appointment to start a video consultation"})]}),l&&a(N,{children:[t(r,{className:e?"muted":"primary",onClick:()=>h(!e),children:e?t(y,{}):t(x,{})}),t(r,{className:s?"muted":"primary",onClick:()=>u(!s),children:s?t(v,{}):t(d,{})}),t(r,{className:"danger",onClick:()=>{c(!1)},children:t($,{})})]})]}),a(P,{children:[t("h3",{children:"Today's Appointments"}),g.map(o=>a(j,{status:o.status,as:w.div,whileHover:{x:5},children:[a(S,{children:[t(T,{children:o.patientInitials}),a(J,{children:[t(V,{children:o.patientName}),t(z,{children:o.type})]}),t(R,{className:o.status,children:o.status.charAt(0).toUpperCase()+o.status.slice(1)})]}),a(D,{children:[a(m,{children:[t(b,{}),t("span",{children:o.date})]}),a(m,{children:[t(C,{}),t("span",{children:o.time})]})]}),o.status!=="completed"&&t(k,{variant:o.status==="active"?"primary":"secondary",onClick:o.status==="active"?f:void 0,children:o.status==="active"?"Join Call":"Remind Patient"})]},o.id))]})]})]})};export{q as default};
//# sourceMappingURL=Telemedicine-6722e0c7.js.map
