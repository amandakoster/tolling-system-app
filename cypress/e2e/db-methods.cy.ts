describe("Database Methods", () => {
  before(() => {
    // Initialize the database or reset it before running the tests
    cy.task("initDB").then(() => {
      console.log("Database initialized.");
    });
  });

  it("should initialize db and create table", () => {
    // runQuery runs a SQL query against your database.
    cy.task("runQuery", {
      query:
        'SELECT name FROM sqlite_master WHERE type="table" AND name="toll_transactions";',
    }).then((result: any) => {
      cy.log("Query Result:", JSON.stringify(result, null, 2)); // Log output to Cypress test runner
      expect(result).to.have.length(1);
      expect(result[0].name).to.equal("toll_transactions");
    });
  });
});
