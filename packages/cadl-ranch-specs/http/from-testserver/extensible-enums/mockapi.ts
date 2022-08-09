import { passOnSuccess, mockapi, json } from "@azure-tools/cadl-ranch-api";
import { ScenarioMockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

// // valid enums
// const tommy = {
//   DaysOfWeek: "Monday",
//   IntEnum: "1",
//   name: "Tommy Tomson",
// };
// // unexpected enum
// const casper = {
//   DaysOfWeek: "Weekend",
//   IntEnum: "2",
//   name: "Casper Ghosty",
// };
// // enum from allowed values
// const scooby = {
//   DaysOfWeek: "Thursday",
//   IntEnum: "2.1",
//   name: "Scooby Scarface",
// };
// Scenarios.Pet_GetByPetId = passOnSuccess(
//   mockapi.get("/extensibleenums/pet/:petId", (req) => {
//     const petId = req.params.petId;
//     switch (petId) {
//       case "tommy":
//         return { status: 200, body: json(tommy) };
//       case "casper":
//         return { status: 200, body: json(casper) };
//       case "scooby":
//         return { status: 200, body: json(scooby) };
//       default:
//         return { status: 400, body: json("Pet not found for " + petId) };
//     }
//   }),
// );
