import{j as a,a as i,p as N,J,M as U,am as V,O as Y,P as K,A as W,Q as E,y as X,B as $}from"./index-c3da158f.js";import{s as t,m as h,r as c,A as Z}from"./vendor-3ba6fd3e.js";import"./animations-c827faa9.js";const ee=t.div`
  padding: ${e=>e.theme.spacing(3)};
`,ie=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(3)};
`,ne=t.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.primary.main};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
  }
`,te=t(h.button)`
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 500;

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
  }
`,ae=t.div`
  display: flex;
  margin-bottom: ${e=>e.theme.spacing(3)};
  gap: ${e=>e.theme.spacing(2)};
`,oe=t.div`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 5px;
  padding: ${e=>e.theme.spacing(.75)}
    ${e=>e.theme.spacing(1.5)};

  svg {
    color: ${e=>e.theme.colors.text.secondary};
    margin-right: ${e=>e.theme.spacing(1)};
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 1rem;
  }
`,re=t.button`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 5px;
  padding: ${e=>e.theme.spacing(.75)}
    ${e=>e.theme.spacing(1.5)};
  cursor: pointer;

  svg {
    margin-right: ${e=>e.theme.spacing(.5)};
    color: ${e=>e.theme.colors.text.secondary};
  }
`,ce=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,le=t(h.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${e=>e.theme.shadows.small};
  overflow: hidden;
`,se=t.div`
  background-color: ${e=>e.theme.colors.primary.light};
  padding: ${e=>e.theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,de=t.h3`
  margin: 0;
  color: ${e=>e.theme.colors.primary.dark};
  font-weight: 500;
`,he=t.div`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.primary.main};
  margin-top: 4px;
`,me=t.div`
  display: flex;
  gap: ${e=>e.theme.spacing(1)};
`,S=t.button`
  background: none;
  border: none;
  color: ${e=>e.theme.colors.primary.main};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${e=>e.theme.colors.primary.dark};
  }
`,pe=t.div`
  padding: ${e=>e.theme.spacing(2)};
`,y=t.div`
  margin-bottom: ${e=>e.theme.spacing(1)};
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }
`,b=t.span`
  font-weight: 500;
  min-width: 120px;
  color: ${e=>e.theme.colors.text.secondary};
`,f=t.span`
  color: ${e=>e.theme.colors.text.primary};
`,M=t(h.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`,ge=t(h.div)`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing(3)};
`,ue=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(2)};
`,ye=t.h2`
  margin: 0;
  color: ${e=>e.theme.colors.primary.main};
`,be=t.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${e=>e.theme.colors.text.secondary};

  &:hover {
    color: ${e=>e.theme.colors.text.primary};
  }
`,fe=t.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,s=t.div`
  display: flex;
  flex-direction: column;
`,d=t.label`
  margin-bottom: ${e=>e.theme.spacing(.5)};
  font-weight: 500;
  color: ${e=>e.theme.colors.text.secondary};
`,g=t.input`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
`,xe=t.select`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
`,$e=t(h.button)`
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: 5px;
  font-weight: 500;
  margin-top: ${e=>e.theme.spacing(1)};
  cursor: pointer;

  &:disabled {
    background-color: ${e=>e.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`,ve=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(5)};
  text-align: center;
  color: ${e=>e.theme.colors.text.secondary};

  svg {
    font-size: 3rem;
    margin-bottom: ${e=>e.theme.spacing(2)};
  }
`,we=t(h.div)`
  background-color: white;
  border-radius: 8px;
  padding: ${e=>e.theme.spacing(3)};
  width: 90%;
  max-width: 400px;
  text-align: center;
`,Ce=t.p`
  margin-bottom: ${e=>e.theme.spacing(3)};
  font-size: 1.1rem;
`,Te=t.div`
  display: flex;
  justify-content: center;
  gap: ${e=>e.theme.spacing(2)};
`,ke=t(h.button)`
  background-color: ${e=>e.theme.colors.text.secondary};
  color: white;
  border: none;
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: ${e=>e.theme.spacing(.5)};
  }
`,De=t(h.button)`
  background-color: ${e=>e.theme.colors.error};
  color: white;
  border: none;
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-right: ${e=>e.theme.spacing(.5)};
  }
`,Se=t.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing(5)};
`;t.span`
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  background-color: ${e=>e.theme.colors.primary.light};
  color: ${e=>e.theme.colors.primary.dark};
  border-radius: 12px;
  font-size: 0.75rem;
  margin-left: ${e=>e.theme.spacing(1)};
  white-space: nowrap;
`;const je=()=>{const[e,x]=c.useState([]),[z,v]=c.useState([]),[A,B]=c.useState(!0),[m,q]=c.useState(""),[H,L]=c.useState(!1),[P,w]=c.useState(!1),[C,T]=c.useState(null),[u,F]=c.useState(null),[r,k]=c.useState({name:"",email:"",contactNumber:"",department:"",specialization:"",qualification:"",experience:"",joiningDate:""});c.useEffect(()=>{(async()=>{try{const o=await $.getLabTechnicians();x(o),v(o)}catch(o){console.error("Error fetching lab technicians:",o)}finally{B(!1)}})()},[]),c.useEffect(()=>{if(m.trim()==="")v(e);else{const n=e.filter(o=>o.name.toLowerCase().includes(m.toLowerCase())||o.email.toLowerCase().includes(m.toLowerCase())||o.department&&o.department.toLowerCase().includes(m.toLowerCase())||o.specialization&&o.specialization.toLowerCase().includes(m.toLowerCase()));v(n)}},[m,e]);const I=n=>{q(n.target.value)},_=n=>{T(n),w(!0)},O=async()=>{try{await $.deleteLabTechnician(C._id),x(n=>n.filter(o=>o._id!==C._id)),w(!1),T(null)}catch(n){console.error("Error deleting lab technician:",n)}},Q=()=>{w(!1),T(null)},j=(n=null)=>{n?(F(n),k({name:n.name,email:n.email,contactNumber:n.contactNumber||"",department:n.department||"",specialization:n.specialization||"",qualification:n.qualification||"",experience:n.experience||"",joiningDate:n.joiningDate?new Date(n.joiningDate).toISOString().split("T")[0]:""})):(F(null),k({name:"",email:"",contactNumber:"",department:"",specialization:"",qualification:"",experience:"",joiningDate:""})),L(!0)},D=()=>{L(!1)},l=n=>{const{name:o,value:p}=n.target;k(G=>({...G,[o]:p}))},R=async n=>{n.preventDefault();try{if(u)await $.updateLabTechnician(u._id,r),x(o=>o.map(p=>p._id===u._id?{...p,...r}:p));else{const o=await $.addLabTechnician({...r,role:"labtechnician"});x(p=>[...p,o])}D()}catch(o){console.error("Error saving lab technician:",o)}};return a(ee,{children:[a(ie,{children:[a(ne,{children:[i(N,{}),"Manage Lab Technicians"]}),a(te,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>j(),children:[i(J,{}),"Add Lab Technician"]})]}),a(ae,{children:[a(oe,{children:[i(U,{}),i("input",{type:"text",placeholder:"Search technicians by name, department, or specialization...",value:m,onChange:I})]}),a(re,{children:[i(V,{})," Filter"]})]}),A?i(Se,{children:i("p",{children:"Loading lab technicians..."})}):z.length===0?a(ve,{children:[i(N,{}),i("h2",{children:"No lab technicians found"}),i("p",{children:"Try adjusting your search or add a new lab technician"})]}):i(ce,{children:z.map(n=>a(le,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[a(se,{children:[a("div",{children:[i(de,{children:n.name}),n.specialization&&i(he,{children:n.specialization})]}),a(me,{children:[i(S,{onClick:()=>j(n),children:i(Y,{})}),i(S,{onClick:()=>_(n),children:i(K,{})}),i(S,{children:i(W,{})})]})]}),a(pe,{children:[a(y,{children:[i(b,{children:"Email:"}),i(f,{children:n.email})]}),a(y,{children:[i(b,{children:"Department:"}),i(f,{children:n.department||"Not assigned"})]}),a(y,{children:[i(b,{children:"Qualification:"}),i(f,{children:n.qualification||"Not provided"})]}),a(y,{children:[i(b,{children:"Experience:"}),i(f,{children:n.experience?`${n.experience} years`:"Not provided"})]}),a(y,{children:[i(b,{children:"Phone:"}),i(f,{children:n.contactNumber||"Not provided"})]})]})]},n._id))}),a(Z,{children:[H&&i(M,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:D,children:a(ge,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},onClick:n=>n.stopPropagation(),children:[a(ue,{children:[i(ye,{children:u?"Edit Lab Technician":"Add New Lab Technician"}),i(be,{onClick:D,children:i(E,{})})]}),a(fe,{onSubmit:R,children:[a(s,{children:[i(d,{children:"Full Name"}),i(g,{type:"text",name:"name",value:r.name,onChange:l,required:!0})]}),a(s,{children:[i(d,{children:"Email"}),i(g,{type:"email",name:"email",value:r.email,onChange:l,required:!0})]}),a(s,{children:[i(d,{children:"Phone Number"}),i(g,{type:"text",name:"contactNumber",value:r.contactNumber,onChange:l})]}),a(s,{children:[i(d,{children:"Department"}),a(xe,{name:"department",value:r.department,onChange:l,children:[i("option",{value:"",children:"Select Department"}),i("option",{value:"Biochemistry",children:"Biochemistry"}),i("option",{value:"Hematology",children:"Hematology"}),i("option",{value:"Microbiology",children:"Microbiology"}),i("option",{value:"Pathology",children:"Pathology"}),i("option",{value:"Immunology",children:"Immunology"}),i("option",{value:"Cytology",children:"Cytology"}),i("option",{value:"Radiology",children:"Radiology"})]})]}),a(s,{children:[i(d,{children:"Specialization"}),i(g,{type:"text",name:"specialization",value:r.specialization,onChange:l})]}),a(s,{children:[i(d,{children:"Qualification"}),i(g,{type:"text",name:"qualification",value:r.qualification,onChange:l})]}),a(s,{children:[i(d,{children:"Experience (Years)"}),i(g,{type:"number",name:"experience",value:r.experience,onChange:l,min:"0"})]}),a(s,{children:[i(d,{children:"Joining Date"}),i(g,{type:"date",name:"joiningDate",value:r.joiningDate,onChange:l})]}),i($e,{type:"submit",whileHover:{scale:1.02},whileTap:{scale:.98},children:u?"Update Technician":"Add Technician"})]})]})}),P&&i(M,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:a(we,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},children:[a(Ce,{children:['Are you sure you want to delete lab technician "',C.name,'"? This action cannot be undone.']}),a(Te,{children:[a(ke,{onClick:Q,whileHover:{scale:1.05},whileTap:{scale:.95},children:[i(E,{})," Cancel"]}),a(De,{onClick:O,whileHover:{scale:1.05},whileTap:{scale:.95},children:[i(X,{})," Confirm"]})]})]})})]})]})};export{je as default};
//# sourceMappingURL=ManageLabTechnicians-f52032bc.js.map
