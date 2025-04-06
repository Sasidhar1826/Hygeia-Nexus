import{j as i,a as o,H as n,a6 as a}from"./index-c3da158f.js";import{s as t,m as r,e as s}from"./vendor-3ba6fd3e.js";import"./animations-c827faa9.js";const m=t.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: ${e=>e.theme.spacing(3)};
`,c=t(r.div)`
  font-size: 5rem;
  color: ${e=>e.theme.colors.primary.main};
  margin-bottom: ${e=>e.theme.spacing(3)};
`,l=t.h1`
  font-size: 2.5rem;
  margin-bottom: ${e=>e.theme.spacing(2)};
  color: ${e=>e.theme.colors.text.primary};
`,d=t.p`
  font-size: 1.2rem;
  margin-bottom: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.text.secondary};
  max-width: 600px;
`,g=t(s)`
  display: flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border-radius: ${e=>e.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${e=>e.theme.colors.primary.light};
  }

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
  }
`,f=()=>i(m,{children:[o(c,{initial:{scale:0},animate:{scale:1},transition:{type:"spring",stiffness:260,damping:20},children:o(n,{})}),o(l,{children:"404 - Page Not Found"}),o(d,{children:"The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}),i(g,{to:"/",children:[o(a,{}),"Back to Home"]})]});export{f as default};
//# sourceMappingURL=NotFound-a5b83f34.js.map
