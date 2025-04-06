import{s as n,m as a}from"./vendor-3ba6fd3e.js";const t=(r,o)=>{switch(r){case"small":return`
        padding: ${o.spacing(.75)} ${o.spacing(1.5)};
        font-size: 0.8rem;
      `;case"large":return`
        padding: ${o.spacing(2)} ${o.spacing(4)};
        font-size: 1rem;
      `;default:return`
        padding: ${o.spacing(1.5)} ${o.spacing(3)};
        font-size: 0.9rem;
      `}},s=(r,o)=>{switch(r){case"secondary":return`
        background-color: transparent;
        color: ${o.colors.text.primary};
        border: 1px solid ${o.colors.border};
        
        &:hover {
          background-color: ${o.colors.background.default};
        }
      `;case"danger":return`
        background-color: ${o.colors.status.error};
        color: white;
        border: none;
        
        &:hover {
          background-color: #d32f2f;
        }
      `;case"warning":return`
        background-color: ${o.colors.status.warning};
        color: white;
        border: none;
        
        &:hover {
          background-color: #f57c00;
        }
      `;case"success":return`
        background-color: ${o.colors.status.success};
        color: white;
        border: none;
        
        &:hover {
          background-color: #388e3c;
        }
      `;default:return`
        background-color: ${o.colors.primary.main};
        color: white;
        border: none;
        
        &:hover {
          background-color: ${o.colors.primary.light};
        }
      `}},e=n(a.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${r=>r.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all ${r=>r.theme.transitions.default};
  gap: ${r=>r.theme.spacing(1)};

  ${r=>t(r.size,r.theme)}
  ${r=>s(r.variant,r.theme)}

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    font-size: 1rem;
  }
`;export{e as B};
//# sourceMappingURL=Button-d4df2000.js.map
