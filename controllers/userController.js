const User = require('../models/User');
const secret = require('../config/auth.json');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { name, email, password} = req.body;
    await User.create({
       name:name,
       email:email,
       password:password
    }).then(() => {
        res.json('Cadastro efetuado com sucesso!');
        console.log('Cadastro efetuado com sucesso!');
    }).catch((erro) => {
        res.json('Ops! Erro no cadastro');
        console.log(`Ops! Erro no cadastro: ${erro}`);
    })
}
const findUsers = async (req, res) => {
    const users  = await User.findAll();
    try {
        res.json(users);
    } catch (error) {
        res.status(404).json("Ocorreu um erro na busca!");
    };
}

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await User.destroy({
            where: {
                id:id
            }
        }).then(() => {
            res.json("Usuario deletado com sucesso!");
        })
    } catch (error) {
        res.status(404).json("ops! Erro ao deletar usuario");
    }
}
const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const {name, email, password} = req.body;
    try {
        await User.update(
            {
               name:name,
               email:email,
               password:password
            },
            {
                where: {
                    id: id
                }
            }
        ).then(() => {
            res.json("Usuário alterado com sucesso!");
        })
    } catch (error) {
        res.status(404).json("ops! Erro ao alterar usuário!");
    }
}
const authenticatedUser = async (req, res) => {
    const {name, email} = req.body;
    try {
        const isUserAuthenticated = await User.findOne({
            where: {
                email:email,
                password:password
            }
        })
        const token = jwt.sign({
            name:name,
            email: email
        },
            secret.secret, {
            expiresIn: 86400,
        })
        return res.json({
            name: isUserAuthenticated.name,
            email: isUserAuthenticated.email,
            token: token
        });
    } catch (error) {
        return res.json("Usuario não encontrado");
    }
}


module.exports = { createUser, findUsers, deleteUser, updateUser, authenticatedUser };
