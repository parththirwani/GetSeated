import axios from 'axios'
import { describe, expect, it, test } from 'vitest'

const BACKEND_URL = "http://localhost:8080"

const USERNAME1 = "Parth"
const PHONE_NUMBER1 = "9999999988"

const USERNAME2 = "Ram"
const PHONE_NUMBER2 = "9999999977"


describe("Sign up endpoint", () => {

  it("double signup doesn't work", async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
      number: PHONE_NUMBER1,
    });



    const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signup/verify`, {
      name: USERNAME1,
      otp: "000000"
    });
    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response2.data.id).not.toBeNull

    expect(async () => {
      const response3 = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        number: PHONE_NUMBER1
      });
    }).toThrow();
  });

})

describe("Sign in endpoint", () => {

  it("Signup dosent work", async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
      number: PHONE_NUMBER1,
    });

    const response2 = await axios.post(`${BACKEND_URL}/api/v1/user/signin/verify`, {
      name: USERNAME1,
      otp: "000000"
    });

    expect(response1.status).toBe(200);
    expect(response2.status).toBe(200);
    expect(response2.data.id).not.toBeNull
    expect(response2.data.token).not.toBeNull

  });

})


