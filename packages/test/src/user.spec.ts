import axios from 'axios'
import { describe, expect, it, test } from 'vitest'

const BACKEND_URL = "http://localhost:8080"

const USERNAME1 = "Parth"
const PHONE_NUMBER1 = "9999999988"

const USERNAME2 = "Ram"
const PHONE_NUMBER2 = "9999999977"


describe("Sign up endpoint", () => {

  it("double signup doesn't work", async () => {
    const response1 = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      number: PHONE_NUMBER1,
    });

    expect(response1.status).toBe(200);

    const response2 = await axios.post(`${BACKEND_URL}/api/v1/signup/verify`, {
      name: USERNAME1,
      otp: "000000"
    });

    expect(response2.status).toBe(200);
    expect(response2.data.id).not.toBeNull

    expect(async () => {
      const response3 = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        number: PHONE_NUMBER1
      });
    }).toThrow();
  });

})

