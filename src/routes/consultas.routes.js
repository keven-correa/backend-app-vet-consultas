const {Router} = require('express')
const router = Router();
const {validarJWT} = require('../middlewares/validarJWT')
const {obtenerConsultas, crearConsulta, actualizarConsulta, eliminarConsulta} = require('../controllers/consultasControllers')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validarCampos');
const {isDate} = require('../helpers/isDate');

router.use(validarJWT);
//Obtener consultas
router.get('/',    obtenerConsultas);

//Crear consulta
router.post('/',
                [
                    check('title', 'el titulo es obligatorio').not().isEmpty(),
                    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
                    check('end', 'Fecha de finalización es obligatoria').custom(isDate),
                    validarCampos
                ]
            ,crearConsulta);

//Actualizar consulta
router.put('/:id',
                    [
                        check('title', 'el titulo es obligatorio').not().isEmpty(),
                        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
                        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
                        validarCampos
                    ],
                

            actualizarConsulta);

//Eliminar consulta
router.delete('/:id', eliminarConsulta);

module.exports  = router;