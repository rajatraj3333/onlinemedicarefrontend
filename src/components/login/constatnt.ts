
export interface Fields {
  email: string,
  password: string,
  roles?: string,
  department?: string | React.ChangeEvent<HTMLInputElement>,
  gender?: string | React.ChangeEvent<HTMLInputElement>,
}
export interface Elements {
  type: string,
  value: string | "",
  placeholder: string,
  required: boolean,
  name: string,
  roles?: string | React.ChangeEvent<HTMLInputElement>,
  department?: string | React.ChangeEvent<HTMLInputElement>,
  gender?: string | React.ChangeEvent<HTMLInputElement>,
}

export let fields: Fields = {
  email: "",
  password: "",

};

export let element: Elements[] = [
  {
    type: "email",
    value: "",
    name: "email",
    placeholder: "Email",
    required: true,
  },
  {
    type: "password",
    value: "",
    name: "password",
    placeholder: "Password",
    required: true,
  },
];

export interface RegisterFields extends Fields{
  firstname:string,
  lastname:string,

}

  export const registerfields:RegisterFields = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
  };

  export const registerElement:Elements[] =[
    {
      type: "text",
      name: "firstname",
      required: true,
      value: "",
      placeholder: "Firstname",
    },
    {
      type: "text",
      name: "lastname",
      required: true,
      value: "",
      placeholder: "Lastname",
    },

    {
      type: "email",
      name: "email",
      required: true,
      value: "",
      placeholder: "Email",
    },
    {
      type: "password",
      name: "password",
      required: true,
      value: "",
      placeholder: "Password",
    },
   
  ]