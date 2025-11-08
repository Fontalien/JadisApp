import { isAdmin } from "../src/utils/utils.utils";

test ("isAdmin returns true for admin user id 1", () => {
    expect(isAdmin(1)).toBe(true);
});

test ("isAdmin returns false for non-admin user id 2", () => {
    expect(isAdmin(2)).toBe(false);
});
