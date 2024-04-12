"use server";

export const getAllCustomersByEmail = async (email: string) => {
  return [
    {
      email: "ken991@yahoo.com",
      firstName: "success",
      lastName: "Last",
      address: "address1 address2 address3",
      phone: "1215646785",
      birthday: "07/05/1994",
      tags: ["Customer1", "Customer2"],
      subscribed: true,
      contactRating: 2,
      created: "06/05/2024",
      lastChanged: "06/05/2024"
    },
    {
      email: "ken992@yahoo.com",
      firstName: "success",
      lastName: "Last",
      address: "address1 address2 address3",
      phone: "1215646785",
      birthday: "07/05/1994",
      tags: ["Customer1", "Customer3"],
      subscribed: true,
      contactRating: 2,
      created: "06/05/2024",
      lastChanged: "06/05/2024"
    },
    {
      email: "ken993@yahoo.com",
      firstName: "success",
      lastName: "Last",
      address: "address1 address2 address3",
      phone: "1215646785",
      birthday: "07/05/1994",
      tags: ["Customer2"],
      subscribed: false,
      contactRating: 2,
      created: "06/05/2024",
      lastChanged: "06/05/2024"
    },
    {
      email: "ken995@yahoo.com",
      firstName: "success",
      lastName: "Last",
      address: "address1 address2 address3",
      phone: "1215646785",
      birthday: "07/05/1994",
      tags: ["Customer3"],
      subscribed: true,
      contactRating: 2,
      created: "06/05/2024",
      lastChanged: "06/05/2024"
    },
    {
      email: "Abe45@gmail.com",
      firstName: "success",
      lastName: "Last",
      address: "address1 address2 address3",
      phone: "1215646785",
      birthday: "07/05/1994",
      tags: ["Customer1"],
      subscribed: true,
      contactRating: 2,
      created: "06/05/2024",
      lastChanged: "06/05/2024"
    }
  ];
};
