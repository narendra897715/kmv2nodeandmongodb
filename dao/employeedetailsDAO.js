const { sql, poolPromise } = require('./../connection');

exports.getEmployeeDetailsWithToken = (token) => {
  //  console.log("token is",token);
    return new Promise((resolve, reject) => {
        new sql.Request(poolPromise).input('userToken', sql.NVarChar, token)
            .execute('[dbo].[sp_km_authentication]', (err, result) => {
                if (err) {
                   
                    reject(err);
                }
                // poolPromise.close();
               // console.log("token with user details",result.recordsets[0]);
                resolve(result.recordsets[0]);

            })
    })
};