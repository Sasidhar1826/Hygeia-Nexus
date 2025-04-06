import{u as be,j as a,a as t,m as xe,a6 as Se,F as $e,ae as we,f as Y,l as w,t as J,af as Ce,d as Ae,i as ke,ag as Fe,k as Pe,s as K}from"./index-c3da158f.js";import{s as n,m as p,r as i,u as Ne,A as Be,e as Le}from"./vendor-3ba6fd3e.js";import"./animations-c827faa9.js";const qe=n.div`
  display: flex;
  min-height: 100vh;
  background-color: ${e=>e.theme.colors.background.default};
`,Re=n.div`
  flex: 1;
  background-image: url("/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  display: none;

  @media (min-width: 992px) {
    display: block;
  }
`,je=n.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing(4)};
`,Ee=n(p.div)`
  width: 100%;
  max-width: 500px;
  padding: ${e=>e.theme.spacing(4)};
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.large};
  box-shadow: ${e=>e.theme.shadows.large};
  overflow: hidden;
`,Ie=n.h1`
  font-size: 1.75rem;
  margin-bottom: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.primary.main};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`,F=n.h2`
  font-size: 1.25rem;
  margin-bottom: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.text.primary};
`,ze=n.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
`,P=n.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${e=>e.active?e.theme.colors.primary.main:e.completed?e.theme.colors.primary.light:e.theme.colors.background.default};
  color: ${e=>e.active||e.completed?"white":e.theme.colors.text.secondary};
  font-weight: bold;
  margin: 0 ${e=>e.theme.spacing(1)};
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -20px;
    transform: translateY(-50%);
    width: 20px;
    height: 3px;
    background-color: ${e=>e.completed?e.theme.colors.primary.light:e.theme.colors.background.default};
  }
`,o=n.div`
  margin-bottom: ${e=>e.theme.spacing(3)};
`,N=n.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};

  @media (max-width: 576px) {
    flex-direction: column;
  }
`,l=n.label`
  display: block;
  margin-bottom: ${e=>e.theme.spacing(1)};
  font-weight: 500;
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,s=n.div`
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus-within {
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.main}20;
  }

  svg {
    margin-right: ${e=>e.theme.spacing(1.5)};
    color: ${e=>e.theme.colors.text.secondary};
  }

  input,
  select {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: ${e=>e.theme.colors.text.primary};

    &:focus {
      outline: none;
    }
  }
`,De=n.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${e=>e.theme.spacing(4)};
`,L=n(p.button)`
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.secondary?"transparent":e.theme.colors.primary.main};
  color: ${e=>e.secondary?e.theme.colors.text.primary:"white"};
  border: ${e=>e.secondary?`1px solid ${e.theme.colors.border}`:"none"};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  &:hover {
    background-color: ${e=>e.secondary?e.theme.colors.background.default:e.theme.colors.primary.light};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,Me=n(L)`
  width: 100%;
  justify-content: center;
`,Ge=n.div`
  color: ${e=>e.theme.colors.status.error};
  margin-bottom: ${e=>e.theme.spacing(2)};
  font-size: 0.9rem;
`,Oe=n.div`
  text-align: center;
  margin-top: ${e=>e.theme.spacing(3)};
  font-size: 0.9rem;

  a {
    color: ${e=>e.theme.colors.primary.main};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`,d=n.span`
  color: ${e=>e.theme.colors.status.error};
  margin-left: ${e=>e.theme.spacing(.5)};
`,B={initial:e=>({x:e>0?"100%":"-100%",opacity:0}),animate:{x:0,opacity:1,transition:{x:{type:"spring",stiffness:300,damping:30},opacity:{duration:.2}}},exit:e=>({x:e>0?"-100%":"100%",opacity:0,transition:{x:{type:"spring",stiffness:300,damping:30},opacity:{duration:.2}}})},Ue=()=>{const[e,q]=i.useState(1),[g,R]=i.useState(0),[j,c]=i.useState(""),[E,I]=i.useState(!1),[f,Q]=i.useState(""),[u,W]=i.useState(""),[C,X]=i.useState(""),[v,Z]=i.useState(""),[y,_]=i.useState(""),[A,ee]=i.useState(""),[k,te]=i.useState(""),[b,ae]=i.useState(""),[x,re]=i.useState(""),[z,ie]=i.useState(""),[S,ne]=i.useState(""),[$,oe]=i.useState(""),[D,le]=i.useState(""),[M,se]=i.useState(""),[G,ce]=i.useState(""),[O,de]=i.useState(""),{signup:he}=be(),ue=Ne(),me=()=>{T()&&(R(1),q(e+1))},pe=()=>{R(-1),q(e-1)},T=()=>{if(c(""),e===1){if(!f||!u||!C)return c("All fields are required"),!1;if(!/\S+@\S+\.\S+/.test(f))return c("Please enter a valid email address"),!1;if(u.length<6)return c("Password must be at least 6 characters long"),!1;if(u!==C)return c("Passwords do not match"),!1}else if(e===2){if(!v||!y||!A||!k||!b||!x)return c("All fields are required"),!1;if(!/^\d{10}$/.test(b))return c("Please enter a valid 10-digit phone number"),!1;if(!/^\d{12}$/.test(x))return c("Please enter a valid 12-digit Aadhaar number"),!1}return!0},ge=async r=>{var V,H;if(r.preventDefault(),c(""),!!T()){I(!0);try{const m=`${v} ${y}`.trim(),ve=typeof S=="string"?S.split(",").map(h=>h.trim()).filter(h=>h!==""):S||[],ye=typeof $=="string"?$.split(",").map(h=>h.trim()).filter(h=>h!==""):$||[],U={name:m,email:f,password:u,firstName:v,lastName:y,gender:A,dateOfBirth:k,phoneNumber:b,aadhaarNumber:x,bloodGroup:z,allergies:ve,existingConditions:ye,address:{street:D,city:M,state:G,pincode:O},role:"patient"};console.log("Submitting patient signup data:",{...U,password:"[REDACTED]"}),await he(U),ue("/dashboard")}catch(m){console.error("Patient signup error:",m),c(((H=(V=m.response)==null?void 0:V.data)==null?void 0:H.message)||m.message||"Registration failed. Please try again.")}finally{I(!1)}}},fe=()=>{switch(e){case 1:return a(p.div,{custom:g,variants:B,initial:"initial",animate:"animate",exit:"exit",children:[t(F,{children:"Account Information"}),a(o,{children:[a(l,{children:["Email Address ",t(d,{children:"*"})]}),a(s,{children:[t(Pe,{}),t("input",{type:"email",id:"email",name:"email",placeholder:"email@example.com",value:f,onChange:r=>Q(r.target.value),required:!0})]})]}),a(o,{children:[a(l,{children:["Password ",t(d,{children:"*"})]}),a(s,{children:[t(K,{}),t("input",{type:"password",id:"password",name:"password",placeholder:"At least 6 characters",value:u,onChange:r=>W(r.target.value),required:!0})]})]}),a(o,{children:[a(l,{children:["Confirm Password ",t(d,{children:"*"})]}),a(s,{children:[t(K,{}),t("input",{type:"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Repeat your password",value:C,onChange:r=>X(r.target.value),required:!0})]})]})]},"step1");case 2:return a(p.div,{custom:g,variants:B,initial:"initial",animate:"animate",exit:"exit",children:[t(F,{children:"Personal Information"}),a(N,{children:[a(o,{children:[a(l,{children:["First Name ",t(d,{children:"*"})]}),a(s,{children:[t(J,{}),t("input",{type:"text",id:"firstName",name:"firstName",placeholder:"First Name",value:v,onChange:r=>Z(r.target.value),required:!0})]})]}),a(o,{children:[a(l,{children:["Last Name ",t(d,{children:"*"})]}),a(s,{children:[t(J,{}),t("input",{type:"text",id:"lastName",name:"lastName",placeholder:"Last Name",value:y,onChange:r=>_(r.target.value),required:!0})]})]})]}),a(N,{children:[a(o,{children:[a(l,{children:["Gender ",t(d,{children:"*"})]}),a(s,{children:[t(Ce,{}),a("select",{value:A,onChange:r=>ee(r.target.value),required:!0,children:[t("option",{value:"",children:"Select gender"}),t("option",{value:"male",children:"Male"}),t("option",{value:"female",children:"Female"}),t("option",{value:"other",children:"Other"})]})]})]}),a(o,{children:[a(l,{children:["Date of Birth ",t(d,{children:"*"})]}),a(s,{children:[t(Ae,{}),t("input",{type:"date",value:k,onChange:r=>te(r.target.value),required:!0})]})]})]}),a(o,{children:[a(l,{children:["Phone Number ",t(d,{children:"*"})]}),a(s,{children:[t(ke,{}),t("input",{type:"tel",placeholder:"10-digit mobile number",value:b,onChange:r=>ae(r.target.value),required:!0})]})]}),a(o,{children:[a(l,{children:["Aadhaar Number ",t(d,{children:"*"})]}),a(s,{children:[t(Fe,{}),t("input",{type:"text",placeholder:"12-digit Aadhaar number",value:x,onChange:r=>re(r.target.value),required:!0})]})]})]},"step2");case 3:return a(p.div,{custom:g,variants:B,initial:"initial",animate:"animate",exit:"exit",children:[t(F,{children:"Medical & Address Information"}),a(o,{children:[t(l,{children:"Blood Group"}),a(s,{children:[t(we,{}),a("select",{value:z,onChange:r=>ie(r.target.value),children:[t("option",{value:"",children:"Select blood group"}),t("option",{value:"A+",children:"A+"}),t("option",{value:"A-",children:"A-"}),t("option",{value:"B+",children:"B+"}),t("option",{value:"B-",children:"B-"}),t("option",{value:"AB+",children:"AB+"}),t("option",{value:"AB-",children:"AB-"}),t("option",{value:"O+",children:"O+"}),t("option",{value:"O-",children:"O-"})]})]})]}),a(o,{children:[t(l,{children:"Allergies (if any)"}),a(s,{children:[t(Y,{}),t("input",{type:"text",placeholder:"Separate with commas",value:S,onChange:r=>ne(r.target.value)})]})]}),a(o,{children:[t(l,{children:"Existing Medical Conditions (if any)"}),a(s,{children:[t(Y,{}),t("input",{type:"text",placeholder:"Separate with commas",value:$,onChange:r=>oe(r.target.value)})]})]}),a(o,{children:[t(l,{children:"Address"}),a(s,{children:[t(w,{}),t("input",{type:"text",placeholder:"Street address",value:D,onChange:r=>le(r.target.value)})]})]}),a(N,{children:[a(o,{children:[t(l,{children:"City"}),a(s,{children:[t(w,{}),t("input",{type:"text",placeholder:"City",value:M,onChange:r=>se(r.target.value)})]})]}),a(o,{children:[t(l,{children:"State"}),a(s,{children:[t(w,{}),t("input",{type:"text",placeholder:"State",value:G,onChange:r=>ce(r.target.value)})]})]})]}),a(o,{children:[t(l,{children:"Pincode"}),a(s,{children:[t(w,{}),t("input",{type:"text",placeholder:"Pincode",value:O,onChange:r=>de(r.target.value)})]})]})]},"step3");default:return null}};return a(qe,{children:[t(Re,{}),t(je,{children:a(Ee,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:[a(Ie,{children:[t(xe,{style:{marginRight:"10px"}}),"Patient Registration"]}),a(ze,{children:[t(P,{active:e===1,completed:e>1,children:"1"}),t(P,{active:e===2,completed:e>2,children:"2"}),t(P,{active:e===3,completed:e>3,children:"3"})]}),j&&t(Ge,{children:j}),a("form",{onSubmit:e===3?ge:r=>r.preventDefault(),children:[t(Be,{mode:"wait",custom:g,children:fe()}),a(De,{children:[e>1&&a(L,{type:"button",secondary:!0,onClick:pe,whileTap:{scale:.95},children:[t(Se,{}),"Back"]}),e<3?a(L,{type:"button",onClick:me,style:{marginLeft:e>1?"0":"auto"},whileTap:{scale:.95},children:["Next",t($e,{})]}):t(Me,{type:"submit",disabled:E,whileTap:{scale:.95},children:E?"Creating Account...":"Complete Registration"})]})]}),a(Oe,{children:["Already have an account? ",t(Le,{to:"/login",children:"Login"})]})]})})]})};export{Ue as default};
//# sourceMappingURL=PatientSignup-4d86d61a.js.map
