import{u as me,a as t,j as o,r as d,o as P,m as de,K as he,d as j,z as ge,g as pe,B as V}from"./index-c3da158f.js";import{s as r,m as ue,i as be,u as fe,r as n}from"./vendor-3ba6fd3e.js";import{C as K}from"./Card-66c37868.js";import"./Input-bfc5420b.js";import"./Button-d4df2000.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const w=r.div`
  padding: ${e=>e.theme.spacing(3)};
`,A=r.div`
  margin-bottom: ${e=>e.theme.spacing(4)};
`,z=r.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: ${e=>e.theme.spacing(1)};
`,_=r.p`
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.secondary};
`,$e=r.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${e=>e.theme.spacing(3)};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ye=r(K)`
  padding: 0;
  overflow: hidden;
`,xe=r.div`
  display: flex;
  padding: ${e=>e.theme.spacing(2)};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Se=r.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${e=>e.image||"/default-doctor.png"});
  background-size: cover;
  background-position: center;
  margin-right: ${e=>e.theme.spacing(2)};
`,ve=r.div`
  display: flex;
  flex-direction: column;
`,ke=r.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.text.primary};
`,De=r.p`
  margin: ${e=>e.theme.spacing(.5)} 0;
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,Te=r.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.primary.main};
  font-weight: 500;
`,we=r.div`
  padding: ${e=>e.theme.spacing(2)};
`,p=r.div`
  display: flex;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(1.5)};

  svg {
    color: ${e=>e.theme.colors.text.secondary};
    margin-right: ${e=>e.theme.spacing(1)};
    min-width: 20px;
  }
`,u=r.span`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-right: ${e=>e.theme.spacing(1)};
`,b=r.span`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.primary};
  font-weight: 500;
`,Ae=r(K)`
  padding: ${e=>e.theme.spacing(3)};
`,f=r.div`
  margin-bottom: ${e=>e.theme.spacing(3)};
`,$=r.h3`
  font-size: 1.1rem;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: ${e=>e.theme.spacing(2)};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
    color: ${e=>e.theme.colors.primary.main};
  }
`,ze=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: ${e=>e.theme.spacing(1)};
  margin-bottom: ${e=>e.theme.spacing(2)};
`,Ce=r.button`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid
    ${e=>e.isSelected?e.theme.colors.primary.main:e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.isSelected?e.theme.colors.primary.light:e.theme.colors.background.paper};
  color: ${e=>e.isSelected?e.theme.colors.primary.contrastText:e.theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>!e.isSelected&&e.theme.colors.background.default};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light};
  }
`,Fe=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: ${e=>e.theme.spacing(1)};
`,Ie=r.button`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid
    ${e=>e.isSelected?e.theme.colors.primary.main:e.isAvailable?e.theme.colors.border:e.theme.colors.status.error};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.isSelected?e.theme.colors.primary.light:e.isAvailable?e.theme.colors.background.paper:e.theme.colors.status.errorLight};
  color: ${e=>e.isSelected?e.theme.colors.primary.contrastText:e.isAvailable?e.theme.colors.text.primary:e.theme.colors.status.error};
  font-size: 0.8rem;
  cursor: ${e=>e.isAvailable?"pointer":"not-allowed"};
  opacity: ${e=>e.isAvailable?1:.7};

  &:hover {
    background-color: ${e=>e.isAvailable&&!e.isSelected?e.theme.colors.background.default:e.isSelected?e.theme.colors.primary.light:e.theme.colors.status.errorLight};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light};
  }
`,O=r.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
`,q=r.label`
  display: block;
  margin-bottom: ${e=>e.theme.spacing(.5)};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,Be=r.input`
  width: 100%;
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.primary};
  background-color: ${e=>e.theme.colors.background.paper};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light}40;
  }
`,Ne=r.textarea`
  width: 100%;
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.primary};
  background-color: ${e=>e.theme.colors.background.paper};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light}40;
  }
`,Re=r.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(2)};
`,G=r.button`
  flex: 1;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid
    ${e=>e.isSelected?e.theme.colors.primary.main:e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.isSelected?e.theme.colors.primary.light:e.theme.colors.background.paper};
  color: ${e=>e.isSelected?e.theme.colors.primary.contrastText:e.theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.spacing(.5)};

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${e=>!e.isSelected&&e.theme.colors.background.default};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light};
  }
`,Le=r.div`
  display: flex;
  align-items: center;
  margin-top: ${e=>e.theme.spacing(1)};
`,Ee=r.input`
  margin-right: ${e=>e.theme.spacing(1)};
`,Me=r.label`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.primary};
`,He=r(ue.button)`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  &:hover {
    background-color: ${e=>e.theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${e=>e.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`,U=r.div`
  color: ${e=>e.theme.colors.status.error};
  margin-bottom: ${e=>e.theme.spacing(2)};
  font-size: 0.9rem;
  padding: ${e=>e.theme.spacing(1)};
  background-color: ${e=>e.theme.colors.status.errorLight};
  border-radius: ${e=>e.theme.borderRadius.small};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,Pe=r.div`
  color: ${e=>e.theme.colors.status.success};
  margin-bottom: ${e=>e.theme.spacing(2)};
  font-size: 0.9rem;
  padding: ${e=>e.theme.spacing(1)};
  background-color: ${e=>e.theme.colors.status.successLight};
  border-radius: ${e=>e.theme.borderRadius.small};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,Ke=()=>{var L;const{doctorId:e}=be(),C=fe(),{user:y}=me(),[a,W]=n.useState(null),[Y,x]=n.useState(!0),[S,l]=n.useState(""),[F,J]=n.useState(""),[h,Q]=n.useState(""),[v,X]=n.useState(""),[k,I]=n.useState("in-person"),[D,Z]=n.useState(""),[B,ee]=n.useState(""),[N,te]=n.useState(!1),[R,T]=n.useState(!1),oe=Array.from({length:7},(i,s)=>{const c=new Date;return c.setDate(c.getDate()+s),c}),re=[{time:"09:00",available:!0},{time:"09:30",available:!0},{time:"10:00",available:!1},{time:"10:30",available:!0},{time:"11:00",available:!0},{time:"11:30",available:!1},{time:"12:00",available:!1},{time:"14:00",available:!0},{time:"14:30",available:!0},{time:"15:00",available:!0},{time:"15:30",available:!1},{time:"16:00",available:!0},{time:"16:30",available:!0}];n.useEffect(()=>{(async()=>{try{x(!0);const s=await V.getDoctorById(e);W(s),x(!1)}catch(s){console.error("Error fetching doctor:",s),l("Failed to load doctor information. Please try again later."),x(!1)}})()},[e]);const ie=i=>new Intl.DateTimeFormat("en-US",{weekday:"short",month:"short",day:"numeric"}).format(i),ae=async i=>{var s,c;if(i.preventDefault(),!h||!v||!D){l("Please fill in all required fields");return}if(!N){l("Please agree to the terms and conditions");return}if(!y||!y._id){l("You must be logged in to book an appointment"),setTimeout(()=>{C("/login")},2e3);return}try{T(!0),l("");const m=v,[ne,se]=m.split(":"),E=new Date(h);E.setHours(parseInt(ne),parseInt(se),0,0);const g=new Date(E);g.setMinutes(g.getMinutes()+30);const M=`${g.getHours().toString().padStart(2,"0")}:${g.getMinutes().toString().padStart(2,"0")}`,H=new Date(h).toISOString().split("T")[0];console.log("Creating appointment with times:",{date:H,startTime:m,endTime:M});const le={patient:y._id,doctor:e,department:a.department._id,appointmentDate:H,startTime:m,endTime:M,reason:D,notes:B,type:k,status:"pending"},ce=await V.createAppointment(le);console.log("Appointment created:",ce),J("Appointment booked successfully!"),T(!1),setTimeout(()=>{C("/dashboard/appointments")},2e3)}catch(m){console.error("Error booking appointment:",m),l(((c=(s=m.response)==null?void 0:s.data)==null?void 0:c.message)||"Failed to book appointment. Please try again."),T(!1)}};return Y?t(w,{children:t(A,{children:t(z,{children:"Loading doctor information..."})})}):a?o(w,{children:[o(A,{children:[t(z,{children:"Book an Appointment"}),o(_,{children:["Select your preferred date and time to book an appointment with Dr."," ",a.name]})]}),S&&o(U,{children:[t(d,{}),S]}),F&&o(Pe,{children:[t(d,{}),F]}),o($e,{children:[o(ye,{children:[o(xe,{children:[t(Se,{image:a.profileImage}),o(ve,{children:[o(ke,{children:["Dr. ",a.name]}),a.specialization&&t(De,{children:a.specialization}),a.department&&t(Te,{children:a.department.name})]})]}),o(we,{children:[o(p,{children:[t(P,{}),t(u,{children:"Experience:"}),t(b,{children:a.experience||"Not specified"})]}),o(p,{children:[t(de,{}),t(u,{children:"Department:"}),t(b,{children:((L=a.department)==null?void 0:L.name)||"Not specified"})]}),o(p,{children:[t(he,{}),t(u,{children:"Consultation Fee:"}),o(b,{children:["$",a.consultationFee||"Not specified"]})]}),a.bio&&o(p,{style:{flexDirection:"column",alignItems:"flex-start"},children:[o("div",{style:{display:"flex",alignItems:"center",marginBottom:"8px"},children:[t(d,{style:{marginRight:"8px"}}),t(u,{children:"About:"})]}),t(b,{style:{lineHeight:"1.5"},children:a.bio})]})]})]}),t(Ae,{children:o("form",{onSubmit:ae,children:[o(f,{children:[o($,{children:[t(j,{}),"Select Date"]}),t(ze,{children:oe.map(i=>t(Ce,{type:"button",isSelected:h&&new Date(h).toDateString()===i.toDateString(),onClick:()=>Q(i.toISOString()),children:ie(i)},i.toISOString()))})]}),o(f,{children:[o($,{children:[t(ge,{}),"Select Time"]}),t(Fe,{children:re.map(i=>t(Ie,{type:"button",isAvailable:i.available,isSelected:v===i.time,onClick:()=>i.available&&X(i.time),disabled:!i.available,children:i.time},i.time))})]}),o(f,{children:[o($,{children:[t(d,{}),"Appointment Type"]}),o(Re,{children:[o(G,{type:"button",isSelected:k==="in-person",onClick:()=>I("in-person"),children:[t(P,{}),"In-Person"]}),o(G,{type:"button",isSelected:k==="video",onClick:()=>I("video"),children:[t(pe,{}),"Video Call"]})]})]}),o(f,{children:[o($,{children:[t(d,{}),"Appointment Details"]}),o(O,{children:[t(q,{htmlFor:"reason",children:"Reason for Visit *"}),t(Be,{id:"reason",name:"reason",type:"text",value:D,onChange:i=>Z(i.target.value),placeholder:"Brief reason for appointment",required:!0})]}),o(O,{children:[t(q,{htmlFor:"notes",children:"Additional Notes"}),t(Ne,{id:"additionalNotes",name:"additionalNotes",value:B,onChange:i=>ee(i.target.value),placeholder:"Any additional information you'd like the doctor to know"})]}),o(Le,{children:[t(Ee,{type:"checkbox",id:"agreeToTerms",name:"agreeToTerms",checked:N,onChange:i=>te(i.target.checked)}),t(Me,{htmlFor:"agreeToTerms",children:"I agree to the terms and conditions for booking an appointment"})]})]}),o(He,{type:"submit",disabled:R,whileTap:{scale:.95},children:[t(j,{}),R?"Booking Appointment...":"Book Appointment"]})]})})]})]}):o(w,{children:[o(A,{children:[t(z,{children:"Doctor Not Found"}),t(_,{children:"The doctor you're looking for doesn't exist or has been removed."})]}),o(U,{children:[t(d,{}),S||"Doctor not found"]})]})};export{Ke as default};
//# sourceMappingURL=BookAppointment-90e6b2a2.js.map
