import{u as te,j as r,a as t,M as re,J as ie,S as N,a1 as I,O as ne,a0 as oe,P as ae,b as ce,B as M}from"./index-c3da158f.js";import{s as n,u as se,r as c,m as le}from"./vendor-3ba6fd3e.js";import{C as de}from"./Card-66c37868.js";import{B as f}from"./Button-d4df2000.js";import{I as m}from"./Input-bfc5420b.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const he=n.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
`,me=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing(2)};
`,pe=n.div`
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  width: 300px;
  border: 1px solid #e2e8f0;

  svg {
    color: ${e=>e.theme.colors.text.secondary};
    margin-right: ${e=>e.theme.spacing(1)};
  }

  input {
    border: none;
    background: transparent;
    flex: 1;
    color: ${e=>e.theme.colors.text.primary};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${e=>e.theme.colors.text.disabled};
    }
  }
`,ue=n.div`
  display: flex;
  border-bottom: 1px solid ${e=>e.theme.colors.background.card};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,q=n.button`
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${e=>e.$active?e.theme.colors.primary.main:"transparent"};
  color: ${e=>e.$active?e.theme.colors.primary.main:e.theme.colors.text.secondary};
  font-weight: ${e=>e.$active?600:400};
  cursor: pointer;
  transition: all ${e=>e.theme.transitions.default};

  &:hover {
    color: ${e=>e.theme.colors.primary.main};
  }
`,ge=n.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,fe=n(de)`
  display: flex;
  flex-direction: column;
  transition: transform ${e=>e.theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`,ye=n.div`
  display: flex;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(2)};
`,xe=n.div`
  width: 50px;
  height: 50px;
  border-radius: ${e=>e.theme.borderRadius.circle};
  background-color: ${e=>e.theme.colors.primary.main}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${e=>e.theme.spacing(2)};

  svg {
    font-size: 24px;
    color: ${e=>e.theme.colors.primary.main};
  }
`,be=n.div`
  flex: 1;
`,ve=n.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`,ke=n.span`
  font-size: 14px;
  color: ${e=>e.theme.colors.text.secondary};
`,$e=n.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
`,C=n.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(1)} 0;
  border-bottom: 1px solid ${e=>e.theme.colors.background.card};

  &:last-child {
    border-bottom: none;
  }
`,w=n.span`
  font-size: 14px;
  color: ${e=>e.theme.colors.text.secondary};
`,S=n.span`
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.theme.colors.text.primary};
`,Ce=n.div`
  display: inline-block;
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 12px;
  font-weight: 600;

  &.high {
    background-color: ${e=>e.theme.colors.status.success}20;
    color: ${e=>e.theme.colors.status.success};
  }

  &.medium {
    background-color: ${e=>e.theme.colors.status.warning}20;
    color: ${e=>e.theme.colors.status.warning};
  }

  &.low {
    background-color: ${e=>e.theme.colors.status.error}20;
    color: ${e=>e.theme.colors.status.error};
  }
`,we=n.div`
  display: flex;
  justify-content: space-between;
`,Se=n.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;

  svg {
    animation: spin 1s linear infinite;
    font-size: 2rem;
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
`,B=n.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.status.error};
  background-color: ${e=>e.theme.colors.status.errorLight};
  border-radius: ${e=>e.theme.borderRadius.medium};
  margin: ${e=>e.theme.spacing(3)} 0;
`,Me=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;
  color: ${e=>e.theme.colors.text.secondary};

  svg {
    font-size: 3rem;
    margin-bottom: ${e=>e.theme.spacing(2)};
    color: ${e=>e.theme.colors.text.disabled};
  }

  h3 {
    margin-bottom: ${e=>e.theme.spacing(1)};
  }
`,O=n.div`
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
`,Y=n.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`,G=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    font-size: 20px;
  }
`,H=n.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`,d=n.div`
  margin-bottom: 16px;
  padding: 0 24px;
`,P=n.div`
  display: flex;
  gap: 16px;

  ${d} {
    flex: 1;
  }
`,h=n.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`,Fe=n.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  input {
    margin: 0;
  }
`,U=n.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #eee;

  button {
    min-width: 100px;
  }

  .spin {
    animation: spin 1s linear infinite;
    margin-right: 8px;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`,De=({isOpen:e,onClose:v,medication:a,onSave:A})=>{const[o,p]=c.useState({name:"",category:"",dosage:"",form:"",stock:0,price:0,manufacturer:"",expiryDate:"",description:"",sideEffects:"",prescriptionRequired:!0}),[u,y]=c.useState(!1),[F,k]=c.useState(null);c.useEffect(()=>{p(a?{name:a.name||"",category:a.category||"",dosage:a.dosage||"",form:a.form||"",stock:a.stock||0,price:a.price||0,manufacturer:a.manufacturer||"",expiryDate:a.expiryDate||"",description:a.description||"",sideEffects:a.sideEffects||"",prescriptionRequired:a.prescriptionRequired||!0}:{name:"",category:"",dosage:"",form:"",stock:0,price:0,manufacturer:"",expiryDate:"",description:"",sideEffects:"",prescriptionRequired:!0})},[a,e]);const s=D=>{const{name:g,value:E,type:x,checked:z}=D.target;p({...o,[g]:x==="checkbox"?z:x==="number"?parseFloat(E):E})},$=async D=>{D.preventDefault(),y(!0),k(null);try{const g=a?await M.updateMedication(a.id,o):await M.addMedication(o);A(g),v()}catch(g){console.error("Error saving medication:",g),k(g.message||"Failed to save medication")}finally{y(!1)}};return e?t(O,{children:r(Y,{children:[r(G,{children:[t("h2",{children:a?"Edit Medication":"Add New Medication"}),t(H,{onClick:v,children:"×"})]}),r("form",{onSubmit:$,children:[F&&t(B,{children:F}),r(d,{children:[t(h,{htmlFor:"name",children:"Name*"}),t(m,{id:"name",name:"name",value:o.name,onChange:s,required:!0})]}),r(P,{children:[r(d,{children:[t(h,{htmlFor:"category",children:"Category*"}),t(m,{id:"category",name:"category",value:o.category,onChange:s,required:!0})]}),r(d,{children:[t(h,{htmlFor:"dosage",children:"Dosage*"}),t(m,{id:"dosage",name:"dosage",value:o.dosage,onChange:s,required:!0})]})]}),r(P,{children:[r(d,{children:[t(h,{htmlFor:"form",children:"Form*"}),t(m,{id:"form",name:"form",value:o.form,onChange:s,required:!0})]}),r(d,{children:[t(h,{htmlFor:"manufacturer",children:"Manufacturer"}),t(m,{id:"manufacturer",name:"manufacturer",value:o.manufacturer,onChange:s})]})]}),r(P,{children:[r(d,{children:[t(h,{htmlFor:"stock",children:"Stock Quantity*"}),t(m,{id:"stock",name:"stock",type:"number",min:"0",value:o.stock,onChange:s,required:!0})]}),r(d,{children:[t(h,{htmlFor:"price",children:"Price ($)*"}),t(m,{id:"price",name:"price",type:"number",min:"0",step:"0.01",value:o.price,onChange:s,required:!0})]})]}),r(d,{children:[t(h,{htmlFor:"expiryDate",children:"Expiry Date"}),t(m,{id:"expiryDate",name:"expiryDate",placeholder:"MM/YYYY",value:o.expiryDate,onChange:s})]}),r(d,{children:[t(h,{htmlFor:"description",children:"Description"}),t("textarea",{id:"description",name:"description",rows:"3",value:o.description,onChange:s,style:{width:"100%",padding:"8px",borderRadius:"4px",border:"1px solid #ddd"}})]}),r(d,{children:[t(h,{htmlFor:"sideEffects",children:"Side Effects"}),t(m,{id:"sideEffects",name:"sideEffects",value:o.sideEffects,onChange:s})]}),t(d,{children:r(Fe,{children:[t("input",{type:"checkbox",name:"prescriptionRequired",checked:o.prescriptionRequired,onChange:s}),"Prescription Required"]})}),r(U,{children:[t(f,{type:"button",variant:"secondary",onClick:v,children:"Cancel"}),t(f,{type:"submit",disabled:u,children:u?r(ce,{children:[t(N,{className:"spin"})," Saving..."]}):a?"Update Medication":"Add Medication"})]})]})]})}):null},Le=()=>{const{user:e}=te(),v=se(),[a,A]=c.useState(""),[o,p]=c.useState("all"),[u,y]=c.useState([]),[F,k]=c.useState(!1),[s,$]=c.useState(null),[D,g]=c.useState([]),[E,x]=c.useState(!1),[z,R]=c.useState(null),[J,j]=c.useState(!1),[b,L]=c.useState(null);c.useEffect(()=>{(async()=>{k(!0),$(null);try{const l={};if(a&&(l.search=a),o==="low-stock")l.stockStatus="low";else if(o!=="all"){const T={antibiotics:"Antibiotic",cardiovascular:{$in:["Antihypertensive","Statin"]}};T[o]&&(l.category=T[o])}const ee=await M.getMedications(l);y(ee)}catch(l){console.error("Error fetching medications:",l),$("Failed to load medications. Please try again.")}finally{k(!1)}})()},[a,o]),c.useEffect(()=>{(async()=>{try{const l=await M.getMedicationCategories();g(l)}catch(l){console.error("Error fetching categories:",l)}})()},[]);const Q=i=>{switch(i){case"high":return"In Stock";case"medium":return"Limited Stock";case"low":return"Low Stock";default:return"Unknown"}},V=()=>{R(null),x(!0)},W=i=>{R(i),x(!0)},K=i=>{L(i),j(!0)},X=async()=>{if(b)try{await M.deleteMedication(b.id),y(u.filter(i=>i.id!==b.id)),j(!1),L(null)}catch(i){console.error("Error deleting medication:",i),$("Failed to delete medication")}},Z=i=>{y(z?u.map(l=>l.id===i.id?i:l):[...u,i])},_=()=>{v("/dashboard/patients")};return r(he,{children:[r(me,{children:[t("h2",{children:"Pharmacy Inventory"}),r(pe,{children:[t(re,{}),t("input",{type:"text",placeholder:"Search medications...",value:a,onChange:i=>A(i.target.value)})]}),r(f,{variant:"primary",onClick:V,children:[t(ie,{}),"Add Medication"]})]}),r(ue,{children:[t(q,{$active:o==="all",onClick:()=>p("all"),children:"All Medications"}),t(q,{$active:o==="low-stock",onClick:()=>p("low-stock"),children:"Low Stock"}),t(q,{$active:o==="antibiotics",onClick:()=>p("antibiotics"),children:"Antibiotics"}),t(q,{$active:o==="cardiovascular",onClick:()=>p("cardiovascular"),children:"Cardiovascular"})]}),F?t(Se,{children:t(N,{})}):s?t(B,{children:s}):u.length===0?r(Me,{children:[t(I,{}),t("h3",{children:"No medications found"}),t("p",{children:"Try adjusting your search or filters"})]}):t(ge,{children:u.map(i=>r(fe,{as:le.div,initial:{opacity:0,y:20},animate:{opacity:1,y:0},children:[r(ye,{children:[t(xe,{children:t(I,{})}),r(be,{children:[t(ve,{children:i.name}),t(ke,{children:i.category})]})]}),r($e,{children:[r(C,{children:[t(w,{children:"Dosage"}),t(S,{children:i.dosage})]}),r(C,{children:[t(w,{children:"Form"}),t(S,{children:i.form})]}),r(C,{children:[t(w,{children:"Stock"}),r(S,{children:[i.stock," units"," ",t(Ce,{className:i.stockStatus,children:Q(i.stockStatus)})]})]}),r(C,{children:[t(w,{children:"Price"}),r(S,{children:["$",parseFloat(i.price).toFixed(2)]})]}),r(C,{children:[t(w,{children:"Expiry"}),t(S,{children:i.expiryDate})]})]}),r(we,{children:[r(f,{variant:"secondary",size:"small",onClick:()=>W(i),children:[t(ne,{})," Edit"]}),(e==null?void 0:e.role)==="doctor"&&r(f,{variant:"accent",size:"small",onClick:_,children:[t(oe,{})," Prescribe"]}),r(f,{variant:"danger",size:"small",onClick:()=>K(i),children:[t(ae,{})," Delete"]})]})]},i.id))}),t(De,{isOpen:E,onClose:()=>x(!1),medication:z,onSave:Z}),J&&t(O,{children:r(Y,{style:{maxWidth:"400px"},children:[r(G,{children:[t("h2",{children:"Confirm Delete"}),t(H,{onClick:()=>j(!1),children:"×"})]}),r("div",{style:{padding:"24px"},children:[r("p",{children:["Are you sure you want to delete ",b==null?void 0:b.name,"?"]}),t("p",{children:"This action cannot be undone."})]}),r(U,{children:[t(f,{variant:"secondary",onClick:()=>j(!1),children:"Cancel"}),t(f,{variant:"danger",onClick:X,children:"Delete"})]})]})})]})};export{Le as default};
//# sourceMappingURL=Pharmacy-515a9e85.js.map
