import{a as o,j as n,M as j,d as B,B as D}from"./index-c3da158f.js";import{s as r,m as N,b as P,u as R,r as i,e as M}from"./vendor-3ba6fd3e.js";import{C as _}from"./Card-66c37868.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const H=r.div`
  padding: ${e=>e.theme.spacing(3)};
`,I=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
`,T=r.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
`,U=r.div`
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
    flex: 1;
    border: none;
    background: transparent;
    padding: ${e=>e.theme.spacing(1)};
    font-size: 0.9rem;
    color: ${e=>e.theme.colors.text.primary};

    &:focus {
      outline: none;
    }
  }
`,q=r.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};
  flex-wrap: wrap;
`,S=r.select`
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
`,G=r.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,O=r(N(_))`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,J=r.div`
  display: flex;
  padding: ${e=>e.theme.spacing(2)};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,K=r.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${e=>e.image||"/images/doctor-placeholder.jpg"});
  background-size: cover;
  background-position: center;
  margin-right: ${e=>e.theme.spacing(2)};
  flex-shrink: 0;
`,Q=r.div`
  flex: 1;
`,V=r.h2`
  font-size: 1.2rem;
  margin-bottom: ${e=>e.theme.spacing(.5)};
  color: ${e=>e.theme.colors.primary.main};
`,W=r.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(.5)};
`,X=r.p`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.text.secondary};
  font-weight: 500;
`,Y=r.div`
  padding: ${e=>e.theme.spacing(2)};
  flex: 1;
  display: flex;
  flex-direction: column;
`,Z=r.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(2)};
  flex: 1;
`,ee=r.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${e=>e.theme.spacing(1)};
`,te=r.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${e=>e.theme.colors.text.primary};
`,re=r(M)`
  display: inline-flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s;

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
  }

  &:hover {
    background-color: ${e=>e.theme.colors.primary.dark};
  }
`,oe=r.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.text.secondary};
`,w=r.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.status.error};
`,me=()=>{const e=P(),f=R(),z=new URLSearchParams(e.search).get("department"),[d,y]=i.useState([]),[h,m]=i.useState([]),[l,C]=i.useState(""),[$,k]=i.useState([]),[c,A]=i.useState(z||""),[g,ne]=i.useState([]),[p,b]=i.useState(""),[L,u]=i.useState(!0),[x,F]=i.useState(null);i.useEffect(()=>{(async()=>{try{const a=await D.getDepartments();k(a)}catch(a){console.error("Error fetching departments:",a)}})()},[]),i.useEffect(()=>{(async()=>{try{u(!0);const a={};c&&(a.department=c),p&&(a.specialization=p);const s=await D.getDoctors(a),v=Array.isArray(s)?s:s&&s.data?s.data:[];y(v),m(v),u(!1)}catch(a){console.error("Error fetching doctors:",a),F("Failed to load doctors. Please try again later."),y([]),m([]),u(!1)}})()},[c,p]),i.useEffect(()=>{if(!Array.isArray(d)){console.error("Doctors is not an array:",d),m([]);return}if(l.trim()==="")m(d);else{const t=d.filter(a=>{var s;return((s=a.name)==null?void 0:s.toLowerCase().includes(l.toLowerCase()))||a.specialization&&a.specialization.toLowerCase().includes(l.toLowerCase())||a.bio&&a.bio.toLowerCase().includes(l.toLowerCase())});m(t)}},[l,d]),i.useEffect(()=>{const t=new URLSearchParams;c&&t.append("department",c),f({pathname:e.pathname,search:t.toString()},{replace:!0})},[c,f,e.pathname]);const E=t=>{A(t.target.value),b("")};return L?o(oe,{children:"Loading doctors..."}):x?o(w,{children:x}):n(H,{children:[n(I,{children:[o(T,{children:"Our Doctors"}),n(U,{children:[o(j,{}),o("input",{type:"text",placeholder:"Search doctors...",value:l,onChange:t=>C(t.target.value)})]})]}),n(q,{children:[n(S,{value:c,onChange:E,children:[o("option",{value:"",children:"All Departments"}),Array.isArray($)&&$.map(t=>o("option",{value:t._id,children:t.name},t._id))]}),n(S,{value:p,onChange:t=>b(t.target.value),disabled:g.length===0,children:[o("option",{value:"",children:"All Specializations"}),Array.isArray(g)&&g.map(t=>o("option",{value:t,children:t},t))]})]}),!Array.isArray(h)||h.length===0?o(w,{children:"No doctors found matching your criteria."}):o(G,{children:h.map(t=>n(O,{whileHover:{y:-5},transition:{duration:.2},children:[n(J,{children:[o(K,{image:t.profileImage}),n(Q,{children:[n(V,{children:["Dr. ",t.name||"Unknown"]}),t.specialization&&o(W,{children:t.specialization}),t.department&&o(X,{children:typeof t.department=="object"&&t.department.name?t.department.name:"Department information not available"})]})]}),n(Y,{children:[o(Z,{children:t.bio||"No bio available for this doctor."}),n(ee,{children:[n(te,{children:["Fee: $",t.consultationFee||"N/A"]}),n(re,{to:`/dashboard/book-appointment/${t._id}`,children:[o(B,{}),"Book Appointment"]})]})]})]},t._id||`doctor-${Math.random()}`))})]})};export{me as default};
//# sourceMappingURL=Doctors-3d58b6e3.js.map
