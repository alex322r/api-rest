import { pool } from '../db.js'

export const getEmployees = async (req, res) => {
    const rows = await pool.query('SELECT * FROM employee')
    res.send(rows[0])
}

export const getEmployee = async (req, res) => {
    const { id } = req.params
    const [row] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    if (row.length === 0) return res.status(404).send({
        message: 'employee not found'
    })
    res.send(row[0])
}

export const createEmployee = async (req, res) => {
    const { name, salary } = req.body
    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?,?)', [name, salary])
    res.send({ rows })
}

export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { name, salary } = req.body
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) where id = ? ', [name, salary, id])
    if (result.affectedRows === 0) return res.status(404).send({
        message: 'employee not found'
    })
    const [rows] = await pool.query('SELECT * FROM employee')
    res.send(rows[0])
}

export const deleteEmployee = async (req, res) => {
    const { id } = req.params
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id])
    if (result.affectedRows === 0) return res.status(404).send({ message: 'employee not found' })
    res.sendStatus(204)
}