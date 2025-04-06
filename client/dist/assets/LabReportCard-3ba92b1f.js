import{a as n,j as t,Q as ie,D as B,t as K,d as U,Z as X,a5 as Y,p as ae,b as w,H as S,y as V,a2 as oe,_ as re,c as se,W as N}from"./index-c3da158f.js";import{s as i,m as z,A as le,r as ce}from"./vendor-3ba6fd3e.js";const de=i(z.div)`
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
  padding: ${e=>e.theme.spacing(3)};
`,me=i(z.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(4)};
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`,he=i.button`
  position: absolute;
  top: ${e=>e.theme.spacing(2)};
  right: ${e=>e.theme.spacing(2)};
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(1)};
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
    color: ${e=>e.theme.colors.text.primary};
  }
`,ge=i.div`
  margin-bottom: ${e=>e.theme.spacing(4)};
  padding-bottom: ${e=>e.theme.spacing(3)};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
`,ue=i.h2`
  font-size: 1.4rem;
  margin-bottom: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,pe=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${e=>e.theme.spacing(3)};
  margin-bottom: ${e=>e.theme.spacing(4)};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,E=i.div`
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.medium};
`,_=i.div`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,G=i.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${e=>e.theme.colors.text.primary};
`,fe=i.div`
  margin-bottom: ${e=>e.theme.spacing(4)};
`,F=i.div`
  display: flex;
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }

  &:first-child {
    background-color: ${e=>e.theme.colors.background.default};
    font-weight: 600;
  }
`,c=i.div`
  padding: ${e=>e.theme.spacing(2)};
  flex: ${e=>e.flex||"1"};
`,M=i.div`
  margin-bottom: ${e=>e.theme.spacing(4)};
  padding: ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.medium};
`,W=i.div`
  font-weight: 600;
  margin-bottom: ${e=>e.theme.spacing(1)};
`,be=i.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  justify-content: flex-end;
`,Q=i.button`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.default:e.theme.colors.primary.main};
  color: ${e=>e.variant==="secondary"?e.theme.colors.text.primary:"white"};
  border: ${e=>e.variant==="secondary"?`1px solid ${e.theme.colors.border.main}`:"none"};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.paper:e.theme.colors.primary.dark};
  }
`,ye=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),Be=({isOpen:e,onClose:u,report:a})=>{if(!a)return null;const x=ye(a.date||new Date().toISOString()),v=a.results&&Object.keys(a.results).length>0,L=a.components&&a.components.length>0;let p=[];L?p=a.components:v&&typeof a.results=="object"&&(p=Object.entries(a.results).map(([l,f])=>{var k,b;return{name:l,value:f,unit:((k=a.units)==null?void 0:k[l])||"",flagged:((b=a.flaggedResults)==null?void 0:b[l])||!1}}));const R=a.patientName||(a.patient?a.patient.name:"Unknown"),m=a.patientId||(a.patient?a.patient._id:"Not specified");return a.technicianName||a.technician&&a.technician.name,n(le,{children:e&&n(de,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:u,children:t(me,{initial:{y:50,opacity:0},animate:{y:0,opacity:1},exit:{y:50,opacity:0},onClick:l=>l.stopPropagation(),children:[n(he,{onClick:u,children:n(ie,{})}),t(ge,{children:[t(ue,{children:[n(B,{})," ",a.testType||a.reportType||"Laboratory Report"]}),n("div",{style:{color:"#666",fontSize:"0.9rem"},children:x})]}),t(pe,{children:[t(E,{children:[t(_,{children:[n(K,{})," Patient Information"]}),n(G,{children:R}),t("div",{style:{fontSize:"0.9rem",color:"#666",marginTop:"4px"},children:["ID: ",m]})]}),t(E,{children:[t(_,{children:[n(U,{})," Test Details"]}),n(G,{children:a.testType||a.reportType||"Laboratory Test"}),t("div",{style:{fontSize:"0.9rem",color:"#666",marginTop:"4px"},children:["Collected: ",x]})]})]}),t(fe,{children:[t(F,{children:[n(c,{flex:"2",children:"Parameter"}),n(c,{children:"Result"}),n(c,{children:"Reference Range"}),n(c,{children:"Status"})]}),p.length>0?p.map((l,f)=>t(F,{children:[n(c,{flex:"2",children:l.name}),t(c,{children:[l.value," ",l.unit]}),n(c,{children:l.referenceRange||"Not specified"}),n(c,{children:l.flagged?n("span",{style:{color:"#e53935",fontWeight:600},children:"Abnormal"}):n("span",{style:{color:"#4caf50"},children:"Normal"})})]},f)):n(F,{children:n(c,{colSpan:"4",style:{textAlign:"center"},children:typeof a.results=="string"?n("div",{style:{whiteSpace:"pre-wrap",margin:0},dangerouslySetInnerHTML:{__html:a.results}}):"No detailed results available"})})]}),a.interpretation&&t(M,{children:[n(W,{children:"Interpretation"}),n("div",{children:a.interpretation})]}),a.notes&&t(M,{children:[n(W,{children:"Notes"}),n("div",{children:a.notes})]}),t(be,{children:[t(Q,{variant:"secondary",children:[n(X,{})," Print Report"]}),t(Q,{children:[n(Y,{})," Download PDF"]})]})]})})})},$e=i(z.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  overflow: hidden;
  margin-bottom: ${e=>e.theme.spacing(3)};
  border: 1px solid ${e=>e.theme.colors.border.main};
`,xe=i.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.default};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};
  cursor: pointer;
`,ve=i.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  font-weight: 600;
  color: ${e=>e.theme.colors.text.primary};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,Re=i.div`
  display: flex;
  align-items: center;
  padding: ${e=>`${e.theme.spacing(.5)} ${e.theme.spacing(1)}`};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.$abnormal?`${e.theme.colors.status.error}20`:`${e.theme.colors.success}20`};
  color: ${e=>e.$abnormal?e.theme.colors.status.error:e.theme.colors.success};
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: ${e=>e.theme.spacing(2)};
`,ke=i.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,we=i.div`
  padding: ${e=>e.theme.spacing(3)};
  display: ${e=>e.$isExpanded?"block":"none"};
`,Se=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,O=i.div`
  background-color: ${e=>e.theme.colors.background.default};
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  height: fit-content;
`,d=i.div`
  font-weight: 600;
  margin-bottom: ${e=>e.theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.primary};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,Ne=i.div`
  width: 100%;
  border-radius: ${e=>e.theme.borderRadius.small};
  overflow: hidden;
  margin-bottom: ${e=>e.theme.spacing(3)};
  border: 1px solid ${e=>e.theme.colors.border.main};
`,ee=i.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(odd) {
    background-color: ${e=>e.theme.colors.background.default};
  }

  &:first-child {
    background-color: ${e=>e.theme.colors.background.default};
    font-weight: 600;
    color: ${e=>e.theme.colors.text.primary};
  }
`,Te=i(ee)`
  background-color: ${e=>e.theme.colors.primary.main}10 !important;
  font-weight: 600;
  color: ${e=>e.theme.colors.text.primary};
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(2)};
`,g=i.div`
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(2)};
  display: flex;
  align-items: center;

  ${e=>e.$abnormal&&`
    color: ${e.theme.colors.status.error};
    font-weight: 600;
  `}
`,$=i.div`
  margin-top: ${e=>e.theme.spacing(3)};
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.small};
  white-space: pre-line;
`,Le=i.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(3)};
`,Z=i.button`
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
`,Ce=i.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: ${e=>e.theme.spacing(.5)};
  color: ${e=>e.$abnormal?e.theme.colors.status.error:e.theme.colors.success};
`,Ie=i.div`
  background-color: ${e=>`${e.theme.colors.primary.main}10`};
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  margin-bottom: ${e=>e.theme.spacing(3)};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(1)};
`,T=i.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  color: ${e=>e.$abnormal?e.theme.colors.status.error:e.theme.colors.text.primary};
  font-weight: ${e=>e.$abnormal?"600":"normal"};
  padding: ${e=>e.theme.spacing(.5)} 0;

  svg {
    color: ${e=>e.$abnormal?e.theme.colors.status.error:e.theme.colors.primary.main};
  }
`,q=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),P={"White Blood Cells":{min:4.5,max:11,unit:"thousand/μL"},"Red Blood Cells":{min:4.5,max:5.9,unit:"million/μL"},Hemoglobin:{min:13.5,max:17.5,unit:"g/dL"},Hematocrit:{min:41,max:50,unit:"%"},Platelets:{min:150,max:450,unit:"thousand/μL"},Glucose:{min:70,max:99,unit:"mg/dL"},BUN:{min:7,max:20,unit:"mg/dL"},Creatinine:{min:.6,max:1.2,unit:"mg/dL"},Sodium:{min:135,max:145,unit:"mmol/L"},Potassium:{min:3.5,max:5,unit:"mmol/L"},Calcium:{min:8.5,max:10.2,unit:"mg/dL"},Albumin:{min:3.5,max:5,unit:"g/dL"},"Total Bilirubin":{min:.1,max:1.2,unit:"mg/dL"},ALT:{min:7,max:55,unit:"U/L"},AST:{min:8,max:48,unit:"U/L"},"Total Cholesterol":{min:0,max:200,unit:"mg/dL"},"HDL Cholesterol":{min:40,max:60,unit:"mg/dL"},"LDL Cholesterol":{min:0,max:100,unit:"mg/dL"},Triglycerides:{min:0,max:150,unit:"mg/dL"},pH:{min:4.5,max:8,unit:""},"Specific Gravity":{min:1.005,max:1.03,unit:""},"Glucose (Urine)":{min:0,max:0,unit:"mg/dL"},"Protein (Urine)":{min:0,max:0,unit:"mg/dL"},HbA1c:{min:4,max:5.6,unit:"%"}},je=i.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,De=i.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(1.5)};
  border-bottom: 1px solid ${e=>e.theme.colors.border.main};

  &:last-child {
    border-bottom: none;
  }

  &:nth-child(odd) {
    background-color: ${e=>e.theme.colors.background.default};
  }
`,Ae=i.div`
  font-weight: 500;
  color: ${e=>e.theme.colors.text.primary};
`,Fe=i.div`
  font-weight: ${e=>e.$abnormal?"600":"normal"};
  color: ${e=>e.$abnormal?e.theme.colors.status.error:e.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  svg {
    font-size: 14px;
  }
`,Ue=({report:e,onClick:u})=>{const[a,x]=ce.useState(!1),v=e.hasAbnormalResults||!1,L=()=>{x(!a)},p=r=>{r.stopPropagation(),u&&u(e)};if(!e)return null;const R=e.components&&e.components.length>0,m=R?e.components.filter(r=>r.flagged||l(r.name,r.value)):[];function l(r,o){if(typeof o!="string"&&typeof o!="number")return!1;const s=parseFloat(o);if(isNaN(s))return!1;const h=P[r];return h?s<h.min||s>h.max:!1}function f(r){const o=P[r];return o?o.min===0&&o.max===0?`Negative ${o.unit?`(${o.unit})`:""}`:`${o.min}-${o.max} ${o.unit}`:"Not specified"}function k(){if(!R)return null;const r=o=>{if(o==null)return"N/A";if(typeof o=="object")try{return JSON.stringify(o)}catch{return"Complex data"}return String(o)};return t(Ie,{children:[t(d,{children:[n(N,{})," Lab Report Summary"]}),t(T,{children:[n(B,{})," ",e.testName||e.reportType||"Laboratory Tests"]}),t(T,{children:[n(U,{})," Collected: ",q(e.date)]}),t(T,{$abnormal:m.length>0,children:[n(N,{})," ",m.length===0?"All results within normal range":`${m.length} abnormal ${m.length===1?"result":"results"}`]}),m.length>0&&m.map((o,s)=>t(T,{$abnormal:!0,children:[n(S,{})," ",r(o.name),":"," ",r(o.value)," ",o.unit||""," (Reference:"," ",f(o.name),")"]},s))]})}const b=e.patientName||(e.patient?e.patient.name:"Unknown"),C=e.patientId||(e.patient?e.patient._id:"Unknown"),I=e.technicianName||(e.technician?e.technician.name:"Unknown"),j=e.doctorName||(e.doctor?e.doctor.name:"Unknown");function ne(r){const o=s=>{if(s==null)return"N/A";if(typeof s=="object")try{return JSON.stringify(s)}catch{return"Complex data"}return String(s)};return r.components&&r.components.length>0?t(Ne,{children:[t(Te,{children:[n(g,{children:"Parameter"}),n(g,{children:"Result"}),n(g,{children:"Reference Range"}),n(g,{children:"Status"})]}),r.components.map((s,h)=>{const y=s.flagged||l(s.name,o(s.value));return t(ee,{children:[n(g,{children:o(s.name)}),t(g,{$abnormal:y,children:[o(s.value)," ",s.unit||""]}),n(g,{children:f(s.name)}),n(g,{children:n(Ce,{$abnormal:y,children:y?t(w,{children:[n(S,{}),n("span",{children:"Abnormal"})]}):t(w,{children:[n(V,{}),n("span",{children:"Normal"})]})})})]},h)})]}):r.results&&typeof r.results=="object"?t($,{children:[t(d,{children:[n(N,{})," Results Summary"]}),n(je,{children:Object.entries(r.results).map(([s,h],y)=>{const H=o(h),D=parseFloat(H),te=!isNaN(D),A=P[s],J=te&&A?D<A.min||D>A.max:!1;return t(De,{children:[t(Ae,{children:[s,":"]}),t(Fe,{$abnormal:J,children:[H,J&&n(S,{})]})]},y)})})]}):r.results&&typeof r.results=="string"?t($,{children:[t(d,{children:[n(N,{})," Results Summary"]}),n("div",{style:{margin:"8px 0",whiteSpace:"pre-wrap",lineHeight:"1.5"},dangerouslySetInnerHTML:{__html:r.results}})]}):t($,{children:[n(d,{children:"Results Summary"}),n("div",{style:{margin:"8px 0"},children:"No detailed results available."})]})}return t($e,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[t(xe,{onClick:L,children:[t(ve,{children:[n(ae,{})," ",e.testType||e.reportType||"Lab Test",n(Re,{$abnormal:v,children:v?t(w,{children:[n(S,{})," Abnormal"]}):t(w,{children:[n(V,{})," Normal"]})})]}),t("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[t(ke,{children:[n(U,{})," ",q(e.date)]}),a?n(oe,{}):n(re,{})]})]}),t(we,{$isExpanded:a,children:[k(),t(Se,{children:[t(O,{children:[t(d,{children:[n(K,{})," Patient Information"]}),t("div",{style:{margin:"8px 0"},children:[n("strong",{children:"Name:"})," ",typeof b=="object"?JSON.stringify(b):b]}),t("div",{style:{margin:"8px 0"},children:[n("strong",{children:"ID:"})," ",typeof C=="object"?JSON.stringify(C):C]})]}),t(O,{children:[t(d,{children:[n(se,{})," Provider Information"]}),t("div",{style:{margin:"8px 0"},children:[n("strong",{children:"Ordered By:"})," ",typeof j=="object"?JSON.stringify(j):j]}),t("div",{style:{margin:"8px 0"},children:[n("strong",{children:"Lab Technician:"})," ",typeof I=="object"?JSON.stringify(I):I]})]}),t(O,{children:[t(d,{children:[n(B,{})," Test Information"]}),t("div",{style:{margin:"8px 0"},children:[n("strong",{children:"Test Type:"})," ",typeof e.testType=="object"?JSON.stringify(e.testType):typeof e.reportType=="object"?JSON.stringify(e.reportType):e.testType||e.reportType||"Blood Test"]}),t("div",{style:{margin:"8px 0"},children:[n("strong",{children:"Status:"})," ",typeof e.status=="object"?JSON.stringify(e.status):e.status||"completed"]}),t("div",{style:{margin:"8px 0"},children:[n("strong",{children:"Sample:"})," ",typeof e.sample=="object"?JSON.stringify(e.sample):e.sample||"Blood"]})]})]}),ne(e),e.interpretation&&t($,{children:[n(d,{children:"Interpretation"}),n("div",{style:{margin:"8px 0"},children:typeof e.interpretation=="object"?JSON.stringify(e.interpretation):e.interpretation})]}),e.notes&&t($,{children:[n(d,{children:"Notes"}),n("div",{style:{margin:"8px 0"},children:typeof e.notes=="object"?JSON.stringify(e.notes):e.notes})]}),t(Le,{children:[t(Z,{variant:"secondary",onClick:r=>p(r),children:[n(X,{})," Print Report"]}),t(Z,{onClick:r=>p(r),children:[n(Y,{})," Download PDF"]})]})]})]})};export{Ue as L,Be as V};
//# sourceMappingURL=LabReportCard-3ba92b1f.js.map
