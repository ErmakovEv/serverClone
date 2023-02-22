import express = require('express');
import bcrypt = require('bcrypt');
import { User, Setting } from '../models/models';
import jwt = require('jsonwebtoken');
import constans from '../constans';

function generateJwt(id: number, email: string, role: string) {
  return jwt.sign({ id, email, role }, constans.SECRET_KEY, { expiresIn: '1h' });
}

class UserController {
  async registration(req: express.Request, res: express.Response) {
    try {
      const { email, password, role } = req.body;
      //TODO валидация!!!
      if (!email || !password) {
        return res.status(400).json('Неверные данные');
      }
      console.log(email, password, role);
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return res.status(400).json('Пользователь с таким именем уже существует');
      }
      const hashPass = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPass });
      const setting = await Setting.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.status(200).json({ 'Пользователь успешно зарегистрирован': token });
    } catch (error) {
      console.log(error);
    }
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json('Пользователь с таким именем не существует');
      }
      const comparePass = await bcrypt.compareSync(password, user.password);
      if (!comparePass) {
        return res.status(400).json('Пароль неверный!');
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  async check(req: express.Request, res: express.Response) {
    const { user } = req.body;
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
}

export default new UserController();
