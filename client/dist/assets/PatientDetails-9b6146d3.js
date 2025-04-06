import{u as xt,a as t,j as o,p as re,Q as Tt,R as Pt,H as Ie,B as L,S as Me,T as Fe,L as Ye,f as Ne,b as F,w as Le,r as Dt,U as Qe,V as ue,J as Nt,W as It,F as wt,X as Mt,Y as Ke,I as Ft,Z as Ze,d as kt,_ as St,$ as Lt,a0 as pe,M as zt,a1 as Et,a2 as Bt,t as Ct,a3 as Rt,a4 as Ht,a5 as Ut,e as At,y as jt,a6 as Xe,O as qt,a7 as Gt,a8 as ge}from"./index-c3da158f.js";import{s as n,m as P,r as d,A as ze,i as Ot,u as Vt,R as _t}from"./vendor-3ba6fd3e.js";import{P as He,c as J}from"./PageTransition-e5168143.js";import{A as Je}from"./AnimationContainer-978f4c1f.js";import{c as et}from"./index-cd980176.js";import{L as Wt,V as Yt}from"./LabReportCard-3ba92b1f.js";import"./Card-66c37868.js";import{B as q}from"./Button-d4df2000.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const Kt=n(P.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`,Zt=n(P.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${e=>e.theme.shadows.large};
`,Qt=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing(2)}
    ${e=>e.theme.spacing(3)};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Xt=n.h2`
  margin: 0;
  font-size: 1.3rem;
  color: ${e=>e.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,Jt=n.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(.5)};
  border-radius: 50%;

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
    color: ${e=>e.theme.colors.text.primary};
  }
`,eo=n.div`
  padding: ${e=>e.theme.spacing(3)};
`,to=n.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
`,we=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(1)};
`,ke=n.label`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  font-weight: 500;
`,oo=n.select`
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.paper};
  font-size: 0.95rem;
  color: ${e=>e.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,ro=n.textarea`
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.paper};
  font-size: 0.95rem;
  color: ${e=>e.theme.colors.text.primary};
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,no=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(2)};
`,Ue=n(P.button)`
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  background-color: ${e=>e.variant==="primary"?e.theme.colors.primary.main:e.theme.colors.background.default};

  color: ${e=>e.variant==="primary"?"white":e.theme.colors.text.primary};

  border: ${e=>e.variant==="primary"?"none":`1px solid ${e.theme.colors.border}`};

  &:hover {
    background-color: ${e=>e.variant==="primary"?e.theme.colors.primary.dark:e.theme.colors.background.card};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,io=n.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(1)};
`,tt=n.label`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  cursor: pointer;
  padding: ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
  }

  input {
    margin: 0;
  }

  span {
    font-size: 0.9rem;
    color: ${e=>e.theme.colors.text.primary};
  }
`,ao=n.span`
  color: ${e=>e.theme.colors.status.error};
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
`,so=n(P.div)`
  text-align: center;
  padding: ${e=>e.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};

  h3 {
    color: ${e=>e.theme.colors.status.success};
    margin: 0;
  }

  p {
    color: ${e=>e.theme.colors.text.secondary};
    margin: 0;
  }
`,co=({isOpen:e,onClose:a,patient:c,patientId:i,departmentId:u,doctorId:v})=>{const{user:x}=xt(),[k,$]=d.useState("Blood Test"),[R,l]=d.useState(""),[D,C]=d.useState("Normal"),[A,N]=d.useState(!1),[b,w]=d.useState(!1),[T,S]=d.useState(c||null),[E,p]=d.useState(!c&&!!i);d.useEffect(()=>{e&&(async()=>{if(!c&&i){p(!0);try{const y=await L.getPatientById(i);S(y)}catch(y){console.error("Error fetching patient data:",y)}finally{p(!1)}}else c&&S(c)})()},[c,i,e]);const z=async m=>{m.preventDefault();try{N(!0);const y={patient:i,doctor:x._id,reportType:k,urgency:D,notes:R,status:"pending"};await L.createLabOrder(y),et.success("Lab test requested successfully"),a()}catch(y){console.error("Error requesting lab test:",y),et.error("Failed to request lab test"),N(!1)}},M={hidden:{opacity:0},visible:{opacity:1}},W={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}};return e?t(Kt,{variants:M,initial:"hidden",animate:"visible",exit:"hidden",onClick:a,children:o(Zt,{variants:W,onClick:m=>m.stopPropagation(),children:[o(Qt,{children:[o(Xt,{children:[t(re,{}),"Request Lab Test"]}),t(Jt,{onClick:a,children:t(Tt,{})})]}),t(eo,{children:E?t("div",{style:{textAlign:"center",padding:"20px"},children:t("p",{children:"Loading patient data..."})}):b?o(so,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:[t(Pt,{size:40,color:"#4CAF50"}),t("h3",{children:"Lab Test Requested Successfully"}),t("p",{children:"The lab technician will be notified of the request."})]}):T?o(to,{onSubmit:z,children:[o(we,{children:[t(ke,{htmlFor:"patient-name",children:"Patient"}),t("div",{style:{padding:"10px",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f9f9f9"},children:T.firstName&&T.lastName?`${T.firstName} ${T.lastName}`:T.name||"Unknown Patient"})]}),o(we,{children:[t(ke,{htmlFor:"test-type",children:"Test Type"}),o(oo,{id:"test-type",value:k,onChange:m=>$(m.target.value),required:!0,children:[t("option",{value:"Blood Test",children:"Blood Test"}),t("option",{value:"Urine Analysis",children:"Urine Analysis"}),t("option",{value:"X-Ray",children:"X-Ray"}),t("option",{value:"CT Scan",children:"CT Scan"}),t("option",{value:"MRI",children:"MRI"}),t("option",{value:"Ultrasound",children:"Ultrasound"}),t("option",{value:"ECG",children:"ECG"})]})]}),o(we,{children:[t(ke,{children:"Urgency"}),o(io,{children:[o(tt,{children:[t("input",{type:"radio",id:"normal",name:"urgency",value:"Normal",checked:D==="Normal",onChange:m=>C(m.target.value)}),t("span",{children:"Normal"})]}),o(tt,{children:[t("input",{type:"radio",id:"urgent",name:"urgency",value:"Urgent",checked:D==="Urgent",onChange:m=>C(m.target.value)}),o("span",{children:["Urgent",D==="Urgent"&&o(ao,{children:[t(Ie,{}),"Priority Processing"]})]})]})]})]}),o(we,{children:[t(ke,{htmlFor:"notes",children:"Notes & Instructions"}),t(ro,{id:"notes",value:R,onChange:m=>l(m.target.value),placeholder:"Add any specific instructions or details for the lab technician..."})]}),o(no,{children:[t(Ue,{type:"button",onClick:a,whileHover:{scale:1.02},whileTap:{scale:.98},children:"Cancel"}),t(Ue,{type:"submit",variant:"primary",disabled:A,whileHover:{scale:1.02},whileTap:{scale:.98},children:A?"Submitting...":"Submit Request"})]})]}):o("div",{style:{textAlign:"center",padding:"20px",color:"red"},children:[t("p",{children:"Error: Could not retrieve patient data"}),t(Ue,{type:"button",onClick:a,style:{marginTop:"10px"},children:"Close"})]})})]})}):null},lo=n(P.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${e=>e.theme.spacing(2)};
`,mo=n(P.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.large};
  width: 90%;
  max-width: 900px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
`,ho=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(3)};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
  position: sticky;
  top: 0;
  background-color: ${e=>e.theme.colors.background.paper};
  z-index: 10;
`,go=n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${e=>e.theme.colors.text.primary};
  }

  svg {
    font-size: 1.8rem;
    color: ${e=>e.theme.colors.primary.main};
  }
`,uo=n.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(1)};
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
    color: ${e=>e.theme.colors.text.primary};
  }
`,ot=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;

  svg {
    font-size: 2.5rem;
    color: ${e=>e.theme.colors.primary.main};
    animation: spin 1.5s linear infinite;
    margin-bottom: ${e=>e.theme.spacing(2)};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h3 {
    margin-bottom: ${e=>e.theme.spacing(2)};
    color: ${e=>e.theme.colors.text.primary};
  }

  p {
    color: ${e=>e.theme.colors.text.secondary};
    max-width: 400px;
  }
`,po=n.div`
  width: 100%;
  max-width: 400px;
  height: 8px;
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: 4px;
  margin: ${e=>e.theme.spacing(2)} 0;
  overflow: hidden;
`,yo=n.div`
  height: 100%;
  width: ${e=>e.progress}%;
  background-color: ${e=>e.theme.colors.primary.main};
  transition: width 0.3s ease;
`,fo=n.div`
  padding: ${e=>e.theme.spacing(3)};
`,bo=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(4)};
`,je=n.div`
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(3)};
  border-left: 4px solid ${e=>e.theme.colors.primary.main};
`,G=n.h3`
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: ${e=>e.theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,$o=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(2)};
`,vo=n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  border: 1px solid ${e=>e.theme.colors.border.main};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: ${e=>e.theme.shadows.small};
  }
`,xo=n.div`
  background-color: ${e=>e.confidence>=70?e.theme.colors.success:e.confidence>=40?e.theme.colors.warning:e.theme.colors.status.error};
  color: white;
  border-radius: 20px;
  padding: ${e=>`${e.theme.spacing(.5)} ${e.theme.spacing(2)}`};
  font-weight: 500;
  min-width: 65px;
  text-align: center;
`,wo=n.div`
  flex: 1;
  font-weight: 500;
  color: ${e=>e.theme.colors.text.primary};
`,Se=n.div`
  margin: ${e=>e.theme.spacing(4)} 0;
`;n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: ${e=>e.theme.spacing(2)};
`;n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};

  svg {
    min-width: 20px;
    color: ${e=>e.theme.colors.primary.main};
  }
`;n.div`
  display: flex;
  flex-direction: column;
  width: 150px;

  .factor-label {
    font-size: 0.8rem;
    color: ${e=>e.theme.colors.text.secondary};
    margin-bottom: ${e=>e.theme.spacing(.5)};
  }

  .weight-bar {
    height: 8px;
    background-color: ${e=>e.theme.colors.background.default};
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .weight-fill {
    position: absolute;
    height: 100%;
    width: ${e=>e.$weight}%;
    background-color: ${e=>e.theme.colors.primary.main};
  }
`;n.p`
  flex: 1;
  margin: 0;
  color: ${e=>e.theme.colors.text.primary};
`;const ko=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(4)};
`,ne=n.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.paper:e.theme.colors.primary.main};
  color: ${e=>e.variant==="secondary"?e.theme.colors.text.primary:"white"};
  border: ${e=>e.variant==="secondary"?`1px solid ${e.theme.colors.border.main}`:"none"};

  &:hover {
    background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.default:e.theme.colors.primary.dark};
  }
`,So=n.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  font-style: italic;
  margin-top: ${e=>e.theme.spacing(4)};
  padding-top: ${e=>e.theme.spacing(2)};
  border-top: 1px solid ${e=>e.theme.colors.border.main};
`,Co=n.div`
  display: flex;
  margin-bottom: ${e=>e.theme.spacing(3)};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
`,Ce=n.button`
  padding: ${e=>e.theme.spacing(2)}
    ${e=>e.theme.spacing(3)};
  background: none;
  border: none;
  font-weight: ${e=>e.$active?"600":"400"};
  color: ${e=>e.$active?e.theme.colors.primary.main:e.theme.colors.text.secondary};
  border-bottom: 2px solid
    ${e=>e.$active?e.theme.colors.primary.main:"transparent"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${e=>e.theme.colors.primary.main};
  }
`,Re=n.div`
  display: ${e=>e.$active?"block":"none"};
`,Ae=n(Me)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: spin 1.5s linear infinite;
`,Ro=n.div`
  margin: ${e=>e.theme.spacing(3)} 0;
`,Ao=n.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: ${e=>e.theme.spacing(2)};
`,To=n.div`
  background-color: ${e=>e.$selected?e.theme.colors.primary.main:e.theme.colors.background.default};
  color: ${e=>e.$selected?"white":e.theme.colors.text.primary};
  border-radius: 20px;
  padding: ${e=>`${e.theme.spacing(.5)} ${e.theme.spacing(2)}`};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid
    ${e=>e.$selected?e.theme.colors.primary.main:e.theme.colors.border.main};

  &:hover {
    border-color: ${e=>e.theme.colors.primary.main};
    background-color: ${e=>e.$selected?e.theme.colors.primary.main:`${e.theme.colors.primary.main}10`};
  }
`,Po=n.div`
  display: flex;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: ${e=>e.theme.spacing(2)};

  input {
    flex: 1;
    padding: ${e=>e.theme.spacing(1)};
    border-radius: ${e=>e.theme.borderRadius.small};
    border: 1px solid ${e=>e.theme.colors.border.main};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background-color: ${e=>e.theme.colors.primary.main};
    color: white;
    cursor: pointer;

    &:hover {
      background-color: ${e=>e.theme.colors.primary.dark};
    }
  }
`,Do=["Fever","Cough","Headache","Fatigue","Nausea","Shortness of breath","Dizziness","Chest pain","Abdominal pain","Back pain","Joint pain","Sore throat","Runny nose","Muscle ache","Insomnia","Loss of appetite","Weight loss","Swelling","Rash","Vomiting","Diarrhea","Constipation","Blurred vision","Increased thirst","Frequent urination"],No=n.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  border: 1px solid ${e=>e.theme.colors.border.main};
  border-radius: ${e=>e.theme.borderRadius.medium};
  overflow: hidden;
`,Io=n.div`
  flex: 1;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.default};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,Mo=n.div`
  display: flex;
  padding: ${e=>e.theme.spacing(2)};
  border-top: 1px solid ${e=>e.theme.colors.border.main};
  background-color: ${e=>e.theme.colors.background.paper};
`,Fo=n.input`
  flex: 1;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border.main};
  border-radius: ${e=>e.theme.borderRadius.medium};
  margin-right: ${e=>e.theme.spacing(1)};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,Lo=n.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>`${e.theme.spacing(1)} ${e.theme.spacing(2)}`};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.dark};
  }

  &:disabled {
    background-color: ${e=>e.theme.colors.background.default};
    color: ${e=>e.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`,qe=n.div`
  max-width: 70%;
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  background-color: ${e=>e.$sender==="user"?e.theme.colors.primary.main:e.theme.colors.background.paper};
  color: ${e=>e.$sender==="user"?"white":e.theme.colors.text.primary};
  align-self: ${e=>e.$sender==="user"?"flex-end":"flex-start"};
  box-shadow: ${e=>e.theme.shadows.small};

  p {
    margin: 0;
    white-space: pre-wrap;
  }
`,zo=({isOpen:e,onClose:a,patientId:c,onViewHistory:i})=>{var de,me,he;const[u,v]=d.useState(!0),[x,k]=d.useState(0),[$,R]=d.useState(null),[l,D]=d.useState(null),[C,A]=d.useState("symptoms"),[N,b]=d.useState(null),[w,T]=d.useState(!1),[S,E]=d.useState(!1),[p,z]=d.useState([]),[M,W]=d.useState(""),[m,y]=d.useState(null),[I,X]=d.useState([]),[B,ee]=d.useState(""),[h,f]=d.useState(!1);d.useEffect(()=>{e&&c&&(v(!0),k(0),R(null),z([]),b(null),H())},[e,c]);const H=async()=>{try{const r=await L.getPatientById(c);y(r),v(!1)}catch(r){console.error("Error fetching patient data:",r),b("Failed to load patient information. Please try again."),v(!1)}},te=r=>{p.includes(r)?z(p.filter(s=>s!==r)):z([...p,r])},ye=()=>{M.trim()&&!p.includes(M.trim())&&(z([...p,M.trim()]),W(""))},Ee=async()=>{if(p.length===0){b("Please select at least one symptom to generate a diagnosis.");return}v(!0),k(0),b(null);const r=setInterval(()=>{k(s=>{const g=s+Math.random()*10;return g>=100?(clearInterval(r),Be(),100):g})},400);return()=>clearInterval(r)},Be=async()=>{try{const r={symptoms:p,patientId:c,geminiApiKey:"AIzaSyDhRb7fLT6gV0zNUcQaZGDtwmnmYRjmZU0"},s=await L.getAIDiagnosticSuggestionV2(c,r);D(s),R(s.diagnoses[0]),v(!1),A("overview")}catch(r){console.error("Error fetching diagnostic suggestions:",r),b("Failed to generate diagnostic suggestions. Please try again."),v(!1)}},fe=async()=>{if(!(!l||!$)){T(!0),E(!1);try{const r={diagnosis:$,summary:l.summary,patientContext:l.patientContext,symptoms:p,timestamp:new Date().toISOString()},s=await L.saveAIDiagnosticSuggestion(c,r);console.log("Diagnosis saved successfully:",s),E(!0),setTimeout(()=>{E(!1)},3e3)}catch(r){console.error("Error saving diagnosis:",r),b("Failed to save diagnosis to patient record.")}finally{T(!1)}}},be=()=>{window.print()},le=async()=>{if(!B.trim()||h)return;const r=B.trim();X([...I,{sender:"user",text:r}]),ee(""),f(!0);try{let s="";l?(s=`Based on the patient's symptoms (${p.join(", ")}), `,s+=`the top diagnosis is ${l.diagnoses[0].name} `,s+=`with ${l.diagnoses[0].confidence}% confidence. `):s=`Based on the patient's symptoms (${p.join(", ")}), `;const g=`
${s}

Previous conversation:
${I.map(j=>`${j.sender==="user"?"Doctor":"AI"}: ${j.text}`).join(`
`)}

Doctor: ${r}

Please respond to the doctor's question as a medical AI assistant. Keep your response professional, evidence-based, and concise. Only respond to the specific question or follow-up, without unnecessary explanations about your role or excessive medical disclaimers.
`,U=await L.callGeminiAPI(g,"AIzaSyDhRb7fLT6gV0zNUcQaZGDtwmnmYRjmZU0");X([...I,{sender:"user",text:r},{sender:"ai",text:U}])}catch(s){console.error("Error getting AI response:",s),X([...I,{sender:"user",text:r},{sender:"ai",text:"I apologize, but I'm unable to process your request at the moment. Please try again later."}])}finally{f(!1)}},$e=r=>{r.key==="Enter"&&le()},ve={hidden:{opacity:0},visible:{opacity:1}},xe={hidden:{opacity:0,y:50},visible:{opacity:1,y:0,transition:{delay:.2}}};return e?t(ze,{children:t(lo,{initial:"hidden",animate:"visible",exit:"hidden",variants:ve,onClick:r=>r.target===r.currentTarget&&a(),children:o(mo,{variants:xe,children:[o(ho,{children:[o(go,{children:[t(Fe,{}),t("h2",{children:"Smart Diagnosis Assistant"})]}),t(uo,{onClick:a,children:t(Ye,{})})]}),u?o(ot,{children:[t(Ae,{}),t("h3",{children:"Analyzing Patient Data"}),t("p",{children:"AI is analyzing patient history, symptoms, lab results, and relevant medical knowledge to generate diagnostic suggestions."}),t(po,{children:t(yo,{progress:x})})]}):N?o(ot,{children:[t(Ie,{style:{color:"#EF4444"}}),t("h3",{children:"Error"}),t("p",{children:N}),t(ne,{onClick:()=>{b(null),l&&A("symptoms")},style:{marginTop:"16px"},children:"Try Again"})]}):o(fo,{children:[o(Co,{children:[o(Ce,{$active:C==="symptoms",onClick:()=>A("symptoms"),children:[t(Ne,{})," Symptoms"]}),l&&o(F,{children:[o(Ce,{$active:C==="overview",onClick:()=>A("overview"),children:[t(Le,{})," Overview"]}),o(Ce,{$active:C==="context",onClick:()=>A("context"),children:[t(Dt,{})," Context"]}),o(Ce,{$active:C==="chat",onClick:()=>A("chat"),children:[t(Qe,{})," Ask AI"]})]})]}),o(bo,{children:[o(Re,{$active:C==="symptoms",children:[m&&o(je,{children:[o(G,{children:[t(ue,{})," Patient Information"]}),o("p",{children:[t("strong",{children:"Name:"})," ",(m==null?void 0:m.firstName)||(m==null?void 0:m.name)||"Unknown",m!=null&&m.lastName?` ${m.lastName}`:"",t("br",{}),t("strong",{children:"Age:"})," ",m!=null&&m.dateOfBirth||m!=null&&m.birthDate?new Date().getFullYear()-new Date((m==null?void 0:m.dateOfBirth)||(m==null?void 0:m.birthDate)).getFullYear():"Unknown",t("br",{}),t("strong",{children:"Gender:"})," ",(m==null?void 0:m.gender)||"Unknown",t("br",{}),t("strong",{children:"Blood Group:"})," ",(m==null?void 0:m.bloodGroup)||"Unknown"]})]}),o(Ro,{children:[o(G,{children:[t(Ne,{})," Select Symptoms"]}),t("p",{children:"Select all symptoms the patient is experiencing:"}),t(Ao,{children:Do.map(r=>t(To,{$selected:p.includes(r),onClick:()=>te(r),children:r},r))}),o(Po,{children:[t("input",{type:"text",placeholder:"Add custom symptom",value:M,onChange:r=>W(r.target.value),onKeyPress:r=>r.key==="Enter"&&ye()}),t("button",{onClick:ye,children:t(Nt,{})})]}),p.length>0&&o("div",{style:{marginTop:"20px"},children:[t(G,{children:"Selected Symptoms"}),t("ul",{children:p.map(r=>t("li",{children:r},r))})]}),t(ne,{onClick:Ee,style:{marginTop:"20px"},disabled:p.length===0,children:"Generate Diagnosis"})]})]}),l&&o(F,{children:[o(Re,{$active:C==="overview",children:[o(je,{children:[o(G,{children:[t(ue,{})," Summary"]}),t("p",{children:l.summary})]}),o(G,{children:[t(It,{})," Potential Diagnoses"]}),t($o,{children:l.diagnoses.map(r=>o(vo,{onClick:()=>R(r),style:{borderColor:($==null?void 0:$.id)===r.id?"currentColor":void 0,borderLeftWidth:($==null?void 0:$.id)===r.id?"4px":"1px"},children:[o(xo,{confidence:r.confidence,children:[r.confidence,"%"]}),t(wo,{children:r.name}),t(wt,{})]},r.id))})]}),o(Re,{$active:C==="context",children:[o(Se,{children:[o(G,{children:[t(Ne,{})," Selected Symptoms"]}),t("ul",{children:p.map((r,s)=>t("li",{children:r},s))})]}),o(Se,{children:[o(G,{children:[t(ue,{})," Relevant Medical History"]}),(de=l==null?void 0:l.patientContext)!=null&&de.relevantHistory&&l.patientContext.relevantHistory.length>0?t("ul",{children:l.patientContext.relevantHistory.map((r,s)=>t("li",{children:r},s))}):t("p",{children:"No relevant medical history found"})]}),o(Se,{children:[o(G,{children:[t(re,{})," Recent Lab Results"]}),(me=l==null?void 0:l.patientContext)!=null&&me.recentLabResults&&l.patientContext.recentLabResults.length>0?t("ul",{children:l.patientContext.recentLabResults.map((r,s)=>t("li",{children:r},s))}):t("p",{children:"No recent lab results found"})]}),o(Se,{children:[o(G,{children:[t(Le,{})," Current Medications"]}),(he=l==null?void 0:l.patientContext)!=null&&he.currentMedications&&l.patientContext.currentMedications.length>0?t("ul",{children:l.patientContext.currentMedications.map((r,s)=>t("li",{children:r},s))}):t("p",{children:"No current medications found"})]})]})]}),l&&o(Re,{$active:C==="chat",children:[o(je,{children:[o(G,{children:[t(Qe,{})," AI Medical Assistant"]}),t("p",{children:"Ask follow-up questions or seek clarification about the diagnosis, treatment options, or medical information. The AI assistant will respond based on the diagnostic context."})]}),o(No,{children:[o(Io,{children:[I.length===0?t(qe,{$sender:"ai",children:t("p",{children:"Hello, I'm your AI medical assistant. I can help answer questions about the diagnosis, symptoms, potential treatments, or provide additional medical information. What would you like to know?"})}):I.map((r,s)=>t(qe,{$sender:r.sender,children:t("p",{children:r.text})},s)),h&&t(qe,{$sender:"ai",children:o("p",{children:[t(Ae,{style:{fontSize:"1rem",marginRight:"8px"}}),"Thinking..."]})})]}),o(Mo,{children:[t(Fo,{type:"text",placeholder:"Type your medical question here...",value:B,onChange:r=>ee(r.target.value),onKeyPress:$e,disabled:h}),t(Lo,{onClick:le,disabled:!B.trim()||h,children:h?t(Ae,{}):t(Mt,{})})]})]})]}),o(ko,{children:[t(ne,{variant:"secondary",onClick:a,children:"Close"}),i&&o(ne,{variant:"secondary",onClick:i,style:{marginRight:"auto"},children:[t(Ke,{})," View History"]}),l&&o(F,{children:[t(ne,{onClick:fe,disabled:w||!l,children:w?o(F,{children:[t(Ae,{})," Saving..."]}):S?o(F,{children:[t(Ft,{style:{color:"#10B981"}})," ","Saved!"]}):t(F,{children:"Save to Patient Record"})}),o(ne,{onClick:be,children:[t(Ze,{})," Print Report"]})]})]}),t(So,{children:"Note: This AI-generated diagnostic suggestion is meant to assist healthcare professionals and should not replace clinical judgment. Always consider the full clinical context and use your professional expertise when making diagnoses."})]})]})]})})}):null},Eo=n(P.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${e=>e.theme.spacing(2)};
`,Bo=n(P.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.large};
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
`,Ho=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(3)};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
  position: sticky;
  top: 0;
  background-color: ${e=>e.theme.colors.background.paper};
  z-index: 10;
`,Uo=n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};

  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: ${e=>e.theme.colors.text.primary};
  }

  svg {
    font-size: 1.8rem;
    color: ${e=>e.theme.colors.primary.main};
  }
`,jo=n.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(1)};
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
    color: ${e=>e.theme.colors.text.primary};
  }
`,qo=n.div`
  padding: ${e=>e.theme.spacing(3)};
`,Go=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;

  svg {
    font-size: 2.5rem;
    color: ${e=>e.theme.colors.primary.main};
    animation: spin 1.5s linear infinite;
    margin-bottom: ${e=>e.theme.spacing(2)};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h3 {
    margin-bottom: ${e=>e.theme.spacing(2)};
    color: ${e=>e.theme.colors.text.primary};
  }

  p {
    color: ${e=>e.theme.colors.text.secondary};
    max-width: 400px;
  }
`,rt=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;

  svg {
    font-size: 3rem;
    color: ${e=>e.theme.colors.text.secondary};
    margin-bottom: ${e=>e.theme.spacing(2)};
  }

  h3 {
    margin-bottom: ${e=>e.theme.spacing(2)};
    color: ${e=>e.theme.colors.text.primary};
  }

  p {
    color: ${e=>e.theme.colors.text.secondary};
    max-width: 400px;
  }
`,Oo=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
`,Vo=n.div`
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.medium};
  overflow: hidden;
  border: 1px solid ${e=>e.theme.colors.border.main};
`,_o=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing(2)};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.background.hover||e.theme.colors.background.card};
  }
`,Wo=n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.primary};
  font-weight: 500;

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,Yo=n.div`
  color: ${e=>e.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`,Ko=n(P.div)`
  padding: ${e=>e.theme.spacing(2)};
  border-top: 1px solid ${e=>e.theme.colors.border.main};
  background-color: ${e=>e.theme.colors.background.paper};
`,Zo=n.p`
  margin-bottom: ${e=>e.theme.spacing(2)};
`,Qo=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(3)};
`,Xo=n.div`
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  background-color: ${e=>e.confidence>=70?`${e.theme.colors.success}20`:e.confidence>=40?`${e.theme.colors.warning}20`:`${e.theme.colors.status.error}20`};
  border: 1px solid
    ${e=>e.confidence>=70?e.theme.colors.success:e.confidence>=40?e.theme.colors.warning:e.theme.colors.status.error};
  border-radius: ${e=>e.theme.borderRadius.large};
  padding: ${e=>`${e.theme.spacing(.5)} ${e.theme.spacing(2)}`};
  margin-right: ${e=>e.theme.spacing(1)};
  margin-bottom: ${e=>e.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.primary};

  span {
    font-weight: 500;
  }
`,Jo=({isOpen:e,onClose:a,patientId:c})=>{const[i,u]=d.useState(!0),[v,x]=d.useState([]),[k,$]=d.useState({}),[R,l]=d.useState(null);d.useEffect(()=>{e&&c&&(async()=>{try{u(!0);const w=await L.getAIDiagnosticHistory(c);x(w),u(!1);const T={};w.forEach(S=>{T[S._id]=!1}),$(T)}catch(w){console.error("Error fetching AI diagnostic history:",w),l("Failed to load diagnostic history"),u(!1)}})()},[e,c]);const D=b=>{$(w=>({...w,[b]:!w[b]}))},C=b=>new Date(b).toLocaleString("en-US",{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),A={hidden:{opacity:0},visible:{opacity:1}},N={hidden:{opacity:0,y:50},visible:{opacity:1,y:0,transition:{delay:.2}}};return e?t(ze,{children:t(Eo,{initial:"hidden",animate:"visible",exit:"hidden",variants:A,onClick:b=>b.target===b.currentTarget&&a(),children:o(Bo,{variants:N,children:[o(Ho,{children:[o(Uo,{children:[t(Ke,{}),t("h2",{children:"AI Diagnostic History"})]}),t(jo,{onClick:a,children:t(Ye,{})})]}),t(qo,{children:i?o(Go,{children:[t(Me,{}),t("h3",{children:"Loading Diagnostic History"}),t("p",{children:"Please wait while we fetch the patient's AI diagnostic history."})]}):R?o(rt,{children:[t(Ye,{}),t("h3",{children:"Error"}),t("p",{children:R})]}):v.length===0?o(rt,{children:[t(Fe,{}),t("h3",{children:"No Diagnostic History"}),t("p",{children:"No AI diagnostic suggestions have been saved for this patient yet."})]}):t(Oo,{children:v.map(b=>o(Vo,{children:[o(_o,{onClick:()=>D(b._id),children:[o(Wo,{children:[t(kt,{}),C(b.timestamp)]}),t(Yo,{children:k[b._id]?t(St,{}):t(Lt,{})})]}),t(ze,{children:k[b._id]&&o(Ko,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.3},children:[t(Zo,{children:b.diagnosisData.summary}),t("h4",{children:"Primary Diagnoses"}),t(Qo,{children:b.diagnosisData.diagnoses.map(w=>o(Xo,{confidence:w.confidence,children:[t("span",{children:w.name})," -"," ",w.confidence,"% confidence"]},w.id))})]})})]},b._id))})})]})})}):null},er=n(P.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${e=>e.theme.spacing(2)};
`,tr=n(P.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.large};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: ${e=>e.theme.shadows.large};
`,or=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${e=>e.theme.spacing(2)}
    ${e=>e.theme.spacing(3)};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
`,rr=n.h2`
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,nr=n.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${e=>e.theme.colors.text.secondary};
  transition: color 0.2s;

  &:hover {
    color: ${e=>e.theme.colors.text.primary};
  }
`,ir=n.div`
  display: flex;
  flex-direction: column;
  padding: ${e=>e.theme.spacing(0)};
  overflow: hidden;
  flex: 1;
`,ar=n.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`,sr=n.div`
  flex: 2;
  border-right: 1px solid ${e=>e.theme.colors.border.main};
  overflow-y: auto;
  max-height: 70vh;
  padding: ${e=>e.theme.spacing(2)};
`,cr=n.div`
  flex: 1;
  padding: ${e=>e.theme.spacing(2)};
  overflow-y: auto;
  max-height: 70vh;
  background-color: ${e=>e.theme.colors.background.default};
`,lr=n.div`
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(2)};
  border: 1px solid ${e=>e.theme.colors.border.main};

  svg {
    color: ${e=>e.theme.colors.text.secondary};
    margin-right: ${e=>e.theme.spacing(1)};
  }

  input {
    border: none;
    background: none;
    flex: 1;
    outline: none;
    font-size: 1rem;
    color: ${e=>e.theme.colors.text.primary};
  }
`,dr=n.div`
  display: flex;
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
  margin-bottom: ${e=>e.theme.spacing(2)};
  overflow-x: auto;
`,Ge=n.button`
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${e=>e.$active?e.theme.colors.primary.main:"transparent"};
  color: ${e=>e.$active?e.theme.colors.primary.main:e.theme.colors.text.secondary};
  font-weight: ${e=>e.$active?600:400};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: ${e=>e.theme.colors.primary.main};
  }
`,mr=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${e=>e.theme.spacing(2)};
`,hr=n.div`
  background-color: ${e=>e.theme.colors.background.paper};
  border: 1px solid
    ${e=>e.$selected?e.theme.colors.primary.main:e.theme.colors.border.main};
  box-shadow: ${e=>e.$selected?`0 0 0 2px ${e.theme.colors.primary.main}30`:e.theme.shadows.small};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(2)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.theme.colors.primary.main};
    transform: translateY(-2px);
  }
`,gr=n.div`
  display: flex;
  gap: ${e=>e.theme.spacing(1)};
  margin-bottom: ${e=>e.theme.spacing(1)};
`,ur=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${e=>e.theme.borderRadius.medium};
  background-color: ${e=>`${e.theme.colors.primary.main}15`};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,pr=n.div`
  flex: 1;
`,yr=n.h4`
  margin: 0;
  font-size: 1rem;
  margin-bottom: 2px;
`,fr=n.div`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.text.secondary};
`,Oe=n.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-top: ${e=>e.theme.spacing(1)};

  span:first-child {
    color: ${e=>e.theme.colors.text.secondary};
  }

  span:last-child {
    font-weight: 500;
  }
`,br=n.div`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 4px;

  &.high {
    background-color: ${e=>`${e.theme.colors.status.success}20`};
    color: ${e=>e.theme.colors.status.success};
  }

  &.medium {
    background-color: ${e=>`${e.theme.colors.status.warning}20`};
    color: ${e=>e.theme.colors.status.warning};
  }

  &.low {
    background-color: ${e=>`${e.theme.colors.status.error}20`};
    color: ${e=>e.theme.colors.status.error};
  }
`,$r=n.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,ie=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(1)};
`,ae=n.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${e=>e.theme.colors.text.secondary};
`,Ve=n.input`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border.main};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>`${e.theme.colors.primary.main}30`};
  }
`,vr=n.textarea`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border.main};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.95rem;
  min-height: 80px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>`${e.theme.colors.primary.main}30`};
  }
`,xr=n.select`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border.main};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>`${e.theme.colors.primary.main}30`};
  }
`,nt=n.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.text.secondary};
`,wr=n.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing(4)};

  svg {
    animation: spin 1s linear infinite;
    font-size: 1.5rem;
    color: ${e=>e.theme.colors.primary.main};
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,kr=n.div`
  display: flex;
  justify-content: flex-end;
  padding: ${e=>e.theme.spacing(2)}
    ${e=>e.theme.spacing(3)};
  gap: ${e=>e.theme.spacing(2)};
  border-top: 1px solid ${e=>e.theme.colors.border.main};
`,it=n.button`
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.primary {
    background-color: ${e=>e.theme.colors.primary.main};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${e=>e.theme.colors.primary.dark};
    }
  }

  &.secondary {
    background-color: ${e=>e.theme.colors.background.paper};
    border: 1px solid ${e=>e.theme.colors.border.main};
    color: ${e=>e.theme.colors.text.primary};

    &:hover:not(:disabled) {
      background-color: ${e=>e.theme.colors.background.default};
    }
  }

  svg {
    font-size: 0.9rem;
  }
`,Sr=({isOpen:e,onClose:a,patientId:c,patientName:i,doctorId:u,doctorName:v})=>{const[x,k]=d.useState([]),[$,R]=d.useState([]),[l,D]=d.useState(!1),[C,A]=d.useState(null),[N,b]=d.useState(""),[w,T]=d.useState("all"),[S,E]=d.useState(null),[p,z]=d.useState({dosage:"",frequency:"",duration:"",instructions:"",quantity:1}),[M,W]=d.useState(!1);d.useEffect(()=>{e&&(async()=>{try{D(!0),A(null);const f=await L.getMedications();k(f),R(f)}catch(f){console.error("Error fetching medications:",f),A("Failed to load medications. Please try again.")}finally{D(!1)}})()},[e]),d.useEffect(()=>{m()},[N,w,x]);const m=()=>{let h=[...x];if(w==="low-stock"?h=h.filter(f=>f.stockStatus==="low"):w!=="all"&&(h=h.filter(f=>f.category.toLowerCase()===w)),N.trim()){const f=N.toLowerCase();h=h.filter(H=>{var te;return H.name.toLowerCase().includes(f)||H.category.toLowerCase().includes(f)||((te=H.manufacturer)==null?void 0:te.toLowerCase().includes(f))})}R(h)},y=h=>{E(h),z({...p,dosage:h.dosage||""})},I=h=>{const{name:f,value:H}=h.target;z({...p,[f]:H})},X=async()=>{if(S)try{W(!0),A(null);const h={medicine:S.name,medicationId:S.id,category:S.category,...p,date:new Date().toISOString(),doctor:v,doctorId:u};await L.addPrescriptionToPatient(c,h),a(!0)}catch(h){console.error("Error adding prescription:",h);const f=h.message||"Failed to add prescription. Please try again.";A(f),W(!1)}},B=h=>{switch(h){case"high":return"In Stock";case"medium":return"Limited Stock";case"low":return"Low Stock";default:return"Unknown"}},ee=()=>{const h=Array.from(new Set(x.map(f=>f.category.toLowerCase())));return o(dr,{children:[t(Ge,{$active:w==="all",onClick:()=>T("all"),children:"All Medications"}),t(Ge,{$active:w==="low-stock",onClick:()=>T("low-stock"),children:"Low Stock"}),h.slice(0,5).map(f=>t(Ge,{$active:w===f,onClick:()=>T(f),children:f.charAt(0).toUpperCase()+f.slice(1)},f))]})};return e?t(ze,{children:t(er,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:h=>{h.target===h.currentTarget&&a()},children:o(tr,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},transition:{type:"spring",damping:20},children:[o(or,{children:[o(rr,{children:[t(pe,{})," Prescribe Medication for ",i]}),t(nr,{onClick:a,children:"×"})]}),o(ir,{children:[o(lr,{children:[t(zt,{}),t("input",{type:"text",placeholder:"Search medications...",value:N,onChange:h=>b(h.target.value)})]}),o(ar,{children:[o(sr,{children:[ee(),l?t(wr,{children:t(Me,{})}):C?t(nt,{children:C}):$.length===0?t(nt,{children:"No medications found. Try adjusting your filters."}):t(mr,{children:$.map(h=>o(hr,{$selected:(S==null?void 0:S.id)===h.id,onClick:()=>y(h),children:[o(gr,{children:[t(ur,{children:t(Et,{})}),o(pr,{children:[t(yr,{children:h.name}),t(fr,{children:h.category})]})]}),o(Oe,{children:[t("span",{children:"Dosage:"}),t("span",{children:h.dosage})]}),o(Oe,{children:[t("span",{children:"Form:"}),t("span",{children:h.form})]}),o(Oe,{children:[t("span",{children:"Stock:"}),o("span",{children:[h.stock," units",t(br,{className:h.stockStatus,children:B(h.stockStatus)})]})]})]},h.id))})]}),o(cr,{children:[t("h3",{children:"Prescription Details"}),S?o($r,{onSubmit:h=>{h.preventDefault(),X()},children:[o(ie,{children:[t(ae,{children:"Selected Medication"}),o("div",{style:{fontWeight:500},children:[S.name," (",S.dosage,")"]})]}),o(ie,{children:[t(ae,{htmlFor:"dosage",children:"Dosage Instructions*"}),t(Ve,{id:"dosage",name:"dosage",value:p.dosage,onChange:I,required:!0,placeholder:"e.g., 2 tablets"})]}),o(ie,{children:[t(ae,{htmlFor:"frequency",children:"Frequency*"}),o(xr,{id:"frequency",name:"frequency",value:p.frequency,onChange:I,required:!0,children:[t("option",{value:"",children:"Select frequency"}),t("option",{value:"Once daily",children:"Once daily"}),t("option",{value:"Twice daily",children:"Twice daily"}),t("option",{value:"Three times daily",children:"Three times daily"}),t("option",{value:"Four times daily",children:"Four times daily"}),t("option",{value:"Every 4 hours",children:"Every 4 hours"}),t("option",{value:"Every 6 hours",children:"Every 6 hours"}),t("option",{value:"Every 8 hours",children:"Every 8 hours"}),t("option",{value:"Every 12 hours",children:"Every 12 hours"}),t("option",{value:"As needed",children:"As needed"}),t("option",{value:"Weekly",children:"Weekly"})]})]}),o(ie,{children:[t(ae,{htmlFor:"duration",children:"Duration*"}),t(Ve,{id:"duration",name:"duration",value:p.duration,onChange:I,required:!0,placeholder:"e.g., 7 days"})]}),o(ie,{children:[t(ae,{htmlFor:"quantity",children:"Quantity"}),t(Ve,{id:"quantity",name:"quantity",type:"number",min:"1",value:p.quantity,onChange:I})]}),o(ie,{children:[t(ae,{htmlFor:"instructions",children:"Additional Instructions"}),t(vr,{id:"instructions",name:"instructions",value:p.instructions,onChange:I,placeholder:"Any special instructions for taking this medication"})]}),C&&t("div",{style:{color:"red",padding:"8px",backgroundColor:"#fee",borderRadius:"4px",fontSize:"0.9rem"},children:C})]}):t("div",{style:{padding:"20px 0",color:"#666",textAlign:"center"},children:"Please select a medication from the list"})]})]})]}),o(kr,{children:[t(it,{className:"secondary",onClick:a,children:"Cancel"}),t(it,{className:"primary",onClick:X,disabled:!S||!p.dosage||!p.frequency||!p.duration||M,children:M?o(F,{children:[t(Me,{className:"spin"})," Prescribing..."]}):o(F,{children:[t(pe,{})," Prescribe Medication"]})})]})]})})}):null},Cr=n(P.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  overflow: hidden;
  margin-bottom: ${e=>e.theme.spacing(3)};
  border: 1px solid ${e=>e.theme.colors.border.main};
`,Rr=n.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.default};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
  cursor: pointer;
`,Ar=n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  font-weight: 600;
  color: ${e=>e.theme.colors.text.primary};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,Tr=n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,Pr=n.div`
  padding: ${e=>e.theme.spacing(3)};
  display: ${e=>e.$isExpanded?"block":"none"};
`,Dr=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,Te=n.div`
  background-color: ${e=>e.theme.colors.background.default};
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
`,se=n.div`
  font-weight: 600;
  margin-bottom: ${e=>e.theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.primary};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,Y=n.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(.5)} 0;
  border-bottom: 1px dotted ${e=>e.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }
`,K=n.span`
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.9rem;
`,Z=n.span`
  color: ${e=>e.theme.colors.text.primary};
  font-weight: ${e=>e.$abnormal?"600":"normal"};

  ${e=>e.$abnormal&&`
    color: ${e.theme.colors.status.error};
  `}
`,Nr=n.div`
  background-color: ${e=>e.$highlighted?`${e.theme.colors.primary.main}10`:e.theme.colors.background.default};
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  margin-bottom: ${e=>e.theme.spacing(3)};
  border-left: 3px solid ${e=>e.theme.colors.primary.main};
`,Ir=n.div`
  margin-top: ${e=>e.theme.spacing(3)};
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.small};
  white-space: pre-line;
`,Mr=n.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(3)};
`,at=n.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>`${e.theme.spacing(1)} ${e.theme.spacing(2)}`};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.default:e.theme.colors.primary.main};
  color: ${e=>e.variant==="secondary"?e.theme.colors.text.primary:"white"};
  border: 1px solid
    ${e=>e.variant==="secondary"?e.theme.colors.border.main:e.theme.colors.primary.main};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.paper:e.theme.colors.primary.dark};
  }
`,_e=n.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: ${e=>e.theme.spacing(1)};
  margin: ${e=>e.theme.spacing(1)} 0;
  color: ${e=>e.$status==="normal"?e.theme.colors.success:e.$status==="warning"?e.theme.colors.warning:e.$status==="alert"?e.theme.colors.status.error:e.theme.colors.text.secondary};
`,Fr=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),Lr=({report:e})=>{var u,v;const[a,c]=d.useState(!1);if(!e)return null;const i=()=>{if(!e.vitalSigns)return null;const x=($,R)=>{if($==="bloodPressure"){const[l,D]=R.split("/").map(Number);return l>=140||D>=90?"alert":l>=120||D>=80?"warning":"normal"}if($==="heartRate"){const l=Number(R);return l>100||l<60?"warning":l>120||l<50?"alert":"normal"}if($==="temperature"){const l=Number(R);return l>99.5||l<97?"warning":l>100.4||l<96?"alert":"normal"}if($==="bloodGlucose"){const l=Number(R);return l>125||l<70?"warning":l>180||l<55?"alert":"normal"}return"normal"},k=$=>$==="normal"?t(jt,{}):$==="warning"?t(Ie,{}):$==="alert"?t(Ie,{}):null;return o(Te,{children:[o(se,{children:[t(At,{})," Vital Signs"]}),e.vitalSigns.bloodPressure&&o(F,{children:[o(Y,{children:[t(K,{children:"Blood Pressure"}),t(Z,{children:e.vitalSigns.bloodPressure})]}),o(_e,{$status:x("bloodPressure",e.vitalSigns.bloodPressure),children:[k(x("bloodPressure",e.vitalSigns.bloodPressure)),x("bloodPressure",e.vitalSigns.bloodPressure)==="normal"?"Normal":x("bloodPressure",e.vitalSigns.bloodPressure)==="warning"?"Elevated":"Hypertension"]})]}),e.vitalSigns.heartRate&&o(F,{children:[o(Y,{children:[t(K,{children:"Heart Rate"}),o(Z,{children:[e.vitalSigns.heartRate," bpm"]})]}),o(_e,{$status:x("heartRate",e.vitalSigns.heartRate),children:[k(x("heartRate",e.vitalSigns.heartRate)),x("heartRate",e.vitalSigns.heartRate)==="normal"?"Normal":"Abnormal"]})]}),e.vitalSigns.temperature&&o(Y,{children:[t(K,{children:"Temperature"}),o(Z,{children:[e.vitalSigns.temperature,"°F"]})]}),e.vitalSigns.respiratoryRate&&o(Y,{children:[t(K,{children:"Respiratory Rate"}),o(Z,{children:[e.vitalSigns.respiratoryRate," bpm"]})]}),e.vitalSigns.oxygenSaturation&&o(Y,{children:[t(K,{children:"Oxygen Saturation"}),t(Z,{children:e.vitalSigns.oxygenSaturation})]}),e.vitalSigns.bloodGlucose&&o(F,{children:[o(Y,{children:[t(K,{children:"Blood Glucose"}),o(Z,{children:[e.vitalSigns.bloodGlucose," mg/dL"]})]}),o(_e,{$status:x("bloodGlucose",e.vitalSigns.bloodGlucose),children:[k(x("bloodGlucose",e.vitalSigns.bloodGlucose)),x("bloodGlucose",e.vitalSigns.bloodGlucose)==="normal"?"Normal":x("bloodGlucose",e.vitalSigns.bloodGlucose)==="warning"?"Elevated":"High"]})]})]})};return o(Cr,{children:[o(Rr,{onClick:()=>c(!a),children:[o(Ar,{children:[t(Le,{})," ",e.recordType||"Medical Report"," -"," ",e.diagnosis]}),o("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[o(Tr,{children:[t(kt,{})," ",Fr(e.date)]}),a?t(Bt,{}):t(St,{})]})]}),o(Pr,{$isExpanded:a,children:[o(Dr,{children:[o(Te,{children:[o(se,{children:[t(Ct,{})," Provider Information"]}),o(Y,{children:[t(K,{children:"Doctor"}),t(Z,{children:((u=e.doctorId)==null?void 0:u.name)||e.doctorId||"Unknown"})]}),o(Y,{children:[t(K,{children:"Department"}),t(Z,{children:((v=e.departmentId)==null?void 0:v.name)||e.departmentId||"Unknown"})]}),o(Y,{children:[t(K,{children:"Consultation ID"}),t(Z,{children:e.consultationId||"N/A"})]})]}),i(),o(Te,{children:[o(se,{children:[t(Ne,{})," Symptoms & Complaints"]}),e.symptoms&&e.symptoms.length>0?e.symptoms.map((x,k)=>o("div",{style:{padding:"3px 0"},children:[t(wt,{style:{fontSize:"0.8rem",marginRight:"8px"}})," ",x]},k)):t("div",{children:"No symptoms recorded"})]})]}),o(Nr,{$highlighted:!0,children:[o(se,{children:[t(Rt,{})," Diagnosis"]}),t("div",{style:{fontSize:"1.1rem",fontWeight:"500",margin:"8px 0"},children:e.diagnosis||"No diagnosis recorded"})]}),o(Te,{children:[o(se,{children:[t(Ht,{})," Treatment Plan"]}),t("div",{style:{margin:"8px 0"},children:e.treatmentPlan||"No treatment plan recorded"}),e.followUp&&o("div",{style:{marginTop:"12px",fontStyle:"italic"},children:["Follow-up: ",e.followUp]})]}),e.notes&&o(Ir,{children:[t(se,{children:"Clinician Notes"}),t("div",{style:{margin:"8px 0"},children:e.notes})]}),o(Mr,{children:[o(at,{variant:"secondary",children:[t(Ze,{})," Print"]}),o(at,{children:[t(Ut,{})," Download PDF"]})]})]})]})},zr=(e=[])=>!e||!Array.isArray(e)?(console.warn("Invalid lab reports data:",e),[]):e.map(a=>{var c,i,u,v;return{id:a._id||a.id,testName:a.testName||"Unknown Test",date:a.date||a.createdAt||new Date().toISOString(),status:a.status||"completed",doctor:((c=a.doctor)==null?void 0:c.name)||a.doctorName||"Unknown Doctor",patient:((i=a.patient)==null?void 0:i.name)||a.patientName||"Unknown Patient",results:a.results||[],summary:a.summary||"",department:((u=a.department)==null?void 0:u.name)||a.departmentName||"General",type:a.type||"Lab Test",technician:((v=a.technician)==null?void 0:v.name)||a.technicianName||"Unknown Technician",reportUrl:a.reportUrl||"",normalRanges:a.normalRanges||{}}}),Er=(e=[])=>!e||!Array.isArray(e)?(console.warn("Invalid medical records data:",e),[]):e.map(a=>{var c,i,u;return{id:a._id||a.id,type:a.type||"Check-up",date:a.date||a.createdAt||new Date().toISOString(),doctor:((c=a.doctor)==null?void 0:c.name)||a.doctorName||"Unknown Doctor",patient:((i=a.patient)==null?void 0:i.name)||a.patientName||"Unknown Patient",diagnosis:a.diagnosis||[],symptoms:a.symptoms||[],notes:a.notes||"",treatment:a.treatment||"",medications:a.medications||[],followUp:a.followUp||null,department:((u=a.department)==null?void 0:u.name)||a.departmentName||"General",attachments:a.attachments||[]}}),st=n.div`
  display: flex;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
`,ct=n(P.button)`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.9rem;
  cursor: pointer;
  padding: ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  margin-right: ${e=>e.theme.spacing(2)};

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
    color: ${e=>e.theme.colors.primary.main};
  }
`,lt=n.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
  margin: 0;
  flex: 1;
`,Br=n.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
`,Hr=n.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: ${e=>e.theme.spacing(4)};

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,Ur=n(P.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  padding: ${e=>e.theme.spacing(3)};
  height: fit-content;
`,jr=n.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${e=>e.theme.spacing(3)};
`,qr=n.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${e=>e.theme.colors.background.default};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 3rem;
`,Gr=n.h2`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing(2)};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 1.4rem;
`,Or=n.div`
  margin-bottom: ${e=>e.theme.spacing(3)};
  text-align: center;
`,dt=n.p`
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(1)};
  font-size: 0.95rem;
`,Pe=n.hr`
  border: none;
  border-top: 1px solid ${e=>e.theme.colors.border.main};
  margin: ${e=>e.theme.spacing(3)} 0;
`,We=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,O=n.div`
  display: flex;
  flex-direction: column;
`,V=n.span`
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(.5)};
`,_=n.span`
  color: ${e=>e.theme.colors.text.primary};
  font-weight: 500;
`,Vr=n.div`
  width: 100%;
  margin-bottom: ${e=>e.theme.spacing(4)};
`,_r=n.div`
  display: flex;
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`,Wr=n.button`
  padding: ${e=>e.theme.spacing(2)}
    ${e=>e.theme.spacing(4)};
  background: none;
  border: none;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: ${e=>e.$isActive?"600":"400"};
  color: ${e=>e.$isActive?e.theme.colors.primary.main:e.theme.colors.text.secondary};
  border-bottom: 3px solid
    ${e=>e.$isActive?e.theme.colors.primary.main:"transparent"};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    color: ${e=>e.theme.colors.primary.main};
    background-color: ${e=>e.theme.colors.background.hover};
  }

  &:focus {
    outline: none;
    background-color: ${e=>e.theme.colors.background.hover};
  }

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
    vertical-align: middle;
  }
`,Yr=n(P.div)`
  background-color: ${e=>e.theme.colors.background.default};
  padding-top: ${e=>e.theme.spacing(3)};
`,oe=n(P.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  padding: ${e=>e.theme.spacing(3)};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,Q=n.h3`
  color: ${e=>e.theme.colors.text.primary};
  font-size: 1.1rem;
  margin-bottom: ${e=>e.theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,mt=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,ht=n.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.theme.colors.background.default};
  gap: ${e=>e.theme.spacing(2)};
`,gt=n.div`
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border-radius: ${e=>e.theme.borderRadius.small};
  padding: ${e=>e.theme.spacing(1)};
  min-width: 60px;
  text-align: center;
`,ut=n.div`
  font-weight: bold;
  font-size: 1.2rem;
`,pt=n.div`
  font-size: 0.8rem;
`,yt=n.div`
  flex: 1;
`,ft=n.div`
  font-weight: 500;
  color: ${e=>e.theme.colors.text.primary};
`,bt=n.div`
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.text.secondary};
`,$t=n.div`
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${e=>{switch(e.$status){case"scheduled":return e.theme.colors.status.infoLight;case"completed":return e.theme.colors.status.successLight;case"cancelled":return e.theme.colors.status.errorLight;default:return e.theme.colors.status.warningLight}}};
  color: ${e=>{switch(e.$status){case"scheduled":return e.theme.colors.status.info;case"completed":return e.theme.colors.status.success;case"cancelled":return e.theme.colors.status.error;default:return e.theme.colors.status.warning}}};
`,vt=n.div`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  padding: ${e=>e.theme.spacing(3)};
  margin-bottom: ${e=>e.theme.spacing(3)};
  border-left: 4px solid ${e=>e.theme.colors.primary.main};
`,Kr=n.div`
  display: flex;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(2)};

  svg {
    color: ${e=>e.theme.colors.primary.main};
    font-size: 1.5rem;
    margin-right: ${e=>e.theme.spacing(1)};
  }

  h3 {
    margin: 0;
    color: ${e=>e.theme.colors.text.primary};
  }
`,Zr=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,De=n.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }

  span {
    color: ${e=>e.theme.colors.text.secondary};
  }
`,Qr=({children:e,activeTab:a,setActiveTab:c})=>{const i=_t.Children.toArray(e).filter(u=>u.type===ce);return o(Vr,{children:[t(_r,{children:i.map((u,v)=>o(Wr,{$isActive:a===(u.props.id||v),onClick:()=>c(u.props.id||v),children:[u.props.icon&&t("span",{className:"tab-icon",children:u.props.icon}),u.props.label]},u.props.id||v))}),t(Yr,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.3},children:i.find(u=>u.props.id===a||i.indexOf(u)===a)})]})},ce=({children:e,id:a,label:c,icon:i})=>t("div",{role:"tabpanel",id:`tabpanel-${a}`,children:e}),ln=()=>{var fe,be,le,$e,ve,xe,de,me,he;const{id:e}=Ot(),a=Vt(),{user:c}=xt(),[i,u]=d.useState(null),[v,x]=d.useState([]),[k,$]=d.useState([]),[R,l]=d.useState(!0),[D,C]=d.useState("appointments"),[A,N]=d.useState(!1),[b,w]=d.useState(null),[T,S]=d.useState(!1),[E,p]=d.useState(!1),[z,M]=d.useState(!1),[W,m]=d.useState(!1),[y,I]=d.useState(null),[X,B]=d.useState(!1),ee=async()=>{try{l(!0),console.log("Fetching patient with ID:",e);try{const r=await L.getPatientById(e);if(console.log("Fetched patient data:",r),r){r.birthDate&&(r.age=h(r.birthDate)),r.medicalRecords=r.medicalRecords||[],r.prescriptions=r.prescriptions||[],r.allergies=r.allergies||[],r.chronicConditions=r.chronicConditions||[],u(r);try{B(!0);const s=await L.getPatientSummary(e);s?I(s):console.log("No patient summary data returned"),B(!1)}catch(s){console.error("Error fetching patient summary:",s),B(!1)}}else throw new Error("Patient not found")}catch(r){console.error("Error fetching patient:",r),l(!1);return}try{const r=await L.getAppointments({patient:e});if(console.log("Fetched appointments:",r),Array.isArray(r)){const s=r.map(g=>{var U,j;return{id:g._id||`app-${Math.random()}`,date:g.appointmentDate||new Date().toISOString(),time:g.startTime||"Not specified",reason:g.reason||"Consultation",doctor:((U=g.doctor)==null?void 0:U.name)||"Unknown Doctor",department:((j=g.department)==null?void 0:j.name)||"General Medicine",status:g.status||"scheduled"}});x(s)}else console.error("Appointments response is not an array:",r),x([])}catch(r){console.error("Error fetching appointments:",r),x([])}try{const r=await Er(e);console.log("Fetched medical records:",r),Array.isArray(r)?u(s=>s?{...s,medicalRecords:r}:null):(console.error("Medical records response is not an array:",r),u(s=>s?{...s,medicalRecords:[]}:null))}catch(r){console.error("Error fetching medical records:",r),u(s=>s?{...s,medicalRecords:[]}:null)}try{const r=await zr(e);if(console.log("Fetched lab reports:",r),Array.isArray(r)){const s=r.map(g=>{let U=g.results;return typeof g.results=="object"&&g.results!==null&&(!g.components||g.components.length===0)&&typeof g.interpretation=="string"&&g.interpretation&&(U=g.interpretation),{...g,id:g.id||g._id||`report-${Math.random()}`,testType:g.testType||g.type||"Blood Test",date:g.date||g.testDate||new Date().toISOString(),patientId:g.patientId||e,doctorId:g.doctorId||(c==null?void 0:c._id),status:g.status||"completed",components:g.components||[],results:U,hasAbnormalResults:g.hasAbnormalResults===!0||Array.isArray(g.components)&&g.components.some(j=>j.flagged===!0)||!1}});$(s)}else console.error("Lab reports response is not an array:",r),$([])}catch(r){console.error("Error fetching lab reports:",r),$([])}l(!1)}catch(r){console.error("Error fetching data:",r),l(!1)}};d.useEffect(()=>{ee()},[e,c==null?void 0:c._id]);const h=r=>{const s=new Date(r),g=new Date;let U=g.getFullYear()-s.getFullYear();const j=g.getMonth()-s.getMonth();return(j<0||j===0&&g.getDate()<s.getDate())&&U--,U},f=r=>{if(!r)return"Not available";try{const s=new Date(r);return isNaN(s.getTime())?"Invalid date":s.toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}catch(s){return console.error("Error formatting date:",s),"Date error"}},H=r=>{if(!r)return"N/A";try{const s=new Date(r);return isNaN(s.getTime())?"N/A":s.toLocaleDateString("en-US",{month:"short"})}catch(s){return console.error("Error getting month abbreviation:",s),"N/A"}},te=r=>{if(!r)return"N/A";try{const s=new Date(r);return isNaN(s.getTime())?"N/A":s.getDate()}catch(s){return console.error("Error getting day:",s),"N/A"}},ye=r=>{w(r),S(!0)},Ee=()=>{console.log("Opening prescription modal"),m(!0)},Be=r=>{console.log("Closing prescription modal, success:",r),m(!1),r&&ee()};return R?t(He,{children:t(Je,{type:"loading",height:"400px"})}):i?(i.medicalRecords,o(He,{children:[o(st,{children:[o(ct,{onClick:()=>a(-1),whileHover:{x:-5},whileTap:{scale:.95},children:[t(Xe,{})," Back to Patients"]}),t(lt,{children:`${i.firstName||""} ${i.lastName||""}`}),o(Br,{children:[t(q,{variant:"primary",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>{console.log("Debug: Opening prescription modal directly"),console.log("Current user:",c),m(!0)},style:{marginRight:"8px",background:"orange"},children:"Add Prescription"}),(c==null?void 0:c.role)==="doctor"&&o(F,{children:[o(q,{variant:"primary",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>p(!0),style:{backgroundColor:"#10B981",marginRight:"8px"},children:[t(Fe,{})," Smart Diagnosis"]}),o(q,{variant:"secondary",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>M(!0),style:{marginRight:"8px"},children:[t(Ke,{})," AI History"]})]}),o(q,{variant:"secondary",whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(Ze,{})," Print"]}),o(q,{whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(qt,{})," Edit"]}),o(q,{variant:"danger",whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(Gt,{})," Delete"]})]})]}),y?o(vt,{children:[o(Kr,{children:[t(Rt,{}),t("h3",{children:"Patient Summary"})]}),o(Zr,{children:[y.diagnosisSummary&&o(De,{children:[t(Fe,{}),t("span",{children:y.diagnosisSummary})]}),y.vitalTrends&&y.vitalTrends.bloodPressure&&y.vitalTrends.bloodPressure.length>0&&o(De,{children:[t(At,{}),o("span",{children:["Latest BP:"," ",y.vitalTrends.bloodPressure[y.vitalTrends.bloodPressure.length-1].systolic,"/",y.vitalTrends.bloodPressure[y.vitalTrends.bloodPressure.length-1].diastolic," ","mmHg"]})]}),o(De,{children:[t(ge,{}),o("span",{children:[((fe=y==null?void 0:y.appointments)==null?void 0:fe.filter(r=>r.status==="upcoming"||r.status==="confirmed").length)||0," ","upcoming appointments"]})]}),o(De,{children:[t(re,{}),o("span",{children:[((be=y==null?void 0:y.labResults)==null?void 0:be.length)||0," lab reports available,",((le=y==null?void 0:y.labResults)==null?void 0:le.reduce((r,s)=>r+(s.abnormalFindings||0),0))||0," ","abnormal findings"]})]})]})]}):X?t(vt,{children:"Loading patient summary..."}):null,o(Hr,{children:[t(P.div,{variants:J,children:o(Ur,{children:[t(jr,{children:t(qr,{children:t(Ct,{})})}),t(Gr,{children:`${i.firstName||""} ${i.lastName||""}`}),o(Or,{children:[t(dt,{children:`${i.age||"Unknown"} years | ${i.gender||"Unknown"}`}),t(dt,{children:`Blood Group: ${i.bloodGroup||"Unknown"}`})]}),o(q,{style:{width:"100%",marginBottom:"10px"},whileHover:{scale:1.02},whileTap:{scale:.98},children:[t(ge,{})," Schedule Appointment"]}),(c==null?void 0:c.role)==="doctor"&&o(q,{style:{width:"100%"},variant:"secondary",whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>N(!0),children:[t(re,{})," Request Lab Test"]}),t(Pe,{}),o(We,{children:[o(O,{children:[t(V,{children:"Email"}),t(_,{children:i.email||"Not provided"})]}),o(O,{children:[t(V,{children:"Phone"}),t(_,{children:i.contactNumber||"Not provided"})]}),o(O,{children:[t(V,{children:"Address"}),t(_,{children:i.address?`${i.address.street||""}, ${i.address.city||""}, ${i.address.state||""} ${i.address.zip||""}`:"Address not provided"})]}),o(O,{children:[t(V,{children:"Birth Date"}),t(_,{children:i.birthDate?f(i.birthDate):"Not provided"})]})]}),t(Pe,{}),t(Q,{children:"Emergency Contact"}),o(We,{children:[o(O,{children:[t(V,{children:"Name"}),t(_,{children:(($e=i.emergencyContact)==null?void 0:$e.name)||"Not provided"})]}),o(O,{children:[t(V,{children:"Relationship"}),t(_,{children:((ve=i.emergencyContact)==null?void 0:ve.relationship)||"Not provided"})]}),o(O,{children:[t(V,{children:"Phone"}),t(_,{children:((xe=i.emergencyContact)==null?void 0:xe.contactNumber)||"Not provided"})]})]}),t(Pe,{}),t(Q,{children:"Insurance Information"}),o(We,{children:[o(O,{children:[t(V,{children:"Provider"}),t(_,{children:((de=i.insurance)==null?void 0:de.provider)||"Not provided"})]}),o(O,{children:[t(V,{children:"Policy Number"}),t(_,{children:((me=i.insurance)==null?void 0:me.policyNumber)||"Not provided"})]}),o(O,{children:[t(V,{children:"Expiry Date"}),t(_,{children:(he=i.insurance)!=null&&he.expiryDate?f(i.insurance.expiryDate):"Not provided"})]})]})]})}),t(P.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},style:{width:"100%"},children:o(Qr,{activeTab:D,setActiveTab:C,children:[o(ce,{id:"appointments",label:"Appointments",icon:t(ge,{}),children:[o(oe,{variants:J,children:[o(Q,{children:[t(ge,{})," Upcoming Appointments"]}),o(mt,{children:[v.filter(r=>r.status==="scheduled"||r.status==="pending"||r.status==="confirmed").map(r=>o(ht,{children:[o(gt,{children:[t(ut,{children:te(r.date)}),t(pt,{children:H(r.date)})]}),o(yt,{children:[t(ft,{children:r.reason}),t(bt,{children:`${r.time||"Not specified"} | ${r.doctor||"Not assigned"} | ${r.department||"General"}`})]}),t($t,{$status:r.status||"scheduled",children:r.status?r.status.charAt(0).toUpperCase()+r.status.slice(1):"Scheduled"})]},r.id||`app-${Math.random()}`)),v.filter(r=>r.status==="scheduled"||r.status==="pending"||r.status==="confirmed").length===0&&t("p",{children:"No upcoming appointments"})]})]}),o(oe,{variants:J,children:[o(Q,{children:[t(ge,{})," Past Appointments"]}),o(mt,{children:[v.filter(r=>r.status==="completed"||r.status==="cancelled").map(r=>o(ht,{children:[o(gt,{children:[t(ut,{children:te(r.date)}),t(pt,{children:H(r.date)})]}),o(yt,{children:[t(ft,{children:r.reason}),t(bt,{children:`${r.time||"Not specified"} | ${r.doctor||"Not assigned"} | ${r.department||"General"}`})]}),t($t,{$status:r.status||"completed",children:r.status?r.status.charAt(0).toUpperCase()+r.status.slice(1):"Completed"})]},r.id||`app-${Math.random()}`)),v.filter(r=>r.status==="completed"||r.status==="cancelled").length===0&&t("p",{children:"No past appointments"})]})]})]}),t(ce,{id:"medicalRecords",label:"Medical Records",icon:t(ue,{}),children:o(oe,{variants:J,children:[o(Q,{children:[t(ue,{})," Medical Records"]}),i.medicalRecords&&i.medicalRecords.length>0?i.medicalRecords.map(r=>t(Lr,{report:r},r.id||r._id)):t("div",{style:{padding:"20px 0",textAlign:"center",color:"#666"},children:"No medical records available"})]})}),t(ce,{id:"labReports",label:"Lab Reports",icon:t(re,{}),children:o(oe,{variants:J,children:[o(Q,{children:[t(re,{})," Laboratory Reports"]}),k&&k.length>0?k.map(r=>t(Wt,{report:r,onClick:ye},r.id||r._id)):t("div",{style:{padding:"20px 0",textAlign:"center",color:"#666"},children:"No lab reports available"}),(c==null?void 0:c.role)==="doctor"&&t("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"20px"},children:o(q,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>N(!0),children:[t(re,{})," Request New Lab Test"]})})]})}),t(ce,{id:"prescriptions",label:"Prescriptions",icon:t(pe,{}),children:o(oe,{variants:J,children:[o(Q,{children:[t(pe,{})," Prescriptions"]}),console.log("Current user in prescriptions tab:",c),Array.isArray(i==null?void 0:i.prescriptions)&&i.prescriptions.length>0?i.prescriptions.map(r=>o("div",{style:{marginBottom:"20px"},children:[o("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[t("h4",{style:{margin:0},children:r.medicine||"Unnamed Medication"}),t("span",{style:{fontSize:"0.85rem",color:"#666"},children:r.date?f(r.date):"No date"})]}),o("p",{style:{margin:"5px 0",fontSize:"0.9rem"},children:["Dosage: ",r.dosage||"Not specified"," | Frequency: ",r.frequency||"Not specified"," | Duration: ",r.duration||"Not specified"]}),o("div",{style:{fontSize:"0.85rem",color:"#666"},children:["Prescribed by: ",r.doctor||"Unknown doctor"]}),r.instructions&&o("div",{style:{fontSize:"0.9rem",marginTop:"8px",padding:"8px",backgroundColor:"#f8f9fa",borderRadius:"4px"},children:[t("strong",{children:"Instructions:"})," ",r.instructions]}),t(Pe,{})]},r.id||r._id||`prescription-${Math.random()}`)):t("div",{style:{padding:"20px 0",textAlign:"center",color:"#666"},children:"No prescriptions available"}),console.log("User role for prescription button:",c==null?void 0:c.role),console.log("Is doctor check:",(c==null?void 0:c.role)==="doctor"),(c==null?void 0:c.role)==="doctor"?t("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"20px"},children:o(q,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:Ee,variant:"primary",children:[t(pe,{})," Add Prescription"]})}):t("div",{style:{textAlign:"center",marginTop:"20px",color:"#666"},children:"Only doctors can add prescriptions"})]})}),o(ce,{id:"medicalInfo",label:"Medical Info",icon:t(Le,{}),children:[o(oe,{variants:J,children:[t(Q,{children:"Allergies"}),Array.isArray(i==null?void 0:i.allergies)&&i.allergies.length>0?t("ul",{children:i.allergies.map((r,s)=>t("li",{children:r},s))}):t("p",{children:"No known allergies"})]}),o(oe,{variants:J,children:[t(Q,{children:"Chronic Conditions"}),Array.isArray(i==null?void 0:i.chronicConditions)&&i.chronicConditions.length>0?t("ul",{children:i.chronicConditions.map((r,s)=>t("li",{children:r},s))}):t("p",{children:"No chronic conditions"})]})]})]})})]}),t(co,{isOpen:A,onClose:()=>N(!1),patientId:e,doctorId:c==null?void 0:c._id}),t(Yt,{isOpen:T,onClose:()=>S(!1),report:b}),E&&t(zo,{isOpen:E,onClose:()=>p(!1),patientId:e,onViewHistory:()=>{p(!1),M(!0)}}),t(Jo,{isOpen:z,onClose:()=>M(!1),patientId:e}),t(Sr,{isOpen:W,onClose:Be,patientId:e,patientName:(i==null?void 0:i.name)||"Patient",doctorId:c==null?void 0:c._id,doctorName:(c==null?void 0:c.name)||"Doctor"})]})):t(He,{children:o("div",{children:[o(st,{children:[o(ct,{onClick:()=>a(-1),whileHover:{x:-5},whileTap:{scale:.95},children:[t(Xe,{})," Back to Patients"]}),t(lt,{children:"Patient Not Found"})]}),t(Je,{type:"emptyState",height:"300px"}),t("p",{style:{textAlign:"center"},children:"The requested patient could not be found."})]})})};export{ln as default};
//# sourceMappingURL=PatientDetails-9b6146d3.js.map
