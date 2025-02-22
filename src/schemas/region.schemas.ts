import * as Yup from "yup";

export const CreateRegionSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  user_id: Yup.string().required("User id is required"),
  coordinates: Yup.object()
    .shape({
      lat: Yup.number().required("Latitude is required"),
      lng: Yup.number().required("Longitude is required"),
    })
    .required("Coordinates is required"),
});

export const UpdateRegionSchema = Yup.object().shape({
  name: Yup.string().nullable(),
  coordinates: Yup.object().shape({
    lat: Yup.number().nullable(),
    lng: Yup.number().nullable(),
  }),
});
