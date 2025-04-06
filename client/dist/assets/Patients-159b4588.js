import{j as s,a as o,N as k,M as N,A as S,O as C,P as L,B as A}from"./index-c3da158f.js";import{s as a,m as p,r as m,e as F}from"./vendor-3ba6fd3e.js";import{A as b}from"./AnimationContainer-978f4c1f.js";import{P as j,c as $}from"./PageTransition-e5168143.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const E=a.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
`,T=a.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
  margin: 0;
`,D=a(p.button)`
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.dark};
  }
`,z=a.div`
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1)};
  margin-bottom: ${e=>e.theme.spacing(4)};
  box-shadow: ${e=>e.theme.shadows.small};
`,B=a.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: ${e=>e.theme.spacing(1)};
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.primary};

  &:focus {
    outline: none;
  }
`,G=a.button`
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,R=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,U=a(p.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
  padding: ${e=>e.theme.spacing(3)};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${e=>e.theme.shadows.medium};
  }
`,V=a.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
`,I=a.h3`
  font-size: 1.2rem;
  margin-bottom: ${e=>e.theme.spacing(.5)};
  color: ${e=>e.theme.colors.text.primary};
`,i=a.p`
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(.5)};
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,H=a.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(1)};
  margin-top: ${e=>e.theme.spacing(2)};
`,g=a.button`
  background: none;
  border: none;
  color: ${e=>e.variant==="delete"?e.theme.colors.status.error:e.theme.colors.primary.main};
  cursor: pointer;
  font-size: 1rem;
  padding: ${e=>e.theme.spacing(.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
  }
`,M=a.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(6)};
`,O=a.p`
  color: ${e=>e.theme.colors.text.secondary};
  margin-top: ${e=>e.theme.spacing(2)};
  font-size: 1rem;
`,W=()=>{const[e,y]=m.useState([]),[w,h]=m.useState(!0),[l,x]=m.useState("");m.useEffect(()=>{(async()=>{try{h(!0);const n=await A.getPatients();console.log("Fetched patients from API:",n);const c=n.map(r=>{var d,f;return{id:r._id,firstName:r.firstName||r.name.split(" ")[0],lastName:r.lastName||r.name.split(" ").slice(1).join(" "),gender:r.gender||"Not specified",age:r.age||v(r.dateOfBirth)||30,contactNumber:r.contactNumber||"Not provided",email:r.email||"Not provided",address:{city:typeof r.address=="string"&&((d=r.address.split(",")[1])==null?void 0:d.trim())||"Unknown",state:typeof r.address=="string"&&((f=r.address.split(",")[2])==null?void 0:f.trim())||"Unknown"},bloodGroup:r.bloodGroup||"Not specified",lastVisit:r.lastVisit||"2024-01-01"}});y(c),h(!1)}catch(n){console.error("Error fetching patients:",n),h(!1),alert("Failed to load patients data. Please try again later.")}})()},[]);const v=t=>{if(!t)return null;const n=new Date(t),c=new Date;let r=c.getFullYear()-n.getFullYear();const d=c.getMonth()-n.getMonth();return(d<0||d===0&&c.getDate()<n.getDate())&&r--,r},u=e.filter(t=>t.firstName.toLowerCase().includes(l.toLowerCase())||t.lastName.toLowerCase().includes(l.toLowerCase())||t.email.toLowerCase().includes(l.toLowerCase())),P=t=>{t.preventDefault()};return s(j,{children:[s(E,{children:[o(T,{children:"Patients"}),s(D,{whileHover:{scale:1.05},whileTap:{scale:.95},children:[o(k,{})," Add New Patient"]})]}),o(p.div,{variants:$,children:o("form",{onSubmit:P,children:s(z,{children:[o(N,{style:{margin:"0 10px",color:"#666"}}),o(B,{type:"text",placeholder:"Search patients...",value:l,onChange:t=>x(t.target.value)}),o(G,{type:"submit",children:"Search"})]})})}),w?o(b,{type:"loading",height:"300px",width:"100%"}):u.length>0?o(R,{children:u.map(t=>s(U,{variants:$,whileHover:{y:-5},children:[s(V,{children:[o(I,{children:`${t.firstName} ${t.lastName}`}),s(i,{children:["Age: ",t.age," | Gender: ",t.gender]}),s(i,{children:["Blood Group: ",t.bloodGroup]}),s(i,{children:["Email: ",t.email]}),s(i,{children:["Contact: ",t.contactNumber]}),s(i,{children:["Location: ",t.address.city,", ",t.address.state]}),s(i,{children:["Last Visit: ",t.lastVisit]})]}),s(H,{children:[o(g,{as:F,to:`/dashboard/patients/${t.id}`,children:o(S,{})}),o(g,{children:o(C,{})}),o(g,{variant:"delete",children:o(L,{})})]})]},t.id))}):s(M,{children:[o(b,{type:"emptyState",height:"200px",width:"100%",margin:"0 auto"}),o(O,{children:"No patients found. Try adjusting your search or add a new patient."})]})]})};export{W as default};
//# sourceMappingURL=Patients-159b4588.js.map
