import { Router } from "express";

import makeListUsersUseCase from "../../use-cases/factories/make-list-users.usecase";
import makeCreateUserUseCase from "../../use-cases/factories/make-create-user.usecase";
import makeDeleteUserUseCase from "../../use-cases/factories/make-delete-user.usecase";
import makeUpdateUserUseCase from "../../use-cases/factories/make-update-user.usecase";

import { HTTP_STATUS_CODE } from "../../utils/constants";
import { CreateUserDTO, UpdateUserDTO } from "../../interfaces/user.dto";

const router = Router();

router.get("/", async (req, res) => {
  const usecase = makeListUsersUseCase();

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

router.post("/", async (req, res) => {
  const { name, email, address, coordinates } = req.body as CreateUserDTO;

  const usecase = makeCreateUserUseCase();

  const response = await usecase.execute({
    name,
    email,
    address,
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

router.put("/:id", async (req, res) => {
  const { name, address, coordinates } = (await req.body) as UpdateUserDTO;
  const id = req.params.id;

  const usecase = makeUpdateUserUseCase();

  const response = await usecase.execute(id, { name, address, coordinates });

  if (!response.success) {
    return res.status(response.error.code).json({
      response,
    });
  }

  return res.status(HTTP_STATUS_CODE.OK).json({
    response,
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const usecase = makeDeleteUserUseCase();

  const response = await usecase.execute(id);

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
