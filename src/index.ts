import { ProfileController } from 'controllers/profile.controller';
import { IProfileDataPort } from 'domain/ports/profileDataPort';
import ProfileUseCases from 'domain/profileUseCases';
import express, { Application, Request, Response, json } from 'express';

const app: Application = express();
app.use(json());

const port: IProfileDataPort = {
  save: async (p) => {
    console.log('saved ', p);
    return p;
  },
};

const profileUseCases = new ProfileUseCases(port);

const controller = new ProfileController(profileUseCases);

app.use('/profile', controller.router);

app.listen(3000, () => {
  console.log('Server Running on 3000!');
});

app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'Hello, world!' });
});
