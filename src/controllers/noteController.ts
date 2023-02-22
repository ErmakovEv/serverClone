import express = require('express');
import { Note } from '../models/models';

class NoteController {
  async post(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const { title, description, color, isFixed } = req.body;
      console.log('!!', id);
      const note = await Note.create({ title, description, color, isFixed, userId: +id });
      res.json(note);
    } catch (error) {
      console.log(error);
    }
  }

  async set(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const { title, description, color, isFixed } = req.body;
      const noteUPD = await Note.update(
        {
          title: title,
          description: description,
          color: color,
          isFixed: isFixed,
        },
        {
          where: { userId: id },
        },
      );
      res.json(noteUPD);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(req: express.Request, res: express.Response) {
    const settings = await Note.findAll();
    return res.json(settings);
  }

  async getOne(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const setting = await Note.findAll({ where: { userId: id } });
      return res.json(setting);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const { title } = req.body;
      console.log(id, title);
      const ans = await Note.destroy({ where: { title: title, userId: id } });
      return res.json(ans);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new NoteController();
