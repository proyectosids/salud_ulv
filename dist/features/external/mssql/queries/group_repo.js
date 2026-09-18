import { Group } from "../../../../core/models/groups.js";
import { GroupDTO } from "../../../DTOs/groupDTO.js";
import { UserDTO } from "../../../DTOs/userDTO.js";
import { database } from "../config.js";
import sql from "mssql";
export default class GroupRepo {
    async userExists(userUUID) {
        try {
            await database.connect();
            const result = await database.request()
                .input('userUUID', sql.NVarChar, userUUID)
                .query(`
                    SELECT CASE WHEN EXISTS 
                    (SELECT 1 FROM SaludULV.Users WHERE userUUID = @userUUID)
                    THEN 1
                    ELSE 0
                    END AS userExists
                `);
            const exists = result.recordset[0].userExists === 1;
            return exists;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            await database.close();
        }
    }
    async groupExists(groupID) {
        try {
            await database.connect();
            const result = await database.request()
                .input('groupID', sql.Int, groupID)
                .query(`
                    SELECT CASE WHEN EXISTS 
                    (SELECT 1 FROM SaludULV.Departments WHERE GroupID = @groupID)
                    THEN 1
                    ELSE 0
                    END AS userExists
                `);
            const exists = result.recordset[0].userExists === 1;
            return exists;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            await database.close();
        }
    }
    async getGroupsList(typeID) {
        try {
            await database.connect();
            var result;
            if (typeID == 1) {
                result = await database.request()
                    .query(`SELECT * FROM SaludULV.Departments;`);
            }
            else if (typeID == 2) {
                result = await database.request()
                    .query(`SELECT * FROM SaludULV.AcademicGroups;`);
            }
            else {
                return null;
            }
            if (result.recordset.length === 0 || !result)
                return null;
            const rows = result.recordset;
            const data = rows.map((row) => GroupDTO.fromMap(row).toDomain());
            return data;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            await database.close();
        }
    }
    async addMember(groupID, userUUID) {
        try {
            await database.connect();
            await database.request()
                .input('userUUID', sql.UniqueIdentifier, userUUID)
                .input('groupID', sql.Int, groupID)
                .query(`INSERT INTO SaludULV.Members (UserUUID, GroupID) VALUES (@userUUID, @groupID);`);
            return;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            await database.close();
        }
    }
    async getGroupMembers(groupID) {
        try {
            await database.connect();
            const results = await database.request()
                .input('groupID', sql.Int, groupID)
                .query(`
                    SELECT U.UserCode, U.Firstname, U.Surname, U.Lastname 
                    FROM 
                    SaludULV.Departments D
                    INNER JOIN SaludULV.Members M ON D.GroupID = M.GroupID
                    INNER JOIN SaludULV.Users U ON U.UserUUID = M.UserUUID
                    WHERE D.GroupID = @groupID
                    GROUP BY D.Name, U.UserCode, U.Firstname, U.Surname, U.Lastname
                `);
            const rows = results.recordset || results;
            if (!rows || rows.length === 0) {
                return null;
            }
            const data = rows.map((rows) => UserDTO.fromMap(rows).toDomain());
            console.log(`In db group member: ${data}`);
            return data;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            await database.close();
        }
    }
    async getGroupInfo(groupID) {
        try {
            await database.connect();
            const result = await database.request()
                .input('groupID', sql.Int, groupID)
                .query(`SELECT * FROM SaludULV.Departments WHERE GroupID = @groupID;`);
            const row = result.recordset || result;
            if (!row || row.length === 0) {
                return null;
            }
            console.log(row[0]['GroupID']);
            const data = GroupDTO.fromMap(row[0]).toDomain();
            // console.log(`Group info frommap in db: ${data.name}, ${data.description}, ${data.building}`);
            return data;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            await database.close();
        }
    }
    async getLowerLevelGroups() {
        try {
            await database.connect();
            const result = await database.request()
                .query(`SELECT * FROM SaludULV.Departments`);
            const rows = result.recordset || result;
            if (!rows || rows.length === 0) {
                return null;
            }
            // console.log(rows);
            const data = rows.map((rows) => GroupDTO.fromMap(rows).toDomain());
            // console.log(`Group info frommap in db: ${data.name}, ${data.description}, ${data.building}`);
            return data;
        }
        catch (error) {
            throw new Error(`${error}`);
        }
        finally {
            await database.close();
        }
    }
}
//# sourceMappingURL=group_repo.js.map