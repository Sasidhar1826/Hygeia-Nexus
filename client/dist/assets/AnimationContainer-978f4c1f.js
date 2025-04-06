import{a as t}from"./index-c3da158f.js";import{s as m}from"./vendor-3ba6fd3e.js";import{P as l}from"./animations-c827faa9.js";const d=m.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({height:n})=>n||"200px"};
  width: ${({width:n})=>n||"100%"};
  margin: ${({margin:n})=>n||"0"};
`,h=({type:n="loading",height:e,width:o,margin:a,onComplete:r,playerProps:i={}})=>{const s=()=>{switch(n){case"loading":return"/loading-animation.json";case"emptyState":return"/empty-state.json";case"success":return"/success-animation.json";case"error":return"/error-animation.json";case"modal":return"/modal-animation.json";default:return"/loading-animation.json"}},c=()=>["loading"].includes(n);return t(d,{height:e,width:o,margin:a,children:t(l,{src:s(),loop:c(),autoplay:!0,style:{height:"100%",width:"100%"},onComplete:r,...i})})};export{h as A};
//# sourceMappingURL=AnimationContainer-978f4c1f.js.map
