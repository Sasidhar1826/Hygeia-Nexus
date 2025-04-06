import{a,j as i,J as X,M as Z,O as ee,b as q,Q as te,y as re,P as ae,B as y}from"./index-c3da158f.js";import{s,m as T,r as d}from"./vendor-3ba6fd3e.js";import{C as oe}from"./Card-66c37868.js";import{B as $}from"./Button-d4df2000.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const ie=s.div`
  padding: ${e=>e.theme.spacing(3)};
`,ne=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing(2)};
`,se=s.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
`,ce=s.div`
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1)};
  width: 300px;
  border: 1px solid ${e=>e.theme.colors.border};

  svg {
    margin: 0 ${e=>e.theme.spacing(1)};
    color: ${e=>e.theme.colors.text.secondary};
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    padding: ${e=>e.theme.spacing(1)};
    color: ${e=>e.theme.colors.text.primary};
  }
`,le=s.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};
  flex-wrap: wrap;
`,z=s.select`
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.paper};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,de=s.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,me=s(oe)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,ue=s.div`
  display: flex;
  padding: ${e=>e.theme.spacing(2)};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,he=s.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${e=>e.image||"/images/doctor-placeholder.jpg"});
  background-size: cover;
  background-position: center;
  margin-right: ${e=>e.theme.spacing(2)};
  flex-shrink: 0;
`,pe=s.div`
  flex: 1;
`,ge=s.h2`
  font-size: 1.2rem;
  margin-bottom: ${e=>e.theme.spacing(.5)};
  color: ${e=>e.theme.colors.primary.main};
`,fe=s.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(.5)};
`,ye=s.p`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.text.secondary};
  font-weight: 500;
`,be=s.div`
  padding: ${e=>e.theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
`,ve=s.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
  flex: 1;
`,k=s.div`
  margin-bottom: ${e=>e.theme.spacing(1)};
  font-size: 0.9rem;

  span {
    font-weight: 600;
    color: ${e=>e.theme.colors.text.primary};
  }
`,xe=s.span`
  display: inline-block;
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: ${e=>e.theme.spacing(1)};

  ${e=>e.active?`
      background-color: ${e.theme.colors.status.successLight||e.theme.colors.status.success+"20"};
      color: ${e.theme.colors.status.success};
    `:`
      background-color: ${e.theme.colors.status.errorLight||e.theme.colors.status.error+"20"};
      color: ${e.theme.colors.status.error};
    `}
`,$e=s.div`
  display: flex;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: auto;
  flex-wrap: wrap;

  > button {
    margin-bottom: ${e=>e.theme.spacing(1)};
    flex: 1 0 auto;
    min-width: auto;
  }
`,Ae=s.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.text.secondary};
`,j=s.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.status.error};
`,De=s(T.div)`
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
`,Fe=s(T.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(4)};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`,we=s.h2`
  font-size: 1.5rem;
  margin-bottom: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.text.primary};
`,h=s.div`
  margin-bottom: ${e=>e.theme.spacing(3)};
`,p=s.label`
  display: block;
  margin-bottom: ${e=>e.theme.spacing(1)};
  font-weight: 500;
  color: ${e=>e.theme.colors.text.primary};
`,f=s.input`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.theme.colors.background.default};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,Ce=s.textarea`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.theme.colors.background.default};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,Ne=s.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(4)};
`,Le=()=>{const[e,g]=d.useState([]),[S,m]=d.useState([]),[b,D]=d.useState([]),[v,B]=d.useState(""),[F,U]=d.useState(""),[w,O]=d.useState(""),[G,L]=d.useState(!0),[_,l]=d.useState(null),[H,E]=d.useState(!1),[C,P]=d.useState("add"),[N,R]=d.useState(null),[c,I]=d.useState({name:"",email:"",contactNumber:"",specialty:"",licenseNumber:"",department:"",bio:"",education:"",experience:"",consultationFee:"",profileImage:"",isActive:!0,languages:[]});d.useEffect(()=>{(async()=>{try{const r=await y.getDepartments();Array.isArray(r)?D(r):r&&Array.isArray(r.data)?D(r.data):(console.warn("Unexpected departments response format:",r),D([]))}catch(r){console.error("Error fetching departments:",r),l("Failed to load departments. Please try again later."),D([])}})()},[]),d.useEffect(()=>{(async()=>{try{L(!0);const r=await y.getDoctors();Array.isArray(r)?(g(r),m(r)):r&&r.data&&Array.isArray(r.data)?(g(r.data),m(r.data)):r&&r.message==="No doctors found"&&r.data&&Array.isArray(r.data)?(g(r.data),m(r.data),console.log("No doctors found in the database")):(console.error("Invalid response format:",r),g([]),m([]),l("Failed to load doctors: Invalid data format"))}catch(r){console.error("Error fetching doctors:",r),g([]),m([]),l("Failed to load doctors. Please try again later.")}finally{L(!1)}})()},[]),d.useEffect(()=>{Array.isArray(e)&&M()},[v,F,w,e]);const M=t=>{const r=t||e;if(!Array.isArray(r))return m([]),[];let o=[...r];if(v&&(o=o.filter(n=>{var x;return((x=n.name)==null?void 0:x.toLowerCase().includes(v.toLowerCase()))||n.specialty&&n.specialty.toLowerCase().includes(v.toLowerCase())||n.email&&n.email.toLowerCase().includes(v.toLowerCase())})),F&&(o=o.filter(n=>n.department===F)),w){const n=w==="active";o=o.filter(x=>x.isActive===n)}return t||m(o),o},J=()=>{P("add"),I({name:"",email:"",contactNumber:"",specialty:"",licenseNumber:"",department:"",bio:"",education:"",experience:"",consultationFee:"",profileImage:"",isActive:!0,languages:[]}),E(!0),l(null)},Q=t=>{P("edit");const r={name:t.name||"",email:t.email||"",contactNumber:t.contactNumber||"",specialty:t.specialty||"",licenseNumber:t.licenseNumber||"",department:t.department||"",bio:t.bio||"",education:t.education||"",experience:t.experience||"",consultationFee:t.consultationFee||"",profileImage:t.profileImage||"",isActive:t.isActive!==void 0?t.isActive:!0,languages:t.languages||[]};I(r),R(t),E(!0),l(null)},A=()=>{E(!1),R(null)},u=t=>{const{name:r,value:o,type:n,checked:x}=t.target;I({...c,[r]:n==="checkbox"?x:o})},Y=async t=>{t.preventDefault();try{if(C==="add"){if(!c.specialty){l("Specialty field is required");return}if(!c.licenseNumber){l("License number is required");return}if(!c.department){l("Department is required");return}const r={...c,password:"tempPassword123",role:"doctor",specialty:c.specialty,department:c.department,licenseNumber:c.licenseNumber,consultationFee:c.consultationFee?Number(c.consultationFee):0,experience:c.experience?Number(c.experience):0};try{const o=await y.createDoctor(r);try{const n=await y.getDoctors();Array.isArray(n)?(g(n),m(n)):n&&n.data&&Array.isArray(n.data)&&(g(n.data),m(n.data)),A()}catch(n){console.error("Error refreshing doctors list:",n),A(),l("Doctor added but failed to refresh the list.")}}catch(o){console.error("Error adding doctor:",o);let n="Failed to add doctor. Please check the form and try again.";o.message?n=o.message:o.error&&(n=o.error),l(n)}}else if(N!=null&&N._id)try{const r=await y.updateDoctor(N._id,c);try{const o=await y.getDoctors();Array.isArray(o)?(g(o),m(o)):o&&o.data&&Array.isArray(o.data)&&(g(o.data),m(o.data)),A()}catch(o){console.error("Error refreshing doctors list:",o),A(),l("Doctor updated but failed to refresh the list.")}}catch(r){console.error("Error updating doctor:",r),l("Failed to update doctor. Please check the form and try again.")}}catch(r){console.error("Error saving doctor:",r),l("Failed to save doctor. Please try again.")}},K=async t=>{if(!t||!t._id){l("Cannot update doctor status: Invalid doctor data");return}try{await y.updateDoctor(t._id,{isActive:!t.isActive});const r=e.map(n=>n._id===t._id?{...n,isActive:!t.isActive}:n);g(r);const o=M(r);m(o)}catch(r){console.error("Error toggling doctor status:",r),l("Failed to update doctor status. Please try again.")}},V=async t=>{if(!t){l("Cannot delete doctor: Invalid doctor ID");return}if(window.confirm("Are you sure you want to delete this doctor?"))try{await y.deleteDoctor(t);const r=e.filter(n=>n._id!==t);g(r);const o=M(r);m(o)}catch(r){console.error("Error deleting doctor:",r);let o="Failed to delete doctor. Please try again.";r.message&&(o=`Failed to delete doctor: ${r.message}`),r.status===404?o="The doctor you're trying to delete could not be found.":(r.status===403||r.status===401)&&(o="You don't have permission to delete this doctor."),l(o)}},W=t=>{if(!t)return"Not Assigned";if(!Array.isArray(b))return"Unknown";const r=b.find(o=>o&&o._id===t);return r?r.name:"Unknown"};return G?a(Ae,{children:"Loading doctors..."}):i(ie,{children:[i(ne,{children:[a(se,{children:"Manage Doctors"}),i($,{onClick:J,children:[a(X,{}),"Add New Doctor"]})]}),i(le,{children:[i(ce,{children:[a(Z,{}),a("input",{type:"text",placeholder:"Search doctors...",value:v,onChange:t=>B(t.target.value)})]}),i(z,{value:F,onChange:t=>U(t.target.value),children:[a("option",{value:"",children:"All Departments"}),b&&b.length>0&&b.map(t=>a("option",{value:t._id,children:t.name},t._id))]}),i(z,{value:w,onChange:t=>O(t.target.value),children:[a("option",{value:"",children:"All Status"}),a("option",{value:"active",children:"Active"}),a("option",{value:"inactive",children:"Inactive"})]})]}),_&&a(j,{children:_}),!S||S.length===0?a(j,{children:"No doctors found matching your criteria."}):a(de,{children:S.map(t=>i(me,{children:[i(ue,{children:[a(he,{image:t.profileImage}),i(pe,{children:[i(ge,{children:["Dr. ",t.name]}),t.specialty&&a(fe,{children:t.specialty}),t.department&&a(ye,{children:W(t.department)}),a(xe,{active:t.isActive,children:t.isActive?"Active":"Inactive"})]})]}),i(be,{children:[i(ve,{children:[i(k,{children:[a("span",{children:"Email:"})," ",t.email]}),t.contactNumber&&i(k,{children:[a("span",{children:"Contact:"})," ",t.contactNumber]}),t.licenseNumber&&i(k,{children:[a("span",{children:"License:"})," ",t.licenseNumber]}),t.consultationFee&&i(k,{children:[a("span",{children:"Fee:"})," $",t.consultationFee]})]}),i($e,{children:[i($,{variant:"secondary",size:"small",onClick:()=>Q(t),children:[a(ee,{}),"Edit"]}),a($,{variant:t.isActive?"warning":"success",size:"small",onClick:()=>K(t),children:t.isActive?i(q,{children:[a(te,{}),"Deactivate"]}):i(q,{children:[a(re,{}),"Activate"]})}),i($,{variant:"danger",size:"small",onClick:()=>V(t._id),children:[a(ae,{}),"Delete"]})]})]})]},t._id))}),H&&a(De,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:i(Fe,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.1},children:[a(we,{children:C==="add"?"Add New Doctor":"Edit Doctor"}),i("form",{onSubmit:Y,children:[i(h,{children:[a(p,{htmlFor:"name",children:"Full Name"}),a(f,{type:"text",id:"name",name:"name",value:c.name,onChange:u,required:!0})]}),i(h,{children:[a(p,{htmlFor:"email",children:"Email Address"}),a(f,{type:"email",id:"email",name:"email",value:c.email,onChange:u,required:!0,disabled:C==="edit"})]}),i(h,{children:[a(p,{htmlFor:"contactNumber",children:"Contact Number"}),a(f,{type:"text",id:"contactNumber",name:"contactNumber",value:c.contactNumber,onChange:u,required:!0})]}),i(h,{children:[a(p,{htmlFor:"department",children:"Department"}),i(z,{id:"department",name:"department",value:c.department,onChange:u,required:!0,children:[a("option",{value:"",children:"Select Department"}),b.map(t=>a("option",{value:t._id,children:t.name},t._id))]})]}),i(h,{children:[a(p,{htmlFor:"specialty",children:"Specialty"}),a(f,{type:"text",id:"specialty",name:"specialty",value:c.specialty,onChange:u,required:!0})]}),i(h,{children:[a(p,{htmlFor:"licenseNumber",children:"License Number"}),a(f,{type:"text",id:"licenseNumber",name:"licenseNumber",value:c.licenseNumber,onChange:u,required:!0})]}),i(h,{children:[a(p,{htmlFor:"consultationFee",children:"Consultation Fee ($)"}),a(f,{type:"number",id:"consultationFee",name:"consultationFee",value:c.consultationFee,onChange:u,min:"0"})]}),i(h,{children:[a(p,{htmlFor:"bio",children:"Bio"}),a(Ce,{id:"bio",name:"bio",value:c.bio,onChange:u})]}),i(h,{children:[a(p,{htmlFor:"education",children:"Education"}),a(f,{type:"text",id:"education",name:"education",value:c.education,onChange:u})]}),i(h,{children:[a(p,{htmlFor:"experience",children:"Experience (years)"}),a(f,{type:"number",id:"experience",name:"experience",value:c.experience,onChange:u,min:"0"})]}),i(h,{children:[a(p,{htmlFor:"profileImage",children:"Profile Image URL"}),a(f,{type:"text",id:"profileImage",name:"profileImage",value:c.profileImage,onChange:u,placeholder:"https://example.com/image.jpg"})]}),a(h,{children:i(p,{children:[a("input",{type:"checkbox",name:"isActive",checked:c.isActive,onChange:u})," ","Active"]})}),i(Ne,{children:[a($,{variant:"secondary",type:"button",onClick:A,children:"Cancel"}),a($,{type:"submit",children:C==="add"?"Add Doctor":"Save Changes"})]})]})]})})]})};export{Le as default};
//# sourceMappingURL=ManageDoctors-fedad15c.js.map
