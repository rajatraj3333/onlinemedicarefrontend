// import Management from "../components/Management";

let permission = {
  setting: ["Associate Doctor", "Doctor"],
  emailsetting: ["Doctor"],
  addassociateemployee: ["Associate Doctor"],
  addassocaitedoctor: ["Doctor"],
  management:['Doctor'],
  bookinghistory:['Patient'],
  doctor:["Associate Doctor", "Doctor"],
  dashboard:['Doctor'],
  clinicdetails:["Associate Doctor", "Doctor"]
};

export default permission;
