import{u as ae,a as t,j as a,y as ie,t as G,b as E,w as ne,D as se,Q as le,J as de,B as f}from"./index-c3da158f.js";import{s as i,m as F,b as ce,u as me,r as d}from"./vendor-3ba6fd3e.js";import{P as k}from"./PageTransition-e5168143.js";import{A as H}from"./AnimationContainer-978f4c1f.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const M=i.div`
  padding: ${e=>e.theme.spacing(3)};
`,ue=i.div`
  margin-bottom: ${e=>e.theme.spacing(4)};
`,he=i.h1`
  font-size: 1.5rem;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: ${e=>e.theme.spacing(1)};
`,pe=i.p`
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.9rem;
`,j=i.div`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(3)};
  box-shadow: ${e=>e.theme.shadows.small};
  max-width: 800px;
  margin: 0 auto;
`,T=i.div`
  margin-bottom: ${e=>e.theme.spacing(4)};

  &:last-child {
    margin-bottom: 0;
  }
`,w=i.h2`
  font-size: 1.1rem;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: ${e=>e.theme.spacing(2)};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,h=i.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
`,c=i.label`
  display: block;
  font-size: 0.9rem;
  margin-bottom: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.secondary};
`,C=i.input`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  font-size: 0.9rem;
  background-color: ${e=>e.theme.colors.background.default};
  color: ${e=>e.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.main+"30"};
  }
`,P=i.select`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  font-size: 0.9rem;
  background-color: ${e=>e.theme.colors.background.default};
  color: ${e=>e.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.main+"30"};
  }
`,ge=i.textarea`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  font-size: 0.9rem;
  background-color: ${e=>e.theme.colors.background.default};
  color: ${e=>e.theme.colors.text.primary};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.main+"30"};
  }
`;i.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;i.div`
  flex: 1;
`;i.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
  padding: ${e=>e.theme.spacing(2)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.theme.colors.background.default};
`;const be=i.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
  padding: ${e=>e.theme.spacing(2)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.theme.colors.background.default};
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  align-items: flex-end;
`;i.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(1)};

  &:last-child {
    margin-bottom: 0;
  }
`;i.button`
  display: inline-flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border: 1px dashed ${e=>e.theme.colors.primary.main};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: transparent;
  color: ${e=>e.theme.colors.primary.main};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.main+"10"};
  }
`;const ye=i.button`
  padding: ${e=>e.theme.spacing(.5)};
  background-color: ${e=>e.theme.colors.status.error+"10"};
  color: ${e=>e.theme.colors.status.error};
  border: none;
  border-radius: ${e=>e.theme.borderRadius.small};
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.status.error+"20"};
  }
`,O=i(F.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.default:e.theme.colors.primary.main};
  color: ${e=>e.variant==="secondary"?e.theme.colors.text.primary:"white"};
  border: ${e=>e.variant==="secondary"?`1px solid ${e.theme.colors.border}`:"none"};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.variant==="secondary"?e.theme.colors.background.card:e.theme.colors.primary.light};
  }

  &:disabled {
    background-color: ${e=>e.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;i(F.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.light};
  }

  &:disabled {
    background-color: ${e=>e.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`;i.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${e=>e.theme.spacing(4)};
`;const fe=i(F.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
`,$e=i.h2`
  color: ${e=>e.theme.colors.status.success};
  font-size: 1.3rem;
  margin: ${e=>e.theme.spacing(2)} 0;
`,ve=i.p`
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,Ce=()=>{var q,A;const{user:e}=ae(),N=ce(),X=me(),$=new URLSearchParams(N.search).get("orderId"),[W,K]=d.useState([]),[v,V]=d.useState([]),[s,B]=d.useState(null),[I,x]=d.useState(""),[m,R]=d.useState("Blood Test"),[U,L]=d.useState(""),[p,u]=d.useState([{parameter:"",value:"",unit:""}]),[D,_]=d.useState(!1),[J,z]=d.useState(!0),[Q,Y]=d.useState(!1);d.useEffect(()=>{(async()=>{try{z(!0);const r=await f.getPatients();K(r);const n=await f.getLabOrders({technician:e._id,status:"in_progress"});if(V(n),$){const l=n.find(b=>b._id===$);l&&(B(l),x(l.patient._id),R(l.testType),L(l.notes||""),g(l.testType))}else g("Blood Test")}catch(r){console.error("Error fetching data:",r)}finally{z(!1)}})()},[$,e._id]);const Z=()=>{u([...p,{parameter:"",value:"",unit:""}])},ee=o=>{const r=[...p];r.splice(o,1),u(r)},te=()=>m==="Blood Test"?["Hemoglobin","White Blood Cells","Red Blood Cells","Platelets","Glucose","Cholesterol","Triglycerides","HDL","LDL","Sodium","Potassium","Chloride"]:m==="Urine Analysis"?["pH","Specific Gravity","Glucose","Protein","Ketones","Nitrites","Leukocytes","Blood"]:m==="X-Ray"||m==="CT Scan"||m==="MRI"?["Region","Findings","Impression","Recommendations"]:[],re=o=>({Hemoglobin:"g/dL","White Blood Cells":"thousand/μL","Red Blood Cells":"million/μL",Platelets:"thousand/μL",Glucose:"mg/dL",Cholesterol:"mg/dL",Triglycerides:"mg/dL",HDL:"mg/dL",LDL:"mg/dL",Sodium:"mEq/L",Potassium:"mEq/L",Chloride:"mEq/L","Specific Gravity":"",Glucose:"mg/dL",Protein:"mg/dL",Ketones:"mg/dL"})[o]||"",S=(o,r,n)=>{const l=[...p];l[o][r]=n,r==="parameter"&&(l[o].unit=re(n)),u(l)},oe=async o=>{var r;o.preventDefault(),_(!0);try{const n={};p.forEach(y=>{y.parameter&&(n[y.parameter]=`${y.value} ${y.unit}`)});const l={patient:I,technician:e._id,reportType:m,notes:U,results:n,status:"completed",orderId:s?s._id:null,doctor:((r=s==null?void 0:s.doctor)==null?void 0:r._id)||null};console.log("Uploading lab report with data:",l);const b=await f.uploadLabReport(l);s&&(console.log(`Updating lab order ${s._id} with report ID ${b._id}`),await f.updateLabOrder(s._id,{status:"completed",reportId:b._id,completedDate:new Date().toISOString()})),Y(!0),setTimeout(()=>{X("/dashboard/view-lab-orders")},3e3)}catch(n){console.error("Error uploading lab report:",n),alert(`Failed to upload report: ${n.message||"Unknown error"}`)}finally{_(!1)}},g=o=>{console.log("Updating results for test type:",o),u(o==="Blood Test"?[{parameter:"Hemoglobin",value:"",unit:"g/dL"},{parameter:"White Blood Cells",value:"",unit:"thousand/μL"},{parameter:"Platelets",value:"",unit:"thousand/μL"},{parameter:"Glucose",value:"",unit:"mg/dL"}]:o==="Urine Analysis"?[{parameter:"pH",value:"",unit:""},{parameter:"Specific Gravity",value:"",unit:""},{parameter:"Glucose",value:"",unit:"mg/dL"},{parameter:"Protein",value:"",unit:"mg/dL"}]:o==="X-Ray"?[{parameter:"Findings",value:"",unit:""},{parameter:"Impression",value:"",unit:""}]:o==="CT Scan"?[{parameter:"Region",value:"",unit:""},{parameter:"Findings",value:"",unit:""},{parameter:"Impression",value:"",unit:""}]:o==="MRI"?[{parameter:"Region",value:"",unit:""},{parameter:"Findings",value:"",unit:""},{parameter:"Impression",value:"",unit:""}]:[{parameter:"",value:"",unit:""}])};return J?t(k,{children:t(H,{type:"loading",height:"300px"})}):Q?t(k,{children:t(M,{children:t(j,{children:a(fe,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},children:[t(ie,{size:50,color:"#4CAF50"}),t($e,{children:"Lab Report Uploaded Successfully!"}),t(ve,{children:"The lab report has been successfully uploaded and is now available in the system."}),t(H,{type:"success",height:"200px"})]})})})}):t(k,{children:a(M,{children:[a(ue,{children:[t(he,{children:"Upload Lab Results"}),t(pe,{children:"Complete the form below to upload new lab test results. These results will be accessible to the patient and their doctor through the patient records."})]}),t(j,{children:a("form",{onSubmit:oe,children:[a(T,{children:[a(w,{children:[t(G,{}),"Patient Information"]}),s?a(E,{children:[a("div",{style:{marginBottom:"1rem"},children:[t(c,{children:"Patient"}),t("div",{style:{padding:"0.75rem",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f9f9f9"},children:((q=s.patient)==null?void 0:q.name)||"Unknown Patient"})]}),a("div",{style:{marginBottom:"1rem"},children:[t(c,{children:"Requested By"}),t("div",{style:{padding:"0.75rem",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f9f9f9"},children:((A=s.doctor)==null?void 0:A.name)||"Unknown Doctor"})]}),a("div",{style:{marginBottom:"1rem"},children:[t(c,{children:"Date Requested"}),t("div",{style:{padding:"0.75rem",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f9f9f9"},children:new Date(s.requestedDate).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})})]})]}):a(E,{children:[a(h,{children:[t(c,{htmlFor:"patient",children:"Patient"}),a(P,{id:"patient",value:I,onChange:o=>x(o.target.value),required:!0,children:[t("option",{value:"",children:"-- Select Patient --"}),W.map(o=>t("option",{value:o._id,children:o.name},o._id))]})]}),v.length>0&&a(h,{children:[t(c,{htmlFor:"order",children:"Lab Order (Optional)"}),a(P,{id:"order",value:(s==null?void 0:s._id)||"",onChange:o=>{const r=v.find(n=>n._id===o.target.value);B(r||null),r&&(x(r.patient._id),R(r.testType),L(r.notes||""),g(r.testType))},children:[t("option",{value:"",children:"-- Select Order --"}),v.map(o=>{var r;return a("option",{value:o._id,children:[o.testType," for"," ",((r=o.patient)==null?void 0:r.name)||"Unknown Patient"]},o._id)})]})]})]})]}),a(T,{children:[a(w,{children:[t(ne,{}),"Report Details"]}),s?a("div",{style:{marginBottom:"1rem"},children:[t(c,{children:"Test Type"}),t("div",{style:{padding:"0.75rem",border:"1px solid #ddd",borderRadius:"4px",backgroundColor:"#f9f9f9"},children:m})]}):a(h,{children:[t(c,{htmlFor:"reportType",children:"Test Type"}),a(P,{id:"reportType",value:m,onChange:o=>{const r=o.target.value;R(r),g(r)},required:!0,children:[t("option",{value:"Blood Test",children:"Blood Test"}),t("option",{value:"Urine Analysis",children:"Urine Analysis"}),t("option",{value:"X-Ray",children:"X-Ray"}),t("option",{value:"CT Scan",children:"CT Scan"}),t("option",{value:"MRI",children:"MRI"})]})]}),a(h,{children:[t(c,{htmlFor:"notes",children:"Notes"}),t(ge,{id:"notes",value:U,onChange:o=>L(o.target.value),placeholder:"Add any additional notes about the test..."})]})]}),a(T,{children:[a(w,{children:[t(se,{}),"Test Results"]}),t("div",{style:{marginBottom:"16px",fontSize:"0.9rem",color:"#666"},children:a("p",{children:["Enter test parameters and values based on the selected test type. The system suggests commonly used parameters for"," ",m,". You can select from the suggestions or enter custom parameters."]})}),p.map((o,r)=>a(be,{children:[a(h,{style:{flex:2},children:[t(c,{htmlFor:`parameter-${r}`,children:"Parameter"}),a("div",{style:{position:"relative"},children:[t(C,{id:`parameter-${r}`,value:o.parameter,onChange:n=>S(r,"parameter",n.target.value),placeholder:"e.g. Hemoglobin",list:`parameters-list-${r}`,required:!0}),t("datalist",{id:`parameters-list-${r}`,children:te().map((n,l)=>t("option",{value:n},l))})]})]}),a(h,{style:{flex:1},children:[t(c,{htmlFor:`value-${r}`,children:"Value"}),t(C,{id:`value-${r}`,value:o.value,onChange:n=>S(r,"value",n.target.value),placeholder:"14.5",required:!0})]}),a(h,{style:{flex:1},children:[t(c,{htmlFor:`unit-${r}`,children:"Unit"}),t(C,{id:`unit-${r}`,value:o.unit,onChange:n=>S(r,"unit",n.target.value),placeholder:"g/dL"})]}),p.length>1&&t(ye,{type:"button",onClick:()=>ee(r),children:t(le,{})})]},r)),a(O,{type:"button",variant:"secondary",onClick:Z,style:{marginTop:"1rem"},children:[t(de,{})," Add Parameter"]})]}),a("div",{style:{marginTop:"1rem",padding:"1rem",backgroundColor:"#e3f2fd",borderRadius:"4px",fontSize:"0.9rem"},children:[a("div",{style:{display:"flex",alignItems:"center",marginBottom:"0.5rem"},children:[t(G,{style:{marginRight:"0.5rem",color:"#2196f3"}}),t("strong",{children:"Important:"})]}),t("p",{style:{margin:"0"},children:"Lab results will be immediately accessible to the patient and their doctor in their medical records. Make sure all information is accurate before submission."})]}),t(O,{type:"submit",disabled:D,style:{marginTop:"2rem"},children:D?"Uploading...":"Upload Lab Results"})]})})]})})};export{Ce as default};
//# sourceMappingURL=UploadLabResults-0650a01c.js.map
