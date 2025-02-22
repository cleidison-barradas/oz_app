import swaggerJsonDoc from "swagger-jsdoc";

const options: swaggerJsonDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "OZ API",
      version: "1.0.0",
      description: "API for OZ",
    },
    basePath: "/api",
    servers: [
      {
        url: "http://localhost:8001/api/",
        description: "Local Server",
      },
    ],

    paths: {
      "/users": {
        get: {
          tags: ["Users"],
          description: "Get all users",
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseListUsers",
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Users"],
          description: "Create a new user",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RequestCreateUser",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseCreatedUser",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "404": {
              description: "Not Found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
      },
      "/users/{id}": {
        put: {
          tags: ["Users"],
          description: "Update a user",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RequestUpdateUser",
                },
              },
            },
            required: true,
          },
          responses: {
            "200": {
              description: "Success Updated User",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseUpdatedUser",
                  },
                },
              },
            },
            "404": {
              description: "User not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Users"],
          description: "Delete a user",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            "200": {
              description: "Success Deleted User",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseDeletedUser",
                  },
                },
              },
            },
            "404": {
              description: "User not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "400": {
              description: "User not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "User not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
      },
      "/regions/point": {
        get: {
          tags: ["Regions"],
          description: "Get all regions from a specific point",

          parameters: [
            {
              name: "lat",
              in: "query",
              required: true,
              schema: {
                type: "string",
                example: "37.7749",
              },
            },
            {
              name: "lng",
              in: "query",
              required: true,
              schema: {
                type: "string",
                example: "-122.4194",
              },
            },
          ],

          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseListRegionPoints",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
      },
      "/regions/nearby": {
        get: {
          tags: ["Regions"],
          description: "Get all regions from a specific point",
          parameters: [
            {
              name: "lat",
              in: "query",
              required: true,
              schema: {
                type: "string",
                example: "37.7749",
              },
            },
            {
              name: "lng",
              in: "query",
              required: true,
              schema: {
                type: "string",
                example: "-122.4194",
              },
            },
            {
              name: "maxDistance",
              in: "query",
              required: true,
              schema: {
                type: "number",
                example: "1000",
              },
            },
            {
              name: "excludeOwnerUserId",
              in: "query",
              required: false,
              schema: {
                type: "string",
                example: "123456789",
              },
            },
          ],
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseListRegionNearbyPoint",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
      },
      "/regions/{id}": {
        put: {
          tags: ["Regions"],
          desciption: "Update a region",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RequestUpdateRegion",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseUpdatedUser",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "404": {
              description: "Region not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Regions"],
          desciption: "Delete a region",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "string",
              },
            },
          ],

          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/response_region_delete",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "404": {
              description: "Region not found",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
      },
      "/regions": {
        post: {
          tags: ["Regions"],
          desciption: "Create a new region",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RequestRegionCreate",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Success",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/ResponseRegionCreated",
                  },
                },
              },
            },
            "400": {
              description: "Bad Request",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
            "500": {
              description: "Internal Server Error",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/responseError",
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        RequestCreateUser: {
          $ref: "#/components/schemas/user",
        },
        RequestUpdateUser: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              $ref: "#/components/schemas/user",
            },
          },
        },
        ResponseListUsers: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/user",
              },
            },
          },
        },
        ResponseCreatedUser: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              $ref: "#/components/schemas/user",
            },
          },
        },
        ResponseUpdatedUser: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              $ref: "#/components/schemas/user",
            },
          },
        },
        ResponseDeletedUser: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              type: "string",
              example: "67ba475958c3d8f671015d61",
            },
          },
        },
        RequestRegionCreate: {
          $ref: "#/components/schemas/region",
        },
        RequestRegionUpdate: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "San Francisco",
            },
            coordinates: {
              $ref: "#/components/schemas/coordinates",
            },
          },
        },
        ResponseListRegionPoints: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              $ref: "#/components/schemas/geometry",
            },
          },
        },
        ResponseListRegionNearbyPoint: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            data: {
              $ref: "#/components/schemas/geometry",
            },
          },
        },
        responseError: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "object",
              properties: {
                code: {
                  type: "number",
                },
                message: {
                  type: "string",
                  example: "User not found",
                },
              },
            },
          },
        },
        geometry: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "San Francisco",
            },
            type: {
              type: "string",
              example: "Polygon",
            },
            user: {
              $ref: "#/components/schemas/user",
            },
            coordinates: {
              type: "array",
              items: {
                type: "array",
                items: {
                  type: "array",
                  items: {
                    type: "number",
                    example: [37.7749, -122.4194],
                  },
                },
              },
            },
          },
        },
        user: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "David Guilmor",
            },
            email: {
              type: "string",
              example: "thewall@pinkfloyd.com",
            },
            address: {
              type: "string",
              example: "123 Main St",
            },
            coordinates: {
              $ref: "#/components/schemas/coordinates",
            },
          },
        },
        coordinates: {
          type: "object",
          properties: {
            lat: {
              type: "number",
              example: 37.7749,
            },
            lng: {
              type: "number",
              example: -122.4194,
            },
          },
        },
        region: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "San Francisco",
            },
            user_id: {
              type: "string",
              required: true,
              example: "67ba152f2bc56f222ecbba24",
            },
            coordinates: {
              type: "object",
              required: true,
              properties: {
                lat: {
                  type: "number",
                  required: true,
                  example: 37.7749,
                },
                lng: {
                  type: "number",
                  required: true,
                  example: -122.4194,
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*.controller.ts"],
};

export const swaggerSpec = swaggerJsonDoc(options);
