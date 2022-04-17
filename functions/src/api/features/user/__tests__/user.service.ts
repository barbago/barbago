describe('Create User endpoint', () => {
  it('should allow authenticated users to upload data', async () => {});
  it('should not allow unauthorized users to upload data', async () => {});
});

describe('Get User endpoint', () => {
  it("should return the authenticated user's data", async () => {});
  it('should not allow unauthorized users to get data', async () => {});
});

describe('Delete User endpoint', () => {
  it("should delete the current user's data", async () => {});
  it('should return the destroyed data', async () => {});
  it("should destroy the user's auth credentials", async () => {});
});

describe('Update User endpoint', () => {
  it('should allow authenticated users to update data', async () => {});
  it('should return the new data');
});

// it('should allow admins to see all users, lookup/change/delete by id');
// todo: move authentication tests to test/user.controller.ts (supertest)
