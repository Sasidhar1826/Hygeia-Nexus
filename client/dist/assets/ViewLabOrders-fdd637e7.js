import{u as U,B as C,a,j as n,M as P,C as D,n as H,o as E,d as B,m as M,b as q,L as N,I as S}from"./index-c3da158f.js";import{s as i,m as F,r as c,e as V}from"./vendor-3ba6fd3e.js";import{P as T}from"./PageTransition-e5168143.js";import{A as k}from"./AnimationContainer-978f4c1f.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const X=i.div`
  padding: ${e=>e.theme.spacing(3)};
`,G=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(3)};
`,J=i.h1`
  font-size: 1.5rem;
  color: ${e=>e.theme.colors.text.primary};
`,K=i.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};
`,Q=i.div`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  border: 1px solid ${e=>e.theme.colors.border};

  input {
    border: none;
    background: transparent;
    outline: none;
    margin-left: ${e=>e.theme.spacing(1)};
    font-size: 0.9rem;
    color: ${e=>e.theme.colors.text.primary};
    width: 200px;
  }
`,W=i.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,L=i.select`
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.paper};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.primary};
  outline: none;
`,Y=i.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${e=>e.theme.spacing(2)};
`,Z=i(F.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  padding: ${e=>e.theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`,ee=i.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${e=>e.theme.spacing(1)};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,te=i.h3`
  font-size: 1.1rem;
  color: ${e=>e.theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,ae=i.span`
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${e=>e.status==="completed"?e.theme.colors.status.success+"20":e.status==="in progress"?e.theme.colors.status.warning+"20":e.theme.colors.status.info+"20"};
  color: ${e=>e.status==="completed"?e.theme.colors.status.success:e.status==="in progress"?e.theme.colors.status.warning:e.theme.colors.status.info};
`,ne=i.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: ${e=>e.theme.spacing(2)};
`,I=i.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(1.5)};
`,p=i.div`
  display: flex;
  flex-direction: column;
`,h=i.span`
  font-size: 0.8rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(.5)};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(.5)};
`,g=i.span`
  font-size: 0.95rem;
  color: ${e=>e.theme.colors.text.primary};
  font-weight: 500;
`,ie=i.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: ${e=>e.theme.spacing(1)};
  padding-top: ${e=>e.theme.spacing(1)};
  border-top: 1px solid ${e=>e.theme.colors.border};
`,u=i(F.button)`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  background-color: ${e=>e.variant==="primary"?e.theme.colors.primary.main:e.variant==="danger"?e.theme.colors.status.error:e.theme.colors.background.default};
  color: ${e=>e.variant==="primary"||e.variant==="danger"?"white":e.theme.colors.text.primary};
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.variant==="primary"?e.theme.colors.primary.light:e.variant==="danger"?e.theme.colors.status.error+"dd":e.theme.colors.background.card};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,re=i(V)`
  text-decoration: none;
  color: inherit;
`,oe=i.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;
`,se=i.p`
  color: ${e=>e.theme.colors.text.secondary};
  margin-top: ${e=>e.theme.spacing(2)};
  font-size: 0.95rem;
`,ge=()=>{const[e,O]=c.useState([]),[R,b]=c.useState(!0),[l,_]=c.useState(""),[y,j]=c.useState(""),[f,z]=c.useState(""),{user:r}=U();c.useEffect(()=>{$()},[]);const $=async()=>{b(!0);try{const t={};(r==null?void 0:r.role)==="labtechnician"&&(t.technician=r._id);const o=await C.getLabOrders(t);O(o)}catch(t){console.error("Error fetching lab orders:",t)}finally{b(!1)}},v=async(t,o,d=null)=>{try{const s={status:o};o==="in_progress"&&(r==null?void 0:r.role)==="labtechnician"&&(s.technician=r._id),await C.updateLabOrder(t,s),$()}catch(s){console.error("Error updating lab order status:",s)}},x=e.filter(t=>{var m,w;const o=l===""||((m=t.patient)==null?void 0:m.name)&&t.patient.name.toLowerCase().includes(l.toLowerCase())||((w=t.doctor)==null?void 0:w.name)&&t.doctor.name.toLowerCase().includes(l.toLowerCase())||t.testType&&t.testType.toLowerCase().includes(l.toLowerCase()),d=y===""||t.status===y,s=f===""||t.testType===f;return o&&d&&s}),A=t=>new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"});return R?a(T,{children:a(k,{type:"loading",height:"300px"})}):a(T,{children:n(X,{children:[n(G,{children:[a(J,{children:"Lab Test Orders"}),a(K,{children:n(Q,{children:[a(P,{color:"#888"}),a("input",{type:"text",placeholder:"Search by patient or doctor",value:l,onChange:t=>_(t.target.value)})]})})]}),n(W,{children:[n(L,{value:y,onChange:t=>j(t.target.value),children:[a("option",{value:"",children:"All status"}),a("option",{value:"pending",children:"Pending"}),a("option",{value:"in_progress",children:"In Progress"}),a("option",{value:"completed",children:"Completed"})]}),n(L,{value:f,onChange:t=>z(t.target.value),children:[a("option",{value:"",children:"All types"}),a("option",{value:"Blood Test",children:"Blood Test"}),a("option",{value:"Urine Analysis",children:"Urine Analysis"}),a("option",{value:"X-Ray",children:"X-Ray"}),a("option",{value:"CT Scan",children:"CT Scan"}),a("option",{value:"MRI",children:"MRI"})]})]}),x.length>0?a(Y,{children:x.map(t=>{var o,d,s,m;return n(Z,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},children:[n(ee,{children:[n(te,{children:[a(D,{}),t.testType]}),a(ae,{status:t.status,children:t.status==="pending"?"Pending":t.status==="in_progress"?"In Progress":"Completed"})]}),n(ne,{children:[n(I,{children:[n(p,{children:[n(h,{children:[a(H,{}),"Patient"]}),a(g,{children:((o=t.patient)==null?void 0:o.name)||t.patientName||"Unknown"})]}),n(p,{children:[n(h,{children:[a(E,{}),"Requested By"]}),a(g,{children:((d=t.doctor)==null?void 0:d.name)||"Unknown"})]})]}),n(I,{children:[n(p,{children:[n(h,{children:[a(B,{}),"Date Requested"]}),a(g,{children:A(t.requestedDate)})]}),n(p,{children:[n(h,{children:[a(M,{}),"Department"]}),a(g,{children:((s=t.department)==null?void 0:s.name)||"Unknown"})]})]})]}),t.notes&&n("div",{children:[a(h,{children:"Notes"}),a("p",{style:{fontSize:"0.9rem",margin:"0.5rem 0 0",color:"#666"},children:t.notes})]}),n(ie,{children:[t.status==="pending"&&(r==null?void 0:r.role)==="labtechnician"&&n(q,{children:[n(u,{variant:"default",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>v(t._id,"rejected"),children:[a(N,{}),"Reject"]}),n(u,{variant:"primary",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>v(t._id,"in_progress"),children:[a(S,{}),"Start Processing"]})]}),t.status==="in_progress"&&((m=t.technician)==null?void 0:m._id)===(r==null?void 0:r._id)&&a(re,{to:`/dashboard/upload-lab-results?orderId=${t._id}`,children:n(u,{variant:"primary",whileHover:{scale:1.05},whileTap:{scale:.95},children:[a(S,{}),"Upload Results"]})}),t.status==="completed"&&t.reportId&&a(u,{variant:"default",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>navigate(`/dashboard/lab-reports?id=${t.reportId}`),children:"View Results"})]})]},t._id)})}):n(oe,{children:[a(k,{type:"emptyState",height:"200px"}),a(se,{children:"No lab orders found matching your filters. Try adjusting your search criteria."})]})]})})};export{ge as default};
//# sourceMappingURL=ViewLabOrders-fdd637e7.js.map
