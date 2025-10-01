const { checkForUpdates } = require("../../src/main/updater");
const { app } = require("electron");

jest.mock("electron", () => ({
  app: { getVersion: () => "1.0.0" }
}));

global.fetch = jest.fn();

describe("Updater Module", () => {
  test("returns updateAvailable = true when version differs", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ version: "1.1.0" })
    });

    const result = await checkForUpdates("http://fake-update-server");
    expect(result.updateAvailable).toBe(true);
  });

  test("returns updateAvailable = false when version matches", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ version: "1.0.0" })
    });

    const result = await checkForUpdates("http://fake-update-server");
    expect(result.updateAvailable).toBe(false);
  });
});
