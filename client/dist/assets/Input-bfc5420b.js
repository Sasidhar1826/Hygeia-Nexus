import{j as a,a as t}from"./index-c3da158f.js";import{s as o}from"./vendor-3ba6fd3e.js";const n=o.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${e=>e.theme.spacing(2)};
`,l=o.label`
  font-size: 14px;
  margin-bottom: ${e=>e.theme.spacing(.5)};
  color: ${e=>e.theme.colors.text.secondary};
`,c=o.input`
  padding: ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid
    ${e=>e.error?e.theme.colors.status.error:"#E2E8F0"};
  font-size: 16px;
  transition: all ${e=>e.theme.transitions.default};
  background-color: ${e=>e.theme.colors.background.paper};
  color: ${e=>e.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${e=>e.error?e.theme.colors.status.error:e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px
      ${e=>e.error?e.theme.colors.status.error+"30":e.theme.colors.primary.main+"30"};
  }

  &::placeholder {
    color: ${e=>e.theme.colors.text.disabled};
  }
`,i=o.span`
  color: ${e=>e.theme.colors.status.error};
  font-size: 12px;
  margin-top: ${e=>e.theme.spacing(.5)};
`,h=({label:e,error:r,...s})=>a(n,{children:[e&&t(l,{children:e}),t(c,{error:r,...s}),r&&t(i,{children:r})]});export{h as I};
//# sourceMappingURL=Input-bfc5420b.js.map
