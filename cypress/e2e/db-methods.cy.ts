describe("Database Methods", () => {
  before(() => {
    // Initialize the database or reset it before running the tests
    cy.task("initDB");
  });

  it("should initialize db and create table", () => {
    cy.task("runQuery", {
      query:
        'SELECT name FROM sqlite_master WHERE type="table" AND name="toll_transactions";',
    }).then((result: any) => {
      expect(result).to.have.length(1);
      expect(result[0].name).to.equal("toll_transactions");
    });
  });

  // Add more tests as needed
});
