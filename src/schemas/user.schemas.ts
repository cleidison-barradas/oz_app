import * as Yup from "yup";

export const CreateUserSchema = Yup.object()
  .shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    address: Yup.string().nullable(),
    coordinates: Yup.object().nullable().shape({
      lat: Yup.number(),
      lng: Yup.number(),
    }),
  })
  .test("only-fill-one", "Only fill one of address or coordinates", (data) => {
    const hasAddress = Boolean(data.address);
    const hasCoordinates = Boolean(data.coordinates);

    return !hasAddress || !hasCoordinates;
  });

export const UpdateUserSchema = Yup.object().shape({
  name: Yup.string().nullable(),
  address: Yup.string().nullable(),
  coordinates: Yup.object()
    .shape({
      lat: Yup.number(),
      lng: Yup.number(),
    })
    .nullable(),
});
