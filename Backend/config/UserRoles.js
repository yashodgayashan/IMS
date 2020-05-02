const jwtLogin = require("jwt-login");
const roles = require("user-groups-roles");
// roles
roles.createNewRole("admin");
roles.createNewRole("student");
roles.createNewRole("organization");
roles.createNewRole("subscriber");
// privileges
roles.createNewPrivileges(["/article", "GET"], "get article", true);
roles.createNewPrivileges(["/article", "POST"], "inserts article", false);
roles.createNewPrivileges(["/article", "PUT"], "edits article", false);
roles.createNewPrivileges(["/article", "DELETE"], "deletes article", false);

// admin all add, edit delete select
roles.addPrivilegeToRole("admin",["/students", "POST"],true);
roles.addPrivilegeToRole("admin",["/students", "PUT"],true);
roles.addPrivilegeToRole("admin",["/students ", "DELETE"],true);


// editor insert, edit select
roles.addPrivilegeToRole("editor",["/article", "POST"],true);
roles.addPrivilegeToRole("editor",["/article", "PUT"],true);

// author insert
roles.addPrivilegeToRole("author",["/article", "POST"],true);