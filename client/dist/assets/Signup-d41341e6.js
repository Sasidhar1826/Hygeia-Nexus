import{u as J,j as a,a as t,m as Q,n as V,t as W,k as X,s as N,o as A,b as R,v as g,p as Y}from"./index-c3da158f.js";import{s as o,m as x,r as n,u as Z,e as P}from"./vendor-3ba6fd3e.js";import"./animations-c827faa9.js";const _=o.div`
  display: flex;
  height: 100vh;
  background-color: ${e=>e.theme.colors.background.default};
`,ee=o.div`
  flex: 1;
  background-image: url("/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`,te=o.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing(4)};
`,re=o(x.form)`
  width: 100%;
  max-width: 450px;
  padding: ${e=>e.theme.spacing(4)};
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.large};
  box-shadow: ${e=>e.theme.shadows.large};
`,ae=o.h1`
  font-size: 2rem;
  margin-bottom: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.primary.main};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`,s=o.div`
  margin-bottom: ${e=>e.theme.spacing(3)};
`,l=o.div`
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.background.default};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};

  svg {
    margin-right: ${e=>e.theme.spacing(1.5)};
    color: ${e=>e.theme.colors.text.secondary};
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 1rem;
    color: ${e=>e.theme.colors.text.primary};

    &:focus {
      outline: none;
    }
  }
`,ie=o(l)`
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
`,ne=o(x.button)`
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

  &:hover {
    background-color: ${e=>e.theme.colors.primary.light};
  }

  &:disabled {
    background-color: ${e=>e.theme.colors.text.disabled};
    cursor: not-allowed;
  }
`,oe=o.div`
  color: ${e=>e.theme.colors.status.error};
  margin-bottom: ${e=>e.theme.spacing(2)};
  font-size: 0.9rem;
`,se=o.div`
  background-color: ${e=>e.theme.colors.primary.main}20;
  border-left: 4px solid ${e=>e.theme.colors.primary.main};
  color: ${e=>e.theme.colors.text.primary};
  padding: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.9rem;

  a {
    color: ${e=>e.theme.colors.primary.main};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`,le=o.div`
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
`,ce=o.div`
  display: flex;
  align-items: center;
  margin: ${e=>e.theme.spacing(3)} 0;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${e=>e.theme.colors.border};
  }

  span {
    padding: 0 ${e=>e.theme.spacing(1)};
    color: ${e=>e.theme.colors.text.secondary};
    font-size: 0.9rem;
  }
`,de=o(x.button)`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  background-color: ${e=>e.theme.colors.background.paper};
  color: ${e=>e.theme.colors.primary.main};
  border: 1px solid ${e=>e.theme.colors.primary.main};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.spacing(1)};
  margin-bottom: ${e=>e.theme.spacing(3)};

  &:hover {
    background-color: ${e=>e.theme.colors.primary.main}20;
  }
`,fe=()=>{const[e,q]=n.useState(""),[h,L]=n.useState(""),[p,T]=n.useState(""),[f,j]=n.useState(""),[i,E]=n.useState("doctor"),[S,d]=n.useState(""),[w,m]=n.useState(!1),[k,K]=n.useState(""),[D,M]=n.useState(!1),[u,C]=n.useState(""),[b,U]=n.useState(""),[y,B]=n.useState(""),[v,G]=n.useState(""),[$,H]=n.useState(!0),{signup:O}=J(),F=Z();return n.useEffect(()=>{M(i==="admin"),H(i!=="receptionist"&&i!=="nurse")},[i]),a(_,{children:[t(ee,{}),t(te,{children:a(re,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},onSubmit:async r=>{var z,I;if(r.preventDefault(),d(""),m(!0),!e||!h||!p||!f){d("All fields are required"),m(!1);return}if(p!==f){d("Passwords do not match"),m(!1);return}if(p.length<6){d("Password must be at least 6 characters long"),m(!1);return}if(i==="doctor"&&(!b||!u)){d("Doctors must provide specialty and license number"),m(!1);return}if(i==="admin"&&!y){d("Administrators must provide a staff ID"),m(!1);return}if(i==="labtechnician"&&(!v||!u)){d("Lab technicians must provide specialization and license number"),m(!1);return}if(i==="admin"&&k!=="admin123"){d("Invalid admin key"),m(!1);return}try{console.log("Submitting staff signup data:",{name:e,email:h,role:i});const c={name:e,email:h,password:p,role:i};i==="doctor"?(c.specialty=b,c.licenseNumber=u):i==="admin"?c.staffId=y:i==="labtechnician"&&(c.specialization=v,c.licenseNumber=u),await O(c),F("/dashboard")}catch(c){console.error("Staff signup error:",c),d(((I=(z=c.response)==null?void 0:z.data)==null?void 0:I.message)||c.message||"Registration failed. Please try again.")}finally{m(!1)}},children:[a(ae,{children:[t(Q,{style:{marginRight:"10px"}}),"Staff Registration"]}),a(se,{children:["This registration is for hospital staff only. If you are a patient, please ",t(P,{to:"/patient-signup",children:"register here"}),"."]}),a(de,{type:"button",onClick:()=>{F("/patient-signup")},whileHover:{scale:1.02},whileTap:{scale:.98},children:[t(V,{})," Register as a Patient"]}),t(ce,{children:t("span",{children:"STAFF REGISTRATION"})}),t(s,{children:a(l,{children:[t(W,{}),t("input",{type:"text",id:"name",name:"name",placeholder:"Full Name",value:e,onChange:r=>q(r.target.value),required:!0})]})}),t(s,{children:a(l,{children:[t(X,{}),t("input",{type:"email",id:"email",name:"email",placeholder:"Email Address",value:h,onChange:r=>L(r.target.value),required:!0})]})}),t(s,{children:a(l,{children:[t(N,{}),t("input",{type:"password",id:"password",name:"password",placeholder:"Password",value:p,onChange:r=>T(r.target.value),required:!0})]})}),t(s,{children:a(l,{children:[t(N,{}),t("input",{type:"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Confirm Password",value:f,onChange:r=>j(r.target.value),required:!0})]})}),t(s,{children:a(ie,{children:[t(A,{}),a("select",{id:"role",name:"role",value:i,onChange:r=>E(r.target.value),required:!0,children:[t("option",{value:"doctor",children:"Doctor"}),t("option",{value:"labtechnician",children:"Lab Technician"}),t("option",{value:"nurse",children:"Nurse"}),t("option",{value:"receptionist",children:"Receptionist"}),t("option",{value:"admin",children:"Administrator"})]})]})}),$&&i==="doctor"&&a(R,{children:[t(s,{children:a(l,{children:[t(A,{}),t("input",{type:"text",id:"specialty",name:"specialty",placeholder:"Medical Specialty",value:b,onChange:r=>U(r.target.value),required:!0})]})}),t(s,{children:a(l,{children:[t(g,{}),t("input",{type:"text",id:"licenseNumber",name:"licenseNumber",placeholder:"License Number",value:u,onChange:r=>C(r.target.value),required:!0})]})})]}),$&&i==="labtechnician"&&a(R,{children:[t(s,{children:a(l,{children:[t(Y,{}),t("input",{type:"text",id:"specialization",name:"specialization",placeholder:"Specialization",value:v,onChange:r=>G(r.target.value),required:!0})]})}),t(s,{children:a(l,{children:[t(g,{}),t("input",{type:"text",id:"licenseNumber",name:"licenseNumber",placeholder:"License Number",value:u,onChange:r=>C(r.target.value),required:!0})]})})]}),$&&i==="admin"&&t(s,{children:a(l,{children:[t(g,{}),t("input",{type:"text",id:"staffId",name:"staffId",placeholder:"Staff ID",value:y,onChange:r=>B(r.target.value),required:!0})]})}),D&&t(s,{children:a(l,{children:[t(g,{}),t("input",{type:"password",id:"adminKey",name:"adminKey",placeholder:"Admin Registration Key",value:k,onChange:r=>K(r.target.value),required:!0})]})}),S&&t(oe,{children:S}),t(ne,{type:"submit",disabled:w,whileTap:{scale:.95},children:w?"Creating Account...":"Register as Staff"}),a(le,{children:["Already have an account? ",t(P,{to:"/login",children:"Login"})]})]})})]})};export{fe as default};
//# sourceMappingURL=Signup-d41341e6.js.map
