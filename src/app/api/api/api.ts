export * from './problems.service';
import { ProblemsService } from './problems.service';
export * from './teams.service';
import { TeamsService } from './teams.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [ProblemsService, TeamsService, UsersService];
