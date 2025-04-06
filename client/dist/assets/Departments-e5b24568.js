import{a as r,j as s,M as x,B as $}from"./index-c3da158f.js";import{s as t,m as b,r as n,e as y}from"./vendor-3ba6fd3e.js";import{C as D}from"./Card-66c37868.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const v=t.div`
  padding: ${e=>e.theme.spacing(3)};
`,w=t.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
`,k=t.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
`,C=t.div`
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
`,S=t.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${e=>e.theme.spacing(3)};
`,L=t(b(D))`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`,E=t.div`
  height: 200px;
  background-image: url(${e=>e.image||"https://via.placeholder.com/300x200?text=Department"});
  background-size: cover;
  background-position: center;
  border-top-left-radius: ${e=>e.theme.borderRadius.medium};
  border-top-right-radius: ${e=>e.theme.borderRadius.medium};
`,z=t.div`
  padding: ${e=>e.theme.spacing(2)};
  display: flex;
  flex-direction: column;
  flex: 1;
`,j=t.h2`
  font-size: 1.2rem;
  margin-bottom: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.primary.main};
`,M=t.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(2)};
  flex: 1;
`,R=t(y)`
  display: inline-block;
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  text-decoration: none;
  text-align: center;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.dark};
  }
`,F=t.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.text.secondary};
`,p=t.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.status.error};
`,_=()=>{const[e,h]=n.useState([]),[m,c]=n.useState([]),[i,g]=n.useState(""),[u,d]=n.useState(!0),[l,f]=n.useState(null);return n.useEffect(()=>{(async()=>{try{d(!0);const a=await $.get("/departments");h(a.data),c(a.data),d(!1)}catch(a){console.error("Error fetching departments:",a),f("Failed to load departments. Please try again later."),d(!1)}})()},[]),n.useEffect(()=>{if(i.trim()==="")c(e);else{const o=e.filter(a=>a.name.toLowerCase().includes(i.toLowerCase())||a.description.toLowerCase().includes(i.toLowerCase()));c(o)}},[i,e]),u?r(F,{children:"Loading departments..."}):l?r(p,{children:l}):s(v,{children:[s(w,{children:[r(k,{children:"Medical Departments"}),s(C,{children:[r(x,{}),r("input",{type:"text",placeholder:"Search departments...",value:i,onChange:o=>g(o.target.value)})]})]}),m.length===0?r(p,{children:"No departments found matching your search."}):r(S,{children:m.map(o=>s(L,{whileHover:{y:-5},transition:{duration:.2},children:[r(E,{image:o.image}),s(z,{children:[r(j,{children:o.name}),r(M,{children:o.description}),r(R,{to:`/doctors?department=${o._id}`,children:"View Doctors"})]})]},o._id))})]})};export{_ as default};
//# sourceMappingURL=Departments-e5b24568.js.map
