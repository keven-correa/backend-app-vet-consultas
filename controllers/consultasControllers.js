const {response} = require('express');
const Consulta = require('../models/Consulta');



const crearConsulta = async (req, res = response) => {

    const consulta = new Consulta(req.body);

    try {

        consulta.user = req.uid;
        const consultaGuardada = await consulta.save()
        res.json({
            ok: true,
            consulta: consultaGuardada
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la consulta'
        });
    }

    //  res.json({
    //     ok: true,
    //     msg: 'crearConsultas'
    // })

}

const obtenerConsultas = async (req, res = response) => {

    const consultas = await Consulta.find().populate('user','name');



     res.json({
        ok: true,
        consultas
    })
}

const actualizarConsulta = async (req, res = response) => {

    const consultaId = req.params.id; 
    const uid = req.uid;
    try {
        
        const consulta = await Consulta.findById(consultaId);

        if(!consulta){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por este id'
            });
        }

        if(consulta.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar esta consulta'
            });
        }

        const nuevaConsulta ={
            ...req.body,
            user: uid
        }

        const consultaActualizada = await Consulta.findByIdAndUpdate(consultaId, nuevaConsulta);
        res.json({
            ok: true,
            consultaActualizada
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la consulta!'
        });
    }

    //  res.json({
    //     ok: true,
    //     consultaId
    // })
}

const eliminarConsulta = async (req, res = response) => {

    const consultaId = req.params.id; 
    const uid = req.uid;
    try {
        
        const consulta = await Consulta.findById(consultaId);

        if(!consulta){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por este id'
            });
        }

        if(consulta.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar esta consulta'
            });
        }

        await Consulta.findByIdAndDelete(consultaId);
        res.json({ok: true});
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la consulta!'
        });

    }
}

module.exports = {
    obtenerConsultas,
    crearConsulta,
    actualizarConsulta,
    eliminarConsulta
}


