import { Router } from "express";

import {
  CreateRegionDTO,
  QueryRegionsNearbyPointDTO,
  QueryRegionsPointDTO,
} from "../../interfaces/region.dto";
import { HTTP_STATUS_CODE } from "../../utils/constants";

import makeUpdateRegionUseCase from "../../use-cases/factories/make-update-region.usecase";
import makeDeleteRegionUseCase from "../../use-cases/factories/make-delete-region.usecase";
import makeCreateRegionUseCase from "../../use-cases/factories/make-create-region.usecase";

import makeListAllRegionsUseCase from "../../use-cases/factories/make-list-all-regions.usecase";
import makeListRegionsPointUseCase from "../../use-cases/factories/make-list-regions-point.usecase";
import makeListRegionsNearbyPointUseCase from "../../use-cases/factories/make-list-regions-nearby-point";
import { yupHandlerMiddleware } from "../middleware/yupHandler.middleware";
import {
  CreateRegionSchema,
  UpdateRegionSchema,
} from "../../schemas/region.schemas";

const router = Router();

router.get("/", async (req, res) => {
  const usecase = makeListAllRegionsUseCase();

  const response = await usecase.execute();

  if (!response.success) {
    return res.status(response.error.code).json({
      response,
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    response,
  });
});

router.get("/point", async (req, res) => {
  const { lat, lng } = req.query as unknown as QueryRegionsPointDTO;
  const usecase = makeListRegionsPointUseCase();

  const response = await usecase.execute({
    lat,
    lng,
  });

  if (!response.success) {
    return res.status(response.error.code).json({
      response,
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    response,
  });
});

router.get("/nearby", async (req, res) => {
  const { lat, lng, maxDistance, excludeOwnerUserId } =
    req.query as unknown as QueryRegionsNearbyPointDTO;

  const usecase = makeListRegionsNearbyPointUseCase();

  const response = await usecase.execute({
    lat,
    lng,
    maxDistance,
    excludeOwnerUserId,
  });

  if (!response.success) {
    return res.status(response.error.code).json({
      response,
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    response,
  });
});

router.post("/", yupHandlerMiddleware(CreateRegionSchema), async (req, res) => {
  const { name, user_id, coordinates } = req.body as CreateRegionDTO;
  const usecase = makeCreateRegionUseCase();

  const response = await usecase.execute({
    name,
    user_id,
    coordinates,
  });

  if (!response.success) {
    return res.status(response.error.code).json({
      response,
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    response,
  });
});

router.put(
  "/:id",
  yupHandlerMiddleware(UpdateRegionSchema),
  async (req, res) => {
    const usecase = makeUpdateRegionUseCase();

    const response = await usecase.execute(req.params.id, req.body);

    if (!response.success) {
      return res.status(response.error.code).json({
        response,
      });
    }

    return res.status(HTTP_STATUS_CODE.OK).json({
      response,
    });
  },
);

router.delete("/:id", async (req, res) => {
  const usecase = makeDeleteRegionUseCase();

  const response = await usecase.execute(req.params.id);

  if (!response.success) {
    return res.status(response.error.code).json({
      response,
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    response,
  });
});

export default router;
