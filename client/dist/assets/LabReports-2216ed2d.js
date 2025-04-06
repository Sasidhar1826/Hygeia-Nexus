import{u as z,B as A,a as o,j as a,M as F}from"./index-c3da158f.js";import{s as t,m as E,r as n}from"./vendor-3ba6fd3e.js";import{P as u}from"./PageTransition-e5168143.js";import{A as f}from"./AnimationContainer-978f4c1f.js";import{L as M,V as P}from"./LabReportCard-3ba92b1f.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const B=t.div`
  padding: ${e=>e.theme.spacing(3)};
`,I=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(3)};
`,V=t.h1`
  font-size: 1.5rem;
  color: ${e=>e.theme.colors.text.primary};
`,U=t.div`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(2)};
`,X=t.div`
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
`,_=t.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,y=t.select`
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.paper};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.primary};
  outline: none;
`,H=t.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(3)};
  width: 100%;
`;t(E.div)`
  padding: ${e=>e.theme.spacing(2)};
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(2)};
`;t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: ${e=>e.theme.spacing(1)};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`;t.h3`
  font-size: 1.1rem;
  color: ${e=>e.theme.colors.text.primary};
  font-weight: 600;
  margin: 0;
`;t.div`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(1)};
`;t.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
`;t.span`
  color: ${e=>e.theme.colors.text.secondary};
  font-weight: 500;
`;t.span`
  color: ${e=>e.theme.colors.text.primary};
`;t.span`
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${e=>e.status==="completed"?e.theme.colors.status.success+"20":e.theme.colors.status.warning+"20"};
  color: ${e=>e.status==="completed"?e.theme.colors.status.success:e.theme.colors.status.warning};
`;t.div`
  margin-top: ${e=>e.theme.spacing(1)};
`;t.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.theme.spacing(.5)} 0;
  border-bottom: 1px dashed ${e=>e.theme.colors.border};
  font-size: 0.85rem;

  &:last-child {
    border-bottom: none;
  }
`;t.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: ${e=>e.theme.spacing(1)};
`;t.button`
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(.5)};
  cursor: pointer;
  border: none;
  background-color: ${e=>e.theme.colors.primary.main+"10"};
  color: ${e=>e.theme.colors.primary.main};
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.main+"20"};
  }
`;const N=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;
`,O=t.p`
  color: ${e=>e.theme.colors.text.secondary};
  margin-top: ${e=>e.theme.spacing(2)};
  font-size: 0.95rem;
`,Y=()=>{const[e,b]=n.useState([]),[$,p]=n.useState(!0),[s,x]=n.useState(""),[c,v]=n.useState(""),[l,R]=n.useState(""),{user:i}=z(),[w,S]=n.useState(null),[C,m]=n.useState(!1);n.useEffect(()=>{T()},[]);const T=async()=>{try{p(!0);const r={};(i==null?void 0:i.role)==="labtechnician"&&(r.technician=i._id);const d=await A.getLabReports(r);b(d)}catch(r){console.error("Error fetching lab reports:",r)}finally{p(!1)}},h=e.filter(r=>{var g;const d=s===""||((g=r.patient)==null?void 0:g.name.toLowerCase().includes(s.toLowerCase()))||r.reportType.toLowerCase().includes(s.toLowerCase()),k=c===""||r.status===c,j=l===""||r.reportType===l;return d&&k&&j}),L=r=>{S(r),m(!0)};return $?o(u,{children:o(f,{type:"loading",height:"300px"})}):o(u,{children:a(B,{children:[a(I,{children:[o(V,{children:"Lab Reports"}),o(U,{children:a(X,{children:[o(F,{color:"#888"}),o("input",{type:"text",placeholder:"Search by patient or type",value:s,onChange:r=>x(r.target.value)})]})})]}),a(_,{children:[a(y,{value:c,onChange:r=>v(r.target.value),children:[o("option",{value:"",children:"All status"}),o("option",{value:"completed",children:"Completed"}),o("option",{value:"pending",children:"Pending"})]}),a(y,{value:l,onChange:r=>R(r.target.value),children:[o("option",{value:"",children:"All types"}),o("option",{value:"Blood Test",children:"Blood Test"}),o("option",{value:"Urine Analysis",children:"Urine Analysis"}),o("option",{value:"X-Ray",children:"X-Ray"}),o("option",{value:"CT Scan",children:"CT Scan"}),o("option",{value:"MRI",children:"MRI"})]})]}),h.length>0?o(H,{children:h.map(r=>o(M,{report:r,onClick:L},r._id))}):a(N,{children:[o(f,{type:"empty",height:"200px"}),o(O,{children:"No lab reports found matching your filters. Try adjusting your search criteria."})]}),o(P,{isOpen:C,onClose:()=>m(!1),report:w})]})})};export{Y as default};
//# sourceMappingURL=LabReports-2216ed2d.js.map
