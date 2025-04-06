import{B as u,j as o,a,M as J,J as Q,b as v,y as z,Q as N,O as U,P as K}from"./index-c3da158f.js";import{s as r,m as L,r as i}from"./vendor-3ba6fd3e.js";import{C as V}from"./Card-66c37868.js";import{B as g}from"./Button-d4df2000.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const W=r.div`
  padding: ${e=>e.theme.spacing(3)};
`,X=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing(2)};
`,Y=r.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
`,Z=r.div`
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
`,ee=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,te=r(V)`
  display: flex;
  flex-direction: column;
  height: 100%;
`,ae=r.div`
  height: 150px;
  background-image: url(${e=>e.image||"https://via.placeholder.com/300x150?text=Department"});
  background-size: cover;
  background-position: center;
  border-top-left-radius: ${e=>e.theme.borderRadius.medium};
  border-top-right-radius: ${e=>e.theme.borderRadius.medium};
`,oe=r.div`
  padding: ${e=>e.theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
`,re=r.h2`
  font-size: 1.2rem;
  margin-bottom: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.primary};
`,ne=r.div`
  display: inline-flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.8rem;
  margin-bottom: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.active?e.theme.colors.status.success+"20":e.theme.colors.status.error+"20"};
  color: ${e=>e.active?e.theme.colors.status.success:e.theme.colors.status.error};

  svg {
    margin-right: ${e=>e.theme.spacing(.5)};
  }
`,ie=r.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(2)};
  flex: 1;
`,ce=r.div`
  display: flex;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: auto;
`,se=r.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${e=>e.theme.colors.text.secondary};
`,de=r(L.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${e=>e.theme.zIndex.modal};
  padding: ${e=>e.theme.spacing(3)};
`,le=r(L.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(4)};
  width: 100%;
  max-width: 500px;
  box-shadow: ${e=>e.theme.shadows.large};
`,me=r.h2`
  font-size: 1.5rem;
  margin-bottom: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.text.primary};
`,h=r.div`
  margin-bottom: ${e=>e.theme.spacing(3)};
`,p=r.label`
  display: block;
  margin-bottom: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.secondary};
`,b=r.input`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,he=r.textarea`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,pe=r.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(4)};
`,$e=()=>{const[e,f]=i.useState([]),[S,l]=i.useState([]),[y,_]=i.useState(""),[j,D]=i.useState(!0),[ue,x]=i.useState(null),[R,$]=i.useState(!1),[C,A]=i.useState("add"),[F,k]=i.useState(null),[s,w]=i.useState({name:"",description:"",image:"",headDoctor:"",location:"",contactNumber:"",consultationFee:""}),[ge,T]=i.useState([]);i.useEffect(()=>{P(),I()},[]),i.useEffect(()=>{if(y.trim()==="")l(e);else{const t=e.filter(n=>n.name.toLowerCase().includes(y.toLowerCase())||n.description.toLowerCase().includes(y.toLowerCase()));l(t)}},[y,e]);const P=async()=>{try{D(!0);const t=await u.getDepartments();f(t),l(t),D(!1)}catch(t){console.error("Error fetching departments:",t),x("Failed to load departments. Please try again later."),D(!1)}},I=async()=>{try{const t=await u.getDoctors();T(t)}catch(t){console.error("Error fetching doctors:",t)}},B=()=>{A("add"),w({name:"",description:"",image:"",headDoctor:"",location:"",contactNumber:"",consultationFee:""}),$(!0)},O=t=>{A("edit"),k(t),w({name:t.name,description:t.description,image:t.image||"",headDoctor:t.headDoctor||"",location:t.location||"",contactNumber:t.contactNumber||"",consultationFee:t.consultationFee||""}),$(!0)},E=()=>{$(!1),k(null)},m=t=>{const{name:n,value:c}=t.target;w(d=>({...d,[n]:c}))},q=async t=>{t.preventDefault();try{if(C==="add"){const n={...s,isActive:!0},c=await u.createDepartment(n);f([...e,c]),l([...S,c])}else{const n={...s,isActive:F.isActive},c=await u.updateDepartment(F._id,n),d=e.map(M=>M._id===F._id?c:M);f(d),l(d)}E()}catch(n){console.error("Error saving department:",n),x("Failed to save department. Please try again.")}},G=async t=>{try{await u.deleteDepartment(t);const n=e.filter(c=>c._id!==t);f(n),l(n)}catch(n){console.error("Error deleting department:",n),x("Failed to delete department. Please try again.")}},H=async t=>{try{const n={...t,isActive:!t.isActive};await u.updateDepartment(t._id,n);const c=e.map(d=>d._id===t._id?{...d,isActive:!d.isActive}:d);f(c),l(c)}catch(n){console.error("Error updating department status:",n),x("Failed to update department status. Please try again.")}};return o(W,{children:[o(X,{children:[a(Y,{children:"Manage Departments"}),o("div",{style:{display:"flex",gap:"16px"},children:[o(Z,{children:[a(J,{}),a("input",{type:"text",placeholder:"Search departments...",value:y,onChange:t=>_(t.target.value)})]}),o(g,{onClick:B,children:[a(Q,{}),"Add Department"]})]})]}),j?a(se,{children:"Loading departments..."}):a(ee,{children:S.map(t=>o(te,{children:[a(ae,{image:t.image}),o(oe,{children:[a(re,{children:t.name}),a(ne,{active:t.isActive,children:t.isActive?o(v,{children:[a(z,{}),"Active"]}):o(v,{children:[a(N,{}),"Inactive"]})}),a(ie,{children:t.description}),o(ce,{children:[o(g,{variant:"secondary",size:"small",onClick:()=>O(t),children:[a(U,{}),"Edit"]}),a(g,{variant:t.isActive?"warning":"success",size:"small",onClick:()=>H(t),children:t.isActive?o(v,{children:[a(N,{}),"Deactivate"]}):o(v,{children:[a(z,{}),"Activate"]})}),o(g,{variant:"danger",size:"small",onClick:()=>G(t._id),children:[a(K,{}),"Delete"]})]})]})]},t._id))}),R&&a(de,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:o(le,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.1},children:[a(me,{children:C==="add"?"Add New Department":"Edit Department"}),o("form",{onSubmit:q,children:[o(h,{children:[a(p,{htmlFor:"name",children:"Department Name"}),a(b,{type:"text",id:"name",name:"name",value:s.name,onChange:m,required:!0})]}),o(h,{children:[a(p,{htmlFor:"description",children:"Description"}),a(he,{id:"description",name:"description",value:s.description,onChange:m,required:!0})]}),o(h,{children:[a(p,{htmlFor:"image",children:"Image URL"}),a(b,{type:"text",id:"image",name:"image",value:s.image,onChange:m,placeholder:"https://example.com/image.jpg"})]}),o(h,{children:[a(p,{htmlFor:"headDoctor",children:"Head Doctor"}),a(b,{type:"text",id:"headDoctor",name:"headDoctor",value:s.headDoctor,onChange:m,placeholder:"Enter head doctor's name"})]}),o(h,{children:[a(p,{htmlFor:"location",children:"Location"}),a(b,{type:"text",id:"location",name:"location",value:s.location,onChange:m,placeholder:"Enter department location"})]}),o(h,{children:[a(p,{htmlFor:"contactNumber",children:"Contact Number"}),a(b,{type:"text",id:"contactNumber",name:"contactNumber",value:s.contactNumber,onChange:m,placeholder:"Enter department contact number"})]}),o(h,{children:[a(p,{htmlFor:"consultationFee",children:"Consultation Fee"}),a(b,{type:"text",id:"consultationFee",name:"consultationFee",value:s.consultationFee,onChange:m,placeholder:"Enter consultation fee"})]}),o(pe,{children:[a(g,{variant:"secondary",type:"button",onClick:E,children:"Cancel"}),a(g,{type:"submit",children:C==="add"?"Add Department":"Save Changes"})]})]})]})})]})};export{$e as default};
//# sourceMappingURL=ManageDepartments-75617c08.js.map
