import{B as x,j as a,a as t,n as M,J,M as Q,am as R,O as V,P as K,A as W,Q as G,y as X}from"./index-c3da158f.js";import{s as r,m as h,r as o,A as Y}from"./vendor-3ba6fd3e.js";import"./Card-66c37868.js";import"./Button-d4df2000.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const Z=r.div`
  padding: ${e=>e.theme.spacing(3)};
`,ee=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(3)};
`,te=r.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.primary.main};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
  }
`,ne=r(h.button)`
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
`,ae=r.div`
  display: flex;
  margin-bottom: ${e=>e.theme.spacing(3)};
  gap: ${e=>e.theme.spacing(2)};
`,re=r.div`
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
`,oe=r.button`
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
`,ie=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,ce=r(h.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: ${e=>e.theme.shadows.small};
  overflow: hidden;
`,le=r.div`
  background-color: ${e=>e.theme.colors.primary.light};
  padding: ${e=>e.theme.spacing(2)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`,de=r.h3`
  margin: 0;
  color: ${e=>e.theme.colors.primary.dark};
  font-weight: 500;
`,se=r.div`
  display: flex;
  gap: ${e=>e.theme.spacing(1)};
`,B=r.button`
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
`,he=r.div`
  padding: ${e=>e.theme.spacing(2)};
`,u=r.div`
  margin-bottom: ${e=>e.theme.spacing(1)};
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }
`,b=r.span`
  font-weight: 500;
  min-width: 120px;
  color: ${e=>e.theme.colors.text.secondary};
`,y=r.span`
  color: ${e=>e.theme.colors.text.primary};
`,j=r(h.div)`
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
`,me=r(h.div)`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing(3)};
`,pe=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(2)};
`,ge=r.h2`
  margin: 0;
  color: ${e=>e.theme.colors.primary.main};
`,ue=r.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${e=>e.theme.colors.text.secondary};

  &:hover {
    color: ${e=>e.theme.colors.text.primary};
  }
`,be=r.form`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,d=r.div`
  display: flex;
  flex-direction: column;
`,s=r.label`
  margin-bottom: ${e=>e.theme.spacing(.5)};
  font-weight: 500;
  color: ${e=>e.theme.colors.text.secondary};
`,p=r.input`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
`,E=r.select`
  padding: ${e=>e.theme.spacing(1)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: 5px;
  font-size: 1rem;
`,ye=r(h.button)`
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
`,fe=r.div`
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
`,xe=r(h.div)`
  background-color: white;
  border-radius: 8px;
  padding: ${e=>e.theme.spacing(3)};
  width: 90%;
  max-width: 400px;
  text-align: center;
`,ve=r.p`
  margin-bottom: ${e=>e.theme.spacing(3)};
  font-size: 1.1rem;
`,$e=r.div`
  display: flex;
  justify-content: center;
  gap: ${e=>e.theme.spacing(2)};
`,we=r(h.button)`
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
`,Ce=r(h.button)`
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
`,Pe=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing(5)};
`,Me=()=>{const[e,T]=o.useState([]),[S,v]=o.useState([]),[m,D]=o.useState("");o.useState(""),o.useState("name"),o.useState("asc");const[L,$]=o.useState(!0),[Ne,w]=o.useState(null),[z,k]=o.useState(!1),[g,H]=o.useState("add"),[C,F]=o.useState(null),[c,P]=o.useState({name:"",email:"",gender:"",dateOfBirth:"",contactNumber:"",address:"",bloodGroup:"",allergies:"",medicalHistory:""});o.useEffect(()=>{N()},[]);const N=async()=>{try{$(!0);const n=await x.getPatients();T(n),v(n),$(!1)}catch(n){console.error("Error fetching patients:",n),w("Failed to load patients. Please try again later."),$(!1)}};o.useEffect(()=>{if(m.trim()==="")v(e);else{const n=e.filter(i=>i.name.toLowerCase().includes(m.toLowerCase())||i.email.toLowerCase().includes(m.toLowerCase())||i.contactNumber&&i.contactNumber.includes(m)||i.aadhaarNumber&&i.aadhaarNumber.includes(m));v(n)}},[m,e]);const I=n=>{D(n.target.value)},A=async n=>{try{await x.deletePatient(n),await N(),closeModal()}catch(i){console.error("Error deleting patient:",i),w("Failed to delete patient. Please try again.")}},O=(n=null)=>{n?(F(n),H("edit"),P({name:n.name,email:n.email,contactNumber:n.contactNumber||"",dateOfBirth:n.dateOfBirth?new Date(n.dateOfBirth).toISOString().split("T")[0]:"",gender:n.gender||"",bloodGroup:n.bloodGroup||"",address:n.address||"",aadhaarNumber:n.aadhaarNumber||"",emergencyContact:n.emergencyContact||""})):(F(null),P({name:"",email:"",contactNumber:"",dateOfBirth:"",gender:"",bloodGroup:"",address:"",aadhaarNumber:"",emergencyContact:""})),k(!0)},f=()=>{k(!1)},l=n=>{const{name:i,value:U}=n.target;P(q=>({...q,[i]:U}))},_=async n=>{n.preventDefault();try{g==="add"?await x.addPatient({...c,role:"patient"}):g==="edit"&&await x.updatePatient(C._id,c),await N(),f()}catch(i){console.error("Error saving patient:",i),w("Failed to save patient. Please try again.")}};return a(Z,{children:[a(ee,{children:[a(te,{children:[t(M,{})," Manage Patients"]}),a(ne,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>O(),children:[t(J,{})," Add New Patient"]})]}),a(ae,{children:[a(re,{children:[t(Q,{}),t("input",{type:"text",placeholder:"Search patients by name, email, or Aadhaar number...",value:m,onChange:I})]}),a(oe,{children:[t(R,{})," Filter"]})]}),L?t(Pe,{children:t("p",{children:"Loading patients..."})}):S.length===0?a(fe,{children:[t(M,{}),t("h2",{children:"No patients found"}),t("p",{children:"Try adjusting your search or add a new patient"})]}):t(ie,{children:S.map(n=>a(ce,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[a(le,{children:[t(de,{children:n.name}),a(se,{children:[t(B,{onClick:()=>O(n),children:t(V,{})}),t(B,{onClick:()=>A(n._id),children:t(K,{})}),t(B,{children:t(W,{})})]})]}),a(he,{children:[a(u,{children:[t(b,{children:"Email:"}),t(y,{children:n.email})]}),a(u,{children:[t(b,{children:"Phone:"}),t(y,{children:n.contactNumber||"Not provided"})]}),a(u,{children:[t(b,{children:"Gender:"}),t(y,{children:n.gender?n.gender.charAt(0).toUpperCase()+n.gender.slice(1):"Not provided"})]}),a(u,{children:[t(b,{children:"Aadhaar No:"}),t(y,{children:n.aadhaarNumber||"Not provided"})]}),a(u,{children:[t(b,{children:"Blood Group:"}),t(y,{children:n.bloodGroup||"Not provided"})]})]})]},n._id))}),a(Y,{children:[z&&t(j,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:f,children:a(me,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:20},onClick:n=>n.stopPropagation(),children:[a(pe,{children:[t(ge,{children:g==="add"?"Add New Patient":"Edit Patient"}),t(ue,{onClick:f,children:t(G,{})})]}),a(be,{onSubmit:_,children:[a(d,{children:[t(s,{children:"Full Name"}),t(p,{type:"text",name:"name",value:c.name,onChange:l,required:!0})]}),a(d,{children:[t(s,{children:"Email"}),t(p,{type:"email",name:"email",value:c.email,onChange:l,required:!0})]}),a(d,{children:[t(s,{children:"Phone Number"}),t(p,{type:"text",name:"contactNumber",value:c.contactNumber,onChange:l})]}),a(d,{children:[t(s,{children:"Date of Birth"}),t(p,{type:"date",name:"dateOfBirth",value:c.dateOfBirth,onChange:l})]}),a(d,{children:[t(s,{children:"Gender"}),a(E,{name:"gender",value:c.gender,onChange:l,children:[t("option",{value:"",children:"Select Gender"}),t("option",{value:"male",children:"Male"}),t("option",{value:"female",children:"Female"}),t("option",{value:"other",children:"Other"})]})]}),a(d,{children:[t(s,{children:"Blood Group"}),a(E,{name:"bloodGroup",value:c.bloodGroup,onChange:l,children:[t("option",{value:"",children:"Select Blood Group"}),t("option",{value:"A+",children:"A+"}),t("option",{value:"A-",children:"A-"}),t("option",{value:"B+",children:"B+"}),t("option",{value:"B-",children:"B-"}),t("option",{value:"AB+",children:"AB+"}),t("option",{value:"AB-",children:"AB-"}),t("option",{value:"O+",children:"O+"}),t("option",{value:"O-",children:"O-"})]})]}),a(d,{children:[t(s,{children:"Address"}),t(p,{type:"text",name:"address",value:c.address,onChange:l})]}),a(d,{children:[t(s,{children:"Aadhaar Number"}),t(p,{type:"text",name:"aadhaarNumber",value:c.aadhaarNumber,onChange:l,maxLength:12})]}),a(d,{children:[t(s,{children:"Emergency Contact"}),t(p,{type:"text",name:"emergencyContact",value:c.emergencyContact,onChange:l})]}),t(ye,{type:"submit",whileHover:{scale:1.02},whileTap:{scale:.98},children:g==="add"?"Add Patient":"Update Patient"})]})]})}),g==="delete"&&t(j,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:a(xe,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},children:[a(ve,{children:['Are you sure you want to delete patient "',C.name,'"? This action cannot be undone.']}),a($e,{children:[a(we,{onClick:f,whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(G,{})," Cancel"]}),a(Ce,{onClick:()=>A(C._id),whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(X,{})," Confirm"]})]})]})})]})]})};export{Me as default};
//# sourceMappingURL=ManagePatients-e8574ae6.js.map
