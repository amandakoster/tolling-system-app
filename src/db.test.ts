import { initDB } from "./db";

jest.mock("sql.js", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    Database: jest.fn().mockImplementation(() => ({
      run: jest.fn(),
      exec: jest.fn().mockReturnValue([]),
    })),
  }),
}));

describe("Database Methods", () => {
  let db: any;

  beforeAll(async () => {
    await initDB();
    db = global.db; // Assuming your initDB attaches db to global
  });

  afterAll(() => {
    global.db = null;
  });

  test("initialize db and create table", async () => {
    expect(db.run).toHaveBeenCalledWith(
      "CREATE TABLE IF NOT EXISTS toll_transactions (id INTEGER PRIMARY KEY, vehicleId TEXT, tollBoothId TEXT, amountPaid INTEGER);"
    );
  });
});
