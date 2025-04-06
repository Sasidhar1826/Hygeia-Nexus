import{a as t}from"./index-c3da158f.js";import{r as n,m as b,s as $,j as r}from"./vendor-3ba6fd3e.js";import{P as o}from"./index-e7037912.js";const w=n.forwardRef((e,a)=>t(b.div,{ref:a,...e})),x=$(w)`
  background-color: ${e=>e.theme.colors.background.card};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(3)};
  box-shadow: ${e=>e.theme.shadows.medium};
  transition: all ${e=>e.theme.transitions.default};
  position: relative;
  overflow: hidden;
  height: ${e=>e.fullHeight?"100%":"auto"};

  ${e=>e.interactive&&r`
      cursor: pointer;
      &:hover {
        box-shadow: ${e.theme.shadows.large};
        transform: translateY(-2px);
      }
      &:active {
        transform: translateY(0);
      }
    `}

  ${e=>{switch(e.variant){case"outlined":return r`
          background-color: transparent;
          border: 1px solid ${e.theme.colors.border};
          box-shadow: none;
        `;case"elevation":return r`
          box-shadow: ${e.theme.shadows.medium};
        `;case"primary":return r`
          background-color: ${e.theme.colors.primary.light};
          border-left: 4px solid ${e.theme.colors.primary.main};
        `;case"success":return r`
          background-color: ${e.theme.colors.success.light};
          border-left: 4px solid ${e.theme.colors.success.main};
        `;case"warning":return r`
          background-color: ${e.theme.colors.warning.light};
          border-left: 4px solid ${e.theme.colors.warning.main};
        `;case"error":return r`
          background-color: ${e.theme.colors.error.light};
          border-left: 4px solid ${e.theme.colors.error.main};
        `;default:return""}}}
  
  ${e=>{switch(e.size){case"small":return r`
          padding: ${e.theme.spacing(2)};
        `;case"large":return r`
          padding: ${e.theme.spacing(4)};
        `;default:return r`
          padding: ${e.theme.spacing(3)};
        `}}}
  
  ${e=>e.noPadding&&r`
      padding: 0;
    `}
    
  ${e=>e.bordered&&r`
      border: 1px solid ${e.theme.colors.border};
    `}
`,s=n.forwardRef(({children:e,variant:a="default",size:i="medium",interactive:d=!1,fullHeight:l=!1,noPadding:c=!1,bordered:m=!1,className:u,onClick:h,...g},f)=>t(x,{ref:f,variant:a,size:i,interactive:d,fullHeight:l,noPadding:c,bordered:m,className:u,onClick:h,...g,children:e}));s.displayName="Card";s.propTypes={children:o.node,variant:o.oneOf(["default","outlined","elevation","primary","success","warning","error"]),size:o.oneOf(["small","medium","large"]),interactive:o.bool,fullHeight:o.bool,noPadding:o.bool,bordered:o.bool,className:o.string,onClick:o.func};export{s as C};
//# sourceMappingURL=Card-66c37868.js.map
