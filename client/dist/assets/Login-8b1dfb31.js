import{u as F,j as o,a as t,m as j,n as T,o as E,p as I,q as H,r as D,k as B,s as M}from"./index-c3da158f.js";import{s as a,m as g,r as n,u as U,b as q,e as A}from"./vendor-3ba6fd3e.js";import"./animations-c827faa9.js";const P=a.div`
  display: flex;
  height: 100vh;
`,N=a.div`
  flex: 1;
  background-image: url("/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`,O=a.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.theme.colors.background.default};
`,Y=a(g.form)`
  width: 100%;
  max-width: 400px;
  padding: ${e=>e.theme.spacing(4)};
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.medium};
`,G=a.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.primary.main};

  svg {
    font-size: 2rem;
    margin-right: ${e=>e.theme.spacing(1)};
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
`,J=a.h2`
  text-align: center;
  margin-bottom: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 1.5rem;
`,C=a.div`
  display: flex;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(2)};
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.default};

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
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
`,K=a(g.button)`
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
`,Q=a.div`
  color: ${e=>e.theme.colors.status.error};
  margin-bottom: ${e=>e.theme.spacing(2)};
  font-size: 0.9rem;
`,V=a.div`
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
`,W=a.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${e=>e.theme.spacing(3)};
`,h=a(g.button)`
  flex: 1;
  padding: ${e=>e.theme.spacing(1.5)};
  margin: 0 ${e=>e.theme.spacing(.5)};
  background-color: ${e=>e.selected?e.theme.colors.primary.main:e.theme.colors.background.default};
  color: ${e=>e.selected?"white":e.theme.colors.text.primary};
  border: 1px solid
    ${e=>e.selected?e.theme.colors.primary.main:e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${e=>e.theme.spacing(.5)};

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${e=>e.selected?e.theme.colors.primary.main:e.theme.colors.background.paper};
    transform: translateY(-2px);
  }
`,X=a.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>e.theme.spacing(1.5)};
  margin-bottom: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.card};
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};

  svg {
    font-size: 1.2rem;
    color: ${e=>e.theme.colors.accent.main};
  }
`;a.div`
  text-align: center;
  margin-top: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(2)};
  font-size: 0.85rem;
  color: ${e=>e.theme.colors.text.secondary};
  background-color: ${e=>e.theme.colors.background.card};
  padding: ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
`;const ne=()=>{var k,v;const[e,s]=n.useState(""),[p,c]=n.useState(""),[b,f]=n.useState(""),[$,y]=n.useState(!1),[r,l]=n.useState("patient"),[Z,R]=n.useState(!1),{login:z,user:u}=F(),d=U();(v=(k=q().state)==null?void 0:k.from)!=null&&v.pathname,n.useEffect(()=>{u&&x(u.role)},[u]),n.useEffect(()=>{switch(R(!0),r){case"admin":s("admin@example.com"),c("admin123");break;case"doctor":s("jane.smith@example.com"),c("doctor123");break;case"labtechnician":s("rahul.verma@example.com"),c("labtech123");break;case"patient":s("amit.sharma@example.com"),c("patient123");break;default:s(""),c("")}},[r]);const x=i=>{switch(i){case"admin":d("/dashboard/admin/dashboard");break;case"doctor":d("/dashboard/appointments");break;case"labtechnician":d("/dashboard/lab-reports");break;case"patient":default:d("/dashboard");break}};return o(P,{children:[t(N,{}),t(O,{children:o(Y,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},onSubmit:async i=>{var w,S;i.preventDefault(),f(""),y(!0);try{const m=await z(e,p,r),L=m.userType||m.role;x(L)}catch(m){f(((S=(w=m.response)==null?void 0:w.data)==null?void 0:S.message)||"Invalid email or password")}finally{y(!1)}},children:[o(G,{children:[t(j,{}),t("h1",{children:"Hygenia Nexus"})]}),t(J,{children:"Sign in to your account"}),b&&t(Q,{children:b}),o(W,{children:[o(h,{type:"button",selected:r==="patient",onClick:()=>l("patient"),whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(T,{}),"Patient"]}),o(h,{type:"button",selected:r==="doctor",onClick:()=>l("doctor"),whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(E,{}),"Doctor"]}),o(h,{type:"button",selected:r==="labtechnician",onClick:()=>l("labtechnician"),whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(I,{}),"Lab Tech"]}),o(h,{type:"button",selected:r==="admin",onClick:()=>l("admin"),whileHover:{scale:1.05},whileTap:{scale:.95},children:[t(H,{}),"Admin"]})]}),r&&t("div",{style:{marginBottom:"1rem"},children:o(X,{children:[t(D,{}),t("span",{children:(()=>{switch(r){case"patient":return"Access your medical records, appointments, and prescriptions";case"doctor":return"Manage patient appointments, medical records, and prescriptions";case"labtechnician":return"Upload and manage lab reports and test results";case"admin":return"Manage hospital staff, departments, and system settings";default:return""}})()})]})}),o(C,{children:[t(B,{}),t("input",{type:"email",id:"email",name:"email",placeholder:"Email address",value:e,onChange:i=>s(i.target.value),required:!0})]}),o(C,{children:[t(M,{}),t("input",{type:"password",id:"password",name:"password",placeholder:"Password",value:p,onChange:i=>c(i.target.value),required:!0})]}),t("div",{style:{marginTop:"1rem"},children:t(K,{type:"submit",whileHover:{scale:1.05},whileTap:{scale:.95},disabled:$,children:$?"Signing in...":"Sign In"})}),o(V,{children:["Don't have an account? ",t(A,{to:"/signup",children:"Create an account"})]})]})})]})};export{ne as default};
//# sourceMappingURL=Login-8b1dfb31.js.map
