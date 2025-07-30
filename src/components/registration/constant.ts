  export let fields = {
    name: "",
    fullname: "",
    email: "",
    password: "",
    roles: "Doctor",
    department: "",
  };

  export let element = [
    {
      type: "text",
      name: "name",
      required: true,
      value: "",
      placeholder: "What Should we call you?",
    },
    {
      type: "text",
      name: "fullname",
      required: true,
      value: "",
      placeholder: "Full name",
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
  ];

 