const request = require("supertest")
const baseURL = "http://localhost:3001"


describe("POST /searchcoursetitle", () => {
    
    it("should return a list of the available tutors", async () => {
        const requestData = { "data": "cs180", "currUser": "mals", "filter": "", "lang": "" };
        const response = await request(baseURL).post("/searchcoursetitle").send(requestData);
        expect(response.text.includes(JSON.stringify("malss")) && response.text.includes(JSON.stringify("helllloooo567"))).toBe(true);
    });
});

describe("POST /searchtutorname", () => {
    
    it("should return a list of the available tutors", async () => {
        const requestData = { "data": "malia", "currUser": "mals", "filter": "", "lang": "" };
        const response = await request(baseURL).post("/searchtutorname").send(requestData);
        expect(response.text.includes(JSON.stringify("malss"))).toBe(true);
    });
});

describe("POST /searchmultiplecourses", () => {
    
    afterAll(() => {
      }, 10000);
    it("should return a list of the available tutors for all courses", async () => {
        const requestData = { "data": "cs180, cs182", "currUser": "mals", "filter": "", "lang": "" };
        const response = await request(baseURL).post("/searchmultiplecourses").send(requestData);
        expect(response.text.includes(JSON.stringify("helllloooo567"))).toBe(true);
    });
    
});
