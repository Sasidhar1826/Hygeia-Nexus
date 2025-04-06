import{u as E,a as o,j as t,t as I,a9 as L,Q as M,b as R,O as U,k as _}from"./index-c3da158f.js";import{s as r,m as j,r as s}from"./vendor-3ba6fd3e.js";import{C as B}from"./Card-66c37868.js";import"./animations-c827faa9.js";import"./index-e7037912.js";const v=r.div`
  padding: ${e=>e.theme.spacing(3)};
  max-width: 800px;
  margin: 0 auto;
`,w=r.div`
  margin-bottom: ${e=>e.theme.spacing(4)};
`,D=r.h1`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: ${e=>e.theme.spacing(1)};
`,C=r.p`
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.secondary};
`,H=r(B)`
  padding: ${e=>e.theme.spacing(4)};
`,A=r.div`
  margin-bottom: ${e=>e.theme.spacing(4)};

  &:last-child {
    margin-bottom: 0;
  }
`,S=r.h2`
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.text.primary};
  margin-bottom: ${e=>e.theme.spacing(2)};
  display: flex;
  align-items: center;

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
    color: ${e=>e.theme.colors.primary.main};
  }
`,O=r.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${e=>e.theme.spacing(3)};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,c=r.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
`,l=r.p`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(.5)};
`,m=r.p`
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.primary};
`,f=r(j.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(1.5)}
    ${e=>e.theme.spacing(3)};
  background-color: ${e=>e.theme.colors.primary.main};
  color: white;
  border: none;
  border-radius: ${e=>e.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: ${e=>e.theme.spacing(2)};

  &:hover {
    background-color: ${e=>e.theme.colors.primary.dark};
  }

  svg {
    margin-right: ${e=>e.theme.spacing(1)};
  }
`,q=r.div`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(3)};
`,G=r(f)`
  background-color: ${e=>e.theme.colors.text.disabled};

  &:hover {
    background-color: ${e=>e.theme.colors.text.secondary};
  }
`,u=r.div`
  margin-bottom: ${e=>e.theme.spacing(2)};
`,p=r.label`
  display: block;
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  margin-bottom: ${e=>e.theme.spacing(.5)};
`,g=r.input`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,J=r.div`
  margin-top: ${e=>e.theme.spacing(2)};
`,V=r.div`
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>e.theme.colors.background.paper};
  margin-bottom: ${e=>e.theme.spacing(2)};
  box-shadow: ${e=>e.theme.shadows.small};
`,Q=r.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${e=>e.theme.spacing(1)};
`,Y=r.h3`
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.primary};
`,K=r.span`
  font-size: 0.8rem;
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1)};
  border-radius: ${e=>e.theme.borderRadius.small};
  background-color: ${e=>{switch(e.status){case"scheduled":return e.theme.colors.status.info+"20";case"completed":return e.theme.colors.status.success+"20";case"cancelled":return e.theme.colors.status.error+"20";default:return e.theme.colors.text.disabled+"20"}}};
  color: ${e=>{switch(e.status){case"scheduled":return e.theme.colors.status.info;case"completed":return e.theme.colors.status.success;case"cancelled":return e.theme.colors.status.error;default:return e.theme.colors.text.disabled}}};
`,W=r.div`
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
`,X=r.p`
  color: ${e=>e.theme.colors.text.secondary};
  font-style: italic;
`,ne=()=>{const{user:e,updateUserProfile:T}=E(),[k,d]=s.useState(!1),[i,b]=s.useState({name:"",email:"",contactNumber:""}),[$,F]=s.useState([]),[N,y]=s.useState(!0);s.useEffect(()=>{e&&(b({name:e.name||"",email:e.email||"",contactNumber:e.contactNumber||""}),(async()=>{try{console.log("Fetching appointments for user:",e._id);const a=[{_id:"1",appointmentDate:new Date(new Date().setDate(new Date().getDate()+3)).toISOString().split("T")[0],startTime:"10:00 AM",endTime:"10:30 AM",reason:"Annual Checkup",status:"confirmed",doctor:{_id:"2",name:"Dr. Sarah Johnson",specialization:"Cardiology"}},{_id:"2",appointmentDate:new Date(new Date().setDate(new Date().getDate()-5)).toISOString().split("T")[0],startTime:"02:00 PM",endTime:"02:30 PM",reason:"Follow-up Consultation",status:"completed",doctor:{_id:"2",name:"Dr. Sarah Johnson",specialization:"Cardiology"}}];console.log("Returning mock appointments:",a),F(a),y(!1)}catch(a){console.error("Error fetching appointments:",a),y(!1)}})())},[e]);const h=n=>{b({...i,[n.target.name]:n.target.value})},P=async n=>{n.preventDefault();try{console.log("Submitting profile update:",i);const a=await T(i);console.log("Profile updated successfully:",a),d(!1)}catch(a){console.error("Error updating profile:",a),alert(`Failed to update profile: ${a.message||"Unknown error"}`)}},z=n=>{const a={year:"numeric",month:"long",day:"numeric"};return new Date(n).toLocaleDateString(void 0,a)},x=n=>n;return e?t(v,{children:[t(w,{children:[o(D,{children:"My Profile"}),o(C,{children:"View and manage your personal information"})]}),t(H,{children:[t(A,{children:[t(S,{children:[o(I,{}),"Personal Information"]}),k?t("form",{onSubmit:P,children:[t(u,{children:[o(p,{htmlFor:"name",children:"Full Name"}),o(g,{type:"text",id:"name",name:"name",value:i.name,onChange:h,required:!0})]}),t(u,{children:[o(p,{htmlFor:"email",children:"Email Address"}),o(g,{type:"email",id:"email",name:"email",value:i.email,onChange:h,required:!0})]}),t(u,{children:[o(p,{htmlFor:"contactNumber",children:"Contact Number"}),o(g,{type:"tel",id:"contactNumber",name:"contactNumber",value:i.contactNumber,onChange:h})]}),t(q,{children:[t(f,{type:"submit",whileTap:{scale:.95},children:[o(L,{}),"Save Changes"]}),t(G,{type:"button",onClick:()=>d(!1),whileTap:{scale:.95},children:[o(M,{}),"Cancel"]})]})]}):t(R,{children:[t(O,{children:[t(c,{children:[o(l,{children:"Full Name"}),o(m,{children:e.name})]}),t(c,{children:[o(l,{children:"Email Address"}),o(m,{children:e.email})]}),t(c,{children:[o(l,{children:"Contact Number"}),o(m,{children:e.contactNumber||"Not provided"})]}),t(c,{children:[o(l,{children:"Account Type"}),o(m,{children:e.role.charAt(0).toUpperCase()+e.role.slice(1)})]})]}),t(f,{onClick:()=>d(!0),whileHover:{scale:1.05},whileTap:{scale:.95},children:[o(U,{}),"Edit Profile"]})]})]}),t(A,{children:[t(S,{children:[o(_,{}),"My Appointments"]}),N?o("p",{children:"Loading appointments..."}):$.length>0?o(J,{children:$.map(n=>{var a;return t(V,{children:[t(Q,{children:[t(Y,{children:[((a=n.doctor)==null?void 0:a.name)||"Doctor"," -",n.reason||"Consultation"]}),o(K,{status:n.status,children:n.status.charAt(0).toUpperCase()+n.status.slice(1)})]}),t(W,{children:[t("p",{children:["Date: ",z(n.appointmentDate)]}),t("p",{children:["Time: ",x(n.startTime)," -",x(n.endTime)]}),t("p",{children:["Type: ",n.type||"In-person"]}),t("p",{children:["Reason: ",n.reason]})]})]},n._id)})}):o(X,{children:"You don't have any appointments yet."})]})]})]}):o(v,{children:t(w,{children:[o(D,{children:"Profile"}),o(C,{children:"Loading user information..."})]})})};export{ne as default};
//# sourceMappingURL=Profile-67e02f01.js.map
