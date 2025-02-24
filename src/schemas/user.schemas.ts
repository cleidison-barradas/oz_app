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
  .test(
    "only-fill-one",
    "fill only one, address or coordinates but not both",
    (data) => {
      const hasAddress = Boolean(data?.address);
      const hasCoordinates = Boolean(
        data?.coordinates.lat && data?.coordinates.lng,
      );

      if (hasAddress && hasCoordinates) return false;

      if (!hasAddress && !hasCoordinates) return false;

      return true;
    },
  );

export const UpdateUserSchema = Yup.object()
  .shape({
    name: Yup.string().nullable(),
    address: Yup.string().nullable(),
    coordinates: Yup.object().nullable().shape({
      lat: Yup.number(),
      lng: Yup.number(),
    }),
  })
  .test(
    "only-fill-one",
    "fill only one, address or coordinates but not both",
    (data) => {
      const hasAddress = Boolean(data?.address);
      const hasCoordinates = Boolean(
        data?.coordinates.lat && data?.coordinates.lng,
      );

      if (hasAddress && hasCoordinates) return false;

      return true;
    },
  );
