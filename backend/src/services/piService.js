const { getClient, deleteClient } = require('../controllers/piController');
const db = require('../db')
module.exports = {
    getAllAGV: () => {
        return new Promise((accept, denied) => {

            db.query('SELECT * FROM Status_veiculo', (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });

        });
    },

    getAGV: (id) => {
        return new Promise((accept, denied)=>{
            db.query('SELECT * FROM Status_veiculo WHERE id_veiculo = ?', [id], (error, result) =>{
                if(error){denied(error); return;}
                if(result.length > 0){ accept(result[0]) } else {accept(false);}
            });
        });
    },

    getAllClient: () => {
        return new Promise((accept, denied) => {

            db.query('SELECT * FROM cliente', (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });

        });

    },

    getClient: (id) => {
        return new Promise((accept, denied)=>{
            db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id], (error, result) =>{
                if(error){denied(error); return;}
                if(result.length > 0){ accept(result[0]) } else {accept(false);}
            });
        });
    },

    postClient: (clientName, clientPass) => {
        return new Promise((accept, denied)=>{
            db.query('INSERT INTO cliente(nome_cliente, senha_cliente) VALUES(?, ?)',[clientName, clientPass], (error, result) => {
                if(error){denied(error); return;}
                accept(result.insertId);
            });
        });
    },

    putClient: (clientID, clientName, clientPass) => {
        return new Promise((accept, denied)=>{
            db.query('UPDATE cliente SET nome_cliente = ?, senha_cliente = ? WHERE id_cliente = ? ',[clientName, clientPass, clientID], (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });
        });
    },

    deleteClient: (id) => {
        return new Promise((accept, denied) => {

            db.query('DELETE FROM cliente WHERE id_cliente = ?', [id], (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });

        });

    },

    getSolicitar: (id) => {
        return new Promise((accept, denied) => {
            db.query('SELECT comando FROM controle_Site WHERE id_veiculo = ?', id, (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });
        })

    },

    putSolicitar: (id, command) => {
        return new Promise((accept, denied)=>{
            db.query('UPDATE controle_Site SET comando = ? WHERE id_veiculo = ? ',[command, id], (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });
        });
    },
    getControlar_veiculo: (id) => {
        return new Promise((accept, denied) => {
            db.query('SELECT comando FROM Controle_veiculo WHERE id = ?', id, (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });
        })

    },

    putControlar_veiculo: (id, command) => {
        return new Promise((accept, denied)=>{
            db.query('UPDATE Controle_veiculo SET comando = ? WHERE id = ? ',[command, id], (error, result) => {
                if(error){denied(error); return;}
                accept(result);
            });
        });
    },

    putVeiculo1: (id, n1, posX, posY, posZ) => {
        return new Promise((accept, denied) => {
            db.query('insert into Veiculo1(idveiculo, comandon1, posicaoY, posicaoX, posicaoZ) VALUES (?,?,?,?,?)', [id, n1, posX, posY, posZ], (error, result) =>{
                if(error){denied(error); return;}
                accept(result);
            });
        });

    }, 

    getVeiculo: (id, timeStart, timeEnd) => {

        return new Promise((accept, denied)=> {

            db.query("select  * from Veiculo1 where IDveiculo = ? and data_comando between ? and ? ",[id, timeStart, timeEnd],(error,result)=> {
                

                if (error) {denied(error);return}
                accept(result);
            });            
        });
    },
    
    setTimeZone: () => {
        return new Promise((accept, denied) =>  {
            db.query("set time_zone = '-03:00';",[],(error, result) => {
                if(error){denied(error);return}
                accept(result);
            });
        });
    },

    setCurDate: () => {
        return new Promise((accept, denied) =>  {
            db.query("CURDATE()",[],(error, result)=>{
                if(error){denied(error);return}
                accept(result);                
            });
        });
    },
    setCurTime: () => {
        return new Promise((accept, denied) =>  {
            db.query("CURTIME()",[],(error, result)=>{
                if(error){denied(error);return}
                accept(result);                
            });
        });
    }
};