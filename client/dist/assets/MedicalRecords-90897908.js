import{u as A,a,j as o,M as D,b as j,B as x,w as M,p as z,V as I,ah as B,ai as E}from"./index-c3da158f.js";import{s as i,r as c}from"./vendor-3ba6fd3e.js";import{C as P}from"./Card-66c37868.js";import{B as V}from"./Button-d4df2000.js";import"./Input-bfc5420b.js";import{P as _}from"./PageTransition-e5168143.js";import{L as R,V as N}from"./LabReportCard-3ba92b1f.js";import"./index-cd980176.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const Y=i.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
`,G=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing(2)};
`,H=i.div`
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
`,O=i.div`
  display: flex;
  border-bottom: 1px solid ${e=>e.theme.colors.background.card};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,m=i.button`
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background: none;
  border: none;
  cursor: pointer;
  font-weight: ${e=>e.$active?"600":"400"};
  color: ${e=>e.$active?e.theme.colors.primary.main:e.theme.colors.text.secondary};
  border-bottom: 2px solid
    ${e=>e.$active?e.theme.colors.primary.main:"transparent"};
  transition: all ${e=>e.theme.transitions.default};

  &:hover {
    color: ${e=>e.theme.colors.primary.main};
  }
`,W=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,X=i.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
  width: 100%;
`,q=i(P)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all ${e=>e.theme.transitions.default};

  &:hover {
    transform: translateY(-5px);
  }
`,J=i.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(2)};
  border-bottom: 1px solid ${e=>e.theme.colors.background.card};
`,K=i.div`
  width: 48px;
  height: 48px;
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${e=>e.theme.spacing(2)};

  svg {
    font-size: 24px;
    color: ${e=>e.color};
  }
`,Q=i.div`
  flex: 1;
`,U=i.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 4px;
`,Z=i.p`
  font-size: 14px;
  color: ${e=>e.theme.colors.text.secondary};
  margin: 0;
`,ee=i.div`
  padding: ${e=>e.theme.spacing(2)};
`,te=i.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(1)};
`,$=i.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  span:first-child {
    color: ${e=>e.theme.colors.text.secondary};
  }

  span:last-child {
    font-weight: 500;
  }
`,ae=i.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${e=>e.theme.spacing(2)};
  gap: ${e=>e.theme.spacing(1)};
`,me=()=>{const[e,v]=c.useState(""),[n,d]=c.useState("all"),[w,C]=c.useState([]),[T,g]=c.useState(!0),{user:p}=A(),[L,b]=c.useState(null),[k,f]=c.useState(!1);c.useEffect(()=>{(async()=>{g(!0);try{const r=await x.getMedicalRecords();let h=[];if(p&&p.role==="patient")try{const s=await x.getLabReports({patient:p._id});Array.isArray(s)?h=s.map(l=>({...l,id:l._id,fileType:"lab",rawReport:l})):(console.error("Error: Lab reports response is not an array:",s),s&&Array.isArray(s.data)?h=s.data.map(l=>({...l,id:l._id,fileType:"lab",rawReport:l})):h=[])}catch(s){console.error("Error fetching lab reports:",s)}C([...r,...h]),g(!1)}catch(r){console.error("Error fetching records:",r),g(!1)}})()},[p]);const F=t=>{switch(t){case"pdf":return a(E,{});case"image":return a(B,{});case"document":return a(I,{});case"lab":return a(z,{});default:return a(M,{})}},S=t=>{switch(t){case"pdf":return r=>r.theme.colors.status.error;case"image":return r=>r.theme.colors.info;case"document":return r=>r.theme.colors.primary.main;case"lab":return r=>r.theme.colors.secondary;default:return r=>r.theme.colors.success}},u=w.filter(t=>{const r=t.type.toLowerCase().includes(e.toLowerCase())||t.doctor.toLowerCase().includes(e.toLowerCase())||t.reportType&&t.reportType.toLowerCase().includes(e.toLowerCase());return n==="all"||n==="lab"&&t.fileType==="lab"||n==="diagnosis"&&t.type==="Diagnosis"||n==="imaging"&&(t.type==="X-Ray"||t.type==="MRI"||t.type==="CT Scan")?r:!1}),y=t=>{t._id?(b(t),f(!0)):t.fileType==="lab"&&t.rawReport&&(b(t.rawReport),f(!0))};return a(_,{children:o(Y,{children:[o(G,{children:[a("h1",{children:"Medical Records"}),o(H,{children:[a(D,{}),a("input",{type:"text",placeholder:"Search records...",value:e,onChange:t=>v(t.target.value)})]})]}),o(O,{children:[a(m,{$active:n==="all",onClick:()=>d("all"),children:"All Records"}),a(m,{$active:n==="lab",onClick:()=>d("lab"),children:"Lab Reports"}),a(m,{$active:n==="diagnosis",onClick:()=>d("diagnosis"),children:"Diagnoses"}),a(m,{$active:n==="imaging",onClick:()=>d("imaging"),children:"Imaging"})]}),T?a("div",{children:"Loading records..."}):u.length>0?a(j,{children:n==="lab"?a(X,{children:u.map(t=>a(R,{report:t.rawReport,onClick:y},t.id))}):a(W,{children:u.map(t=>t.fileType==="lab"?a(R,{report:t.rawReport,onClick:y},t.id):o(q,{onClick:()=>t.fileType==="lab"?y(t):null,style:{cursor:t.fileType==="lab"?"pointer":"default"},children:[o(J,{children:[a(K,{color:S(t.fileType),children:F(t.fileType)}),o(Q,{children:[a(U,{children:t.reportType||t.type}),a(Z,{children:new Date(t.date).toLocaleDateString()})]})]}),o(ee,{children:[o(te,{children:[o($,{children:[a("span",{children:"Provider:"}),a("span",{children:t.doctor})]}),o($,{children:[a("span",{children:"Department:"}),a("span",{children:t.department})]}),t.details&&t.details.notes&&o("div",{style:{marginTop:"10px",fontSize:"0.9em"},children:[a("div",{style:{fontWeight:"600",marginBottom:"5px"},children:"Notes:"}),a("div",{children:t.details.notes})]})]}),a(ae,{children:a(V,{size:"small",children:"View Details"})})]})]},t.id))})}):o("div",{style:{textAlign:"center",marginTop:"40px"},children:[a("h3",{children:"No records found"}),a("p",{children:e?"Try adjusting your search criteria":"You don't have any medical records yet"})]}),a(N,{isOpen:k,onClose:()=>f(!1),report:L})]})})};export{me as default};
//# sourceMappingURL=MedicalRecords-90897908.js.map
